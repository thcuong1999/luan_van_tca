import bcrypt from 'bcryptjs'

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const getCurrentDatetime = () => {
  let currentdate = new Date();
  return `${currentdate.getDate()}/${
    currentdate.getMonth() + 1
  }/${currentdate.getFullYear()}`;
};

export const getXa = (diachi) => {
  return diachi.split(",").map((item) => item.trim())[0];
};

export const gethuyen = (diachi) => {
  return diachi.split(",").map((item) => item.trim())[1];
};

export const getTinh = (diachi) => {
  return diachi.split(",").map((item) => item.trim())[2];
};

export const getDsNguyenVatlieu = (dssanpham) => {
  let danhsachcongcu = [];
  let danhsachvattu = [];
  let danhsachnguyenlieu = [];
  let tongdongia = 0;

  for (const sp of dssanpham) {
    const soluong = sp.soluong;
    const gia = sp.gia;
    const dscongcu = sp.dscongcu;
    const dsvattu = sp.dsvattu;
    const dsnguyenlieu = sp.dsnguyenlieu;

    for (const cc of dscongcu) {
      const soluongcc = cc.soluong;
      const arrOfId = danhsachcongcu.length
        ? danhsachcongcu.map((item) => item.congcu._id) // ***
        : [];
      if (arrOfId.includes(cc.congcu._id)) {
        const id = cc.congcu._id;
        danhsachcongcu = danhsachcongcu.map((item) =>
          item.congcu._id === id
            ? { ...item, soluong: item.soluong + soluong * soluongcc }
            : item
        );
      } else {
        danhsachcongcu = [
          { ...cc, soluong: soluongcc * soluong },
          ...danhsachcongcu,
        ];
      }
    }

    for (const vt of dsvattu) {
      const soluongvt = vt.soluong;
      const arrOfId = danhsachvattu.length
        ? danhsachvattu.map((item) => item.vattu._id)
        : [];
      if (arrOfId.includes(vt.vattu._id)) {
        const id = vt.vattu._id;
        danhsachvattu = danhsachvattu.map((item) =>
          item.vattu._id === id
            ? { ...item, soluong: item.soluong + soluong * soluongvt }
            : item
        );
      } else {
        danhsachvattu = [
          { ...vt, soluong: soluongvt * soluong },
          ...danhsachvattu,
        ];
      }
    }

    for (const ngl of dsnguyenlieu) {
      const khoiluong = ngl.khoiluong;
      const arrOfId = danhsachnguyenlieu.length
        ? danhsachnguyenlieu.map((item) => item.nguyenlieu._id)
        : [];
      if (arrOfId.includes(ngl.nguyenlieu._id)) {
        const id = ngl.nguyenlieu._id;
        danhsachnguyenlieu = danhsachnguyenlieu.map((item) =>
          item.nguyenlieu._id === id
            ? { ...item, khoiluong: item.khoiluong + soluong * khoiluong }
            : item
        );
      } else {
        danhsachnguyenlieu = [
          { ...ngl, khoiluong: soluong * khoiluong },
          ...danhsachnguyenlieu,
        ];
      }
    }

    tongdongia = tongdongia + soluong * gia;
  }
  return {
    danhsachcongcu,
    danhsachvattu,
    danhsachnguyenlieu,
    tongdongia,
  };
};

export const getTongNguyenVatlieu = (arr, type) => {
  let sum = 0;
  if (type === "congcu" || type === "vattu" || type === "sanpham") {
    arr.forEach((item) => (sum = sum + parseInt(item.soluong)));
  } else if (type === "nguyenlieu") {
    arr.forEach((item) => (sum = sum + item.khoiluong));
  }
  return sum;
};

export const formatMoney = (money) => {
  const formatter = new Intl.NumberFormat("es");
  return formatter.format(money);
};

export const getTableDataClass = (number) => {
  if (number < 50) {
    return "danger";
  } else if (number === 100) {
    return "success";
  } else {
    return "warning";
  }
};

export const comparePwd = (string, hash) => {
  if(bcrypt.compareSync(string, hash)) {
    return true;
  }
  return false
}