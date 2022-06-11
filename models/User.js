const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please add a password"]
        },
        projects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project"
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema);