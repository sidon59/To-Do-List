// server.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

// Serve directory
app.use(express.static(__dirname));

//app.get('/',(res,req)=>{
  ///   res.render('index');
 //33});
// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});