import axiosClient from "./axiosClient";

const apiBophankd = {
  // them bpkd
  themBophankd(data) {
    const url = "/bophankd/them";
    return axiosClient.post(url, data);
  },

  // lay ds bpkd
  dsBophankd() {
    const url = "/bophankd/danhsach";
    return axiosClient.get(url);
  },

  // lay 1 bpkd
  singleBophankd(id) {
    const url = `/bophankd/single/${id}`;
    return axiosClient.get(url);
  },

  // xoa 1 bpkd
  xoa1Bophankd(id) {
    const url = `/bophankd/single/${id}`;
    return axiosClient.delete(url);
  },

  // xoa nhieu bpkd
  xoaNhieuBophankd(arrOfId) {
    const url = "/bophankd/xoanhieubpkd";
    return axiosClient.put(url, arrOfId);
  },

  // sua 1 bpkd
  suaBophankd(id, data) {
    const url = `/bophankd/single/${id}`;
    return axiosClient.put(url, data);
  },

  // lay thong tin 1 bpkd dua tren userId
  bophankdBasedUserId(userId) {
    const url = `/bophankd/baseduserid/${userId}`;
    return axiosClient.get(url);
  },

  // lay danh sach san pham thuoc bophankdId
  bophankdDSSanpham(bophankdId) {
    const url = `/bophankd/dssanpham/${bophankdId}`;
    return axiosClient.get(url);
  },

  // lay danh sach cong cu thuoc bophankd
  bophankdDSCongcu(bophankdId) {
    const url = `/bophankd/dscongcu/${bophankdId}`;
    return axiosClient.get(url);
  },

  // lay danh sach vattu thuoc bophankd
  bophankdDSVattu(bophankdId) {
    const url = `/bophankd/dsvattu/${bophankdId}`;
    return axiosClient.get(url);
  },

  // lay danh sach nguyenlieu thuoc bophankd
  bophankdDSNguyenlieu(bophankdId) {
    const url = `/bophankd/dsnguyenlieu/${bophankdId}`;
    return axiosClient.get(url);
  },

  // lay danh sach sp trong khohang
  bophankdDsspKhohang(bophankdId) {
    const url = `/bophankd/dsspkhohang/${bophankdId}`;
    return axiosClient.get(url);
  },

  //=== lay danh sach daily 1 thuoc bophankd
  bophankdDsDaily1(bophankdId) {
    const url = `/bophankd/dsdaily1/${bophankdId}`;
    return axiosClient.get(url);
  },

  //=== lay danh sach giam sat vung thuoc bophankd
  bophankdDsGSV(bophankdId) {
    const url = `/bophankd/dsgiamsatvung/${bophankdId}`;
    return axiosClient.get(url);
  },

  //=== lay danh sach phan phat cua bophankd
  dsPhanphat(bophankdId) {
    const url = `/bophankd/dsphanphat/${bophankdId}`;
    return axiosClient.get(url);
  },

  // xoa 1 sp thuoc bophankd
  bophankdXoaSanpham(payload) {
    const url = `/bophankd/xoasanpham`;
    return axiosClient.put(url, payload);
  },

  // xoa nhieu` sp thuoc bophankd
  bophankdXoaNhieuSP(payload) {
    const url = `/bophankd/xoanhieusp`;
    return axiosClient.put(url, payload);
  },

  // xoa nhieu` cc thuoc bophankd
  bophankdXoaNhieuCC(payload) {
    const url = `/bophankd/xoanhieucc`;
    return axiosClient.put(url, payload);
  },

  // xoa nhieu` nglieu thuoc bophankd
  bophankdXoaNhieuNglieu(payload) {
    const url = `/bophankd/xoanhieunglieu`;
    return axiosClient.put(url, payload);
  },

  // xoa nhieu` vattu thuoc bophankd
  bophankdXoaNhieuVattu(payload) {
    const url = `/bophankd/xoanhieuvattu`;
    return axiosClient.put(url, payload);
  },

  // xoa nhieu` daily 1 thuoc bophankd
  bophankdXoaNhieuDaily1(payload) {
    const url = `/bophankd/xoanhieudaily1`;
    return axiosClient.put(url, payload);
  },

  // xoa nhieu` giam sat vung thuoc bophankd
  bophankdXoaNhieuGSV(payload) {
    const url = `/bophankd/xoanhieugsv`;
    return axiosClient.put(url, payload);
  },

  // xoa 1 congcu thuoc bophankd
  bophankdXoaCongcu(payload) {
    const url = `/bophankd/xoacongcu`;
    return axiosClient.put(url, payload);
  },

  // xoa 1 nguyenlieu thuoc bophankd
  xoa1Nguyenlieu(payload) {
    const url = `/bophankd/xoa1nguyenlieu`;
    return axiosClient.put(url, payload);
  },

  // xoa 1 vat tu thuoc bophankd
  xoa1Vattu(payload) {
    const url = `/bophankd/xoa1vattu`;
    return axiosClient.put(url, payload);
  },

  // them daily 1
  bophankdThemDaily1(data) {
    const url = `/bophankd/themdaily1`;
    return axiosClient.put(url, data);
  },

  // them giam sat vung
  bophankdThemGSV(data) {
    const url = `/bophankd/themgsv`;
    return axiosClient.put(url, data);
  },

  // them san pham
  themSanpham(data) {
    const url = `/bophankd/themsanpham`;
    return axiosClient.put(url, data);
  },

  // Lay danh sach dai ly 2 thuoc bpkd
  dsDaily2(bpkdId) {
    const url = `/bophankd/dsdaily2/${bpkdId}`;
    return axiosClient.get(url);
  },

  // Active dai ly 1
  activeDaily1(daily1Id, bophankdId) {
    const url = `/bophankd/duyetdaily1/${daily1Id}/${bophankdId}`;
    return axiosClient.put(url);
  },

  // Active dai ly 2
  activeDaily2(daily2Id, bophankdId) {
    const url = `/bophankd/duyetdaily2/${daily2Id}/${bophankdId}`;
    return axiosClient.put(url);
  },

  // lay ds don hang thuoc bophankd
  dsDonhang(bpkdId) {
    const url = `/bophankd/dsdonhang/${bpkdId}`;
    return axiosClient.get(url);
  },

  // lay ds SUB don hang thuoc bophankd
  dsSubDonhang(bpkdId, madh) {
    const url = `/bophankd/dssubdonhang/${bpkdId}/${madh}`;
    return axiosClient.get(url);
  },

  // lay so lieu tong quan
  tongquan(id) {
    const url = `/bophankd/tongquan/${id}`;
    return axiosClient.get(url);
  },

  // lay ds daily1 daily2 chua duyet hien thi badge
  dsShowBadge(bophankdId) {
    const url = `/bophankd/dsshowbadge/${bophankdId}`;
    return axiosClient.get(url);
  },

  // them cong cu hu loi
  themCongcuHuloi(bpkdId, payload) {
    const url = `/bophankd/themcchuloi/${bpkdId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds cong cu hu loi
  dsCongcuHuloi(bpkdId) {
    const url = `/bophankd/dscchuloi/${bpkdId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them vat tu hu loi
  themVattuHuloi(bpkdId, payload) {
    const url = `/bophankd/themvthuloi/${bpkdId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds vat tu hu loi
  dsVattuHuloi(bpkdId) {
    const url = `/bophankd/dsvthuloi/${bpkdId}`;
    return axiosClient.get(url);
  },

  //-------------

  // them nguyen lieu hu loi
  themNguyenlieuHuloi(bpkdId, payload) {
    const url = `/bophankd/themnglhuloi/${bpkdId}`;
    return axiosClient.put(url, payload);
  },

  // lay ds nguyen lieu hu loi
  dsNguyenlieuHuloi(bpkdId) {
    const url = `/bophankd/dsnglhuloi/${bpkdId}`;
    return axiosClient.get(url);
  },

  // lay ds subdonhang cua 1 don hang co ma cu the va thuoc bpkd co ma bpkd
  dssubdonhangOfSingleDH(bophankd, madh) {
    const url = `/bophankd/dssubdhofsingledh/${bophankd}/${madh}`;
    return axiosClient.get(url);
  },

  // lay ds hodan
  dsHodan(bophankd) {
    const url = `/bophankd/dshodan/${bophankd}`;
    return axiosClient.get(url);
  },

  // Tổng hợp số liệu tổng quát của tiến độ đơn hàng
  tiendoDonhang(bpkdId, maDH) {
    const url = `/bophankd/tiendodonhang/${bpkdId}/${maDH}`;
    return axiosClient.get(url);
  },

  // cap nhat thong tin ca nhan
  capnhatThongtinCanhan(payload) {
    const url = "/bophankd/capnhatthongtincanhan";
    return axiosClient.put(url, payload);
  },
};

export default apiBophankd;
