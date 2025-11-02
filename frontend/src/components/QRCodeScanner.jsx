import React, { useEffect, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import api from '../services/api';

export default function QRCodeScanner() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    // Seleciona a primeira câmera disponível
    codeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        if (videoInputDevices.length === 0) {
          setMsg('Nenhuma câmera encontrada');
          return;
        }

        const firstDeviceId = videoInputDevices[0].deviceId;

        // Escaneia QR code continuamente
        codeReader.decodeFromVideoDevice(
          firstDeviceId,
          'video',
          async (result, err) => {
            if (result) {
              const bombonaId = result.text;
              const localId = prompt('Digite o ID do local atual:');
              if (!localId) return;

              try {
                await api.put('/bombonas/local', { bombonaId, localId });
                setMsg(`Bombona ${bombonaId} atualizada para o local ${localId}`);
              } catch (err) {
                setMsg(err.response?.data?.error || 'Erro ao atualizar bombona');
              }
            }

            if (err && !(err.name === 'NotFoundException')) {
              console.error(err);
            }
          }
        );
      })
      .catch(err => {
        console.error(err);
        setMsg('Erro ao acessar câmera');
      });

    // Limpeza ao desmontar
    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <h2>Scanner QR Code</h2>
      <video id="video" width="300" style={{ border: '1px solid black' }} />
      {msg && <p>{msg}</p>}
    </div>
  );
}
