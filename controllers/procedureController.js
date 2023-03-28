const ProcedureOperRepository = require('../repository/mysql2/ProcedureOperRepository');

exports.showProcedureList = (request, respond, next) => {
    ProcedureOperRepository.getProcedures()
        .then(procedures => {
            respond.render(`pages/procedure/list`, {
                procedures: procedures,
                navLocation: 'procedure'
            });
        });
}

exports.showAddProcedureForm = (request, respond, next) => {
    respond.render(`pages/procedure/form`, {
        procedure: {},
        pageTitle: request.__('procedure.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: request.__('procedure.form.add.btnLabel'),
        formAction: '/procedure/add',
        navLocation: 'procedure',
        validationErrors: []
    });
}

exports.showEditProcedureForm = (request, respond, next) => {
    const procedureId = request.params.procedureId;
    ProcedureOperRepository.getProcedureById(procedureId)
        .then(procedure => {
            respond.render(`pages/procedure/form`, {
                procedure: procedure,
                pageTitle: request.__('procedure.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: request.__('procedure.form.edit.btnLabel'),
                formAction: '/procedure/edit',
                navLocation: 'procedure',
                validationErrors: []
            });
        });
}

exports.showProcedureDetailsForm = (request, respond, next) => {
    const procedureId = request.params.procedureId;
    ProcedureOperRepository.getProcedureById(procedureId)
        .then(procedure => {
            respond.render(`pages/procedure/form`, {
                procedure: procedure,
                pageTitle: request.__('procedure.form.details.pageTitle'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'procedure',
                validationErrors: []
            });
        });
}

exports.addProcedure = (request, respond, next) => {
    const procedureData = { ...request.body };
    ProcedureOperRepository.createProcedure(procedureData)
        .then(result => {
            respond.redirect('/procedure');
        })
        .catch(err => {
            respond.render(`pages/procedure/form`, {
                procedure: procedureData,
                pageTitle: 'New procedure',
                formMode: 'createNew',
                btnLabel: 'Add procedure',
                formAction: '/procedure/add',
                navLocation: 'procedure',
                validationErrors: err.details
            });
        });
}

exports.updateProcedure = (request, respond, next) => {
    const procedureId = request.body.idProcedure;
    const procedureData = { ...request.body };
    ProcedureOperRepository.updateProcedure(procedureId, procedureData)
        .then(result => {
            respond.redirect('/procedure');
        })
        .catch(err => {
            respond.render(`pages/procedure/form`, {
                procedure: request.body,
                pageTitle: 'Edit procedure',
                formMode: 'edit',
                btnLabel: 'Edit procedure',
                formAction: '/procedure/edit',
                navLocation: 'procedure',
                validationErrors: err.details
            });
        });
}

exports.deleteProcedure = (request, respond, next) => {
    const prodecureId = request.params.procedureId;
    ProcedureOperRepository.deleteProcedure(prodecureId)
        .then(() => {
            respond.redirect('/procedure');
        });
};