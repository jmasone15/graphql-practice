const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to database
connectDB();

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development"
}));

app.use(morgan("tiny"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.magenta.bold.underline);
});