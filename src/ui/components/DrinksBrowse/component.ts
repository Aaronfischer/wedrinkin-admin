import Component, { tracked } from '@glimmer/component';
import { fetchWrapper } from '../../../utils/fetch-wrapper';

export default class DrinksBrowse extends Component {
  @tracked drinks = [];

  constructor(options) {
    super(options);

    this.loadDrinks();
  }

  async loadDrinks() {
    let request = await fetchWrapper('//localhost:8080/api/drinks', {
      credentials: 'same-origin',
    });
    let json = await request.json();
    this.drinks = json.drinks;
  }
}
