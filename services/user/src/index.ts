import express from 'express';
import config from './config';
import indexRouter from './routes';
import cors from 'cors';

const app = express();

const port = config.port;

app.use(cors());
app.use(express.json());
app.use('/', indexRouter);

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
});
