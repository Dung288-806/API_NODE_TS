import mongoose from 'mongoose'

const URL = "mongodb://127.0.0.1:27017/API_NODE_TYPE";

mongoose.connect(URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('DB connection is ok');
}).catch((e) => {
  console.log('DB not connection: ', e + ' ');
});
