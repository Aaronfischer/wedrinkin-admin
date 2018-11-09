import Component, { tracked } from '@glimmer/component';

export default class FieldDropdown extends Component {
  dropdownOptions:any = [];

  didInsertElement() {
    console.log('THIS', this.element);
  }
}
