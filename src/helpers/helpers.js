const mongoose = require('mongoose');

// Função para criar um documento com base no DTO fornecido
async function create(schema, dto, collectionName) {
    try {
        // Obtém a conexão mongoose
        const db = mongoose.connection;

        // Registra o esquema se ainda não estiver registrado
        if (!db.models[collectionName]) {
            db.model(collectionName, schema);
        }

        // Cria um novo documento com base no modelo
        const collectionModel = db.model(collectionName);
        const newDocument = new collectionModel(dto);

        // Salva o documento no banco de dados
        const insertedDocument = await newDocument.save();
        return insertedDocument;
    } catch (error) {
        console.error(`Erro ao criar documento na coleção ${collectionName}:`, error);
        throw error;
    }
}

module.exports = { create };
