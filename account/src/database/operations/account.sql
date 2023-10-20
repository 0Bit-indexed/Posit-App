CREATE DATABASE account_db;

CREATE TABLE users (
	id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
    displayName VARCHAR ( 50 ) NOT NULL,
    password VARCHAR ( 255 ) NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    salt VARCHAR ( 255 ) NOT NULL,
	registeredAt TIMESTAMP NOT NULL
);



CREATE TABLE account_type (
	id serial PRIMARY KEY,
    type VARCHAR ( 50 ) UNIQUE NOT NULL
);

INSERT INTO account_type (type) VALUES ('personality');
INSERT INTO account_type (type) VALUES ('entity');
INSERT INTO account_type (type) VALUES ('theme');

CREATE TABLE profile (
    accountId INT PRIMARY KEY NOT NULL,
	aboutMe VARCHAR ( 225 ),
    account_type VARCHAR ( 50 ) NOT NULL references account_type(type)
);


