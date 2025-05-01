import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
    initialValue : T;
    validate : (value : T) => Record<keyof T, string>
} 

function useForm<T> ( {initialValue, validate} : UseFormProps<T> ) {
    const [values, setValues] = useState(initialValue);
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});


    const handleChange = (name : keyof T, text : string) => {
        setValues({
            ...values,
            [name] : text
        });
    }

    const handleBlur = (name : keyof T) => {
        setTouched({
            ...touched,
            [name] : true
        })
    }

    const getInputProps = (name: keyof T) => {
        return {
            value: values[name],

            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                handleChange(name, e.target.value);
            },

            onBlur: () => {
                handleBlur(name);
            },
        };
    };


    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values])

    return {values, errors, touched, getInputProps};
}

export default useForm;