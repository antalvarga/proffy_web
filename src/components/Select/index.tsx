// Aula3 - 40:50 
import React, {SelectHTMLAttributes} from 'react';


import './styles.css';

// Aula3 - 45:12 - inclusao da propriedade options
// Array<String>
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>
} 

// Aula3 - 45:40 - options
const Select: React.FunctionComponent<SelectProps> = ({label, name, options, ...rest }) => {
    return(
        <div className="select-block">
            <label htmlFor={name}>{label}</label>

            {/* Aula3 - 45:55 = <select id={name} {...rest}/>  */}
            {/* Aula3 - 1:32:25 - Retirar defaultValue deixando apenas value <select defaultValue="" id={name} {...rest} */}
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden>Selecione</option>

                {options.map( option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}

            </select>
        </div>

    );
};

export default Select;