const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      taikhoan: user.taikhoan,
      vaitro: user.vaitro,
    },
    process.env.SECRET_KEY || "mytopsecret",
    {
      expiresIn: "300d",
    }
  );
};

exports.getCurrentDatetime = () => {
  let currentdate = new Date();
  return `${currentdate.getDate()}/${
    currentdate.getMonth() + 1
  }/${currentdate.getFullYear()}`;
};

exports.getTinhtrangNhandon = (dsSubdonhang, tongSLSPDonhangGoc) => {
  const dsDonhangDaXacnhan = dsSubdonhang.filter((dh) => dh.xacnhan);
  return Math.round(
    (dsDonhangDaXacnhan.reduce((acc, dh) => acc + dh.tongsanpham, 0) /
      tongSLSPDonhangGoc) *
      100
  );
};

exports.getTiendoHoanthanh = (dsDonhang, tongSLSPDonhangGoc, pq) => {
  let tongAllDanhan = 0;
  if (pq === "hodan") {
    dsDonhang.forEach((dh) => {
      let tongDanhan = dh.dssanpham.reduce(
        (acc, sp) => acc + sp.soluonghoanthanh,
        0
      );
      tongAllDanhan = tongAllDanhan + tongDanhan;
    });
  } else {
    dsDonhang.forEach((dh) => {
      let tongDanhan = dh.dssanpham.reduce(
        (acc, sp) => acc + (sp.danhan ? sp.danhan : 0),
        0
      );
      tongAllDanhan = tongAllDanhan + tongDanhan;
    });
  }

  return Math.round((tongAllDanhan / tongSLSPDonhangGoc) * 100);
};

//
exports.includeLSP = (dslsp, lsp) => {
  const dsLSP = dslsp.map((item) => item.toString());
  if (dsLSP.includes(lsp.toString())) {
    return true;
  }
  return false;
};
