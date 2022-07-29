# Express Project Architecture

紀錄 express 的專案架構方式

# Table of contents:

- [Environments](#environments)
  - [Env example](#env-example)
- [Packages](#packages)

# Environments

需要在根目錄(root)下，建立一個 `environments` 資料夾，來存放不同環境下的環境變數：

- `development.env`
- `production.env`

## Env example

```env
PORT=3000
DB_USER=username
DB_PWD=password
DB_NAME=db_name
```

# Packages

- express
- typescript
- dotenv
- mongoose
- helmet
- cors
