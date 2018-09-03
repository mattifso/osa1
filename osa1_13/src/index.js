import React from 'react'
import ReactDOM from 'react-dom'

const RandomizeButton = ({ randomize, anecdotes, vote }) => {
  return (
    <div>
      <button onClick={vote}>Vote</button>
      <button onClick={randomize}>next anecdote</button>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    var votes = [];
    for (var i = 0; i < anecdotes.length; i++)  {
      votes.push(0)
    }
    this.state = {
      selected: 0,
      votes: votes
    }
  }

  randomize = () => {
    var rand = Math.floor(Math.random() * this.props.anecdotes.length);
    this.setState({ selected: rand })
  }

  vote = () => {
    this.setState((prevState) => {
      const voteCopy = [...prevState.votes]
      voteCopy[prevState.selected]++
      return ({ votes: voteCopy })
    })
   }

  render() {
    return (
      <div>
        <RandomizeButton vote={this.vote} randomize={this.randomize} anecdotes={this.props.anecdotes} />
        has {this.state.votes[this.state.selected]} votes
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
