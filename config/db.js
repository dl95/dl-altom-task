var username = "your Username";
var secrete = "secrete key";
var collection = "collection name";
const uri =
  "mongodb+srv://" +
  username +
  ":" +
  secrete +
  "@cluster0.pz8ht.mongodb.net/" +
  collection +
  "?retryWrites=true&w=majority";
module.exports = uri;
