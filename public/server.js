// server.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

app.get('/',(res,req)=>{
     res.render('index');
 });
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});