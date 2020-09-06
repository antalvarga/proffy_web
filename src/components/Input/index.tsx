// Aula3 - 16:39
// Aula3 - 20:53 
import React, {InputHTMLAttributes} from 'react';

// Aula3 - 22:35
import './styles.css';

// Aula3 - 20:53 
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
} 

// Aula3 - 18:00
// function Input() {
//const Input: React.FunctionComponent<InputProps> = (props) => {
const Input: React.FunctionComponent<InputProps> = ({label, name, ...rest }) => {
    return(

        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest}/>
        </div>

    );
};

export default Input;