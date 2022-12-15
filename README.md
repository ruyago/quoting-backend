### API Documentation

We will start our quote by first documenting all of the routes and data models for our API. Following best practices we will use _verbs_ to specify the type of operation being done and _nouns_ when naming endpoints.

#### Routes

##### quote routes

| HTTP verb | URL                        | Request body | Action                        |
| --------- | -------------------------- | ------------ | ----------------------------- |
| GET       | `/api/my-quotes`            | (empty)      | Returns all the my-quotes      |
| POST      | `/api/my-quotes`            | JSON         | Adds a new quote            |
| GET       | `/api/my-quotes/:quoteId` | (empty)      | Returns the specified quote |
| PUT       | `/api/my-quotes/:quoteId` | JSON         | Edits the specified quote   |
| DELETE    | `/api/my-quotes/:quoteId` | (empty)      | Deletes the specified quote |



##### Auth routes

| HTTP verb | URL            | Request Headers                 | Request Body              |
| --------- | -------------- | ------------------------------- | ------------------------- |
| POST      | `/auth/signup` | --                              | { email, password, name } |
| POST      | `/auth/login`  | --                              | { email, password }       |
| GET       | `/auth/verify` | Authorization: Bearer \< JWT \> | --                        |



<hr>

#### Models

##### quote Model

```js
{
  title: String,
  description: String,

}
```



##### User Model

```js
{
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
}
```

