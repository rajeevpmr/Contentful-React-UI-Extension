import React, { Component } from "react";
import axios from "axios";
import debounce from "debounce-promise/dist";
import Search from "../Search";
import { WEATHER_API_URL, DEBOUNCE } from "../../constants";

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
    return axios.get(`${WEATHER_API_URL}${inputValue}`).then(res => {
      const items = res.data;

      const suggestions = items.map(item => {
        return { label: item.LocalizedName, value: item.LocalizedName };
      });
      this.setState({ suggestions });
      return suggestions;
    });
  };

  handleChange = (selectedOption, { action }) => {
    // you can use the 'action' to do different things here
    this.setState({
      selectedOption
    });
    // // this is for update action on selectedOption
    // // will use the noop defaultProp if the dev didn't define the prop, so no need to conditionally call
    this.state.actionOnSelectedOption(selectedOption.label);
  };

  render() {
    const { selectedOption, suggestions } = this.state;

    return (
      <div className="items-select">
        <Search
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
