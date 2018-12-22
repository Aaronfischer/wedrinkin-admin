import Component, { tracked } from '@glimmer/component';
import { fetchWrapper } from '../../../utils/fetch-wrapper';
import config from '../../../../config/environment';

export default class DrinksBrowse extends Component {
  @tracked drinks = [];

  constructor(options) {
    super(options);

    this.loadDrinks();
  }

  async loadDrinks() {
    let request = await fetchWrapper(`${config.host}/api/drinks`, {
      credentials: 'same-origin',
    });
    let json = await request.json();
    this.drinks = json.drinks;
  }
}
