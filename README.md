# Bolly's shopping list

This app was built to serve a real need - making it easier to plan our weekly shop, but it has a secondary purpose as a non-trivial app for me to practice working with various technologies, including React, Redux, Material UI, GraphQL & Hasura.

I'm using Hasura for the back-end - it's currently all CRUD db operations so there is some business logic in the UI - not ideal but it's a small enough project that I figure it's better than a whole other app in the stack. However I might try to use Hasura Actions and some stored SQL procedures, or even a Node.js backend for the more complicated stuff eventually.

I also aim to convert to Typescript and add some more tests at some point, and maybe add third party authentication with Auth0 or something.

## Instructions for use

If you want to run a version of this yourself locally, follow these steps after cloning the repo to your local machine:

1. Sign up for a free Heroku account for hosting the Hasura back-end - https://signup.heroku.com/
2. Use Hasura's "One-click deploy" to Heroku to set up a new Hasura instance - https://hasura.io/docs/1.0/graphql/manual/guides/deployment/heroku-one-click.html
3. Choose a password for the backend - this will also be the password with which you log into the web app as a user (it gets stored in localStorage so pick something that's not also your banking password).
4. Within the Heroku dashboard for your app, navigate to Settings, hit the "Reveal Config Vars" button, and add a new config var called HASURA_GRAPHQL_ADMIN_SECRET. The value will be your password.
5. Open the Hasura app from the Heroku dashboard if it's not open already. Note the "GraphQL Endpoint" value on the GRAPHIQL tab - you'll need it later.
6. Navigate to the DATA tab within the Hasura app, and hit the SQL tab on the left.
7. Open the /db/db-definition.sql file from this application and paste the entire thing into the Raw SQL input in Hasura and click the "Run!" button.
   - You might want to tweak the last two statements before doing this. They load some basic static data into the app, such as common units of measurement (ml, grams etc) and also an ordered list of areas of the local supermarket. This is used to automatically order the shopping list based on your route round the store.
8. Back on the main DATA tab - click the button that says "Track all relationships".
9. Either create a file called .env.local in the top-level project directory, or edit the existing .env file instead. Either way, it needs to look just like the .env file currently does but changing the three values as follows:
   - REACT_APP_API_URL should be that URL from step 5.
   - REACT_APP_API_WS_URL should be that same URL but with a wss:// prefix rather than an https:// prefix.
   - PUBLIC_URL should just be "/" for a local install.
10. Install node & npm if you haven't already - https://www.npmjs.com/get-npm
11. At the command line, navigate to the project top-level directory and install everything using `npm install` - will take a while.
12. Still at the command line, run `npm start` - this should fire up a local version of the app at localhost:3000 in your default browser, showing the login page.
13. Enter your password from step 3 at the login page to access the app.
