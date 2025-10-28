import db from "../config/db.js";
import { buildDynamicItemsQuery, buildDynamicPowersQuery, buildPartialUpdateQuery } from "../utils/queryBuilder.js";

export const updater = async (req, res, next) => {
    try {
        const data = req.body;
        let tableName;
        let originalDescription;

        console.log('Identifying if item is power or item by fetching the original description...');
        console.log(data);

        const powerQuery = buildDynamicPowersQuery(data.name);
        const powerResult = await db.query(powerQuery.query, powerQuery.params);

        if (powerResult.rows.length > 0) {
            tableName = 'powers';
            originalDescription = powerResult.rows[0]['description'];
            console.log('Entity found in "powers" table.');
        } else {
            const itemQuery = buildDynamicItemsQuery(data.name);
            const itemResult = await db.query(itemQuery.query, itemQuery.params);

            if (itemResult.rows.length > 0) {
                tableName = 'items';
                originalDescription = itemResult.rows[0]['description'];
                console.log('Entity found in "items" table.');
            } else {
                console.log('No item or power found for the provided data.');
                return res.status(404).json({ message: 'Entity not found.' });
            }
        }

        const updatedDescription = updateDescription(data.description, originalDescription);
        console.log(`Updated description: ${updatedDescription}`);

        const { query, params } = buildPartialUpdateQuery(
            tableName,
            { description: updatedDescription },
            data.name
        );
        console.log('query:', query);
        console.log('params:', params);

        const result = true
        // comenting for testing
        // const result = await db.query(query, params);


        // if (result.rows.length > 0) {
        //     res.status(200).json(result.rows[0]);
        if (result) {
            res.status(200).json();
        } else {
            res.status(404).json({ message: 'Entity not found for update (invalid ID).' });
        }

    } catch (error) {
        next(error);
    }
}

function updateDescription(body, originalDescription) {
    const descriptionUpdate = body;

    const updateMatch = descriptionUpdate.match(/(\d+\.?\d*)(%|s)?/);

    if (!updateMatch) {
        return originalDescription;
    }

    const newValue = updateMatch[1];
    const unit = updateMatch[2] || '';

    const updatedDescription = originalDescription.replace(
        /(\d+\.?\d*)(%|s)?/,
        `${newValue}${unit}`
    );

    return updatedDescription;
}