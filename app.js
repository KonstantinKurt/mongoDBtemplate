const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./connections/localMongoConnection.js');  
const userRouter = require('./routes/userRouter.js');
const postRouter = require('./routes/postRouter.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(__dirname + '/images'));

app.use('/', userRouter);
app.use('/', postRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server runs on http://localhost:'  ${process.env.PORT}  '; Ctrl+C for exit `);
    connectDB();
});

// DeprecationWarning: collection.ensureIndex is deprecated. Can be ignored or silence it with the node flag --no-deprecation
// mongoose.Promise = global.Promise