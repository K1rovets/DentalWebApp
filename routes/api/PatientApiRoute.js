const express = require('express');
const router = express.Router();

const patientApiController = require('../../api/PatientAPI');

router.get('/', patientApiController.getPatients);
router.get('/:patientId', patientApiController.getPatientById);
router.post('/', patientApiController.createPatient);
router.put('/:patientId', patientApiController.updatePatient);
router.delete('/:patientId', patientApiController.deletePatient);

module.exports = router;