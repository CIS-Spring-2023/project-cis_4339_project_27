# Data Platform Project Setup

This project has been developed over time by students in the CIS 4339 course.

The current iteration is based on development done by Elliot Farmer Garcia, Agatha	Molski and Chris	Blanco in Fall of 2022.

Requirements:

This project uses NodeJS and MongoDB.

## Backend Node Application
```
cd backend
```
Follow instructions in backend README for setup and running as a local instance.

## Frontend Vue 3 Application
```
cd frontend
```
Follow instructions in frontend README for setup and running as a local instance.

## Development Branch

Branch used for testing code before pushing to main branch.

## Sprint 2 Documentation

For sprint 2 documentation, please refer to the README file inside
the frontend folder.

## Sprint 3 Documentation

For sprint 3 documentation, please refer to the README file inside
the frontend and backend folder with '-- Sprint 3 Documentation' title.

## Cloud Deployment

The web application has been deployed to the cloud using Railway. Before deploying the app to the cloud, one member of the group
created a private repo in github and pushed the whole app on that repo. We then created a new project inside Railway and connected
the private github to it. We created 2 instance of this project to handle both backend and frontend side of the application.
In the frontend instance settings, we changed the root directory to refer to the frontend folder in the repository and added a deploy start
command "npm start -- --host". We also setup the env variable with the vite_root_api referencing the backend instance. For the backend instance, we also changed the root directory to refer to its folder and but added a build command instead with "npm installl". The env variable
for this instance is the same as the .env file that was used to run the app locally.

This is the link to the web app in the cloud: https://cis4339-27.up.railway.app/
