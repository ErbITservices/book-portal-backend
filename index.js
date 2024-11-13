const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')
const adminRoute= require('./routes/adminRoute')
const scheamRoute= require('./routes/sheamRoute')
const bookeEntryRoute= require('./routes/bookEntryRoute')
const base_url= process.env.BASE;



//configuer  env 
dotenv.config();

//database config
connectDB();

//rest object
const app = express()

const corsOptions = {
    origin:`${base_url}`,
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

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})