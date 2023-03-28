const express = require(`express`);
const router = express.Router();

const appointmentController = require(`../controllers/appointmentController`);
const authUtil = require('../utils/authUtils');

router.get(`/`, appointmentController.showAppointmentList);
router.get(`/add`, authUtil.permitAdminUser, appointmentController.showAddAppointmentForm);
router.get('/edit/:appoinId', authUtil.permitAdminUser, appointmentController.showEditAppointmentForm);
router.get(`/details/:appoinId`, appointmentController.showAppointmentDetailsForm); //MAYBE NEED SOME CHANGES

router.post('/add', appointmentController.addAppointment);
router.post('/edit', appointmentController.updateAppointment);
router.get('/delete/:appoinId', appointmentController.deleteAppointment);

module.exports = router;