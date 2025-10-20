import express from 'express'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import cors from 'cors';

const prisma = new PrismaClient();

const app = express()
app.use(express.json())
app.use(cors());

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        }
    })

    res.status(201).json(req.body)
})

/** Tipo de Rota - Metodo HTTP, endereço  */
app.get('/usuarios', async (req, res) => {

    let users = []
    
    if (req.query) {
        users = await prisma.user.findMany({
            where: req.query.name,
            where: req.query.email,
            where: req.query.age,
        })
    }else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        },
    })

    res.status(200).json({message: "Usuário deletado com sucesso"})
})

app.listen(3000)
