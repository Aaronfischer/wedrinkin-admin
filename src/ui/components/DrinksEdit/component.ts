import Component, { tracked } from '@glimmer/component';
import { router } from '../WedrinkinAdminGlimmer/component';
import { fetchWrapper } from '../../../utils/fetch-wrapper';
import config from '../../../../config/environment';

export default class DrinksEdit extends Component {
  @tracked errors = {};
  @tracked state = {};
  @tracked isSuccess: boolean = false;
  @tracked isFailure: boolean = false;
  @tracked isLoading: boolean = false;

  constructor(options) {
    super(options);

    this.loadDrink(this.args.params.id);
  }

  async loadDrink(id) {
    let request = await fetchWrapper(`${config.host}/api/drinks/${id}`, {
      credentials: 'same-origin',
    });
    let json = await request.json();
    this.state = json.drinks;
    console.log('this.drink', this.state);
  }

  validate = data => {
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
      const id = data._id;
      try {
        await fetchWrapper(`${config.host}/api/drinks/${id}`, {
          method: 'PATCH',
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
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
            return json;
          });
        }, (error) => { throw error; });
      } catch(error) {
        this.reset();
        this.isFailure = true;
        this.errors = error.errors;
      }
    }
  }

  async onDelete(data) {
    const id = data._id;
    try {
      await fetchWrapper(`${config.host}/api/drinks/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ drink: data }),
      }).then(data => {
        if (data.status === 200) {
          return router.navigate('/drinks');
        }
        return data.json().then((json) => {
          if (data.status === 400) {
            throw json;
          }
        });
      }, (error) => { throw error; });
    } catch(error) {
      this.reset();
      this.isFailure = true;
      this.errors = error.errors;
    }
  }
}
