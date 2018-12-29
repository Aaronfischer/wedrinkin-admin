import Component, { tracked } from '@glimmer/component';
import { router } from '../WedrinkinAdminGlimmer/component';
import config from '../../../../config/environment';

export default class Login extends Component {
  @tracked isSuccess: boolean = false;
  @tracked isFailure: boolean = false;
  @tracked isLoading: boolean = false;

  reset() {
    this.isSuccess = false;
    this.isFailure = false;
    this.isLoading = false;
  }

  async onSubmit(data, e) {
    e.preventDefault();
    // const formErrors = this.validate(data);
    // this.errors = formErrors;
    // if (Object.keys(this.errors).length === 0) {
      this.isLoading = true;
      try {
        await fetch(`${config.host}/api/auth`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ credentials: data }),
        }).then(data => {
          return data.json().then((json) => {
            if (data.status === 400) {
              throw json;
            }
            this.reset();
            console.log('this.args', this.args);
            console.log('JSON', json.user);
            this.args.setupUser(json.user);
            return router.navigate(`/drinks`);
          });
        }, (error) => { throw error; });
      } catch(error) {
        console.log('error', error);
        this.reset();
        this.isFailure = true;
        // this.errors = error.errors;
      }
    }
  // }
}
