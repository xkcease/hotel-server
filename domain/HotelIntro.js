class HotelIntro {
    constructor(id = 1, name, intro, options, address, contact, img) {
        this.id = id;
        this.name = name;
        this.intro = intro;
        this.options = options;
        this.address = address;
        this.contact = contact;
        this.img = img;
    }

    [Symbol.iterator]() {
        const values = Object.values(this);
        let index = 0;

        return {
            next: () => {
                if (index < values.length) {
                    return {
                        value: values[index++],
                        done: false
                    };
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        }
    }
}

module.exports = HotelIntro;