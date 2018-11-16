import Component, { tracked } from '@glimmer/component';

export default class LoginForm extends Component {
  @tracked private model: {} = {};

  onChange = e => {
    this.model = {
      ...this.model,
      [e.target.name]: e.target.value
    };
    return this.model;
  };

  @tracked
  get email(): string {
    return this.model.email;
  }

  @tracked
  get password(): string {
    return this.model.password;
  }
}
