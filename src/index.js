import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row"> {this.renderSquare( 0)} {this.renderSquare( 1)} {this.renderSquare( 2)} {this.renderSquare( 3)} {this.renderSquare( 4)} {this.renderSquare( 5)} {this.renderSquare( 6)} </div>
        <div className="board-row"> {this.renderSquare( 7)} {this.renderSquare( 8)} {this.renderSquare( 9)} {this.renderSquare(10)} {this.renderSquare(11)} {this.renderSquare(12)} {this.renderSquare(13)} </div>
        <div className="board-row"> {this.renderSquare(14)} {this.renderSquare(15)} {this.renderSquare(16)} {this.renderSquare(17)} {this.renderSquare(18)} {this.renderSquare(19)} {this.renderSquare(20)} </div>
        <div className="board-row"> {this.renderSquare(21)} {this.renderSquare(22)} {this.renderSquare(23)} {this.renderSquare(24)} {this.renderSquare(25)} {this.renderSquare(26)} {this.renderSquare(27)} </div>
        <div className="board-row"> {this.renderSquare(28)} {this.renderSquare(29)} {this.renderSquare(30)} {this.renderSquare(31)} {this.renderSquare(32)} {this.renderSquare(33)} {this.renderSquare(34)} </div>
        <div className="board-row"> {this.renderSquare(35)} {this.renderSquare(36)} {this.renderSquare(37)} {this.renderSquare(38)} {this.renderSquare(39)} {this.renderSquare(40)} {this.renderSquare(41)} </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(42).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      gameWon: false
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let nextState = this.state.xIsNext ? "X" : "O";
    let winState = calculateWinner(squares,i,nextState);
    if (this.state.gameWon) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
      }]),
    stepNumber: history.length,
    xIsNext: !this.state.xIsNext,
    gameWon: winState
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      gameWon: false // let player rewind and restart 
    });
  }


  handleDrop(i){
    let nCol=7;
    let nRow=6;
    let inCol=i%nCol;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    for (let outRow = nRow-1; outRow >= 0; outRow--){
      let j=outRow*nCol+inCol;
      if (!squares[j]){
        this.handleClick(j);
        return
      }
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let recentMove=42; //42 is off the board. should I use null?
    let recentMark='N';
    if (this.state.stepNumber>5){
      const previous =history[this.state.stepNumber-1];
      for(let i=0; i<42; i++){
        if(current.squares[i]!==previous.squares[i]){
          recentMove=i;
          recentMark=current.squares[i];
        }
      }
    }
    const winner = calculateWinner(current.squares,recentMove,recentMark);
  
    const moves = history.map((step,move) => {
      const desc = move ?
        'Go to move #' + move:
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
  
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleDrop(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares,i,nextState) {
  let nextSquares=squares.slice()
  nextSquares[i]=nextState
  const nRow=6
  const nCol=7
  let col=i%nCol
  let row=Math.round((i-col)/nCol)
  const dirKey=[[1,0],
                [1,1],
                [0,1],
                [-1,1]];
  for(let jj=0; jj<4; jj=jj+1){
    for(let kk=0; kk<4; kk=kk+1){
      let row1=row+dirKey[jj][0]*(0-kk)
      let col1=col+dirKey[jj][1]*(0-kk)
      let row2=row+dirKey[jj][0]*(1-kk)
      let col2=col+dirKey[jj][1]*(1-kk)
      let row3=row+dirKey[jj][0]*(2-kk)
      let col3=col+dirKey[jj][1]*(2-kk)
      let row4=row+dirKey[jj][0]*(3-kk)
      let col4=col+dirKey[jj][1]*(3-kk)
      let inbounds=(Math.min(row1,col1,row4,col4)>=0)&&(Math.max(row1,row4)< nRow)&&(Math.max(col1,col4)<nCol)
      if (inbounds){
        let ind1=col1+row1*nCol
        let ind2=col2+row2*nCol
        let ind3=col3+row3*nCol
        let ind4=col4+row4*nCol
        let sq=nextSquares[i]
        let sq1=nextSquares[ind1]
        let sq2=nextSquares[ind2]
        let sq3=nextSquares[ind3]
        let sq4=nextSquares[ind4]
        if ( (sq1===sq2) &&
             (sq1===sq3) &&
             (sq1===sq4)) {
            return sq
        }
      }
    }
  }
  return false
}

