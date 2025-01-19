import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

type AnswerGroup = {
    id: number,
    answer: string
}

type PuzzleItem = {
    text: string,
    group: AnswerGroup,
    completed: boolean
}

@customElement('dsm-puzzle')
export class DsmPuzzle extends LitElement{

    @state()
    private _groups = [
        {id: 1, answer: 'Schuur'},
        {id: 2, answer: 'List'},
        {id: 3, answer: 'Tafel'}
    ]

    @state()
    private _puzzleItems = [
        { text: 'Sponsje', group: this._groups[0], completed: false },
        { text: 'Papier', group: this._groups[0], completed: false },
        { text: 'Graan', group: this._groups[0], completed: false },
        { text: 'Machine', group: this._groups[0], completed: false },

        { text: 'Schindlers', group: this._groups[1], completed: false },
        { text: 'Bedrog', group: this._groups[1], completed: false },
        { text: 'Liesbeth', group: this._groups[1], completed: false },
        { text: 'Verzin een', group: this._groups[1], completed: false },

        { text: 'Wijn', group: this._groups[2], completed: false },
        { text: 'Schikking', group: this._groups[2], completed: false },
        { text: '1x6=6, 2x6=12', group: this._groups[2], completed: false },
        { text: 'Tennis', group: this._groups[2], completed: false },
    ]

    render(){

        const shuffledPuzzle = this.shuffle(this._puzzleItems);

        const puzzleItems = html `
            
            ${shuffledPuzzle.map((puzzleItem) => html `
        
                <div>${puzzleItem.text}</div>

            `)}

        ` 

        const answers = html `
            ${this._groups.map((group) => html `
                
                <h1>${group.answer}</h1>
                
                `)}
        `

        return html `
        <div class="exercise-container">
            <div class="grid-container">
                ${puzzleItems}
            </div>
            <div class="answer-container">
                ${answers}
            </div>
        </div>
        `
    }

    shuffle(array: PuzzleItem[]){
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
          } 
          return array; 
    }


    static styles = css `

        .grid-container{
            
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 8px;
            padding: 8px;
            height: 50%;
        }

        .grid-container > div {
            background-color: #d65e43;
            padding: 5px;
            color: white;
        }

        .exercise-container{
            background-image: linear-gradient(to top right, #7b1115, #d65e43);
            height: 50vh;
        }

        .exercise-container{
            height: 50%;
            text-align: center;
            padding: 10px;
        }

    `
}
