import axiosClient from "./axiosClient";

const apiDaily1 = {
  // them daily 1
  themDaily1(data) {
    const url = "/daily1/them";
    return axiosClient.post(url, data);
  },

  // chinh sua 1 dai ly 1
  suaDaily1(id, data) {
    const url = `/daily1/single/${id}`;
    return axiosClient.put(url, data);
  },

  // danh sach daily 1
  dsDaily1() {
    const url = "/daily1/danhsach";
    return axiosClient.get(url);
  },

  // lay thong tin 1 daily 1
  singleDaily1(id) {
    const url = `/daily1/single/${id}`;
    return axiosClient.get(url);
  },

  // lay ds daily 1 chưa có bộ phận kinh doanh
  dsDaily1BpkdNull() {
    const url = "/daily1/dsdaily1bpkdnull";
    return axiosClient.get(url);
  },

  // lay ds CONG CU phan phat thuoc daily1
  dsPhanphat(daily1Id) {
    const url = `/daily1/dsphanphat/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay ds VAT TU phan phat thuoc daily1
  dsVattuPhanphat(daily1Id) {
    const url = `/daily1/dsvattuphanphat/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay thong tin 1 phan phat thuocd daily1
  singlePhanphat(daily1Id, phanphatId) {
    const url = `/daily1/singlephanphat/${daily1Id}/${phanphatId}`;
    return axiosClient.get(url);
  },

  // xoa 1 dai ly 1
  xoa1Daily1(id) {
    const url = `/daily1/single/${id}`;
    return axiosClient.delete(url);
  },

  // xoa nhieu daily 1
  xoaNhieuDaily1(arrOfId) {
    const url = `/daily1/multiple`;
    return axiosClient.put(url, arrOfId);
  },

  // xoa nhieu daily 2
  xoaNhieuDaily2(payload) {
    const url = `/daily1/xoanhieudaily2`;
    return axiosClient.put(url, payload);
  },

  // lay thong tin daily1 based userId
  singleDaily1BasedUser(userId) {
    const url = `/daily1/user/${userId}`;
    return axiosClient.get(url);
  },

  // daily1 them daily2
  themDaily2(data) {
    const url = `/daily1/themdaily2`;
    return axiosClient.put(url, data);
  },

  // lay danh sach daily 2 thuoc daily 1
  dsDaily2(daily1Id) {
    const url = `/daily1/dsdaily2/${daily1Id}`;
    return axiosClient.get(url);
  },

  // Lay danh sach hodan thuoc dai ly 1
  dsHodan(daily1Id) {
    const url = `/daily1/dshodan/${daily1Id}`;
    return axiosClient.get(url);
  },

  // Duyệt hộ dân
  activeHodan(hodanId, daily1Id) {
    const url = `/daily1/duyet/${hodanId}/${daily1Id}`;
    return axiosClient.put(url);
  },

  // lay ds don hang thuoc daily1
  dsDonhang(daily1Id) {
    const url = `/daily1/dsdonhang/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay ds SUB don hang thuoc daily1
  dsSubDonhang(daily1Id, madh) {
    const url = `/daily1/dssubdonhang/${daily1Id}/${madh}`;
    return axiosClient.get(url);
  },

  // lay ds san pham thuoc daily1
  dsSanpham(daily1Id) {
    const url = `/daily1/dssanpham/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay ds cong cu thuoc daily1
  dsCongcu(daily1Id) {
    const url = `/daily1/dscongcu/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay ds vat tu thuoc daily1
  dsVattu(daily1Id) {
    const url = `/daily1/dsvattu/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay ds cong cu thuoc daily1
  dsNguyenlieu(daily1Id) {
    const url = `/daily1/dsnguyenlieu/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay so lieu tong quan
  tongquan(daily1Id) {
    const url = `/daily1/tongquan/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay ds hodan, donhang chua duyet hien thi badge
  dsShowBadge(gsvId) {
    const url = `/daily1/dsshowbadge/${gsvId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them cong cu hu loi
  themCongcuHuloi(gsvId, payload) {
    const url = `/daily1/themcchuloi/${gsvId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds cong cu hu loi
  dsCongcuHuloi(gsvId) {
    const url = `/daily1/dscchuloi/${gsvId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them vat tu hu loi
  themVattuHuloi(gsvId, payload) {
    const url = `/daily1/themvthuloi/${gsvId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds vat tu hu loi
  dsVattuHuloi(gsvId) {
    const url = `/daily1/dsvthuloi/${gsvId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them nguyen lieu hu loi
  themNguyenlieuHuloi(gsvId, payload) {
    const url = `/daily1/themnglhuloi/${gsvId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds nguyen lieu hu loi
  dsNguyenlieuHuloi(gsvId) {
    const url = `/daily1/dsnglhuloi/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay ds subdonhang cua 1 don hang co ma cu the va thuoc daily1 co ma daily1
  dssubdonhangOfSingleDH(daily1Id, madh) {
    const url = `/daily1/dssubdhofsingledh/${daily1Id}/${madh}`;
    return axiosClient.get(url);
  },

  // Tổng hợp số liệu tổng quát của tiến độ đơn hàng
  tiendoDonhang(dl1Id, maDH) {
    const url = `/daily1/tiendodonhang/${dl1Id}/${maDH}`;
    return axiosClient.get(url);
  },

  // cap nhat thong tin ca nhan
  capnhatThongtinCanhan(payload) {
    const url = "/daily1/capnhatthongtincanhan";
    return axiosClient.put(url, payload);
  },
};

export default apiDaily1;
