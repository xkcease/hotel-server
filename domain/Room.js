class Room {
    constructor(rid = null, number, type, shower, tv, extra = '', img = '', state = 0) {
        this.rid = rid;
        this.number = number;
        this.type = type;
        this.shower = shower;
        this.tv = tv;
        this.extra = extra;
        this.img = img;
        this.state = state;
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