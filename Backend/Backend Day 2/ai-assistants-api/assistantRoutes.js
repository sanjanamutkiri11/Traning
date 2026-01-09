const express = require('express');
const router = express.Router();

const controller = require('./assistantController');

router.get('/', controller.getAssistants);
router.get('/:id', controller.getAssistantById);
router.post('/', controller.createAssistant);
router.put('/:id', controller.updateAssistantPut);
router.patch('/:id', controller.updateAssistantPatch);
router.delete('/:id', controller.deleteAssistant);
router.get('/role/:role', controller.getAssistantsByRole);

module.exports = router;
