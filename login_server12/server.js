const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./api/User');
const app = express();
require('dotenv').config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri || "mongodb+srv://admin:admin@cluster0.3psk5.mongodb.net/SELIMPFE?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('**database works!!**');
})
app.use(express.json({ extended: false }));
//express session
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT} `);
  })
  app.use('/users',UserRouter);
  /*bcehir*/
