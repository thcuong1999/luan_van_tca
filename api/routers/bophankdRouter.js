const express = require("express");
const bophankdRouter = express.Router();
const upload = require("../middleware/imageUpload");
const Bophankd = require("../models/bophankdModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const Daily1 = require("../models/daily1Model");
const Daily2 = require("../models/daily2Model");
const Giamsatvung = require("../models/giamsatvungModel");
const {
  getCurrentDatetime,
  getTiendoHoanthanh,
  getTinhtrangNhandon,
} = require("../utils");
const Donhang = require("../models/donhangModel");
const Hodan = require("../models/hodanModel");

// them bo phan kd
bophankdRouter.post("/them", upload.single("hinhanh"), async (req, res) => {
  const { ten, sdt, email, xa, huyen, tinh, taikhoan } = req.body;
  try {
    const newUser = new User({
      taikhoan,
      matkhau: bcrypt.hashSync("123456", 8),
      vaitro: "bophankd",
    });
    const savedUser = await newUser.save();
    const bpkd = new Bophankd({
      ten,
      sdt,
      email,
      xa,
      huyen,
      tinh,
      user: savedUser._id,
    });
    const savedBophankd = await bpkd.save();
    res.send({ savedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// cap nhat thong tin ca nhan
bophankdRouter.put(
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
      const bpkd = await Bophankd.findOne({ user });
      bpkd.ten = ten;
      bpkd.sdt = sdt;
      bpkd.email = email;
      bpkd.xa = xa;
      bpkd.huyen = huyen;
      bpkd.tinh = tinh;
      bpkd.avatar = req.file ? req.file.filename : bpkd.avatar;
      const updatedBpkd = await bpkd.save();

      res.send({ updatedBpkd, success: true });
    } catch (error) {
      res.send({ message: error.message, success: false });
    }
  }
);

// chinh sua thong tin 1 bpkd
bophankdRouter.put("/single/:id", async (req, res) => {
  const { ten, sdt, email, xa, huyen, tinh, matkhau } = req.body;
  try {
    const bophankd = await Bophankd.findById(req.params.id);
    if (matkhau) {
      const user = await User.findById(bophankd.user);
      user.matkhau = bcrypt.hashSync(matkhau, 8);
      await user.save();
    }
    bophankd.ten = ten;
    bophankd.sdt = sdt;
    bophankd.email = email;
    bophankd.xa = xa;
    bophankd.huyen = huyen;
    bophankd.tinh = tinh;
    const updatedBophankd = await bophankd.save();

    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// danh sach bophankd
bophankdRouter.get("/danhsach", async (req, res) => {
  try {
    const bophankd = await Bophankd.find({}).populate("user");
    if (!bophankd.length) {
      return res.send({
        message: "Không tìm thấy bộ phận kinh doanh nào",
        success: false,
      });
    }
    res.send({ bophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 bophankd
bophankdRouter.get("/single/:id", async (req, res) => {
  try {
    const bophankd = await Bophankd.findById(req.params.id).populate("user");
    if (!bophankd) {
      return res.send({
        message: "Không tìm thấy bộ phận kinh doanh nào",
        success: false,
      });
    }
    res.send({ bophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 bophankd
bophankdRouter.delete("/single/:id", async (req, res) => {
  try {
    // xoa user
    const bophankd = await Bophankd.findById(req.params.id);
    await User.findByIdAndDelete(bophankd.user);
    // xoa bophankd
    const removedBophankd = await Bophankd.findByIdAndDelete(req.params.id);
    res.send({ removedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` bo phan kd
bophankdRouter.put("/xoanhieubpkd", async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      // xoa user
      const bophankd = await Bophankd.findById(item);
      await User.findByIdAndDelete(bophankd.user);
      // xoa bophankd
      await Bophankd.findByIdAndDelete(item);
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin bpkd based on userID
bophankdRouter.get("/baseduserid/:userId", async (req, res) => {
  try {
    const bophankd = await Bophankd.findOne({
      user: req.params.userId,
    }).populate("user");
    res.send({ bophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach cong cu hu loi
bophankdRouter.get("/dscongcuhuloi/:bophankdId", async (req, res) => {
  try {
    let { congcu } = await Bophankd.findById(req.params.bophankdId)
      .select("congcu")
      .populate("congcu");
    congcu = congcu.filter((item) => item.soluongloi);

    res.send({ congcu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach vat tu hu loi
bophankdRouter.get("/dsvattuhuloi/:bophankdId", async (req, res) => {
  try {
    let { vattu } = await Bophankd.findById(req.params.bophankdId)
      .select("vattu")
      .populate("vattu");
    vattu = vattu.filter((item) => item.soluongloi);

    res.send({ vattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach sp trong khohang
bophankdRouter.get("/dsspkhohang/:bophankdId", async (req, res) => {
  try {
    const sanpham = await Bophankd.findById(req.params.bophankdId)
      .select("khohang")
      .populate({
        path: "khohang",
        populate: {
          path: "items",
          populate: {
            path: "sanpham",
            model: "Sanpham",
          },
        },
      });
    res.send({ sanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach daily 1 thuoc bophankdId
bophankdRouter.get("/dsdaily1/:bophankdId", async (req, res) => {
  try {
    const daily1 = await Bophankd.findById(req.params.bophankdId)
      .select("daily1")
      .populate({
        path: "daily1",
        populate: {
          path: "user",
          model: "User",
        },
      });

    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach giam sat vung thuoc bophankdId
bophankdRouter.get("/dsgiamsatvung/:bophankdId", async (req, res) => {
  try {
    const { giamsatvung } = await Bophankd.findById(req.params.bophankdId)
      .select("giamsatvung")
      .populate({
        path: "giamsatvung",
        populate: {
          path: "user",
          model: "User",
        },
      });

    res.send({ giamsatvung, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach phan phat cua bophankd
bophankdRouter.get("/dsphanphat/:bophankdId", async (req, res) => {
  try {
    const { dsphanphat } = await Bophankd.findById(req.params.bophankdId)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to",
            populate: {
              path: "bophankd daily1 daily2 hodan",
            },
          },
        },
      });

    res.send({ dsphanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 sp thuoc bophankd
bophankdRouter.put("/xoasanpham", async (req, res) => {
  const { bophankdId, sanphamId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.sanpham = bophankd.sanpham.filter((item) => item != sanphamId);
    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` sp thuoc bophankd
bophankdRouter.put("/xoanhieusp", async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.sanpham = bophankd.sanpham.filter(
        (_item) => _item.toString() != item
      );
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` cong cu thuoc bophankd
bophankdRouter.put("/xoanhieucc", async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.congcu = bophankd.congcu.filter((_item) => _item != item);
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` nglieu thuoc bophankd
bophankdRouter.put("/xoanhieunglieu", async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.nguyenlieu = bophankd.nguyenlieu.filter(
        (_item) => _item.toString() !== item
      );
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` vat tu thuoc bophankd
bophankdRouter.put("/xoanhieuvattu", async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      bophankd.vattu = bophankd.vattu.filter(
        (_item) => _item.toString() !== item
      );
      await bophankd.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` daily 1 thuoc bophankd
bophankdRouter.put("/xoanhieudaily1", async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      // update filed daily1[], collection: Bophankd
      bophankd.daily1 = bophankd.daily1.filter((_item) => _item != item);
      await bophankd.save();
      // update field bophankd, collection: Daily1
      const dl1 = await Daily1.findById(item);
      dl1.bophankd = null;
      await dl1.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` giam sat vung thuoc bophankd
bophankdRouter.put("/xoanhieugsv", async (req, res) => {
  const { bophankdId, arrayOfId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    for (const item of arrayOfId) {
      // collection: Bophankd
      bophankd.giamsatvung = bophankd.giamsatvung.filter(
        (_item) => _item != item
      );
      await bophankd.save();
      // collection: Giamsatvung
      const gsv = await Giamsatvung.findById(item);
      gsv.bophankd = null;
      await gsv.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 congcu thuoc bophankd
bophankdRouter.put("/xoacongcu", async (req, res) => {
  const { bophankdId, congcuId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.congcu = bophankd.congcu.filter((item) => item != congcuId);
    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 nglieu thuoc bophankd
bophankdRouter.put("/xoa1nguyenlieu", async (req, res) => {
  const { bophankdId, nguyenlieuId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.nguyenlieu = bophankd.nguyenlieu.filter(
      (item) => item.toString() !== nguyenlieuId
    );
    const updatedBophankd = await bophankd.save();

    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 vattu thuoc bophankd
bophankdRouter.put("/xoa1vattu", async (req, res) => {
  const { bophankdId, vattuId } = req.body;
  try {
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.vattu = bophankd.vattu.filter(
      (item) => item.toString() !== vattuId
    );
    const updatedBophankd = await bophankd.save();

    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// bophankd them daily 1
bophankdRouter.put("/themdaily1", async (req, res) => {
  const { bophankdId, daily1Arr } = req.body;
  try {
    // update Bophankd collection, field: daily1
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.daily1 = [...daily1Arr, ...bophankd.daily1];
    // update Daily1 collection, field: bophankd
    for (const item of daily1Arr) {
      const daily1 = await Daily1.findById(item);
      daily1.bophankd = bophankdId;
      await daily1.save();
    }
    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// bophankd them giam sat vung
bophankdRouter.put("/themgsv", async (req, res) => {
  const { bophankdId, giamsatvungArr } = req.body;
  try {
    // Bophankd collection
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.giamsatvung = [...giamsatvungArr, ...bophankd.giamsatvung];
    // Giam sat vung collection
    for (const item of giamsatvungArr) {
      const gsv = await Giamsatvung.findById(item);
      gsv.bophankd = bophankdId;
      await gsv.save();
    }
    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// bophankd them san pham
bophankdRouter.put("/themsanpham", async (req, res) => {
  const { bophankdId, sanphamArr } = req.body;
  try {
    // Bophankd collection
    const bophankd = await Bophankd.findById(bophankdId);
    bophankd.sanpham = [...sanphamArr, ...bophankd.sanpham];

    const updatedBophankd = await bophankd.save();
    res.send({ updatedBophankd, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Lay danh sach dai ly 2 thuoc bpkd
bophankdRouter.get("/dsdaily2/:id", async (req, res) => {
  try {
    const { daily2 } = await Bophankd.findById(req.params.id)
      .select("daily2")
      .populate("daily2");
    if (!daily2.length) {
      return res.send({
        message: "Không tìm thấy đại lý 2 nào",
        success: false,
      });
    }

    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Duyệt đại lý 1
bophankdRouter.put("/duyetdaily1/:daily1Id/:bophankdId", async (req, res) => {
  try {
    //tạo tài khoản trong User collection
    const daily1 = await Daily1.findById(req.params.daily1Id);
    const newUser = new User({
      taikhoan: daily1.taikhoan,
      matkhau: bcrypt.hashSync("123456", 8),
      vaitro: "daily1",
    });
    const savedUser = await newUser.save();
    // Cập nhật đại lý 1 collection
    daily1.user = savedUser ? savedUser._id : null;
    daily1.active = true;
    daily1.bophankd = req.params.bophankdId;
    const updatedDaily1 = await daily1.save();

    res.send({ updatedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Duyệt đại lý 2
bophankdRouter.put("/duyetdaily2/:daily2Id/:bophankdId", async (req, res) => {
  try {
    const daily2 = await Daily2.findById(req.params.daily2Id);
    // Nếu giám sát vùng đã duyệt
    if (daily2.giamsatvung) {
      //tạo tài khoản trong User collection
      const newUser = new User({
        taikhoan: daily2.taikhoan,
        matkhau: bcrypt.hashSync("123456", 8),
        vaitro: "daily2",
      });
      const savedUser = await newUser.save();
      // Cập nhật đại lý 2 collection
      daily2.user = savedUser ? savedUser._id : null;
      daily2.active = true;
      daily2.bophankd = req.params.bophankdId;
      await daily2.save();
    } else {
      daily2.bophankd = req.params.bophankdId;
      await daily2.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach don hang thuoc bophankd
bophankdRouter.get("/dsdonhang/:bophankdId", async (req, res) => {
  try {
    const { donhang } = await Bophankd.findById(req.params.bophankdId)
      .select("donhang")
      .populate("donhang");

    res.send({ donhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach SUB don hang thuoc bophankd
bophankdRouter.get("/dssubdonhang/:bophankdId/:ma", async (req, res) => {
  try {
    let { subdonhang } = await Bophankd.findById(req.params.bophankdId)
      .select("subdonhang")
      .populate({
        path: "subdonhang",
        populate: {
          path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
          populate: {
            path: "bophankd giamsatvung sanpham congcu vattu nguyenlieu",
          },
        },
      })
      .populate({
        path: "subdonhang",
        populate: {
          path: "dssanpham",
          populate: {
            path: "sanpham",
            populate: {
              path: "loaisanpham",
            },
          },
        },
      })
      .populate({
        path: "subdonhang",
        populate: {
          path: "to",
          populate: {
            path: "giamsatvung",
            populate: {
              path: "bophankd loaisanpham",
            },
          },
        },
      });
    subdonhang = subdonhang.filter((item) => item.ma === req.params.ma);

    res.send({ subdonhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach sanpham thuoc bophankdId
bophankdRouter.get("/dssanpham/:bophankdId", async (req, res) => {
  try {
    const { dssanpham } = await Bophankd.findById(req.params.bophankdId)
      .select("dssanpham")
      .populate({
        path: "dssanpham",
        populate: {
          path: "donhang sanpham",
        },
      })
      .populate({
        path: "dssanpham",
        populate: {
          path: "sanpham",
          populate: {
            path: "loaisanpham",
          },
        },
      });

    res.send({ dssanpham, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach vattu thuoc bophankdId
bophankdRouter.get("/dsvattu/:bophankdId", async (req, res) => {
  try {
    let { dsvattu } = await Bophankd.findById(req.params.bophankdId)
      .select("dsvattu")
      .populate({
        path: "dsvattu",
        populate: "donhang vattu",
      });

    res.send({ dsvattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach nguyenlieu thuoc bophankdId
bophankdRouter.get("/dsnguyenlieu/:bophankdId", async (req, res) => {
  try {
    const { dsnguyenlieu } = await Bophankd.findById(req.params.bophankdId)
      .select("dsnguyenlieu")
      .populate({
        path: "dsnguyenlieu",
        populate: {
          path: "donhang nguyenlieu",
        },
      });
    res.send({ dsnguyenlieu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay so lieu tong quan
bophankdRouter.get("/tongquan/:bophankdId", async (req, res) => {
  try {
    const bophankd = await Bophankd.findById(req.params.bophankdId).populate(
      "dssanpham dsvattu dsnguyenlieu dscongcu daily1 daily2 donhang giamsatvung"
    );
    res.send({
      dssanpham: bophankd.dssanpham.length,
      dsvattu: bophankd.dsvattu.length,
      dsnguyenlieu: bophankd.dsnguyenlieu.length,
      dscongcu: bophankd.dscongcu.length,
      daily1: bophankd.daily1.length,
      daily2: bophankd.daily2.length,
      donhang: bophankd.donhang.length,
      giamsatvung: bophankd.giamsatvung.length,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds cong cu thuoc bophankd
bophankdRouter.get("/dscongcu/:bophankdId", async (req, res) => {
  try {
    try {
      let { dscongcu } = await Bophankd.findById(req.params.bophankdId)
        .select("dscongcu")
        .populate({
          path: "dscongcu",
          populate: {
            path: "donhang congcu",
          },
        });

      res.send({ dscongcu, success: true });
    } catch (error) {
      res.send({ message: error.message, success: false });
    }
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds daily1 daily2 chua duyet hien thi badge
bophankdRouter.get("/dsshowbadge/:bophankdId", async (req, res) => {
  try {
    // Daily1
    let { daily1 } = await Bophankd.findById(req.params.bophankdId)
      .select("daily1")
      .populate("daily1");
    daily1 = daily1.filter((dl1) => !dl1.user);
    // Daily2
    let { daily2 } = await Bophankd.findById(req.params.bophankdId)
      .select("daily2")
      .populate("daily2");
    daily2 = daily2.filter((dl2) => !dl2.user && !dl2.bophankd);

    res.send({
      daily1Badge: daily1.length,
      daily2Badge: daily2.length,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

//--------------------------------------------

// them cong cu hu loi
bophankdRouter.put("/themcchuloi/:bophankdId", async (req, res) => {
  const { dsccLoi } = req.body;
  try {
    for (const cc of dsccLoi) {
      const bophankd = await Bophankd.findById(req.params.bophankdId);
      bophankd.dscongcu = bophankd.dscongcu.map((item) =>
        item.congcu.toString() === cc.congcu._id &&
        item.donhang.toString() === cc.donhang._id &&
        item.loi.soluongloi
          ? {
              donhang: item.donhang,
              congcu: item.congcu,
              loi: {
                soluongloi: item.loi.soluongloi + parseInt(cc.soluongloi),
                ngaybaoloi: getCurrentDatetime(),
              },
              soluong: item.soluong,
              ngaytao: item.ngaytao,
            }
          : item.congcu.toString() === cc.congcu._id &&
            item.donhang.toString() === cc.donhang._id
          ? {
              donhang: item.donhang,
              congcu: item.congcu,
              loi: {
                soluongloi: cc.soluongloi,
                ngaybaoloi: getCurrentDatetime(),
              },
              soluong: item.soluong,
              ngaytao: item.ngaytao,
            }
          : item
      );
      await bophankd.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds cong cu hu loi
bophankdRouter.get("/dscchuloi/:bophankdId", async (req, res) => {
  try {
    let { dscongcu: dscongcuhuloi } = await Bophankd.findById(
      req.params.bophankdId
    )
      .select("dscongcu")
      .populate({
        path: "dscongcu",
        populate: {
          path: "donhang congcu",
        },
      });

    dscongcuhuloi = dscongcuhuloi.filter((cc) => cc.loi.soluongloi);

    res.send({ dscongcuhuloi, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

//--------------------------------------------

// them vat tu hu loi
bophankdRouter.put("/themvthuloi/:bophankdId", async (req, res) => {
  const { dsvtLoi } = req.body;
  try {
    for (const vt of dsvtLoi) {
      const bophankd = await Bophankd.findById(req.params.bophankdId);
      bophankd.dsvattu = bophankd.dsvattu.map((item) =>
        item.vattu.toString() === vt.vattu._id &&
        item.donhang.toString() === vt.donhang._id &&
        item.loi.soluongloi
          ? {
              donhang: item.donhang,
              vattu: item.vattu,
              loi: {
                soluongloi: item.loi.soluongloi + parseInt(vt.soluongloi),
                ngaybaoloi: getCurrentDatetime(),
              },
              soluong: item.soluong,
              ngaytao: item.ngaytao,
            }
          : item.vattu.toString() === vt.vattu._id &&
            item.donhang.toString() === vt.donhang._id
          ? {
              donhang: item.donhang,
              vattu: item.vattu,
              loi: {
                soluongloi: vt.soluongloi,
                ngaybaoloi: getCurrentDatetime(),
              },
              soluong: item.soluong,
              ngaytao: item.ngaytao,
            }
          : item
      );
      await bophankd.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds vat tu hu loi
bophankdRouter.get("/dsvthuloi/:bophankdId", async (req, res) => {
  try {
    let { dsvattu: dsvattuhuloi } = await Bophankd.findById(
      req.params.bophankdId
    )
      .select("dsvattu")
      .populate({
        path: "dsvattu",
        populate: {
          path: "donhang vattu",
        },
      });

    dsvattuhuloi = dsvattuhuloi.filter((vt) => vt.loi.soluongloi);

    res.send({ dsvattuhuloi, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

//--------------------------------------------

// them nguyen lieu hu loi
bophankdRouter.put("/themnglhuloi/:bophankdId", async (req, res) => {
  const { dsnglLoi } = req.body;
  try {
    for (const ngl of dsnglLoi) {
      const bophankd = await Bophankd.findById(req.params.bophankdId);
      bophankd.dsnguyenlieu = bophankd.dsnguyenlieu.map((item) =>
        item.nguyenlieu.toString() === ngl.nguyenlieu._id &&
        item.donhang.toString() === ngl.donhang._id &&
        item.loi.khoiluongloi
          ? {
              donhang: item.donhang,
              nguyenlieu: item.nguyenlieu,
              loi: {
                khoiluongloi:
                  item.loi.khoiluongloi + parseInt(ngl.khoiluongloi),
                ngaybaoloi: getCurrentDatetime(),
              },
              khoiluong: item.khoiluong,
              ngaytao: item.ngaytao,
            }
          : item.nguyenlieu.toString() === ngl.nguyenlieu._id &&
            item.donhang.toString() === ngl.donhang._id
          ? {
              donhang: item.donhang,
              nguyenlieu: item.nguyenlieu,
              loi: {
                khoiluongloi: ngl.khoiluongloi,
                ngaybaoloi: getCurrentDatetime(),
              },
              khoiluong: item.khoiluong,
              ngaytao: item.ngaytao,
            }
          : item
      );
      await bophankd.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds nguyen lieu hu loi
bophankdRouter.get("/dsnglhuloi/:bophankdId", async (req, res) => {
  try {
    let { dsnguyenlieu: dsnguyenlieuhuloi } = await Bophankd.findById(
      req.params.bophankdId
    )
      .select("dsnguyenlieu")
      .populate({
        path: "dsnguyenlieu",
        populate: {
          path: "donhang nguyenlieu",
        },
      });

    dsnguyenlieuhuloi = dsnguyenlieuhuloi.filter((ngl) => ngl.loi.khoiluongloi);

    res.send({ dsnguyenlieuhuloi, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds subdonhang cua 1 don hang co ma cu the va thuoc bpkd co ma bpkd
bophankdRouter.get("/dssubdhofsingledh/:bophankdId/:madh", async (req, res) => {
  try {
    let { subdonhang } = await Bophankd.findById(req.params.bophankdId)
      .select("subdonhang")
      .populate({
        path: "subdonhang",
        populate: {
          path: "to",
          populate: {
            path: "giamsatvung",
          },
        },
      });
    subdonhang = subdonhang.filter(
      (dh) => dh.ma === req.params.madh.toString()
    );

    res.send({ subdonhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds hodan
bophankdRouter.get("/dshodan/:bophankdId", async (req, res) => {
  try {
    // lay danh sach gsv do gsv quan ly
    const dsdaily2 = await Daily2.find({ bophankd: req.params.bophankdId })
      .select("hodan")
      .populate({
        path: "hodan",
        populate: {
          path: "langnghe loaisanpham",
        },
      });
    let dshodan = [];
    dsdaily2.forEach((dl2) => {
      dshodan = [...dshodan, ...dl2.hodan];
    });

    res.send({ dshodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Tổng hợp số liệu tổng quát của tiến độ đơn hàng
bophankdRouter.get("/tiendodonhang/:bpkdId/:maDH", async (req, res) => {
  try {
    const donhangGoc = await Donhang.findOne({
      ma: req.params.maDH,
      dochanggoc: true,
    });
    // tong so luong sp cua dh goc
    const tongSLSPDonhangGoc = donhangGoc.tongsanpham;

    const bpkd = await Bophankd.findById(req.params.bpkdId)
      .populate({
        path: "donhang",
        populate: {
          path: "from dssanpham dscongcu dsvattu dsnguyenlieu",
          populate: {
            path: "bophankd sanpham congcu vattu nguyenlieu",
          },
        },
      })
      .populate("subdonhang");
    const bpkdDonhangTonghop = bpkd.donhang.find(
      (dh) => dh.ma === req.params.maDH
    );
    const dssanpham = [...bpkdDonhangTonghop.dssanpham];

    //----------------------
    const bpkdSubdonhang = bpkd.subdonhang.filter(
      (dh) => dh.ma === req.params.maDH
    );

    let dsGSV = [];
    let dsDonhangTonghopGSV = [];
    for (const item of bpkdSubdonhang) {
      let gsv = await Giamsatvung.findById(item.to.giamsatvung)
        .populate({
          path: "donhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "bophankd giamsatvung sanpham congcu vattu nguyenlieu",
            },
          },
        })
        .populate({
          path: "subdonhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "giamsatvung daily1 sanpham congcu vattu nguyenlieu",
            },
          },
        });
      let gsvDonhang = gsv.donhang.find((dh) => dh.ma === req.params.maDH);
      dsDonhangTonghopGSV = [gsvDonhang, ...dsDonhangTonghopGSV];
      dsGSV = [gsv, ...dsGSV];
    }

    //-------------------------------
    let gsvSubdonhang = [];
    dsGSV.forEach((gsv) => {
      gsvSubdonhang = [...gsv.subdonhang, ...gsvSubdonhang];
    });
    gsvSubdonhang = gsvSubdonhang.filter((dh) => dh.ma === req.params.maDH);

    let dsDaily1 = [];
    let dsDonhangTonghopDaily1 = [];
    for (const item of gsvSubdonhang) {
      let daily1 = await Daily1.findById(item.to.daily1)
        .populate({
          path: "donhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "giamsatvung daily1 sanpham congcu vattu nguyenlieu",
            },
          },
        })
        .populate({
          path: "subdonhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "daily1 daily2 sanpham congcu vattu nguyenlieu",
            },
          },
        });
      let daily1Donhang = daily1.donhang.find(
        (dh) => dh.ma === req.params.maDH
      );
      dsDonhangTonghopDaily1 = [daily1Donhang, ...dsDonhangTonghopDaily1];
      dsDaily1 = [daily1, ...dsDaily1];
    }

    //---------------------------------
    let daily1Subdonhang = [];
    dsDaily1.forEach((dl1) => {
      daily1Subdonhang = [...dl1.subdonhang, ...daily1Subdonhang];
    });
    daily1Subdonhang = daily1Subdonhang.filter(
      (dh) => dh.ma === req.params.maDH
    );

    let dsDaily2 = [];
    let dsDonhangTonghopDaily2 = [];
    for (const item of daily1Subdonhang) {
      let daily2 = await Daily2.findById(item.to.daily2)
        .populate({
          path: "donhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "daily1 daily2 sanpham congcu vattu nguyenlieu",
            },
          },
        })
        .populate({
          path: "subdonhang",
          populate: {
            path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
            populate: {
              path: "daily2 hodan sanpham congcu vattu nguyenlieu",
            },
          },
        });
      let daily2Donhang = daily2.donhang.find(
        (dh) => dh.ma === req.params.maDH
      );
      dsDonhangTonghopDaily2 = [daily2Donhang, ...dsDonhangTonghopDaily2];
      dsDaily2 = [daily2, ...dsDaily2];
    }

    //---------------------------------
    let daily2Subdonhang = [];
    dsDaily2.forEach((dl2) => {
      daily2Subdonhang = [...dl2.subdonhang, ...daily2Subdonhang];
    });
    daily2Subdonhang = daily2Subdonhang.filter(
      (dh) => dh.ma === req.params.maDH
    );

    let dsDonhangTonghopHodan = [];
    let dsHodan = [];
    for (const item of daily2Subdonhang) {
      let hodan = await Hodan.findById(item.to.hodan).populate({
        path: "donhang",
        populate: {
          path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
          populate: {
            path: "daily2 hodan sanpham congcu vattu nguyenlieu",
          },
        },
      });
      let hodanDonhang = hodan.donhang.find((dh) => dh.ma === req.params.maDH);
      dsDonhangTonghopHodan = [hodanDonhang, ...dsDonhangTonghopHodan];
      dsHodan = [hodan, ...dsHodan];
    }

    //==================================================
    let gsvDSDonhang = [];
    dsGSV.forEach((gsv) => {
      gsvDSDonhang = [...gsv.donhang, ...gsvDSDonhang];
    });
    gsvDSDonhang = gsvDSDonhang.filter((dh) => dh.ma === req.params.maDH);
    //-------------------
    let daily1DSDonhang = [];
    dsDaily1.forEach((daily1) => {
      daily1DSDonhang = [...daily1.donhang, ...daily1DSDonhang];
    });
    daily1DSDonhang = daily1DSDonhang.filter((dh) => dh.ma === req.params.maDH);
    //-------------------
    let daily2DSDonhang = [];
    dsDaily2.forEach((daily2) => {
      daily2DSDonhang = [...daily2.donhang, ...daily2DSDonhang];
    });
    daily2DSDonhang = daily2DSDonhang.filter((dh) => dh.ma === req.params.maDH);
    //-------------------
    let hodanDSDonhang = [];
    dsHodan.forEach((hd) => {
      hodanDSDonhang = [...hd.donhang, ...hodanDSDonhang];
    });
    hodanDSDonhang = hodanDSDonhang.filter((dh) => dh.ma === req.params.maDH);
    //====================================================================================================================
    // bpkd tien do don hang
    bophankdTDHT = Math.round(
      (dssanpham.reduce((acc, sp) => acc + (sp.danhan ? sp.danhan : 0), 0) *
        100) /
        tongSLSPDonhangGoc
    );
    // gsv tinh trang nhan don
    const gsvTTND = getTinhtrangNhandon(gsvDSDonhang, tongSLSPDonhangGoc);
    // gsv tien do hoan thanh
    const gsvTDHT = getTiendoHoanthanh(gsvDSDonhang, tongSLSPDonhangGoc);
    // daily 1 tinh trang nhan don
    const daily1TTND = getTinhtrangNhandon(daily1DSDonhang, tongSLSPDonhangGoc);
    // dai ly 1 tien do hoan thanh
    const daily1TDHT = getTiendoHoanthanh(daily1DSDonhang, tongSLSPDonhangGoc);
    // daily 2 tinh trang nhan don
    const daily2TTND = getTinhtrangNhandon(daily2DSDonhang, tongSLSPDonhangGoc);
    // dai ly 2 tien do hoan thanh
    const daily2TDHT = getTiendoHoanthanh(daily2DSDonhang, tongSLSPDonhangGoc);
    // ho dan tinh trang nhan don
    const hodanTTND = getTinhtrangNhandon(hodanDSDonhang, tongSLSPDonhangGoc);
    // hodan tien do hoan thanh
    const hodanTDHT = getTiendoHoanthanh(
      hodanDSDonhang,
      tongSLSPDonhangGoc,
      "hodan"
    );

    res.send({
      bophankdTDHT,
      gsvTTND,
      gsvTDHT,
      daily1TTND,
      daily1TDHT,
      daily2TTND,
      daily2TDHT,
      hodanTTND,
      hodanTDHT,
      bpkdDSDonhang: [bpkdDonhangTonghop],
      gsvDSDonhang,
      daily1DSDonhang,
      daily2DSDonhang,
      hodanDSDonhang,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = bophankdRouter;
