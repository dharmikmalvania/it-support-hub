import User from "../models/User.js";
import bcrypt from "bcryptjs";

/* GET PROFILE */
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

/* UPDATE PROFILE (NAME + AVATAR) */
export const updateProfile = async (req, res) => {
  const { name, avatar } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (name) user.name = name;
  if (avatar) user.avatar = avatar;

  await user.save();
  res.json({ message: "Profile updated successfully" });
};

export const uploadAvatar = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  user.avatar = `/uploads/avatars/${req.file.filename}`;
  await user.save();

  res.json({
    message: "Avatar updated",
    avatar: user.avatar,
  });
};


/* CHANGE PASSWORD (NO OTP) */
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password changed successfully" });
};

/* TOGGLE EMAIL NOTIFICATION */
export const toggleNotification = async (req, res) => {
  try {
    console.log("🔄 TOGGLE HIT");
    console.log("User ID:", req.user._id);
    console.log("Body:", req.body);

    const user = await User.findById(req.user._id);

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Before update:", user.notificationEnabled);

    user.notificationEnabled = req.body.notificationEnabled;

    await user.save();

    console.log("After update:", user.notificationEnabled);

    res.json({
      notificationEnabled: user.notificationEnabled,
    });

  } catch (error) {
    console.error("❌ TOGGLE ERROR:", error);
    res.status(500).json({ message: "Toggle failed" });
  }
};



