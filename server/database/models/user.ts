import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

import sequelizeConnection from '..';
import { jwr_secret } from '../../config';

const SALT_ROUNDS = 12;

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<string>; //Optional field when calling UserModel.create() or UserModel.build()
  name: string;
  email: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
  generateToken(): Promise<string>;
  //email confirmation token
  confirmationToken: string;
  confirmationDate: Date;
  passwordResetToken: string;
  verified: boolean;
}

const User = sequelizeConnection.define<UserModel>(
  'User',
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    confirmationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confirmationDate: {
        type: DataTypes.DATE,
        allowNull: true,

    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      async beforeSave(user) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      },
    },
  },
);

User.addHook.prototype.comparePassword = async function (candidate: string) {
  return await bcrypt.compare(candidate, this.password);
};

User.addHook.prototype.generateToken = function () {
  return jwt.sign(
    {
      id: this.id,
      username: this.email,
      exp: Math.floor(Date.now() / 1000) + 900,
    },
    jwr_secret as jwt.Secret,
  );
};

export default User;
