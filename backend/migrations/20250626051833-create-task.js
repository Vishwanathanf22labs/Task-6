'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Tasks', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    },
    completed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    inactive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });
  await queryInterface.addIndex('Tasks', ['inactive']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Tasks');
}