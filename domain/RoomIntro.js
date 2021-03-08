class RoomIntro {
    constructor(type, text, shower, tv, window, options, img, intro) {
        this.type = type;
        this.text = text;
        this.shower = shower;
        this.tv = tv;
        this.window = window;
        this.options = options;
        this.img = img;
        this.intro = intro;
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

module.exports = RoomIntro;