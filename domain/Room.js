class Room {
    constructor(id = null, number, type, shower, tv, extra = '', img = '') {
        this.id = id;
        this.number = number;
        this.type = type;
        this.shower = shower;
        this.tv = tv;
        this.extra = extra;
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

module.exports = Room;