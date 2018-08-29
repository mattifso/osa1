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
      <p> keskiarvo {props.keskiarvo} </p>
      <p> positiivisia {props.positiivisia} </p>
    </div>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0,
      keskiarvo: 0,
      positiivisia: 0
    }
  }

  laskeStatistiikka = () => {
    this.setState((prevState) => ({
      keskiarvo: (prevState.hyva - prevState.huono) / (prevState.hyva + prevState.neutraali + prevState.huono),
      positiivisia: 100 * (prevState.hyva / (prevState.hyva + prevState.neutraali + prevState.huono))
    }))
  }

  kasvataHyva = () => { this.setState({ hyva: this.state.hyva + 1 }); this.laskeStatistiikka() }
  kasvataNeutraali = () => { this.setState({ neutraali: this.state.neutraali + 1 }); this.laskeStatistiikka() }
  kasvataHuono = () => { this.setState({ huono: this.state.huono + 1 }); this.laskeStatistiikka() }

  render() {
    return (
      <div>
        <Otsikko teksti='anna palautetta' />

        <Napit kasvataHyva={this.kasvataHyva} kasvataNeutraali={this.kasvataNeutraali} kasvataHuono={this.kasvataHuono} />

        <Otsikko teksti='statistiikka' />

        <Statistiikka hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} keskiarvo={this.state.keskiarvo} positiivisia={this.state.positiivisia} />

      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
