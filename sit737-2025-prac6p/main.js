const express = require('express');
const winston = require('winston');
const path = require('path');

const app = express();
const serverPort = 4000;

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

const logManager = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

const checkInputs = (value1, value2) => {
    if (isNaN(value1) || isNaN(value2)) {
        throw new Error('value1 and value2 must be numbers');
    }
};

app.get('/:calcOperation', (req, res) => {
    try {
        const { calcOperation } = req.params;
        const value1 = parseFloat(req.query.value1);
        const value2 = parseFloat(req.query.value2);

        checkInputs(value1, value2);

        let output;
        switch (calcOperation) {
            case 'add':
                output = value1 + value2;
                break;
            case 'subtract':
                output = value1 - value2;
                break;
            case 'multiply':
                output = value1 * value2;
                break;
            case 'divide':
                if (value2 === 0) {
                    throw new Error('Division by zero error');
                }
                output = value1 / value2;
                break;
            default:
                throw new Error('Invalid operation');
        }

        logManager.info(`New ${calcOperation} operation: ${value1} ${calcOperation} ${value2}`);
        res.json({ calcOperation, value1, value2, output });
    } catch (error) {
        logManager.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

app.listen(serverPort, () => {
    console.log(`Calculator microservice running at http://localhost:${serverPort}`);
});
