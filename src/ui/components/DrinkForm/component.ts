import Component, { tracked } from '@glimmer/component';

export default class DrinkForm extends Component {
  @tracked data: any;
  // reset the local drink obj to come from the passed in argument
  @tracked drink = this.args['data'];

  onChange = e => {
    this.drink = {
      ...this.drink,
      [e.target.name]: e.target.value
    };
    console.log('onChange', this.drink);
    return this.drink;
  };
}
