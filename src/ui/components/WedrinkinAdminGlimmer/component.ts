import Component, { tracked } from '@glimmer/component';
import Navigo from 'navigo';

const root = null;
const useHash = true;
const router = new Navigo(root, useHash);

export default class WedrinkinAdminGlimmer extends Component {
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
  }
}
