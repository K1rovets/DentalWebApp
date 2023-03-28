const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain, salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
    const res = bcrypt.compareSync(passPlain, passHash);
    return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if (loggedUser) {
        next();
    } else {
        throw new Error('unauthorized access')
    }
}

exports.permitAdminUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    const patientId = req.params.patientId

    console.log(patientId);
    console.log(loggedUser.idPatient);

    if (loggedUser.role === "admin") {
        next();
    } else if (loggedUser.idPatient == patientId) {
        next();
    } else {
        throw new Error('no rights, unauthorized access')
    }
}

exports.permitUserChange = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    const patientId = req.body.idPatient

    console.log(patientId);
    console.log(loggedUser.idPatient);

    if (loggedUser.idPatient == patientId || loggedUser.role === "admin") {
        next();
    } else {
        throw new Error('no rights, cannot change ID, unauthorized access')
    }
}