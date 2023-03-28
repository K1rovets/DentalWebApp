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
                err.message = `joiError.fieldLeastCharCheck`;
                break;
            case "any.required":
                err.message = `joiError.fieldRequiredCheck`;
                break;
            case "number.base":
                err.message = `joiError.fieldPriceCheck`;
                break;
            case "number.min":
                err.message = `joiError.fieldMinPriceCheck`;
                break;
            case "number.max":
                err.message = `joiError.fieldMaxPriceCheck`;
                break;
            case "number.greater":
                err.message = `joiError.fieldGreaterPriceCheck`;
                break;
            case "any.ref":
                err.message = `joiError.fieldLesserPriceCheck`;
                break;
            default:
                break;
        }
    })
    return errors;
    //${err.local.limit}
}

const procedureOperSchema = Joi.object({
    idProcedure: Joi.number().optional().allow(""),
    procName: Joi.string().min(10).max(60).required().error(errMessages),
    inCoverage: Joi.string().required().error(errMessages),
    priceFrom: Joi.number().integer().min(100).max(30000).required().error(errMessages),
    priceTo: Joi.number().integer().optional().allow("").greater(Joi.ref('priceFrom')).error(errMessages),
})

module.exports = procedureOperSchema;