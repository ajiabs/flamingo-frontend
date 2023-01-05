// Import files in App.js
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PieChart from './Chart/PieChart';
import BarChart from './Chart/BarChart';
import ChartFunction from './Chart/Linechart';
// import PhoneInput from 'react-phone-number-input';
import NumberInput from './NumberBox/NumberBox';
import RadioButtonField from './RadioButton/RadioButton';
import EmailInput from './EmailBox/EmailBox';
import TextInput from './TextField/TextField';
import PasswordField from './PasswordField/PasswordField';
import PhoneNumberInput from './PhoneNumberBox/PhoneNumberBox';
import TextAreaField from './TextArea/TextArea';
import CheckBoxField from './CheckBox/CheckBox';
import MultiSelect from './MultiSelect/MultiSelect';
import SelectBox from './SelectBox/SelectBox';
// import Toggle from './ToggleButton/ToggleButton';
import ToggleButtonOnOff from './ToggleButton/ToggleButton';
import { REACT_APP_API_SKILLS } from '../redux/apiConstants';
// import ExportToExcel from './Export/ExportToExcel';
// import ExportPdf from './ExportPdf/ExportPdf';

// import ExportCSV from './Export/testExport';
// import ExcelExport from './Export/ExportTest';
// import ExportCSV from './Export/testExport';
// import ExportPdf from './ExportPdf/ExportPdf';
// import PhoneNumbere from './PhoneNumberBox/textphn';
// import PhnNumberInput from './phnnumberBox/phnnumberBox';
// Define App here
export default function HooksTest() {
  // const fileName = 'Report';
  // const people = [
  //   { name: 'Keanu Reeves', profession: 'Actor' },
  //   { name: 'Lionel Messi', profession: 'Football Player' },
  //   { name: 'Cristiano Ronaldo', profession: 'Football Player' },
  //   { name: 'Jack Nicklaus', profession: 'Golf Player' },
  // ];
  // const viewers = [
  //   { id: 1, name: 'aj' },

  //   { id: 2, name: 'j' },
  // ];
  // const DATA = [
  //   {
  //     STUDENT_DETAILS: {
  //       id: 101,
  //       name: 'Suman Kumar',
  //       parentName: 'Suresh Kumar',
  //       classroom: '12th',
  //       subject: 'Non Medical',
  //       division: '1st',
  //       status: 'Pass',
  //     },
  //     MARKS: {
  //       maths: 75,
  //       physics: 65,
  //       chemistry: 72,
  //       english: 62,
  //       computerScience: 80,
  //     },
  //   },
  //   {
  //     STUDENT_DETAILS: {
  //       id: 102,
  //       name: 'Rahul Kumar',
  //       parentName: 'Aatma Ram',
  //       classroom: '12th',
  //       subject: 'Non Medical',
  //       division: '1st',
  //       status: 'Pass',
  //     },
  //     MARKS: {
  //       maths: 70,
  //       physics: 75,
  //       chemistry: 82,
  //       english: 72,
  //       computerScience: 60,
  //     },
  //   },
  //   {
  //     STUDENT_DETAILS: {
  //       id: 103,
  //       name: 'Anuj Kumar',
  //       parentName: 'Ashok Kumar',
  //       classroom: '12th',
  //       subject: 'Non Medical',
  //       division: '1st',
  //       status: 'Pass',
  //     },
  //     MARKS: {
  //       maths: 60,
  //       physics: 65,
  //       chemistry: 92,
  //       english: 77,
  //       computerScience: 80,
  //     },
  //   },
  // ];
  const [posts, setPosts] = useState([]);
  // const [checked, setChecked] = useState([]);
  // const onchange = () => {
  //   setChecked('false');
  // };
  useEffect(() => {
    const url = REACT_APP_API_SKILLS;
    // api url
    fetch(url)
      .then((resp) => resp.json()) // calling url by method GET
      .then((resp) => setPosts(resp)); // setting response to state posts
  }, []);
  // const [datas, setDatas] = React.useState([]);
  // const fileName = 'mysamplefile';
  // useEffect(() => {
  //   const url = 'https://jsonplaceholder.typicode.com/posts'; // api url
  //   fetch(url)
  //     .then((resp) => resp.json()) // calling url by method GET
  //     .then((resp) => setDatas(resp)); // setting response to state posts
  // }, []);
  // destruct useForm of react hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // This runs on submit
  const onSubmit = () => {};

  // returns the App component
  return (
    // Form element
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          // Write TextInput component here and give value to all props
        }
        <TextInput
          fieldName="textFtextield"
          register={register}
          errors={errors}
          placeHolder="Text Field"
          isRequired
          maximLength={20}
          minimLength={2}
        />
        <TextInput
          fieldName="text"
          register={register}
          errors={errors}
          placeHolder="Text Field"
          isRequired
          maximLength={20}
          minimLength={2}
        />
        <TextInput
          fieldName="te"
          register={register}
          errors={errors}
          placeHolder="Text Field"
          isRequired
          maximLength={20}
          minimLength={2}
        />
        <PasswordField
          fieldName="Password"
          label="Password"
          register={register}
          errors={errors}
          placeHolder="Password"
          isRequired
          minimLength={6}
        />
        <TextAreaField
          fieldName="Text Area"
          label="Text Area"
          register={register}
          errors={errors}
          placeHolder="Text Area"
          isRequired
        />
        <CheckBoxField
          fieldName="Check box Value"
          label="Check box Value"
          register={register}
          errors={errors}
          isRequired
        />
        <MultiSelect
          name="disciplines"
          label="Disciplines"
          control={control}
          values={posts.selectdata}
          errors={errors}
        />
        <SelectBox name="disci" label="Disci" control={control} values={posts.selectdata} />

        <NumberInput
          fieldName="NumberField"
          register={register}
          errors={errors}
          isRequired
          maximLength={4}
          minimLength={2}
        />
        <NumberInput
          fieldName="Number"
          register={register}
          errors={errors}
          isRequired
          maximLength={4}
          minimLength={2}
        />
        <EmailInput
          fieldName="email"
          register={register}
          label="Email"
          errors={errors}
          isRequired
        />
        <RadioButtonField label="age" />
        <RadioButtonField label="time" />
        <RadioButtonField label="life" />
        {/* <ExportCSV apiData={viewers} fileName={fileName} />
        <ExportPdf people={people} /> */}
        {/* <PhoneInput
        fieldName="phn"
        value={register.value}
        onChange={register}
        defaultCountry="TH"
        id="phone-input"
        RegularExp=".?(\\d{3}).*(\\d{3}).*(\\d{4})"
      /> */}
        <PhoneNumberInput fieldName="ph" register={register} errors={errors} />
        {/* <PhoneNumbere /> */}
        {/* <PhnNumberInput /> */}
        <input type="submit" value="Submit to Console" />
      </form>
      <div>
        <PieChart
          title="Pie Chart"
          labels={['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']}
          datas={[12, 19, 3, 5, 2, 3]}
          label="# of Votes"
          backgroundColor={[
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ]}
          borderColor={[
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ]}
          borderWidth="1"
        />
      </div>
      <div>
        <BarChart
          labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
          title="Chart.js Bar Chart"
          data={[
            {
              label: 'Dataset 1',
              data: [120, 190, 30, 50, 20, 30, 99],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Dataset 2',
              data: [-120, -190, -30, -50, -20, -30, -99],
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ]}
        />
      </div>
      <div>
        <ChartFunction
          labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']}
          title="Chart.js Bar Chart"
          data={[
            {
              label: 'Dataset 1',
              data: [120, 190, 30, 50, 20, 30, 99],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Dataset 2',
              data: [-120, -190, -30, -50, -20, -30, -99],
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ]}
        />
        <ToggleButtonOnOff />
        {/* <Toggle id="toggleSwitch" /> */}
      </div>
    </>
  );
}
