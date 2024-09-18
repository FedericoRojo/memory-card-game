
function Restart({
    maxPoints,
    setPlaying,
    restart
}) {

const handleClick = () => {
    restart();
    setPlaying(true);
}

return (
    <div className="restart-board">
        <h1>Max Points: {maxPoints}</h1>
        <button onClick={() => handleClick()}>Restart</button>
    </div>
);
}

export default Restart;
