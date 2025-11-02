const Bombona = require('../models/Bombona');

const Local = require('../models/Local');

const QRCode = require('qrcode');

exports.generateQRCode = async (req, res) => {
  try {
    const { bombonaId } = req.params;
    const bombona = await Bombona.findByPk(bombonaId);
    if (!bombona) return res.status(404).json({ error: 'Bombona não encontrada' });

    const qrData = `BOMBONA:${bombona.id}`;
    const qrCode = await QRCode.toDataURL(qrData);

    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateLocal = async (req, res) => {
  try {
    const { bombonaId, localId } = req.body;

    if (!bombonaId || !localId) {
      return res.status(400).json({ error: 'bombonaId e localId são obrigatórios' });
    }

    // Buscar a bombona pelo ID
    const bombona = await Bombona.findByPk(bombonaId);
    if (!bombona) return res.status(404).json({ error: 'Bombona não encontrada' });

    // Buscar o local pelo ID
    const local = await Local.findByPk(localId);
    if (!local) return res.status(404).json({ error: 'Local não encontrado' });

    // Atualiza o local da bombona
    bombona.localId = localId;
    await bombona.save();

    res.json({ message: 'Local da bombona atualizado', bombona });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Criar uma nova bombona
exports.createBombona = async (req, res) => {
  try {
    const { codigo, descricao } = req.body;
    const novaBombona = await Bombona.create({ codigo, descricao });
    res.status(201).json(novaBombona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todas as bombonas
exports.getAllBombonas = async (req, res) => {
  try {
    const bombonas = await Bombona.findAll();
    res.status(200).json(bombonas); // mesmo se vazio, retorna []
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const bombona = await Bombona.findByPk(id);
    if (!bombona) return res.status(404).json({ error: 'Bombona não encontrada' });

    bombona.status = status;
    await bombona.save();
    res.json(bombona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar bombona
exports.deleteBombona = async (req, res) => {
  try {
    const { id } = req.params;
    const bombona = await Bombona.findByPk(id);
    if (!bombona) return res.status(404).json({ error: 'Bombona não encontrada' });

    await bombona.destroy();
    res.json({ message: 'Bombona removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

