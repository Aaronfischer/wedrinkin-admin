import Component from '@glimmer/component';

export default class FieldDropdown extends Component {
  constructor(options) {
    super(options);

    console.log('options', options);
  }

  didInsertElement() {
    console.log('THIS', this.element);
    // $(this.element).dropdown();
  }
}
