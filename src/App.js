import React, { Component } from "react";
import FindItems from "./components/FindItems";
import { init as initContentfulExtension } from "contentful-ui-extensions-sdk";
import "./App.css";


class App extends Component {
  state = {
    api: {},
    value: ""
  };

  constructor(props){
    super(props);
    initContentfulExtension(api => {
      api.window.startAutoResizer();

      const storedValue =
        api.field.getValue() !== undefined ? api.field.getValue() : "";
      this.setState({
        value: { label: storedValue.LocalizedName, value: storedValue },
        api: api
      });
    });
  }


  /*componentDidMount() {
    initContentfulExtension(api => {
      api.window.startAutoResizer();

      const storedValue =
        api.field.getValue() !== undefined ? api.field.getValue() : "";
      this.setState({
        value: { label: storedValue.LocalizedName, value: storedValue },
        api: api
      });
    });
    
  } */

  updateItems = value => {
    console.log("Update Items method "+value);
    this.setState({
      value: {
        label: value.LocalizedName,
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
          apiEndpoint={this.state.api.parameters.instance.apiEndpoint}
          apiToken={this.state.api.parameters.instance.apiToken}
        />
      </div>
    );
  }
}

export default App;
