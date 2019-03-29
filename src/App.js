import React, { Component } from "react";
import FindItems from "./components/FindItems";
import { init as initContentfulExtension } from "contentful-ui-extensions-sdk";
import "./App.css";
// import { initApi } from "./api";

class App extends Component {
  state = {
    api: {},
    value: ""
  };

  componentDidMount() {
    initContentfulExtension(api => {
      api.window.startAutoResizer();

      const storedValue =
        api.field.getValue() !== undefined ? api.field.getValue() : "";
      this.setState({
        value: { label: storedValue, value: storedValue },
        api: api
      });
    });
    
  }

  updateItems = value => {
    this.setState({
      value: {
        label: value,
        value
      }
    });

    this.state.api.field.setValue(value);
  };

  render() {
    const { value } = this.state;
    return (
      <div className="App">
        <FindItems
          defaultValue={value}
          updateItems={this.updateItems}
        />
      </div>
    );
  }
}

export default App;
