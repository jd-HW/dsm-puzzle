import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('dsm-puzzle-input')
export class DsmPuzzleInput extends LitElement{

@property()
groupOneFirst = '';
@property()
groupOneSecond = '';
@property()
groupOneThird = '';
@property()
groupOneFourth = '';
@property()
groupOneAnswer = '';

@property()
groupTwoFirst = '';
@property()
groupTwoSecond = '';
@property()
groupTwoThird = '';
@property()
groupTwoFourth = '';
@property()
groupTwoAnswer = '';

@property()
groupThreeFirst = '';
@property()
groupThreeSecond = '';
@property()
groupThreeThird = '';
@property()
groupThreeFourth = '';
@property()
groupThreeAnswer = '';

handleInputChange(event: Event, group: string, field: string){
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (group === 'groupOne'){
        if (field === 'First') this.groupOneFirst = value;
        if (field === 'Second') this.groupOneSecond = value;
        if (field === 'Third') this.groupOneThird = value;
        if (field === 'Fourth') this.groupOneFourth = value;
        if (field === 'Answer') this.groupOneAnswer = value;
    }
    
    if (group === 'groupTwo') {
        if (field === 'First') this.groupTwoFirst = value;
        if (field === 'Second') this.groupTwoSecond = value;
        if (field === 'Third') this.groupTwoThird = value;
        if (field === 'Fourth') this.groupTwoFourth = value;
        if (field === 'Answer') this.groupTwoAnswer = value;
      }
    
      if (group === 'groupThree') {
        if (field === 'First') this.groupThreeFirst = value;
        if (field === 'Second') this.groupThreeSecond = value;
        if (field === 'Third') this.groupThreeThird = value;
        if (field === 'Fourth') this.groupThreeFourth = value;
        if (field === 'Answer') this.groupThreeAnswer = value;
      }

      console.log(this.groupOneFirst);

}

render(){
    return html `
    
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupOne', 'First')} placeholder="Enter Group 1 First Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupOne', 'Second')} placeholder="Enter Group 1 Second Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupOne', 'Third')} placeholder="Enter Group 1 Third Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupOne', 'Fourth')} placeholder="Enter Group 1 Fourth Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupOne', 'Answer')} placeholder="Enter Group 1 Answer">

    <br>
    <br>

    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupTwo', 'First')} placeholder="Enter Group 2 First Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupTwo', 'Second')} placeholder="Enter Group 2 Second Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupTwo', 'Third')} placeholder="Enter Group 2 Third Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupTwo', 'Fourth')} placeholder="Enter Group 2 Fourth Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupTwo', 'Answer')} placeholder="Enter Group 2 Answer">

    <br>
    <br>

    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupThree', 'First')} placeholder="Enter Group 3 First Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupThree', 'Second')} placeholder="Enter Group 3 Second Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupThree', 'Third')} placeholder="Enter Group 3 Third Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupThree', 'Fourth')} placeholder="Enter Group 3 Fourth Hint">
    <input type="text" @input=${(e: Event) => this.handleInputChange(e, 'groupThree', 'Answer')} placeholder="Enter Group 3 Answer">

    <br>
    <br>

    <button @click=${this.setInput}>Generate this puzzle</button>
    
    `
}

setInput(){

    const puzzleData = {
        groupOne: {
          first: this.groupOneFirst,
          second: this.groupOneSecond,
          third: this.groupOneThird,
          fourth: this.groupOneFourth,
          answer: this.groupOneAnswer,
        },
        groupTwo: {
          first: this.groupTwoFirst,
          second: this.groupTwoSecond,
          third: this.groupTwoThird,
          fourth: this.groupTwoFourth,
          answer: this.groupTwoAnswer,
        },
        groupThree: {
          first: this.groupThreeFirst,
          second: this.groupThreeSecond,
          third: this.groupThreeThird,
          fourth: this.groupThreeFourth,
          answer: this.groupThreeAnswer,
        }
      };
  
      this.dispatchEvent(new CustomEvent('puzzle-generated', {
        detail: puzzleData,
        bubbles: true,
        composed: true
      }));

}

}