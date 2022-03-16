const { User } = require('../models')

// rizky
const CreateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body

    const newUser = await User.create({
      name,
      email,
      role
    })
    return res.status(201).json({
      message: "User Sucessfully Created",
      data: newUser
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

// alifiandy
const GetAllUsers = async (req, res) => {
  try {
    const userList = await User.findAll();
    if (userList) {
      res.status(200).json({
        message: "Successfully get user data",
        data: userList,
      });
    } else {
      res.status(404).json({
        message: "User Data Is Empty"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

// juan
const GetUserById = async (req, res) => {
  try {
    const userSelected = await User.findOne({
      where: {
        uuid: req.params.id
      },
      include: ["post"]
    })

    if (userSelected) {
      res.status(200).json({
        message: "Successfully get user data",
        data: userSelected,
      });
    } else {
      res.status(404).json({
        message: "User Data Not Found"
      });
    }

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}


const DeleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findByPk(req.params.id)
    if (userToDelete) {
      const deleted = await User.destroy({
        where: {
          uuid: req.params.id
        }
      })
      res.status(200).json({
        message: "SUCCESS",
      })
    } else {
      res.status(404).json({
        message: "User Data Not Found"
      })
    }


  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const EditUser = async (req, res) => {
  try {
    const uuid = req.params.id
    const { name, email, role } = req.body

    const user = await User.findOne({
      where: {
        uuid: uuid
      }
    })

    if (!user) {
      res.status(404).json({
        message: "User Data Not Found"
      })
    }

    if (name) {
      user.name = name
    }
    if (email) {
      user.email = email
    }
    if (role) {
      user.role = role
    }

    await user.save()

    return res.status(200).json({
      message: "User Successfully Updated",
      data: user
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  CreateUser,
  GetAllUsers,
  GetUserById,
  EditUser,
  DeleteUser
}