import React, { Component } from "react";
import axios from "axios";
import debounce from "debounce-promise/dist";
import Select from "../Select";

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
    this.suggestedItems(props.defaultValue.label);
    this.setState({
      selectedOption: props.defaultValue
    });
  }

  suggestedItems = inputValue => {
  
    return axios.get(`${this.props.apiEndpoint}${inputValue}`).then(res => {
      const items = res.data;

      const listOfSuggestions = items.map(item => {
        console.log("For loop "+ item.LocalizedName +" item  "+ item);
        return { label: item.LocalizedName, value: item };
      });
      console.log("Suggestions "+ listOfSuggestions);
      this.setState({ listOfSuggestions });
      return listOfSuggestions;
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
    const { selectedOption, listOfSuggestions } = this.state;

    return (
      <div className="items-select">
        <Select
          label="items"
          name="items"
          inputId="select-search-autocomplete"
          value={selectedOption}
          defaultOptions={listOfSuggestions}
          loadOptions={debounce(this.suggestedItems, 300)}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default FindItems;
