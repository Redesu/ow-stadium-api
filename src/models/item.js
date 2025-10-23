class Item {
    constructor(rarity, name, description, price, image_url, hero_id = null) {
        this.rarity = rarity;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image_url = image_url;
        this.hero_id = hero_id;
    }

    validate() {
        if (!this.name || !this.description || !this.price || !this.image_url) {
            return false;
        }
        return true;
    }

    isValid() {
        return this.validate();
    }
}

export default Item;