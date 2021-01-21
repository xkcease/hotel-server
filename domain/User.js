class User {
    constructor(id = null, username, password, permission, idkey) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.permission = permission;
        this.idkey = idkey;
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

module.exports = User;