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
        setUsers(response.data); 
        
    } 

    async function createUsers(){
        await api.post('/usuarios', {
            name: inputName.current.value,
            age: Number(inputAge.current.value), 
            email: inputEmail.current.value
        })
        await getUsers();
        
    } 

    async function DeleteUsers(id){
        await api.delete(`/usuarios/${id}`)
        getUsers();
        
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
