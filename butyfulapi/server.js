const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// modules
const config = require('./config');
const commonRoutes = require('./Routes/CommonRoutes');
const itemMasterRoutes = require('./Routes/ItemMasterRoutes');
const productioRoutes = require('./Routes/ProductioRoutes');
const permissionRoutes = require('./Routes/PermissionRoutes');
const moduleRoutes = require('./Routes/ModuleRoutes');
const categoryRoutes = require('./Routes/CategoryRoutes');
const tableNoRoutes = require('./Routes/TableNoRoutes');
const dashboardRoutes = require('./Routes/DashboardRoutes');

const { signIn, welcome, getPlayload } = require('./middleware/Auth');

const port = process.env.PORT;


app.use(cookieParser());
app.use(session({
    secret: "Shh, its a secret!",
    saveUninitialized: true,
    resave: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.send("Api Start.......")
})

//Authentication Route

app.post('/auth/login',signIn);

app.get('/auth/playload',getPlayload);

// Common Routes

app.use('/common',commonRoutes);

// Dashboard Routes

app.use('/dashboard',dashboardRoutes);

// Item Master Routes

app.use('/itemmaster',itemMasterRoutes);

// Productio Routes

app.use('/production',productioRoutes);

// Permission Routes

app.use('/permission',permissionRoutes);

//Moduletbl Routes

app.use('/module',moduleRoutes);

//Category Routes

app.use('/category',categoryRoutes);

// TableNO Routes

app.use('/tableno',tableNoRoutes);

app.listen(port,() => {
    console.log(`Server is running on https://localhost:${port}/`);
})
