import db from "../../config/db.js";
import Item from "../../models/item.js";
import { buildInsertQuery } from "../../utils/queryBuilder.js";

export const addItem = async (req, res, next) => {
  try {
    db.query("BEGIN");
    const { stats, ...itemData } = req.body;
    const item = new Item(itemData);

    if (!item.validate()) {
      return res.status(400).json({
        message:
          "Missing required fields: name, type, description, price, image_url, hero_id, rarity are required",
      });
    }

    const { query, params } = buildInsertQuery("items", item);
    const itemResult = await db.query(query, params);
    const insertedItem = itemResult.rows[0];

    if (stats && Array.isArray(stats) && stats.length > 0) {
      for (const stat of stats) {
        const statData = {
          item_id: insertedItem.id,
          stat_type: stat.stat_type,
          stat_value: stat.stat_value,
          stat_unit: stat.stat_unit,
          stat_modifier: stat.stat_modifier || "+",
        };

        const { query: statQuery, params: statParams } = buildInsertQuery(
          "items_stats",
          statData,
        );
        await db.query(statQuery, statParams);
      }
    }
    db.query("COMMIT");
    res.status(201).json(insertedItem);
  } catch (err) {
    db.query("ROLLBACK");
    next(err);
  }
};
