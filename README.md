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



```shell
curl --location --request POST 'https://api.zoom.us/v2/users/me/meetings' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInYiOiIyLjAiLCJraWQiOiI2NzM1MmIwZi0zOGVkLTQ5Y2EtOTIxMC1iYjczYWQyNGEwNjkifQ.eyJ2ZXIiOjcsImF1aWQiOiI0NzM3NmM1YTY1ODY2MGMxYzk1OWU0NDE0N2E0YzAzYiIsImNvZGUiOiJjNUNkcHNxaGxxanpZQmFKSUdSUlY2VUVjSXl0ODg5b0EiLCJpc3MiOiJ6bTpjaWQ6X0tiZlNjd21UajI1Sk05TEJhZEdJZyIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJDQXFiN2ptclJjdUNoSEd6a0pRUFdRIiwibmJmIjoxNjcyNzg2MDE3LCJleHAiOjE2NzI3ODk2MTcsImlhdCI6MTY3Mjc4NjAxNywiYWlkIjoiNzF1bUMyUVZRU2VCNU1zX3UtcnhYQSIsImp0aSI6IjQ2ZjBhMTk0LWMyNzMtNGZmMS04NjFlLWYwNjkyNTM3NWVhMyJ9' \
--header 'Content-Type: application/json' \
--data-raw '{
   "topic": "Corona testing 2",
   "duration": 60,
   "settings": {
      "mute_upon_entry": true,
      "join_before_host": true
   },
   "password": "test-123"
}'
```