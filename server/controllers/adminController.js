import User from "../models/User.js";

export const getPendingTechnicians = async (req, res) => {
  const techs = await User.find({
    role: "technician",
    isApproved: false,
  }).select("-password");

  res.json(techs);
};

export const approveTechnician = async (req, res) => {
  const { id } = req.params;

  const tech = await User.findById(id);
  if (!tech || tech.role !== "technician") {
    return res.status(404).json({ message: "Technician not found" });
  }

  tech.isApproved = true;
  await tech.save();

  res.json({ message: "Technician approved successfully" });
};

export const getApprovedTechnicians = async (req, res) => {
  const techs = await User.find({
    role: "technician",
    isApproved: true,
  }).select("name email");

  res.json(techs);
};
