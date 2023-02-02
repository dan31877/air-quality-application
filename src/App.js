import { useEffect, useState } from 'react';
import InputForm from './components/InputForm';
import TitleHeader from './components/TitleHeader';


const App = () => {

  const [aqMeasurementData, setAqMeasurementData] = useState([]);

  useEffect(() => {
      console.log(aqMeasurementData);
  }, [aqMeasurementData]);


  return (
    <div>
      <TitleHeader/>
      <InputForm setAqMeasurementData={setAqMeasurementData}/>
    </div>
  );
}

export default App;