CREATE DATABASE asocial_graph_db;

CREATE TABLE following (
	accountId INT NOT NULL,
	recipientId INT NOT NULL,
    isApproved BOOLEAN NOT NULL,
	approvedAt TIMESTAMP
);

CREATE TABLE community_member (
	communityId INT NOT NULL,
	memberId INT NOT NULL,
	joinedAt TIMESTAMP
);



-- CREATE TABLE account_type (
-- 	id serial PRIMARY KEY,
--     type VARCHAR ( 50 ) UNIQUE NOT NULL
-- );

-- INSERT INTO account_type (type) VALUES ('personality');
-- INSERT INTO account_type (type) VALUES ('entity');
-- INSERT INTO account_type (type) VALUES ('theme');

-- CREATE TABLE profile (
--     accountId INT PRIMARY KEY NOT NULL,
-- 	aboutMe VARCHAR ( 225 ),
--     account_type VARCHAR ( 50 ) NOT NULL references account_type(type)
-- );


