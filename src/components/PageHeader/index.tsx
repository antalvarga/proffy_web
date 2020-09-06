import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

// Aula 1 - 2:10:00
import './styles.css';



// Se o title não fosse obrigatório seria assim
// title? : string;
// Aula3 - 5:50 - incluir description? :  
// o acento ? informa que esta propriedade é opcional 
interface PageHeaderProps {
    title: string;
    description?: string;
}


// function PageHeader() {
const PageHeader : React.FunctionComponent<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar"/>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>

                {/* Aula3 - 6:51 */}
                {props.description && <p>{props.description}</p> }


                {props.children}

            </div>

        </header>

    );
}

export default PageHeader;