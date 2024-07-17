const shopSignupValidationSchema = {
    shopname : {
        notEmpty : {
            errorMessage: "The username must no be empty"
        },
        isLength:{
            options: {
                min: 3,
                max: 32
            },
            errorMessage : "The username must be a minimum of 3 characters and a max of 32 characters"
        },
        isString: {
            errorMessage: "The name must be a string"
        },
    },
    phone : {
        notEmpty : {
            errorMessage: "The User Must have a Phone Number"
        },
    },
    password : {
        notEmpty : {
            errorMessage: "The password must no be empty"
        },
        isLength:{
            options: {
                min: 5,
            },
            errorMessage : "The user password must be a minimum of 5 characters"
        },
        isAlphanumeric: {
            errorMessage: "The password must be a alphanumeric"
        },
        
    },
    confirmPassword : {
        notEmpty : {
            errorMessage: "The password must no be empty"
        },
        isLength:{
            options: {
                min: 5,
            },
            errorMessage : "The password must be a minimum of 5 characters"
        },
        isAlphanumeric: {
            errorMessage: "The password must be a alphanumeric"
        },
        custom : {
            options: (value, { req }) => {
                if (value === req.body.password) {
                    return true;
                }
                throw new Error("The passwords don't match");
            }}
    },
    email:{
        notEmpty : {
            errorMessage: "The Email must no be empty"
        },
        isEmail:{
            errorMessage:"Kindly use correct email address"
        }
    },
    shoplogo:{
        notEmpty : {
            errorMessage: "The ShopLogo must no be empty"
        },
        isString:{
            errorMessage:"Kindly use correct Shop Logo Link"
        },

    },
   
}

export default shopSignupValidationSchema;