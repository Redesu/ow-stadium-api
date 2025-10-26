import app from './app.js'
import config from './config/config.js'

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
    console.log(`Swagger URL: ${config.env === 'development' ? `http://localhost:${config.port}/api/docs` : `${config.url}/api/docs`}`)
})
