function createKeyHandler(callbacks) {
  const { onFlip, onPrev, onNext, onRemember, onForget } = callbacks;

  return function handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        onFlip && onFlip();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        onPrev && onPrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        onNext && onNext();
        break;
      case 'r':
      case 'R':
        e.preventDefault();
        onRemember && onRemember();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        onForget && onForget();
        break;
      default:
        break;
    }
  };
}

export default createKeyHandler;
