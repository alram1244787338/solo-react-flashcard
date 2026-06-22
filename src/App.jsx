import React, { useState, useCallback, useRef, useEffect } from 'react';
import FlashCard from './components/FlashCard';
import ProgressBar from './components/ProgressBar';
import CardControls from './components/CardControls';
import createKeyHandler from './utils/keyboard';
import words from './data/words';
import './styles/app.css';

function App() {
  const totalCount = words.length;
  const [queue, setQueue] = useState([...words]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rememberedCount, setRememberedCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  const flashCardRef = useRef(null);
  const currentWord = queue[currentIndex];

  const refreshCardKey = useCallback(() => {
    setCardKey((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    if (queue.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + queue.length) % queue.length);
    refreshCardKey();
  }, [queue.length, refreshCardKey]);

  const handleNext = useCallback(() => {
    if (queue.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % queue.length);
    refreshCardKey();
  }, [queue.length, refreshCardKey]);

  const handleRemember = useCallback(() => {
    const indexToRemove = currentIndex;

    setQueue((prevQueue) => {
      if (prevQueue.length === 0) return prevQueue;
      const newQueue = prevQueue.filter((_, i) => i !== indexToRemove);

      if (newQueue.length === 0) {
        setFinished(true);
      } else if (indexToRemove >= newQueue.length) {
        setCurrentIndex(0);
      }

      return newQueue;
    });

    setRememberedCount((prev) => prev + 1);
    refreshCardKey();
  }, [currentIndex, refreshCardKey]);

  const handleForget = useCallback(() => {
    const indexToMove = currentIndex;

    setQueue((prevQueue) => {
      if (prevQueue.length === 0) return prevQueue;

      const current = prevQueue[indexToMove];
      const newQueue = prevQueue.filter((_, i) => i !== indexToMove);
      newQueue.push(current);

      if (indexToMove >= newQueue.length) {
        setCurrentIndex(0);
      }

      return newQueue;
    });

    refreshCardKey();
  }, [currentIndex, refreshCardKey]);

  const handleRestart = useCallback(() => {
    setQueue([...words]);
    setCurrentIndex(0);
    setRememberedCount(0);
    setFinished(false);
    setCardKey(0);
  }, []);

  const handleFlip = useCallback(() => {
    if (flashCardRef.current) {
      flashCardRef.current.click();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (finished) return;
      createKeyHandler({
        onFlip: handleFlip,
        onPrev: handlePrev,
        onNext: handleNext,
        onRemember: handleRemember,
        onForget: handleForget,
      })(e);
    },
    [finished, handleFlip, handlePrev, handleNext, handleRemember, handleForget]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">单词记忆卡</h1>
        <ProgressBar remembered={rememberedCount} total={totalCount} />
      </header>

      <main className="app__main" tabIndex={0}>
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
              <div ref={flashCardRef}>
                <FlashCard key={`${currentWord.en}-${cardKey}`} word={currentWord} />
              </div>
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
            <p className="app__shortcutHint">
              快捷键：Enter 翻转 · ←→ 翻页 · R 记住了 · F 没记住
            </p>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
