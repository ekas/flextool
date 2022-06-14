import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

function getDatabaseConfigFilePath() {
  const envPath = path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'test' ? '../.env.test' : '../.env',
  );

  if (!fs.existsSync(envPath)) {
    throw new Error(`.env file not found: ${envPath}`);
  }

  const connectivityCheck = exec('command -v createdb');

  connectivityCheck.on('exit', function (signal) {
    if (signal === 1) {
      console.error('Unable to connect to database');
      process.exit(1);
    }
  });

  const createdb =
    `PGPASSWORD=${envPath.PG_PASS} createdb ` +
    `-h ${envPath.PG_HOST} ` +
    `-p ${envPath.PG_PORT} ` +
    `-U ${envPath.PG_USER} ` +
    process.env.PG_DB;

  exec(createdb, (err, _stdout, _stderr) => {
    if (!err) {
      console.log(`Created database ${envVars.PG_DB}`);
      return;
    }

    const errorMessage = `database "${envVars.PG_DB}" already exists`;

    if (err.message.includes(errorMessage)) {
      console.log(`Using database: ${envVars.PG_DB}`);
    } else {
      console.error(err);
      process.exit(1);
    }
  });
}

getDatabaseConfigFilePath();
