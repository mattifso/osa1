import React from 'react'
import ReactDOM from 'react-dom'

// Useampikin komponentti refaktoroitu käyttämään destrukturointia ja hieman nimetty uudestaan uusien englanninkielisten komponenttien sekaan.
const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({kasvata, teksti}) => {
  return (
    <button onClick={kasvata}>{teksti}</button>
  )
}

const Buttons = ({kasvataHyva, kasvataNeutraali, kasvataHuono}) => {
  return (
    <div>
      <Button kasvata = {kasvataHyva} teksti='hyvä'/>
      <Button kasvata = {kasvataNeutraali} teksti='neutraali'/>
      <Button kasvata = {kasvataHuono} teksti='huono'/>
    </div>
  )
}

const Statistic = ({text, number}) => {
  return (<p>{text} {number} </p>)
}

const Statistics = (props) => {
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

  // Vaikka setState() tulee kussakin tapauksessa kutsutuksi kahdesti peräkkäin, React batchaa funktionaaliset kutsut järjestyksessä ja renderiä kutsutaan lopulta vain kerran.
  kasvataHyva = () => { this.setState((prevState) => ({ hyva: prevState.hyva + 1 })); this.laskeStatistiikka() }
  kasvataNeutraali = () => { this.setState((prevState) => ({ neutraali: prevState.neutraali + 1 })); this.laskeStatistiikka() }
  kasvataHuono = () => { this.setState((prevState) => ({ huono: prevState.huono + 1 })); this.laskeStatistiikka() }

  render() {
    return (
      <div>
        <Header text='anna palautetta' />

        <Buttons kasvataHyva={this.kasvataHyva} kasvataNeutraali={this.kasvataNeutraali} kasvataHuono={this.kasvataHuono} />

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
