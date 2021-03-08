class Order {
    constructor(oid, rid, uid = null, place_time, reservation_time, reservation_during, check_in_time, check_out_time, state, type, contact, number) {
        this.oid = oid;
        this.rid = rid;
        this.uid = uid;
        this.place_time = place_time;
        this.reservation_time = reservation_time;
        this.reservation_during = reservation_during;
        this.check_in_time = check_in_time;
        this.check_out_time = check_out_time;
        this.state = state;
        this.type = type;
        this.contact = contact;
        this.number = number;
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

module.exports = Order;