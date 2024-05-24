import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelizeConnection from '..';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    //Fields are optional when calling UserModel.create() or UserModel.build()
    id: CreationOptional<string>;
    username: string;
    email: string;
    password: string;

}

const User = sequelizeConnection.define<UserModel>('User', {
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
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
  }
}, { timestamps: true });

export default User;
