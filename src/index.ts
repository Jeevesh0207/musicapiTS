import express, { Request, Response, Application, NextFunction } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import Router from './routes/router'

// Define CORS options
const corsOptions = {
  origin: '*', // Change to your actual frontend origin
  credentials: true // Allow credentials (cookies, authorization headers)
};

// Create an instance of Express application
const app: Application = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to enable CORS
app.use(cors(corsOptions));

// Define the port
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

// Define a route for the homepage
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success:true
  });
});

app.use('/',Router)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
