import axiosClient from "./axiosClient";

const apiDaily2 = {
  // them daily 2
  themDaily2(data) {
    const url = "/daily2/them";
    return axiosClient.post(url, data);
  },

  // daily2 them hodan
  themHodan(payload) {
    const url = "/daily2/themhodan";
    return axiosClient.put(url, payload);
  },

  // lay thong tin daily 2
  singleDaily2(daily2Id) {
    const url = `/daily2/single/${daily2Id}`;
    return axiosClient.get(url);
  },

  // chinh sua 2 dai ly 2
  suaDaily2(id, data) {
    const url = `/daily2/single/${id}`;
    return axiosClient.put(url, data);
  },

  // danh sach daily 2
  dsDaily2() {
    const url = "/daily2/danhsach";
    return axiosClient.get(url);
  },

  // danh sach hodan thuoc daily 2
  dsHodan(daily2Id) {
    const url = `/daily2/dshodan/${daily2Id}`;
    return axiosClient.get(url);
  },

  // lay thong tin 1 phan phat thuoc daily2
  singlePhanphat(daily2Id, phanphatId) {
    const url = `/daily2/singlephanphat/${daily2Id}/${phanphatId}`;
    return axiosClient.get(url);
  },

  // lay ds daily 2 + daily1: null
  dsDaily2Daily1Null() {
    const url = "/daily2/dsdly2dly1null";
    return axiosClient.get(url);
  },

  // // lay thong tin 2 daily 2
  // singleDaily2(id) {
  //   const url = `/daily2/single/${id}`;
  //   return axiosClient.get(url);
  // },

  // xoa 1 dai ly 2
  xoa1daily2(id) {
    const url = `/daily2/single/${id}`;
    return axiosClient.delete(url);
  },

  // xoa nhieu daily 2
  xoaNhieuDaily2(arrOfId) {
    const url = `/daily2/multiple`;
    return axiosClient.put(url, arrOfId);
  },

  // xoa nhieu ho dan
  xoaNhieuHodan(payload) {
    const url = `/daily2/xoanhieuhodan`;
    return axiosClient.put(url, payload);
  },

  // get single daily2 based userId
  singleDaily2BasedUser(userId) {
    const url = `/daily2/user/${userId}`;
    return axiosClient.get(url);
  },

  //============================

  // lay ds phan phat CONG CU thuoc daily2
  dsPhanphat(daily2Id) {
    const url = `/daily2/dsphanphat/${daily2Id}`;
    return axiosClient.get(url);
  },

  // lay ds phan phat VAT TU thuoc daily2
  dsVattuPhanphat(daily2Id) {
    const url = `/daily2/dsvattuphanphat/${daily2Id}`;
    return axiosClient.get(url);
  },

  //============
  // lay ds don hang thuoc daily2
  dsDonhang(daily1Id) {
    const url = `/daily2/dsdonhang/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay ds SUB don hang thuoc daily2
  dsSubDonhang(daily1Id, madh) {
    const url = `/daily2/dssubdonhang/${daily1Id}/${madh}`;
    return axiosClient.get(url);
  },

  // lay ds san pham thuoc daily2
  dsSanpham(daily2Id) {
    const url = `/daily2/dssanpham/${daily2Id}`;
    return axiosClient.get(url);
  },

  // lay ds cong cu thuoc daily2
  dsCongcu(daily2Id) {
    const url = `/daily2/dscongcu/${daily2Id}`;
    return axiosClient.get(url);
  },

  // lay ds vat tu thuoc daily2
  dsVattu(daily2Id) {
    const url = `/daily2/dsvattu/${daily2Id}`;
    return axiosClient.get(url);
  },

  // lay ds cong cu thuoc daily2
  dsNguyenlieu(daily2Id) {
    const url = `/daily2/dsnguyenlieu/${daily2Id}`;
    return axiosClient.get(url);
  },

  // lay so lieu tong quan
  tongquan(daily2Id) {
    const url = `/daily2/tongquan/${daily2Id}`;
    return axiosClient.get(url);
  },

  // lay ds donhang chua duyet hien thi badge
  dsShowBadge(dl2Id) {
    const url = `/daily2/dsshowbadge/${dl2Id}`;
    return axiosClient.get(url);
  },

  // them cong cu hu loi
  themCongcuHuloi(dl2Id, payload) {
    const url = `/daily2/themcchuloi/${dl2Id}`;
    return axiosClient.put(url, payload);
  },

  // lay ds cong cu hu loi
  dsCongcuHuloi(dl2Id) {
    const url = `/daily2/dscchuloi/${dl2Id}`;
    return axiosClient.get(url);
  },

  //-------------

  // them vat tu hu loi
  themVattuHuloi(dl2Id, payload) {
    const url = `/daily2/themvthuloi/${dl2Id}`;
    return axiosClient.put(url, payload);
  },

  // lay ds vat tu hu loi
  dsVattuHuloi(dl2Id) {
    const url = `/daily2/dsvthuloi/${dl2Id}`;
    return axiosClient.get(url);
  },

  //-------------

  // them nguyen lieu hu loi
  themNguyenlieuHuloi(dl2Id, payload) {
    const url = `/daily2/themnglhuloi/${dl2Id}`;
    return axiosClient.put(url, payload);
  },

  // lay ds nguyen lieu hu loi
  dsNguyenlieuHuloi(dl2Id) {
    const url = `/daily2/dsnglhuloi/${dl2Id}`;
    return axiosClient.get(url);
  },

  // lay ds subdonhang cua 1 don hang co ma cu the va thuoc daily2 co ma daily2
  dssubdonhangOfSingleDH(daily2Id, madh) {
    const url = `/daily2/dssubdhofsingledh/${daily2Id}/${madh}`;
    return axiosClient.get(url);
  },

  // Tổng hợp số liệu tổng quát của tiến độ đơn hàng
  tiendoDonhang(dl2Id, maDH) {
    const url = `/daily2/tiendodonhang/${dl2Id}/${maDH}`;
    return axiosClient.get(url);
  },

  // cap nhat thong tin ca nhan
  capnhatThongtinCanhan(payload) {
    const url = "/daily2/capnhatthongtincanhan";
    return axiosClient.put(url, payload);
  },
};

export default apiDaily2;
