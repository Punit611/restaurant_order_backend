const express=require("express");
const bodyparser=require("body-parser");
const mongodb=require("mongoose");
const path=require("path");
const session = require("express-session");
const MongoDBStore=require("connect-mongodb-session")(session);
const req = require("express/lib/request");
const port =process.env.PORT || 3000;
// const ip_config="192.168.52.150"

const orderRoutes=require("./routers/my_order");


const MONGODB_URI="mongodb+srv://punitsehrawat423:Punit611@cluster0.dhdwnxp.mongodb.net/";
// Punit611
const store=new MongoDBStore({uri:MONGODB_URI,collection:"sessions"});
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");
app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: store}));

app.get('/',async(req,res)=>{
    res.render("home.ejs");
});

app.use(orderRoutes);


app.listen(port,()=>{
    console.log("connected at ",port);
});


mongodb.connect(MONGODB_URI,()=>{
    console.log("Connected to mongoose");
});
