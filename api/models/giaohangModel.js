const mongoose = require("mongoose");

const giaohangSchema = new mongoose.Schema(
  {
    giamsatvung: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Giamsatvung",
    },
    daily1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daily1",
    },
    daily2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daily2",
    },
    hodan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hodan",
    },
    donhang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donhang",
    },
    dssanpham: [
      {
        sanpham: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sanpham",
        },
        soluong: Number,
        soluonghoanthanh: Number,
        danhan: Number,
        dagiao: Number,
      },
    ],
    ngaygiao: String,
    ngaynhan: String,
    xacnhan: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Giaohang = mongoose.model("Giaohang", giaohangSchema);

module.exports = Giaohang;
