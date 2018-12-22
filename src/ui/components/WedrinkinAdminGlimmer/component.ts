import Component, { tracked } from '@glimmer/component';
import Navigo from 'navigo';
import { setAuthorization } from '../../../utils/fetch-wrapper';
import gravatarUrl from 'gravatar-url';

const root = null;
const useHash = true;
export const router = new Navigo(root, useHash);

export default class WedrinkinAdminGlimmer extends Component {
  @tracked routeName: any;
  @tracked params: any;
  @tracked query: any;
  user: {};

  constructor(options) {
    super(options);

    // causes issue with didInsertElement
    router
      .on({
        '/': () => { this.routeName = 'home'; },
        '/login': () => { this.routeName = 'login'; },
        '/drinks': () => { this.routeName = 'drinks'; },
        '/drinks/add': () => { this.routeName = 'drinksAdd'; },
        '/drinks/:id/edit': (params, query) => { this.routeName = 'drinksEdit'; this.params = params; this.query = query; }
      }).resolve();

    console.log('routeName', this.routeName);

    if (localStorage.getItem('wedrinkinUser')) {
      this.setUser();
    }
  }

  didInsertElement() {
    this.setupPopup();
  }

  onLogout() {
    setAuthorization();
    router.navigate(`/login`);
  }

  setupUser(user) {
    setAuthorization(user);
    this.setUser();
    this.setupPopup();
  }

  setUser() {
    this.user = JSON.parse(localStorage.getItem('wedrinkinUser'));
  }

  setupPopup() {
    $('.item-user').popup({
      inline: true,
      position: 'right center',
      on: 'click',
    });
  }

  // @tracked
  // get gravatarSrc() {
  //   const user = this.user;
  //   console.log('gravatarSrc user', user);
  //   console.log('gravatarUrl', gravatarUrl);
  //   return gravatarUrl(user.email);
  // }
}
