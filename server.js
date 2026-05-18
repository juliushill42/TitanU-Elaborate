import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve built frontend static files
app.use(express.static(path.join(__dirname, 'dist')));

const terms = [
  { id: 1,  term: 'Machine Learning',  analogy: 'Showing a toddler 100 pictures of cats and dogs. Eventually, they figure out the difference on their own. The computer learns by looking at lots of examples.' },
  { id: 2,  term: 'Algorithm',         analogy: "It's just a recipe for baking a cake. It is a specific list of step-by-step instructions a computer follows to get a job done." },
  { id: 3,  term: 'Big Data',          analogy: "Trying to count every single grain of sand on a beach. We need special giant computers to find patterns in the sand because our brains can't hold it all." },
  { id: 4,  term: 'Neural Network',    analogy: "A digital version of the human brain. Tiny computer 'brain cells' talk to each other to solve a puzzle, like figuring out if a picture is a hotdog or not." },
  { id: 5,  term: 'Cloud Computing',   analogy: "Instead of buying your own super-powerful computer, you just rent a piece of someone else's giant computer over the internet." },
  { id: 6,  term: 'Server',            analogy: 'A giant, never-sleeping filing cabinet. It holds all the pictures and words for a website and hands them out instantly when asked.' },
  { id: 7,  term: 'API',               analogy: 'A waiter at a restaurant. You tell the waiter your order, they tell the kitchen, and bring your food back. The API connects your app to another app.' },
  { id: 8,  term: 'Cache',             analogy: "Your pocket. Instead of running upstairs to your room every time you need your toy, you keep it in your pocket so it's super fast to grab." },
  { id: 9,  term: 'Bandwidth',         analogy: 'A water pipe. A narrow pipe lets a trickle through, but a huge pipe lets a massive amount of water rush through all at once.' },
  { id: 10, term: 'Blockchain',        analogy: "A magical, shared notebook. If you write 'I gave Tim an apple', it instantly appears in everyone's notebook. Nobody can lie and say it didn't happen." },
  { id: 11, term: 'Encryption',        analogy: "Writing a secret note using a spy code. Even if the teacher intercepts it, they can't read it unless they have the secret decoder ring." },
  { id: 12, term: 'Phishing',          analogy: 'A stranger wearing a mask of your best friend, asking for your house keys. They trick you into giving passwords by pretending to be someone you trust.' },
  { id: 13, term: 'Firewall',          analogy: 'A giant bouncer at the door of a club. It checks the ID of every piece of data trying to get into your computer and kicks out anyone dangerous.' },
  { id: 14, term: 'AI Agent',          analogy: "A robot assistant that doesn't just answer questions, but actually clicks buttons and does chores for you while you sleep." },
  { id: 15, term: 'Agent Swarm',       analogy: 'A team of robot assistants working together. One chops vegetables, one cooks the soup, and the boss makes sure it tastes good.' },
];

app.get('/api/terms', (_req, res) => res.json(terms));
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Elaborate backend running on :${PORT}`));
