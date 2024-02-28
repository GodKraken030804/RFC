import React, { useState } from 'react';
import "../node_modules/primeflex/primeflex.css";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/lara-light-indigo/theme.css';

class Automaton {
    constructor() {
        this.states = [0, 1, 2, 3, 4];
        this.final_states = [3];
        this.alphabet = ['M', 'O', 'G', 'J', 'g', 'o', 'g', 'j'];
        this.transition_table = {
            
            '0-m': 1, '0-M': 1, '1-m': 1, '1-M': 1,
            '1-o': 2, '1-O': 2, '2-o': 2, '2-O': 2,
            '2-g': 3, '2-G': 3, '3-g': 3, '3-G': 3,
            '3-j': 4, '3-J': 4, '4-j': 4, '4-J': 4,
            '1-o': 2, '1-O': 2, '1-g': 3, '1-G': 3, '1-j': 4, '1-J': 4,
            '2-m': 1, '2-M': 1, '2-g': 3, '2-G': 3, '2-j': 4, '2-J': 4,
            '3-m': 1, '3-M': 1, '3-o': 2, '3-O': 2, '3-j': 4, '3-J': 4,
            '4-m': 1, '4-M': 1, '4-o': 2, '4-O': 2, '4-g': 3, '4-G': 3
        };
        this.current_state = 0;
    }

    transition_to_state_with_input(input_value) {
        const key = `${this.current_state}-${input_value}`;
        if (!(key in this.transition_table)) {
            this.current_state = null;
        } else {
            this.current_state = this.transition_table[key];
        }
    }

    in_accept_state() {
        return this.final_states.includes(this.current_state);
    }

    go_to_initial_state() {
        this.current_state = 0;
    }

    run_with_input_list(input_list) {
        this.go_to_initial_state();
        const highlightedLetters = [];
        for (const inp of input_list) {
            this.transition_to_state_with_input(inp);
            if (this.current_state === null) {
                highlightedLetters.push({ letter: inp, isValid: false });
                return { valid: false, highlightedLetters };
            }
            highlightedLetters.push({ letter: inp, isValid: true });
        }
        return { valid: this.in_accept_state(), highlightedLetters };
    }
}

function DFAComponent() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [highlightedLetters, setHighlightedLetters] = useState([]);
    const [currentState, setCurrentState] = useState(0);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        const dfa = new Automaton();
        const { highlightedLetters: highlightedLettersResult } = dfa.run_with_input_list(inputValue);
    
        let isAllValid = true; // Variable para rastrear si todas las letras son válidas
    
        for (const letterObj of highlightedLettersResult) {
            if (!letterObj.isValid) {
                isAllValid = false; // Si alguna letra no es válida, establece la bandera en falso y rompe el bucle
                break;
            }
        }
    
        if (isAllValid) {
            setResult(`CORRECTO`);
        } else {
            setResult(`INCORRECTO`);
        }
        setHighlightedLetters(highlightedLettersResult);
    };

    const handleStateClick = (state) => {
        setCurrentState(state);
    };

    return (
        <>
            <div className="pt-5">
                <div className=" flex align-items-center justify-content-center">
                    <p className="text-white mt-0 text-5xl">RFC =  -- MOGJ -- </p>
                    <p className="text-white mt-0 text-5xl">  JORGE ARTURO MOLINA GOMEZ </p>
                </div>

                <div className=" flex align-items-center justify-content-center">
                    <div className=" text-center bg-white p-3 border-round-sm font-bold border-500 hover:border-700 border-3 border-round m-2" style={{ minWidth: 800, minHeight: 150 }}>
                        <div className="p-inputgroup flex-1 p-3 flex align-items-center justify-content-center">
                            <p className=" text-4xl text-indigo-500 mt-0 pr-5">INGRESE CADENA</p>
                            <InputText placeholder="ingrese Cadena" value={inputValue} onChange={handleInputChange} />
                            <Button onClick={handleSubmit} type="submit" label="Submit" />
                        </div>
                        <p className='text-color'>{result}</p>
                        <div className="static bottom-0 left-0  border-round p-4 font-bold " style={{ minWidth: 120, minHeight: 70, position: 'relative' }}>
                            <div >
                            <p className='text-3xl' >
                                {highlightedLetters.map((letterObj, index) => (
                                    <React.Fragment key={index}>
                                        <span style={{  border: '2px solid', borderRadius: '100px', padding: '30px', display: 'inline-block', color: letterObj.isValid ? 'blue' : 'black', fontWeight: letterObj.isValid ? 'bold' : 'normal' }}>
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
        </>
    );
}

export default DFAComponent;

