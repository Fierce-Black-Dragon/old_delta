import mongoose, { Schema, Document, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: [40, " max 40 character"],
    },
    username: {
        type: String,
        required: true,
        maxlength: [30, " max 40 character"],
    },
    email: {
        type: String,
        required: [true, "Please enter the email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
        minlength: [6, "Please enter password greater than or equal to 6 char"],
        select: false,
    },

    status: {
        type: String,
        default: "offline"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // more fields will be added when required
});

//encrypt password before save -- mongoose Hook
userSchema.pre("save", async function (next) {
    //to prevent over-encryption of password
    if (!this.isModified("password")) {
        return next();
    }
    //encrypt
    this.password = await bcrypt.hash(this.password, 10);
});
// Mongoose Methods
//user password validate method
userSchema.methods.verifyPassword = async function (senderPassword: string) {
    const isValid = await bcrypt.compare(senderPassword, this.password);
    return isValid;
};

// jwt Access Token  creation
userSchema.methods.jwtAccessTokenCreation = async function () {
    let token = jwt.sign({ id: this._id }, process.env.ACCESS_KEY as Secret, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    return token;
};
// jwt tRefresh Token  creation
userSchema.methods.jwtRefreshTokenCreation = async function () {
    return jwt.sign({ id: this._id }, process.env.REFRESH_KEY as Secret, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });
};
declare interface IUser extends InferSchemaType<typeof userSchema> {
    verifyPassword(password: string): Promise<boolean>;
    jwtAccessTokenCreation(): string;
    jwtRefreshTokenCreation(): string;
}

const User = mongoose.model<IUser>("User", userSchema);
export default User