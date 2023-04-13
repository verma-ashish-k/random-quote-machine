import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [quoteVisible, setQuoteVisible] = useState(true);

  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuote = useCallback(async () => {
    setQuoteVisible(false);
    setTimeout(async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
        getRandomColor();
        setQuoteVisible(true);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    }, 500);
  }, []);

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(tweetUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const quoteText = `${quote} - ${author}`;
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://www.example.com&quote=${encodeURIComponent(
      quoteText
    )}`;
    window.open(fbShareUrl, '_blank');
  };

  const [bgColor, setBgColor] = useState('#f9f9f9');

  const getRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setBgColor(randomColor);
  };

  return (
    <div className='App' style={{ backgroundColor: bgColor }}>
      <div id='quote-box'>
        <div
          className={quoteVisible ? 'fade-in' : ''}
          id='text'
          style={{ color: bgColor }}
        >
          {quote}
        </div>
        <div className={quoteVisible ? 'fade-in' : ''} id='author'>
          {'-'}
          {author}
        </div>
        <button
          id='new-quote'
          onClick={fetchQuote}
          style={{ backgroundColor: bgColor }}
        >
          New Quote
        </button>
        <button
          id='tweet-quote'
          onClick={tweetQuote}
          style={{
            textDecoration: 'none',
            color: '#1da1f2',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon icon={faTwitter} /> Tweet Quote
        </button>
        <button
          id='share-facebook'
          onClick={shareOnFacebook}
          style={{
            textDecoration: 'none',
            color: '#1877F2',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <FontAwesomeIcon icon={faFacebook} /> Share on Facebook
        </button>
      </div>
    </div>
  );
}

export default App;
