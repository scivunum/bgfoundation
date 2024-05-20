const fs = require('fs');
const path = require('path');

// Define the path to the .env file
const envFilePath = path.join(__dirname, '../.env');

// Define the environment variables you want to add as an object
const newEnvVariables = {
    FRONTEND_URLS: '["http://localhost:3000","https://scivunum.github.io/bgfoundation/"]',
    //MONGO_DB_URI: "'mongodb+srv://raxicompanylimited:YTJvNf2sGbXpNwBP@cluster0.o4wk6is.mongodb.net/'",
    MONGO_DB_URI :"'mongodb://localhost:27017/bgfoundation?retryWrites=true&w=majority'",
    PORT: '5000',
};

// Function to parse .env content into an object
const parseEnvContent = (content) => {
    const env = {};
    content.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key) {
            env[key.trim()] = value ? value.trim() : '';
        }
    });
    return env;
};

// Function to create or update the .env file
exports.createEnvFile = async () => {
    const chalk = await import('chalk');
    let existingEnv = {};

    // Check if the .env file exists
    if (fs.existsSync(envFilePath)) {
        // Read the existing .env file
        const existingEnvContent = fs.readFileSync(envFilePath, 'utf-8');
        existingEnv = parseEnvContent(existingEnvContent);
        console.log(chalk.default.yellow('.env file already exists. Updating variables.'));
    } else {
        console.log(chalk.default.green('.env file created successfully.'));
    }

    // Merge new environment variables with existing ones
    const updatedEnv = { ...existingEnv, ...newEnvVariables };

    // Convert the merged object back to the .env file format
    const updatedEnvContent = Object.entries(updatedEnv)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    // Write the updated content back to the .env file
    fs.writeFileSync(envFilePath, updatedEnvContent);
    console.log(chalk.default.green('Environment variables updated successfully.'));
};