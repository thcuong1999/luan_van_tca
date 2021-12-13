import axiosClient from "./axiosClient";

const apiGiaohang = {
  // ho dan giao hang -> daily 2
  hodanToDaily2(data) {
    const url = "/giaohang/hodantodaily2";
    return axiosClient.post(url, data);
  },

  // dai ly 2 xac nhan
  daily2Xacnhan(giaohangId) {
    const url = `/giaohang/daily2xacnhan/${giaohangId}`;
    return axiosClient.put(url);
  },

  // daily 2 giao hang -> daily 1
  daily2ToDaily1(data) {
    const url = "/giaohang/daily2todaily1";
    return axiosClient.post(url, data);
  },

  // dai ly 1 xac nhan
  daily1Xacnhan(giaohangId) {
    const url = `/giaohang/daily1xacnhan/${giaohangId}`;
    return axiosClient.put(url);
  },

  // daily 1 giao hang -> giam sat vung
  daily1ToGSV(data) {
    const url = "/giaohang/daily1togsv";
    return axiosClient.post(url, data);
  },

  // gsv xac nhan
  gsvXacnhan(giaohangId) {
    const url = `/giaohang/gsvxacnhan/${giaohangId}`;
    return axiosClient.put(url);
  },

  // giam sat vung giao hang -> bophankd
  gsvToBophankd(data) {
    const url = "/giaohang/gsvtobophankd";
    return axiosClient.post(url, data);
  },

  // bophankd xac nhan
  bophankdXacnhan(giaohangId) {
    const url = `/giaohang/bophankdxacnhan/${giaohangId}`;
    return axiosClient.put(url);
  },

  // get single giaohang
  singleGiaohang(ghId) {
    const url = `/giaohang/single/${ghId}`;
    return axiosClient.get(url);
  },

  // lay danh sach giao hang cua ho dan -> daily2
  dsHodanGiaohang(daily2Id) {
    const url = `/giaohang/dsgiaohanghodan/${daily2Id}`;
    return axiosClient.get(url);
  },

  // lay danh sach giao hang DI cua dai ly 2 -> daily1
  dsDaily2Giaohang(daily2Id) {
    const url = `/giaohang/dsgiaohangdaily2/${daily2Id}`;
    return axiosClient.get(url);
  },

  // lay danh sach giao hang DEN cua daily2 -> daily1
  dsGiaohangDenDaily2Daily1(daily1Id) {
    const url = `/giaohang/dsghdendaily2daily1/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay danh sach giao hang DI cua dai daily 1 -> gsv
  dsGiaohangDiDaily1Gsv(daily1Id) {
    const url = `/giaohang/dsghdidaily1gsv/${daily1Id}`;
    return axiosClient.get(url);
  },

  // lay danh sach giao hang DEN cua daily1 -> gsv
  dsGiaohangDenDaily1Gsv(gsvId) {
    const url = `/giaohang/dsghdendaily1gsv/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay danh sach giao hang DI cua dai gsv -> bophankd
  dsGiaohangDiGsvBophankd(gsvId) {
    const url = `/giaohang/dsghdigsvbpkd/${gsvId}`;
    return axiosClient.get(url);
  },

  // lay danh sach giao hang DEN cua gsv -> bophankd
  dsGiaohangDenGsvBophankd(bpkdId) {
    const url = `/giaohang/dsghdengsvbpkd/${bpkdId}`;
    return axiosClient.get(url);
  },
};

export default apiGiaohang;
