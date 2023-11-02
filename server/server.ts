const next = require('next')
const express = require('express')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const db = require('./models')
const userAuth = require('./middleware/userAuth')
const { authenticateSession } = userAuth;
const userRoutes = require('./routes/user')
const spotifyRoutes = require('./routes/spotify')


app.prepare().then(() => {

  // Get port to use
  const PORT = process.env.PORT || 3000;

  // Create server
  const server = express();

  // Configure Server
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(cookieParser());

  // Configure DB
  db.sequelize.sync({ force: false })

  // Session authentication
  server.use(authenticateSession);

  // User API
  server.use('/api/users', userRoutes);

  // Spotify API
  server.use('/api/spotify', spotifyRoutes);

  // Default Next.js request handling
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  // Start server
  server.listen(PORT, (err: Error) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${PORT}`);
  });
});