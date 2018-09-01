import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ kasvata, teksti }) => {
  return (
    <button onClick={kasvata}>{teksti}</button>
  )
}

const Buttons = ({ kasvataHyva, kasvataNeutraali, kasvataHuono }) => {
  return (
    <div>
      <Button kasvata={kasvataHyva} teksti='hyvä' />
      <Button kasvata={kasvataNeutraali} teksti='neutraali' />
      <Button kasvata={kasvataHuono} teksti='huono' />
    </div>
  )
}

const Statistic = ({ text, number }) => {
  return (<p>{text} {number} </p>)
}

const Statistics = (props) => {
  for (var key in props) {
    if (props.hasOwnProperty(key)) { // varmistetaan ettei propsilla ole prototyypistä näkyviä kenttiä
      if (props[key] > 0) {
        return (
          <div>
            <Statistic text='hyvä' number={props.hyva} />
            <Statistic text='neutraali' number={props.neutraali} />
            <Statistic text='huono' number={props.huono} />
            <Statistic text='keskiarvo' number={props.keskiarvo} />
            <Statistic text='positiivisia' number={props.positiivisia} />
          </div>
        )
      }
    }
  }

  return <p> ei yhtään palautetta annettu </p>
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

  kasvata = (statistiikka) => {
    return (() => {
      this.setState((prevState) => ({[statistiikka]: prevState[statistiikka] +1 }))
      this.laskeStatistiikka()
    })
  }

  render() {
    return (
      <div>
        <Header text='anna palautetta' />

        <Buttons kasvataHyva={this.kasvata('hyva')} kasvataNeutraali={this.kasvata('neutraali')} kasvataHuono={this.kasvata('huono')} />

        <Header text='statistiikka' />

        <Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono} keskiarvo={this.state.keskiarvo} positiivisia={this.state.positiivisia} />

      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
