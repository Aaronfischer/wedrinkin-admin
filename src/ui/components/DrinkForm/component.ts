import Component, { tracked } from '@glimmer/component';

export default class DrinkForm extends Component {
  // reset the local drink obj to come from the passed in argument
  @tracked private drink: {} = this.args['data'];

  @tracked private model: {} = {};

  constructor(options) {
    super(options);
    console.log('constructor this.args.data', this.args['data']);
    console.log('constructor this.drink', this.drink);
  };

  tempOptions = [
    { value: '-10', text: '-10' },
    { value: '0', text: '0' },
    { value: '10', text: '10' },
    { value: '20', text: '20' },
    { value: '30', text: '30' },
    { value: '40', text: '40' },
    { value: '50', text: '50' },
    { value: '60', text: '60' },
    { value: '70', text: '70' },
    { value: '80', text: '80' },
    { value: '90', text: '90' },
    { value: '100', text: '100' },
    { value: '110', text: '110' },
  ];

  didUpdate() {
    console.log('DIDUPDATE');
    if (this.args['data'] !== this.drink) {
      const drink = this.args['data'];

      this.model._id = drink._id;
      this.model.city = drink.city;
      this.model.name = drink.name;
      this.model.img = drink.img;
      this.model.ingredients = drink.ingredients;
      this.model.instructions = drink.instructions;
      this.model.quote = drink.quote;
      this.model.temp = drink.temp;
      this.model.time = drink.time;
      this.model.wind = drink.wind;

      this.drink = drink;
      this.model = this.model;
    }
    console.log('didUpdate model', this.model);
  }

  onChange = e => {
    this.model = {
      ...this.model,
      [e.target.name]: e.target.value
    };
    console.log('onChange', this.model);
    return this.model;
  };

  @tracked
  get _id(): string {
    return this.model._id;
  }

  @tracked
  get city(): string {
    return this.model.city;
  }

  @tracked
  get name(): string {
    return this.model.name;
  }

  @tracked
  get img(): string {
    return this.model.img;
  }

  @tracked
  get ingredients(): string {
    return this.model.ingredients;
  }

  @tracked
  get instructions(): string {
    return this.model.instructions;
  }

  @tracked
  get quote(): string {
    return this.model.quote;
  }

  @tracked
  get temp(): string {
    return this.model.temp;
  }

  @tracked
  get time(): string {
    return this.model.time;
  }

  @tracked
  get wind(): string {
    return this.model.wind;
  }
}
