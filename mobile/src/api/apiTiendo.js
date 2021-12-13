import axiosClient from "./axiosClient";

const apiTiendo = {
  // them tien do
  themTiendo(payload) {
    const url = "/api/tiendo/them";
    return axiosClient.post(url, payload);
  },

  // Chinh sua tien do
  chinhsuaTiendo(tiendoId, payload) {
    const url = `/api/tiendo/chinhsua/${tiendoId}`;
    return axiosClient.put(url, payload);
  },

  // Lay danh sach tien do thuoc hodanId
  dsTiendo(hodanId) {
    const url = `/api/tiendo/dstiendo/${hodanId}`;
    return axiosClient.get(url);
  },

  // Lay danh sach tien do thuoc hodanId
  singleTiendo(tiendoId) {
    const url = `/api/tiendo/single/${tiendoId}`;
    return axiosClient.get(url);
  },

  // Them bao cao
  themBaocao(tiendoId, payload) {
    const url = `/api/tiendo/thembaocao/${tiendoId}`;
    return axiosClient.put(url, payload);
  },

  // Lay danh sach bao cao thuoc tiendoId
  dsBaocao(tiendoId) {
    const url = `/api/tiendo/dsbaocao/${tiendoId}`;
    return axiosClient.get(url);
  },

  // Lay single bao cao thuoc tiendoId
  singleBaocao(tiendoId, baocaoId) {
    const url = `/api/tiendo/singlebaocao/${tiendoId}/${baocaoId}`;
    return axiosClient.get(url);
  },

  // Cap nhat 1 bao cao thuoc tiendoId
  capnhatBaocao(tiendoId, baocaoId, payload) {
    const url = `/api/tiendo/singlebaocao/${tiendoId}/${baocaoId}`;
    return axiosClient.put(url, payload);
  },
};

export default apiTiendo;
