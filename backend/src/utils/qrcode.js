const QRCode = require('qrcode');

async function generateQR(text) {
  // Retorna dataURL (base64 PNG)
  return QRCode.toDataURL(text, { errorCorrectionLevel: 'H' });
}

module.exports = { generateQR };
