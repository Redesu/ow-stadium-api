class Item {
    constructor(rarity, name, description, price, hero_id = null) {
        this.rarity = rarity;
        this.name = name;
        this.description = description;
        this.price = price;
        this.hero_id = hero_id;
    }

    validate() {
        if (!this.name || !this.description || !this.price) {
            return false;
        }
        return true;
    }

    isValid() {
        return this.validate();
    }
}

export default Item;