import React, { useState, useEffect, useRef } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl'; //para usar WebGL
import './styles/App.css';
import logger from './services/logging';
import { translateText } from './services/translate';

interface ClassificationResult {
  className: string;
  probability: number;
  translatedName?: string; // Aquí se guarda la traducción
}

const FORBIDDEN_WORDS = ["café", "coffee"]; // Palabras prohibidas

// //1. Función simulada para traducir los nombres de clase
// function fakeTranslate(text: string, _fromLang: string, _toLang: string): Promise<string> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(`(ES) ${text}`);
//     }, 1000);
//   });
// }

function App() {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [predictions, setPredictions] = useState<ClassificationResult[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const imageRef = useRef<HTMLImageElement>(null);

  const loadModel = async () => {
    try {
      setStatusMessage('Cargando modelo MobileNet...');
      logger.info('Cargando modelo MobileNet...');
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      logger.info('Modelo cargado con éxito');
      setStatusMessage('Modelo cargado');
    } catch (error) {
      logger.error('Error cargando el modelo:' + (error as Error).message);
      setStatusMessage('Error cargando el modelo');
    }
  };

  // Cargar el modelo al montar el componente
  useEffect(() => {
    logger.info('Aplicación iniciada');
    loadModel();
  }, []);

  // 1. Manejar la selección del archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Creamos una url de vista previa
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      setPredictions([]); // Limpiar predicciones si se cambia la imagen
      logger.info("Imagen seleccionada: " + file.name);
    }
  };

  // 2. Clasificar la imagen y luego traducir en cadena
  const classifyAndTranslate = async () => {
    // throw new Error("Error de prueba en clasificación");
    if (!model) {
      alert('El modelo aún no se ha cargado. Espera un momento e inténtalo de nuevo');
      return;
    }
    if (!imageRef.current) {
      alert('No se encontró la referencia de la imagen');
      return;
    }
    try {
      // a) Primera Promesa: Clasificar la imagen
      setStatusMessage('Clasificando la imagen...');
      logger.info('Clasificando la imagen...');
      const results = await model.classify(imageRef.current);
      logger.info('Resultados en inglés: ' + JSON.stringify(results));

      // b) Verificar palabras prohibidas
      const forbiddenDetected = results.some(r =>
        FORBIDDEN_WORDS.some(w =>
          r.className.toLowerCase().includes(w.toLowerCase())
        )
      );

      if (forbiddenDetected) {
        throw new Error("Se detectó una palabra prohibida en la clasificación");
      }


      setStatusMessage('Traduciendo resultados...');
      logger.info('Traduciendo resultados...');

      // c) Segunda Promesa (encadenada): Traducir el "className" de cada resultado
      const translatedResults: ClassificationResult[] = await Promise.all(
        results.map(async (item) => {
          const translatedName = await translateText(item.className);
          return { ...item, translatedName };
        })
      );
      setPredictions(translatedResults);
      setStatusMessage('Traducción completada');
    } catch (error) {
      logger.error('Error clasificando o traduciendo la imagen: ' + (error as Error).message);
      setStatusMessage("Error durante la clasificación o traducción");
      throw error;
    }
  };

  return (
    <div>
      <h1>Clasificador de imágenes + Traducción (Chaining)</h1>
      <p><strong>Palabras prohibidas:</strong> {FORBIDDEN_WORDS.join(', ')}</p>
      <p>{statusMessage}</p>
      <p>Selecciona una imagen ...</p>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {previewUrl && (
        <div>
          <img ref={imageRef} src={previewUrl} alt="Vista previa" />
        </div>
      )}

      {selectedFile && (
        <button onClick={classifyAndTranslate}>Clasificar y traducir</button>
      )}

      {predictions.length > 0 && (
        <div>
          <h2>Resultados:</h2>
          <ul>
            {predictions.map((item, index) => (
              <li key={index}>
                Original: {item.className} | {''}
                Traducción: {item.translatedName} | {''}
                Prob: {(item.probability * 100).toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;