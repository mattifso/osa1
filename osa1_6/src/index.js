import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <h1>{props.teksti}</h1>
  )
}

const Napit = (props) => {
  return (
    <div>
      <button onClick={props.kasvataHyva}>hyvä</button>
      <button onClick={props.kasvataNeutraali}>neutraali</button>
      <button onClick={props.kasvataHuono}>huono</button>
    </div>
  )
}

const Statistiikka = (props) => {
  return (
    <div>
      <p> hyvä {props.hyva} </p>
      <p> neutraali {props.neutraali} </p>
      <p> huono {props.huono} </p>
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  kasvataHyva = () => { this.setState({ hyva: this.state.hyva + 1 }) }
  kasvataNeutraali = () => { this.setState({ neutraali: this.state.neutraali + 1 }) }
  kasvataHuono = () => { this.setState({ huono: this.state.huono + 1 }) }

  render() {
    return (
      <div>
        <Otsikko teksti='anna palautetta' />

        <Napit kasvataHyva={this.kasvataHyva} kasvataNeutraali={this.kasvataNeutraali} kasvataHuono={this.kasvataHuono} />

        <Otsikko teksti='statistiikka' />

        <Statistiikka hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} />

      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
