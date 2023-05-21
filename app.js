const express= require('express')
// const path= require('path')
const cors= require('cors');
const bodyParser=require('body-parser');

const adminRoutes=require('./router/admin')
const db=require('./utils/database')

const app= express();

app.use(cors())
app.use(adminRoutes)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000)