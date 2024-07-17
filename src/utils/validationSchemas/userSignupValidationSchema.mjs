const userSignupValidationSchema = {
    username : {
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
    displayname : {
        notEmpty : {
            errorMessage: "The displayname must no be empty"
        },
        isLength:{
            options: {
                min: 3,
                max: 20
            },
            errorMessage : "The user name must be a minimum of 3 characters and a max of 32 characters"
        },
        isString: {
            errorMessage: "The displayname must be a string"
        },
    },
    /*ethnicity : {
        notEmpty : {
            errorMessage: "The User Must have an ethnicity"
        },
        isLength:{
            options: {
                min: 3,
                max: 20
            },
            errorMessage : "ethnicity must be descriptive"
        },
        isString: {
            errorMessage: "The ethnicity name must be a string"
        },
    },
    nationality : {
        notEmpty : {
            errorMessage: "The User Must have a Nationality"
        },
        isLength:{
            options: {
                min: 3,
                max: 20
            },
            errorMessage : "Nationality must be descriptive"
        },
        isString: {
            errorMessage: "The Nationality name must be a string"
        },
    },
    age : {
        notEmpty : {
            errorMessage: "The User Must have a Age"
        },
        isInt:{
            errorMessage : "Age must be number"
        },
        
    },*/
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
        isEmail:{
            errorMessage:"Kindly use correct email address"
        }
    },
    address:{
        notEmpty:{
            errorMessage:"Kindly write the resedential address"
        }
    }
}

export default userSignupValidationSchema;