const PatientRepository = require('../repository/mysql2/PatientRepository');

exports.getPatients = (request, respond, next) => {
    PatientRepository.getPatients()
        .then(patients => {
            respond.status(200).json(patients);
        })
        .catch(err => {
            console.log("PatientAPI: " + err);
        });
};

exports.getPatientById = (request, respond, next) => {
    const patientId = request.params.patientId;
    PatientRepository.getPatientById(patientId)
        .then(patient => {
            if (!patient) {
                respond.status(404).json({
                    message: 'Patient with id: ' + patientId + ' not found'
                })
            } else {
                respond.status(200).json(patient);
            }
        });
};

exports.createPatient = (request, respond, next) => {
    PatientRepository.createPatient(request.body)
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

exports.updatePatient = (request, respond, next) => {
    const patientId = request.params.patientId;
    PatientRepository.updatePatient(patientId, request.body)
        .then(result => {
            respond.status(200).json({ message: 'Patient updated!', patient: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deletePatient = (request, respond, next) => {
    const patientId = request.params.patientId;
    PatientRepository.deletePatient(patientId)
        .then(result => {
            respond.status(200).json({ message: 'Removed patient', patient: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
