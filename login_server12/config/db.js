require('dotenv').config();
const mongoose= require('mongoose') ;
const MONGODB_URI ="mongodb+srv://bechir:1234@cluster0.hjqut.mongodb.net/UserDB?retryWrites=true&w=majority"; 

//mongoose.connect(MONGODB_URI,{useNewUrlParser: true,useUnifiedTopology: true }).then(() =>{ console.log(" Mongoose is connected");
//}).catch((e) => console.log(e))
mongoose.connect(MONGODB_URI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true});
const connex= mongoose.connection;
connex.once('open',() => {
    console.log("database works")
})