import axiosClient from "./axiosClient";

const apiGSV = {
  // them gsv
  themGsv(data) {
    const url = "/gsv/them";
    return axiosClient.post(url, data);
  },

  // lay thong tin 1 gsv
  singleGsv(gsvId) {
    const url = `/gsv/single/${gsvId}`;
    return axiosClient.get(url);
  },

  // sua thong tin 1 gsv
  chinhsuaGsv(gsvId, data) {
    const url = `/gsv/single/${gsvId}`;
    return axiosClient.put(url, data);
  },

  // xoa nhieu` gsv
  xoaNhieuGsv(arrayOfId) {
    const url = `/gsv/multiple`;
    return axiosClient.put(url, arrayOfId);
  },

  // lay thong tin 1 gsv based useId
  singleGsvBasedUserId(userId) {
    const url = `/gsv/baseduserid/${userId}`;
    return axiosClient.get(url);
  },

  // lay ds gsv
  dsGsv() {
    const url = "/gsv/danhsach";
    return axiosClient.get(url);
  },

  // lay ds gsv chưa có bộ phận kinh doanh
  dsGSVBpkdNull() {
    const url = "/gsv/dsgsvbpkdnull";
    return axiosClient.get(url);
  },

  // lay ds dai ly 1 thuoc giam sat vung
  dsDaily1(gsvId) {
    const url = `/gsv/dsdaily1/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds dai ly 2 thuoc giam sat vung
  dsDaily2(gsvId) {
    const url = `/gsv/dsdaily2/${gsvId}`;
    return axiosClient.get(url);
  },

  // Active dai ly 2
  activeDaily2(daily2Id, gsvId) {
    const url = `/gsv/duyet/${daily2Id}/${gsvId}`;
    return axiosClient.put(url);
  },

  // lay ds don hang thuoc gsv
  dsDonhang(gsvId) {
    const url = `/gsv/dsdonhang/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds SUB don hang thuoc giamsatvung
  dsSubDonhang(gsvId, madh) {
    const url = `/gsv/dssubdonhang/${gsvId}/${madh}`;
    return axiosClient.get(url);
  },

  // lay ds san pham thuoc gsv
  dsSanpham(gsvId) {
    const url = `/gsv/dssanpham/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds cong cu thuoc gsv
  dsCongcu(gsvId) {
    const url = `/gsv/dscongcu/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds vat tu thuoc gsv
  dsVattu(gsvId) {
    const url = `/gsv/dsvattu/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds cong cu thuoc gsv
  dsNguyenlieu(gsvId) {
    const url = `/gsv/dsnguyenlieu/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay so lieu tong quan
  tongquan(gsvId) {
    const url = `/gsv/tongquan/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds daily2, donhang chua duyet hien thi badge
  dsShowBadge(gsvId) {
    const url = `/gsv/dsshowbadge/${gsvId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them cong cu hu loi
  themCongcuHuloi(gsvId, payload) {
    const url = `/gsv/themcchuloi/${gsvId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds cong cu hu loi
  dsCongcuHuloi(gsvId) {
    const url = `/gsv/dscchuloi/${gsvId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them vat tu hu loi
  themVattuHuloi(gsvId, payload) {
    const url = `/gsv/themvthuloi/${gsvId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds vat tu hu loi
  dsVattuHuloi(gsvId) {
    const url = `/gsv/dsvthuloi/${gsvId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them nguyen lieu hu loi
  themNguyenlieuHuloi(gsvId, payload) {
    const url = `/gsv/themnglhuloi/${gsvId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds nguyen lieu hu loi
  dsNguyenlieuHuloi(gsvId) {
    const url = `/gsv/dsnglhuloi/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds subdonhang cua 1 don hang co ma cu the va thuoc bpkd co ma bpkd
  dssubdonhangOfSingleDH(gsvId, madh) {
    const url = `/gsv/dssubdhofsingledh/${gsvId}/${madh}`;
    return axiosClient.get(url);
  },

  // lay ds hodan
  dsHodan(gsvId) {
    const url = `/gsv/dshodan/${gsvId}`;
    return axiosClient.get(url);
  },

  // Tổng hợp số liệu tổng quát của tiến độ đơn hàng
  tiendoDonhang(gsvId, maDH) {
    const url = `/gsv/tiendodonhang/${gsvId}/${maDH}`;
    return axiosClient.get(url);
  },

  // cap nhat thong tin ca nhan
  capnhatThongtinCanhan(payload) {
    const url = "/gsv/capnhatthongtincanhan";
    return axiosClient.put(url, payload);
  },
};

export default apiGSV;
