module.exports = {
    createDatabase: `create database hotel;`,
    createTable: {
        user: `create table user(
            id int(12) not null primary key auto_increment,
            username varchar(20) not null,
            password varchar(128) not null,
            permission int(1) not null,
            idkey varchar(20) not null
        );`,
        room: `create table room(
            id int(4) not null primary key auto_increment,
            number varchar(8) not null,
            type int(2) not null,
            shower int(1) not null,
            tv int(1) not null,
            extra varchar(256),
            img varchar(256)
        );`,
    }
};