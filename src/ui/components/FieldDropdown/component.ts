import Component from '@glimmer/component';

export default class FieldDropdown extends Component {
  dropdownOptions:any = [];

  didInsertElement() {
    $(this.element).dropdown();
  }
}
