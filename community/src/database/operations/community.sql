CREATE DATABASE community_db;

CREATE TABLE community (
    id serial PRIMARY KEY,
    adminId INT UNIQUE NOT NULL
);

CREATE TABLE thread (
	id serial PRIMARY KEY,
	communityId INT NOT NULL references community(id),
	title VARCHAR(50) NOT NULL,
	status VARCHAR ( 50 ) NOT NULL references status(type),
	createdAt TIMESTAMP NOT NULL
);

CREATE TABLE status (
	id serial PRIMARY KEY,
    type VARCHAR ( 50 ) UNIQUE NOT NULL
);

INSERT INTO status (type) VALUES ('public');
INSERT INTO status (type) VALUES ('protect');
INSERT INTO status (type) VALUES ('private');
