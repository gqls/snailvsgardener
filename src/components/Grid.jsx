import React from 'react';
import SnailSquare from './SnailSquare.jsx';

export default class Grid extends React.Component
{
    constructor(props) {
        super(props);

        const status = 'Gardener vs Snail';

        this.setPlayer = this.setPlayer.bind(this);
        this.getPlayerInState = this.getPlayerInState.bind(this);
        this.keepScore = this.keepScore.bind(this);
        this.displayStatus = 'none';

        this.player = 'grass';
        this.winner = 'none';
        this.scores = {
            'rows': {0:[],1:[],2:[]},
            'cols': {0:[],1:[],2:[]},
            'diagonals': {'right':[], 'left':[]}
        };

        this.state = {
            player: 'grass'
        }
    }

    setPlayer(newPlayer) {
        this.player = newPlayer;
        this.setGridState();
    }

    setGridState() {
        console.log('just before set state in setGridState grid as an object "this" is', this)
        let player = this.player;
        this.setState({player: player});
    }

    getPlayerInState() {
        return this.state.player;
    }

    keepScore(squareRow, squareCol, squareOwner)
    {
        console.log(
            'squarerow', squareRow,
            'squareCol', squareCol,
            'square player is', squareOwner);

        this.scores.rows[squareRow].push(squareOwner);
        this.scores.cols[squareCol].push(squareOwner);

        if (squareRow === squareCol) {
            this.scores.diagonals['right'].push(squareOwner);
        }
        if ((squareRow === 0 && squareCol === 2) ||
            (squareRow === 1 && squareCol === 1) ||
            (squareRow === 2 && squareCol === 0))
        {
            this.scores.diagonals['left'].push(squareOwner);
        }

        for (let i=0; i<3; i++)
        {
            let gardenerRow = this.scores.rows[i].filter(squareOwner => 'gardener' === squareOwner);
            let snailRow = this.scores.rows[i].filter(squareOwner => 'snail' === squareOwner);

            if (3 <= gardenerRow.length) {
                console.log('WINNER IS: ', 'GARDENER Row');
                this.winner = 'Gardener Wins';
            }
            
            if (3 <= snailRow.length) {
                console.log('WINNER IS: ', 'SNAIL row');
                this.winner = 'Snails Won';
            }

            let gardenerCol = this.scores.cols[i].filter(squareOwner => 'gardener' === squareOwner);
            let snailCol = this.scores.cols[i].filter(squareOwner => 'snail' === squareOwner);

            if (3 <= gardenerCol.length) {
                console.log('WINNER IS: ', 'GARDENER Column');
                this.winner = 'Gardener Wins';
            }
            if (3 <= snailCol.length) {
                console.log('WINNER IS: ', 'SNAIL col');
                this.winner = 'Snails Won';
            }
        }

        let gardenerRightDiagonal = this.scores.diagonals.right.filter(squareOwner => 'gardener' === squareOwner);
        if (3 <= gardenerRightDiagonal.length) {this.winner = 'Gardener Wins'}
        let snailRightDiagonal = this.scores.diagonals.right.filter(squareOwner => 'snail' === squareOwner);
        if (3 <= snailRightDiagonal.length) {this.winner = 'Snails Won'}

        let gardenerLeftDiagonal = this.scores.diagonals.left.filter(squareOwner => 'gardener' === squareOwner);
        if (3 <= gardenerLeftDiagonal.length) {this.winner = 'Gardener Wins'}
        let snailLeftDiagonal = this.scores.diagonals.left.filter(squareOwner => 'snail' === squareOwner);
        if (3 <= snailLeftDiagonal.length) {this.winner = 'Snails Won'}
    }

    render() {
        const rows = [];
        // there is a winner
        this.tableCss = [];
        if ('none' !== this.winner) {
            this.displayStatus = 'block';

            let rotation = 10;
            let counter = 0;
            let scale = 1;

            this.tableTransform = 'rotate('+rotation+'deg) scale('+scale+')';
            let intvl = setInterval(() =>
            {
                rotation+=15;
                scale/=1.01;
                counter+=1;
                if (200 < counter) {
                    clearInterval(intvl);
                }
                let myTable = document.getElementById('gameTable');
                myTable.style.transform = 'rotate('+rotation+'deg) scale('+scale+')';

            },100)
        }
        for (let i=0; i<=2; i++) {
            let cols = [];
            for (let j=0; j<=2; j++) {
                cols.push(
                    <SnailSquare id={'snail'+i+':'+j}
                                 key={'col' + j + 'row' + i}
                                 setPlayer={this.setPlayer}
                                 getPlayer={this.getPlayerInState}
                                 player={this.state.player}
                                 setGridState={this.setGridState}
                                 keepScore={this.keepScore}
                                 myRow={i}
                                 myCol={j}
                                 winner={this.winner}
                    />
                )
            }
            rows.push(<tr key={i}>{cols}</tr>);
        }

        return (
            <div>
                <div className="status">{status}</div>
                <h1 id="winner" style={{display:this.displayStatus}}>{this.winner}</h1>
                <table id="gameTable" style={{transform:this.tableTransform}}><tbody>{rows}</tbody></table>
            </div>
        );
    }
}