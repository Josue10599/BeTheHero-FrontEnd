import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import './styles.css';

import api from '../../services/api'

import logoImage from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId'); // Recupera o nome da ONG
    const ongName = localStorage.getItem('ongName'); // Recupera o nome da ONG

    async function handleDeleteIncident(id) {
        try {
            // Realiza a request para deletar o incidente do banco de dados
            await api.delete(`incidents/${id}`, {
                    headers: {
                        Authorization: ongId,
                    }
            });
            setIncidents(incidents.filter(incident => incident.id !== id)); // Remove o incidente da lista do usuário
        } catch(err) {
            alert('Erro ao deletar caso. Tente novamente!'); // Apresenta um alerta para o usuário
        }
    }

    function handleLogout() {
        localStorage.clear(); // Limpa o histórico
        history.push('/'); // Retorna para a página de Login
    }

    // Realiza a busca sempre a variável ongId é alterada, é esperado que execute apenas uma vez
    useEffect(() => {
        // Busca a lista de incidentes da ONG
        api.get('profile', {
                headers: {
                    Authorization: ongId,
                }
            }
        ).then(response => { setIncidents(response.data); // Atualiza a lista de incidentes
        });
    }, [ongId]);

    return (
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be The Hero"/>
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados:</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>
                            { 
                                Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) // Formatação de valores em real
                            }
                        </p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li> 
                ))}      
            </ul>
        </div>
    );
}