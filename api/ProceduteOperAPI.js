const ProcedureOperRepository = require('../repository/mysql2/ProcedureOperRepository');

exports.getProcedures = (request, respond, next) => {
    ProcedureOperRepository.getProcedures()
        .then(procedures => {
            respond.status(200).json(procedures);
        })
        .catch(err => {
            console.log("ProcedureOperAPI: " + err);
        });
};

exports.getProcedureById = (request, respond, next) => {
    const procedureId = request.params.procedureId;
    ProcedureOperRepository.getProcedureById(procedureId)
        .then(procedure => {
            if (!procedure) {
                respond.status(404).json({
                    message: 'Patient with id: ' + procedureId + ' not found'
                })
            } else {
                respond.status(200).json(procedure);
            }
        });
};

exports.createProcedure = (request, respond, next) => {
    ProcedureOperRepository.createProcedure(request.body)
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

exports.updateProcedure = (request, respond, next) => {
    const procedureId = request.params.procedureId;
    ProcedureOperRepository.updateProcedure(procedureId, request.body)
        .then(result => {
            respond.status(200).json({ message: 'Procedure updated!', procedure: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteProcedure = (request, respond, next) => {
    const procedureId = request.params.procedureId;
    ProcedureOperRepository.deleteProcedure(procedureId)
        .then(result => {
            respond.status(200).json({ message: 'Removed procedure', procedure: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
