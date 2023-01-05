/* eslint-disable react/jsx-props-no-spreading */
import axios from 'axios';
import React from 'react';
import useToggle from './useToggle';
import useQuery from './useQuery';
import useInput from './useInput';
// import useDateFormat from './useDateFormat';
import useArray from './useArray';
import useLocalStorage from './useLocalStorage';

function CustomHooksTest() {
  const [isTextChanged, setIsTextChanged] = useToggle();
  const { response } = useQuery(axios.get('https://foodish-api.herokuapp.com/api/'));
  const [bindName] = useInput('');
  const { array, set, push, remove, filter, update, clear } = useArray([1, 2, 3, 4, 5, 6]);
  const { item, setLocalStorage, getLocalStorage, removeLocalStorage } = useLocalStorage();
  // const date = useDateFormat(Date.now());
  // console.log(date);
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div>{array.join(',')}</div>
      <button type="button" onClick={() => setLocalStorage('name', 'akash')}>
        set Local storage
      </button>
      <div>`local storage name is {item}`</div>
      <button type="button" onClick={() => getLocalStorage('name')}>
        get Local storage
      </button>
      <button type="button" onClick={() => removeLocalStorage('name')}>
        remove Local storage
      </button>
      <button type="button" onClick={() => push(7)}>
        Add 7
      </button>
      <button type="button" onClick={() => update(1, 9)}>
        update second element to 9
      </button>
      <button type="button" onClick={() => remove(1)}>
        remove second element
      </button>
      <button type="button" onClick={() => filter((n) => n < 4)}>
        Keep numbers less than 4
      </button>
      <button type="button" onClick={() => set([1, 2])}>
        Set to 1,2
      </button>
      <button type="button" onClick={clear}>
        Clear
      </button>
      {isTextChanged ? 'The light is on!' : 'Hey who turned off the lights'}
      <button type="button" onClick={setIsTextChanged}>
        {isTextChanged ? 'Toggled' : 'Click to Toggle'}
      </button>
      <form>
        <input {...bindName} type="text" />
      </form>

      <img src={response.image} alt="its" />
    </div>
  );
}

export default CustomHooksTest;
