import './App.css';
import React, { Component } from 'react';
import Box from './Box.js';


export default class App extends Component{

  #displayCurrentPlayer(){
    return (
      <div className='output'> {`The current player is ${this.state.currentPlayer}`} </div>
    );
  }

  #displayWinner(){
    if (this.state.hasWinner){
      return (
        <div className='output'> {`The winner is ${this.state.winner}!!`} </div>
      )
    }
  }

  #renderBoxes(){
    let boxes = [];
    for (let i = 0; i < 9; i++){
      let box = (
        <Box key={i.toString()}
             id={i}
             clickHandler={this.#clickHandler}
             content={this.state.board[i]}
             winningIndices={this.state.winningIndices}>
        </Box>
      );
      boxes.push(box);
    }
    return boxes;
  };

  #copyBoard(){
    let newBoard = [];
    for (let i = 0; i < 9; i++){
      newBoard[i] = this.state.board[i];
    }
    return newBoard;
  }

  #checkWinner(newBoard){
    let directions = ['012', '345', '678', '036', '147', '258', '048', '642'];
    for (let direction of directions){
      let threeInRow = true;
      for (let char of direction){
        let i = Number(char);
        let boxContent = newBoard[i];
        if (boxContent !== this.state.currentPlayer){
          threeInRow = false;
        }
      }
      if (threeInRow){
        return {hasWinner:true, winner:this.state.currentPlayer, winningIndices:direction};
      }
    }
    return {hasWinner:false, winner:null, winningIndices:''};
  }

  #clickHandler = (boxId) => {
    if (!this.state.hasWinner){
      let currentBoxState = this.state.board[boxId];
      if (!currentBoxState){
        let newBoard = this.#copyBoard();
        newBoard[boxId] = this.state.currentPlayer;
        let newPlayer = (this.state.currentPlayer === 'X') ? 'O' : 'X';
        let { hasWinner, winner, winningIndices } = this.#checkWinner(newBoard);
        this.setState({
          board: newBoard,
          currentPlayer: newPlayer,
          hasWinner: hasWinner,
          winner: winner,
          winningIndices: winningIndices,
        });
      }
    }
  }

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      board: ['', '', '', '', '', '','','', ''],
      currentPlayer: 'X',
      hasWinner: false,
      winner: null,
      winningIndices: ''
    }
  }

  render(){
    return (
      <div className='app'>
        <div className='title'> Tic-Tac-Toe </div>
        <div className='container'>
          { this.#renderBoxes() }
        </div>
        { this.#displayCurrentPlayer() }
        { this.#displayWinner() }
      </div>
    );
  }

}
