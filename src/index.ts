import config from 'common/config';
import app from 'main/app';

const PORT = config.ports.server;

console.log('Env:', config.environment);
app.listen(PORT, () =>
  console.log(`🚀 Server up and running on port ${PORT}`),
);
