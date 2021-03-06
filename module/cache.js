class Cache {
    data = {};
    size = 0;

    add(key, value) {
        return new Promise(resolve => {
            this.data[key] = value;
            this.size = Object.keys(this.data).length;
            resolve();
        })
    }

    addSync(key, value) {
        this.data[key] = value;
        this.size = Object.keys(this.data).length;
    }

    get(key) {
        return this.data[key];
    }

    delete(key) {
        Reflect.deleteProperty(this.data, key);
        this.size = Object.keys(this.data).length;
    }

    clear() {
        Object.keys(this.data).forEach(key => {
            this.delete(key)
        }, this)
    }

}

const cache = new Cache();

module.exports = cache;