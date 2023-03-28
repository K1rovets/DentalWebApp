function validateForm() {
    const firstNameInput = document.getElementById(`firstName`);
    const surnameInput = document.getElementById(`lastName`);
    const phoneInput = document.getElementById(`phone`);
    const insuranceInput = document.getElementById(`insurance`);
    const emailInput = document.getElementById(`email`);
    const passwordInput = document.getElementById('password');

    const errorFirstName = document.getElementById(`errorFirstName`);
    const errorSurname = document.getElementById(`errorSurname`);
    const errorPhone = document.getElementById(`errorPhone`);
    const errorInsurance = document.getElementById('errorInsurance');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorSummary = document.getElementById(`errorsSummary`);

    //Client error texts:
    const fieldRequiredText = document.getElementById('fieldRequired').innerText;
    const field2_60charText = document.getElementById('field2_60char').innerText;
    const field7_11charText = document.getElementById('field7_11char').innerText;
    const fieldValidInsuranceText = document.getElementById('fieldValidInsurance').innerText;
    const fieldNoSignInsuranceText = document.getElementById('fieldNoSignInsurance').innerText;
    const field9_12charText = document.getElementById('field9_12char').innerText;
    const fieldValidPhoneText = document.getElementById('fieldValidPhone').innerText;
    const field5_60charText = document.getElementById('field5_60char').innerText;
    const fieldValidEmailText = document.getElementById('fieldValidEmail').innerText;
    const field4_16charText = document.getElementById('field4_16char').innerText;
    const fieldSummaryText = document.getElementById('fieldSummary').innerText;    

    resetErrors([firstNameInput, surnameInput, insuranceInput, phoneInput, emailInput, passwordInput], [errorFirstName, errorSurname, errorInsurance, errorPhone, errorEmail, errorPassword], errorSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = fieldRequiredText;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = field2_60charText;
    }

    if (!checkRequired(surnameInput.value)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = fieldRequiredText;
    } else if (!checkTextLengthRange(surnameInput.value, 2, 60)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = field2_60charText;
    }

    if (!checkRequired(insuranceInput.value)) {
        valid = false;
        insuranceInput.classList.add("error-input");
        errorInsurance.innerText = fieldRequiredText;
    } else if (!checkTextLengthRange(insuranceInput.value, 7, 11)) {
        valid = false;
        insuranceInput.classList.add("error-input");
        errorInsurance.innerText = field7_11charText;
    } else if (!checkNumber(insuranceInput.value)) {
        valid = false;
        insuranceInput.classList.add("error-input");
        errorInsurance.innerText = fieldValidInsuranceText;
    } else if (!checkSign(insuranceInput.value)) {
        valid = false;
        insuranceInput.classList.add("error-input");
        errorInsurance.innerText = fieldNoSignInsuranceText;
    }

    if (!checkRequired(phoneInput.value)) {
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = fieldRequiredText;
    } else if (!checkTextLengthRange(phoneInput.value, 9, 15)) {
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = field9_12charText;
    } else if (!checkPhone(phoneInput.value)) {
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = fieldValidPhoneText;
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = fieldRequiredText;
    }
    else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = field5_60charText;
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = fieldValidEmailText;
    }

    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = fieldRequiredText;
    } else if (!checkTextLengthRange(passwordInput.value, 4, 16)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = field4_16charText;
    }

    if (!valid) {
        errorSummary.innerText = fieldSummaryText;
    }

    return valid;
}