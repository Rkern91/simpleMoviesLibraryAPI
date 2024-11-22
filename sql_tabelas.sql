CREATE TABLE categorias
(
    cd_categoria SERIAL PRIMARY KEY,
    nm_categoria VARCHAR NOT NULL
);

CREATE TABLE filmes
(
    cd_filme             SERIAL PRIMARY KEY,
    ds_titulo            VARCHAR NOT NULL,
    dt_ano               INT     NOT NULL,
    ds_descricao         VARCHAR,
    nm_diretor           VARCHAR NOT NULL,
    categoriaCdCategoria INT,
    CONSTRAINT FK_categoria FOREIGN KEY (categoriaCdCategoria) REFERENCES categoria (cd_categoria)
);

CREATE TABLE usuarios
(
    cd_usuario  INT PRIMARY KEY,
    ds_username VARCHAR NOT NULL UNIQUE,
    ds_password VARCHAR NOT NULL
);
