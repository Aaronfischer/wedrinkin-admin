import Component, { tracked } from '@glimmer/component';
import { router } from '../WedrinkinAdminGlimmer/component';
import { fetchWrapper } from '../../../utils/fetch-wrapper';
import config from '../../../../config/environment';

export default class DrinksAdd extends Component {
  @tracked errors = {};
  @tracked isSuccess: boolean = false;
  @tracked isFailure: boolean = false;
  @tracked isLoading: boolean = false;
  @tracked state = {
    name: null,
    img: null,
    quote: null,
    temp: [],
    wind: null,
    time: [],
    city: null,
    ingredients: [],
    instructions: null,
  };

  validate = data => {
    this.reset();
    const errors = {};
    if (!data.name) errors.name = "Can't be blank";
    if (!data.instructions) errors.instructions = "Can't be blank";
    return errors;
  };

  reset() {
    this.isSuccess = false;
    this.isFailure = false;
    this.isLoading = false;
  }

  async onSubmit(data, e) {
    e.preventDefault();
    const formErrors = this.validate(data);
    this.errors = formErrors;
    if (Object.keys(this.errors).length === 0) {
      this.isLoading = true;
      try {
        await fetchWrapper(`${config.host}/api/drinks`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ drink: data }),
        }).then(data => {
          return data.json().then((json) => {
            if (data.status === 400) {
              throw json;
            }
            this.reset();
            this.isSuccess = true;
            this.state = json.drinks;
            router.pause();
            router.navigate(`/drinks/${json.drinks._id}/edit`);
            return router.resume();
          });
        }, (error) => { throw error; });
      } catch(error) {
        this.reset();
        this.isFailure = true;
        this.errors = error.errors;
      }
    }
  }
}
