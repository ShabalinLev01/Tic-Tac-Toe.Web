import React, { Component } from 'react';

function Square(props = {value: " "}) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                </div>
                <div className="board-row">
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
            </div>
        );
    }
}

export class Game extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            gameData: {},
            playerName: "",
            timeName: ""
        };
    }

   async handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const gameData = this.state.gameData;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        squares[i] = "X";
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json'},
            body: JSON.stringify({ "Game": gameData, "Square": i})
        };
        const response = await fetch('game', requestOptions);
        const data = await response.json();
        if (data.whoWin == null)
            squares[data.square] = "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            gameData: data.game,
            playerName: data.game.playerName
        });
    }
    
    render() {
        if (this.state.playerName === "")
            return (
                <div align="center" className="align-self-center mt-lg-5">
                    <h1 className="mb-5">Tic Tac Toe</h1>
                    <label htmlFor="inputName" className="h5">What's your name?</label>
                    <div className="input-group mb-3 w-25">
                        <input
                            id="inputName"
                            className="form-control"
                            name="playerNameInput"
                            type="text"
                            ref={this.textInput} />
                    </div>
                    <div>
                        <button className="btn btn-info btn-lg" type="submit" onClick={this.focusTextInput}>Start</button>
                    </div>
                </div>
            );
        
        const winner = this.state.gameData.whoWin;
        if (winner != null)
            return (
                <div align="center" class="align-self-center mt-lg-5">
                    <h1>Winner is {winner}!</h1>
                </div>
            );
        
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        
        return (
            <div align="center" className="game align-self-center mt-lg-5">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
            </div>
        );
    }
    
    async focusTextInput() {
        let name = this.textInput.current.value;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "PlayerName": name })
        };
        const response = await fetch('startgame', requestOptions);
        const data = await response.json();
        this.setState(prevState => {
            let newState = Object.assign({}, prevState);
            newState.playerName = 'name';
            newState.gameData = data;
            return newState;
        });
    }
}
