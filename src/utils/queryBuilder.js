export const buildDynamicHeroesQuery = (filters) => {
  let query = `SELECT h.id as HeroID, h.name as Hero, h.role, 
    p.name as Passive, p.description FROM heroes 
    h LEFT JOIN passives p ON p.hero_id = h.id WHERE 1 = 1`;
  const params = [];
  let paramCount = 1;

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query += ` AND h.${key} ILIKE $${paramCount}`;
      params.push(`%${value}%`);
      paramCount++;
    }
  });
  return { query, params };
};

export const buildDynamicPowersQuery = (filters) => {
  const includeImage = filters.image_url === "true";

  const selectedFilters = ["h.name as Hero", "p.name", "p.description"];

  if (includeImage) selectedFilters.push("p.image_url");

  let query = `SELECT ${selectedFilters.join(", ")} FROM POWERS p
            INNER JOIN heroes h ON p.hero_id = h.id WHERE 1 = 1`;
  const params = [];
  let paramCount = 1;

  const numeric_fields = ["hero_id"];
  const string_fields = ["name", "description"];

  Object.entries(filters).forEach(([key, value]) => {
    if (key === "image_url") return;
    if (numeric_fields.includes(key) && value !== undefined && value !== null) {
      query += ` AND p.${key} = $${paramCount}`;
      params.push(value);
      paramCount++;
    } else if (
      string_fields.includes(key) &&
      value !== undefined &&
      value !== null
    ) {
      query += ` AND p.${key} ILIKE $${paramCount}`;
      params.push(`%${value}%`);
      paramCount++;
    }
  });

  return { query, params };
};

export const buildDynamicItemsQuery = (filters) => {
  const includeImage = filters.image_url === "true";

  const selectedFilters = [
    "i.rarity",
    "h.name as hero",
    "i.name",
    "i.description",
    "i.type",
    "i.price",
  ];

  if (includeImage) selectedFilters.push("i.image_url");

  const groupByColumns = [
    "i.id",
    "i.rarity",
    "h.name",
    "i.name",
    "i.description",
    "i.type",
    "i.price",
  ];

  if (includeImage) groupByColumns.push("i.image_url");

  let query = `
        SELECT ${selectedFilters.join(", ")},
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'stat_type', s.stat_type,
            'stat_value', s.stat_value,
            'stat_unit', s.stat_unit,      
            'stat_modifier', s.stat_modifier
          )
        ) as stats
        FROM ITEMS i
        LEFT JOIN HEROES h ON i.hero_id = h.id
        INNER JOIN ITEMS_STATS s ON i.id = s.item_id WHERE 1 = 1`;
  const params = [];
  let paramCount = 1;

  const numeric_fields = ["price", "hero_id"];
  const string_fields = ["rarity", "name", "description", "type"];

  Object.entries(filters).forEach(([key, value]) => {
    if (key === "image_url") return;
    if (numeric_fields.includes(key) && value !== undefined && value !== null) {
      const column = key === "hero_id" ? `h.${key}` : `i.${key}`;
      query += ` AND ${column} = $${paramCount}`;
      params.push(value);
      paramCount++;
    } else if (
      string_fields.includes(key) &&
      value !== undefined &&
      value !== null
    ) {
      const column = `i.${key}`;
      query += ` AND ${column} ILIKE $${paramCount}`;
      console.log(query);
      params.push(`%${value}%`);
      paramCount++;
    }
  });
  query += ` GROUP BY i.id, h.name, ${groupByColumns.join(", ")}`;
  return { query, params };
};

export const buildInsertQuery = (tableName, data) => {
  const columns = [];
  const params = [];
  const values = [];

  Object.keys(data).forEach((key, index) => {
    columns.push(key);
    params.push(`$${index + 1}`);
    values.push(data[key]);
  });

  const query = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${params.join(", ")}) RETURNING *`;
  return { query, params: values };
};

export const buildPartialUpdateQuery = (
  tableName,
  data,
  identifierColumn = "name"
) => {
  const updates = [];
  const values = [];
  let paramCount = 1;

  Object.entries(data).forEach(([key, value]) => {
    if (key !== identifierColumn && value !== undefined) {
      updates.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
  });

  values.push(data[identifierColumn]);

  const query = `
        UPDATE ${tableName} 
        SET ${updates.join(", ")} 
        WHERE ${identifierColumn} = $${paramCount} 
        RETURNING *`;

  return { query, params: values };
};
