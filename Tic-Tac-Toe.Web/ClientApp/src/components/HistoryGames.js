import React, {Component} from 'react';

class HistoryOfGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            History: [],
        }
    }
    
    componentDidMount() {
        this.renderHistory().then(result => this.setState({
            History: result,
            Id: this.props.gameId
        }))
    }

    renderHistory = async() => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            let url = 'HistoryGames/GetHistory?id='+this.props.gameId;
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            return data.map((history, i) =>
                {
                    return(
                        <tr key={i}>
                            <th>{history.numberOfStroke}</th>
                            <th>{history.whoIsMove}</th>
                            <th>{history.stroke}</th>
                        </tr>);
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.state.Id !== this.props.gameId)
            this.componentDidMount()
        const history = this.state.History;
        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Number of Stroke</th>
                        <th scope="col">Who is move</th>
                        <th scope="col">Stroke</th>
                    </tr>
                </thead>
                <tbody>
                    {history}
                </tbody>
            </table>
        );
    }
}

export class HistoryGames extends Component {
    static displayName = HistoryGames.name;

    constructor(props) {
        super(props);
        this.state = {
            Games: [],
            HistoryId: ""
        }
    }
    
    componentDidMount() {
        this.renderGames().then(result => this.setState({
            Games: result
        }))
    }
    
    getHistory(id){
        this.setState(prevState => {
            let newState = Object.assign({}, prevState);
            newState.HistoryId = id;
            return newState;
        });
    }

    renderGames = async() => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };
            const response = await fetch('HistoryGames/GetGames', requestOptions);
            const data = await response.json();
            return data.map((game, i) => 
                {
                let date = new Date(Date.parse(game.startDate));
                let id = game.id;
                return(
                <tr key={i}>
                    <th scope="col">{i}</th>
                    <th>{game.playerName}</th>
                    <th>{date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getUTCDate()) + " " + (date.getHours()) + ":" +  (date.getMinutes()<10?'0':'') + date.getMinutes()}</th>
                    <th>{game.whoWin}</th>
                    <th>{game.stateOfGame === 0 ? "Don't finished" : "Finished"}</th>
                    <th>
                        <button className="btn btn-info btn-lg" onClick={(e) => (this.getHistory(id))}>
                            History
                        </button>
                    </th>
                </tr>);
                }
            );
        } catch (err) {
            console.log(err);
        }
    }
    
    

    render() {
        const id = this.state.HistoryId;
        const games = this.state.Games;
        return (
            <div className="w-100 container">
                <div className="card float-left w-60">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Player Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Who Win</th>
                                <th scope="col">Status</th>
                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {games}
                        </tbody>
                    </table>
                </div>
                <div className="card w-25 float-right">
                    <HistoryOfGame
                        gameId={id}
                    />
                </div>
            </div>
        );
    }
}