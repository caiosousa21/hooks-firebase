export default function validateCreateLink(values) {
    let errors = {};
    if(!values.description){
        errors.description = "Description required";
    }else if(values.description.lenght < 10){
        errors.description = "Description must be at least 10 characters long";
    }

    if(!values.url){
        errors.url = "Url required";
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
        errors.url = "Url must be valid"
    }
    return errors;
}
