"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample users into the Users table
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          slug: "john-doe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Smith",
          slug: "jane-smith",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alice Johnson",
          slug: "alice-johnson",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Delete the inserted users
    await queryInterface.bulkDelete("Users", null, {});
  },
};