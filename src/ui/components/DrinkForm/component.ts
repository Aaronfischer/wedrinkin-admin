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

  didUpdate() {
    console.log('DIDUPDATE');
    if (this.args['data'] !== this.drink) {
      const drink = this.args['data'];
      console.log('DRINK', drink);

      this.model.name = drink.name;
      this.model.img = drink.img;
      this.model.quote = drink.quote;
      this.model.instructions = drink.instructions;

      this.drink = drink;
      this.model = this.model;
    }
    console.log('didUpdate drink', this.drink);
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
  get name(): string {
    return this.model.name;
  }

  @tracked
  get img(): string {
    return this.model.img;
  }

  @tracked
  get quote(): string {
    return this.model.quote;
  }

  @tracked
  get instructions(): string {
    return this.model.instructions;
  }
}
