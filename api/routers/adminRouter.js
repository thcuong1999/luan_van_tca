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
const upload = require("../middleware/imageUpload");

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

// cap nhat thong tin ca nhan
adminRouter.put(
  "/capnhatthongtincanhan",
  upload.single("avatar"),
  async (req, res) => {
    const { ten, sdt, email, tinh, huyen, xa, matkhau, user } = req.body;
    // return res.send(req.body);
    try {
      // update password
      if (matkhau) {
        const _user = await User.findById(user);
        _user.matkhau = bcrypt.hashSync(matkhau, 8);
        await _user.save();
      }
      // update info
      const admin = await Admin.findOne({ user });
      admin.ten = ten;
      admin.sdt = sdt;
      admin.email = email;
      admin.xa = xa;
      admin.huyen = huyen;
      admin.tinh = tinh;
      admin.avatar = req.file ? req.file.filename : admin.avatar;
      const updatedAdmin = await admin.save();

      res.send({ updatedAdmin, success: true });
    } catch (error) {
      res.send({ message: error.message, success: false });
    }
  }
);

// tong quan admin
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
    const admin = await Admin.findOne({ user: req.params.userId }).populate(
      "user"
    );
    res.send({ admin, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = adminRouter;
