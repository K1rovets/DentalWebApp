const express = require(`express`);
const router = express.Router();

const procedureController = require(`../controllers/procedureController`);
const authUtil = require('../utils/authUtils');

router.get(`/`, procedureController.showProcedureList);
router.get(`/add`, authUtil.permitAdminUser, procedureController.showAddProcedureForm);
router.get('/edit/:procedureId', authUtil.permitAdminUser, procedureController.showEditProcedureForm)
router.get(`/details/:procedureId`, procedureController.showProcedureDetailsForm); //MAYBE NEED SOME CHANGES

router.post('/add', procedureController.addProcedure);
router.post('/edit', procedureController.updateProcedure);
router.get('/delete/:procedureId', procedureController.deleteProcedure);

module.exports = router;