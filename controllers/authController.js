const PatientRepository = require('../repository/mysql2/PatientRepository');
const authUtil = require('../utils/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    PatientRepository.findByEmail(email)
        .then(patient => {
            if(!patient) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Invalid email address or password"
                })
            } else if (authUtil.comparePasswords(password, patient.password) === true) {
                //patient.password == password
                req.session.loggedUser = patient;
                console.log(patient);
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Invalid email address or password"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}