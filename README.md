
# Pure Match Backend Challenge

This is the branch containing req1 for the coding challenge. 

## API Calls

### Get Posts
#### Request
```http
GET http://localhost:8008/posts
Content-Type: application/json

{
    "current_post_id": 19,
    "get_next": 4
}

```

#### Response
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 615
ETag: W/"267-rjqBY+/j0eD5Qj/wHsf2IjhjLTw"
Date: Tue, 09 May 2023 03:41:09 GMT
Connection: close

[
  {
    "id": 2,
    "title": "post1",
    "description": "this is a post the first one",
    "createdAt": "2m ago",
    "photos": [
      {
        "id": 6,
        "url": "image1.com",
        "post_id": 2
      },
      {
        "id": 7,
        "url": "image2.com",
        "post_id": 2
      },
      {
        "id": 8,
        "url": "image3.com",
        "post_id": 2
      },
      {
        "id": 9,
        "url": "image4.com",
        "post_id": 2
      },
      {
        "id": 10,
        "url": "image5.com",
        "post_id": 2
      }
    ]
  },
  {
    "id": 1,
    "title": "post number 2",
    "description": "this is a post the first one",
    "createdAt": "17h ago",
    "photos": [
      {
        "id": 1,
        "url": "image1.com",
        "post_id": 1
      },
      {
        "id": 2,
        "url": "image2.com",
        "post_id": 1
      },
      {
        "id": 3,
        "url": "image3.com",
        "post_id": 1
      },
      {
        "id": 4,
        "url": "image4.com",
        "post_id": 1
      },
      {
        "id": 5,
        "url": "image5.com",
        "post_id": 1
      }
    ]
  }
]
```

### Edit Post
#### Request
```http
POST http://localhost:8008/posts/edit/
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.YmlsbEBnbWFpbC5jb20.zAKrxkilSaW8ZjtLNP0w89S1Kv_AbF6zeIwW9pGr6UY
Content-Type: application/json

{
    "title": "post1 edited",
    "description": "this is the edited first post",
    "post_id": 2
}
```

#### Response
```http
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 148
ETag: W/"94-9JXn/3QvSsWjArK0Tus1N/RpXoY"
Date: Tue, 09 May 2023 03:43:50 GMT
Connection: close

[
  {
    "id": 2,
    "title": "post1 edited",
    "description": "this is the edited first post",
    "user_email": "bill@gmail.com",
    "createdAt": "2023-05-09T03:38:15.026Z"
  }
]
```
