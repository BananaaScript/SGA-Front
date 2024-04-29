import { useState } from 'react';
import './LoginInicio.css';
import Roteador from '../../Roteamento/roteador';

export default function Login() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //useEffect(() => {
        //const token = localStorage.getItem('token');
        //if (token) {
            //setIsLoggedIn(true);
        //}
    //}, []);

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
                localStorage.setItem('token', token);
                console.log("Token: ", token);
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

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                localStorage.removeItem('token'); 
                setIsLoggedIn(false);
                console.log("Logout bem sucedido");
            } else {
                alert("Erro ao efetuar logout");
            }
        } catch (error) {
            console.error('Erro ao efetuar logout:', error);
            alert("Erro ao efetuar logout. Por favor, tente novamente mais tarde.");
        }
    };

    if(isLoggedIn){
        return <Roteador tela='Home'/>
    }


    return (
        <div className="Login">
            <h1>FAÇA LOGIN</h1>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Usuário" value={nome} onChange={handleNomeChange} />
                <input type="password" placeholder="Senha" value={senha} onChange={handleSenhaChange} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
