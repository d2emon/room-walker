import Debug from 'debug';
import app from './app';
import config from './config';

const debug = Debug('auth:server');

const { port } = config;
app.set('port', port);

app.listen(port, () => {
  const addr = app.get('port');

  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${addr}`);
  /* eslint-enable no-console */
  debug(`Listening: http://localhost:${addr}`);
});
