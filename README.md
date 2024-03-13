# 2023-09-wns-blanc-green-step

## Initializing Repository:

0 - Start By Cloning this Repository (git clone)

### Frontend :

1- create this file :
next-env.d.ts

```
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

2- Create this file with your backend url as key:
.env.local

```
NEXT_PUBLIC_API_LINK=http://localhost:5000/graphql
```

---

### Backend :

3-Create this file:
.env

```
PORT=5000
DB_PORT=5432
USERNAME=green_step
PASSWORD=green_step
DATABASE=green_step_db
```

4-docker-compose up

# Frontend Testing with Report File

> npx playwright test

- specific frontend testing, using this command could be the best :

  > npx playwright test tests/addExpense.test.ts --headed

- test docker | takes some time ...

  > docker compose -f docker-compose.e2e.yml up --build --exit-code-from e2e

- frontend test which open last report in browser

  > npx playwright show-report

- To connect to backend container:

  > 1 - docker ps

  > 2 - choisir le containerID

  > 3 - docker exec -it containerID sh

- Jest Installation :
  > npm install jest ts-jest @types/jest
