import Component, { tracked } from '@glimmer/component';

export default class FieldIngredients extends Component {
  @tracked errors: {} = {};

  // just returns object if data doesnt exist
  validate = data => {
    const errors = {};
    if (!data.amount) errors.amount = "Can't be blank";
    if (!data.item) errors.item = "Can't be blank";
    return errors;
  };

  onadd(field) {
    const data = this.args.data;
    if (data && data.length !== 0) {
      const formErrors = this.validate(data[data.length - 1]);
      this.errors = formErrors;
      if (Object.keys(this.errors).length === 0) {
        this.args.onadd(field);
      }
    } else {
      this.args.onadd(field);
    }
  }
}
