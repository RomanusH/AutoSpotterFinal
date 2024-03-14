CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password) VALUES ('user1', 'pass1');
INSERT INTO users (username, password) VALUES ('user2', 'pass2');
INSERT INTO users (username, password) VALUES ('user3', 'pass3');