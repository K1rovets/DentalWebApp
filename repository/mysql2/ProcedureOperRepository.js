const db = require('../../config/mysql2/db');
const procedureOperSchema = require('../../model/joi/ProcedureOper');

exports.getProcedures = () => {
    return db.promise().query('SELECT * FROM ProcedureOper')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const query = `SELECT pr.idProcedure as proc_id, pr.procName, pr.inCoverage, pr.priceFrom, pr.priceTo,
                ap.idOperation as appoin_id, ap.date, ap.price, ap.room, ap.comment,
                p.idPatient as patient_id, p.firstName, p.lastName, p.insurance, p.phone, p.email
                FROM ProcedureOper pr
                LEFT JOIN Appointment ap ON pr.idProcedure = ap.procedureId
                LEFT JOIN Patient p ON ap.patientId = p.idPatient
                where pr.IdProcedure = ?`

exports.getProcedureById = (procId) => {
    return db.promise().query(query, [procId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const procedure = {
                idProcedure: parseInt(procId),
                procName: firstRow.procName,
                inCoverage: firstRow.inCoverage,
                priceFrom: firstRow.priceFrom,
                priceTo: firstRow.priceTo,
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
                        patient: {
                            idPatient: row.patient_id,
                            firstName: row.firstName,
                            lastName: row.lastName,
                            insurance: row.insurance,
                            phone: row.phone,
                            email: row.email
                        }
                    };
                    procedure.appointments.push(appointment);
                }
            }
            return procedure;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createProcedure = (newProcedureData) => {
    const vRes = procedureOperSchema.validate(newProcedureData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const procName = newProcedureData.procName;
    const inCoverage = newProcedureData.inCoverage;
    const priceFrom = newProcedureData.priceFrom;
    let priceTo = null;
    if (newProcedureData.priceTo) {
        priceTo = newProcedureData.priceTo;
    }
    const sql = 'INSERT into ProcedureOper (procName, inCoverage, priceFrom, priceTo) VALUES (?, ?, ?, ?)'
    return db.promise().execute(sql, [procName, inCoverage, priceFrom, priceTo]);
};

exports.updateProcedure = (procedureId, procedureData) => {
    const vRes = procedureOperSchema.validate(procedureData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const procName = procedureData.procName;
    const inCoverage = procedureData.inCoverage;
    const priceFrom = procedureData.priceFrom;
    let priceTo = null;
    if (procedureData.priceTo) {
        priceTo = procedureData.priceTo;
    }
    const sql = `UPDATE ProcedureOper set procName = ?, inCoverage = ?, priceFrom = ?, priceTo = ? where idProcedure = ?`;
    return db.promise().execute(sql, [procName, inCoverage, priceFrom, priceTo, procedureId]);
};

exports.deleteProcedure = (procedureId) => {
    const sql1 = 'DELETE FROM Appointment where procedureId = ?'
    const sql2 = 'DELETE FROM ProcedureOper where idProcedure = ?'

    return db.promise().execute(sql1, [procedureId])
        .then(() => {
            return db.promise().execute(sql2, [procedureId])
        });
};