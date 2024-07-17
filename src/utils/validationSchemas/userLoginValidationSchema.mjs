const userLoginValidationSchema = {
    email:{ 
        notEmpty : {
            errorMessage: "The Email Field must no be empty"
        },
        isEmail: {
            errorMessage:"The Email enterd has typing Error"
        },
        
    },
    password:{
        notEmpty : {
            errorMessage: "The Password Field must no be empty"
        },
        isLength :{
            options:{
                min:7,
             },
            errorMessage:"The Password Must be a minimum of 7 characters"
        },
        isAlphanumeric:{
            errorMessage:"The Password must be Alphanumeric "
        }
    }
}

export default userLoginValidationSchema;