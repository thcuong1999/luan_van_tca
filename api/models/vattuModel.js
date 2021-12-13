const mongoose = require("mongoose");

const vattuSchema = new mongoose.Schema(
  {
    ten: {
      type: String,
      required: true,
    },
    mota: {
      type: String,
    },
    thuoctinh: [],
    hinhanh: {
      type: String,
    },
    congdung: {
      type: String,
    },
    soluong: {
      type: Number,
    },
    ngaytao: String,
    loi: {
      soluongloi: Number,
      ngaybaoloi: String,
    },
  },
  {
    timestamps: true,
  }
);

const Vattu = mongoose.model("Vattu", vattuSchema);

module.exports = Vattu;
