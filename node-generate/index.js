const express = require('express');

const app = express();

app.post('/generate', (req, res) => {
  setTimeout(() => {
    res.send({
      success: true,
      data: 'ok',
    });
  }, 1000);
});

app.listen(30002, () => console.log('启动成功'));
