### Next-API

- This is a NextJs 15 project focusing on API devleopment with mongo db database

- APIs we have created:-

  - For **todos** feature
    - /api/users
    - /api/categories
    - /api/todos
    - /api/todos/:todoId

### How to run locally

- Create a `.env` file and add `DATABASE_URI` variable value

### Things in consideration

- Keeping mongo db connection in cache to protect against multiple connectiosn creation issue on hot-reload

- Handling "Schema not defined Error" by always importing all the models in all route.js

- Accessing `params` should be `awaited`

- **204** status need to be send as `return new Response(null, {status: 204})`
