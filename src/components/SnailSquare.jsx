import React from 'react';

export default class SnailSquare extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            owner: 'grass',
            displayOwner: <img src="./images/grass.jpg" />,
            player: props.getPlayer()
        };

        console.log('state (player) in snail constructor', this.state);
        console.log('props in snail constructor', this.props);

        this.setPlayer = props.setPlayer;
        this.setPlayer = this.setPlayer.bind(this);

        this.getPlayer = props.getPlayer;
        this.getPlayer = this.getPlayer.bind(this);

        this.setGridState = props.setGridState;
        this.setGridState = this.setGridState.bind(this);

        this.keepScore = props.keepScore;

        this.setSquareOwner = this.setSquareOwner.bind(this);
        this.getSquareOwner = this.getSquareOwner.bind(this);
    }

    getSquareOwner(myPlayer) {
        switch(myPlayer) {
            case 'grass' :
                return (<img src="./images/grass.jpg" />);
            break;
            case 'snail' :
                return (<img src="./images/snail.jpg" />);
            break;
            case 'gardener' :
                return (<img src="./images/gardener.jpg" />);
            break;
            default :
                return (<img src="./images/grass.jpg" />);
        }
    }

    setSquareOwner() {
        // virgin square
        console.log('in set square owner state is', this.state);
        this.currentPlayer = ('grass' === this.getPlayer())? 'gardener' : this.getPlayer();

        let myState = {
            owner: this.currentPlayer,
            displayOwner: this.getSquareOwner(this.currentPlayer),
            player: this.currentPlayer
        };

        if (this.state.owner === 'grass' && this.props.winner === 'none') {
            console.info('current player', this.currentPlayer);
            this.keepScore(this.props.myRow, this.props.myCol, this.currentPlayer);
            let nextPlayer = (this.currentPlayer === 'snail' ? 'gardener' : 'snail');
            this.setState(myState);
            this.setPlayer(nextPlayer);
        } else {
            // square already taken
            console.log('Square already occupied');
        }
    }

    render() {
        return (
            <td onClick={this.setSquareOwner}>{this.state.displayOwner}</td>
        );
    }
}

