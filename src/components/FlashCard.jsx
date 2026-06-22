import React, { useState } from 'react';
import '../styles/flashcard.css';

function FlashCard({ word }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashCard-wrapper" onClick={handleClick}>
      <div className={`flashCard ${isFlipped ? 'flashCard--flipped' : ''}`}>
        <div className="flashCard__face flashCard__face--front">
          <span className="flashCard__word">{word.en}</span>
          <span className="flashCard__hint">点击翻转</span>
        </div>
        <div className="flashCard__face flashCard__face--back">
          <span className="flashCard__meaning">{word.zh}</span>
          <span className="flashCard__hint">点击翻转</span>
        </div>
      </div>
    </div>
  );
}

export default FlashCard;
