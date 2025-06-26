'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn('Tasks', 'inactive', {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  });

  await queryInterface.addIndex('Tasks', ['inactive']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeIndex('Tasks', ['inactive']);
  await queryInterface.removeColumn('Tasks', 'inactive');
}