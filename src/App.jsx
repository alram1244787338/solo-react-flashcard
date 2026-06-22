import React, { useState, useCallback } from 'react';
import FlashCard from './components/FlashCard';
import ProgressBar from './components/ProgressBar';
import CardControls from './components/CardControls';
import words from './data/words';
import './styles/app.css';

function App() {
  const totalCount = words.length;
  const [queue, setQueue] = useState([...words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rememberedCount, setRememberedCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentWord = queue[currentIndex];

  const handlePrev = useCallback(() => {
    if (queue.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + queue.length) % queue.length);
  }, [queue.length]);

  const handleNext = useCallback(() => {
    if (queue.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % queue.length);
  }, [queue.length]);

  const handleRemember = useCallback(() => {
    if (queue.length === 0) return;
    const newQueue = queue.filter((_, i) => i !== currentIndex);
    const newRemembered = rememberedCount + 1;

    setQueue(newQueue);
    setRememberedCount(newRemembered);

    if (newQueue.length === 0) {
      setFinished(true);
      return;
    }

    if (currentIndex >= newQueue.length) {
      setCurrentIndex(0);
    }
  }, [queue, currentIndex, rememberedCount]);

  const handleForget = useCallback(() => {
    if (queue.length === 0) return;
    const current = queue[currentIndex];
    const newQueue = queue.filter((_, i) => i !== currentIndex);
    newQueue.push(current);

    setQueue(newQueue);

    if (currentIndex >= newQueue.length) {
      setCurrentIndex(0);
    }
  }, [queue, currentIndex]);

  const handleRestart = useCallback(() => {
    setQueue([...words]);
    setCurrentIndex(0);
    setRememberedCount(0);
    setFinished(false);
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">单词记忆卡</h1>
        <ProgressBar remembered={rememberedCount} total={totalCount} />
      </header>

      <main className="app__main">
        {finished ? (
          <div className="app__finishedCard">
            <div className="app__finishedIcon">🎉</div>
            <h2 className="app__finishedTitle">太棒了！</h2>
            <p className="app__finishedText">
              你已经记住了全部 {totalCount} 个单词
            </p>
            <button className="app__restartBtn" onClick={handleRestart}>
              再来一轮
            </button>
          </div>
        ) : (
          <>
            {currentWord && (
              <FlashCard key={currentWord.en + currentIndex} word={currentWord} />
            )}
            <CardControls
              currentIndex={currentIndex}
              total={queue.length}
              onPrev={handlePrev}
              onNext={handleNext}
              onRemember={handleRemember}
              onForget={handleForget}
            />
            <p className="app__tip">
              剩余 {queue.length} 张卡片待复习 · 点击卡片翻转查看释义
            </p>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
