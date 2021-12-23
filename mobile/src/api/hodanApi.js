import axiosClient from "./axiosClient";

const hodanApi = {
  getAll(params) {
    const url = "/api/hodan/danhsach";
    return axiosClient.get(url, { params });
  },
  get(id) {
    const url = `/api/hodan/single/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/api/hodan/them`;
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/api/hodan/single/${data.id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/api/hodan/single/${id}`;
    return axiosClient.delete(url);
  },
  // them ho dan
  themHodan(data) {
    const url = "/api/hodan/them";
    return axiosClient.post(url, data);
  },

  // chinh sua 1 ho dan
  suaHodan(hodanId, data) {
    const url = `/api/hodan/single/${hodanId}`;
    return axiosClient.put(url, data);
  },
  //doi mat khau
  doiMatkhau(data){
    const url = `/api/hodan/capnhatthongtincanhan`;
    return axiosClient.put(url,data);
  },
  // danh sach ho dan
  dsHodan() {
    const url = "/api/hodan/danhsach";
    return axiosClient.get(url);
  },

  // danh sach ho dan thuoc langngheId
  dsHodanThuoc1Langnghe(langngheId) {
    const url = `/api/hodan/danhsach/${langngheId}`;
    return axiosClient.get(url);
  },

  // danh sach ho dan co' daily 2 null
  dsHodanDaily2Null(langngheId) {
    const url = "/api/hodan/dsdaily2null";
    return axiosClient.get(url);
  },

  // search ho dan
  searchHodan(query) {
    const url = `/api/hodan/search?${query}`;
    return axiosClient.get(url);
  },

  // lay thong tin 1 ho dan
  singleHodan(id) {
    const url = `/api/hodan/single/${id}`;
    return axiosClient.get(url);
  },

  // xoa 1 ho dan
  xoa1Hodan(id) {
    const url = `/api/hodan/single/${id}`;
    return axiosClient.delete(url);
  },

  // xoa nhieu ho dan
  xoaNhieuHodan(arrOfId) {
    const url = `/api/hodan/multiple`;
    return axiosClient.put(url, arrOfId);
  },

  // lay hodan info based userId
  singleHodanBasedUser(userId) {
    const url = `/api/hodan/singlehdbaseduser/${userId}`;
    return axiosClient.get(url);
  },

  // lay thong tin 1 phan phat thuoc hodan
  singlePhanphat(hodanId, phanphatId) {
    const url = `/api/hodan/singlephanphat/${hodanId}/${phanphatId}`;
    return axiosClient.get(url);
  },

  //===============================
  // lay danh sach phan phat  thuoc ho dan
  dsPhanphat(hodanId) {
    const url = `/api/hodan/dsphanphat/${hodanId}`;
    return axiosClient.get(url);
  },
  // lay danh sach phan phat CONG CU thuoc ho dan
  dsCongcuPhanphat(hodanId) {
    const url = `/api/hodan/dscongcuphanphat/${hodanId}`;
    return axiosClient.get(url);
  },

  // lay danh sach phan phat VAT TU thuoc ho dan
  dsVattuPhanphat(hodanId) {
    const url = `/api/hodan/dsvattuphanphat/${hodanId}`;
    return axiosClient.get(url);
  },

  // lay danh sach CONG CU thuoc ho dan
  dsCongcu(hodanId) {
    const url = `/api/hodan/dscongcu/${hodanId}`;
    return axiosClient.get(url);
  },

  // lay danh sach VAT TU thuoc ho dan
  dsVattu(hodanId) {
    const url = `/api/hodan/dsvattu/${hodanId}`;
    return axiosClient.get(url);
  },
  // lay danh sach NGUYEN Lieu thuoc ho dan
  dsNguyenlieu(hodanId) {
    const url = `/api/hodan/dsnguyenlieu/${hodanId}`;
    return axiosClient.get(url);
  },
  // lay ds don hang thuoc hodan
  dsDonhang(hodanId) {
    const url = `/api/hodan/dsdonhang/${hodanId}`;
    return axiosClient.get(url);
  },
  // xac nhan don hang thuoc hodan
  xacnhan(hodanId, donhangId) {
    const url = `/api/hodan/xacnhandh/${hodanId}/${donhangId}`;
    return axiosClient.put(url);
  },
  // them cong cu hu loi
  themCongcuHuloi(hodanId, payload) {
    const url = `/api/hodan/themcchuloi/${hodanId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds cong cu hu loi
  dsCongcuHuloi(hodanId) {
    const url = `/api/hodan/dscchuloi/${hodanId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them vat tu hu loi
  themVattuHuloi(hodanId, payload) {
    const url = `/api/hodan/themvthuloi/${hodanId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds vat tu hu loi
  dsVattuHuloi(hodanId) {
    const url = `/api/hodan/dsvthuloi/${hodanId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them nguyen lieu hu loi
  themNguyenlieuHuloi(hodanId, payload) {
    const url = `/api/hodan/themnglhuloi/${hodanId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds nguyen lieu hu loi
  dsNguyenlieuHuloi(hodanId) {
    const url = `/api/hodan/dsnglhuloi/${hodanId}`;
    return axiosClient.get(url);
  },
  //ho dan bao cao don hang
  baocao(data) {
    const url = `/api/hodan/baocao`;
    return axiosClient.put(url,data);
  },
};

export default hodanApi;
