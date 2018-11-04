import Component, { tracked } from '@glimmer/component';

export default class WedrinkinAdminGlimmer extends Component {
  @tracked drinks = [];

  constructor(options) {
    super(options);
    this.loadDrinks();
    console.log('drinks', this.drinks);
  }

  async loadDrinks() {
    let request = await fetch('//localhost:8080/api/drinks', {
      credentials: 'same-origin',
    });
    let json = await request.json();
    this.drinks = json.drinks;
    console.log('this.drinks', this.drinks);
  }
}
