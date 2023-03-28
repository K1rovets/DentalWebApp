function validateForm() {
    const patient = document.getElementById(`patientId`);
    const procedure = document.getElementById(`procedureId`);
    const procDate = document.getElementById(`date`);
    const price = document.getElementById(`price`);
    const room = document.getElementById(`room`);

    const errorPatient = document.getElementById(`errorPatientName`);
    const errorProcedure = document.getElementById(`errorProcedure`);
    const errorProcDate = document.getElementById(`errorDate`);
    const errorPrice = document.getElementById(`errorPrice`);
    const errorRoom = document.getElementById(`errorRoom`);
    const errorSummary = document.getElementById(`errorsSummary`);

    //Client error texts:
    const fieldRequiredText = document.getElementById('fieldRequired').innerText;
    const fieldValidDateText = document.getElementById('fieldValidDate').innerText;
    const fieldValidHoursText = document.getElementById('fieldValidHours').innerText;
    const fieldValidNumberText = document.getElementById('fieldValidNumber').innerText;
    const fieldValidPriceText = document.getElementById('fieldValidPrice').innerText;
    const fieldValidRoomText = document.getElementById('fieldValidRoom').innerText; 
    const fieldSummaryText = document.getElementById('fieldSummary').innerText; 

    resetErrors([patient, procedure, procDate, price, room], [errorPatient, errorProcedure, errorProcDate, errorPrice, errorRoom], errorSummary);

    let valid = true;

    if (!checkRequired(patient.value)) {
        valid = false;
        patient.classList.add("error-input");
        errorPatient.innerText = fieldRequiredText;
    }

    if (!checkRequired(procedure.value)) {
        valid = false;
        procedure.classList.add("error-input");
        errorProcedure.innerText = fieldRequiredText;
    }

    if (!checkRequired(procDate.value)) {
        valid = false;
        procDate.classList.add("error-input");
        errorProcDate.innerText = fieldRequiredText;
    } else if (!checkDate(procDate.value)) {
        valid = false;
        procDate.classList.add("error-input");
        errorProcDate.innerText = fieldValidDateText;
    } else if (!checkDateTime(procDate.value)) {
        valid = false;
        procDate.classList.add("error-input");
        errorProcDate.innerText = fieldValidHoursText;
    }

    if (!checkRequired(price.value)) {
        valid = false;
        price.classList.add("error-input");
        errorPrice.innerText = fieldRequiredText;
    } else if (!checkNumber(price.value)) {
        valid = false;
        price.classList.add("error-input");
        errorPrice.innerText = fieldValidNumberText;
    } else if (!checkNumberRange(price.value, 100, 30_000)) {
        valid = false;
        price.classList.add("error-input");
        errorPrice.innerText = fieldValidPriceText;
    }

    if (!checkRequired(room.value)) {
        valid = false;
        room.classList.add("error-input");
        errorRoom.innerText = fieldRequiredText;
    } else if (!checkRoom(room.value)) {
        valid = false;
        room.classList.add("error-input");
        errorRoom.innerText = fieldValidRoomText;
    }

    if (!valid) {
        errorSummary.innerText = fieldSummaryText;
    }

    return valid;
}