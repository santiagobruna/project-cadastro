import './Home.css'
import { FaTrash } from 'react-icons/fa';
import api from '../../service/api';
import { useEffect, useState, useRef } from 'react';

function Home() {

    const [users, setUsers] = useState([]);

    const inputName = useRef();
    const inputAge = useRef();
    const inputEmail = useRef();


    async function getUsers(){
        const response = await api.get('/usuarios');
        const usersWithId = response.data.map(user => ({
            id: user.id || user._id, 
            name: user.name,
            age: user.age,
            email: user.email,
        }));
        setUsers(usersWithId);
    } 

    async function createUsers(){
        try {
            await api.post('/usuarios', {
                name: inputName.current.value,
                age: Number(inputAge.current.value), 
                email: inputEmail.current.value
            })
            
            // Limpar inputs após cadastro
            inputName.current.value = '';
            inputAge.current.value = '';
            inputEmail.current.value = '';
            
            await getUsers();
        } catch (error) {
            console.error('Erro ao criar:', error);
            alert('Erro ao criar usuário');
        }
    } 
    async function DeleteUsers(id){
        console.log('ID recebido no front:', id);
        try {
            await api.delete(`/usuarios/${id}`)
            console.log('Requisição DELETE enviada para:', `/usuarios/${id}`);
            await getUsers();
        } catch (error) {
            alert('Erro ao deletar usuário');
        }
    } 
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className='container'>
            <form action="">
                <h1>Cadastro de Usuários</h1>
                <input type="text" name='nome' placeholder='Nome' ref={inputName}/>
                <input type="number" name='idade' placeholder='idade' ref={inputAge} />
                <input type="email" name='email' placeholder='E-mail' ref={inputEmail}/>
                <button type="button" onClick={createUsers}>Cadastrar</button>
            </form>
            {users.map((user) => (
                <div className='card' key={user.id}>
                    <div>
                    <p><strong>Nome:</strong> {user.name}</p>
                    <p><strong>Idade:</strong> {user.age}</p>
                    <p><strong>E-mail:</strong> {user.email}</p>
                    </div>
                    <button onClick={() => DeleteUsers(user.id)}>
                        <FaTrash style={{ color: 'red', fontSize: '20px' }} />
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Home
