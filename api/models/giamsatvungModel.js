const mongoose = require("mongoose");

const giamsatvungSchema = new mongoose.Schema(
  {
    ten: String,
    sdt: String,
    email: String,
    cmnd: String,
    xa: String,
    huyen: String,
    tinh: String,
    avatar: String,
    loaisanpham: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoaiSanpham",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bophankd: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bophankd",
    },
    daily1: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily1",
      },
    ],
    daily2: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Daily2",
      },
    ],
    donhang: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donhang",
      },
    ],
    subdonhang: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donhang",
      },
    ],
    dssanpham: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        sanpham: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sanpham",
        },
        soluong: Number,
        soluonghoanthanh: Number,
        danhan: {
          type: Number,
          default: 0,
        },
        dagiao: {
          type: Number,
          default: 0,
        },
        ngaytao: String,
      },
    ],
    dscongcu: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        congcu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Congcu",
        },
        loi: {
          soluongloi: Number,
          ngaybaoloi: String,
        },
        soluong: Number, // = số lượng sp đặt * định mức công cụ
        ngaytao: String,
      },
    ],
    dsvattu: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        vattu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vattu",
        },
        loi: {
          soluongloi: Number,
          ngaybaoloi: String,
        },
        soluong: Number, // = số lượng sp đặt * định mức công cụ
        ngaytao: String,
      },
    ],
    dsnguyenlieu: [
      {
        donhang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Donhang",
        },
        nguyenlieu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Nguyenlieu",
        },
        loi: {
          khoiluongloi: Number,
          ngaybaoloi: String,
        },
        khoiluong: Number, // = số lượng sp đặt * định mức công cụ
        ngaytao: String,
      },
    ],
    dsgiaohang: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Giaohang",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Giamsatvung = mongoose.model("Giamsatvung", giamsatvungSchema);

module.exports = Giamsatvung;
