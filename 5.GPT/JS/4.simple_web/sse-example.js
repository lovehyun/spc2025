const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// SSE endpoint
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let counter = 1;

  const sendEvent = () => {
    const eventData = JSON.stringify({ 
      message: `Hello from server!`, 
      count: counter 
    });
    res.write(`data: ${eventData}\n\n`);
    counter++;
  };

  // Send an event every second
  const intervalId = setInterval(sendEvent, 1000);

  // Clear interval on client disconnect
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});