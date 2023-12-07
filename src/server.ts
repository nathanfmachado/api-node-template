import { app } from './app';
import { env } from './env';

app.listen(env.PORT, () => {
  console.log(`HTTP server listening at http://localhost:${env.PORT}`);
  console.log(`Swagger UI is available at http://localhost:${env.PORT}/docs`);
});