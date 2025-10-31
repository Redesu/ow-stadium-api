import { createClient } from "redis";

const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
})

let errorLogged = false;

client.on('error', err => {
    if (!errorLogged) {
        console.error('Redis Client Error', err);
        errorLogged = true;
    }
});
client.on('connect', () => console.log('Redis Client Connected'));

client.connect();

export default client