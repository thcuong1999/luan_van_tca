import axiosClient from "./axiosClient";

const apiSanpham = {
  // them sp
  themSanpham(data) {
    const url = "/sanpham/them";
    return axiosClient.post(url, data);
  },

  // sua san pham
  suaSanpham(id, data) {
    const url = `/sanpham/single/${id}`;
    return axiosClient.put(url, data);
  },

  // lay ds sp
  dsSanpham() {
    const url = "/sanpham/danhsach";
    return axiosClient.get(url);
  },

  // lay danh sach san pham Chua nam trong 1 bophankd cu the
  dsNotInBophankd(bophankdId) {
    const url = `/sanpham/dsspchuacobopkd/${bophankdId}`;
    return axiosClient.get(url);
  },

  // lay thong tin 1 sp
  singleSanpham(id) {
    const url = `/sanpham/single/${id}`;
    return axiosClient.get(url);
  },

  // xoa nhieu sp
  xoaNhieuSanpham(arrOfIds) {
    const url = "/sanpham/xoanhieusanpham";
    return axiosClient.put(url, arrOfIds);
  },
};

export default apiSanpham;
