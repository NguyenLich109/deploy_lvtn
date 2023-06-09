import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        date: {
            type: String,
        },
        sex: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        cmnd: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        resetPasswordToken: {
            type: String,
            required: false,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        isNv: {
            type: Boolean,
            required: true,
            default: false,
        },
        homeTown: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        country: {
            type: String,
        },
        image: {
            type: String,
        },
        disabled: {
            type: Boolean,
            require: true,
            default: false,
        },
        gift: {
            type: Array,
        },
    },
    {
        timestamps: true,
    },
);

// Login
userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

// Register
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// quen mk
const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

const User = mongoose.model('User', userSchema);
export default User;
// module.export {User, validate}
