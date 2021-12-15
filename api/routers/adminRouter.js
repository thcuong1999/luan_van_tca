const express = require("express");
const adminRouter = express.Router();
const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Bophankd = require("../models/bophankdModel");
const Giamsatvung = require("../models/giamsatvungModel");
const LoaiSanpham = require("../models/loaiSanphamModel");
const Congcu = require("../models/congcuModel");
const Vattu = require("../models/vattuModel");
const Nguyenlieu = require("../models/nguyenlieuModel");
const Sanpham = require("../models/sanphamModel");
const Donhang = require("../models/donhangModel");

// them admin
adminRouter.post("/them", async (req, res) => {
  const { ten, sdt, email, cmnd, diachi, taikhoan, matkhau } = req.body;
  try {
    // create account
    const newUser = new User({
      taikhoan,
      matkhau: bcrypt.hashSync(matkhau, 8),
      vaitro: "admin",
    });
    const savedUser = await newUser.save();
    // create admin collection document
    const newAdmin = new Admin({
      ten,
      sdt,
      email,
      cmnd,
      diachi,
      user: savedUser._id,
    });
    const savedAdmin = await newAdmin.save();
    res.send({ savedAdmin, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

adminRouter.get("/tongquan", async (req, res) => {
  try {
    const bpkd = await Bophankd.find({});
    const gsv = await Giamsatvung.find({});
    const loaisp = await LoaiSanpham.find({});
    const congcu = await Congcu.find({});
    const vattu = await Vattu.find({});
    const nglieu = await Nguyenlieu.find({});
    const sanpham = await Sanpham.find({});
    const donhang = await Donhang.find({ donhanggoc: true });

    res.send({
      bpkd: bpkd.length,
      gsv: gsv.length,
      loaisp: loaisp.length,
      congcu: congcu.length,
      vattu: vattu.length,
      nglieu: nglieu.length,
      sanpham: sanpham.length,
      donhang: donhang.length,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin admin based on userID
adminRouter.get("/baseduserid/:userId", async (req, res) => {
  try {
    const admin = await Admin.findOne({ user: req.params.userId });
    res.send({ admin, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = adminRouter;
