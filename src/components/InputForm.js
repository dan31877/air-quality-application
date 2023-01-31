import React, { useState } from 'react';
import { Button, Form, Segment, Header, Icon } from 'semantic-ui-react'

const InputForm = () => {

    const [formData, setFormData] = useState({
        city1: "",
        city2: ""
    });

    const handleInputChange = (e) => {
        const nextFormData = {
          ...formData,
          [e.target.name]: e.target.value,
        };
        setFormData(nextFormData);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
        console.log(isValid); 
        setFormData({city1: "", city2: ""}); 
    };

    const isValid = () => {
        return (formData.city1 && formData.city2 ); 
    }

    return (
        <div>
            <Segment padded='very'>
                <Header as='h4' color='blue'>
                <Icon name='info circle' />
                <Header.Content>
                    Enter two city names in the input fields below. Click submit to display the air quality of the corresponding cities for comparison.
                </Header.Content>
                </Header>
                <Form onSubmit={onSubmit}>
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
                    <Button type='submit' positive>Submit</Button>
                </Form>
            </Segment>
        </div>
    );
}

export default InputForm;