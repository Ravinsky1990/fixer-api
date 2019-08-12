### API

| Method | URI | Params | Description |
| ------ | ------ | ------ | ------|
| GET | https://fixer-api.herokuapp.com/users |-- | Fetch all users
| POST | https://fixer-api.herokuapp.com/search | + | filtering and sorting users
| POST | https://fixer-api.herokuapp.com/sigh-up | + | Sigh up user
| POST | https://fixer-api.herokuapp.com/sigh-in | + | Sigh in user
| PUT | https://fixer-api.herokuapp.com/user | + | Update user info


#### Params
**/search**
```javascript
{
    category: [Front-end: String, Back-end: String]
    text: String,
    sort: [rating:String, price: String]
}
```
**/sigh-up**
```javascript
{
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    userName: String
}
```
**/sigh-in**
```javascript
{
    email: String,
    password: String,
}
```

