const express = require('express');
const router = express.Router();

const appointmentApiController = require('../../api/AppointmentAPI');

router.get('/', appointmentApiController.getAppointments);
router.get('/:appoinId', appointmentApiController.getAppointmentById);
router.post('/', appointmentApiController.createAppointment);
router.put('/:appoinId', appointmentApiController.updateAppointment);
router.delete('/:appoinId', appointmentApiController.deleteAppointment);

module.exports = router;