
function ScoreBoard({
    actualPoints,
    maxPoints
}) {

return (
    <div className="score-board">
        <h1>Actual Points: {actualPoints}</h1>
        <p>Max Points: {maxPoints}</p>
    </div>
);
}

export default ScoreBoard;
