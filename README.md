# Express Project Architecture

紀錄 express 的專案架構方式，檔案分類的方式是依照，程式的工作類型與服務的對象進行分類，並使用物件導向的方式來做設計，依照 MVC 的思維來建構，並逐步修改其中不足的地方。

![layered-architecture.png](https://github.com/et860525/express-project-architecture/blob/main/layered-architecture.png)

# Table of contents:

- [Environments](#environments)
  - [Env example](#env-example)
- [Project Structure](#project-structure)
- [Packages](#packages)

# Environments

需要在 `./src` (or `./dist`) 下，建立一個 `environments` 資料夾，來存放不同環境下的環境變數：

- `development.env`
- `production.env`

## Env example

```env
PORT=3000
DB_USER=username
DB_PWD=password
DB_NAME=db_name
```

# Project Structure

不論有沒有使用 TypeScript 都可以根據該專案的結構來做，只是 TypeScript 會多一些檔案。

以下是結構的解釋：

| Name | Description |
| ---- | ---- |
| .gitignore | 設定哪一些檔案會被 git 忽略 |
| package.json | 包含 npm 的相依項與 script |
| *.rest | [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 是測試 Api 的檔案 |
| tsconfig.json | 編譯 TypeScript 的各項設定 |
| .src/bases | 設定**物件**( controller, route... ) 的基礎檔案 |
| .src/common | 不屬於特定服務對象的功能 |
| .src/dtos | 存放 DTOs |
| .src/exceptions | 存放錯誤處理檔案 |
| .src/main | 存放 Routes, Controller, Service |
| .src/middleware | 存放中間件 |
| .src/models | 存放 Schema 相關設定的檔案 |
| .src/repositories | 建立 repository 物件 |
| .src/types | 設定基本參數的類型 |
| .src/validators | 供 Schema 欄位的驗證 |
| app.routing.ts | 集中所有的 routes |
| app.ts | Express App 物件 |
| server.ts | 伺服器的 Entry Point |

使用 TypeScript 編譯 `./src` 後，會出現 `./dist` 資料夾，裡面是編譯後的 `.js`。

如果有需要也可以額外新增一個 `./views` 資料夾。

# Packages

- express
- typescript
- dotenv
- mongoose
- helmet
- cors
