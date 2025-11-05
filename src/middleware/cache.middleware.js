import client from "../config/redis.js";

export const cacheMiddleware = async (req, res, next) => {
    const cacheKey = req.originalUrl;

    try {
        const cached = await client.get(cacheKey);

        if (cached) {
            const { statusCode, body } = JSON.parse(cached.toString());
            return res.status(statusCode).json(body);
        }

        const originalJson = res.json.bind(res);

        res.json = (data) => {
            client.set(cacheKey, JSON.stringify(data), { EX: 9600 });
            originalJson(data);
        };

        next();
    } catch (err) {
        console.error(err);
        next(); // if redis is down, we don't want to fail
    }
}