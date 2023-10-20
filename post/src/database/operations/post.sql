CREATE DATABASE post_db;

CREATE TABLE post (
	id serial PRIMARY KEY,
	authorId INT NOT NULL,
    threadId INT NOT NULL,
    status VARCHAR ( 50 ) NOT NULL references status(type),
    subject VARCHAR ( 80 ),
    message VARCHAR(500) NOT NULL,
	createdAt TIMESTAMP NOT NULL
);

INSERT INTO post (authorId, threadId, status, subject, message, createdAt) VALUES (1, 1, 'public', 'Post 1', 'Content of Post 1', '2023-10-01T08:36:58.224Z');


CREATE TABLE status (
	id serial PRIMARY KEY,
    type VARCHAR ( 50 ) UNIQUE NOT NULL
);

INSERT INTO status (type) VALUES ('public');
INSERT INTO status (type) VALUES ('protect');
INSERT INTO status (type) VALUES ('private');


-- UPDATE status
-- SET type = 'protect' 
-- WHERE id = 2;


-- CREATE TABLE accounts (
-- 	user_id serial PRIMARY KEY,
-- 	username VARCHAR ( 50 ) UNIQUE NOT NULL,
-- 	password VARCHAR ( 50 ) NOT NULL,
-- 	email VARCHAR ( 255 ) UNIQUE NOT NULL,
-- 	created_on TIMESTAMP NOT NULL,
--         last_login TIMESTAMP 
-- );

