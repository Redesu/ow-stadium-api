import client from "../config/redis.js";

export const cacheMiddleware = async (req, res, next) => {
    const cacheKey = req.originalUrl;

    try {
        const cached = await client.get(cacheKey);

        if (cached) {
            console.log('Cache hit');
            return res.status(200).json(JSON.parse(cached.toString()));
        }

        const originalJson = res.json.bind(res);

        res.json = (data) => {
            client.set(cacheKey, JSON.stringify(data), { EX: 9600 });
            originalJson(data);
        };

        next();
    } catch (err) {
        next(); // if redis is down, we don't want to fail
    }
}