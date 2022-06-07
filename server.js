const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const PORT = process.env.PORT || 3001;
const app = express();

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development"
}))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});