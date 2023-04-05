function getFormData() {
    return new FormData(document.getElementById("department-login"));
}

function showErrorMessage(message) {
    const formErrorLabel = document.getElementById("validation-error-dept");
    formErrorLabel.classList.remove("d-none");
    formErrorLabel.innerText = message;
}

function loginDepartment() {
    const formData = getFormData();
    const request = new XMLHttpRequest();
    request.open("POST", "/users/login/department");
    request.send(formData);
    request.onload = function () {
        console.log(request);
        if(request.status === 200) {
            window.location.href = "/department/";
        }
        else if(request.status === 401) {
            showErrorMessage(request.response);
        }
        else if(request.status === 500) {
            showErrorMessage("Server error: contact SWO dev team.");
        }
    }
}