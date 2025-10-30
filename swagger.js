import 'swagger-jsdoc';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ow-stadium-api',
            version: '0.0.1',
            description: 'Unofficial stadium API',
            contact: {
                name: 'Willyan David',
                email: 'willyan.corporativo@gmail.com',
            }
        },
        servers: [
            {
                url: 'https://ow-stadium-api.redesu.com.br',
                description: 'Production'
            },
            {
                url: 'http://localhost:7000',
                description: 'Development'
            },
        ],
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    apis: ['./src/routes/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);
