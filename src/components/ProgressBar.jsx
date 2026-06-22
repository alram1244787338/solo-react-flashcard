import React from 'react';
import '../styles/progressbar.css';

function ProgressBar({ remembered, total }) {
  const percent = total > 0 ? Math.round((remembered / total) * 100) : 0;

  return (
    <div className="progressBar">
      <div className="progressBar__info">
        <span className="progressBar__text">
          已记住 <span className="progressBar__num">{remembered}</span> / 总共 {total}
        </span>
        <span className="progressBar__percent">{percent}%</span>
      </div>
      <div className="progressBar__track">
        <div
          className="progressBar__fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
