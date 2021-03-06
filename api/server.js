import path from 'path';
import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('./middleware/auth'));

app.use('/api', routes);

// Serve build static assets if in production or docker.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}


app.set('port', (process.env.API_PORT || 3001));
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
