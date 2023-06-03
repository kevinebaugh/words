import React, { useEffect, useState, useRef } from 'react';

const ScalingWord = ({ word }) => {
  const [fontSize, setFontSize] = useState(64);
  const wordRef = useRef();

  useEffect(() => {
    const resizeHandler = () => {
      const wordElement = wordRef.current;
      const viewportWidth = window.innerWidth;

      const newFontSize = Math.floor(viewportWidth / wordElement.offsetWidth) * 15;
      setFontSize(newFontSize);
    };

    window.addEventListener('resize', resizeHandler);
    resizeHandler(); // Initial resize

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div style={{ fontSize: `${fontSize}px`, width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <span ref={wordRef}>{word}</span>
    </div>
  );
};

export default ScalingWord;
