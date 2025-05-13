Hradni-hlidka-server
====================
Node backend server pro hru Hradní Hlídka.

Deploy on server:
1. run on local computer "npm run build"
2. this will generate a folder "dist" with files all compiled to pure .js
3. make sure that on local computer runs "npm start" without errors 
4. zip project folder (except node_modules, .idea, .git) and upload to Elastic Beanstalk server
5. Beanstalk wil automatically run "npm start" on the server
