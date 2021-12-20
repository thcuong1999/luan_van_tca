const express = require("express");
const Daily2 = require("../models/daily2Model");
const User = require("../models/userModel");
const daily2Router = express.Router();
var bcrypt = require("bcryptjs");
const Daily1 = require("../models/daily1Model");
const Hodan = require("../models/hodanModel");
const Giamsatvung = require("../models/giamsatvungModel");
const Bophankd = require("../models/bophankdModel");
const upload = require("../middleware/imageUpload");
const {
  getCurrentDatetime,
  getTiendoHoanthanh,
  getTinhtrangNhandon,
} = require("../utils");

// them dai ly
daily2Router.post("/them", async (req, res) => {
  const { ten, sdt, email, xa, huyen, tinh, taikhoan, daily1Id, dl2, gsvId } =
    req.body;
  try {
    // create daily 1
    const daily2 = new Daily2({
      ten,
      sdt,
      email,
      xa,
      huyen,
      tinh,
      taikhoan,
      daily1: daily1Id,
    });
    const savedDaily2 = await daily2.save();

    if (savedDaily2) {
      // Thêm vào danh sách đại lý 2 của đại lý 1
      const daily1 = await Daily1.findById(daily1Id);
      daily1.daily2 = [savedDaily2._id, ...daily1.daily2];
      await daily1.save();
      // Thêm vào danh sách duyệt đại lý 2 của bộ phận kinh doanh
      const bophankd = await Bophankd.findById(dl2);
      bophankd.daily2 = [savedDaily2._id, ...bophankd.daily2];
      await bophankd.save();
      // Thêm vào danh sách duyệt đại lý 2 của giám sát vùng
      const gsv = await Giamsatvung.findById(gsvId);
      gsv.daily2 = [savedDaily2._id, ...gsv.daily2];
      await gsv.save();
    }

    res.send({ savedDaily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// cap nhat thong tin ca nhan
daily2Router.put(
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
      const dl2 = await Daily2.findOne({ user });
      dl2.ten = ten;
      dl2.sdt = sdt;
      dl2.email = email;
      dl2.xa = xa;
      dl2.huyen = huyen;
      dl2.tinh = tinh;
      dl2.avatar = req.file ? req.file.filename : dl2.avatar;
      const updatedDl2 = await dl2.save();

      res.send({ updatedDl2, success: true });
    } catch (error) {
      res.send({ message: error.message, success: false });
    }
  }
);

// chinh sua dai ly 2
daily2Router.put("/single/:id", async (req, res) => {
  const { ten, sdt, email, xa, huyen, tinh, matkhau } = req.body;
  try {
    const daily2 = await Daily2.findById(req.params.id);
    if (matkhau) {
      const user = await User.findById(daily2.user);
      user.matkhau = bcrypt.hashSync(matkhau, 8);
      await user.save();
    }
    daily2.ten = ten;
    daily2.sdt = sdt;
    daily2.email = email;
    daily2.xa = xa;
    daily2.huyen = huyen;
    daily2.tinh = tinh;
    const updatedDaily2 = await daily2.save();

    res.send({ updatedDaily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach dai ly 2
daily2Router.get("/danhsach", async (req, res) => {
  try {
    const daily2 = await Daily2.find({}).populate("user");
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

// lay thong tin 1 dai ly
daily2Router.get("/single/:id", async (req, res) => {
  try {
    const daily2 = await Daily2.findById(req.params.id)
      .populate({
        path: "hodan user donhang dscongcu dsvattu dsnguyenlieu",
      })
      .populate({
        path: "hodan",
        populate: {
          path: "langnghe loaisanpham",
        },
      })
      .populate({
        path: "dscongcu dsvattu dsnguyenlieu dssanpham",
        populate: {
          path: "donhang congcu vattu nguyenlieu sanpham",
        },
      });

    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 daily2
daily2Router.delete("/single/:id", async (req, res) => {
  try {
    // xoa user
    const daily2 = await Daily2.findById(req.params.id);
    if (daily2.user) {
      await User.findByIdAndDelete(daily2.user);
    }
    // xoa bophankd
    const removedDaily2 = await Daily2.findByIdAndDelete(req.params.id);
    res.send({ removedDaily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` daily 2
daily2Router.put("/multiple", async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      // xoa user
      const daily2 = await Daily2.findById(item);
      if (daily2.user) {
        await User.findByIdAndDelete(daily2.user);
      }
      // xoa daily2
      await Daily2.findByIdAndDelete(item);
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` hodan thuoc dai ly 2
daily2Router.put("/xoanhieuhodan", async (req, res) => {
  const { daily2Id, arrayOfId } = req.body;
  // console.log(req.body);
  try {
    const daily2 = await Daily2.findById(daily2Id);
    for (const item of arrayOfId) {
      // update filed hodan, collection: Daily2
      daily2.hodan = daily2.hodan.filter((_item) => _item != item);
      await daily2.save();
      // update field daily2, collection: Hodan
      const hodan = await Hodan.findById(item);
      hodan.daily2 = null;
      await hodan.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach dai ly 2 + daily1 null
daily2Router.get("/dsdly2dly1null", async (req, res) => {
  try {
    const dl2 = await Daily2.find({}).populate("user");
    if (!dl2.length) {
      return res.send({
        message: "Không tìm thấy đại lý 2 nào",
        success: false,
      });
    }
    const daily2 = dl2.filter((item) => !item.daily1);
    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// daily 2 them ho dan
daily2Router.put("/themhodan", async (req, res) => {
  const { daily2Id, arrayOfId } = req.body;
  try {
    const daily2 = await Daily2.findById(daily2Id);
    for (const item of arrayOfId) {
      // update Daily2 collection, field: hodan
      daily2.hodan = [item, ...daily2.hodan];
      await daily2.save();
      // update Hodan collection, field: daily2
      const hodan = await Hodan.findById(item);
      hodan.daily2 = daily2Id;
      await hodan.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach phan phat CONG CU thuoc dly2
daily2Router.get("/dsphanphat/:daily2Id", async (req, res) => {
  try {
    let { dsphanphat } = await Daily2.findById(req.params.daily2Id)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to items",
            populate: {
              path: "bophankd daily1 daily2 hodan congcu",
            },
          },
        },
      });
    dsphanphat = dsphanphat.filter(
      (item) => item.phanphat.phanphattype === "congcu"
    );
    res.send({ dsphanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach phan phat VAT TU thuoc dly2
daily2Router.get("/dsvattuphanphat/:daily2Id", async (req, res) => {
  try {
    let { dsphanphat } = await Daily2.findById(req.params.daily2Id)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to items",
            populate: {
              path: "bophankd daily1 daily2 hodan vattu",
            },
          },
        },
      });
    dsphanphat = dsphanphat.filter(
      (item) => item.phanphat.phanphattype === "vattu"
    );

    res.send({ dsphanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay 1 phan phat thuoc dly2
daily2Router.get("/singlephanphat/:daily2Id/:phanphatId", async (req, res) => {
  try {
    const { dsphanphat } = await Daily2.findById(req.params.daily2Id)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to items",
            populate: {
              path: "bophankd daily1 daily2 hodan congcu vattu",
            },
          },
        },
      });
    const phanphat = dsphanphat.find(
      (item) => item.phanphat._id.toString() === req.params.phanphatId
    );
    res.send({ phanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach CONG CU thuoc daily 2
daily2Router.get("/danhsachcongcu/:daily2Id", async (req, res) => {
  try {
    let dscongcu = await Daily2.findById(req.params.daily2Id)
      .select("items")
      .populate({
        path: "items",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to",
            populate: {
              path: "bophankd daily1 daily2 hodan",
            },
          },
        },
      })
      .populate({
        path: "items",
        populate: {
          path: "congcu vattu",
        },
      });

    if (!dscongcu) {
      return res.send({
        message: "Không có công cụ nào trong kho",
        success: false,
      });
    }
    dscongcu = dscongcu.items.filter((item) => item.congcu);
    res.send({ dscongcu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach VAT TU thuoc daily 2
daily2Router.get("/danhsachvattu/:daily2Id", async (req, res) => {
  try {
    let dsvattu = await Daily2.findById(req.params.daily2Id)
      .select("items")
      .populate({
        path: "items",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to",
            populate: {
              path: "bophankd daily1 daily2 hodan",
            },
          },
        },
      })
      .populate({
        path: "items",
        populate: {
          path: "congcu vattu",
        },
      });

    if (!dsvattu) {
      return res.send({
        message: "Không có công cụ nào trong kho",
        success: false,
      });
    }
    dsvattu = dsvattu.items.filter((item) => item.vattu);
    res.send({ dsvattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// get single daily2 based userId
daily2Router.get("/user/:id", async (req, res) => {
  try {
    const daily2 = await Daily2.findOne({ user: req.params.id }).populate(
      "user"
    );
    if (!daily2) {
      return res.send({ message: "Không tìm thấy đại lý", success: false });
    }
    res.send({ daily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// ===========================================

// them dai ly 2 vao ds daily2 cua daily1
daily2Router.post("/them", async (req, res) => {
  const { ten, sdt, email, diachi, taikhoan, matkhau, daily1 } = req.body;

  try {
    // tao tai khoan de lay userId
    let savedUser;
    if (taikhoan && matkhau) {
      const newUser = new User({
        taikhoan,
        matkhau: bcrypt.hashSync(matkhau, 8),
        vaitro: "daily2",
      });
      savedUser = await newUser.save();
    }

    // luu thong tin dai ly
    const newDaily2 = new Daily2({
      ten,
      sdt,
      email,
      diachi,
      daily1,
      user: savedUser ? savedUser._id : null,
    });
    const savedDaily2 = await newDaily2.save();

    // update daily1: daily2[] field
    const dl1 = await Daily1.findById(daily1);
    dl1.daily2 = [savedDaily2._id, ...dl1.daily2];
    await dl1.save();

    res.send({ savedDaily2, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

//======================

// lay ds don hang thuoc daily2
daily2Router.get("/dsdonhang/:daily2Id", async (req, res) => {
  try {
    let { donhang } = await Daily2.findById(req.params.daily2Id)
      .select("donhang")
      .populate({
        path: "donhang",
        populate: {
          path: "dssanpham",
          populate: {
            path: "sanpham",
          },
        },
      });

    res.send({ donhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach hodan thuoc daily2
daily2Router.get("/dshodan/:daily2Id", async (req, res) => {
  try {
    let { hodan } = await Daily2.findById(req.params.daily2Id)
      .select("hodan")
      .populate({
        path: "hodan",
        populate: {
          path: "langnghe loaisanpham user",
        },
      });
    if (!hodan.length) {
      return res.send({
        message: "Không tìm thấy đại lý 2 nào",
        success: false,
      });
    }

    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach SUB don hang thuoc daily2
daily2Router.get("/dssubdonhang/:daily2Id/:ma", async (req, res) => {
  try {
    let { subdonhang } = await Daily2.findById(req.params.daily2Id)
      .select("subdonhang")
      .populate({
        path: "subdonhang",
        populate: {
          path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
          populate: {
            path: "daily2 hodan sanpham congcu vattu nguyenlieu",
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
            path: "hodan",
            populate: {
              path: "langnghe loaisanpham",
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

// lay danh sach sanpham thuoc Daily2
daily2Router.get("/dssanpham/:daily2Id", async (req, res) => {
  try {
    const { dssanpham } = await Daily2.findById(req.params.daily2Id)
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

// lay danh sach vattu thuoc Daily2
daily2Router.get("/dsvattu/:daily2Id", async (req, res) => {
  try {
    let { dsvattu } = await Daily2.findById(req.params.daily2Id)
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

// lay danh sach nguyenlieu thuoc Daily1
daily2Router.get("/dsnguyenlieu/:daily2Id", async (req, res) => {
  try {
    const { dsnguyenlieu } = await Daily2.findById(req.params.daily2Id)
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

// lay danh sach congcu thuoc Daily2
daily2Router.get("/dscongcu/:daily2Id", async (req, res) => {
  try {
    let { dscongcu } = await Daily2.findById(req.params.daily2Id)
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
});

// lay so lieu tong quan
daily2Router.get("/tongquan/:daily2Id", async (req, res) => {
  try {
    let daily2 = await Daily2.findById(req.params.daily2Id).populate(
      "dssanpham dscongcu dsvattu dsnguyenlieu hodan donhang"
    );

    res.send({
      dssanpham: daily2.dssanpham.length,
      dscongcu: daily2.dscongcu.length,
      dsvattu: daily2.dsvattu.length,
      dsnguyenlieu: daily2.dsnguyenlieu.length,
      dshodan: daily2.hodan.length,
      dsdonhang: daily2.donhang.length,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds donhang chua duyet hien thi badge
daily2Router.get("/dsshowbadge/:daily2Id", async (req, res) => {
  try {
    let { donhang } = await Daily2.findById(req.params.daily2Id)
      .select("donhang")
      .populate("donhang");
    donhang = donhang.filter((dh) => !dh.xacnhan);

    res.send({ donhangBadge: donhang.length, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

//--------------------------------------------

// them cong cu hu loi
daily2Router.put("/themcchuloi/:dl2", async (req, res) => {
  const { dsccLoi } = req.body;
  try {
    for (const cc of dsccLoi) {
      const daily2 = await Daily2.findById(req.params.dl2);
      daily2.dscongcu = daily2.dscongcu.map((item) =>
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
      await daily2.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds cong cu hu loi
daily2Router.get("/dscchuloi/:dl2", async (req, res) => {
  try {
    let { dscongcu: dscongcuhuloi } = await Daily2.findById(req.params.dl2)
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
daily2Router.put("/themvthuloi/:dl2", async (req, res) => {
  const { dsvtLoi } = req.body;
  try {
    for (const vt of dsvtLoi) {
      const daily2 = await Daily2.findById(req.params.dl2);
      daily2.dsvattu = daily2.dsvattu.map((item) =>
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
      await daily2.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds vat tu hu loi
daily2Router.get("/dsvthuloi/:dl2", async (req, res) => {
  try {
    let { dsvattu: dsvattuhuloi } = await Daily2.findById(req.params.dl2)
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
daily2Router.put("/themnglhuloi/:dl2", async (req, res) => {
  const { dsnglLoi } = req.body;
  try {
    for (const ngl of dsnglLoi) {
      const daily2 = await Daily2.findById(req.params.dl2);
      daily2.dsnguyenlieu = daily2.dsnguyenlieu.map((item) =>
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
      await daily2.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds nguyen lieu hu loi
daily2Router.get("/dsnglhuloi/:dl2", async (req, res) => {
  try {
    let { dsnguyenlieu: dsnguyenlieuhuloi } = await Daily2.findById(
      req.params.dl2
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

// lay ds subdonhang cua 1 don hang co ma cu the va thuoc daily2 co ma daily2
daily2Router.get("/dssubdhofsingledh/:daily2Id/:madh", async (req, res) => {
  try {
    let { subdonhang } = await Daily2.findById(req.params.daily2Id)
      .select("subdonhang")
      .populate({
        path: "subdonhang",
        populate: {
          path: "to",
          populate: {
            path: "hodan",
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

// Tổng hợp số liệu tổng quát của tiến độ đơn hàng
daily2Router.get("/tiendodonhang/:dl2Id/:maDH", async (req, res) => {
  try {
    const daily2 = await Daily2.findById(req.params.dl2Id)
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
    // don hang tong hop cua daily1:
    const daily2Donhang = daily2.donhang.find(
      (dh) => dh.ma === req.params.maDH
    );
    // tong so luong sp cua dh goc (trường hợp này đơn hàng gốc là DL2)
    const tongSLSPDonhangGoc = daily2Donhang.tongsanpham;
    // daily2 tien do hoan thanh

    //-------------------------------
    let daily2Subdonhang = daily2.subdonhang;
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

    //===============================================
    let hodanDSDonhang = [];
    dsHodan.forEach((hd) => {
      hodanDSDonhang = [...hd.donhang, ...hodanDSDonhang];
    });
    hodanDSDonhang = hodanDSDonhang.filter((dh) => dh.ma === req.params.maDH);
    //=======================================
    const daily2TDHT = Math.round(
      (daily2Donhang.dssanpham.reduce(
        (acc, sp) => acc + (sp.danhan ? sp.danhan : 0),
        0
      ) /
        tongSLSPDonhangGoc) *
        100
    );
    // ho dan tinh trang nhan don
    const hodanTTND = getTinhtrangNhandon(hodanDSDonhang, tongSLSPDonhangGoc);
    // hodan tien do hoan thanh
    const hodanTDHT = getTiendoHoanthanh(
      hodanDSDonhang,
      tongSLSPDonhangGoc,
      "hodan"
    );

    res.send({
      daily2Nhandon: daily2Donhang.xacnhan,
      daily2TDHT,
      hodanTTND,
      hodanTDHT,
      daily2DSDonhang: [daily2Donhang],
      hodanDSDonhang,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = daily2Router;
