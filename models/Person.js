const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    salary: { type: Number, required: true },
    approved: { type: Boolean, required: true },
    funcao: { type: String, required: true },
    telefone: { type: String, required: true }
});

module.exports = mongoose.model('Person', PersonSchema);
