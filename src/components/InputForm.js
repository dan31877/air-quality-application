import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Segment, Header, Icon, Divider, Modal } from 'semantic-ui-react'

const InputForm = ( {setAqMeasurementData} ) => {

    const [formData, setFormData] = useState([
            { id: 1, name: "City 1", value: '', error: ''},
            { id: 2, name: "City 2", value: '', error: ''}
        ]
    ); 

    const [portalOpen, setPortalOpen] = useState(false); 

    const getAqMeasurementData = () => {
        const url = `https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&city=${formData[0].value}&city=${formData[1].value}&order_by=lastUpdated&dumpRaw=false`; 
        axios.get(url) 
        .then((responseData) => {
            if(responseData.data.results.length < 2) { 
                handlePortalOpen(); 
            } else {
                responseData.data.results.forEach((res) => {
                    const measurements = res.measurements[0];
                    const measurementsObject = {...measurements, city: res.city}; 
                    setAqMeasurementData(prevArray => [...prevArray, measurementsObject]); 
            })}
        })
        .catch(error => console.error(`Error: ${error}`))
    }

    const handlePortalClose = () => setPortalOpen(false);
    const handlePortalOpen = () => setPortalOpen(true);

    const handleInputChange = (index, event) => {
        const target = event.target;
        const name = target.name;
        let error = '';

        if( !(/^[A-Za-z\s]*$/.test(target.value)) ) {
            error = `${name} should only contain letters and spaces.`
        }

        if (!target.value) {
            error = `${name} field cannot be empty.`
        }

        setFormData(            
            formData.map((city) => city.id === index+1
            ? { ...city, value: target.value, touched: true, error: error }
            : { ...city }
        ));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        getAqMeasurementData(); 
        setFormData(            
            formData.map((city) => ({ ...city, value: '', error: '' }))
        ); 
    };

    return (
        <div>
            <Segment padded='very'>
                <Header as='h2' color='blue' textAlign='center'>
                    <Header.Content>
                        City Input Form
                    </Header.Content>
                </Header>
                <Header as='h4' color='blue'>
                <Icon name='info circle' />
                <Header.Content>
                    Enter two city names in the input fields below. Click submit to display the air quality of the corresponding cities for comparison.
                </Header.Content>
                </Header>
                <Divider horizontal />
                <Divider horizontal />
                <Form size='large' onSubmit={onSubmit}>
                    {formData.map((city, idx) => (
                        <Form.Input
                            key={city.name + city.id}
                            label={city.name}
                            placeholder={city.name}
                            name={city.name}
                            value={city.value}
                            required
                            error={city.error !== '' && city.error}
                            onChange={(e) => handleInputChange(idx, e)}
                        />
                    ))}
                    <Divider horizontal />
                    <Button type='submit' positive>Submit</Button>
                </Form>
                    <Modal
                        centered={true}
                        open={portalOpen}
                        onClose={() => handlePortalClose()}
                        onOpen={() => handlePortalOpen()}
                        >
                        <Modal.Header>There was a problem with the data from the Cities</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                            There was a problem with one or both of the cities entered. Please use more well known cities in future searches.
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative onClick={() => handlePortalClose()}>Close</Button>
                        </Modal.Actions>
                </Modal>
            </Segment>
        </div>
    );
}

export default InputForm;