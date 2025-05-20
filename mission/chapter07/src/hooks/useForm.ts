import { ChangeEvent, useEffect, useState } from "react"

interface useFormProps<T> {
    initialValue: T // { email:" ", password:" " }
    // 값이 올바른지 검증하는 함수
    validate: (values: T) => Record<keyof T, string>
}

function useForm<T>({initialValue, validate}: useFormProps<T>) {
    const [values, setValues] = useState(initialValue)
    
    const [touched, setTouched] = useState<Record<string, boolean>>()
    // "email": false, "password": true 이케 받을 거임

    const [errors, setErrors] = useState<Record<string, string>>()
    // "email": "이메일은 반드시 @를 포함해야 합니다."

    // 사용자가 입력값을 바꿀 때 실행하는 함수 
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values, // 불변성 유지(기존값 유지)
            [name]: text // name 추가
        })
    }
    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true
        })
    }

    // email, password input 속성을 가져옴
    const getInputProps = (name: keyof T) => {
        const value = values[name]
        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleChange(name, e.target.value)
        const onBlur = () => handleBlur(name)

        return {value, onChange, onBlur}
    }

    // values가 변경될 때마다 에러 검증 로직이 실행됨
    useEffect( () => {
        const newErrors = validate(values)
        setErrors(newErrors) //오류 메세지 업뎃
    }, [validate, values])

    return {values, errors, touched, getInputProps}
}

export default useForm