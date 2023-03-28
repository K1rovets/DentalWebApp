function validateForm() {
    const procedureName = document.getElementById(`procName`);
    const coverageInput = document.getElementById(`inCoverage`);
    const priceFrom = document.getElementById(`priceFrom`);
    const priceTo = document.getElementById('priceTo');

    const errorProcedureName = document.getElementById(`errorProcedureName`);
    const errorCoverage = document.getElementById(`errorCoverage`);
    const errorPriceFrom = document.getElementById(`errorPriceFrom`);
    const errorPriceTo = document.getElementById('errorPriceTo');
    const errorSummary = document.getElementById(`errorsSummary`);

    //Client error texts:
    const fieldRequiredText = document.getElementById('fieldRequired').innerText;
    const field10_60charText = document.getElementById('field10_60char').innerText;
    const fieldPriceFromText = document.getElementById('fieldPriceFrom').innerText;
    const fieldValidNumberText = document.getElementById('fieldValidNumber').innerText;
    const fieldPriceToText = document.getElementById('fieldPriceTo').innerText;
    const fieldSummaryText = document.getElementById('fieldSummary').innerText;  

    resetErrors([procedureName, coverageInput, priceFrom, priceTo], [errorProcedureName, errorCoverage, errorPriceFrom, errorPriceTo], errorSummary);

    let valid = true;

    if (!checkRequired(procedureName.value)) {
        valid = false;
        procedureName.classList.add("error-input");
        errorProcedureName.innerText = fieldRequiredText;
    } else if (!checkTextLengthRange(procedureName.value, 10, 60)) {
        valid = false;
        procedureName.classList.add("error-input");
        errorProcedureName.innerText = field10_60charText;
    }

    if (!checkRequired(coverageInput.value)) {
        valid = false;
        coverageInput.classList.add("error-input");
        errorCoverage.innerText = fieldRequiredText;
    }

    if (!checkRequired(priceFrom.value)) {
        valid = false;
        priceFrom.classList.add("error-input");
        errorPriceFrom.innerText = fieldRequiredText;
    } else if (!checkNumberRange(priceFrom.value, 100, 30_000)) {
        valid = false;
        priceFrom.classList.add("error-input");
        errorPriceFrom.innerText = fieldPriceFromText;
    }

    if (!checkRequired(priceTo.value)) {
        valid = false;
    } else if (!checkNumber(priceTo.value)) {
        valid = false;
        priceFrom.classList.add("error-input");
        errorPriceFrom.innerText = fieldValidNumberText;
    } else if (!checkIsBigger(priceTo.value, priceFrom.value)) {
        valid = false;
        priceTo.classList.add("error-input");
        errorPriceTo.innerText = fieldPriceToText;
    }

    if (!valid) {
        errorSummary.innerText = fieldSummaryText;
    }

    return valid;
}