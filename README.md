# KintoHub Express Example

## Overview

Basic catalog system to manage stock information.


## Installation & Local Run
Ensure you have node 14.17.6 or higher.

1. Create empty postgres database
2. `npm install`
3. `npx sequelize-cli db:migrate`
4. `npm run dev`

## Usage
### Environment Variables
JTW_SECRET
DB_USERNAME
DB_PASSWORD
DB_DATABASE
DB_HOST

### API Call
Local:
```
curl -X GET http://localhost:3000/api/v1/stocks
```

### Response
```json
[
    {
        "id": 1,
        "ticker": "112212",
        "name": "Cleaner",
        "price": "223.55",
        "categoryId": 1,
        "createdAt": "2022-02-09T06:00:00.000Z",
        "updatedAt": "2022-02-09T06:00:00.000Z"
    }
]
``` 