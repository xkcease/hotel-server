module.exports = {
    createDatabase: `create database hotel;`,
    createTable: {
        admin: `create table admin(
            aid int(6) not null primary key auto_increment,
            username varchar(20) not null,
            password varchar(128) not null,
            permission int(1) not null,
            idkey varchar(20) not null
        );`,
        room: `create table room(
            rid int(8) not null primary key auto_increment,
            number varchar(8) not null,
            type int(2) not null,
            shower int(1) not null,
            tv int(1) not null,
            extra varchar(256),
            img varchar(256),
            state int(1) not null
        );`,
        room_order: `create table room_order(
            oid bigint(18) not null primary key,
            uid int(6),
            rid int(8) not null,
            place_time  bigint(18),
            reservation_time bigint(18) not null,
            reservation_during bigint(18) not null,
            check_in_time bigint(18),
            check_out_time bigint(18),
            state int(1) not null
        );`,
        guest: `create table guest(
            oid bigint(18) not null,
            gid varchar(18) not null,
            name varchar(50) not null
        );`,
        price: `create table price(
            type int(2) not null primary key,
            price int(8) not null
        );`,
    }
};