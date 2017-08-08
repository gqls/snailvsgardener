import React from 'react';
import Grid from './Grid.jsx';

export default class Game extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            player: 'gardener'
        };
    }

    render() {
        return (<div><Grid /></div>);
    }
}