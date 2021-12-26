### ỨNG DỤNG QUẢN LÝ LÀNG NGHỀ(Underline)

#### CÁC CÔNG NGHỆ LIÊN QUAN(Underline)

- MongoDB cho cơ sở dữ liệu
- ReactJs, React native cho frontend
- Nodejs, Express cho backend

#### CÁCH SỬ DỤNG(Underline)

Lấy dự án về máy vật lý

`Git clone https://github.com/thcuong1999/luan_van_tca.git`

Cài đặt các module cho ứng dụng chạy trên web

`cd frontend`

`npm i`

Cài đặt các module cho ứng dụng chạy trên di động

`cd mobile`

`npm i`

#### Các lệnh để khởi chạy ứng dụng

Khởi động máy chủ

`cd api`

`npm start`

Khởi động ứng dụng trên web

`cd frontend`

`npm start`

Khởi động ứng dụng trên di động

`cd mobile`

`npm start`

#### Chú ý :

Nhớ tắt tất cả dịch vụ chạy trên cổng đã sử dụng

- App server là 5000
- App web là 3000
- App mobile là 19002

Nhớ thay đổi lại link kết nối đến database trong file .env của thư mục api

Kiểm tra code kết nối database trong file config.js trong thư mục api>database có đúng với trong file .env
