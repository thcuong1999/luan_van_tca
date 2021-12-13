import axiosClient from "./axiosClient";

const apiLoaiSanpham = {
  // them loai san pham
  themLoaiSanpham(data) {
    const url = "/loaisanpham/them";
    return axiosClient.post(url, data);
  },

  // lay danh sach loai san pham
  dsLoaiSanpham() {
    const url = "/loaisanpham/danhsach";
    return axiosClient.get(url);
  },

  // xoa nhieu loai san pham
  xoaNhieuLoaiSanpham(arrOfIds) {
    const url = `/loaisanpham/xoanhieuloaisp`;
    return axiosClient.put(url, arrOfIds);
  },

  // lay thong tin 1 loai san pham
  singleLoaiSanpham(id) {
    const url = `/loaisanpham/single/${id}`;
    return axiosClient.get(url);
  },

  // cap nhat 1 loai san pham
  capnhat1LoaiSanpham(id, payload) {
    const url = `/loaisanpham/single/${id}`;
    return axiosClient.put(url, payload);
  },
};

export default apiLoaiSanpham;
