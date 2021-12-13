import axiosClient from "./axiosClient";

const apiDonhang = {
  // them loai san pham
  themDonhang(data) {
    const url = "/donhang/them";
    return axiosClient.post(url, data);
  },

  // Lấy ALL ds đơn hàng là đơn hàng gốc
  allDsDonhang() {
    const url = "/donhang/alldanhsach";
    return axiosClient.get(url);
  },

  // Lấy ds đơn hàng chưa dược sử dụng
  dsDonhang() {
    const url = "/donhang/danhsach";
    return axiosClient.get(url);
  },

  // lay 1 don hang
  singleDonhang(id) {
    const url = `/donhang/single/${id}`;
    return axiosClient.get(url);
  },

  // bophankds send donhang -> gsv
  bophankdToGsv(payload) {
    const url = `/donhang/bophankdtogsv`;
    return axiosClient.put(url, payload);
  },

  // gsv send donhang -> dl1
  gsvToDaily1(payload) {
    const url = `/donhang/gsvtodaily1`;
    return axiosClient.put(url, payload);
  },

  // dl1 send donhang -> dl2
  daily1ToDaily2(payload) {
    const url = `/donhang/daily1todaily2`;
    return axiosClient.put(url, payload);
  },

  // dl2 send donhang -> hodan
  daily2ToHodan(payload) {
    const url = `/donhang/daily2tohodan`;
    return axiosClient.put(url, payload);
  },

  // xac nhan don hang
  xacnhan(donhangId) {
    const url = `/donhang/xacnhan/${donhangId}`;
    return axiosClient.put(url);
  },

  // lay subdonhang cua cac phan quyen cap duoi gsv
  subdhPhanquyen(donhangId) {
    const url = `/donhang/subdhduoigsv/${donhangId}`;
    return axiosClient.get(url);
  },

  // lay subdonhang cua cac phan quyen cap duoi daily1
  subdhPhanquyenDuoiDL1(donhangId) {
    const url = `/donhang/subdhduoidaily1/${donhangId}`;
    return axiosClient.get(url);
  },

  // lay subdonhang cua cac phan quyen cap duoi daily2
  subdhPhanquyenDuoiDL2(donhangId) {
    const url = `/donhang/subdhduoidaily2/${donhangId}`;
    return axiosClient.get(url);
  },

  // Xoa nhieu don hang
  xoaNhieuDonhang(arrOfIds) {
    const url = "/donhang/xoanhieudonhang";
    return axiosClient.put(url, arrOfIds);
  },
};

export default apiDonhang;
