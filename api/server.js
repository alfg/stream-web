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

app.set('port', (process.env.API_PORT || 3001));
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
