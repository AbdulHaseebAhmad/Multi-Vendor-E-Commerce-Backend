const productCategorySchema = {
    filter:{
        notEmpty:{
            errorMessage:"The Filter Field Must not be Empty"
        },
       
    },
    value:{
        notEmpty:{
            errorMessage:"The Category Value Must not be Empty"
        },
        
    },
}

export default productCategorySchema;