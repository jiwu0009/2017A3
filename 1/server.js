const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let snacks = []; // 用于存储零食数据的数组

app.post('/add-snack', (req, res) => {
    const snack = req.body;
    snacks.push(snack); // 将零食添加到数组
    res.json(snack);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
