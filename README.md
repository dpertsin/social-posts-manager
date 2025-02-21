# Social Posts Manager (Purple.sky)

Social Posts Manager is a full-stack web application that integrates user-created content with interactive features. The application allows users to create and manage posts, register and log in, and “like” posts. The application is built using React, Redux Toolkit, React Query, Material UI, Node.js, Express, MongoDB, and JWT.

You can also see the demo video here: 

[![Demo Video](https://img.youtube.com/vi/7lOhrXCp0hc/0.jpg)](https://www.youtube.com/watch?v=7lOhrXCp0hc)


# Installation steps 

## 1. Clone the repository

```bash
git clone 
cd social-posts-manager
```

## 2. Install dependencies

### Install dependencies for client

```bash
cd client
npm install
```

### Install dependencies for server

```bash
cd server
npm install
```
## 3. Set up MongoDB

You can either use a local MongoDB instance or set up a free MongoDB Atlas cluster.

In my case I am using MongoDB Atlas.

### Set up MongoDB Atlas

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

2. Follow the steps.

3. Create a Project.

3. Inside the Project, create a new cluster.

4. Click on `Connect` and then click on `Connect your application`.

5. Copy the connection string and replace the password with your password. It should look something like this:

```bash
mongodb+srv://<username>:<db_password>@<cluster-url>/?retryWrites=true&w=majority&appName=<cluster-name>
```

6. You will need to replace only the `db_password`, because Atlas already fills the others fields.

7. You are done. Keep the string, because you are going to need in on the `.env` of our `server`.

### IMPORTANT

Don't forget to add your IP address to the IP Whitelist in the Network Access tab of your cluster.

You can easily do it in the Dashboard of the cluster, on the `Network Access` and there add your ip address.


## 4. Set up environment variables

Create a `.env` file in the `server` directory and add the following environment variables:

```bash
PORT=3000
MONGO_URI={your_mongo_uri} // mongodb connection string
JWT_SECRET={your_jwt_secret} // can be any string, we are using this for jwt token generation
```

Create a `.env` file in the `client` directory and add the following environment variables:

```bash
VITE_SERVER_URL=http://localhost:3000 // server url
```

## 5. Run the application

### Run the server

```bash
cd server
npm start
```

### Run the client

```bash
cd client
npm run dev
```

The application will be running at [http://localhost:5173/](http://localhost:5173/) and the server will be running at [http://localhost:3000/](http://localhost:3000/)

If you see these messages on the terminal of the server, you have successfully set up the application:

```bash
🏃💨 Server is running at http://localhost:3000 👀
🍃 MongoDB connected
```

and also for the client:

```bash
  VITE v6.1.0  ready in 552 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## 6. Testing 


### Client

You can test the application by running the following command:

```bash
cd client
npm run cy:open
```

### Server 

You can test the application by running the following command:
```bash
cd server
npm test
```

## 7. Enjoy

You can now enjoy the application. You can create an account, login, create posts, like posts, populate 100 posts, and much more.

# Features

You can read the full requirements [here](./docs/requirements.md).

- User Registration & Authentication
- Posts Management
- Post Interaction
- Data Persistence

# Documentation of the project

## Client

The client is built using React, Redux Toolkit, React Query, Material UI, and Vite. It provides a responsive and interactive user interface for managing social posts. The application leverages Redux Toolkit for state management, React Query for data fetching and caching, Material UI for UI components, and Vite for fast development and build processes.

You can read the full documentation [here](./docs/client.md).

## Server

The server is built using Node.js, Express, MongoDB, and JWT. It handles the backend logic, including user authentication, post management, and data persistence. The server uses MongoDB for the database, Express for the web framework, and JWT for secure authentication and authorization.

You can read the full documentation [here](./docs/server.md).