const Local = require('../models/Local');

exports.createLocal = async (req, res) => {
  try {
    console.log(req.body);
    const { nome } = req.body; // pega do corpo da requisição

    if (!nome) {
      return res.status(400).json({ error: 'Nome do local é obrigatório' });
    }

    // cria o local no banco
    const local = await Local.create({ nome });

    res.status(201).json(local);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllLocais = async (req, res) => {
  try {
    const locais = await Local.findAll();
    res.json(locais);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
