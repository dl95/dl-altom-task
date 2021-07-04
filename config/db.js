var username = "test12";
var secrete = "0Tq6mCXOaQtV7q79";
var collection = "demo-test";
const uri =
  "mongodb+srv://" +
  username +
  ":" +
  secrete +
  "@cluster0.pz8ht.mongodb.net/" +
  collection +
  "?retryWrites=true&w=majority";
module.exports = uri;
