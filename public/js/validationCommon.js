function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }

    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }

    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }

    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }

    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }

    return true;
}

function checkPhone(value) {
    if (!value) {
        return false;
    }

    value = value.toString().trim();

    if (Math.sign(value) == -1) {
        return false;
    }

    const re = /^[\+]?[0-9]{2}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$/;
    return re.test(value);
}

function checkDate(value) {
    if (!value) {
        return false;
    }

    console.log(value);

    const pattern = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
    return pattern.test(value);
}

function checkDateTime(value) {
    let time = value.split("T")[1].split(`:`);
    let hours = parseInt(time[0]);
    let minutes = parseInt(time[1]);

    if (hours < 8 && minutes < 30) {
        return false;
    }
    if (hours > 20) {
        return false;
    }

    return true;
}

function checkNumber(value) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    return true;
}

function checkNumberRange(value, min, max) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    value = parseFloat(value);
    if (value < min) {
        return false;
    }
    if (value > max) {
        return false;
    }
    return true;
}


function checkIsBigger(value1, value2) {
    value1 = parseInt(value1);
    value2 = parseInt(value2);
    if (value1 < value2) {
        return false;
    }
    return true;
}

function checkSign(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (Math.sign(value) == -1) {
        return false;
    }
    if (value.includes("+")) {
        return false;
    }
    return true;
}

function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}

function checkRoom(value) {
    if (!value) {
        return false;
    }
    value = parseInt(value);
    if (value < 1) {
        return false;
    }
    if (value > 7) {
        return false;
    }
    return true;
}