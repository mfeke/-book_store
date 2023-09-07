const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./app/routes/bookRoutes');


const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.01:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(()=>{
    console.log("Connected to the database ")
}).catch(err=>{
    console.log("Cannot connect to the database!", err);
    process.exit();
});


app.use(express.json());
app.use('/books', bookRoutes);
app.get('/',(req, res)=>{
    res.send("Server is running ")
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});