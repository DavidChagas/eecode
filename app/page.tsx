'use client';
import { useState } from "react";
import { scripts, ScriptType } from "./scripts";

export default function Home() {
  const scriptsArray = scripts();

  const [selectedScript, setSelectedScript] = useState({} as ScriptType);
  const [buffer, setBuffer] = useState(50);
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-09-01');
  const [bufferColor, setBufferColor] = useState('red');
  const [longitude, setLongitude] = useState('-51.901233');
  const [latitude, setLatitude] = useState('-28.832819');
  const [recentStartDate, setRecentStartDate] = useState('2024-09-01');
  const [recentEndDate, setRecentEndDate] = useState('2024-09-30');
  const [olderStartDate, setOlderStartDate] = useState('2023-01-01');
  const [olderEndDate, setOlderEndDate] = useState('2023-01-31');

  const handleScriptSelect = (script: ScriptType) => {
    setSelectedScript(script);
  };

  const handleGenerateScript = () => {
    const script = selectedScript.template
      .replace(/{buffer}/g, String(buffer))
      .replace(/{startDate}/g, startDate)
      .replace(/{endDate}/g, endDate)
      .replace(/{bufferColor}/g, bufferColor)
      .replace(/{longitude}/g, longitude)
      .replace(/{latitude}/g, latitude)
      .replace(/{recentStartDate}/g, recentStartDate)
      .replace(/{recentEndDate}/g, recentEndDate)
      .replace(/{olderStartDate}/g, olderStartDate)
      .replace(/{olderEndDate}/g, olderEndDate);
    return script;

  };

  return (
    <div className="my-[100px]">
      <h1 className="text-center font-bold text-[20px]">Gerador de Scripts Google Earth Engine</h1>

      <div className="my-[50px]">
        <h2 className="font-bold">Escolha um Script para GEE</h2>
        <div className="mt-[10px]">
          {scriptsArray.map((script) => (
            <button className="mx-[3px] border text-[12px] border-gray-500 py-[2px] px-[5px] rounded-[5px]" type="button" key={script.id} onClick={() => handleScriptSelect(script)}>
              {script.name}
            </button>
          ))}
        </div>
      </div>

      {selectedScript.id && (
        <>
          <div className="max-w-[600px] mx-auto">
            <h3 className="font-bold  text-center">{selectedScript.name}</h3>
            <p className="text-[12px] text-center mb-[15px]">Altere os seguintes dados conforme necessário</p>
            {selectedScript.id === 'script1' && (
              <>
                <div className="group-input">
                  <label>
                    Raio do Buffer (metros):
                  </label>
                  <input
                    type="number"
                    value={buffer}
                    onChange={(e) => setBuffer(Number(e.target.value))}
                    min="0"
                  />
                </div>
                <div className="group-input">
                  <label>
                    Cor do Buffer:
                  </label>
                  <input
                    type="text"
                    value={bufferColor}
                    onChange={(e) => setBufferColor(e.target.value)}
                  />
                </div>


              </>
            )}
            {selectedScript.id === 'ndvi' && (
              <>
                <div className="group-input">
                  <label>
                    Longitude:
                  </label>
                  <input
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
                <div className="group-input">
                  <label>
                    Latitude:
                  </label>
                  <input
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
                <div className="group-input">
                  <label>
                    Raio do Buffer (metros):
                  </label>
                  <input
                    type="number"
                    value={buffer}
                    onChange={(e) => setBuffer(Number(e.target.value))}
                    min="0"
                  />
                </div>

              </>
            )}
            <div className="group-input">
              <label>
                Data de Início:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

            </div>
            <div className="group-input">
              <label>
                Data de Fim:
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>


            {selectedScript.id === 'land_change' && (
              <>
                <div className="group-input">
                  <label>
                    Data de Início da Imagem Recente:
                  </label>
                  <input
                    type="date"
                    value={recentStartDate}
                    onChange={(e) => setRecentStartDate(e.target.value)}
                  />
                </div>
                <div className="group-input">
                  <label>
                    Data de Fim da Imagem Recente:
                  </label>
                  <input
                    type="date"
                    value={recentEndDate}
                    onChange={(e) => setRecentEndDate(e.target.value)}
                  />
                </div>
                <div className="group-input">
                  <label>
                    Data de Início da Imagem Antiga:
                  </label>
                  <input
                    type="date"
                    value={olderStartDate}
                    onChange={(e) => setOlderStartDate(e.target.value)}
                  />
                </div>
                <div className="group-input">
                  <label>
                    Data de Fim da Imagem Antiga:
                  </label>
                  <input
                    type="date"
                    value={olderEndDate}
                    onChange={(e) => setOlderEndDate(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-[100px] w-full">
            <div className="flex justify-between items-center">
              <h3>Seu script foi gerado!</h3>
              <button className="mt-[5px] border border-green-900 bg-green-500 py-[5px] px-[25px] text-white" onClick={() => navigator.clipboard.writeText(handleGenerateScript())}>
                Copiar Script
              </button>
            </div>

            <pre className="w-full text-[11px] mt-[10px] p-[10px] border border-gray-500 bg-gray-700 text-white rounded-[5px]">
              {handleGenerateScript()}
            </pre>
          </div>
        </>
      )
      }
    </div >
  );
}
