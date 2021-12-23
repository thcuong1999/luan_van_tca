const express = require("express");
const Hodan = require("../models/hodanModel");
const User = require("../models/userModel");
const hodanRouter = express.Router();
var bcrypt = require("bcryptjs");
const Langnghe = require("../models/langngheModel");
const Daily2 = require("../models/daily2Model");
const Daily1 = require("../models/daily1Model");
const Donhang = require("../models/donhangModel");
const Giamsatvung = require("../models/giamsatvungModel");
const Bophankd = require("../models/bophankdModel");
const { getCurrentDatetime } = require("../utils");
const upload = require("../middleware/imageUpload");

// them ho dan
hodanRouter.post("/them", async (req, res) => {
  const {
    daidien,
    xa,
    tinh,
    huyen,
    sdt,
    cmnd,
    namsinh,
    langnghe,
    loaisanpham,
    taikhoan,
    daily1,
    daily2,
  } = req.body;
  try {
    // create hodan
    const hodan = new Hodan({
      daidien,
      xa,
      tinh,
      huyen,
      sdt,
      cmnd,
      namsinh,
      langnghe,
      loaisanpham,
      taikhoan,
      daily2,
    });
    const savedHodan = await hodan.save();

    if (savedHodan) {
      // Thêm vào danh sách hộ dân của đại lý 2
      const singleDaily2 = await Daily2.findById(daily2);
      singleDaily2.hodan = [savedHodan._id, ...singleDaily2.hodan];
      await singleDaily2.save();
      // Thêm vào danh sách duyệt hộ dân của đại lý 1
      const singleDaily1 = await Daily1.findById(daily1);
      singleDaily1.hodan = [savedHodan._id, ...singleDaily1.hodan];
      await singleDaily1.save();
    }

    res.send({ savedHodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Doi mat khau
hodanRouter.put(
  "/capnhatthongtincanhan",
  upload.single("avatar"),
  async (req, res) => {
    const { matkhau, user } = req.body;
    // return res.send(req.body);
    try {
      // update password
      let updatedHodan;
      if (matkhau) {
        const _user = await User.findById(user);
        _user.matkhau = bcrypt.hashSync(matkhau, 8);
        updatedHodan = await _user.save();
      }

      res.send({ updatedHodan, success: true });
    } catch (error) {
      res.send({ message: error.message, success: false });
    }
  }
);

// chinh sua hodan
hodanRouter.put("/single/:id", async (req, res) => {
  const {
    daidien,
    matkhau,
    sdt,
    cmnd,
    namsinh,
    xa,
    huyen,
    tinh,
    langnghe,
    loaisanpham,
  } = req.body;
  try {
    const hodan = await Hodan.findById(req.params.id);
    if (matkhau) {
      const user = await User.findById(hodan.user);
      user.matkhau = bcrypt.hashSync(matkhau, 8);
      await user.save();
    }
    hodan.daidien = daidien;
    hodan.sdt = sdt;
    hodan.cmnd = cmnd;
    hodan.namsinh = namsinh;
    hodan.xa = xa;
    hodan.huyen = huyen;
    hodan.tinh = tinh;
    hodan.langnghe = langnghe;
    hodan.loaisanpham = loaisanpham;
    const updatedHodan = await hodan.save();

    res.send({ updatedHodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds ho dan
hodanRouter.get("/danhsach", async (req, res) => {
  try {
    const hodan = await Hodan.find({})
      .populate("user")
      .populate("langnghe loaisanpham")
      .sort({ createdAt: "desc" });
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

// lay ds ho dan thuoc langngheId
hodanRouter.get("/danhsach/:langngheId", async (req, res) => {
  try {
    const hodan = await Hodan.find({ langnghe: req.params.langngheId })
      .populate("user")
      .populate("langnghe");
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

// lay ds ho dan co' daily 2 la null
hodanRouter.get("/dsdaily2null", async (req, res) => {
  try {
    const hd = await Hodan.find({}).populate("user").populate("langnghe");
    const hodan = hd.filter((item) => !item.daily2);
    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// search hodan
hodanRouter.get("/search", async (req, res) => {
  const { daidien, diachi, sdt } = req.query;
  const filterDaidien = daidien ? { daidien } : {};
  const filterDiachi = diachi
    ? { diachi: { $regex: diachi, $options: "i" } }
    : {};
  const filterSdt = sdt ? { sdt } : {};
  try {
    const hodan = await Hodan.findOne({
      ...filterDaidien,
      ...filterSdt,
      ...filterDiachi,
    });
    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa 1 ho dan
hodanRouter.delete("/single/:id", async (req, res) => {
  try {
    // xoa user
    const hodan = await Hodan.findById(req.params.id);
    if (hodan.user) {
      await User.findByIdAndDelete(hodan.user);
    }
    // xoa hodan
    const removedHodan = await Hodan.findByIdAndDelete(req.params.id);
    res.send({ removedHodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// xoa nhieu` ho dan
hodanRouter.put("/multiple", async (req, res) => {
  const { arrayOfId } = req.body;
  try {
    for (const item of arrayOfId) {
      // xoa user
      const hodan = await Hodan.findById(item);
      if (hodan.user) {
        await User.findByIdAndDelete(hodan.user);
      }
      // xoa hodan
      await Hodan.findByIdAndDelete(item);

      // đối vs hộ dân đã active => filter lsp cho đl2 trên nó + đl1, gsv
      if (hodan.active) {
        // =========================
        const daily2 = await Daily2.findById(hodan.daily2).populate("hodan");
        const dsLspHodan = daily2.hodan.map((hd) => hd.loaisanpham.toString());
        const dsLspDaily2 = daily2.loaisanpham.map((item) => item.toString());
        // Loc loai sp of daily2
        const newLspDaily2 = dsLspDaily2.filter((lsp) =>
          dsLspHodan.includes(lsp)
        );
        daily2.loaisanpham = newLspDaily2;
        await daily2.save();
        // // =========================
        const daily1 = await Daily1.findById(daily2.daily1).populate("daily2");
        // gộp lsp của all dl2 thuộc dl1 này
        let lspAllDl2 = [];
        daily1.daily2.forEach((dl2) => {
          lspAllDl2 = [...dl2.loaisanpham, ...lspAllDl2];
        });
        lspAllDl2 = lspAllDl2.map((item) => item.toString());
        // Loc loai sp of daily1
        const newLspDaily1 = daily1.loaisanpham.filter((lsp) =>
          lspAllDl2.includes(lsp.toString())
        );
        daily1.loaisanpham = newLspDaily1;
        await daily1.save();

        // =========================
        const gsv = await Giamsatvung.findById(daily1.giamsatvung).populate(
          "daily1"
        );
        // gộp lsp của all dl1 thuộc gsv này
        let lspAllDl1 = [];
        gsv.daily1.forEach((dl1) => {
          lspAllDl1 = [...dl1.loaisanpham, ...lspAllDl1];
        });
        lspAllDl1 = lspAllDl1.map((item) => item.toString());
        // Loc loai sp of gsv
        const newLspGSV = gsv.loaisanpham.filter((lsp) =>
          lspAllDl1.includes(lsp.toString())
        );
        gsv.loaisanpham = newLspGSV;
        await gsv.save();
      }
    }
    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay thong tin 1 ho dan
hodanRouter.get("/single/:id", async (req, res) => {
  try {
    const hodan = await Hodan.findById(req.params.id)
      .populate("donhang")
      .populate({
        path: "dscongcu dsvattu dsnguyenlieu dssanpham",
        populate: {
          path: "donhang congcu vattu nguyenlieu sanpham",
        },
      })
      .populate("langnghe loaisanpham");

    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay 1 phan phat thuoc hodan
hodanRouter.get("/singlephanphat/:hodanId/:phanphatId", async (req, res) => {
  try {
    const { dsphanphat } = await Hodan.findById(req.params.hodanId)
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

// lay thong tin 1 ho dan based userId
hodanRouter.get("/singlehdbaseduser/:userId", async (req, res) => {
  try {
    const hodan = await Hodan.findOne({ user: req.params.userId });

    res.send({ hodan, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

//========================================
// lay ds phan phat  thuoc ho dan
hodanRouter.get("/dsphanphat/:hodanId", async (req, res) => {
  try {
    let { dsphanphat } = await Hodan.findById(req.params.hodanId)
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
    res.send({ dsphanphat, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});
// lay ds phan phat CONG CU thuoc ho dan
hodanRouter.get("/dscongcuphanphat/:hodanId", async (req, res) => {
  try {
    let { dsphanphat } = await Hodan.findById(req.params.hodanId)
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

// lay ds phan phat VAT TU thuoc ho dan
hodanRouter.get("/dsvattu/:hodanId", async (req, res) => {
  try {
    let { dsvattu } = await Hodan.findById(req.params.hodanId)
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

// lay danh sach CONG CU thuoc ho dan
hodanRouter.get("/dscongcu/:hodanId", async (req, res) => {
  try {
    let { dscongcu } = await Hodan.findById(req.params.hodanId)
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
// lay danh sach nguyenlieu thuoc hodan
hodanRouter.get("/dsnguyenlieu/:hodanId", async (req, res) => {
  try {
    const { dsnguyenlieu } = await Hodan.findById(req.params.hodanId)
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

// lay danh sach VAT TU thuoc ho dan
hodanRouter.get("/dsvattu/:hodanId", async (req, res) => {
  try {
    const { dsnguyenlieu } = await Hodan.findById(req.params.hodanId)
      .select("dsvattu")
      .populate({
        path: "dsvattu",
        populate: {
          path: "donhang vattu",
        },
      });
    res.send({ dsvattu, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// bao cao don hang -> within donhangRouter

// ds don hang thuoc ho dan
hodanRouter.get("/dsdonhang/:hodanId", async (req, res) => {
  try {
    const { donhang: dsdonhang } = await Hodan.findById(req.params.hodanId)
      .select("donhang")
      .populate({
        path: "donhang",
        populate: {
          path: "dssanpham dscongcu dsvattu dsnguyenlieu",
          populate: {
            path: "sanpham congcu vattu nguyenlieu",
          },
        },
      })
      .populate({
        path: "donhang",
        populate: {
          path: "from",
          populate: {
            path: "bophankd giamsatvung daily1 daily2",
          },
        },
      })
      .populate({
        path: "donhang",
        populate: {
          path: "to",
          populate: {
            path: "giamsatvung daily1 daily2 hodan",
          },
        },
      })
      .populate({
        path: "donhang",
        populate: {
          path: "dssanpham",
          populate: {
            path: "sanpham",
            populate: {
              path: "loaisanpham dscongcu.congcu dsvattu.vattu dsnguyenlieu.nguyenlieu",
            },
          },
        },
      });

    res.send({ dsdonhang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// ho dan xac nhan don hang
hodanRouter.put("/xacnhandh/:hodanId/:donhangId", async (req, res) => {
  try {
    const hodan = await Hodan.findById(req.params.hodanId);
    const donhang = await Donhang.findById(req.params.donhangId);

    // Hodan
    let dsspTemp = donhang.dssanpham.map((sp) => ({
      donhang: donhang._id.toString(),
      sanpham: sp.sanpham,
      soluong: sp.soluong,
      soluonghoanthanh: sp.soluonghoanthanh,
      ngaytao: donhang.ngaydathang,
    }));
    let dsccTemp = donhang.dscongcu.map((cc) => ({
      donhang: donhang._id.toString(),
      congcu: cc.congcu,
      soluong: cc.soluong,
      ngaytao: donhang.ngaydathang,
    }));
    let dsvtTemp = donhang.dsvattu.map((vt) => ({
      donhang: donhang._id.toString(),
      vattu: vt.vattu,
      soluong: vt.soluong,
      ngaytao: donhang.ngaydathang,
    }));
    let dsnglTemp = donhang.dsnguyenlieu.map((ngl) => ({
      donhang: donhang._id.toString(),
      nguyenlieu: ngl.nguyenlieu,
      khoiluong: ngl.khoiluong,
      ngaytao: donhang.ngaydathang,
    }));
    hodan.dssanpham = [...dsspTemp, ...hodan.dssanpham];
    hodan.dscongcu = [...dsccTemp, ...hodan.dscongcu];
    hodan.dsvattu = [...dsvtTemp, ...hodan.dsvattu];
    hodan.dsnguyenlieu = [...dsnglTemp, ...hodan.dsnguyenlieu];
    await hodan.save();

    // Donhang
    donhang.xacnhan = true;
    await donhang.save();

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});
// them cong cu hu loi
hodanRouter.put("/themcchuloi/:hodanId", async (req, res) => {
  const { dsccLoi } = req.body;
  try {
    for (const cc of dsccLoi) {
      const hodan = await Hodan.findById(req.params.hodanId);
      hodan.dscongcu = hodan.dscongcu.map((item) =>
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
      await hodan.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds cong cu hu loi
hodanRouter.get("/dscchuloi/:hodanId", async (req, res) => {
  try {
    let { dscongcu: dscongcuhuloi } = await Hodan.findById(req.params.hodanId)
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
hodanRouter.put("/themvthuloi/:hodanId", async (req, res) => {
  const { dsvtLoi } = req.body;
  try {
    for (const vt of dsvtLoi) {
      const hodan = await Hodan.findById(req.params.hodanId);
      hodan.dsvattu = hodan.dsvattu.map((item) =>
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
      await hodan.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds vat tu hu loi
hodanRouter.get("/dsvthuloi/:hodanId", async (req, res) => {
  try {
    let { dsvattu: dsvattuhuloi } = await Hodan.findById(req.params.hodanId)
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
hodanRouter.put("/themnglhuloi/:hodanId", async (req, res) => {
  const { dsnglLoi } = req.body;
  try {
    for (const ngl of dsnglLoi) {
      const hodan = await Hodan.findById(req.params.hodanId);
      hodan.dsnguyenlieu = hodan.dsnguyenlieu.map((item) =>
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
      await hodan.save();
    }

    res.send({ success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay ds nguyen lieu hu loi
hodanRouter.get("/dsnglhuloi/:hodanId", async (req, res) => {
  try {
    let { dsnguyenlieu: dsnguyenlieuhuloi } = await Hodan.findById(
      req.params.hodanId
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

// doi mat khau hodan
hodanRouter.patch("/changepassword/:id", async (req, res) => {
  const { matkhaucu, matkhaumoi } = req.body;
  try {
    // const hodan = await Hodan.findById(req.params.id);
    // const user = await User.findById(hodan.user);
    // if (bcrypt.compareSync(matkhaucu, user.matkhau)) {
    //   user.matkhau = bcrypt.hashSync(matkhaumoi, 8);
    //   await user.save();
    //   res.send({ updatedHodan, success: true });
    // } else {
    //   res.send({ Error: "Mat khau cu chua chinh xac" });
    // }
    res.send({ contar: req.body.matkhaumoi, asdsa: req.params });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// ho dan bao cao don hang
hodanRouter.put("/baocao", upload.single("hinhanh"), async (req, res) => {
  const { hodanId, donhangId, sanphamId, soluong } = req.body;
  try {
    // update Kho sanpham Hodan
    const hodan = await Hodan.findById(hodanId);
    hodan.dssanpham = hodan.dssanpham.map((sp) =>
      sp.donhang.toString() === donhangId && sp.sanpham.toString() === sanphamId
        ? {
            donhang: sp.donhang,
            sanpham: sp.sanpham,
            soluong: sp.soluong,
            soluonghoanthanh: sp.soluonghoanthanh + soluong,
            dagiao: sp.dagiao,
            ngaytao: sp.ngaytao,
          }
        : sp
    );
    await hodan.save();
    // Update don hang cua ho dan
    const donhang = await Donhang.findById(donhangId);
    donhang.dssanpham = donhang.dssanpham.map((sp) =>
      sp.sanpham.toString() === sanphamId.toString()
        ? {
            sanpham: sp.sanpham,
            soluong: sp.soluong,
            dagiao: sp.dagiao,
            soluonghoanthanh: sp.soluonghoanthanh + soluong,
          }
        : sp
    );
    donhang.hinhanhbaocao = req.file ? req.file.filename : "";
    await donhang.save();
    // Update don hang goc cua dai ly 2
    const daily2 = await Daily2.findById(donhang.from.daily2).populate(
      "donhang"
    );
    const dhdl2 = daily2.donhang.find((dh) => dh.ma === donhang.ma);
    const donhangdl2 = await Donhang.findById(dhdl2._id);
    donhangdl2.dssanpham = donhangdl2.dssanpham.map((sp) =>
      sp.sanpham.toString() === sanphamId.toString()
        ? {
            sanpham: sp.sanpham,
            soluong: sp.soluong,
            danhan: sp.danhan,
            dagiao: sp.dagiao,
            soluonghoanthanh: sp.soluonghoanthanh + soluong,
          }
        : sp
    );
    await donhangdl2.save();
    // Update kho don hang cua dai ly 2
    daily2.dssanpham = daily2.dssanpham.map((sp) =>
      sp.donhang.toString() === donhangdl2._id.toString() &&
      sp.sanpham.toString() === sanphamId.toString()
        ? {
            donhang: sp.donhang,
            sanpham: sp.sanpham,
            soluong: sp.soluong,
            soluonghoanthanh: sp.soluonghoanthanh + soluong,
            danhan: sp.danhan,
            dagiao: sp.dagiao,
            ngaytao: sp.ngaytao,
          }
        : sp
    );
    await daily2.save();
    //------------
    const daily1 = await Daily1.findById(dhdl2.from.daily1).populate("donhang");
    const dhdl1 = daily1.donhang.find((dh) => dh.ma === donhang.ma);
    const donhangdl1 = await Donhang.findById(dhdl1._id);
    donhangdl1.dssanpham = donhangdl1.dssanpham.map((sp) =>
      sp.sanpham.toString() === sanphamId.toString()
        ? {
            sanpham: sp.sanpham,
            soluong: sp.soluong,
            danhan: sp.danhan,
            dagiao: sp.dagiao,
            soluonghoanthanh: sp.soluonghoanthanh + soluong,
          }
        : sp
    );
    await donhangdl1.save();
    // Update kho don hang cua dai ly 1
    daily1.dssanpham = daily1.dssanpham.map((sp) =>
      sp.donhang.toString() === donhangdl1._id.toString() &&
      sp.sanpham.toString() === sanphamId.toString()
        ? {
            donhang: sp.donhang,
            sanpham: sp.sanpham,
            soluong: sp.soluong,
            soluonghoanthanh: sp.soluonghoanthanh + soluong,
            danhan: sp.danhan,
            dagiao: sp.dagiao,
            ngaytao: sp.ngaytao,
          }
        : sp
    );
    await daily1.save();
    //------------
    const gsv = await Giamsatvung.findById(dhdl1.from.giamsatvung).populate(
      "donhang"
    );
    const dhgsv = gsv.donhang.find((dh) => dh.ma === donhang.ma);
    const donhangGsv = await Donhang.findById(dhgsv._id);
    donhangGsv.dssanpham = donhangGsv.dssanpham.map((sp) =>
      sp.sanpham.toString() === sanphamId.toString()
        ? {
            sanpham: sp.sanpham,
            soluong: sp.soluong,
            danhan: sp.danhan,
            dagiao: sp.dagiao,
            soluonghoanthanh: sp.soluonghoanthanh + soluong,
          }
        : sp
    );
    await donhangGsv.save();
    // Update kho don hang cua giamsatvung
    gsv.dssanpham = gsv.dssanpham.map((sp) =>
      sp.donhang.toString() === donhangGsv._id.toString() &&
      sp.sanpham.toString() === sanphamId.toString()
        ? {
            donhang: sp.donhang,
            sanpham: sp.sanpham,
            soluong: sp.soluong,
            soluonghoanthanh: sp.soluonghoanthanh + soluong,
            danhan: sp.danhan,
            dagiao: sp.dagiao,
            ngaytao: sp.ngaytao,
          }
        : sp
    );
    await gsv.save();
    //-----------
    const bpkd = await Bophankd.findById(dhgsv.from.bophankd).populate(
      "donhang"
    );
    const dhBpkd = bpkd.donhang.find((dh) => dh.ma === donhang.ma);
    const donhangBpkd = await Donhang.findById(dhBpkd._id);
    donhangBpkd.dssanpham = donhangBpkd.dssanpham.map((sp) =>
      sp.sanpham.toString() === sanphamId.toString()
        ? {
            sanpham: sp.sanpham,
            soluong: sp.soluong,
            danhan: sp.danhan,
            dagiao: sp.dagiao,
            soluonghoanthanh: sp.soluonghoanthanh + soluong,
          }
        : sp
    );
    const savedDH = await donhangBpkd.save();
    // Update kho don hang cua bophankd
    bpkd.dssanpham = bpkd.dssanpham.map((sp) =>
      sp.donhang.toString() === donhangBpkd._id.toString() &&
      sp.sanpham.toString() === sanphamId.toString()
        ? {
            donhang: sp.donhang,
            sanpham: sp.sanpham,
            soluong: sp.soluong,
            soluonghoanthanh: sp.soluonghoanthanh + soluong,
            danhan: sp.danhan,
            dagiao: sp.dagiao,
            ngaytao: sp.ngaytao,
          }
        : sp
    );
    await bpkd.save();

    res.send({ savedDH, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// Tổng hợp số liệu tổng quát của tiến độ đơn hàng
hodanRouter.get("/tiendodonhang/:hodanId/:maDH", async (req, res) => {
  try {
    const hodan = await Hodan.findById(req.params.hodanId).populate({
      path: "donhang",
      populate: {
        path: "from to dssanpham dscongcu dsvattu dsnguyenlieu",
        populate: {
          path: "daily2 hodan sanpham congcu vattu nguyenlieu",
        },
      },
    });
    // don hang tong hop cua daily1:
    const hodanDonhang = hodan.donhang.find((dh) => dh.ma === req.params.maDH);
    // tong so luong sp cua dh goc (trường hợp này đơn hàng gốc là HD)
    const tongSLSPDonhangGoc = hodanDonhang.tongsanpham;
    // ho dan tien do hoan thanh
    const hodanTDHT = Math.round(
      (hodanDonhang.dssanpham.reduce(
        (acc, sp) => acc + sp.soluonghoanthanh,
        0
      ) /
        tongSLSPDonhangGoc) *
        100
    );
    //-------------------------------
    res.send({
      hodanNhandon: hodanDonhang.xacnhan,
      hodanTDHT,
      hodanDSDonhang: [hodanDonhang],
      success: true,
    });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = hodanRouter;

// const express = require("express");
// const Hodan = require("../models/hodanModel");
// const User = require("../models/userModel");
// const hodanRouter = express.Router();
// var bcrypt = require("bcryptjs");
// const Langnghe = require("../models/langngheModel");
// const Daily2 = require("../models/daily2Model");
// const Daily1 = require("../models/daily1Model");
// const Donhang = require("../models/donhangModel");
// const upload = require("../middleware/imageUpload");
// const Giamsatvung = require("../models/giamsatvungModel");
// const Bophankd = require("../models/bophankdModel");

// // them ho dan
// hodanRouter.post("/them", async (req, res) => {
//   const {
//     daidien,
//     xa,
//     tinh,
//     huyen,
//     sdt,
//     cmnd,
//     namsinh,
//     langnghe,
//     loaisanpham,
//     taikhoan,
//     daily1,
//     daily2,
//   } = req.body;
//   try {
//     // create hodan
//     const hodan = new Hodan({
//       daidien,
//       xa,
//       tinh,
//       huyen,
//       sdt,
//       cmnd,
//       namsinh,
//       langnghe,
//       loaisanpham,
//       taikhoan,
//       daily2,
//     });
//     const savedHodan = await hodan.save();

//     if (savedHodan) {
//       // Thêm vào danh sách hộ dân của đại lý 2
//       const singleDaily2 = await Daily2.findById(daily2);
//       singleDaily2.hodan = [savedHodan._id, ...singleDaily2.hodan];
//       await singleDaily2.save();
//       // Thêm vào danh sách duyệt hộ dân của đại lý 1
//       const singleDaily1 = await Daily1.findById(daily1);
//       singleDaily1.hodan = [savedHodan._id, ...singleDaily1.hodan];
//       await singleDaily1.save();
//     }

//     res.send({ savedHodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // chinh sua hodan
// hodanRouter.put("/single/:id", async (req, res) => {
//   const {
//     daidien,
//     matkhau,
//     sdt,
//     cmnd,
//     namsinh,
//     xa,
//     huyen,
//     tinh,
//     langnghe,
//     loaisanpham,
//   } = req.body;
//   try {
//     const hodan = await Hodan.findById(req.params.id);
//     if (matkhau) {
//       const user = await User.findById(hodan.user);
//       user.matkhau = bcrypt.hashSync(matkhau, 8);
//       await user.save();
//     }
//     hodan.daidien = daidien;
//     hodan.sdt = sdt;
//     hodan.cmnd = cmnd;
//     hodan.namsinh = namsinh;
//     hodan.xa = xa;
//     hodan.huyen = huyen;
//     hodan.tinh = tinh;
//     hodan.langnghe = langnghe;
//     hodan.loaisanpham = loaisanpham;
//     const updatedHodan = await hodan.save();

//     res.send({ updatedHodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds ho dan
// hodanRouter.get("/danhsach", async (req, res) => {
//   try {
//     const hodan = await Hodan.find({})
//       .populate("user")
//       .populate("langnghe loaisanpham")
//       .sort({ createdAt: "desc" });
//     if (!hodan.length) {
//       return res.send({
//         message: "Không tìm thấy hộ dân nào",
//         success: false,
//       });
//     }
//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds ho dan thuoc langngheId
// hodanRouter.get("/danhsach/:langngheId", async (req, res) => {
//   try {
//     const hodan = await Hodan.find({ langnghe: req.params.langngheId })
//       .populate("user")
//       .populate("langnghe");
//     if (!hodan.length) {
//       return res.send({
//         message: "Không tìm thấy hộ dân nào",
//         success: false,
//       });
//     }
//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds ho dan co' daily 2 la null
// hodanRouter.get("/dsdaily2null", async (req, res) => {
//   try {
//     const hd = await Hodan.find({}).populate("user").populate("langnghe");
//     const hodan = hd.filter((item) => !item.daily2);
//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // search hodan
// hodanRouter.get("/search", async (req, res) => {
//   const { daidien, diachi, sdt } = req.query;
//   const filterDaidien = daidien ? { daidien } : {};
//   const filterDiachi = diachi
//     ? { diachi: { $regex: diachi, $options: "i" } }
//     : {};
//   const filterSdt = sdt ? { sdt } : {};
//   try {
//     const hodan = await Hodan.findOne({
//       ...filterDaidien,
//       ...filterSdt,
//       ...filterDiachi,
//     });
//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // xoa 1 ho dan
// hodanRouter.delete("/single/:id", async (req, res) => {
//   try {
//     // xoa user
//     const hodan = await Hodan.findById(req.params.id);
//     if (hodan.user) {
//       await User.findByIdAndDelete(hodan.user);
//     }
//     // xoa hodan
//     const removedHodan = await Hodan.findByIdAndDelete(req.params.id);
//     res.send({ removedHodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // xoa nhieu` ho dan
// hodanRouter.put("/multiple", async (req, res) => {
//   const { arrayOfId } = req.body;
//   try {
//     for (const item of arrayOfId) {
//       // xoa user
//       const hodan = await Hodan.findById(item);
//       if (hodan.user) {
//         await User.findByIdAndDelete(hodan.user);
//       }
//       // xoa hodan
//       await Hodan.findByIdAndDelete(item);
//     }
//     res.send({ success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay thong tin 1 ho dan
// hodanRouter.get("/single/:id", async (req, res) => {
//   try {
//     const hodan = await Hodan.findById(req.params.id)
//       .populate("donhang")
//       .populate({
//         path: "dscongcu dsvattu dsnguyenlieu dssanpham",
//         populate: {
//           path: "donhang congcu vattu nguyenlieu sanpham",
//         },
//       });

//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay 1 phan phat thuoc hodan
// hodanRouter.get("/singlephanphat/:hodanId/:phanphatId", async (req, res) => {
//   try {
//     const { dsphanphat } = await Hodan.findById(req.params.hodanId)
//       .select("dsphanphat")
//       .populate({
//         path: "dsphanphat",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to items",
//             populate: {
//               path: "bophankd daily1 daily2 hodan congcu vattu",
//             },
//           },
//         },
//       });
//     const phanphat = dsphanphat.find(
//       (item) => item.phanphat._id.toString() === req.params.phanphatId
//     );
//     res.send({ phanphat, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay thong tin 1 ho dan based userId
// hodanRouter.get("/singlehdbaseduser/:userId", async (req, res) => {
//   try {
//     const hodan = await Hodan.findOne({ user: req.params.userId });

//     res.send({ hodan, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// //========================================
// // lay ds phan phat  thuoc ho dan
// hodanRouter.get("/dsphanphat/:hodanId", async (req, res) => {
//   try {
//     let { dsphanphat } = await Hodan.findById(req.params.hodanId)
//       .select("dsphanphat")
//       .populate({
//         path: "dsphanphat",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to items",
//             populate: {
//               path: "bophankd daily1 daily2 hodan congcu",
//             },
//           },
//         },
//       });
//     res.send({ dsphanphat, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds phan phat CONG CU thuoc ho dan
// hodanRouter.get("/dscongcuphanphat/:hodanId", async (req, res) => {
//   try {
//     let { dsphanphat } = await Hodan.findById(req.params.hodanId)
//       .select("dsphanphat")
//       .populate({
//         path: "dsphanphat",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to items",
//             populate: {
//               path: "bophankd daily1 daily2 hodan congcu",
//             },
//           },
//         },
//       });
//     dsphanphat = dsphanphat.filter(
//       (item) => item.phanphat.phanphattype === "congcu"
//     );
//     res.send({ dsphanphat, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds phan phat VAT TU thuoc ho dan
// hodanRouter.get("/dsvattuphanphat/:hodanId", async (req, res) => {
//   try {
//     let { dsphanphat } = await Hodan.findById(req.params.hodanId)
//       .select("dsphanphat")
//       .populate({
//         path: "dsphanphat",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to items",
//             populate: {
//               path: "bophankd daily1 daily2 hodan vattu",
//             },
//           },
//         },
//       });
//     dsphanphat = dsphanphat.filter(
//       (item) => item.phanphat.phanphattype === "vattu"
//     );
//     res.send({ dsphanphat, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay danh sach CONG CU thuoc ho dan
// hodanRouter.get("/danhsachcongcu/:hodanId", async (req, res) => {
//   try {
//     let dscongcu = await Hodan.findById(req.params.hodanId)
//       .select("items")
//       .populate({
//         path: "items",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to",
//             populate: {
//               path: "bophankd daily1 daily2 hodan",
//             },
//           },
//         },
//       })
//       .populate({
//         path: "items",
//         populate: {
//           path: "congcu",
//         },
//       });

//     if (!dscongcu) {
//       return res.send({
//         message: "Không có công cụ nào trong kho",
//         success: false,
//       });
//     }
//     dscongcu = dscongcu.items.filter((item) => item.congcu);
//     res.send({ dscongcu, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay danh sach VAT TU thuoc ho dan
// hodanRouter.get("/danhsachvattu/:hodanId", async (req, res) => {
//   try {
//     let dsvattu = await Hodan.findById(req.params.hodanId)
//       .select("items")
//       .populate({
//         path: "items",
//         populate: {
//           path: "phanphat",
//           populate: {
//             path: "from to",
//             populate: {
//               path: "bophankd daily1 daily2 hodan",
//             },
//           },
//         },
//       })
//       .populate({
//         path: "items",
//         populate: {
//           path: "vattu",
//         },
//       });

//     if (!dsvattu) {
//       return res.send({
//         message: "Không có công cụ nào trong kho",
//         success: false,
//       });
//     }
//     dsvattu = dsvattu.items.filter((item) => item.vattu);
//     res.send({ dsvattu, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // ds don hang thuoc ho dan
// hodanRouter.get("/dsdonhang/:hodanId", async (req, res) => {
//   try {
//     const { donhang: dsdonhang } = await Hodan.findById(req.params.hodanId)
//       .select("donhang")
//       .populate({
//         path: "donhang",
//         populate: {
//           path: "dssanpham dscongcu dsvattu dsnguyenlieu",
//           populate: {
//             path: "sanpham congcu vattu nguyenlieu",
//           },
//         },
//       })
//       .populate({
//         path: "donhang",
//         populate: {
//           path: "from",
//           populate: {
//             path: "bophankd giamsatvung daily1 daily2",
//           },
//         },
//       })
//       .populate({
//         path: "donhang",
//         populate: {
//           path: "to",
//           populate: {
//             path: "giamsatvung daily1 daily2 hodan",
//           },
//         },
//       })
//       .populate({
//         path: "donhang",
//         populate: {
//           path: "dssanpham",
//           populate: {
//             path: "sanpham",
//             populate: {
//               path: "loaisanpham dscongcu.congcu dsvattu.vattu dsnguyenlieu.nguyenlieu",
//             },
//           },
//         },
//       });

//     res.send({ dsdonhang, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // ho dan xac nhan don hang => khoi tao kho sanpham, congcu, vattu, nguyenlieu
// hodanRouter.put("/xacnhandh/:hodanId/:donhangId", async (req, res) => {
//   try {
//     const hodan = await Hodan.findById(req.params.hodanId);
//     const donhang = await Donhang.findById(req.params.donhangId);

//     // Hodan
//     let dsspTemp = donhang.dssanpham.map((sp) => ({
//       donhang: donhang._id.toString(),
//       sanpham: sp.sanpham,
//       soluong: sp.soluong,
//       soluonghoanthanh: sp.soluonghoanthanh,
//       ngaytao: donhang.ngaydathang,
//     }));
//     let dsccTemp = donhang.dscongcu.map((cc) => ({
//       donhang: donhang._id.toString(),
//       congcu: cc.congcu,
//       soluong: cc.soluong,
//       ngaytao: donhang.ngaydathang,
//     }));
//     let dsvtTemp = donhang.dsvattu.map((vt) => ({
//       donhang: donhang._id.toString(),
//       vattu: vt.vattu,
//       soluong: vt.soluong,
//       ngaytao: donhang.ngaydathang,
//     }));
//     let dsnglTemp = donhang.dsnguyenlieu.map((ngl) => ({
//       donhang: donhang._id.toString(),
//       nguyenlieu: ngl.nguyenlieu,
//       khoiluong: ngl.khoiluong,
//       ngaytao: donhang.ngaydathang,
//     }));
//     hodan.dssanpham = [...dsspTemp, ...hodan.dssanpham];
//     hodan.dscongcu = [...dsccTemp, ...hodan.dscongcu];
//     hodan.dsvattu = [...dsvtTemp, ...hodan.dsvattu];
//     hodan.dsnguyenlieu = [...dsnglTemp, ...hodan.dsnguyenlieu];
//     await hodan.save();

//     // Donhang
//     donhang.xacnhan = true;
//     await donhang.save();

//     res.send({ success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// ////=========================

// // them cong cu hu loi
// hodanRouter.put("/themcchuloi/:hodanId", async (req, res) => {
//   const { dsccLoi } = req.body;
//   try {
//     for (const cc of dsccLoi) {
//       const hodan = await Hodan.findById(req.params.hodanId);
//       hodan.dscongcu = hodan.dscongcu.map((item) =>
//         item.congcu.toString() === cc.congcu._id &&
//         item.donhang.toString() === cc.donhang._id &&
//         item.loi.soluongloi
//           ? {
//               donhang: item.donhang,
//               congcu: item.congcu,
//               loi: {
//                 soluongloi: item.loi.soluongloi + parseInt(cc.soluongloi),
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               soluong: item.soluong,
//               ngaytao: item.ngaytao,
//             }
//           : item.congcu.toString() === cc.congcu._id &&
//             item.donhang.toString() === cc.donhang._id
//           ? {
//               donhang: item.donhang,
//               congcu: item.congcu,
//               loi: {
//                 soluongloi: cc.soluongloi,
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               soluong: item.soluong,
//               ngaytao: item.ngaytao,
//             }
//           : item
//       );
//       await hodan.save();
//     }

//     res.send({ success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds cong cu hu loi
// hodanRouter.get("/dscchuloi/:hodanId", async (req, res) => {
//   try {
//     let { dscongcu: dscongcuhuloi } = await Hodan.findById(req.params.hodanId)
//       .select("dscongcu")
//       .populate({
//         path: "dscongcu",
//         populate: {
//           path: "donhang congcu",
//         },
//       });

//     dscongcuhuloi = dscongcuhuloi.filter((cc) => cc.loi.soluongloi);

//     res.send({ dscongcuhuloi, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// //--------------------------------------------

// // them vat tu hu loi
// hodanRouter.put("/themvthuloi/:hodanId", async (req, res) => {
//   const { dsvtLoi } = req.body;
//   try {
//     for (const vt of dsvtLoi) {
//       const hodan = await Hodan.findById(req.params.hodanId);
//       hodan.dsvattu = hodan.dsvattu.map((item) =>
//         item.vattu.toString() === vt.vattu._id &&
//         item.donhang.toString() === vt.donhang._id &&
//         item.loi.soluongloi
//           ? {
//               donhang: item.donhang,
//               vattu: item.vattu,
//               loi: {
//                 soluongloi: item.loi.soluongloi + parseInt(vt.soluongloi),
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               soluong: item.soluong,
//               ngaytao: item.ngaytao,
//             }
//           : item.vattu.toString() === vt.vattu._id &&
//             item.donhang.toString() === vt.donhang._id
//           ? {
//               donhang: item.donhang,
//               vattu: item.vattu,
//               loi: {
//                 soluongloi: vt.soluongloi,
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               soluong: item.soluong,
//               ngaytao: item.ngaytao,
//             }
//           : item
//       );
//       await hodan.save();
//     }

//     res.send({ success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds vat tu hu loi
// hodanRouter.get("/dsvthuloi/:hodanId", async (req, res) => {
//   try {
//     let { dsvattu: dsvattuhuloi } = await Hodan.findById(req.params.hodanId)
//       .select("dsvattu")
//       .populate({
//         path: "dsvattu",
//         populate: {
//           path: "donhang vattu",
//         },
//       });

//     dsvattuhuloi = dsvattuhuloi.filter((vt) => vt.loi.soluongloi);

//     res.send({ dsvattuhuloi, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// //--------------------------------------------

// // them nguyen lieu hu loi
// hodanRouter.put("/themnglhuloi/:hodanId", async (req, res) => {
//   const { dsnglLoi } = req.body;
//   try {
//     for (const ngl of dsnglLoi) {
//       const hodan = await Hodan.findById(req.params.hodanId);
//       hodan.dsnguyenlieu = hodan.dsnguyenlieu.map((item) =>
//         item.nguyenlieu.toString() === ngl.nguyenlieu._id &&
//         item.donhang.toString() === ngl.donhang._id &&
//         item.loi.khoiluongloi
//           ? {
//               donhang: item.donhang,
//               nguyenlieu: item.nguyenlieu,
//               loi: {
//                 khoiluongloi:
//                   item.loi.khoiluongloi + parseInt(ngl.khoiluongloi),
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               khoiluong: item.khoiluong,
//               ngaytao: item.ngaytao,
//             }
//           : item.nguyenlieu.toString() === ngl.nguyenlieu._id &&
//             item.donhang.toString() === ngl.donhang._id
//           ? {
//               donhang: item.donhang,
//               nguyenlieu: item.nguyenlieu,
//               loi: {
//                 khoiluongloi: ngl.khoiluongloi,
//                 ngaybaoloi: getCurrentDatetime(),
//               },
//               khoiluong: item.khoiluong,
//               ngaytao: item.ngaytao,
//             }
//           : item
//       );
//       await hodan.save();
//     }

//     res.send({ success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// // lay ds nguyen lieu hu loi
// hodanRouter.get("/dsnglhuloi/:hodanId", async (req, res) => {
//   try {
//     let { dsnguyenlieu: dsnguyenlieuhuloi } = await Hodan.findById(
//       req.params.hodanId
//     )
//       .select("dsnguyenlieu")
//       .populate({
//         path: "dsnguyenlieu",
//         populate: {
//           path: "donhang nguyenlieu",
//         },
//       });

//     dsnguyenlieuhuloi = dsnguyenlieuhuloi.filter((ngl) => ngl.loi.khoiluongloi);

//     res.send({ dsnguyenlieuhuloi, success: true });
//   } catch (error) {
//     res.send({ message: error.message, success: false });
//   }
// });

// module.exports = hodanRouter;
