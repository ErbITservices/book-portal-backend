const express = require('express')
// const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')
const adminRoute= require('./routes/adminRoute')
const scheamRoute= require('./routes/sheamRoute')
const bookeEntryRoute = require('./routes/bookEntryRoute')
const CategoryNameRoute = require('./routes/categoryNameRoute')
const base_url= process.env.BASE;



//configuer  env 
dotenv.config();

//database config
connectDB();

//rest object
const app = express()
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));
// app.use(bodyParser.json()); 

const corsOptions = {
    origin:"https://erb-book-portal.netlify.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  //middelwares
  app.use(cors(corsOptions));

app.use(express.json())

app.get('/', function (req, res) {
  res.send('Hello World')
})

//routes
 app.use('/api/v1/admin',adminRoute)
 app.use('/api/v1/scheam',scheamRoute)
 app.use('/api/v1/bookeEntry',bookeEntryRoute)
 app.use("/api/v1/CategoryName", CategoryNameRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})