import Component, { tracked } from '@glimmer/component';
import Navigo from 'navigo';

const root = null;
const useHash = true;
const router = new Navigo(root, useHash);

export default class WedrinkinAdminGlimmer extends Component {
  @tracked routeName: any;
  @tracked params: any;
  @tracked query: any;

  constructor(options) {
    super(options);

    router
      .on({
        '/': () => { this.routeName = 'home'; },
        '/drinks': () => { this.routeName = 'drinks'; }
        '/drinks/add': () => { this.routeName = 'drinksAdd'; }
        '/drinks/:id/edit': (params, query) => { this.routeName = 'drinksEdit'; this.params = params; this.query = query; }
      })
      .resolve();

    console.log('routeName', this.routeName);
  }
}
