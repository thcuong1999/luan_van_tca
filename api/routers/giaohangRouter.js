const express = require("express");
const giaohangRouter = express.Router();
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
const Giaohang = require("../models/giaohangModel");
const { getCurrentDatetime } = require("../utils");
const Daily2 = require("../models/daily2Model");
const Hodan = require("../models/hodanModel");
const Daily1 = require("../models/daily1Model");

// ho dan giao hang -> daily 2
giaohangRouter.post("/hodantodaily2", async (req, res) => {
  let { hodanId, donhangId, dssanpham } = req.body;
  try {
    const _dh = await Donhang.findById(donhangId);
    for (const x of _dh.dssanpham) {
      for (const y of dssanpham) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dssanpham = dssanpham.map((sp) =>
            sp.sanpham.toString() === x.sanpham.toString()
              ? {
                  ...sp,
                  soluong: x.soluong,
                  soluonghoanthanh: x.soluonghoanthanh, // thoi diem thanh` pham
                }
              : sp
          );
        }
      }
    }
    // Giaohang
    const newGH = new Giaohang({
      hodan: hodanId,
      donhang: donhangId,
      dssanpham,
      ngaygiao: getCurrentDatetime(),
    });
    const savedGH = await newGH.save();

    // Daily2
    const dh = await Donhang.findById(donhangId);
    const daily2 = await Daily2.findById(dh.from.daily2);
    daily2.dsgiaohang = [savedGH._id, ...daily2.dsgiaohang];
    await daily2.save();

    // Update donhang of ho dan
    const donhang = await Donhang.findById(donhangId);
    let dsspTemp = [...donhang.dssanpham];
    for (const x of dssanpham) {
      for (const y of dsspTemp) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dsspTemp = dsspTemp.map((item) =>
            item.sanpham.toString() === y.sanpham.toString()
              ? {
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  dagiao: item.dagiao ? item.dagiao + x.dagiao : x.dagiao,
                }
              : item
          );
        }
      }
    }
    donhang.dssanpham = dsspTemp;
    await donhang.save();

    // Update khohang ho dan
    const hodan = await Hodan.findById(hodanId);
    let hodanDssp = [...hodan.dssanpham];
    for (const x of dssanpham) {
      for (const y of hodanDssp) {
        if (
          y.sanpham.toString() === x.sanpham.toString() &&
          y.donhang.toString() === donhangId.toString()
        ) {
          hodanDssp = hodanDssp.map((sp) =>
            sp.donhang.toString() === donhangId.toString() &&
            sp.sanpham.toString() === x.sanpham.toString()
              ? {
                  donhang: sp.donhang,
                  sanpham: sp.sanpham,
                  soluong: sp.soluong,
                  soluonghoanthanh: sp.soluonghoanthanh,
                  dagiao: sp.dagiao + x.dagiao,
                  ngaytao: sp.ngaytao,
                }
              : sp
          );
        }
      }
    }
    hodan.dssanpham = hodanDssp;
    await hodan.save();

    res.send({ savedGH, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// dai ly 2 xac nhan
giaohangRouter.put("/daily2xacnhan/:giaohangId", async (req, res) => {
  try {
    const gh = await Giaohang.findById(req.params.giaohangId);
    // update Donhang tong hop cua dl2
    const dh = await Donhang.findById(gh.donhang);
    const dl2 = await Daily2.findById(dh.from.daily2).populate("donhang");
    const dhdl2 = dl2.donhang.find((item) => item.ma === dh.ma);
    const donhangDaily2 = await Donhang.findById(dhdl2._id);

    let dsspTemp = [...donhangDaily2.dssanpham];
    for (const x of gh.dssanpham) {
      for (const y of dsspTemp) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dsspTemp = dsspTemp.map((item) =>
            item.sanpham.toString() === y.sanpham.toString()
              ? {
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan ? item.danhan + x.dagiao : x.dagiao,
                  dagiao: item.dagiao,
                }
              : item
          );
        }
      }
    }
    donhangDaily2.dssanpham = dsspTemp;
    await donhangDaily2.save();

    // update kho hang dai ly 2
    let dsspDL2 = [...dl2.dssanpham];
    for (const x of gh.dssanpham) {
      for (const y of dsspDL2) {
        if (
          y.sanpham.toString() === x.sanpham.toString() &&
          y.donhang.toString() === donhangDaily2._id.toString()
        ) {
          dsspDL2 = dsspDL2.map((item) =>
            item.donhang.toString() === donhangDaily2._id.toString() &&
            item.sanpham.toString() === x.sanpham.toString()
              ? {
                  donhang: item.donhang,
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan ? item.danhan + x.dagiao : x.dagiao,
                  dagiao: item.dagiao,
                  ngaytao: item.ngaytao,
                }
              : item
          );
        }
      }
    }
    dl2.dssanpham = dsspDL2;
    await dl2.save();

    // update Giao hang
    gh.xacnhan = true;
    gh.ngaynhan = getCurrentDatetime();
    const updatedGH = await gh.save();

    res.send({ updatedGH, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// daily 2 giao hang -> daily 1
giaohangRouter.post("/daily2todaily1", async (req, res) => {
  let { daily2Id, donhangId, dssanpham } = req.body;
  try {
    const _dh = await Donhang.findById(donhangId);
    for (const x of _dh.dssanpham) {
      for (const y of dssanpham) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dssanpham = dssanpham.map((sp) =>
            sp.sanpham.toString() === x.sanpham.toString()
              ? {
                  ...sp,
                  soluong: x.soluong,
                  soluonghoanthanh: x.soluonghoanthanh, // thoi diem thanh` pham
                  danhan: x.danhan,
                }
              : sp
          );
        }
      }
    }
    // Giaohang
    const newGH = new Giaohang({
      daily2: daily2Id,
      donhang: donhangId,
      dssanpham: dssanpham,
      ngaygiao: getCurrentDatetime(),
    });
    const savedGH = await newGH.save();

    // Daily1
    const dh = await Donhang.findById(donhangId);
    const daily1 = await Daily1.findById(dh.from.daily1);
    daily1.dsgiaohang = [savedGH._id, ...daily1.dsgiaohang];
    await daily1.save();

    // Update donhang of dai ly 2
    const donhang = await Donhang.findById(donhangId);
    let dsspTemp = [...donhang.dssanpham];
    for (const x of dssanpham) {
      for (const y of dsspTemp) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dsspTemp = dsspTemp.map((item) =>
            item.sanpham.toString() === y.sanpham.toString()
              ? {
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan,
                  dagiao: item.dagiao ? item.dagiao + x.dagiao : x.dagiao,
                }
              : item
          );
        }
      }
    }
    donhang.dssanpham = dsspTemp;
    await donhang.save();

    // Update khohang dai ly 2
    const daily2 = await Daily2.findById(daily2Id);
    let daily2Dssp = [...daily2.dssanpham];
    for (const x of dssanpham) {
      for (const y of daily2Dssp) {
        if (
          y.sanpham.toString() === x.sanpham.toString() &&
          y.donhang.toString() === donhangId.toString()
        ) {
          daily2Dssp = daily2Dssp.map((item) =>
            item.donhang.toString() === donhangId.toString() &&
            item.sanpham.toString() === x.sanpham.toString()
              ? {
                  donhang: item.donhang,
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan,
                  dagiao: item.dagiao + x.dagiao,
                  ngaytao: item.ngaytao,
                }
              : item
          );
        }
      }
    }
    daily2.dssanpham = daily2Dssp;
    await daily2.save();

    res.send({ savedGH, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// dai ly 1 xac nhan
giaohangRouter.put("/daily1xacnhan/:giaohangId", async (req, res) => {
  try {
    const gh = await Giaohang.findById(req.params.giaohangId);
    // update Donhang tong hop cua dl1
    const dh = await Donhang.findById(gh.donhang);
    const dl1 = await Daily1.findById(dh.from.daily1).populate("donhang");
    const dhdl1 = dl1.donhang.find((item) => item.ma === dh.ma);
    const donhangDaily1 = await Donhang.findById(dhdl1._id);

    let dsspTemp = [...donhangDaily1.dssanpham];
    for (const x of gh.dssanpham) {
      for (const y of dsspTemp) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dsspTemp = dsspTemp.map((item) =>
            item.sanpham.toString() === y.sanpham.toString() &&
            item.sanpham.toString() === y.sanpham.toString()
              ? {
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan ? item.danhan + x.dagiao : x.dagiao,
                  dagiao: item.dagiao,
                }
              : item
          );
        }
      }
    }
    donhangDaily1.dssanpham = dsspTemp;
    await donhangDaily1.save();

    // update kho hang dai ly 1
    let dsspDL1 = [...dl1.dssanpham];
    for (const x of gh.dssanpham) {
      for (const y of dsspDL1) {
        if (
          y.sanpham.toString() === x.sanpham.toString() &&
          y.donhang.toString() === donhangDaily1._id.toString()
        ) {
          dsspDL1 = dsspDL1.map((item) =>
            item.donhang.toString() === donhangDaily1._id.toString() &&
            item.sanpham.toString() === x.sanpham.toString()
              ? {
                  donhang: item.donhang,
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan ? item.danhan + x.dagiao : x.dagiao,
                  dagiao: item.dagiao,
                  ngaytao: item.ngaytao,
                }
              : item
          );
        }
      }
    }
    dl1.dssanpham = dsspDL1;
    await dl1.save();

    // update Giao hang
    gh.xacnhan = true;
    gh.ngaynhan = getCurrentDatetime();
    const updatedGH = await gh.save();

    res.send({ updatedGH, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// daily 1 giao hang -> giam sat vung
giaohangRouter.post("/daily1togsv", async (req, res) => {
  let { daily1Id, donhangId, dssanpham } = req.body;
  try {
    const _dh = await Donhang.findById(donhangId);
    for (const x of _dh.dssanpham) {
      for (const y of dssanpham) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dssanpham = dssanpham.map((sp) =>
            sp.sanpham.toString() === x.sanpham.toString()
              ? {
                  ...sp,
                  soluong: x.soluong,
                  soluonghoanthanh: x.soluonghoanthanh, // thoi diem thanh` pham
                  danhan: x.danhan,
                }
              : sp
          );
        }
      }
    }
    // Giaohang
    const newGH = new Giaohang({
      daily1: daily1Id,
      donhang: donhangId,
      dssanpham: dssanpham,
      ngaygiao: getCurrentDatetime(),
    });
    const savedGH = await newGH.save();

    // GSV
    const dh = await Donhang.findById(donhangId);
    const gsv = await Giamsatvung.findById(dh.from.giamsatvung);
    gsv.dsgiaohang = [savedGH._id, ...gsv.dsgiaohang];
    await gsv.save();

    // Update donhang of dai ly 1
    const donhang = await Donhang.findById(donhangId);
    let dsspTemp = [...donhang.dssanpham];
    for (const x of dssanpham) {
      for (const y of dsspTemp) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dsspTemp = dsspTemp.map((item) =>
            item.sanpham.toString() === y.sanpham.toString()
              ? {
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan,
                  dagiao: item.dagiao ? item.dagiao + x.dagiao : x.dagiao,
                }
              : item
          );
        }
      }
    }
    donhang.dssanpham = dsspTemp;
    await donhang.save();

    // Update khohang dai ly 1
    const daily1 = await Daily1.findById(daily1Id);
    let daily1Dssp = [...daily1.dssanpham];
    for (const x of dssanpham) {
      for (const y of daily1Dssp) {
        if (
          y.sanpham.toString() === x.sanpham.toString() &&
          y.donhang.toString() === donhangId.toString()
        ) {
          daily1Dssp = daily1Dssp.map((item) =>
            item.donhang.toString() === donhangId.toString() &&
            item.sanpham.toString() === x.sanpham.toString()
              ? {
                  donhang: item.donhang,
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan,
                  dagiao: item.dagiao + x.dagiao,
                  ngaytao: item.ngaytao,
                }
              : item
          );
        }
      }
    }
    daily1.dssanpham = daily1Dssp;
    await daily1.save();

    res.send({ savedGH, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// gsv xac nhan
giaohangRouter.put("/gsvxacnhan/:giaohangId", async (req, res) => {
  try {
    const gh = await Giaohang.findById(req.params.giaohangId);
    // update Donhang tong hop cua gsv
    const dh = await Donhang.findById(gh.donhang);
    const gsv = await Giamsatvung.findById(dh.from.giamsatvung).populate(
      "donhang"
    );
    const dhgsv = gsv.donhang.find((item) => item.ma === dh.ma);
    const donhangGSV = await Donhang.findById(dhgsv._id);

    let dsspTemp = [...donhangGSV.dssanpham];
    for (const x of gh.dssanpham) {
      for (const y of dsspTemp) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dsspTemp = dsspTemp.map((item) =>
            item.sanpham.toString() === y.sanpham.toString() &&
            item.sanpham.toString() === y.sanpham.toString()
              ? {
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan ? item.danhan + x.dagiao : x.dagiao,
                  dagiao: item.dagiao,
                }
              : item
          );
        }
      }
    }
    donhangGSV.dssanpham = dsspTemp;
    await donhangGSV.save();

    // update kho hang gsv
    let dsspGSV = [...gsv.dssanpham];
    for (const x of gh.dssanpham) {
      for (const y of dsspGSV) {
        if (
          y.sanpham.toString() === x.sanpham.toString() &&
          y.donhang.toString() === donhangGSV._id.toString()
        ) {
          dsspGSV = dsspGSV.map((item) =>
            item.donhang.toString() === donhangGSV._id.toString() &&
            item.sanpham.toString() === x.sanpham.toString()
              ? {
                  donhang: item.donhang,
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan ? item.danhan + x.dagiao : x.dagiao,
                  dagiao: item.dagiao,
                  ngaytao: item.ngaytao,
                }
              : item
          );
        }
      }
    }
    gsv.dssanpham = dsspGSV;
    await gsv.save();

    // update Giao hang
    gh.xacnhan = true;
    gh.ngaynhan = getCurrentDatetime();
    const updatedGH = await gh.save();

    res.send({ updatedGH, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// giam sat vung giao hang -> bophankd
giaohangRouter.post("/gsvtobophankd", async (req, res) => {
  let { gsvId, donhangId, dssanpham } = req.body;
  try {
    const _dh = await Donhang.findById(donhangId);
    for (const x of _dh.dssanpham) {
      for (const y of dssanpham) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dssanpham = dssanpham.map((sp) =>
            sp.sanpham.toString() === x.sanpham.toString()
              ? {
                  ...sp,
                  soluong: x.soluong,
                  soluonghoanthanh: x.soluonghoanthanh, // thoi diem thanh` pham
                  danhan: x.danhan,
                }
              : sp
          );
        }
      }
    }
    // Giaohang
    const newGH = new Giaohang({
      giamsatvung: gsvId,
      donhang: donhangId,
      dssanpham: dssanpham,
      ngaygiao: getCurrentDatetime(),
    });
    const savedGH = await newGH.save();

    // Bophankd
    const dh = await Donhang.findById(donhangId);
    const bophankd = await Bophankd.findById(dh.from.bophankd);
    bophankd.dsgiaohang = [savedGH._id, ...bophankd.dsgiaohang];
    await bophankd.save();

    // Update donhang of gsv
    const donhang = await Donhang.findById(donhangId);
    let dsspTemp = [...donhang.dssanpham];
    for (const x of dssanpham) {
      for (const y of dsspTemp) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dsspTemp = dsspTemp.map((item) =>
            item.sanpham.toString() === y.sanpham.toString()
              ? {
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan,
                  dagiao: item.dagiao ? item.dagiao + x.dagiao : x.dagiao,
                }
              : item
          );
        }
      }
    }
    donhang.dssanpham = dsspTemp;
    await donhang.save();

    // Update khohang gsv
    const gsv = await Giamsatvung.findById(gsvId);
    let gsvDssp = [...gsv.dssanpham];
    for (const x of dssanpham) {
      for (const y of gsvDssp) {
        if (
          y.sanpham.toString() === x.sanpham.toString() &&
          y.donhang.toString() === donhangId.toString()
        ) {
          gsvDssp = gsvDssp.map((item) =>
            item.donhang.toString() === donhangId.toString() &&
            item.sanpham.toString() === x.sanpham.toString()
              ? {
                  donhang: item.donhang,
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan,
                  dagiao: item.dagiao + x.dagiao,
                  ngaytao: item.ngaytao,
                }
              : item
          );
        }
      }
    }
    gsv.dssanpham = gsvDssp;
    await gsv.save();

    res.send({ savedGH, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// bophankd xac nhan
giaohangRouter.put("/bophankdxacnhan/:giaohangId", async (req, res) => {
  try {
    const gh = await Giaohang.findById(req.params.giaohangId);
    // update Donhang tong hop cua bophankd
    const dh = await Donhang.findById(gh.donhang);
    const bophankd = await Bophankd.findById(dh.from.bophankd).populate(
      "donhang"
    );
    const dhbpkd = bophankd.donhang.find((item) => item.ma === dh.ma);
    const donhangBophankd = await Donhang.findById(dhbpkd._id);

    let dsspTemp = [...donhangBophankd.dssanpham];
    for (const x of gh.dssanpham) {
      for (const y of dsspTemp) {
        if (y.sanpham.toString() === x.sanpham.toString()) {
          dsspTemp = dsspTemp.map((item) =>
            item.sanpham.toString() === y.sanpham.toString()
              ? {
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan ? item.danhan + x.dagiao : x.dagiao,
                  dagiao: item.dagiao,
                }
              : item
          );
        }
      }
    }
    donhangBophankd.dssanpham = dsspTemp;
    await donhangBophankd.save();

    // update kho hang bophankd
    let dsspBPKD = [...bophankd.dssanpham];
    for (const x of gh.dssanpham) {
      for (const y of dsspBPKD) {
        if (
          y.sanpham.toString() === x.sanpham.toString() &&
          y.donhang.toString() === donhangBophankd._id.toString()
        ) {
          dsspBPKD = dsspBPKD.map((item) =>
            item.donhang.toString() === donhangBophankd._id.toString() &&
            item.sanpham.toString() === x.sanpham.toString()
              ? {
                  donhang: item.donhang,
                  sanpham: item.sanpham,
                  soluong: item.soluong,
                  soluonghoanthanh: item.soluonghoanthanh,
                  danhan: item.danhan ? item.danhan + x.dagiao : x.dagiao,
                  dagiao: item.dagiao,
                  ngaytao: item.ngaytao,
                }
              : item
          );
        }
      }
    }
    bophankd.dssanpham = dsspBPKD;
    await bophankd.save();

    // update Giao hang
    gh.xacnhan = true;
    gh.ngaynhan = getCurrentDatetime();
    const updatedGH = await gh.save();

    res.send({ updatedGH, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// get single giaohang
giaohangRouter.get("/single/:id", async (req, res) => {
  try {
    const giaohang = await Giaohang.findById(req.params.id)
      .populate({
        path: "hodan daily2 daily1 giamsatvung donhang",
      })
      .populate({
        path: "dssanpham",
        populate: {
          path: "sanpham",
        },
      })
      .populate({
        path: "donhang",
        populate: {
          path: "from",
          populate: {
            path: "daily1 daily2 giamsatvung bophankd",
          },
        },
      });

    res.send({ giaohang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach giao hang cua ho dan -> daily2
giaohangRouter.get("/dsgiaohanghodan/:daily2Id", async (req, res) => {
  try {
    let dsgiaohang = await Giaohang.find({}).populate("hodan donhang");
    const { subdonhang } = await Daily2.findById(req.params.daily2Id).select(
      "subdonhang"
    );
    dsgiaohang = dsgiaohang.filter(
      (item) => item.hodan && subdonhang.includes(item.donhang._id)
    );

    res.send({ dsgiaohang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach giao hang DI cua dai ly 2 -> daily 1
giaohangRouter.get("/dsgiaohangdaily2/:daily2Id", async (req, res) => {
  try {
    let dsgiaohang = await Giaohang.find({
      daily2: req.params.daily2Id,
    })
      .populate("daily2")
      .populate({
        path: "donhang",
        populate: {
          path: "from",
          populate: {
            path: "daily1",
          },
        },
      });

    res.send({ dsgiaohang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach giao hang DEN cua daily2 -> daily1
giaohangRouter.get("/dsghdendaily2daily1/:daily1Id", async (req, res) => {
  try {
    let dsgiaohang = await Giaohang.find({}).populate("daily2 donhang");
    const { subdonhang } = await Daily1.findById(req.params.daily1Id).select(
      "subdonhang"
    );
    dsgiaohang = dsgiaohang.filter(
      (item) => item.daily2 && subdonhang.includes(item.donhang._id)
    );

    res.send({ dsgiaohang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach giao hang DI cua dai daily 1 -> gsv
giaohangRouter.get("/dsghdidaily1gsv/:daily1Id", async (req, res) => {
  try {
    let dsgiaohang = await Giaohang.find({
      daily1: req.params.daily1Id,
    })
      .populate("daily1")
      .populate({
        path: "donhang",
        populate: {
          path: "from",
          populate: {
            path: "giamsatvung",
          },
        },
      });

    res.send({ dsgiaohang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach giao hang DEN cua daily1 -> gsv
giaohangRouter.get("/dsghdendaily1gsv/:gsvId", async (req, res) => {
  try {
    let dsgiaohang = await Giaohang.find({}).populate("daily1 donhang");
    const { subdonhang } = await Giamsatvung.findById(req.params.gsvId).select(
      "subdonhang"
    );
    dsgiaohang = dsgiaohang.filter(
      (item) => item.daily1 && subdonhang.includes(item.donhang._id)
    );

    res.send({ dsgiaohang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach giao hang DI cua dai gsv -> bophankd
giaohangRouter.get("/dsghdigsvbpkd/:gsvId", async (req, res) => {
  try {
    let dsgiaohang = await Giaohang.find({
      giamsatvung: req.params.gsvId,
    })
      .populate("giamsatvung")
      .populate({
        path: "donhang",
        populate: {
          path: "from",
          populate: {
            path: "bophankd",
          },
        },
      });

    res.send({ dsgiaohang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

// lay danh sach giao hang DEN cua gsv -> bophankd
giaohangRouter.get("/dsghdengsvbpkd/:bpkdId", async (req, res) => {
  try {
    let dsgiaohang = await Giaohang.find({}).populate("giamsatvung donhang");
    const { subdonhang } = await Bophankd.findById(req.params.bpkdId).select(
      "subdonhang"
    );
    dsgiaohang = dsgiaohang.filter(
      (item) => item.giamsatvung && subdonhang.includes(item.donhang._id)
    );

    res.send({ dsgiaohang, success: true });
  } catch (error) {
    res.send({ message: error.message, success: false });
  }
});

module.exports = giaohangRouter;
