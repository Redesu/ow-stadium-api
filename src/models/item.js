class Item {
  constructor(
    rarity,
    name,
    type,
    description,
    price,
    image_url,
    hero_id = null,
  ) {
    this.rarity = rarity;
    this.name = name;
    this.type = type;
    this.description = description;
    this.price = price;
    this.image_url = image_url;
    this.hero_id = hero_id;
  }

  validate() {
    if (
      !this.rarity ||
      !this.name ||
      !this.description ||
      !this.price ||
      !this.image_url ||
      !this.type
    ) {
      return false;
    }
    return true;
  }

  isValid() {
    return this.validate();
  }
}

export default Item;
