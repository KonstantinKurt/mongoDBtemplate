const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express'),
     swaggerDocument = require('./swagger.json');
const connectDB = require('./connections/localMongoConnection.js');
const userRouter = require('./routes/userRouter.js');
const articleRouter = require('./routes/articleRouter.js');
const commentRouter = require('./routes/commentRouter.js');
const inheritDiscriminatorRoutes = require('./routes/inheritDiscriminatorRoutes.js');
const aggregationRouter = require('./routes/aggregationRouter.js');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(__dirname + '/images'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', userRouter);
app.use('/', articleRouter);
app.use('/', commentRouter);
app.use('/', inheritDiscriminatorRoutes);
app.use('/aggregation', aggregationRouter);

app.get("/",(req,res)=>{
    res.send(`mongoDBtemplate`);
});

app.listen(process.env.PORT, `0.0.0.0`,() => {
    console.log(`Server runs on http://localhost:'  ${process.env.PORT}  '; Ctrl+C for exit `);
    connectDB();
});

// DeprecationWarning: collection.ensureIndex is deprecated. Can be ignored or silence it with the node flag --no-deprecation
// mongoose.Promise = global.Promise
