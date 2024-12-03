
const express = require('express');
const mongoose = require('mongoose');
const app = express();


const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    salary: { type: Number, required: true },
    funcao: { type: String, required: true }, 
    telefone: { type: String, required: true } 
});

const Person = mongoose.model('Person', PersonSchema);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/person', async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. Buscar uma pessoa pelo ID
app.get('/person/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const person = await Person.findById(id);
        if (!person) {
            return res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Criar uma nova pessoa
app.post('/person', async (req, res) => {
    const { name, salary, funcao, telefone } = req.body;

    const person = {
        name,
        salary,
        funcao,
        telefone
    };

    try {
        const newPerson = await Person.create(person);
        res.status(201).json(newPerson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Atualizar uma pessoa pelo ID
app.put('/person/:id', async (req, res) => {
    const { id } = req.params;

    // Verifica se o ID é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const { name, salary, funcao, telefone } = req.body;

    const updatedData = {
        name,
        salary,
        funcao,
        telefone
    };

    try {
        const updatedPerson = await Person.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedPerson) {
            return res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        res.status(200).json(updatedPerson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. Deletar uma pessoa pelo ID
app.delete('/person/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPerson = await Person.findByIdAndDelete(id);
        if (!deletedPerson) {
            return res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        res.status(200).json({ message: 'Pessoa removida com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota inicial
app.get('/', (req, res) => {
    res.json({ message: 'Oi Express!' });
});

// Conexão com o MongoDB
const uri = "mongodb+srv://Ricardomg:Aeletrica%404109@cluster0.a1zue.mongodb.net/meuBanco?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    })
    .catch((erro) => {
        console.error('Erro ao conectar ao MongoDB:', erro);
    });
