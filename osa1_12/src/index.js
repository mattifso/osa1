import React from 'react'
import ReactDOM from 'react-dom'

const RandomizeButton = ({ randomize, anecdotes }) => {
  return (
    <button onClick={randomize}>Click here for a random anecdote</button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
  }

  randomize = () => {
    var rand = Math.floor(Math.random() * this.props.anecdotes.length);
    this.setState({ selected: rand })
  }

  render() {
    return (
      <div>
        <p>
          <RandomizeButton randomize={this.randomize} anecdotes={this.props.anecdotes} />
        </p>
        <p>
          {this.props.anecdotes[this.state.selected]}
        </p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)