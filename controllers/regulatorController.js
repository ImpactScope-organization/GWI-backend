const RegulatorModal = require("../model/regulatorModel");

const regulatorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await RegulatorModal.findOne({ email, password });

    if (!oldUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = password == oldUser.password;

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    return res.status(200).json({ result: oldUser.email });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// Get All Product (Admin)
const getUser = async (req, res) => {
  const users = await RegulatorModal.find();

  res.status(200).json({
    success: true,
    users,
  });
};

module.exports = {
  regulatorLogin,
  getUser,
};
