import React from 'react';
import { Button, Card, Segment, Header, Icon, Divider } from 'semantic-ui-react'
import CityCard from './CityCard';

const ResultsPortal = ( {aqMeasurementData, setAqMeasurementData} ) => {

    const clearResultData = () => {
        setAqMeasurementData([]); 
    }

    return (
        <div>
            <Segment padded='very'>
                <Header as='h2' color='blue' textAlign='center'>
                <Header.Content>
                    <Icon name='check circle' />Results 
                </Header.Content>
                </Header>
              <Card.Group>
              {aqMeasurementData
                .sort((a, b) => (a.city.localeCompare(b.city)))
                .map((cityData, index) => {
                return (
                    <CityCard key={cityData.city + index} cityData={cityData} index={index}/>
                )
              })}
            </Card.Group>
            <Divider horizontal />
                <Button padded='very' type='reset' onClick={clearResultData} primary>Clear Data</Button>
            </Segment>
        </div>
    );
};

export default ResultsPortal;