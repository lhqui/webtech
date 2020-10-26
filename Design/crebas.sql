/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     10/23/2020 10:44:10 PM                       */
/*==============================================================*/

TESTING
drop table if exists binhluan;

drop table if exists ghe;

drop table if exists khuyenmai;

drop table if exists loaisuatchieu;

drop table if exists muave;

drop table if exists phim;

drop table if exists phong;

drop table if exists rap;

drop table if exists suatchieu;

drop table if exists user;

drop table if exists ve;

/*==============================================================*/
/* Table: binhluan                                              */
/*==============================================================*/
create table binhluan
(
   username             varchar(50) not null,
   muave_stt            int not null,
   binhluan_noidung     varchar(200) not null,
   binhluan_diem        int not null,
   primary key (username, muave_stt)
);

/*==============================================================*/
/* Table: ghe                                                   */
/*==============================================================*/
create table ghe
(
   ghe_hang             varchar(1) not null,
   ghe_stt              int not null,
   primary key (ghe_hang, ghe_stt)
);

/*==============================================================*/
/* Table: khuyenmai                                             */
/*==============================================================*/
create table khuyenmai
(
   khuyenmai_id         int not null auto_increment,
   username             varchar(50) not null,
   khuyenmai_phantram   float(2) not null,
   khuyenmai_dasudung   bool not null,
   primary key (khuyenmai_id)
);

/*==============================================================*/
/* Table: loaisuatchieu                                         */
/*==============================================================*/
create table loaisuatchieu
(
   loaisuatchieu_id     int not null,
   loai_khunggio_start  int not null,
   loai_khunggio_end    int not null,
   loai_khungngay       int,
   loai_gia             int not null,
   primary key (loaisuatchieu_id)
);

/*==============================================================*/
/* Table: muave                                                 */
/*==============================================================*/
create table muave
(
   username             varchar(50) not null,
   muave_stt            int not null,
   rap_id               int not null,
   phong_stt            int not null,
   suatchieu_thoidiem   datetime not null,
   khuyenmai_id         int,
   muave_soluong        int not null,
   muave_thoidiem       datetime not null,
   muave_tongtien       int not null,
   primary key (username, muave_stt)
);

/*==============================================================*/
/* Table: phim                                                  */
/*==============================================================*/
create table phim
(
   phim_id              int not null auto_increment,
   phim_ten             varchar(50) not null,
   phim_mieuta          varchar(2000) not null,
   phim_anhbia          longblob not null,
   phim_thoiluong       int not null,
   phim_gia             int not null,
   phim_ngaysx          date not null,
   phim_ngaychieu       date not null,
   primary key (phim_id)
);

/*==============================================================*/
/* Table: phong                                                 */
/*==============================================================*/
create table phong
(
   rap_id               int not null,
   phong_stt            int not null,
   primary key (rap_id, phong_stt)
);

/*==============================================================*/
/* Table: rap                                                   */
/*==============================================================*/
create table rap
(
   rap_id               int not null,
   rap_ten              varchar(50) not null,
   rap_diachi           varchar(200),
   primary key (rap_id)
);

/*==============================================================*/
/* Table: suatchieu                                             */
/*==============================================================*/
create table suatchieu
(
   rap_id               int not null,
   phong_stt            int not null,
   suatchieu_thoidiem   datetime not null,
   phim_id              int not null,
   loaisuatchieu_id     int not null,
   primary key (rap_id, phong_stt, suatchieu_thoidiem)
);

/*==============================================================*/
/* Table: user                                                  */
/*==============================================================*/
create table user
(
   username             varchar(50) not null,
   password             varchar(50) not null,
   primary key (username)
);

/*==============================================================*/
/* Table: ve                                                    */
/*==============================================================*/
create table ve
(
   rap_id               int not null,
   phong_stt            int not null,
   suatchieu_thoidiem   datetime not null,
   ghe_hang             varchar(1) not null,
   ghe_stt              int not null,
   username             varchar(50) not null,
   muave_stt            int not null,
   primary key (rap_id, phong_stt, suatchieu_thoidiem, ghe_hang, ghe_stt, username, muave_stt)
);

alter table binhluan add constraint FK_binh_luan_sau_khi_mua foreign key (username, muave_stt)
      references muave (username, muave_stt) on delete restrict on update restrict;

alter table khuyenmai add constraint FK_user_co_km foreign key (username)
      references user (username) on delete restrict on update restrict;

alter table muave add constraint FK_ap_dung_km foreign key (khuyenmai_id)
      references khuyenmai (khuyenmai_id) on delete restrict on update restrict;

alter table muave add constraint FK_mua_ve foreign key (username)
      references user (username) on delete restrict on update restrict;

alter table muave add constraint FK_suat_nao foreign key (rap_id, phong_stt, suatchieu_thoidiem)
      references suatchieu (rap_id, phong_stt, suatchieu_thoidiem) on delete restrict on update restrict;

alter table phong add constraint FK_phong_thuoc_rap foreign key (rap_id)
      references rap (rap_id) on delete restrict on update restrict;

alter table suatchieu add constraint FK_chieu_tai_phong foreign key (rap_id, phong_stt)
      references phong (rap_id, phong_stt) on delete restrict on update restrict;

alter table suatchieu add constraint FK_gia_suat_chieu foreign key (loaisuatchieu_id)
      references loaisuatchieu (loaisuatchieu_id) on delete restrict on update restrict;

alter table suatchieu add constraint FK_relationship_4 foreign key (phim_id)
      references phim (phim_id) on delete restrict on update restrict;

alter table ve add constraint FK_danh_sach_ve foreign key (username, muave_stt)
      references muave (username, muave_stt) on delete restrict on update restrict;

alter table ve add constraint FK_ghe_cua_ve foreign key (ghe_hang, ghe_stt)
      references ghe (ghe_hang, ghe_stt) on delete restrict on update restrict;

alter table ve add constraint FK_ve_thuoc_suat_chieu foreign key (rap_id, phong_stt, suatchieu_thoidiem)
      references suatchieu (rap_id, phong_stt, suatchieu_thoidiem) on delete restrict on update restrict;

