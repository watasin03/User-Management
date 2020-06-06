const express = require('express');
const router = express.Router();
 
const ConfigController = require('../controllers/configurationController');

router.post('/detail/:id', ConfigController.UpdateDetail);
router.post('/config/:id', ConfigController.UpdateConfigUser);
router.delete('/delete/:id', ConfigController.Delete);

module.exports = router;