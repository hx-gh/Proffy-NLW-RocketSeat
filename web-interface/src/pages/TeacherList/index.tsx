import React, { useState, FormEvent, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input'
import Select from '../../components/Select'

import './styles.css'
import api from '../../services/api';


function TeacherList() {    
    const [teachers, setTeachers] = useState([]);
    useEffect(() => {getClasses()}, []);
    const getClasses = async () => {
        let response = await api.get('api/classes')
        setTeachers(response.data)
    }
    const [subject, setClass_subject] = useState('');
    const [week_day, setClass_week_day] = useState('');
    const [time, setClass_time] = useState('');    
    async function searchTeachers(e: FormEvent){
        e.preventDefault();
        
        let response = await api.get('api/classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        setTeachers(response.data)
    }
    return (        
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form action="" id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => {setClass_subject(e.target.value)}}
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
                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => {setClass_week_day(e.target.value)}}
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
                    <Input name="time" label="Hora" type="time"
                    value={time}
                    onChange={(e) => {setClass_time(e.target.value)}}/>
                    <div className="input-block">
                        <button type="submit">
                            Buscar
                        </button>
                    </div>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher:Teacher) => {
                    return <TeacherItem key={teacher.id_user} teacher={teacher}/>
                })}
            </main>
        </div>
    )
}

export default TeacherList;