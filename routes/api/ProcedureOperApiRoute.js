const express = require('express');
const router = express.Router();

const procedureApiController = require('../../api/ProceduteOperAPI');

router.get('/', procedureApiController.getProcedures);
router.get('/:procedureId', procedureApiController.getProcedureById);
router.post('/', procedureApiController.createProcedure);
router.put('/:procedureId', procedureApiController.updateProcedure);
router.delete('/:procedureId', procedureApiController.deleteProcedure);

module.exports = router;