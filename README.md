
# Pure Match Backend Challenge

This is the branch containing req1 for the coding challenge. 

## API Calls

### Make Comment
#### Request
```http
POST http://localhost:8008/posts/comment/
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.d2lsbGlhbUBnbWFpbC5jb20.VMw5SIK60WjDP2Ta74D9syCL22YSP-L80KbV-6JdXNE
Content-Type: application/json

{
    "content": "comment on post1 by billyuan",
    "post_id": 2
}
```

#### Response
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 94
ETag: W/"5e-RSj7kwTae2XDO2dtG2wXjhNbInE"
Date: Tue, 09 May 2023 03:46:57 GMT
Connection: close

{
  "id": 2,
  "content": "comment on post1 by billyuan",
  "post_id": 2,
  "user_email": "william@gmail.com"
}
```

### Post Pagination
#### Request
```http
GET http://localhost:8008/posts
Content-Type: application/json

{
    "current_post_id": 6,
    "get_next": 4
}
```

#### Response
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 573
ETag: W/"23d-sVZLXahZ7PkBkAxPTHKWGj/CFCQ"
Date: Tue, 09 May 2023 03:49:55 GMT
Connection: close

[
  {
    "id": 6,
    "title": "post1",
    "description": "this is a post the first one",
    "createdAt": "1m ago",
    "photos": [
      {
        "id": 14,
        "url": "image1.com",
        "post_id": 6
      }
    ]
  },
  {
    "id": 5,
    "title": "post1",
    "description": "this is a post the first one",
    "createdAt": "1m ago",
    "photos": [
      {
        "id": 13,
        "url": "image1.com",
        "post_id": 5
      }
    ]
  },
  {
    "id": 4,
    "title": "post1",
    "description": "this is a post the first one",
    "createdAt": "1m ago",
    "photos": [
      {
        "id": 12,
        "url": "image1.com",
        "post_id": 4
      }
    ]
  },
  {
    "id": 3,
    "title": "post1",
    "description": "this is a post the first one",
    "createdAt": "1m ago",
    "photos": [
      {
        "id": 11,
        "url": "image1.com",
        "post_id": 3
      }
    ]
  }
]
```

### Updated User Model With Username
#### Request
```http
POST http://localhost:8008/register
Content-Type: application/json

{
    "name": "jonathan",
    "email": "jonathan@gmail.com",
    "username": "helloiamjonathan",
    "password": "1234567"
}

```

#### Response
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 159
ETag: W/"9f-N/xVVCd9o/zHvxCiFOgre4CvOVY"
Date: Tue, 09 May 2023 03:51:11 GMT
Connection: close

{
  "id": 3,
  "name": "jonathan",
  "email": "jonathan@gmail.com",
  "password": "$2b$10$voC7TQRcnI6jinZiHzthHuc2hhOJvZyd64FZiSxcVk1o11uvvf2.q",
  "username": "helloiamjonathan"
}
```
