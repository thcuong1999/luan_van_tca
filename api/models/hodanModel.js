const mongoose = require("mongoose");

const hodanSchema = new mongoose.Schema(
  {
    daidien: String,
    xa: String,
    tinh: String,
    huyen: String,
    sdt: String,
    cmnd: String,
    namsinh: Number,
    avatar: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    langnghe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Langnghe",
    },
    loaisanpham: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoaiSanpham",
    },
    taikhoan: String,
    daily1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daily1",
    },
    daily2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Daily2",
    },
    active: {
      type: Boolean,
      default: false,
    },
    donhang: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Donhang",
      },
    ],
    dssanpham: [
      // => kho san pham
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
        dagiao: {
          type: Number,
          default: 0,
        },
        ngaytao: String,
      },
    ],
    dscongcu: [
      // => kho cong cu
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
      // => kho vat tu
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
      // => kho nguyen lieu
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
  },
  {
    timestamps: true,
  }
);

const Hodan = mongoose.model("Hodan", hodanSchema);

module.exports = Hodan;
