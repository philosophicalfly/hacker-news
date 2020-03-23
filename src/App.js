import React, {Component} from 'react';
import {Table, Form, Input} from "antd";
import "antd/dist/antd.css";
import './App.css';

const list = [
  {
    title: 'React',
    url: <a href="https://reactjs.org/">React Site</a>,
    author: 'Jordan Walke',
    key: 0
  }, {
    title: 'Redux',
    url: <a href='https://redux.js.org/'>Redux Site</a>,
    author: 'Dan Abramov, Andrew Clark',
    key: 1
  }
];

const columns = [
  {
    title: 'Titulo',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: 'WebSite',
    dataIndex: 'url',
    key: 'url'
  }, {
    title: 'Autor',
    dataIndex: 'author',
    key: 'author'
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns,
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
        Search for Titles:
      </Search>
      <List list={this.state.list} onDismiss={this.onDismiss} isSubstringOf={this.isSubstringOf} filter={this.state.filter}/>
    </div>);
  }
}

class Search extends Component {
  render() {
    const {value, onChange, children} = this.props;
    return (
    /*<form>
      <label>{children}
      </label>
      <input type="text" value={value} onChange={onChange}/>
    </form>,*/
    <Form>
      <Form.Item label={children} value={value} onChange={onChange} name="username">
        <Input/>
      </Form.Item>
    </Form>);
  }
}

class List extends Component {
  render() {
    const {list, onDismiss, isSubstringOf, filter} = this.props;
    return (
    /*list.filter(item => isSubstringOf(filter, item.title)).map(item => <div key={item.objectID}>
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
              <Button onClick={() => onDismiss(item.objectID)} type="button">
                Dismiss
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>),*/
    <Table dataSource={list.filter(item => isSubstringOf(filter, item.title))} columns={columns}/>)
  }
}

export default App;
