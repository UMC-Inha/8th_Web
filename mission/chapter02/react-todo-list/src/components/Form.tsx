import { ChangeEvent, FormEvent, useState } from "react";
import { useDark } from "../context/darkProvider";

interface FormProps {
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
    input: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    text: string;
}

const Form = ({onSubmit, input, onChange, text}: FormProps) => {
  const { isDark } = useDark();

  return (
    <>
        <form onSubmit={onSubmit} className='todo-container__form' style={{backgroundColor: isDark? 'black' : 'white'}}>
            <input value={input} 
                onChange={onChange}
                type='text'
                className='todo-container__input'
                placeholder='할 일 입력'
                required 
                style={{backgroundColor: isDark? '#3c3c3c' : 'white', color: isDark? 'white' : 'black'}}/>
            <button type='submit' className='todo-container__button'>{text}</button>
        </form>
    </>
  )
}

export default Form