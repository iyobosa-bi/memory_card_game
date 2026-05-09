import { useState } from "react";

const WinMessage = ({ move, onNewGame }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="win-message-container">
      <div className="win-toast">
        <button className="win-close-btn" onClick={() => setVisible(false)}>✕</button>
        <div className="win-content">
          <h1 className="win-title">🎉 Congratulations! 🎉</h1>
          <p className="win-text">You've won the game!</p>
          <p className="moves-count">Completed in <span>{move}</span> moves</p>
          <button className="new-game-btn" onClick={onNewGame}>🔄 Play Again</button>
        </div>
      </div>
    </div>
  );
};

export default WinMessage;
