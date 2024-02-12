<h1> Easygenerator Interview Backend </h1>

<h2> Description </h2>

This is the backend part of the easygenerator interview challenge 

<h2>Getting Started </h2>

<h3>Installing packages</h3>

```bash
$ npm install
```
OR 
```bash
  yarn i
```

<h3> Setting up env vars </h3>

  - Create a `.env` at the root level of the project and copy the content of `.env.sample` over
  - Update the `MONGODB_URI` with a valid mongodb URI. 
  - Update the `JWT_SECRET` var with the correct secret


<h2> Running the app </h2>
 
```bash
  # development
  $ npm run start

  # watch mode
  $ npm run start:dev

  # production mode
  $ npm run start:prod
```

 The app is should be running on `localhost:<PORT>` 



