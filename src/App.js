import React, {Component} from 'react';
require('./App.css');

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  }, {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      filter: ''
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.isSubstringOf = this.isSubstringOf.bind(this)
  }

  onDismiss(dismissedID) {
    const oldList = this.state.list;
    const itemsOfDifferentId = item => item.objectID !== dismissedID;
    const newList = oldList.filter(itemsOfDifferentId)
    this.setState({list: newList})
  }

  setFilter(event) {
    this.setState({filter: event.target.value});
  }

  isSubstringOf(substring, string) {
    return string.toLowerCase().includes(substring.toLowerCase());
  }

  render() {
    return (<div className="App">
      <Search value={this.state.filter} onChange={this.setFilter}>
        Search:
      </Search>
      <List list={this.state.list} onDismiss={this.onDismiss} isSubstringOf={this.isSubstringOf} filter={this.state.filter}/>
    </div>);
  }
}

class Search extends Component {
  render() {
    const {value, onChange, children} = this.props;
    return (<form>
      <label>{children} </label>
      <input type="text" value={value} onChange={onChange}/>
    </form>);
  }
}

class List extends Component {
  render() {
    const {list, onDismiss, isSubstringOf, filter} = this.props;
    return (list.filter(item => isSubstringOf(filter, item.title)).map(item => <div key={item.objectID}>
      <table>
        <tbody>
          <tr>
            <td>
              <a href={item.url}>{item.title}</a>
            </td>
            <td>{item.author}</td>
            <td>{item.num_comments}</td>
            <td>{item.points}</td>
            <td>
              <button onClick={() => onDismiss(item.objectID)} type="button">
                Dismiss
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>))
  }
}

export default App;
