import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    bio: {
      type: String,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequestsSent: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    channels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
    created_channels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    online: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (password, next) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    return next(error);
  }
};

export const User = mongoose.model("User", userSchema);
