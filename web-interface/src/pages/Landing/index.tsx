import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './styles.css'

import logoIMG from '../../assets/images/logo.svg'
import landingIMG from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import api from '../../services/api';


function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);
    useEffect(() => {
        api.get('/api/connections').then((response) => {
            setTotalConnections(response.data.total)
        })
    }, [totalConnections])
    return(
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoIMG} alt=""/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                <img src={landingIMG} className='hero-image' alt="Plataforma de Estudos"/>
                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt=""/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt=""/>
                        Dar aulas
                    </Link>
                </div>
                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt=""/>
                </span>
            </div>
        </div>
    );
}

export default Landing;