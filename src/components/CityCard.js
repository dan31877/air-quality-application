import React from 'react';
import { Card, Header, Grid } from 'semantic-ui-react'

const CityCard = ( {cityData, index} ) => {
    return (
        <Card fluid color='blue'>
        <Card.Content>
            <Card.Header><Header as='h2' color='black'>{cityData.city}</Header></Card.Header>
        </Card.Content>
        <Card.Content>
            <Grid columns={2} divided>
                <Grid.Row stretched>
                <Grid.Column>
                    <p><strong>Parameter:</strong> {cityData.parameter}</p>
                    <p><strong>Last Updated:</strong> {cityData.lastUpdated}</p>
                    <p><strong>Units:</strong> {cityData.unit}</p>
                </Grid.Column>
                <Grid.Column verticalAlign='middle' textAlign='right'>
                    <p style={{ fontSize: "1.5em" }}><strong>Value:</strong> {cityData.value} {cityData.unit}</p>
                </Grid.Column>
                </Grid.Row>
            </Grid>
        </Card.Content>
        </Card>
    );
};

export default CityCard;