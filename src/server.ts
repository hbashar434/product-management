import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function connectToDatabase() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connected to dtabase');
  } catch (error) {
    console.error('Error connecting to database');
    throw error;
  }
}

async function startServer() {
  try {
    await app.listen(config.port);
    console.log(`Server is running on port ${config.port}`);
  } catch (error) {
    console.error('Error starting server');
    throw error;
  }
}

async function main() {
  try {
    if (!config.database_url) {
      throw new Error('Missing database URL');
    }

    await connectToDatabase();
    await startServer();
  } catch (error) {
    console.error('Application error:');
    process.exit(1);
  }
}

main();
