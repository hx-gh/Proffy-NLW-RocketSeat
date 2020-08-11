import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'
import api from '../../services/api'


export interface Teacher {
    "data"?: {
        "id_user": number,
        "class_subject": string,
        "class_price": number,
        "user_name": string,
        "user_avatar": string,
        "user_whatsapp": string,
        "user_bio": string
    }
    "id_user": number,
    "class_subject": string,
    "class_price": number,
    "user_name": string,
    "user_avatar": string,
    "user_whatsapp": string,
    "user_bio": string
}
interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({ teacher }) => {
    function createNewConnection(){
        api.post('api/connections', {
            id_user: teacher.id_user
        })        
    }
    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.user_avatar} alt="" />
                <div>
                    <strong>{teacher.user_name}</strong>
                    <span>{teacher.class_subject}</span>
                </div>
            </header>
            <p>{teacher.user_bio}</p>
            <footer>
                <p>
                    Preço/Hora: <strong>{teacher.class_price}</strong>
                </p>
                <a target="_blank" href={`https://wa.me/${teacher.user_whatsapp}`} type='button' onClick={createNewConnection}>
                    <img src={whatsappIcon} alt="Whatsapp" /> Entrar em Contato
                </a>
            </footer>
        </article>
    )
}
export default TeacherItem