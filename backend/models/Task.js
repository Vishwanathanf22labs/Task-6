import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

class Task extends Model {}

Task.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'Tasks', 
  timestamps: true,
});

export default Task;
