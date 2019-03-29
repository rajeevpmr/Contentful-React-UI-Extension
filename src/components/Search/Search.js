import React, { PureComponent } from "react";
import AsyncSelect from "react-select/lib/Async";


class Search extends PureComponent {
  render() {
    const {
      label,
      name,
      inputId,
      value,
      defaultOptions,
      loadOptions,
      onChange
    } = this.props;
    return (
      <div className="select-search">
        {label && (
          <div className="select-search-label">
            <label htmlFor={inputId}>{label}</label>
          </div>
        )}
        <div
          className="select-search-select"
          data-qa-class="select-search-select"
        >
          <AsyncSelect
            
            name={name}
            label={label}
            defaultMenuIsOpen
            inputId={inputId}
            value={value}
            defaultOptions={defaultOptions}
            loadOptions={loadOptions}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
}

export default Search;
