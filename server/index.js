import express from 'express';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;

  const pythonProcess = spawn('python3', ['./chat.py']);
  let pythonOutput = '';

  pythonProcess.stdin.write(JSON.stringify({ message: userMessage }) + '\n');
  pythonProcess.stdin.end();

  pythonProcess.stdout.on('data', (data) => {
    pythonOutput += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
  });

  pythonProcess.on('close', () => {
    try {
      const response = JSON.parse(pythonOutput);
      res.json({ reply: response.content });
    } catch (error) {
      console.error('Error parsing Python output:', error);
      res.status(500).json({ reply: 'Something went wrong' });
    }
  });
});

// Optional test route
app.get('/', (req, res) => {
  res.send('Server is up');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
