


export const check_valid_create_user = (username=null, email=null, password=null, repeatPassword=null) => {
    const usernameRegex = /^[a-zA-Z0-9_-яА-ЯёЁ']{3,16}$/ 
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i  
    const pswRegex = /^[A-Za-z0-9_-{!@#$&*}]{6,18}$/

    if (!usernameRegex.test(username) && username !== null){
        return 'Имя пользователя не может быть пустым и должно содержать только буквы или цифры не меньше трех знаков.'
    }
    if (!emailRegex.test(email) && email !== null ){
        return 'Не верный формат email.'
    }
    if (!pswRegex.test(password) && password !== null ){
        return 'Пароль должен содержать не менее 6 символов и состоять из цифр и латинский букв'
    }
    if (password !== repeatPassword && repeatPassword !== null ){
        return 'Пароли не совпадают'
    }
    return null
}