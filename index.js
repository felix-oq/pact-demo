const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send( "Hello world" );
});

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));