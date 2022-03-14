'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "user_uuid",
        as: "user"
      })
    }
  }
  Post.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Harap Isi Title Post" },
        notEmpty: { msg: "Title Post Tidak Boleh Kosong" }
      }
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Harap Isi Content Post" },
        notEmpty: { msg: "Content Post Tidak Boleh Kosong" },
      }
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: { msg: "Harap Isi User_UUID" },
        notEmpty: { msg: "User_UUID Tidak Boleh Kosong" },
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'post',
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Post;
};