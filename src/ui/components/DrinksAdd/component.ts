import Component, { tracked } from '@glimmer/component';

export default class DrinksAdd extends Component {
  @tracked errors = {};
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
    const errors = {};
    if (!data.name) errors.name = "Can't be blank";
    if (!data.instructions) errors.instructions = "Can't be blank";
    return errors;
  };

  async onSubmit(data, e) {
    e.preventDefault();
    const formErrors = this.validate(data);
    this.errors = formErrors;
    if (Object.keys(this.errors).length === 0) {
      // this.setState({ loading: true });
      try {
        await fetch('//localhost:8080/api/drinks', {
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
            return json;
          });
        }, (error) => { throw error; });
      } catch(error) {
        this.errors = error.errors;
      }
    }
  }
}
