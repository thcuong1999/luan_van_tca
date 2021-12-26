const express = require("express");
const Daily1 = require("../models/daily1Model");
const User = require("../models/userModel");
const daily1Router = express.Router();
var bcrypt = require("bcryptjs");
const Daily2 = require("../models/daily2Model");
const Bophankd = require("../models/bophankdModel");
const Giamsatvung = require("../models/giamsatvungModel");
const Hodan = require("../models/hodanModel");
const upload = require("../middleware/imageUpload");
const {
  getCurrentDatetime,
  getTinhtrangNhandon,
  getTiendoHoanthanh,
} = require("../utils");

// them dai ly
daily1Router.post("/them", async (req, res) => {
  const { ten, sdt, email, xa, huyen, tinh, taikhoan, bophankdId, gsvId } =
    req.body;
  try {
    // create daily 1
    const newDaily1 = new Daily1({
      ten,
      sdt,
      email,
      xa,
      huyen,
      tinh,
      taikhoan,
      giamsatvung: gsvId,
    });
    const savedDaily1 = await newDaily1.save();

    if (savedDaily1) {
      // Thêm vào danh sách đại lý 1 của GSV
      const gsv = await Giamsatvung.findById(gsvId);
      gsv.daily1 = [savedDaily1._id, ...gsv.daily1];
      await gsv.save();
      // Thêm vào danh sách duyệt đại lý 1 của bộ phận kinh doanh
      const bophankd = await Bophankd.findById(bophankdId);
      bophankd.daily1 = [savedDaily1._id, ...bophankd.daily1];
      await bophankd.save();
    }

    res.send({ savedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// cap nhat thong tin ca nhan
daily1Router.put(
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
      const dl1 = await Daily1.findOne({ user });
      dl1.ten = ten;
      dl1.sdt = sdt;
      dl1.email = email;
      dl1.xa = xa;
      dl1.huyen = huyen;
      dl1.tinh = tinh;
      dl1.avatar = req.file ? req.file.filename : dl1.avatar;
      const updatedDl1 = await dl1.save();

      res.send({ updatedDl1, success: true });
    } catch (error) {
      res.send({ message: error.message, success: false });
    }
  }
);

// chinh sua dai ly
daily1Router.put("/single/:id", async (req, res) => {
  const { ten, sdt, email, xa, huyen, tinh, matkhau } = req.body;
  try {
    const daily1 = await Daily1.findById(req.params.id);
    if (matkhau) {
      const user = await User.findById(daily1.user);
      user.matkhau = bcrypt.hashSync(matkhau, 8);
      await user.save();
    }
    daily1.ten = ten;
    daily1.sdt = sdt;
    daily1.email = email;
    daily1.xa = xa;
    daily1.huyen = huyen;
    daily1.tinh = tinh;
    const updatedDaily1 = await daily1.save();

    res.send({ updatedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach dai ly 1
daily1Router.get("/danhsach", async (req, res) => {
  try {
    const daily1 = await Daily1.find({})
      .populate("user")
      .sort({ createdAt: "desc" });
    if (!daily1.length) {
      return res.send({
        message: "Không tìm thấy đại lý 1 nào",
        success: false,
      });
    }
    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds daily 1 chưa có bộ phận kinh doanh
daily1Router.get("/dsdaily1bpkdnull", async (req, res) => {
  try {
    const dl1 = await Daily1.find({}).populate("user");
    if (!dl1.length) {
      return res.send({
        message: "Không tìm thấy đại lý 1 nào",
        success: false,
      });
    }
    const daily1 = dl1.filter((item) => !item.bophankd);
    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 dai ly
daily1Router.get("/single/:id", async (req, res) => {
  try {
    const daily1 = await Daily1.findById(req.params.id)
      .populate({
        path: "daily2 hodan user donhang subdonhang dscongcu dsvattu dsnguyenlieu dssanpham",
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

    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 dai ly 1
daily1Router.delete("/single/:id", async (req, res) => {
  try {
    // xoa user
    const daily1 = await Daily1.findById(req.params.id);
    if (daily1.user) {
      await User.findByIdAndDelete(daily1.user);
    }
    // xoa bophankd
    const removedDaily1 = await Daily1.findByIdAndDelete(req.params.id);
    res.send({ removedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` daily 1
daily1Router.put("/multiple", async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      // xoa user
      const daily1 = await Daily1.findById(item);
      if (daily1.user) {
        await User.findByIdAndDelete(daily1.user);
      }
      // xoa bophankd
      await Daily1.findByIdAndDelete(item);
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// get single daily1 based userId
daily1Router.get("/user/:id", async (req, res) => {
  try {
    const daily1 = await Daily1.findOne({ user: req.params.id }).populate(
      "user"
    );
    if (!daily1) {
      return res.send({ message: "Không tìm thấy đại lý", success: false });
    }
    res.send({ daily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// daily1 them daily2
daily1Router.put("/themdaily2", async (req, res) => {
  const { daily1Id, daily2Arr } = req.body;
  try {
    // update Daily1 collection, field: daily2
    const daily1 = await Daily1.findById(daily1Id);
    daily1.daily2 = [...daily2Arr, ...daily1.daily2];
    // update Daily2 collection, field: daily1
    for (const item of daily2Arr) {
      const daily2 = await Daily2.findById(item);
      daily2.daily1 = daily1Id;
      await daily2.save();
    }
    const updatedDaily1 = await daily1.save();
    res.send({ updatedDaily1, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` daily 2 thuoc daily1Id
daily1Router.put("/xoanhieudaily2", async (req, res) => {
  const { daily1Id, arrayOfId } = req.body;
  // console.log(req.body);
  try {
    const daily1 = await Daily1.findById(daily1Id);
    for (const item of arrayOfId) {
      // update filed daily2[], collection: Daily1
      daily1.daily2 = daily1.daily2.filter((_item) => _item != item);
      await daily1.save();
      // update field daily1, collection: Daily2
      const dl2 = await Daily2.findById(item);
      dl2.daily1 = null;
      await dl2.save();
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach phan phat CONG CU thuoc dly1
daily1Router.get("/dsphanphat/:daily1Id", async (req, res) => {
  try {
    let { dsphanphat } = await Daily1.findById(req.params.daily1Id)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to items",
            populate: {
              path: "bophankd daily1 daily2 hodan",
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

// lay danh sach phan phat VAT TU thuoc dly1
daily1Router.get("/dsvattuphanphat/:daily1Id", async (req, res) => {
  try {
    let { dsphanphat } = await Daily1.findById(req.params.daily1Id)
      .select("dsphanphat")
      .populate({
        path: "dsphanphat",
        populate: {
          path: "phanphat",
          populate: {
            path: "from to items",
            populate: {
              path: "bophankd daily1 daily2 hodan",
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

// lay 1 phan phat thuoc dly1
daily1Router.get("/singlephanphat/:daily1Id/:phanphatId", async (req, res) => {
  try {
    const { dsphanphat } = await Daily1.findById(req.params.daily1Id)
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
      (item) => item.phanphat._id.toString() == req.params.phanphatId
    );
    res.send({ phanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach cong cu thuoc daily 1
daily1Router.get("/danhsachcongcu/:daily1Id", async (req, res) => {
  try {
    let congcu = await Daily1.findById(req.params.daily1Id)
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
          path: "congcu",
        },
      })
      .populate({
        path: "items",
        populate: {
          path: "vattu",
        },
      });

    if (!congcu) {
      return res.send({
        message: "Không có công cụ nào trong kho",
        success: false,
      });
    }
    congcu = congcu.items.filter((item) => item.congcu);

    res.send({ dsCongcu: congcu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach vattu thuoc daily 1
daily1Router.get("/danhsachvattu/:daily1Id", async (req, res) => {
  try {
    let vattu = await Daily1.findById(req.params.daily1Id)
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
          path: "congcu",
        },
      })
      .populate({
        path: "items",
        populate: {
          path: "vattu",
        },
      });

    if (!vattu) {
      return res.send({
        message: "Không có công cụ nào trong kho",
        success: false,
      });
    }
    vattu = vattu.items.filter((item) => item.vattu);

    res.send({ dsvattu: vattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Lay danh sach hodan thuoc dai ly 1
daily1Router.get("/dshodan/:daily1Id", async (req, res) => {
  try {
    const { hodan } = await Daily1.findById(req.params.daily1Id)
      .select("hodan")
      .populate({
        path: "hodan",
        populate: {
          path: "langnghe loaisanpham",
        },
      });

    if (!hodan.length) {
      return res.send({
        message: "Không tìm thấy hộ dân nào",
        success: false,
      });
    }

    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Duyệt hộ dân
daily1Router.put("/duyet/:hodanId/:daily1Id", async (req, res) => {
  try {
    //tạo tài khoản ho dan trong User collection
    const hodan = await Hodan.findById(req.params.hodanId);
    const newUser = new User({
      taikhoan: hodan.taikhoan,
      matkhau: bcrypt.hashSync("123456", 8),
      vaitro: "hodan",
    });
    const savedUser = await newUser.save();
    hodan.user = savedUser ? savedUser._id : null;
    hodan.active = true;
    hodan.daily1 = req.params.daily1Id;
    const updatedHodan = await hodan.save();

    const hdLoaiSanpham = updatedHodan.loaisanpham;
    // Cập nhật loại sản phẩm cho daily2
    const daily2 = await Daily2.findById(updatedHodan.daily2);
    daily2.loaisanpham = !daily2.loaisanpham.includes(hdLoaiSanpham)
      ? [hdLoaiSanpham, ...daily2.loaisanpham]
      : daily2.loaisanpham;
    const updatedDaily2 = await daily2.save();
    // Cập nhật loại sản phẩm cho daily1
    const daily1 = await Daily1.findById(updatedDaily2.daily1);
    daily1.loaisanpham = !daily1.loaisanpham.includes(hdLoaiSanpham)
      ? [hdLoaiSanpham, ...daily1.loaisanpham]
      : daily1.loaisanpham;
    const updatedDaily1 = await daily1.save();
    // Cập nhật loại sản phẩm cho gsv
    const gsv = await Giamsatvung.findById(updatedDaily1.giamsatvung);
    gsv.loaisanpham = !gsv.loaisanpham.includes(hdLoaiSanpham)
      ? [hdLoaiSanpham, ...gsv.loaisanpham]
      : gsv.loaisanpham;
    await gsv.save();

    res.send({ updatedHodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds don hang thuoc daily1
daily1Router.get("/dsdonhang/:daily1Id", async (req, res) => {
  try {
    let { donhang } = await Daily1.findById(req.params.daily1Id)
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

// lay danh sach daily 2 thuoc daily 1
daily1Router.get("/dsdaily2/:daily1Id", async (req, res) => {
  try {
    let { daily2 } = await Daily1.findById(req.params.daily1Id)
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

// lay danh sach SUB don hang thuoc daily1
daily1Router.get("/dssubdonhang/:daily1Id/:ma", async (req, res) => {
  try {
    let { subdonhang } = await Daily1.findById(req.params.daily1Id)
      .select("subdonhang")
      .populate({
        path: "subdonhang",
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
            path: "daily2",
            populate: {
              path: "daily1 loaisanpham",
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

// lay danh sach sanpham thuoc Daily1
daily1Router.get("/dssanpham/:daily1Id", async (req, res) => {
  try {
    const { dssanpham } = await Daily1.findById(req.params.daily1Id)
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

// lay danh sach vattu thuoc Daily1
daily1Router.get("/dsvattu/:daily1Id", async (req, res) => {
  try {
    let { dsvattu } = await Daily1.findById(req.params.daily1Id)
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
daily1Router.get("/dsnguyenlieu/:daily1Id", async (req, res) => {
  try {
    const { dsnguyenlieu } = await Daily1.findById(req.params.daily1Id)
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

// lay danh sach congcu thuoc Daily1
daily1Router.get("/dscongcu/:daily1Id", async (req, res) => {
  try {
    let { dscongcu } = await Daily1.findById(req.params.daily1Id)
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
daily1Router.get("/tongquan/:daily1Id", async (req, res) => {
  try {
    let daily1 = await Daily1.findById(req.params.daily1Id).populate(
      "dssanpham dscongcu dsvattu dsnguyenlieu daily2 hodan donhang"
    );

    res.send({
      dssanpham: daily1.dssanpham.length,
      dscongcu: daily1.dscongcu.length,
      dsvattu: daily1.dsvattu.length,
      dsnguyenlieu: daily1.dsnguyenlieu.length,
      dsdaily2: daily1.daily2.length,
      dshodan: daily1.hodan.length,
      dsdonhang: daily1.donhang.length,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds hodan, donhang chua duyet hien thi badge
daily1Router.get("/dsshowbadge/:daily1Id", async (req, res) => {
  try {
    // Hodan
    let { hodan } = await Daily1.findById(req.params.daily1Id)
      .select("hodan")
      .populate("hodan");
    hodan = hodan.filter((hd) => !hd.user);
    // Donhang
    let { donhang } = await Daily1.findById(req.params.daily1Id)
      .select("donhang")
      .populate("donhang");
    donhang = donhang.filter((dh) => !dh.xacnhan);

    res.send({
      hodanBadge: hodan.length,
      donhangBadge: donhang.length,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});
//--------------------------------------------

// them cong cu hu loi
daily1Router.put("/themcchuloi/:dl1Id", async (req, res) => {
  const { dsccLoi } = req.body;
  try {
    for (const cc of dsccLoi) {
      const daily1 = await Daily1.findById(req.params.dl1Id);
      daily1.dscongcu = daily1.dscongcu.map((item) =>
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
      await daily1.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds cong cu hu loi
daily1Router.get("/dscchuloi/:dl1Id", async (req, res) => {
  try {
    let { dscongcu: dscongcuhuloi } = await Daily1.findById(req.params.dl1Id)
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
daily1Router.put("/themvthuloi/:dl1Id", async (req, res) => {
  const { dsvtLoi } = req.body;
  try {
    for (const vt of dsvtLoi) {
      const daily1 = await Daily1.findById(req.params.dl1Id);
      daily1.dsvattu = daily1.dsvattu.map((item) =>
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
      await daily1.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds vat tu hu loi
daily1Router.get("/dsvthuloi/:dl1Id", async (req, res) => {
  try {
    let { dsvattu: dsvattuhuloi } = await Daily1.findById(req.params.dl1Id)
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
daily1Router.put("/themnglhuloi/:dl1Id", async (req, res) => {
  const { dsnglLoi } = req.body;
  try {
    for (const ngl of dsnglLoi) {
      const daily1 = await Daily1.findById(req.params.dl1Id);
      daily1.dsnguyenlieu = daily1.dsnguyenlieu.map((item) =>
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
      await daily1.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds nguyen lieu hu loi
daily1Router.get("/dsnglhuloi/:dl1Id", async (req, res) => {
  try {
    let { dsnguyenlieu: dsnguyenlieuhuloi } = await Daily1.findById(
      req.params.dl1Id
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

// lay ds subdonhang cua 1 don hang co ma cu the va thuoc daily1 co ma daily1
daily1Router.get("/dssubdhofsingledh/:daily1Id/:madh", async (req, res) => {
  try {
    let { subdonhang } = await Daily1.findById(req.params.daily1Id)
      .select("subdonhang")
      .populate({
        path: "subdonhang",
        populate: {
          path: "to",
          populate: {
            path: "daily2",
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
daily1Router.get("/tiendodonhang/:dl1Id/:maDH", async (req, res) => {
  try {
    const daily1 = await Daily1.findById(req.params.dl1Id)
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
    // don hang tong hop cua daily1:
    const daily1Donhang = daily1.donhang.find(
      (dh) => dh.ma === req.params.maDH
    );
    // tong so luong sp cua dh goc (trường hợp này đơn hàng gốc là DL1)
    const tongSLSPDonhangGoc = daily1Donhang.tongsanpham;

    //-------------------------------
    let daily1Subdonhang = daily1.subdonhang;
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
      let daily2Donhang = daily1.donhang.find(
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

    //===============================================
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
    //=======================================
    // daily1 tien do hoan thanh
    const daily1TDHT = Math.round(
      (daily1Donhang.dssanpham.reduce(
        (acc, sp) => acc + (sp.danhan ? sp.danhan : 0),
        0
      ) /
        tongSLSPDonhangGoc) *
        100
    );
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
      daily1Nhandon: daily1Donhang.xacnhan,
      daily1TDHT,
      daily2TTND,
      daily2TDHT,
      hodanTTND,
      hodanTDHT,
      daily1DSDonhang: [daily1Donhang],
      daily2DSDonhang,
      hodanDSDonhang,
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = daily1Router;
