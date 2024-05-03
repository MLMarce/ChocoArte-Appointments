export default function validateData({name, email, birthDate, nDni, username, password, confirmPassword}) {
    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
    const passwordRegExp = /^(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)[A-Za-z\d@$!%*?&]{8,}$/

    let errors = {}
    if(name.trim().length < 4) errors = {name: "El nombre debe contener 4 caracteres como mínimo"}
    else if(!emailRegExp.test(email)) errors = {email: "Ingresa tu correo electronico"}
    else if(!birthDate) errors = {birthDate: "Debes ingresar tu fecha de nacimiento"}
    else if(!nDni) errors = {nDni: "Ingresa tu número de documento"}
    else if(nDni.trim().length < 5) errors = {nDni: "El número de documento debe ser válido"}
    else if(!username) errors = {username: "Ingresa un nombre de usuario"}
    else if(username.trim().length < 4) errors = {username: "El nombre de usuario debe contener almenos 4 caracteres"}
    else if(!password) errors = {password: "Ingresa una contraseña"}
    else if(password.length < 6) errors = {password: "La contraseña debe tener mas de 5 caracteres"}
    else if(!passwordRegExp.test(password)) errors= {password: "La contraseña debe tener almenos 2 números y 2 letras mayúsculas"}
    else if(!confirmPassword) errors = {confirmPassword: "Confirma la contraseña"}
    else if(confirmPassword !== password) errors = {confirmPassword: "Las contraseñas deben coincidir"}
    else {
        errors = {}
    }

    return errors;
}