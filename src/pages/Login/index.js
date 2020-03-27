import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import heroesImage from '../../assets/heroes.png'
import logoImage from '../../assets/logo.svg'

export default function Login() {

    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault(); // Evita o comportamento padrão de atualizar a página

        try{
            const response = await api.post('sessions', {id});
            
            localStorage.setItem('ongId', id); // Armazena o id enviado de maneira local
            localStorage.setItem('ongName', response.data.name); // Armazena o dado recebido de maneira local

            history.push('/profile'); // Abre o perfil da ONG caso de certo
        }catch(err) {
            alert('Falha no login. Tente novamente!');
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logoImage} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input 
                        placeholder="Seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="Heroes"/>
        </div>
    );
}