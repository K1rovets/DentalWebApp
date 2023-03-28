const AppointmentRepository = require('../repository/mysql2/AppointmentRepository');
const PatientRepository = require('../repository/mysql2/PatientRepository');
const ProcedureOperRepository = require('../repository/mysql2/ProcedureOperRepository');

exports.showAppointmentList = (request, respond, next) => {
    AppointmentRepository.getAppointments()
        .then(appointments => {
            respond.render(`pages/appointment/list`, {
                appointments: appointments,
                navLocation: 'appointment'
            });
        });
}

exports.showAddAppointmentForm = (request, respond, next) => {
    let allPatients, allProcedures;
    PatientRepository.getPatients()
        .then(patients => {
            allPatients = patients
            return ProcedureOperRepository.getProcedures();
        })
        .then(procedures => {
            allProcedures = procedures;
            respond.render(`pages/appointment/form`, {
                appointment: {},
                pageTitle: request.__('appointment.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: request.__('appointment.form.add.btnLabel'),
                formAction: '/appointment/add',
                navLocation: 'appointment',
                allPatients: allPatients,
                allProcedures: allProcedures,
                validationErrors: []
            });
        });
}

exports.showEditAppointmentForm = (request, respond, next) => {
    const appoinId = request.params.appoinId;
    let allPatients, allProcedures;
    AppointmentRepository.getAppointmentById(appoinId)
        .then(appointment => {
            PatientRepository.getPatients()
                .then(patients => {
                    allPatients = patients
                    return ProcedureOperRepository.getProcedures();
                })
                .then(procedures => {
                    allProcedures = procedures;
                    respond.render(`pages/appointment/form`, {
                        appointment: appointment,
                        pageTitle: request.__('appointment.form.edit.pageTitle'),
                        formMode: 'edit',
                        btnLabel: request.__('appointment.form.edit.btnLabel'),
                        formAction: '/appointment/edit',
                        navLocation: 'appointment',
                        allPatients: allPatients,
                        allProcedures: allProcedures,
                        validationErrors: []
                    });
                });
        });
}

exports.showAppointmentDetailsForm = (request, respond, next) => {
    const appoinId = request.params.appoinId;
    let allPatients, allProcedures;
    AppointmentRepository.getAppointmentById(appoinId)
        .then(appointment => {
            PatientRepository.getPatients()
                .then(patients => {
                    allPatients = patients
                    return ProcedureOperRepository.getProcedures();
                })
                .then(procedures => {
                    allProcedures = procedures;
                    respond.render(`pages/appointment/form`, {
                        appointment: appointment,
                        pageTitle: request.__('appointment.form.details.pageTitle'),
                        formMode: 'showDetails',
                        formAction: '',
                        navLocation: 'appointment',
                        allPatients: allPatients,
                        allProcedures: allProcedures,
                        validationErrors: []
                    });
                });
        });
}

exports.addAppointment = (request, respond, next) => {
    const appoinData = { ...request.body };
    let allPatients, allProcedures;
    AppointmentRepository.createAppointment(appoinData)
        .then(result => {
            respond.redirect('/appointment');
        })
        .catch(err => {
            PatientRepository.getPatients()
                .then(patients => {
                    allPatients = patients;
                    return ProcedureOperRepository.getProcedures();
                })
                .then(procedures => {
                    allProcedures = procedures;
                    respond.render(`pages/appointment/form`, {
                        appointment: request.body,
                        pageTitle: 'New appointment',
                        formMode: 'createNew',
                        btnLabel: 'Add appointment',
                        formAction: '/appointment/add',
                        navLocation: 'appointment',
                        allPatients: allPatients,
                        allProcedures: allProcedures,
                        validationErrors: err.details
                    });
                });
        });
}

exports.updateAppointment = (request, respond, next) => {
    const appoinId = request.body.idOperation;
    const appoinData = { ...request.body };
    AppointmentRepository.updateAppointment(appoinId, appoinData)
        .then(result => {
            respond.redirect('/appointment');
        })
        .catch(err => {
            PatientRepository.getPatients()
                .then(patients => {
                    allPatients = patients;
                    return ProcedureOperRepository.getProcedures();
                })
                .then(procedures => {
                    allProcedures = procedures;
                    respond.render(`pages/appointment/form`, {
                        appointment: request.body,
                        pageTitle: 'Edit appointment',
                        formMode: 'edit',
                        btnLabel: 'Edit appointment',
                        formAction: '/appointment/edit',
                        navLocation: 'appointment',
                        allPatients: allPatients,
                        allProcedures: allProcedures,
                        validationErrors: err.details
                    });
                });
        });
}

exports.deleteAppointment = (request, respond, next) => {
    const appoinId = request.params.appoinId;
    AppointmentRepository.deleteAppointment(appoinId)
        .then(() => {
            respond.redirect('/appointment');
        });
}