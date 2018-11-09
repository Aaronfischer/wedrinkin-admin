import Component, { tracked } from '@glimmer/component';

export default class DrinksEdit extends Component {
  @tracked errors = {};
  @tracked state = {};

  constructor(options) {
    super(options);

    console.log('this.args', this.args);

    this.loadDrink(this.args.params.id);
    console.log('EDIT DRINK', this.state);
  }

  async loadDrink(id) {
    console.log('id', id);
    let request = await fetch(`//localhost:8080/api/drinks/${id}`, {
      credentials: 'same-origin',
    });
    let json = await request.json();
    console.log('json', json);
    this.state = json.drinks;
    console.log('this.drink', this.state);
  }

  validate = data => {
    const errors = {};
    console.log('validate data', data);
    if (!data.name) errors.name = "Can't be blank";
    if (!data.instructions) errors.instructions = "Can't be blank";
    return errors;
  };

  async onSubmit(data, e) {
    console.log('drink', data, e);
    e.preventDefault();
    const formErrors = this.validate(data);
    this.errors = formErrors;
    console.log('ERRORS', this.errors);
    if (Object.keys(this.errors).length === 0) {
      // this.setState({ loading: true });
      const id = data._id;
      console.log('PATCH DRINK', data);
      try {
        await fetch(`//localhost:8080/api/drinks/${id}`, {
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
            return json;
          });
        }, (error) => { throw error; });
      } catch(error) {
        this.errors = error.errors;
      }
    }
  }
}
