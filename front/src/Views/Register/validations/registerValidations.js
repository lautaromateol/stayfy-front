const registerValidation = ({fullname, email, username, password}) => {
    
    let errors = {};

    const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!fullname){
        errors.fullname = 'Please, insert your full name'
    }else if(fullname.trim().length < 3){
        errors.fullname = 'This field must have at least 3 characters'
    }

    if(!email){
        errors.email = 'Please, insert an email'
    }else if(!regexEmail.test(email)){
        errors.email = 'Invalid email'
    }

    if(!username){
        errors.username = 'Please, insert a username'
    }else if(username.trim().length < 3){
        errors.username = 'This field must have at least 3 characters'
    }

    if(!password){
        errors.password = 'Please, insert a password'
    }else if(!regexPassword.test(password)){
        errors.password = 'At least: 8 characters, 1 uppercase and 1 number '
    }

    return errors
}

export default registerValidation;