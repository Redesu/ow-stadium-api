import db from "../../config/db.js";
import { buildSearchAllTablesQuery } from "../../utils/queryBuilder.js";

export const search = async (req, res, next) => {
  try {
    const querySearch = req.query;
    if (
      !querySearch ||
      !querySearch.term ||
      Object.keys(querySearch).length === 0
    ) {
      return res
        .status(400)
        .json({ message: "No search parameters provided." });
    }

    const itemsStatsMap = {
      ap: "Ability Power",
      wp: "Weapon Power",
      hp: "Health",
      as: "Attack Speed",
      sh: "Shield",
      ar: "Armor",
      al: "Ability Lifesteal",
      cr: "Cooldown Reduction",
      ma: "Max Ammo",
      ms: "Movement Speed",
      rs: "Reload Speed",
      has: "Health, Shields, and Armor",
    };

    const terms = querySearch.term
      .split(",")
      .map((term) => term.trim().toLowerCase());

    const convertedTerms = terms.map((term) => itemsStatsMap[term] || term);

    const { query, params } = buildSearchAllTablesQuery([convertedTerms]);
    const result = await db.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No results found." });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
};
