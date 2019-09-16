import React from "react";
import { Grid, Header, Container, Button, } from "semantic-ui-react";
import Square from "./Square";
import O from "../images/O-png.png";
import X from "../images/X-png.png";
import donut from "../images/donut.png";



class Game extends React.Component {
  state = {
    divs: [
      {id: 1, clicked: false},
      {id: 2, clicked: false},
      {id: 3, clicked: false},
      {id: 4, clicked: false},
      {id: 5, clicked: false},
      {id: 6, clicked: false},
      {id: 7, clicked: false},
      {id: 8, clicked: false},
      {id: 9, clicked: false},
    ],
    arrUserChoices: [],
    arrCompChoices: [],

  }

  selectImage = (image) => {
    switch (image) {
      case "X":
        return X;
      case "O":
        return O;
        default:
          return donut;
    };
  };

  squarePressed = (i) => {
    const oppo = !i.clicked
    this.setState({divs: this.state.divs.map( div => {
      if (div.id === i.id) {
        return {id: i.id, clicked: oppo}
      } else {
        return div 
      }
    })})
    this.setState({arrUserChoices: [i.id, ...this.state.arrUserChoices]}, () => this.gameLogic(this.state.arrUserChoices))
  }

  gameLogic = () => {

  }

  compChoice = () => {
    const available = this.state.divs.filter( div => { // array of available divs
    if (div.clicked === false) {
      return div
      }
    })

    const randNumber = Math.floor(Math.random()*available.length) // arr index number

    this.setState({divs: this.state.divs.map( div =>  {
      if (div.id === available[randNumber].id) {
        return {id: div.id, clicked: !div.clicked}
      }
      return div 
    })})

    this.setState({ arrCompChoices: [available[randNumber].id, ...this.state.arrCompChoices]})
  }

  render () {
    return (
       <>
          <Header style={{textAlign: "center", marginTop: "35px" }}>
            <h1>TIC TAC TOE</h1>
          </Header>
          <Container  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Grid columns={3} style={{width: "450px" }}>
              <Grid.Row>
                {this.state.divs.map(div => ( <Square key={div.id} div={div} squarePressed={this.squarePressed} /> ))}
              </Grid.Row>
            </Grid>
         
          </Container>
      </>
     );
   }
};

export default Game;