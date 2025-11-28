import express, { Application } from 'express';

const App = express();

App.use(express.json());

export default App;