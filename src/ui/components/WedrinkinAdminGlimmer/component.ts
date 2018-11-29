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
      console.log('this.user', this.user);
    }
  }

  didInsertElement() {
    console.log('didInsertElement');
    $('.item-user').popup({
      inline: true,
      position: 'right center',
      on: 'click',
    });
    console.log('popup load');
  }

  onLogout(e) {
    console.log('e', e);
    setAuthorization();
    router.navigate(`/login`);
  }

  setupUser(user) {
    console.log('setupUser', user);
    setAuthorization(user);
    this.setUser();
  }

  setUser() {
    this.user = JSON.parse(localStorage.getItem('wedrinkinUser'));
  }

  // @tracked
  // get gravatarSrc() {
  //   const user = this.user;
  //   console.log('gravatarSrc user', user);
  //   console.log('gravatarUrl', gravatarUrl);
  //   return gravatarUrl(user.email);
  // }
}
