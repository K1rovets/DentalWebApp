const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "joiError.fieldRequiredCheck";
                break;
            case "string.min":
                err.message = `joiError.fieldLeastCharCheck`;
                break;
            case "string.max":
                err.message = `joiError.fieldMostCharCheck`;
                break;
            case "string.email":
                err.message = `joiError.fieldEmailCheck`;
                break;
            case "string.pattern.name":
                err.message = `joiError.fieldNameCheck`;
                break;
            default:
                break;
        }
    });
    return errors;
    //${err.local.limit}
}

const patientSchema = Joi.object({
    idPatient: Joi.number().optional().allow(""),
    firstName: Joi.string().min(2).max(60).required().error(errMessages),
    lastName: Joi.string().min(2).max(60).required().error(errMessages),
    insurance: Joi.string().min(7).max(11).pattern(/^[0-9]+$/, 'insurance').required().error(errMessages),
    phone: Joi.string().min(9).max(15).pattern(/^[\+]?[0-9]{2}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$/, 'phoneNumbers').required().error(errMessages),
    email: Joi.string().email().required().error(errMessages),
    password: Joi.string().min(4).max(16).required().error(errMessages),
});

module.exports = patientSchema;