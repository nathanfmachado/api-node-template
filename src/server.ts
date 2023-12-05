import { app } from './app';
import { env } from './env';

app.listen(env.PORT, () => `HTTP server listening at http://localhost:${env.PORT}`);