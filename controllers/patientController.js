const PatientRepository = require('../repository/mysql2/PatientRepository');

exports.showPatientList = (request, respond, next) => {
    PatientRepository.getPatients()
        .then(patients => {
            respond.render(`pages/patient/list`, {
                patients: patients,
                navLocation: 'patient'
            });
        });
}

exports.showAddPatientForm = (request, respond, next) => {
    respond.render(`pages/patient/form`, {
        patient: {},
        pageTitle: request.__('patient.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: request.__('patient.form.add.btnLabel'),
        formAction: '/patient/add',
        navLocation: 'patient',
        validationErrors: []
    });
}

exports.showEditPatientForm = (request, respond, next) => {
    const patientId = request.params.patientId;
    PatientRepository.getPatientById(patientId)
        .then(patient => {
            respond.render(`pages/patient/form`, {
                patient: patient,
                pageTitle: request.__('patient.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: request.__('patient.form.edit.btnLabel'),
                formAction: '/patient/edit',
                navLocation: 'patient',
                validationErrors: []
            });
        });
}

exports.showPatientDetailsForm = (request, respond, next) => {
    const patientId = request.params.patientId;
    PatientRepository.getPatientById(patientId)
        .then(patient => {
            respond.render(`pages/patient/form`, {
                patient: patient,
                pageTitle: request.__('patient.form.details.pageTitle'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'patient',
                validationErrors: []
            });
        });
}

exports.addPatient = (request, respond, next) => {
    const patientData = { ...request.body };
    PatientRepository.createPatient(patientData)
        .then(result => {
            respond.redirect('/patient');
        })
        .catch(err => {
            respond.render('pages/patient/form', {
                patient: patientData,
                pageTitle: 'New patient',
                formMode: 'createNew',
                btnLabel: 'Add patient',
                formAction: '/patient/add',
                navLocation: 'patient',
                validationErrors: err.details
            });
            console.log("error details " + err.details);
        });
        
};

exports.updatePatient = (request, respond, next) => {
    const patientId = request.body.idPatient;
    const patientData = { ...request.body };
    PatientRepository.updatePatient(patientId, patientData)
        .then(result => {
            respond.redirect('/patient');
        })
        .catch(err => {
            respond.render('pages/patient/form', {
                patient: request.body,
                pageTitle: 'Edit patient',
                formMode: 'edit',
                btnLabel: 'Edit patient',
                formAction: '/patient/edit',
                navLocation: 'patient',
                validationErrors: err.details
            });
        });
};

exports.deletePatient = (request, respond, next) => {
    const patientId = request.params.patientId;
    PatientRepository.deletePatient(patientId)
        .then(() => {
            respond.redirect('/patient');
        });
};