import Component, { tracked } from '@glimmer/component';
import Navigo from 'navigo';

const root = null;
const useHash = true;
const router = new Navigo(root, useHash);

export default class WedrinkinAdminGlimmer extends Component {
  @tracked drinks = [];
  @tracked routeName: any;

  constructor(options) {
    super(options);

    router
      .on({
        '/': () => { this.routeName = 'home'; },
        '/drinks': () => { this.routeName = 'drinks'; }
        '/drinks/add': () => { this.routeName = 'drinksAdd'; }
        '/drinks/:id/edit': () => { this.routeName = 'drinksEdit'; }
      })
      .resolve();

    console.log('routeName', this.routeName);
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
