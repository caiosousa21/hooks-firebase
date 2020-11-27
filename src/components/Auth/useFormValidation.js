import { useEffect, useState } from "react";

function useFormValidation(initialState, validate) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState(validate(values));  
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        if(isSubmitting){
            const noErrors = Object.keys(errors).length === 0
            if(noErrors){
                console.log('authenticated', values);
                setSubmitting(false);
            }else{
                setSubmitting(false);
            }
        }
    }, [errors])

    function handleChange(event){
        event.persist();
        setValues(previousValues => ({
            ...previousValues,
            [event.target.name]: event.target.value
        }))
    }

    function handleBlur(){
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    function handleSubmit(event){
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    }


    return { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }
}

export default useFormValidation;
