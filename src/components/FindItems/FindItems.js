import React, { Component } from "react";
import axios from "axios";
import debounce from "debounce-promise/dist";
import Select from "../Select";
import { DEBOUNCE } from "../../constants";

class FindItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: [],
      selectedOption: this.props.defaultValue,
      actionOnSelectedOption: this.props.updateItems
    };
  }

  componentWillReceiveProps(props) {
    this.promiseOptions(props.defaultValue.label);
    this.setState({
      selectedOption: props.defaultValue
    });
  }

  promiseOptions = inputValue => {
  
    return axios.get(`${this.props.apiEndpoint}${inputValue}`).then(res => {
      const items = res.data;

      const suggestions = items.map(item => {
        console.log("For loop "+ item.LocalizedName +" item  "+ item);
        return { label: item.LocalizedName, value: item };
      });
      console.log("Suggestions "+ suggestions);
      this.setState({ suggestions });
      return suggestions;
    });
  };

  handleChange = (selectedOption) => {
    console.log("selectedOption "+ selectedOption);

    this.setState({
      selectedOption
    });
    
    this.state.actionOnSelectedOption(selectedOption.value);
  };

  render() {
    const { selectedOption, suggestions } = this.state;

    return (
      <div className="items-select">
        <Select
          label="items"
          name="items"
          inputId="select-search-autocomplete"
          value={selectedOption}
          defaultOptions={suggestions}
          loadOptions={debounce(this.promiseOptions, DEBOUNCE)}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default FindItems;
