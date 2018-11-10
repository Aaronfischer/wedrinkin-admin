import Component, { tracked } from '@glimmer/component';

export default class Card extends Component {
  drink: any;

  didInsertElement() {
    console.log('Card');
  }
}
