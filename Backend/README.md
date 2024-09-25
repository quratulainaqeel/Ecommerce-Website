# ECOMMERCE-WEBSITE

## 📝Overview

Welcome to the documentation of my website, a web application developed using React, Express, MongoDB, and Bootstrap, and hosted on Cyclic. This documentation will guide you through the key aspects and functionalities of the website, which is designed to serve three main user roles: Guest, User, and Admin.

## Roles:
### Guest:
- Browse products, categories, and brands.
- Requires login to add products to the cart.
- Limited functionality focused on product discovery.
### User:
- Login to access advanced features.
- Search for products by name, brand, or category.
- Add products to the cart for future purchase.
- View detailed product information and leave reviews.
- Manage product quantities in the cart.
- Checkout with contact info and address.
- Receive order confirmation via email.
- Update user profile and logout.
### Admin:
- Manage product categories and brands.
- Add, update, and delete products.
- Update order status (e.g., from "Pending" to "Delivered").
- Update admin profile and logout.
## 🌐Technologies Used:
1.  **Frontend:** React, Bootstrap
2. **Backend:** Express.js
3. **Database:** MongoDB
3. **Hosting:** Cyclic 
# API-REFERENCES

## USER

#### LOGIN

```http
  POST /api/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** **Unique** Enter your email |
| `password` | `string` | **Required**. Enter your password|

#### SIGNUP

```http
  POST /api/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Enter  username|
| `email` | `string` | **Required**  Enter  email|
| `password` | `string` | **Required**. Enter your password|

#### GET all User

```http
  GET /api/get-all-user
```
  | `Description`                |
  :------------------------- |
| This API returns a list of all user


#### GET User by ID

```http
  GET /api/get-user-by-id?_id=64c8117bb0e6db2fc72a359c
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. Enter ID |

#### GET User by Email

```http
  GET /api/get-user-by-email?email=adnan@gmail.com
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Enter email|

#### Update User Details

```http
  POST /api/update-user
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. Enter ID|
| `username` | `string` | . Enter username if you want to update username|
| `profile_pic` | `string` | .Upload Image if you want to update Image|

#### Delete User

```http
  POST /api/delete-user
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. Enter ID to delete user|


## CATEGORY

#### Add Category

```http
  POST /api/create-category
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `CategoryName` | `string` | **Required** **Unique** Enter Category name|
| `CategoryImage` | `string` | **Required**. Upload Category Image|

#### GET All Category

```http
  GET /api/get-all-category
```
  | `Description`                |
  :------------------------- |
| This API returns a list of all Categories

#### GET Category by ID

```http
  GET /api/get-category-by-id?_id=64de176fe0713b2110f2b2c4
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. Enter ID|

#### GET Category by Name

```http
  GET /api/get-category-by-name?CategoryName=Skincare
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `CategoryName` | `string` | **Required**. Enter Category Name|

#### Update Category

```http
  POST /api/update-category
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `CategoryName` | `string` | **Required**. Enter Category Name|
| `CategoryImage` | `string` |Upload Category Image|

#### Delete Category

```http
  POST /api/delete-category
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. Enter ID to delete Category|


## BRAND

#### Add Brand

```http
  POST /api/create-brand
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `BrandName` | `string` | **Required** **Unique** Enter Brand Name|
| `CategoryImage` | `string` | **Required**. Upload Category Image|

#### GET All Brand

```http
  GET /api/get-all-brand
```
  | `Description`                |
  :------------------------- |
| This API returns a list of all Brands

#### GET Brand by ID

```http
  GET /api/get-brand-by-id?_id=64c903b6be8f6e1f60242549
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. Enter ID |

#### GET Brand by Name

```http
  GET /api/get-brand-by-name?BrandName=Dior
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `BrandName` | `string` | **Required**. Enter Brand Name |

#### Update Brand

```http
  POST /api/update-brand
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `BrandName` | `string` | **Required**. Enter Brand Name|
| `BrandImage` | `string` |Upload Brand Image|

#### Delete Brand

```http
  POST /api/delete-brand
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. Enter ID to delete Brand|



## PRODUCT

#### Add Product

```http
  POST /api/create-product
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**  Enter Product Name|
| `description` | `string` | **Required**. Write description about Product|
| `price` | `number` | **Required**. Enter Product price|
| `rating` | `string` | Enter Product Rating|
| `images` | `string` | **Required**. Upload Product Images|
| `category` | `string` | **Required**. Enter Product Category|
| `brand` | `string` | **Required**.Enter Product Brand|
| `thumbnail` | `string` | **Required**. Upload Product Thumbnail|

#### GET All Products

```http
  GET /api/get-all-product
```
  | `Description`                |
  :------------------------- |
| This API returns a list of all Products

#### GET Product by ID

```http
  GET /api/get-product-by-id?_id=64c94b4dc066b30ba2b97a89
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. Enter ID|

#### GET Product by Brand

```http
  GET /api/get-product-by-brand?brand=Dior
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `brand` | `string` | **Required**. Enter Product Brand|

#### GET Product by Category

```http
  GET /api/get-product-by-category?category=Fragrance
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `BrandName` | `string` | **Required**. Enter Product Category|

#### Update Product

```http
  POST /api/update-product
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**  Enter ID|
| `name` | `string` |  Enter Product Name|
| `description` | `string` | Write description about Product|
| `price` | `number` |Enter Product price|
| `rating` | `string` | Enter Product Rating|
| `images` | `string` |  Upload Product Images|
| `category` | `string` | Enter Product Category|
| `brand` | `string` | Enter Product Brand|
| `thumbnail` | `string` | Upload Product Thumbnail|

#### Delete product

```http
  POST /api/delete-product
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. Enter ID to delete Product|


## ORDER

#### Place ORDER

```http
  POST /api/create-order
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `items` | `Array` | **Required** Enter list of items in array|
| `totalBill` | `string` | **Required**. Enter total amount|
| `customerAddress` | `string` | **Required**. Enter Customer Address|
| `customerContact` | `string` | **Required**. Enter Customer Contace No|
| `customerName` | `string` | **Required**. Enter Customer Name|
| `customerEmail` | `string` | **Required**. Enter Customer  email|

#### GET All ORDERS

```http
  GET /api/get-all-order
```
  | `Description`                |
  :------------------------- |
| This API returns a list of all ORDERS

#### GET ORDER by ID

```http
  GET /api/get-order-by-id?_id=64e0e8efc84d52a5b1edc4b9
```
  
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | **Required**. Enter ID |
