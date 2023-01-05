import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getCookies } from '../../hooks/useCookies';

function AutoComplete({ url, field }) {
  const token = `Bearer ${getCookies('Token')}`;
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [autoCompleteData, setAutoCompleteData] = useState([]);

  const getAutoCompleteData = (term) => {
    url += `autocomplete=${field}:${term}`;
    axios
      .get(url, {
        headers: { Authorization: token },
      })
      .then((resp) => {
        setAutoCompleteData(resp.data.results);
      })
      .catch((e) => e);
  };

  useEffect(() => {
    getAutoCompleteData('');
  }, []);
  const onChangeHandler = (e) => {
    let matches = [];
    if (e.length > 0) {
      getAutoCompleteData(e);
      matches = autoCompleteData.filter((item) => {
        const regex = new RegExp(`${e}`, 'gi');
        return item[field].match(regex);
      });
    }
    setSuggestions(matches);
    setText(e);
  };
  const onSuggestHandler = (e) => {
    setText(e);
    setSuggestions([]);
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => onChangeHandler(e.target.value)}
        placeholder="This is autocomplete text box"
        value={text}
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([]);
          }, 100);
        }}
      />
      {suggestions &&
        suggestions.map((suggestion) => (
          <div
            key={suggestion.email}
            role="button"
            tabIndex={0}
            className="col-md-12 input justify-content-md-center"
            onClick={() => onSuggestHandler(suggestion[field])}
            onKeyDown={() => onSuggestHandler(suggestion[field])}
          >
            {suggestion[field]}
          </div>
        ))}
    </div>
  );
}
AutoComplete.propTypes = {
  url: PropTypes.element.isRequired,
  field: PropTypes.element.isRequired,
};
export default AutoComplete;
