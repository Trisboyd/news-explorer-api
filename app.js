// dependencies________________________________________________________________depedencies
const express = require('express');


// PORT
const { PORT = 3000 } = process.env;

// Variables
const app = express();

app.listen(PORT, () => {
    console.log('App is listening at port `${PORT}');
})