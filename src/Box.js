import './Box.css';
import React, { Component } from 'react';


export default class Box extends Component{

  #onClick = () => {
    this.props.clickHandler(this.props.id);
  }

  #getClassList(){
    for (let i of this.props.winningIndices){
      let num = Number(i);
      if (num === this.props.id){
        return 'box highlighted';
      }
    }
    return 'box';
  }

  constructor(props){
    super(props);
    this.props = props;
  }

  render(){
    return (
      <div className={this.#getClassList()}
           onClick={this.#onClick}>
        {this.props.content}
      </div>
    );
  }

}
