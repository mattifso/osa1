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

const PopularAnecdote = ({ anecdotes }) => (
  anecdotes.reduce((maxVoted, current) => {
    if (current.votes > maxVoted.votes) {
      return current
    }
    return maxVoted
  }, { val: '', votes: 0 }).val
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      anecdotes: props.anecdotes
    }
  }

  randomize = () => {
    let rand = Math.floor(Math.random() * this.props.anecdotes.length);
    this.setState({ selected: rand })
  }

  vote = () => {
    this.setState((prevState) => {
      const anecdotesCopy = { ...prevState.anecdotes }
      anecdotesCopy[prevState.selected].votes++
      return ({ anecdotes: anecdotesCopy })
    })
  }

  render() {
    return (
      <div>
        <RandomizeButton vote={this.vote} randomize={this.randomize} anecdotes={this.props.anecdotes} />
        has {this.state.anecdotes[this.state.selected].votes} votes
        <p>
          {this.props.anecdotes[this.state.selected].val}
        </p>
        <h3>anecdote with most votes:</h3>
        <p>
          <PopularAnecdote anecdotes={this.props.anecdotes} />
        </p>
      </div>
    )
  }
}

const anecdotes = [
  { val: 'If it hurts, do it more often', votes: 0 },
  { val: 'Adding manpower to a late software project makes it later!', votes: 0 },
  { val: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
  { val: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
  { val: 'Premature optimization is the root of all evil.', votes: 0 },
  { val: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)