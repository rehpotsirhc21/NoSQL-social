const { Schema, model, Types } = require("mongoose");
const isEmail = require("validator");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail, "invalid email"],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of friends
UsersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})


const Users = model('Users', UsersSchema);


module.exports = Users;