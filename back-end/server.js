import express from 'express'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import cors from 'cors';

const prisma = new PrismaClient();

const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: 'https://project-cadastro.onrender.com',
        credentials: true
    }
));

app.post('/usuarios', async (req, res) => {

    const { email, name, age } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const user = await prisma.user.create({
        data: { email, name, age },
    });

    res.status(201).json(user);
})

/** Tipo de Rota - Metodo HTTP, endereço  */
app.get('/usuarios', async (req, res) => {

    const { name, email, age } = req.query;
    
    const filters = {};
    if (name) filters.name = name;
    if (email) filters.email = email;
    if (age) filters.age = Number(age);

    const users = await prisma.user.findMany({
        where: filters,
    });

    res.status(200).json(users);
})

app.put('/usuarios/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const { email, name, age } = req.body;

        console.log('PUT - Atualizando usuário ID:', id);

        const updatedUser = await prisma.user.update({
            where: { id: id }, 
            data: { email, name, age: parseInt(age) },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro no PUT:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

})

app.delete('/usuarios/:id', async (req, res) => {
        const { id } = req.params;
        console.log(id)
        try {
            const deleted = await prisma.user.delete({
            where: { id: id }, 
            });
            res.status(200).json({ message: 'Usuário deletado com sucesso', deleted });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
})

// Porta dinâmica para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
