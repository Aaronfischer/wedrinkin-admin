import Component from '@glimmer/component';

export default class UserCard extends Component {
  didInsertElement() {
    this.setupPopup();
  }

  setupPopup() {
    $('.item-user').popup({
      inline: true,
      position: 'right center',
      on: 'click',
    });
  }
}
