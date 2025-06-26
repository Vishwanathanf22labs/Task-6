const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

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
  },
  inactive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'Tasks',
  timestamps: true,
 
  defaultScope: {
    where: {
      inactive: false
    }
  },
  scopes: {
    
    withInactive: {
      where: {}
    },
  
    onlyInactive: {
      where: {
        inactive: true
      }
    }
  }
});

module.exports = Task;