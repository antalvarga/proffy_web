// Aula3 - 1:41:22 - importacao do useState
// Aula3 - 1:42:46 - importacao do FormEvent
import React, { Component, useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.css';

// Aula3 - 1:54:46 - Importacao do Teacher
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

// Aula 1 - 2:27:46
// transferido para 
// Component> TeacherList> index.tsx
// import Retrato from '../../assets/retrato/retrato1.png';
//import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

// Aula3 - 1:53:17
// Aula3 - 1:54:40 - Essa interface agora vem do TeacherItem
// interface Teacher {
//     id: number;
// }



// <main> : Aula1 - 2:13:43
function TeacherList() {

    // Aula3 - 1:40:57 - Criar estados
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    // Aula3 - 1:48:31 - Salvar a lista de professores em um estado
    const [teachers, setTeachers] = useState([]);
    
    // Aula3 - 1:42:27
    // Aula3 - 1:47:30 - async await
    async function searchTeachers(e: FormEvent) {
        // Aula3 - 1:42:50 - prevenir o reload da pag no onSubmit
        e.preventDefault();

        // Aula3 - 1:43:05
        //console.log('a')

        // Aula3 - 1:46:46
        const response = await api.get('classes', {
            params: {
                subject
                , week_day
                , time
            }
        });

        // Aula3 - 1:48:50
        // console.log( response.data);
        setTeachers( response.data );

    }
    
    return (
        
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">

                {/* // Aula3 - 1:42:27 - inclusao do onSubmit */}
                <form id="search-teachers" onSubmit={searchTeachers}>
{/* 
            Aula3 - 24:15 
                    <div className="input-block">
                        <label htmlFor="subject">Matéria</label>
                        <input type="text" id="subject"/>
                    </div>

                    <div className="input-block">
                        <label htmlFor="week_day">Dia da Semana</label>
                        <input type="text" id="week_day"/>
                    </div>
                    
                    <div className="input-block">
                        <label htmlFor="time">Hora</label>
                        <input type="text" id="time"/>
                    </div> 
*/}
{/* 
                    Aula3 - 49:38 - Substituir Input por Select
                    <Input name="subject" label="Matéria"/>
 */}
                    <Select 
                        name="subject" 
                        label="Matéria"

                        // Aula3 - 1:41:36 inclusao de estado value e onChange
                        value={subject}
                        onChange={ (e) => { setSubject(e.target.value )}}

                        options={[
                            {value: 'Artes', label: 'Artes'},
                            {value: 'Biologia', label: 'Biologia'},
                            {value: 'Ciências', label: 'Ciências'},
                            {value: 'Educação Física', label: 'Educação Física'},
                            {value: 'Física', label: 'Física'},
                            {value: 'Geografia', label: 'Geografia'},
                            {value: 'História', label: 'História'},
                            {value: 'Matemática', label: 'Matemática'},
                            {value: 'Português', label: 'Português'},
                            {value: 'Química', label: 'Química'},
                            {value: 'Informática', label: 'Informática'},
                        ]}
                   />

{/* 
                    Aula3 - 49:59 - Substituir input por select    
                    <Input name="week_day" label="Dia da Semana"/>
 */}
                    <Select 
                        name="week_day" 
                        label="Dia da Semana"

                        // Aula3 - 1:41:36 inclusao de estado value e onChange
                        value={week_day}
                        onChange={ (e) => { setWeek_day(e.target.value )}}

                        options={[
                            {value: '0', label: 'Domingo'},
                            {value: '1', label: 'Segunda-feira'},
                            {value: '2', label: 'Terça-feira'},
                            {value: '3', label: 'Quarta-feira'},
                            {value: '4', label: 'Quinta-feira'},
                            {value: '5', label: 'Sexta-feira'},
                            {value: '6', label: 'Sábado-feira'},
                        ]}
                   />

                    <Input 
                        type="time" 
                        name="time" 
                        label="Hora"

                        // Aula3 - 1:41:36 inclusao de estado value e onChange
                        value={time}
                        onChange={ (e) => { setTime(e.target.value )}}
                    />

                    {/* Aula3 - 1:44:35 - inclusao do botao */}
                    <button type="submit">Buscar</button>

                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={ teacher.id } teacher={teacher}/>;
                })}
                
            </main>

        </div>
    )
}

export default TeacherList;

