class Estructura {
    correLisInput(list) {
        this.alNuevoState();
        const highlightedLetters = [];
        let previousLetter = null;
        let letterCount = 0;
    
        for (const inp of list) {
            this.transicionDState(inp);
    
            if (this.concurrenteState === null || (inp === previousLetter && ++letterCount > 4)) {
                highlightedLetters.push({ letter: inp, isValid: false });
                return { valid: false, highlightedLetters };
            } else if (inp !== previousLetter) {
                previousLetter = inp;
                letterCount = 1;
            }
    
            highlightedLetters.push({ letter: inp, isValid: true });
        }
    
        return { valid: this.entraStateDFA(), highlightedLetters };
    }
    
    transicionDState(value) {
        const contra = `${this.concurrenteState}-${value}`;
        this.concurrenteState = (contra in this.transition_table) ? this.transition_table[contra] : null;
    }
    

    entraStateDFA() {
        return this.final_states.includes(this.concurrenteState);
    }

    alNuevoState() {
        this.concurrenteState = 0;
    }

    constructor() {
        this.states = [0, 1, 2, 3, 4];
        this.final_states = [3];
        this.alphabet = ['M', 'O', 'G', 'J', 'g', 'o', 'g', 'j'];
        this.transition_table = {
            '0-m': 1, '0-M': 1, 
            '1-m': 1, '1-M': 1, '1-o': 2, '1-O': 2, '1-g': 3, '1-G': 3, '1-j': 4, '1-J': 4,
            '2-o': 2, '2-O': 2, '2-g': 3, '2-G': 3, '2-j': 4, '2-J': 4, '2-m': 1, '2-M': 1,
            '3-g': 3, '3-G': 3, '3-j': 4, '3-J': 4, '3-m': 1, '3-M': 1, '3-o': 2, '3-O': 2,
            '4-j': 4, '4-J': 4, '4-m': 1, '4-M': 1, '4-o': 2, '4-O': 2, '4-g': 3, '4-G': 3
        };
        
        this.concurrenteState = 0;

    }
    
}

export default Estructura;
