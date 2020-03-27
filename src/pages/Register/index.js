import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

import logoImage from '../../assets/logo.svg'

export default function Register() {

    const [name, setName] = useState(''); // Variáveis de acesso aos dados adicionados
    const [email, setEmail] = useState('');
    const [whatsapp, setwhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) { // Reage a clique no botão
        e.preventDefault();
        const data = {name, email, whatsapp, city, uf};

        try {
            const response = await api.post('ongs', data); // Realiza uma request POST

            alert(`Seu ID de acesso: ${response.data.id}`); // Apresenta uma janela popup
            
            history.push('/'); // Retorna o usuário para a HOME
        } catch (err) {
            alert('Erro no cadastro. Tente novamente!');
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImage} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Realize o seu cadastro, entre na plataforma e auxilie pessoas a encontrarem os casos de sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        value={name} // Valor inicial
                        onChange={e=> setName(e.target.value)} // Atribui o valor digitado pelo usuário a cada mudança
                    /> 
                    <input 
                        placeholder="E-mail" 
                        type="email" 
                        value={email} 
                        onChange={e=> setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp} 
                        onChange={e=> setwhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade" 
                            value={city} 
                            onChange={e=> setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{width: 80}} 
                            value={uf} onChange={e=> setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}