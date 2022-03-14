'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'user_uuid',
        as: 'post'
      })
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Harap Isi Nama User" },
        notEmpty: { msg: "Nama User Tidak Boleh Kosong" }
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Harap Isi Email User" },
        notEmpty: { msg: "Email User Tidak Boleh Kosong" },
        isEmail: { msg: "Email Tidak Valid" }
      }
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Harap Isi Role User" },
        notEmpty: { msg: "Role User Tidak Boleh Kosong" },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return User;
};