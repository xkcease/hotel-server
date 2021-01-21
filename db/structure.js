module.exports = {
    createDatabase: `create database hotel;`,
    createTable: {
        user: `create table user(
            id int(12) not null primary key auto_increment,
            username varchar(20) not null,
            password varchar(128) not null,
            permission int(1) not null,
            idkey varchar(20) not null
        );`
    }
};