var express = require(`express`);
var router = express.Router();
const AuthController = require('../controllers/authController');
const langContoller = require('../controllers/langController');

/* GET home page. */
router.get(`/`, function (req, res, next) {
  res.render(`index`, { navLocation: `main` });
});

router.get('/changeLang/:lang', langContoller.changeLang);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);


module.exports = router;