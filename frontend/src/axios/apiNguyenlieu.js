import axiosClient from "./axiosClient";

const apiNguyenlieu = {
  themNguyenlieu(data) {
    const url = "/nguyenlieu/them";
    return axiosClient.post(url, data);
  },

  suaNguyenlieu(id, data) {
    const url = `/nguyenlieu/single/${id}`;
    return axiosClient.put(url, data);
  },

  dsNguyenlieu() {
    const url = "/nguyenlieu/danhsach";
    return axiosClient.get(url);
  },

  singleNguyenlieu(id) {
    const url = `/nguyenlieu/single/${id}`;
    return axiosClient.get(url);
  },

  // Xoa 1 nglieu
  xoa1Nglieu(id) {
    const url = `/nguyenlieu/single/${id}`;
    return axiosClient.delete(url);
  },

  // Xoa nhieu nglieu
  xoaNhieuNglieu(arrOfIds) {
    const url = "/nguyenlieu/xoanhieunglieu";
    return axiosClient.put(url, arrOfIds);
  },
};

export default apiNguyenlieu;
