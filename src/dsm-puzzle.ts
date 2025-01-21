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

    @property({type: Array})
    groups = [
        {id: 1, answer: 'Schuur', completed: false},
        {id: 2, answer: 'List', completed: false},
        {id: 3, answer: 'Tafel', completed: false}
    ]

    @property({type: Array})
    puzzleItems = [
        { text: 'Sponsje', group: this.groups[0], completed: false },
        { text: 'Papier', group: this.groups[0], completed: false },
        { text: 'Graan', group: this.groups[0], completed: false },
        { text: 'Machine', group: this.groups[0], completed: false },

        { text: 'Schindlers', group: this.groups[1], completed: false },
        { text: 'Bedrog', group: this.groups[1], completed: false },
        { text: 'Liesbeth', group: this.groups[1], completed: false },
        { text: 'Verzin een', group: this.groups[1], completed: false },

        { text: 'Wijn', group: this.groups[2], completed: false },
        { text: 'Schikking', group: this.groups[2], completed: false },
        { text: '1x6=6, 2x6=12', group: this.groups[2], completed: false },
        { text: 'Tennis', group: this.groups[2], completed: false },
    ]

    @state()
    private _shuffledList = this.shuffle(this.puzzleItems)

    @property({type: Boolean})
    hideCompleted = false;

    @query('#answer-input')
    answerInput!: HTMLInputElement 

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('puzzle-generated', this.handlePuzzleGenerated as EventListener);
      }
    
      disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('puzzle-generated', this.handlePuzzleGenerated as EventListener);
      }

      handlePuzzleGenerated(event: CustomEvent) {
        const puzzleData = event.detail;
        // Set groups based on puzzleData
        this.groups = [
          { id: 1, answer: puzzleData.groupOne.answer, completed: false },
          { id: 2, answer: puzzleData.groupTwo.answer, completed: false },
          { id: 3, answer: puzzleData.groupThree.answer, completed: false },
        ];
        // Set puzzleItems based on puzzleData
        this.puzzleItems = [
          { text: puzzleData.groupOne.first, group: this.groups[0], completed: false },
          { text: puzzleData.groupOne.second, group: this.groups[0], completed: false },
          { text: puzzleData.groupOne.third, group: this.groups[0], completed: false },
          { text: puzzleData.groupOne.fourth, group: this.groups[0], completed: false },
    
          { text: puzzleData.groupTwo.first, group: this.groups[1], completed: false },
          { text: puzzleData.groupTwo.second, group: this.groups[1], completed: false },
          { text: puzzleData.groupTwo.third, group: this.groups[1], completed: false },
          { text: puzzleData.groupTwo.fourth, group: this.groups[1], completed: false },
    
          { text: puzzleData.groupThree.first, group: this.groups[2], completed: false },
          { text: puzzleData.groupThree.second, group: this.groups[2], completed: false },
          { text: puzzleData.groupThree.third, group: this.groups[2], completed: false },
          { text: puzzleData.groupThree.fourth, group: this.groups[2], completed: false },
        ];
    
        this._shuffledList = this.shuffle(this.puzzleItems);
      }

    render(){

        const shuffledPuzzle = this._shuffledList;

        const puzzleItems = html `
            
            ${shuffledPuzzle.map((puzzleItem) => html `
        
                <div><span class="${puzzleItem.completed ? 'completed' : ''}">${puzzleItem.text}</span></div>

            `)}

        ` 

        const answers = html `
            ${this.groups.map((group) => html `
                
                <h2 class= ${group.completed ? 'solved' : 'shadow-text' }>${group.answer}</h2>
                
                `)}
        `

        return html `

        <slot></slot> 

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
        const groupResult = this.groups.find((group) => group.answer.toUpperCase() === userGuess);

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
