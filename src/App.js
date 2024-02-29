import React, { useState } from 'react';
import Estructura from './estructura/Estructura';

function App() {
    const [value, setvalue] = useState('');
    const [result, setResult] = useState('');
    const [highlightedLetters, setHighlightedLetters] = useState([]);
   
    const evaluarInput = (event) => {
        setvalue(event.target.value);
    };

    const submitButtom = () => {
        const dfa = new Estructura();
        const {highlightedLetters: highlightedLettersResult } = dfa.correLisInput(value);
        const isAllValid = highlightedLettersResult.every(letterObj => letterObj.isValid);
        setResult(isAllValid ? `CORRECTO` : `INCORRECTO`);
        setHighlightedLetters(highlightedLettersResult);
    };
    
    return (
    <div >
        <div className="flex align-items-center justify-content-center">
            <p className="text-white mt-0 text-5xl">RFC =  -- MOGJ -- </p>
            <p className="text-white mt-0 text-5xl">JORGE ARTURO MOLINA GOMEZ</p>
        </div>
        <div className="flex align-items-center justify-content-center">
            <div className="text-center bg-white p-3 border-round-sm font-bold border-500 hover:border-700 border-3 border-round m-2" style={{ minWidth: 800, minHeight: 150 }}>
                <div className="p-inputgroup flex-1 p-3 flex align-items-center justify-content-center">
                    <p className="text-5xl text-indigo-500 mt-5 pr-3">INGRESE CADENA</p>
                    <input className='shadow-2 border-round w-18rem p-3 m-2 bg-blue-200' placeholder="Ingrese Cadena" value={value} onChange={evaluarInput} />
                    <button className='border-round w-8rem p-3 ' onClick={submitButtom} type="submit" label="Submit" >
                        submit
                    </button>
                </div>
                <p className='text-color'>{result}</p>
                <div className="static bottom-0 left-0 border-round p-4 font-bold" style={{ minWidth: 120, minHeight: 70, position: 'relative' }}>
                    <div>
                        <p className='text-3xl'>
                            {highlightedLetters.map((letterObj, index) => (
                                <React.Fragment key={index}>
                                    <span style={{ border: '2px solid', borderRadius: '100px', padding: '30px', display: 'inline-block', color: letterObj.isValid ? 'blue' : 'black', fontWeight: letterObj.isValid ? 'bold' : 'normal' }}>
                                        {letterObj.letter}
                                    </span>
                                    {index !== highlightedLetters.length - 1 && <span>&rarr;</span>}
                                </React.Fragment>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default App;

