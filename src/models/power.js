class Power {
    constructor(name, description, price, hero_id) {
        this.name = name;
        this.description = description;
        this.hero_id = hero_id;
    }

    validate() {
        if (!this.name || !this.description || !this.hero_id) {
            return false;
        }
        return true;
    }

    isValid() {
        return this.validate();
    }
}