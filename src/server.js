const app = require("./app");
const port = process.env.PORT || 3000;
const connectDatabase = require("./config/database")

connectDatabase();

app.listen(port, () => {
  console.log(`Server is working on port ${port}`)
})
