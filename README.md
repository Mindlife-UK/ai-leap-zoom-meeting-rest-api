## Table of contents 👀
* [General info](#general-info)
* [Technologies](#technologies)
* [Blog](#blog)
* [Setup](#setup)

### General info
ai-leap-zoom-meeting-rest-api

#### Routes ⚡
| Routes | HTTP Methods| Description
|:------- |:---------------|:--------------
| /oauth      | GET                  | Displays all tea
| /oauth      | POST               | Creates a new tea

	
### Technologies
Project is created with:
<p>
<img src="https://img.shields.io/badge/-MongoDB%20-1AA121?style=for-the-badge&logo=mongodb&logoColor=green">
<img src="https://img.shields.io/badge/-Expressjs%20-%23323330?style=for-the-badge&logo=express">
<img src="https://img.shields.io/badge/-Nodejs%20-%23323330?style=for-the-badge&logo=Node.js&logoColor=green">
</p>

* Node version: 16.18.0
* Express version: 4.18.2
* Mongoose version: 6.8.0
* Multer version: 1.4.5
* MongoDB Atlas

### Setup
To run this project locally, clone repo and add an `.env` file in the root:
```
MONGODB_URI='mongodb+srv://username:password@cluster0.eetsx.mongodb.net/database_name'
```

Then execute in command prompt:
```
$ cd tapi
$ npm install
$ npm start or node server.js
```

