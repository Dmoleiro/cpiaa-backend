# cpiaa-backend
Node app to add BE support to the cpiaa-site 
Evoked via POST to https://www.cpiaa.site/send-email

# Dependencies
Due to compatibility issues and node version availability on cpanel we nee to run and build this
with node 14
- nvm use 14
- need to have .env configured with REMOTE_CLIENT_APP=XXXXXX
- need to have config.txt file configured with email auth

# Run Local:
- npx tsx
- node dist/app.js

# Prepare Deploy:
- npx tsc
- logic to cPanel and on the file explorer navigate to the correct directory
- copy the following files to the root (config.txt, app.js, .env, package.json, package-lock.json)
- in cPanel stop the node app, install dependencies and start the app again
- make sure .env values are correct

# compile the app:
```npx tsc```

# run
```node dist/app.js```