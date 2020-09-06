import React from 'react';
import './styles.css';
import Retrato from '../../assets/retrato/retrato1.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

// Aula3 - 1:54:29
export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;    
}

// Aula3 - 1:50:11
// Aula3 - 1:54:29
// interface TeacherItemProps {
//     teacher: {
//         id: number;
//         avatar: string;
//         bio: string;
//         cost: number;
//         name: string;
//         subject: string;
//         whatsapp: string;
//     }
// }

interface TeacherItemProps {
    teacher: Teacher;
}

// Aula3 - 1:51:46
// function TeacherItem() {
const  TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

    // Aula3 1:58:58 - Criar nova conexão
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id,
        })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={ teacher.avatar } alt={ teacher.name }/>
                <div>
                    <strong>{ teacher.name }</strong>
                    <span>{ teacher.subject }</span>
                </div>
            </header>
            <p>{ teacher.bio }</p>
            <footer>
                <p>
                    Preço/Hora: 
                    <strong>R$ { teacher.cost }</strong>
                </p>
                
                {/* Aula3 - 1:56:20 - transformar o botao em a href
                <button type="button">
                    <img src={whatsappIcon} alt="whatsapp"/>
                    Entrar em contato
                </button> */}

                <a target="_blank" onClick={createNewConnection}  href={`https:wa.me/${ teacher.whatsapp }`}>
                    <img src={whatsappIcon} alt="whatsapp"/>
                    Entrar em contato
                </a>



            </footer>
        </article>
    );
}

export default TeacherItem;

