import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import { Grid, Button, LinearProgress, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { indigo, pink, red } from '@material-ui/core/colors'
import { Favorite } from '@material-ui/icons'

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
    else return i === 2 ? "primary" : "secondary";
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Frame container direction="column">
          <Progress variant="determinate" value={this.normalise(this.state.time)} color="secondary"/>
          <Question>What is the primary language of the Philippines?</Question>
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
          <Author>Made with <Favorite color="error" fontSize="small"/> by 
            <Link href="https://yuelvic.github.io/" target="_blank" rel="noopener noreferrer"> Emmanuel Victor Garcia</Link>
          </Author>
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

const Question = styled.label`
  margin-top: 70px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 70px;
  text-align: center;
  font-size: 24px;
`

const Author = styled.label`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 20px;
  font-size: 14px;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const Link = styled.a`
  text-decoration: none;
`

const Choices = styled(Grid)`
  height: 250px;
  align-items: center;
`

const MaterialButton = styled(Button)`
  width: 50%;
  height: 50px;
`