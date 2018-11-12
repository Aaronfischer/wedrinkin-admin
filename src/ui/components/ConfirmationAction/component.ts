import Component, { tracked } from '@glimmer/component';

export default class ConfirmationAction extends Component {
  @tracked toConfirm: boolean = false;

  passAction() {
    // use local action, reset state then call parent action
    this.toConfirm = false;
    this.args.passAction();
  }

  confirmAction() {
    if (this.toConfirm) {
      this.toConfirm = false;
    } else {
      this.toConfirm = true;
    }
  }
}
