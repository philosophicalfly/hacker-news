import React, {Component} from 'react';

const petList = [
  {
    id: 0,
    name: 'Rossy'
  }, {
    id: 1,
    name: 'Cuca'
  }, {
    id: 2,
    name: 'Rabo de Vento'
  }
];
let pet = petList
  ? petList[0]
  : {};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pet
    };

    this.nextPet = () => {
      const nextId = this.state.pet.id + 1
      if (petList[nextId]) {
        return this.setState(({pet: petList[nextId]}));
      }
      return this.setState(({pet: petList[0]}));
    }
  }

  render() {
    return (<div className="App">
      <span>
        <button onClick={this.nextPet}>Troca pet</button>
      </span>
      {this.state.pet.name}
    </div>);
  }
}

export default App;
