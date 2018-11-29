import Component, { tracked } from '@glimmer/component';
import { router } from '../WedrinkinAdminGlimmer/component';
import { setAuthorization } from '../../../utils/fetch-wrapper';

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
        await fetch('//localhost:8080/api/auth', {
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
            console.log('JSON', json.user);
            setAuthorization(json.user);
            return router.navigate(`/drinks`);
          });
        }, (error) => { throw error; });
      } catch(error) {
        this.reset();
        this.isFailure = true;
        // this.errors = error.errors;
      }
    }
  // }
}
