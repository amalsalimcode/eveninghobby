-- brew services start mysql
-- sudo mysql

show databases;
CREATE DATABASE playground;
use playground;


/*
create table <tbl_name> (
    <col_name> <type> <constraint>
)
*/
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    message text,
    grade CHAR(1),
    createdAt DATE,
    isActive BOOLEAN,
    price DECIMAL(10,2),
    username VARCHAR2(50) UNIQUE NOT NULL,
    age INT NOT NULL CHECK (age > 18 and age <= 65), 

	CONSTRAINT c1 UNIQUE (name, age, grade)
);


-- INSERT INTO <tbl_name> (<col1>, <col2>) VALUES (<val1>, <val2>);
INSERT INTO students (name, age, grade, username) VALUES ('John Doe', 20, 'A', 'jamba');
alter table students modify column age int default 7;


-- in postgres
CREATE TYPE coordinates AS OBJECT(
    x DECIMAL(5,2),
    y DECIMAL(5,2)
);

CREATE TABLE PLACES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR2(30) NOT NULL,
    location coordinates NOT NULL
)

update students set message='hello' where id in (1, 2);
update students set name='amal salim' where name='amal';

delete from students where id=4;


set transaction isolation serializable
start transaction
-- set of transactions. These transactions will run in sequence regardless of db connections
commit


select count(*) from students;

-- join example
create table instructor (
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);

create table grade (
    id int AUTO_INCREMENT PRIMARY KEY,
    grade int NOT NULL,
    foreign key (lead_instructor) references instructor(name)
);


select * from grade g join instructor i on g.lead_instructor = i.name where g.grade=1;






