const db = require('../../config/mysql2/db');
const patientSchema = require('../../model/joi/Patient');

const authUtil = require('../../utils/authUtils');

checkEmailUnique = (email, patientId) => {
    let sql, promise;
    if (patientId) {
        sql = `SELECT COUNT(1) as c FROM Patient WHERE idPatient != ? AND email = ?`;
        promise = db.promise().query(sql, [patientId, email]);
    } else {
        sql = `SELECT COUNT(1) as c FROM Patient WHERE email = ?`;
        promise = db.promise().query(sql, [email]);
    }

    return promise.then((results, fields) => {
        const count = results[0][0].c;
        let err = {};
        if (count > 0) {
            err = {
                details: [{
                    path: ['email'],
                    message: 'The entered email address is already in use'
                }]
            };
            return err;
        }
        return null;
    });
}

exports.getPatients = () => {
    return db.promise().query('SELECT * FROM Patient')
        .then((results, fields) => {
            //console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const query = `SELECT p.idPatient as patientId, p.firstName, p.lastName, p.insurance, p.phone, p.email,
                ap.idOperation as appoin_id, ap.date, ap.price, ap.room, ap.comment,
                pr.idProcedure as proc_id, pr.procName, pr.inCoverage
                FROM Patient p
                LEFT JOIN Appointment ap ON p.idPatient = ap.patientId
                LEFT JOIN ProcedureOper pr ON ap.procedureId = pr.idProcedure
                where p.idPatient = ?`

exports.getPatientById = (patientId) => {
    return db.promise().query(query, [patientId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const patient = {
                idPatient: parseInt(patientId),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                insurance: firstRow.insurance,
                phone: firstRow.phone,
                email: firstRow.email,
                appointments: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.appoin_id) {
                    const appointment = {
                        idOperation: row.appoin_id,
                        date: row.date,
                        price: row.price,
                        room: row.room,
                        comment: row.comment,
                        procedureOper: {
                            idProcedure: row.proc_id,
                            procName: row.procName,
                            inCoverage: row.inCoverage
                        }
                    };
                    patient.appointments.push(appointment);
                }
            }
            return patient;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createPatient = (newPatientData) => {
    const vRes = patientSchema.validate(newPatientData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    return checkEmailUnique(newPatientData.email)
        .then(emailErr => {
            if (emailErr) {
                return Promise.reject(emailErr);
            } else {
                const firstName = newPatientData.firstName;
                const lastName = newPatientData.lastName;
                const insurance = newPatientData.insurance;
                const phone = newPatientData.phone;
                const email = newPatientData.email;
                //Password encoding:
                const password = authUtil.hashPassword(newPatientData.password);
                //const password = newPatientData.password;
                const sql = 'INSERT into Patient (firstName, lastName, insurance, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)'
                return db.promise().execute(sql, [firstName, lastName, insurance, phone, email, password]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.updatePatient = (patientId, patientData) => {
    const vRes = patientSchema.validate(patientData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    return checkEmailUnique(patientData.email, patientId)
        .then(emailErr => {
            if (emailErr) {
                return Promise.reject(emailErr);
            } else {
                const firstName = patientData.firstName;
                const lastName = patientData.lastName;
                const insurance = patientData.insurance;
                const phone = patientData.phone;
                const email = patientData.email;
                const password = authUtil.hashPassword(patientData.password);
                const sql = `UPDATE Patient set firstName = ?, lastName = ?, insurance = ?, phone = ?, email = ?, password = ? where idPatient = ?`;
                return db.promise().execute(sql, [firstName, lastName, insurance, phone, email, password, patientId]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.deletePatient = (patientId) => {
    const sql1 = 'DELETE FROM Appointment where patientId = ?'
    const sql2 = 'DELETE FROM Patient where idPatient = ?'

    return db.promise().execute(sql1, [patientId])
        .then(() => {
            return db.promise().execute(sql2, [patientId])
        });
};

const getPassQuery = `SELECT p.idPatient, p.firstName, p.lastName, p.insurance, p.phone, p.email, p.password, p.role
                      FROM Patient p where p.email = ?`

exports.findByEmail = (email) => {
    return db.promise().query(getPassQuery, [email])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const patient = {
                idPatient: firstRow.idPatient,
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                insurance: firstRow.insurance,
                phone: firstRow.phone,
                email: firstRow.email,
                password: firstRow.password,
                role: firstRow.role
            }
            return patient;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}