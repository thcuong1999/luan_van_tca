import axiosClient from "./axiosClient";

const apiHodan = {
  // them ho dan
  themHodan(data) {
    const url = "/hodan/them";
    return axiosClient.post(url, data);
  },

  // chinh sua 1 ho dan
  suaHodan(hodanId, data) {
    const url = `/hodan/single/${hodanId}`;
    return axiosClient.put(url, data);
  },

  // danh sach ho dan
  dsHodan() {
    const url = "/hodan/danhsach";
    return axiosClient.get(url);
  },

  // danh sach ho dan thuoc langngheId
  dsHodanThuoc1Langnghe(langngheId) {
    const url = `/hodan/danhsach/${langngheId}`;
    return axiosClient.get(url);
  },

  // danh sach ho dan co' daily 2 null
  dsHodanDaily2Null(langngheId) {
    const url = "/hodan/dsdaily2null";
    return axiosClient.get(url);
  },

  // search ho dan
  searchHodan(query) {
    const url = `/hodan/search?${query}`;
    return axiosClient.get(url);
  },

  // lay thong tin 1 ho dan
  singleHodan(id) {
    const url = `/hodan/single/${id}`;
    return axiosClient.get(url);
  },

  // xoa 1 ho dan
  xoa1Hodan(id) {
    const url = `/hodan/single/${id}`;
    return axiosClient.delete(url);
  },

  // xoa nhieu ho dan
  xoaNhieuHodan(arrOfId) {
    const url = `/hodan/multiple`;
    return axiosClient.put(url, arrOfId);
  },

  // lay hodan info based userId
  singleHodanBasedUser(userId) {
    const url = `/hodan/singlehdbaseduser/${userId}`;
    return axiosClient.get(url);
  },

  // lay thong tin 1 phan phat thuoc hodan
  singlePhanphat(hodanId, phanphatId) {
    const url = `/hodan/singlephanphat/${hodanId}/${phanphatId}`;
    return axiosClient.get(url);
  },

  //===============================

  // lay danh sach phan phat CONG CU thuoc ho dan
  dsCongcuPhanphat(hodanId) {
    const url = `/hodan/dscongcuphanphat/${hodanId}`;
    return axiosClient.get(url);
  },

  // lay danh sach phan phat VAT TU thuoc ho dan
  dsVattuPhanphat(hodanId) {
    const url = `/hodan/dsvattuphanphat/${hodanId}`;
    return axiosClient.get(url);
  },

  // lay danh sach CONG CU thuoc ho dan
  dsCongcu(hodanId) {
    const url = `/hodan/danhsachcongcu/${hodanId}`;
    return axiosClient.get(url);
  },

  // lay danh sach VAT TU thuoc ho dan
  dsVattu(hodanId) {
    const url = `/hodan/danhsachvattu/${hodanId}`;
    return axiosClient.get(url);
  },

  // Tổng hợp số liệu tổng quát của tiến độ đơn hàng
  tiendoDonhang(hodanId, maDH) {
    const url = `/hodan/tiendodonhang/${hodanId}/${maDH}`;
    return axiosClient.get(url);
  },
};

export default apiHodan;
