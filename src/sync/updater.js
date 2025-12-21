import db from "../config/db.js";
import {
  buildDynamicItemsQuery,
  buildDynamicPowersQuery,
  buildPartialUpdateQuery,
} from "../utils/queryBuilder.js";

export const updater = async (req, res, next) => {
  try {
    const data = req.body;
    const name = { name: data.name };
    let tableName;
    let originalDescription;

    const { query: powerQuery, params: powerParams } =
      buildDynamicPowersQuery(name);
    const powerResult = await db.query(powerQuery, powerParams);

    if (powerResult.rows.length > 0) {
      tableName = "powers";
      originalDescription = powerResult.rows[0]["description"];
    } else {
      const { query: itemQuery, params: itemParams } =
        buildDynamicItemsQuery(name);
      const itemResult = await db.query(itemQuery, itemParams);

      if (itemResult.rows.length > 0) {
        tableName = "items";
        originalDescription = itemResult.rows[0]["description"];
      } else {
        return res.status(404).json({ message: "Entity not found." });
      }
    }

    const updatedDescription = updateDescription(
      data.description,
      originalDescription,
    );

    const { query, params } = buildPartialUpdateQuery(
      tableName,
      { description: updatedDescription, name: data.name },
      "name",
    );

    const result = await db.query(query, params);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res
        .status(404)
        .json({ message: "Entity not found for update (invalid ID)." });
    }
  } catch (error) {
    next(error);
  }
};

function updateDescription(body, originalDescription) {
  const descriptionUpdate = body;

  const updateMatch = descriptionUpdate.match(/(\d+\.?\d*)(%|s)?/);

  if (!updateMatch) {
    return originalDescription;
  }

  const newValue = updateMatch[1];
  const unit = updateMatch[2] || "";

  let patternToReplace;
  if (unit) {
    patternToReplace = new RegExp(`\\b(\\d+\\.?\\d*)${unit}(?=\\s|$)`);
  } else {
    patternToReplace = new RegExp(`\\b(\\d+\\.?\\d*)(?=\\s)`);
  }

  if (patternToReplace.test(originalDescription)) {
    return originalDescription.replace(patternToReplace, `${newValue}${unit}`);
  }

  return originalDescription;
}
