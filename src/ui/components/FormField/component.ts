import Component, { tracked } from '@glimmer/component';

export default class FormField extends Component {
  @tracked
  get hasError() {
    return !!this.args.error;
  }

  didInsertElement() {
    console.log('FormField');
  }
}
