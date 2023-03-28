const express = require(`express`);
const router = express.Router();

const patientController = require(`../controllers/patientController`);
const authUtil = require('../utils/authUtils');

router.get(`/`, patientController.showPatientList);
router.get(`/add`, authUtil.permitAdminUser, patientController.showAddPatientForm);
router.get('/edit/:patientId', authUtil.permitAdminUser, patientController.showEditPatientForm);
router.get(`/details/:patientId`, patientController.showPatientDetailsForm); //MAYBE NEED SOME CHANGES

router.post('/add', patientController.addPatient);
router.post('/edit', authUtil.permitUserChange, patientController.updatePatient);
router.get('/delete/:patientId', patientController.deletePatient);

module.exports = router;