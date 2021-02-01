# full-js-app
this repo will contain a simple ERP project using those technologies Node ,Express ,MySQL &amp; React will be added

---------------------------------------------------------------

hints:
1- we use Admin LTE https://adminlte.io/ its an open source project
2- to use our DB structure you will find a folder called db-structures
    all modules will have a separate SQL file for each one ,create you DB and import the module(s) you need
3- to use some dummy data you will find a folder called db-structures
    all modules will have a separate SQL file for each one ,import the module(s) test data you need
4- in this project we care only about back end
5- don't forget to import admin.sql in db-structure folder then use (admin ,secret) as admin credentials

---------------------------------------------------------------

just after finalize HR Module

Todo List:
1- Add server side validations [done]
2- Enable sessions [done]
3- Make authentication [done]
4- Using ORM instead of raw sql [done]
5- pagination [done] ,but need to enhance
6- Enable permissions & admin CRUD [done]
7- Use redis as a gateway to store sessions [done]
    just follow this link https://medium.com/swlh/session-management-in-nodejs-using-redis-as-session-store-64186112aa9
    after install redis on my machine and check its works fine
8- Use permissions in HR Module [done]
    8.1- clean up middlewares [done]
    8.2- handle each function instead of general check
9- need to make session works as a flush session [done]