BEGIN;


DROP TABLE IF EXISTS public.articles CASCADE;

CREATE TABLE IF NOT EXISTS public.articles
(
    id SERIAL NOT NULL,
    title character varying(200) COLLATE pg_catalog."default" NOT NULL,
    message text COLLATE pg_catalog."default" NOT NULL,
    create_at date DEFAULT CURRENT_DATE,
    delete_at date,
    user_id integer NOT NULL,
    CONSTRAINT articles_pkey PRIMARY KEY (id)
);

DROP TABLE IF EXISTS public.commentaires CASCADE;

CREATE TABLE IF NOT EXISTS public.commentaires
(
    id SERIAL NOT NULL,
    user_id integer NOT NULL,
    article_id integer NOT NULL,
    commentaire text COLLATE pg_catalog."default" NOT NULL,
    create_at date DEFAULT CURRENT_DATE,
    delete_at date,
    CONSTRAINT commentaires_pkey PRIMARY KEY (id)
);

DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE IF NOT EXISTS public.users
(
    id SERIAL NOT NULL,
    username character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.articles
    ADD CONSTRAINT articles_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.commentaires
    ADD CONSTRAINT commentaires_article_id_fkey FOREIGN KEY (article_id)
    REFERENCES public.articles (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;


ALTER TABLE IF EXISTS public.commentaires
    ADD CONSTRAINT commentaires_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

END;