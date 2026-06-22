import React from 'react';
import '../styles/cardcontrols.css';

function CardControls({
  currentIndex,
  total,
  onPrev,
  onNext,
  onRemember,
  onForget,
}) {
  return (
    <div className="cardControls">
      <div className="cardControls__navRow">
        <button
          className="cardControls__navBtn cardControls__navBtn--prev"
          onClick={onPrev}
          aria-label="上一张"
        >
          ←
        </button>
        <span className="cardControls__counter">
          {currentIndex + 1} / {total}
        </span>
        <button
          className="cardControls__navBtn cardControls__navBtn--next"
          onClick={onNext}
          aria-label="下一张"
        >
          →
        </button>
      </div>
      <div className="cardControls__actionRow">
        <button
          className="cardControls__actionBtn cardControls__actionBtn--forget"
          onClick={onForget}
        >
          没记住
        </button>
        <button
          className="cardControls__actionBtn cardControls__actionBtn--remember"
          onClick={onRemember}
        >
          记住了
        </button>
      </div>
    </div>
  );
}

export default CardControls;
