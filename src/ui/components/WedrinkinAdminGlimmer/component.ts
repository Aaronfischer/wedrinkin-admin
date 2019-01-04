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
  @tracked user: {};

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
    } else {
      this.onLogout();
    }

    window.netlifyIdentity.init();
  }

  onLogout() {
    setAuthorization();
    this.isAuthenticated = false;
    router.navigate(`/login`);
  }

  setupUser(user) {
    setAuthorization(user);
    this.setUser();
  }

  setUser() {
    this.user = JSON.parse(localStorage.getItem('wedrinkinUser'));
    this.isAuthenticated = true;
  }

  // @tracked
  // get gravatarSrc() {
  //   const user = this.user;
  //   console.log('gravatarSrc user', user);
  //   console.log('gravatarUrl', gravatarUrl);
  //   return gravatarUrl(user.email);
  // }

  @tracked
  isAuthenticated : boolean = false;
}
