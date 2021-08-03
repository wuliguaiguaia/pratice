
/* 无状态 使用函数式组件 */
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xIsNext: true,
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0
    }
  }
  jumpTo(i) {
    this.setState({
      stepNumber: i,
      xIsNext: i%2 === 0 ? 'x' : 'o'
    })
  }
  render() {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((item, i) => {
      const desc = i ? 'Go to move #' + i : 'Go to game start';
      return <li key={i}>
        <button onClick={()=>jumpTo(i)}>{desc}</button>
      </li>
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares}
            onClick={(i)=>this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1]
    let squares = current.squares.slice() // 不可变性
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'x' : 'o'
    this.setState({
      xIsNext: !this.state.xIsNext,
      history: history.concat([{ squares }]),
      stepNumber: this.stepNumber
    })
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
