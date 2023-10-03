const validation = ({username, password}) => {

   let errors = {};

   if(!username){
    errors.username = 'Please, insert your username'
   }

   if(!password){
    errors.password = 'Please, insert your password'
   }if(password.trim().length < 6){
    errors.password = 'Your password requires at least 6 characters'
   }

   return errors
}

export default validation;