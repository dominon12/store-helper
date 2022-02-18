# Store Helper

## Project online

https://store-helper.vercel.app/

## Tech stack

This project is built with Next.js + TypeScript + Styled Components + MongoDB

## Description

Case study project I've made for one of the subjects in college.

The task was to create an application to help customers find an information about shop's product by scanning a QR code placed on a product or by writing product's reference number. Also shop's staff needs a posibiilty to add / edit / delete products. I combined this two functionalities in one web app.

[![Video presentation of the store-helper app](http://img.youtube.com/vi/z4Gck6DuWZY/0.jpg)](http://www.youtube.com/watch?v=z4Gck6DuWZY "Presentation of the app Store Helper")

## Admin access

If you want to try admin functionality, log in using the following credentials:

- Username: testadmin
- Password: adminadmin

**!IMPORTANT!** After testing the system for staff, please return everything as it was before you. Thank you.

## API Documentation

### Overview

This API provides a way to <code>create</code>, <code>retrieve</code>, <code>update</code> and <code>delete</code> products using conventional HTTP requests.

#### Models

**Product**

```typescript
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: {
    id: number;
    src: string;
  };
}
```

**User**

```typescript
interface User {
  username: string;
  isAdmin: boolean;
  token: string;
  expiresIn: number;
}
```

### Authentication

In order to interact with the API, you or your application must authenticate.

The API handles this through JSON Web Token.

> JSON Web Token (JWT) is an open standard (<a href="https://tools.ietf.org/html/rfc7519">RFC 7519</a>) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

To generate your Token, send a POST request to <code>/api/v1/accounts/login/</code>. The <code>username</code> and <code>password</code> must be provided as body parameter.

**Payload**

```json
{
  "username": "testadmin",
  "password": "adminadmin"
}
```

**Responses**

<code style="color: green">200</code> - OK

```json
{
  "username": "testadmin",
  "isAdmin": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjAzZmQzODc5Y2I5ZjFmZDBhNjBkNDciLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDQ1ODYxNDMsImV4cCI6MzI4OTI1ODY4Nn0.KPZqiPgq-o9BC5165SNiJHxcLsCZMlVxdZqIkhp3eJw",
  "expiresIn": 1644672543
}
```

<code style="color: red">400</code> - Bad Request

```json
{
  "error": "Authentication failed. Provided credentials are incorrect."
}
```

#### How to authenticate with obtained token

In order to make an authenticated request, include an <code>Authorization</code> header containing your auth token. All requests must be made over HTTPS.

**Header example**

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjAzZmQzODc5Y2I5ZjFmZDBhNjBkNDciLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NDQ1ODYxNDMsImV4cCI6MzI4OTI1ODY4Nn0.KPZqiPgq-o9BC5165SNiJHxcLsCZMlVxdZqIkhp3eJw
```

### Resources

#### Accounts

##### <code style="background-color: blue; color: white;" >POST</code> Sign Up

To sign up, send POST request to <code>/api/v1/accounts/signup/</code> including <code>username</code> and <code>password</code> to request's body.

**Payload**

```json
{
  "username": "username",
  "password": "password"
}
```

**Responses**

<code style="color: green">201</code> - Created

```json
{
  "username": "username",
  "password": "$2b$12$3cDym37KOQ24.oYqNKLWT.mVKib1x5iy4qDCPRGHQ0qLnGGyAifMy",
  "isAdmin": false,
  "_id": "620665c10ef5fef8336c05a7",
  "__v": 0
}
```

<code style="color: red">400</code> - Bad Request

```json
{
  "error": "Username and password body parameters are required"
}
```

#### Products

##### <code style="background-color: green; color: white;" >GET</code> List all products

In order to list all products, send GET request to <code>/api/v1/products/</code>.

**Responses**

<code style="color: green">200</code> - OK

```json
[
    {
        "image": {
            "src": "https://sobolevmax.pythonanywhere.com/media/uploads/imac.jpeg",
            "id": 6
        },
        "_id": "620510bc621655a6a462473f",
        "name": "Apple iMac 24\" Retina 8K",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
        "price": 1869,
        "__v": 0
    }
]
```

##### <code style="background-color: blue; color: white;" >POST</code> Create a product

_Authorizations: JWT Authentication_
_Permissions: Is Admin User_

To create a product, send POST request to <code>/api/v1/products/</code>.

**Payload**

```json
{
  "name": "Some new product",
  "description": "Product's description",
  "price": 999,
  "image": {
    "id": 6,
    "src": "https://sobolevmax.pythonanywhere.com/media/uploads/imac.jpeg"
  }
}
```

**Responses**

<code style="color: green">201</code> - Created

```json
{
  "name": "Some new product",
  "description": "Product's description",
  "image": {
    "src": "https://sobolevmax.pythonanywhere.com/media/uploads/imac.jpeg",
    "id": 6
  },
  "price": 999,
  "_id": "620668430ef5fef8336c05b0",
  "__v": 0
}
```

<code style="color: red">403</code> - Forbidden

```json
{
  "error": "jwt must be provided"
}
```

##### <code style="background-color: green; color: white;" >GET</code> Retrieve product by \_id

In order to retrieve a specific product by it's <code>\_id</code>, send GET request to <code>/api/v1/products/[_id]/</code>.

**Responses**

<code style="color: green">200</code> - OK

```json
{
  "image": {
    "src": "https://sobolevmax.pythonanywhere.com/media/uploads/imac.jpeg",
    "id": 6
  },
  "_id": "620668430ef5fef8336c05b0",
  "name": "Some new product",
  "description": "Product's description",
  "price": 999,
  "__v": 0
}
```

##### <code style="background-color: orange; color: white;" >PATCH</code> Update specific product

_Authorizations: JWT Authentication_
_Permissions: Is Admin User_

To update a specific product, send PATCH request to <code>/api/v1/products/[_id]/</code>.

**Payload**

```json
{
  "name": "New product name"
}
```

**Responses**

<code style="color: green">202</code> - Accepted

```json
{
  "name": "New product name",
  "_id": "620668430ef5fef8336c05b0",
  "description": "Product's description",
  "price": 999,
  "image": {
    "src": "https://sobolevmax.pythonanywhere.com/media/uploads/imac.jpeg",
    "id": 6
  },
  "__v": 0
}
```

<code style="color: red">403</code> - Forbidden

```json
{
  "error": "Permission denied."
}
```

##### <code style="background-color: red; color: white;" >DELETE</code> Delete specific product

_Authorizations: JWT Authentication_
_Permissions: Is Admin User_

To update a specific product, send DELETE request to <code>/api/v1/products/[_id]/</code>.

**Responses**

<code style="color: green">204</code> - No content

```json

```

<code style="color: red">403</code> - Forbidden

```json
{
  "error": "jwt must be provided"
}
```
