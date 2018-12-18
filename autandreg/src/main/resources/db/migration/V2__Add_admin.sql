insert into usr(id, username, password, active)
values(5, 'admin', '123', true);
insert into user_role(user_id, roles)
values(5, 'USER'), (5, 'ADMIN');