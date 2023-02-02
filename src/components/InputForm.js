import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Segment, Header, Icon, Portal, Divider } from 'semantic-ui-react'

const InputForm = ( {setAqMeasurementData} ) => {

    const [formData, setFormData] = useState({
        city1: "",
        city2: ""
    });
    const [portalOpen, setPortalOpen] = useState(false); 
    // const [aqMeasurementData, setAqMeasurementData] = useState([]); 

    const getAqMeasurementData = () => {
        const url = `https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&city=${formData.city1}&city=${formData.city2}&order_by=lastUpdated&dumpRaw=false`; 
        axios.get(url) 
        .then((responseData) => {
            responseData.data.results.map((res) => {
                const measurements = res.measurements[0];
                const measurementsObject = {...measurements, city: res.city}; 
                setAqMeasurementData(prevArray => [...prevArray, measurementsObject]); 
            })
        })
        .catch(error => console.error(`Error: ${error}`))
    }

    // useEffect(() => {
    //     console.log(aqMeasurementData);
    // }, [aqMeasurementData]); 

    const handlePortalClose = () => setPortalOpen(false);
    const handlePortalOpen = () => setPortalOpen(true);

    const handleInputChange = (e) => {
        const nextFormData = {
          ...formData,
          [e.target.name]: e.target.value,
        };
        setFormData(nextFormData);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // alert(JSON.stringify(formData, null, 2));
        console.log(formData); 
        // handlePortalOpen(); 
        // console.log(isValid); 
        getAqMeasurementData(); 
        setFormData({city1: "", city2: ""}); 
    };

    // const isValid = () => {
    //     return (formData.city1 && formData.city2 ); 
    // }

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
                    <Form.Input
                        label='City 1'
                        placeholder='City 1'
                        name='city1'
                        value={formData.city1}
                        required
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        label='City 2'
                        placeholder='City 2'
                        name='city2'
                        value={formData.city2}
                        required
                        onChange={handleInputChange}
                    />
                    <Divider horizontal />
                    <Button type='submit' positive>Submit</Button>
                </Form>
                <Portal onClose={handlePortalClose} open={portalOpen}>
                    <Segment
                    style={{
                        left: '40%',
                        position: 'fixed',
                        top: '50%',
                        zIndex: 1000,
                    }}
                    >
                    <Header>The cities have been assigned successfully. </Header>
                    <div>{formData.city1}</div>
                    <p>City 1: {formData.city1}</p>
                    <p>City 2: {formData.city2}</p>

                    <Button
                        content='Close Portal'
                        negative
                        onClick={handlePortalClose}
                    />
                    </Segment>
                </Portal>
            </Segment>
        </div>
    );
}

export default InputForm;