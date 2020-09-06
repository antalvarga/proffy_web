import React, {useState, FormEvent} from 'react';

// Aula3 - 1:39:07 
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';

// Aula3 - 11:40
import './styles.css';

// Aula3 - 26:28
import Input from '../../components/Input';

// Aula3 - 28:22
import warningIcon from '../../assets/images/icons/warning.svg';

// Aula3 - 38:54 - auto import não funcionou
import Textarea from '../../components/Textarea';

// Aula3 - 42:02
import Select from '../../components/Select';

// Aula3 - 1:34:00
import api from '../../services/api';

// Aula3 - 4:59 - inclusão da description
function TeacherForm() {
    // Aula3 - 39:17 
    const history = useHistory();

    // Aula3 - 1:17:04 - criar um estado para cada input
    const [name, setName] = useState('');

    // Aula3 - 1:18:30 - 
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    // Aula3 - 1:19:53
    const [subject, setSubject] = useState('');
    const [cost   , setCost   ] = useState('');

    // Aula3 - 1:05:16
    const [scheduleItems, setScheduleItems] = useState( [
        { week_day: 0, from: '', to: '' }        
    ] );

    // Aula3 - 59:08 - 1:05:16 transferido para useState()
    // const scheduleItems = [
    //     { week_day: 0, from: '8:00 AM', to: '4:00 PM' },
    //     { week_day: 2, from: '10:00 AM', to: '6:00 PM' },
    // ]

    // Aula3 - 1:01:55 
    // Aula3 - 1:06:50 - Adicionar function setScheduleItems
    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems, 
            { week_day: 0, from: '', to: '' }
        ]);
    }

    // Aula3 - 1:25:50 ~
    // Percorrer o array scheduleItems até achar o position (primeiro index) 
    // Atualizar o field com o value respeitando a imutabilidade
    // Nào posso alterar direto no array existente mas criar um novo array
    function setScheduleItemValue(position: number, field: string, value: string) {

        // Aula3 - 1:31:00 alterar o nome do array
        // const newArray = scheduleItems.map((scheduleItem, index) => {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            // explicação deste algoritmo termina em 1:30:10
            if (index === position){
                return {...scheduleItem, [field]: value };
            }
            return scheduleItem; 
        });

        setScheduleItems( updateScheduleItems );
    }

    // Aula3 - 1:20:50 - function sera chamada qd o usuario fizer um submit no form
    // Aula3 - 1:22:41 - impedir o reload da pagina 
    function handleCreateClass(e: FormEvent) {
        // Prevenir o comportamente padrao do form que é fazer o reload após o submit
        // o Reload da pag na acontece mais ao pressionar o botao [salvar cadastro]
        e.preventDefault();

        // Aula3 - 1:34:00
        api.post('classes', {
            name
            , avatar
            , whatsapp
            , bio
            , subject
            , cost: Number(cost)
            , schedule: scheduleItems
        }).then( () => {
            alert('Cadastro realizado com sucesso!');

            // Aula3 - 1:39:25 - enviar para landing page
            history.push('/');

        }).catch( () => {
            alert('Erro no cadastro!');
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            {/* Aula3 - 09:25 - inclusão da tag main */}
            <main>
                {/* Aula3 - 1:21:19 - colocar um <form> por fora dos <fieldSet> 
                    Aula3 - 1:21:36 - onSubmit
                */}
                <form onSubmit={handleCreateClass}>

                        <fieldset>
                            <legend>Seus dados</legend>

                            {/* Aula3 - 26:28 > Input
                                Aula3 - 1:17:16 > value={name} 
                                Aula3 - 1:17:27 > onChange
                            */}
                            <Input 
                                name="name" 
                                label="Nome completo." 
                                value={name} 
                                onChange={(e) => { setName(e.target.value)}}
                            />

                            <Input 
                                name="avatar" 
                                label="Avatar."
                                value={avatar} 
                                onChange={(e) => { setAvatar(e.target.value)}}
                            />

                            <Input 
                                name="whatsapp" 
                                label="WhatsApp."
                                value={whatsapp} 
                                onChange={(e) => { setWhatsapp(e.target.value)}}
                            />

                            {/* Aula3 - 38:54 - textarea */}
                            <Textarea 
                                name="bio" 
                                label="Biografia"
                                value={bio} 
                                onChange={(e) => { setBio(e.target.value)}}
                            />

                            {/* Aula3 - 10:36
                                Aula3 - 26:46 - removeu os inputs abaixo
                            
                            <div className="input-block">
                                <label htmlFor="name" >Nome completo</label>
                                <input type="text" id="name"/>
                            </div>

                            <div className="input-block">
                                <label htmlFor="avatar" >Avatar</label>
                                <input type="text" id="avatar"/>
                            </div>

                            <div className="input-block">
                                <label htmlFor="whatsapp" >Whatsapp</label>
                                <input type="text" id="whatsapp"/>
                            </div>
                            */}        
                        </fieldset>

                        {/* Aula3 - 27:11 */}
                        <fieldset>
                        <legend>Sobre a aula</legend>

                            {/* Aula3 - 41:50 - Alterar input por select 
                        <Input name="subject" label="Matéria"/> 
                                Aula3 - 43:36 - propriedade option
                        */}
                        <Select 
                                name="subject" 
                                label="Matéria"

                                // Aula3 - 1:20:05 - inclusao do value e onChange
                                value={subject}
                                onChange={(e) => {setSubject(e.target.value)}}

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


                        <Input 
                                name="cost" 
                                label="Custo da hora/aula"
                                value={cost}
                                onChange={(e) => {setCost(e.target.value)}}
                            />

                    </fieldset>

                    {/* Aula3 - 51:57 Incluir fieldset 'Horários disponíveis' */}
                    <fieldset>
                        <legend>
                            Horários disponíveis

                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>

                        </legend>


                        {/* Aula3 - 53:00      */}
                        {/* 
                        <div className="schedule-item">
                            
                                <Select 
                                        name="week_day" 
                                        label="Dia da Semana"
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
                                <Input name="from" label="Das" type="time"/>
                                <Input name="to"   label="Até" type="time"/>

                        </div> */}

                        {/* Aula3 - 1:00:10 */}
                        {/* Aula3 - 1:24:09 - Mapear o estado do scheduleItem */}
                        {/* {scheduleItems.map(scheduleItem => { */}
                        {scheduleItems.map((scheduleItem, index ) => {
                            return (
                                    // Aula3 - 1:02:56 - Inclusao da key
                                    <div key={scheduleItem.week_day} className="schedule-item">
                            
                                        <Select 
                                            name="week_day" 
                                            label="Dia da Semana"
                                            // Aula3 - 1:31:50 
                                            value={scheduleItem.week_day}
                                            onChange={(e) => {setScheduleItemValue(index, 'week_day', e.target.value)}}
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
                                            name="from" 
                                            label="Das" 
                                            type="time"
                                            // Aula3 - 1:31:50 
                                            value={scheduleItem.from}

                                            // Aula3 - 1:31:24 - onChage
                                            onChange={(e)=> {setScheduleItemValue(index, 'from', e.target.value)}}
                                        />
                                        <Input 
                                            name="to"   
                                            label="Até" 
                                            type="time"
                                            // Aula3 - 1:31:50 
                                            value={scheduleItem.to}

                                            // Aula3 - 1:31:24 - onChage                                            
                                            onChange={(e)=> {setScheduleItemValue(index, 'to', e.target.value)}}
                                        />

                                    </div>
                                );
                        })}

                    </fieldset>

                    {/* Aula3 - 28:12 - Footer */}
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>

                        {/* Aula3 - 1:22:17 - alterar type */}
                        {/* <button type="button"> */}
                        <button type="submit">
                                Salvar cadastro 
                        </button>

                    </footer>

                </form>

            </main>

        </div>
    )
}

export default TeacherForm;

