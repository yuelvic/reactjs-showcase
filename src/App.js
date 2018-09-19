import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { Grid, Button, LinearProgress, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { indigo, pink, red, green } from '@material-ui/core/colors'

const MIN = 0;
const MAX = 100;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 100,
      choices: Array(4).fill(false)
    }
  }

  componentDidMount = () => {
    this.interval = setInterval(
      () => this.tick(), 100
    );
  }

  componentWillMount = () => {
    clearInterval(this.interval);
  }

  tick = () => {
    const time = this.state.time - 1;
    if (time < 0) {
      clearInterval(this.interval);
      return;
    }
    this.setState({
      time: time
    });
  }

  normalise = value => (value - MIN) * 100 / (MAX - MIN);

  handleChoice = i => {
    if (this.state.time > 0) {
      const choices = Array(4).fill(false);
      choices[i] = true;
      this.setState({
        choices: choices
      });
    }
  }

  handleVariant = i => {
    if (this.state.time <= 0) return "raised";
    else return this.state.choices[i] ? "raised" : "outlined";
  }

  handleColor = i => {
    if (this.state.time > 0) return "primary";
    else return i == 2 ? "primary" : "secondary";
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Frame container direction="column">
          <Progress variant="determinate" value={this.normalise(this.state.time)} color="secondary"/>
          <Label>What is the primary language of the Philippines?</Label>
          <Choices container direction="column" justify="space-between">
            <MaterialButton 
              onClick={() => this.handleChoice(0)} 
              variant={this.handleVariant(0)} 
              color={this.handleColor(0)}>
              English
            </MaterialButton>
            <MaterialButton 
              onClick={() => this.handleChoice(1)} 
              variant={this.handleVariant(1)} 
              color={this.handleColor(1)}>
              Cebuano
            </MaterialButton>
            <MaterialButton 
              onClick={() => this.handleChoice(2)} 
              variant={this.handleVariant(2)}
              color={this.handleColor(2)}>
              Filipino
            </MaterialButton>
            <MaterialButton 
              onClick={() => this.handleChoice(3)} 
              variant={this.handleVariant(3)} 
              color={this.handleColor(3)}>
              Ilocano
            </MaterialButton>
          </Choices>
        </Frame>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
  },
});

const Frame = styled(Grid)`
  width: 100%;
  height: 100%;
  align-items: center;
`

const Progress = styled(LinearProgress)`
  width: 100%;
`

const Label = styled.label`
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 50px;
  text-align: center;
  font-size: 24px;
`

const Choices = styled(Grid)`
  height: 250px;
  align-items: center;
`

const MaterialButton = styled(Button)`
  width: 50%;
  height: 50px;
`