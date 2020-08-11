import React, { useState } from 'react';
import { useHistory} from 'react-router-dom'
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input'
import warningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'
import Textarea from '../../components/TextArea';
import Select from '../../components/Select'
import api from '../../services/api';
function TeacherForm() {
    const history = useHistory();
    const [user_name, setName] = useState('');
    const [user_avatar, setAvatar] = useState('');
    const [user_bio, setBio] = useState('');
    const [user_whatsapp, setWhatsapp] = useState('');
    const [class_subject, setSubject] = useState('');
    const [class_price, setPrice] = useState('');
    const [scheduleItems, setScheduleItems] = useState([
        {schedule_class_week_day: 0,schedule_class_from: '',schedule_class_to: '',}
    ])
    function addNewScheduleItem(){
        
        setScheduleItems([
            ...scheduleItems,
            {schedule_class_week_day: 0,schedule_class_from: '',schedule_class_to: '',}
        ])
    }
    function updateScheduleItemValue(arrpos: number, field: string, value:string){
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if(index === arrpos){
                return { ...scheduleItem, [field]: value}
            }
            return scheduleItem;
        });
        setScheduleItems(newArray);
    }
    function handleCreateClass(){
        api.post('/api/classes', {user_name,user_avatar,user_whatsapp,user_bio,class_subject,class_price,schedule: scheduleItems}).then(() => {
            alert("Cadastro realizado com sucesso")
            history.push('/')
        }).catch((err) => {alert(err)})
    }
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher este formulário de inscrição."
            />
            <main>
                <fieldset>
                    <legend>Seus Dados</legend>
                    <Input name="name" label="Nome Completo" 
                    value={user_name} onChange={(e) => {setName(e.target.value)}}/>
                    <Input name="avatar" label="Avatar"
                    value={user_avatar} onChange={(e) => {setAvatar(e.target.value)}}/>
                    <Input name="whatsapp" label="Whatsapp"
                    value={user_whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}}/>
                    <Textarea name="bio" label="Biografia"
                    value={user_bio} onChange={(e) => {setBio(e.target.value)}}/>
                </fieldset>
                <fieldset>
                    <legend>Sobre a Aula</legend>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={class_subject}
                        onChange={(e) => {setSubject(e.target.value)}}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Fisíca', label: 'Fisíca' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Geográfia', label: 'Geográfia' },
                            { value: 'História', label: 'História' },
                            { value: 'Química', label: 'Química' },
                        ]} />
                    <Input name="price" label="Custo/Hora"
                    value={class_price} onChange={(e) => {setPrice(e.target.value)}}/>
                </fieldset>
                <fieldset>
                    <legend>Horários disponiveís
                        <button type='button' onClick={addNewScheduleItem}>
                            + Novo Horário
                        </button>
                    </legend>
                    {scheduleItems.map((scheduleItem, index) => {
                        return (
                            <div key={scheduleItem.schedule_class_week_day} className="schedule-item">
                                <Select
                                    name="week_day"
                                    label="Dia da Semana"
                                    value={scheduleItem.schedule_class_week_day}
                                    onChange={e => { updateScheduleItemValue(index, 'schedule_class_week_day', e.target.value)}}
                                    options={[
                                        { value: '0', label: 'Segunda-Feira' },
                                        { value: '1', label: 'Terça-Feira' },
                                        { value: '2', label: 'Quarta-Feira' },
                                        { value: '3', label: 'Quinta-Feira' },
                                        { value: '4', label: 'Sexta-Feira' },
                                        { value: '5', label: 'Sábado' },
                                        { value: '6', label: 'Domingo' }
                                    ]}
                                />
                                <Input name="from" label="De" type="time"
                                value={scheduleItem.schedule_class_from}
                                onChange={e => { updateScheduleItemValue(index, 'schedule_class_from', e.target.value)}}/>
                                <Input name="to" label="Até" type="time"
                                value={scheduleItem.schedule_class_to}
                                onChange={e => { updateScheduleItemValue(index, 'schedule_class_to', e.target.value)}}/>
                            </div>
                        );
                    })}
                </fieldset>
                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante" />
                        Importante ! <br />
                        Preencha todos os dados
                    </p>
                    <button type="button" onClick={handleCreateClass}>Salvar Cadastro</button>
                </footer>
            </main>
        </div>
    )
}

export default TeacherForm;