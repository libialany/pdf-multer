CREATE TABLE archivos(id INT(11) NOT NULL,title VARCHAR(32) NOT NULL,description VARCHAR(160) NOT NULL,filename VARCHAR(320) NOT NULL,path VARCHAR(160) NOT NULL,originalname VARCHAR(160) NOT NULL,mimetype VARCHAR(160) NOT NULL,size INT(11) NOT NULL);

ALTER TABLE archivos ADD PRIMARY  KEY (id);

ALTER TABLE archivos MODIFY id INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT=2;