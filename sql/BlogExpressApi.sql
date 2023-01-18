CREATE TABLE users(
	id serial NOT NULL PRIMARY KEY,
	username VARCHAR(30)NOT NULL,
	password VARCHAR(30)NOT NULL
);
CREATE TABLE articles(
	id SERIAL NOT NULL PRIMARY KEY,
	title VARCHAR(200) NOT NULL, 
	message TEXT NOT NULL,
	create_at DATE DEFAULT CURRENT_DATE,
	delete_at DATE,
	user_id integer NOT NULL REFERENCES users ON DELETE CASCADE	
);
CREATE TABLE commentaires(
	id SERIAL NOT NULL PRIMARY KEY,
	user_id integer NOT NULL REFERENCES users ON DELETE CASCADE,
	article_id integer NOT NULL REFERENCES articles ON DELETE CASCADE,
	commentaire TEXT NOT NULL,
	create_at DATE DEFAULT CURRENT_DATE,
	delete_at DATE
);