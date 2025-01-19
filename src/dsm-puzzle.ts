import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

type AnswerGroup = {
    id: number,
    answer: string,
    completed: boolean
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
        {id: 1, answer: 'Schuur', completed: false},
        {id: 2, answer: 'List', completed: false},
        {id: 3, answer: 'Tafel', completed: false}
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

    @state()
    private _shuffledList = this.shuffle(this._puzzleItems)

    @property({type: Boolean})
    hideCompleted = false;

    @query('#answer-input')
    answerInput!: HTMLInputElement 

    render(){

        const shuffledPuzzle = this._shuffledList;

        const puzzleItems = html `
            
            ${shuffledPuzzle.map((puzzleItem) => html `
        
                <div><span class="${puzzleItem.completed ? 'completed' : ''}">${puzzleItem.text}</span></div>

            `)}

        ` 

        const answers = html `
            ${this._groups.map((group) => html `
                
                <h2 class= ${group.completed ? 'solved' : 'shadow-text' }>${group.answer}</h2>
                
                `)}
        `

        return html `
        <div class="exercise-container">
            <div class="grid-container">
                ${puzzleItems}
            </div>
            <div class="flex-container">
                <div class="answer-container">
                    ${answers}
                </div>
                <div class="input-container">
                    <input id='answer-input' aria-label='Answer'>
                    <button @click=${() => this.checkAnswer(shuffledPuzzle)}>Check answer</button>
                </div>
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

    setCompleted(item: PuzzleItem){
        item.completed = true;
        this.requestUpdate();
    }

    checkAnswer(puzzleItems: PuzzleItem[]){
        const userGuess = this.answerInput.value.toUpperCase();
        const groupResult = this._groups.find((group) => group.answer.toUpperCase() === userGuess);

        if(groupResult) groupResult.completed = true;

        const matches = puzzleItems.filter((item) => item.group.id === groupResult?.id);
        matches.forEach(item => this.setCompleted(item));

        this.answerInput.value = '';
        console.log(matches);
    }


    static styles = css `

        .grid-container{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 8px;
            padding: 8px;
            height: 40%;
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

        .answer-container{
            height: 50%;
            width: 50%;
            text-align: center;
            padding: 10px;
        }

        .input-container{
        height: 50%;
        width: 50%
        }

        .flex-container{
            display: flex;
            align-items: center;
        }

        .completed{
        color: green;
        }

        .shadow-text{
        color: transparent;
        text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        .solved{
        color: white;
        }

    `
}
