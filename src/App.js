import { useState } from 'react';
import InputForm from './components/InputForm';
import ResultsPortal from './components/ResultsPortal';
import TitleHeader from './components/TitleHeader';


const App = () => {

  const [aqMeasurementData, setAqMeasurementData] = useState([]);


  return (
    <div>
      <TitleHeader/>
      {aqMeasurementData.length === 0 && <InputForm setAqMeasurementData={setAqMeasurementData}/>}
      {aqMeasurementData.length > 0 && <ResultsPortal aqMeasurementData={aqMeasurementData} setAqMeasurementData={setAqMeasurementData}/>}
    </div>
  );
}

export default App;