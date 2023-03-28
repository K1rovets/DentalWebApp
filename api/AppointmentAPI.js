const AppointmentRepository = require('../repository/mysql2/AppointmentRepository');

exports.getAppointments = (request, respond, next) => {
    AppointmentRepository.getAppointments()
        .then(appointments => {
            respond.status(200).json(appointments);
        })
        .catch(err => {
            console.log("AppointmentAPI: " + err);
        });
};

exports.getAppointmentById = (request, respond, next) => {
    const appoinId = request.params.appoinId;
    AppointmentRepository.getAppointmentById(appoinId)
        .then(Appointment => {
            if (!Appointment) {
                respond.status(404).json({
                    message: 'Appointment with id: ' + appoinId + ' not found'
                })
            } else {
                respond.status(200).json(Appointment);
            }
        });
};

exports.createAppointment = (request, respond, next) => {
    AppointmentRepository.createAppointment(request.body)
        .then(newObj => {
            respond.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateAppointment = (request, respond, next) => {
    const appoinId = request.params.appoinId;
    AppointmentRepository.updateAppointment(appoinId, request.body)
        .then(result => {
            respond.status(200).json({ message: 'Appointment updated!', Appointment: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteAppointment = (request, respond, next) => {
    const appoinId = request.params.appoinId;
    AppointmentRepository.deleteAppointment(appoinId)
        .then(result => {
            respond.status(200).json({ message: 'Removed Appointment', Appointment: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};