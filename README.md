# Pure Match Backend Challenge

This is the branch containing req1 for the coding challenge. 

## API Calls

### User Registration
#### Request
```http
POST http://localhost:8008/register
Content-Type: application/json

{
    "name": "bill",
    "email": "bill@gmail.com",
    "password": "1234abcd"
}
```

#### Response
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 137
ETag: W/"89-mNS6i5J1n8hEb9QpPKhySOK3Mmg"
Date: Tue, 09 May 2023 03:30:37 GMT
Connection: close

{
  "id": 2,
  "name": "bill",
  "email": "bill@gmail.com",
  "password": "$2b$10$C9UYtiSdFXOVNRgDvQUEEub9JOkfNPejg7tP50xJYz/x9q3yvWXDy",
  "username": null
}
```

### User Login
#### Request
```http
POST http://localhost:8008/login
Content-Type: application/json

{
    "email": "bill@gmail.com",
    "password": "1234abcd"
}
```

#### Response
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 102
ETag: W/"66-/3WGe1BBQxKB6qmN6g8AlmEjDkQ"
Date: Tue, 09 May 2023 03:37:02 GMT
Connection: close

{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.YmlsbEBnbWFpbC5jb20.zAKrxkilSaW8ZjtLNP0w89S1Kv_AbF6zeIwW9pGr6UY"
}
```

### Create Post
#### Request
```http
POST http://localhost:8008/posts
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.YmlsbEBnbWFpbC5jb20.zAKrxkilSaW8ZjtLNP0w89S1Kv_AbF6zeIwW9pGr6UY
Content-Type: application/json

{
    "title": "post1",
    "description": "this is a post the first one",
    "photos": [
        {
            "url": "image1.com"
        },
        {
            "url": "image2.com"
        },
        {
            "url": "image3.com"
        },
        {
            "url": "image4.com"
        },
        {
            "url": "image5.com"
        }
    ]
}
```

#### Response
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 138
ETag: W/"8a-2mj2girBo56vjylXWMp24FCiX9Q"
Date: Tue, 09 May 2023 03:38:15 GMT
Connection: close

{
  "id": 2,
  "title": "post1",
  "description": "this is a post the first one",
  "user_email": "bill@gmail.com",
  "createdAt": "2023-05-09T03:38:15.026Z"
}
```

