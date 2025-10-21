class Hero {
    constructor(id, name, role) {
        this.name = name;
        this.role = role;
    }

    validate() {
        if (!this.name || !this.role) {
            return false;
        }
        return true;
    }

    isValid() {
        return this.validate();
    }
}


export default Hero;