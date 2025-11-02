import { QRCodeSVG } from 'qrcode.react';

export default function BombonaCard({ bombona }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <p><strong>ID:</strong> {bombona.id}</p>
      <p><strong>Código:</strong> {bombona.codigo}</p>
      <p><strong>Descrição:</strong> {bombona.descricao}</p>
      <p><strong>Local:</strong> {bombona.localId}</p>
      <QRCodeSVG value={bombona.id.toString()} size={128} />
    </div>
  );
}
