const db = require('../../config/mysql2/db');
const appointSchema = require('../../model/joi/Appointment');

const query1 = `SELECT ap.idOperation as appoin_id, ap.date, ap.price, ap.room, ap.comment,
                pr.idProcedure as proc_id, pr.procName, pr.inCoverage,
                p.idPatient as patient_id, p.firstName, p.lastName, p.insurance, p.phone, p.email
                FROM Appointment ap
                left join Patient p on ap.patientId = p.idPatient
                left join ProcedureOper pr on ap.procedureId = pr.idProcedure`

exports.getAppointments = () => {
    return db.promise().query(query1)
        .then((results, fields) => {
            const appointments = [];
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
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
                    },
                    patient: {
                        idPatient: row.patient_id,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        insurance: row.insurance,
                        phone: row.phone,
                        email: row.email
                    }
                };
                appointments.push(appointment);
            }
            return appointments;
        })
        .catch(err => {
            console.log("Appoin repository getAppointments error" + err);
        })
};

const query2 = `SELECT ap.idOperation as appoin_id, ap.patientId, ap.procedureId, ap.date, ap.price, ap.room, ap.comment,
                pr.idProcedure as proc_id, pr.procName, pr.inCoverage,
                p.idPatient as patient_id, p.firstName, p.lastName, p.insurance, p.phone, p.email
                FROM Appointment ap
                left join Patient p on ap.patientId = p.idPatient
                left join ProcedureOper pr on ap.procedureId = pr.idProcedure
                WHERE ap.idOperation = ?`

exports.getAppointmentById = (AppointmentId) => {
    return db.promise().query(query2, [AppointmentId])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return [];
            }
            const appointment = {
                idOperation: parseInt(AppointmentId),
                patientId: row.patientId,
                procedureId: row.procedureId,
                date: row.date,
                price: row.price,
                room: row.room,
                comment: row.comment,
                procedureOper: {
                    idProcedure: row.proc_id,
                    procName: row.procName,
                    inCoverage: row.inCoverage
                },
                patient: {
                    idPatient: row.patient_id,
                    firstName: row.firstName,
                    lastName: row.lastName,
                    insurance: row.insurance,
                    phone: row.phone,
                    email: row.email
                }
            };
            return appointment;
        })
        .catch(err => {
            console.log("Appoin repository getAppointmentById error" + err);
            throw err;
        });
};

exports.createAppointment = (newAppointmentData) => {
    const vRes = appointSchema.validate(newAppointmentData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const patientId = newAppointmentData.patientId;
    const procedureId = newAppointmentData.procedureId;
    const date = newAppointmentData.date;
    const price = newAppointmentData.price;
    const room = newAppointmentData.room;
    let commentAppoin = null;
    if (newAppointmentData.comment) {
        commentAppoin = newAppointmentData.comment;
    }
    const sql = 'INSERT into Appointment (patientId, procedureId, date, price, room, comment) VALUES (?, ?, ?, ?, ?, ?)';
    return db.promise().execute(sql, [patientId, procedureId, date, price, room, commentAppoin]);
};

exports.updateAppointment = (AppointmentId, AppointmentData) => {
    const vRes = appointSchema.validate(AppointmentData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const patientId = AppointmentData.patientId;
    const procedureId = AppointmentData.procedureId;
    const date = AppointmentData.date;
    const price = AppointmentData.price;
    const room = AppointmentData.room;
    let commentAppoin = null;
    if (AppointmentData.comment) {
        commentAppoin = AppointmentData.comment;
    }
    const sql = 'UPDATE Appointment set patientId = ?, procedureId = ?, date = ?, price = ?, room = ?, comment = ? where idOperation = ?';
    return db.promise().execute(sql, [patientId, procedureId, date, price, room, commentAppoin, AppointmentId]);
};

exports.deleteAppointment = (AppointmentId) => {
    const sql = 'DELETE FROM Appointment WHERE idOperation = ?'
    return db.promise().execute(sql, [AppointmentId]);
};