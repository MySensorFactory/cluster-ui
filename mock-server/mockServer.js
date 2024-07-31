const { createServer } = require('@stoplight/prism-http-server');
const { getHttpOperationsFromSpec } = require('@stoplight/prism-cli/dist/operations');
const { readFileSync } = require('fs');
const { parse } = require('yaml');

const specFile = readFileSync('./reports-api.yaml', 'utf8');
const spec = parse(specFile);

async function main() {
    const operations = await getHttpOperationsFromSpec(spec);

    const server = createServer({
        operations,
        config: {
            checkSecurity: false,
            validateRequest: true,
            validateResponse: true,
            mock: {
                dynamic: true,
                callback: (input) => {
                    const { method, url } = input.request;

                    // Custom logic for different endpoints
                    if (method === 'POST' && url.path === '/reports') {
                        return {
                            status: 200,
                            body: {
                                id: generateUUID()
                            }
                        };
                    }

                    if (method === 'POST' && url.path === '/reports/search') {
                        return {
                            status: 200,
                            body: {
                                results: generateSearchResults()
                            }
                        };
                    }

                    if (method === 'GET' && url.path.startsWith('/reports/')) {
                        const [, , sensorType, label] = url.path.split('/');
                        return {
                            status: 200,
                            body: {
                                results: generateSensorData(sensorType, label)
                            }
                        };
                    }

                    // Default behavior for other endpoints
                    return undefined;
                },
            },
        },
    });

    server.listen(4010);
    console.log('Mock server is running on http://localhost:4010');
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateSearchResults() {
    // Generate mock search results here
    return [
        {
            timeRange: {
                from: Date.now() - 86400000,
                to: Date.now()
            },
            id: generateUUID(),
            label: 'MockLabel'
        }
    ];
}

function generateSensorData(sensorType, label) {
    // Generate mock sensor data here
    return [
        {
            timestamp: Date.now(),
            label: label,
            eventKey: generateUUID(),
            sensorType: sensorType,
            values: {
                value: Math.random() * 100
            }
        }
    ];
}

main().catch(console.error);