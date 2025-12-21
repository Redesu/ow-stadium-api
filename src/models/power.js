class Power {
  constructor(name, description, hero_id, image_url) {
    this.name = name;
    this.description = description;
    this.hero_id = hero_id;
    this.image_url = image_url;
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

export default Power;
