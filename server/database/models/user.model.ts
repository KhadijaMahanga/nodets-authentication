import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';

import sequelizeConnection from '..';
import { jwr_secret } from '../../config';

const SALT_ROUNDS = 12;

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<string>; //Optional field when calling UserModel.create() or UserModel.build()
    name: string | null;
    email: string;
    password: string;
   //email confirmation token
//     confirmationToken: CreationOptional<string>;
//     confirmationDate: CreationOptional<Date>;
//     passwordResetToken: CreationOptional<string>;
//     verified: CreationOptional<boolean>;

   
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
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // verified: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    //   allowNull: true,
    // },
    // confirmationToken: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    // confirmationDate: {
    //     type: DataTypes.DATE,
    //     allowNull: true,

    // },
    // passwordResetToken: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
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
    try {
        return await bcrypt.compare(candidate, this.password);
    } catch (e) {
        console.log("Could not validate passoword", e);
        return false;
    }
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

// import { Optional } from 'sequelize';
// import { Table, Model, Column } from 'sequelize-typescript';

// import sequelizeConnection from '..';

// interface UserAttributes {
//     id: string; 
//     name: string;
//     email: string;
//     password: string;
    
// }

// interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'name'> {}

// @Table ({
//     timestamps: true,
// })
// class User extends Model<UserAttributes, UserCreationAttributes> {
//     @Column
//     id: string;



// }