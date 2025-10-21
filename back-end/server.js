// import express from 'express'
// import pkg from '@prisma/client';
// const { PrismaClient } = pkg;
// import cors from 'cors';

// const prisma = new PrismaClient();

// const app = express()
// app.use(express.json())
// app.use(cors());

// app.post('/usuarios', async (req, res) => {

//     await prisma.user.create({
//         data: {
//             email: req.body.email,
//             name: req.body.name,
//             age: req.body.age,
//         }
//     })

//     res.status(201).json(req.body)
// })

// /** Tipo de Rota - Metodo HTTP, endereço  */
// app.get('/usuarios', async (req, res) => {

//     let users = []
    
//     if (req.query) {
//         users = await prisma.user.findMany({
//             where: req.query.name,
//             where: req.query.email,
//             where: req.query.age,
//         })
//     }else {
//         users = await prisma.user.findMany()
//     }

//     res.status(200).json(users)
// })

// app.put('/usuarios/:id', async (req, res) => {

//     await prisma.user.update({
//         where: {
//             id: req.params.id
//         },
//         data: {
//             email: req.body.email,
//             name: req.body.name,
//             age: req.body.age,
//         }
//     })

//     res.status(201).json(req.body)
// })

// app.delete('/usuarios/:id', async (req, res) => {

//     await prisma.user.delete({
//         where: {
//             id: req.params.id
//         },
//     })

//     res.status(200).json({message: "Usuário deletado com sucesso"})
// })

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
// });
import express from 'express';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Criar usuário
app.post('/usuarios', async (req, res) => {
    try {
        const { email, name, age } = req.body;
        const newUser = await prisma.user.create({
            data: { email, name, age }
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});

// Listar usuários (com filtros opcionais)
app.get('/usuarios', async (req, res) => {
    try {
        const { name, email, age } = req.query;

        const users = await prisma.user.findMany({
            where: {
                ...(name && { name }),
                ...(email && { email }),
                ...(age && { age: Number(age) })
            }
        });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});

// Atualizar usuário
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, age } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { email, name, age }
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
});

// Deletar usuário
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({ where: { id: Number(id) } });
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
});

// Porta dinâmica para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
