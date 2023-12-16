export default function GameBoard({ togglePlayer, board }) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, columnIndex) => (
                            <li key={columnIndex}><button onClick={() => togglePlayer(rowIndex, columnIndex)}
                                disabled={playerSymbol !== null}
                            >{playerSymbol}</button></li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}