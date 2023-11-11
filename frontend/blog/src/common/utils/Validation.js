
export function validateEmail (email) {
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return emailRegex.test(email);
};

export function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    return passwordRegex.test(password);
};

export function validateName(name) {
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    return nameRegex.test(name) && name.length >= 1;
};