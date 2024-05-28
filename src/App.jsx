import React, { useState } from 'react';

// Definir los turnos
const TURNS = {
  X: 'x',
  O: 'o'
}

// Componente Square que representa cada celda del tablero
const Square = ({ children, isSelected, isTurn, updateBoard, index }) => {
  // Crear una cadena de clase basada en las props
  const className = `square ${isSelected ? 'isSelected' : ''} ${isTurn ? 'isTurn' : ''}`;

  // Manejar el clic en el cuadrado, llamando a la función de actualización del tablero
  const handleClick = () => {
    updateBoard(index);
  }

  return (
    // Renderizar un div con el contenido (children) y la clase calculada
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}

// Combinaciones ganadoras
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Componente principal de la aplicación
function App() {
  // Estado para el tablero, inicializado con una matriz de 9 elementos null
  const [board, setBoard] = useState(Array(9).fill(null));
  // Estado para el turno, inicializado con el turno 'X'
  const [turn, setTurn] = useState(TURNS.X);
  // Estado para el ganador
  const [winner, setWinner] = useState(null);

  // Función para revisar si hay un ganador
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] && 
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    // Si no hay ganador
    return null;
  }

  // Función para actualizar el tablero
  const updateBoard = (index) => {
    // Si el cuadrado ya tiene un valor o hay un ganador, no hacer nada
    if (board[index] !== null || winner) return;

    // Crear una copia del tablero y actualizar el cuadrado con el turno actual
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (!newBoard.includes(null)) {
      setWinner(false); // Indica empate
    } else {
      // Cambiar el turno si no hay ganador
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);
    }
  }

  return (
    <main className='board'>
      <h1>0 mata 0</h1>
      <section className='game'>
        {
          // Mapear sobre el tablero y renderizar un Square para cada celda
          board.map((value, index) => (
            <Square
              key={index}
              index={index}
              isSelected={false}
              isTurn={false}
              updateBoard={updateBoard}
            >
              {value}
            </Square>
          ))
        }
      </section>

      <section className="turn">
        {/* Mostrar el turno actual con resaltado */}
        <Square isSelected={turn === TURNS.X} isTurn={turn === TURNS.X} updateBoard={() => {}}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O} isTurn={turn === TURNS.O} updateBoard={() => {}}>
          {TURNS.O}
        </Square>
      </section>
      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                    ? 'Empate'
                    : `Ganó ${winner}`
                }
              </h2>
              {winner && (
                <header className='win'>
                  <Square>{winner}</Square>
                </header>
              )}
              <button onClick={() => { window.location.reload() }}>Reiniciar</button>
            </div>
          </section>
        )
      }
    </main>
  );
}

export default App;
