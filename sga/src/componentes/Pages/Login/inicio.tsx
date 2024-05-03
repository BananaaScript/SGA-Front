import { useState } from 'react';
import './LoginInicio.css';
import Roteador from '../../Roteamento/roteador';
import { useEffect } from 'react';
import Home from '../TelaHome/Home';

export default function Login() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            const role = localStorage.getItem('role');
            if (role === 'ROLE_ADMIN' || role === 'ROLE_USER') {
                localStorage.setItem('role', role);
            }
        }
    }, [])

    const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNome(event.target.value);
    };

    const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSenha(event.target.value);
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, senha }),
            });
    
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                const role = data.role;
                localStorage.setItem('token', token);
                localStorage.setItem('role', role); 
                setIsLoggedIn(true);
                alert("Login bem sucedido");
            } else {
                alert("Verifique suas credenciais");
            }
        } catch (error) {
            console.error('Erro ao efetuar login:', error);
            alert("Erro ao efetuar login. Por favor, tente novamente mais tarde.");
        }
    };

    if (isLoggedIn && localStorage.getItem('role') === 'ADMIN') {
        return <Roteador />
    } else if (isLoggedIn && localStorage.getItem('role') === 'USER') {
        return <Home/>
    }


    return (
        <div className='telaLogin'>
            <div className="Login">
                <h1>FAÇA LOGIN</h1>
                <form onSubmit={handleLogin}>
                    <div className='inputusuario'> 
                        <input type="text" placeholder="Usuário" value={nome} onChange={handleNomeChange} />
                    </div>

                    <div className='inputsenha'>
                        <input type="password" placeholder="Senha" value={senha} onChange={handleSenhaChange} />
                    </div><br/>

                    <button type="submit" className='Login button'>Login</button>
                </form>
            </div>
        </div>
    );
}
