import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div align="center" className="align-self-center mt-lg-5">
        <h1>It's TIC-TAC-TOE!</h1>
        <button type="button" className="btn btn-info btn-lg" onClick={(e) => {e.preventDefault();window.location.href = '/play';}}>Play</button>
      </div>
    );
  }
}
