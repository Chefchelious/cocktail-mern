import { Schema, model, Model, HydratedDocument } from 'mongoose';
import { IUser } from '../types';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const SALT_WORK_FACTOR = 7;

interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type TUserModel = Model<IUser, NonNullable<unknown>, IUserMethods>;

const UserSchema = new Schema<IUser, TUserModel, IUserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<IUser>, email: string) {
        if (!this.isModified('email')) return true;
        const user = await User.findOne({ email });

        if (user) return false;
      },
      message: 'This user is already registered',
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
  token: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: [true, 'Path `display name` is required'],
  },
  googleId: String,
  avatar: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret.password;

    return ret;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

const User = model<IUser, TUserModel>('User', UserSchema);

export default User;
