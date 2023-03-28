const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "joiError.fieldRequiredCheck";
                break;
            case "any.required":
                err.message = "joiError.fieldRequiredCheck";
                break;
            case "number.base":
                err.message = `joiError.fieldRequiredCheck`;
                break;
            case "number.greater":
                err.message = `joiError.fieldMinPriceCheck`;
                break;
            case "number.less":
                err.message = `joiError.fieldMaxPriceCheck`;
                break;
            case "number.min":
                err.message = `joiError.fieldRoomCheck`;
                break;
            case "number.max":
                err.message = `joiError.fieldRoomCheck`;
                break;
            case "date.base":
                err.message = `joiError.fieldRequiredCheck`;
                break;
            case "date.format":
                err.message = `joiError.fieldDateCheck`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const appointSchema = Joi.object({
    idOperation: Joi.number().optional().allow(""),
    patientId: Joi.number().integer().required().error(errMessages),
    procedureId: Joi.number().integer().required().error(errMessages),
    date: Joi.date().iso().min('1-1-2020').required().error(errMessages),
    price: Joi.number().integer().greater(100).less(40000).required().error(errMessages),
    room: Joi.number().integer().min(1).max(7).required().error(errMessages),
    comment: Joi.string().optional().allow("")
});

module.exports = appointSchema;