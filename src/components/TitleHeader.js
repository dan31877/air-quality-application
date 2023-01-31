import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const TitleHeader = () => {
    return (
        <div>
            <Segment inverted color='black'>
                <Header as='h1' color='blue'>Air Quality App</Header>
            </Segment>
        </div>
    );
}

export default TitleHeader;