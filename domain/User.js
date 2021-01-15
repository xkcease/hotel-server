class User {
    constructor(id = null, username, password, permission, idkey) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.permission = permission;
        this.idkey = idkey;
    }

    toString() {
        return `{ 
            id: ${this.id}, 
            username: ${this.username}, 
            password: ${this.password},
            permission: ${this.permission},
            idkey: ${this.idkey}
        }`
    }
}

module.exports = User;