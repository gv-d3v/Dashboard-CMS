export function RegisterTestFields(name, email, role, validateEmail, validatePassword, password, passwordConfirm, setError) {
 
    if (email && validateEmail(email) === false) {
        setError('Please enter correct email adress');
        return;
    }

    if (!name && email && password && passwordConfirm) {
        setError('Please fill out full name field');
        return;
    }

    if (name && !email && password && passwordConfirm) {
        setError('Please fill out email field');
        return;
    }

    if (name && email && !password && passwordConfirm) {
        setError('Please fill out password field');
        return;
    }

    if (password && validatePassword(password) === false) {
        setError(
            'The password must be more than 8 characters, at least 1 lower case, 1 upper case, 1 numeric character, and one special character.'
        );
        return;
    }

    if (name && email && password && !passwordConfirm) {
        setError('Please confirm password');
        return;
    }

    if (!name || !email || !password || !passwordConfirm) {
        setError('All fields are necessary');
        return;
    }

    if (password !== passwordConfirm) {
        setError('Password does not match');
        return;
    }

    if (role === '') {
        setError('Please chose role for this user');
        return;
    }
    return true
}

export default RegisterTestFields;
