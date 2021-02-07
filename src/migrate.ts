import db from './database';

const [type, ...args] = process.argv.slice(2);

async function migrate() {
  switch (type) {
    case 'make':
      return db.migrate.make(args[0], { extension: 'ts' });
    default:
      return db.migrate.latest();
  }
}

migrate()
  .then(() => console.log('Migrations were executed successfully'))
  .catch(console.error)
  .finally(() => process.exit(0));
