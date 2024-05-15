const express = require('express');
const cors = require('cors');

const app = express();
const connectDB = require('./config/data');
const router = require('./router');
const { requestPaymentZaloPayload } = require('./helpers/ZaloPay.helper');

app.use(express.static('uploads'));

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
router(app);

connectDB();
app.listen(5000, async () => {
  console.log('Chạy Thành Công cổng 5000');
});
