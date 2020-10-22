/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     10/22/2020 6:25:27 PM                        */
/*==============================================================*/


drop table if exists BINHLUAN;

drop table if exists GHE;

drop table if exists KHUYENMAI;

drop table if exists LOAISUATCHIEU;

drop table if exists MUAVE;

drop table if exists PHIM;

drop table if exists PHONG;

drop table if exists RAP;

drop table if exists SUATCHIEU;

drop table if exists USER;

drop table if exists VE;

/*==============================================================*/
/* Table: BINHLUAN                                              */
/*==============================================================*/
create table BINHLUAN
(
   USERNAME             varchar(50) not null,
   MUAVE_STT            int not null,
   BINHLUAN_NOIDUNG     varchar(200) not null,
   BINHLUAN_DIEM        int not null,
   primary key (USERNAME, MUAVE_STT)
);

/*==============================================================*/
/* Table: GHE                                                   */
/*==============================================================*/
create table GHE
(
   GHE_HANG             varchar(1) not null,
   GHE_STT              int not null,
   primary key (GHE_HANG, GHE_STT)
);

/*==============================================================*/
/* Table: KHUYENMAI                                             */
/*==============================================================*/
create table KHUYENMAI
(
   KHUYENMAI_ID         int not null,
   USERNAME             varchar(50) not null,
   KHUYENMAI_PHANTRAM   float(2) not null,
   KHUYENMAI_DASUDUNG   bool not null,
   primary key (KHUYENMAI_ID)
);

/*==============================================================*/
/* Table: LOAISUATCHIEU                                         */
/*==============================================================*/
create table LOAISUATCHIEU
(
   LOAISUATCHIEU_ID     int not null,
   LOAI_KHUNGGIO_START  int not null,
   LOAI_KHUNGGIO_END    int not null,
   LOAI_KHUNGNGAY       int,
   LOAI_GIA             int not null,
   primary key (LOAISUATCHIEU_ID)
);

/*==============================================================*/
/* Table: MUAVE                                                 */
/*==============================================================*/
create table MUAVE
(
   USERNAME             varchar(50) not null,
   MUAVE_STT            int not null,
   RAP_ID               int not null,
   PHONG_STT            int not null,
   SUATCHIEU_THOIDIEM   datetime not null,
   KHUYENMAI_ID         int,
   MUAVE_SOLUONG        int not null,
   MUAVE_THOIDIEM       datetime not null,
   MUAVE_TONGTIEN       int not null,
   primary key (USERNAME, MUAVE_STT)
);

/*==============================================================*/
/* Table: PHIM                                                  */
/*==============================================================*/
create table PHIM
(
   PHIM_ID              int not null,
   PHIM_TEN             varchar(50) not null,
   PHIM_MIEUTA          varchar(2000) not null,
   PHIM_ANHBIA          longblob not null,
   PHIM_THOILUONG       int not null,
   PHIM_GIA             int not null,
   PHIM_NGAYSX          date not null,
   PHIM_NGAYCHIEU       date not null,
   primary key (PHIM_ID)
);

/*==============================================================*/
/* Table: PHONG                                                 */
/*==============================================================*/
create table PHONG
(
   RAP_ID               int not null,
   PHONG_STT            int not null,
   primary key (RAP_ID, PHONG_STT)
);

/*==============================================================*/
/* Table: RAP                                                   */
/*==============================================================*/
create table RAP
(
   RAP_ID               int not null,
   RAP_TEN              varchar(50) not null,
   RAP_DIACHI           varchar(200),
   primary key (RAP_ID)
);

/*==============================================================*/
/* Table: SUATCHIEU                                             */
/*==============================================================*/
create table SUATCHIEU
(
   RAP_ID               int not null,
   PHONG_STT            int not null,
   SUATCHIEU_THOIDIEM   datetime not null,
   PHIM_ID              int not null,
   LOAISUATCHIEU_ID     int not null,
   primary key (RAP_ID, PHONG_STT, SUATCHIEU_THOIDIEM)
);

/*==============================================================*/
/* Table: USER                                                  */
/*==============================================================*/
create table USER
(
   USERNAME             varchar(50) not null,
   PASSWORD             varchar(50) not null,
   primary key (USERNAME)
);

/*==============================================================*/
/* Table: VE                                                    */
/*==============================================================*/
create table VE
(
   RAP_ID               int not null,
   PHONG_STT            int not null,
   SUATCHIEU_THOIDIEM   datetime not null,
   GHE_HANG             varchar(1) not null,
   GHE_STT              int not null,
   USERNAME             varchar(50) not null,
   MUAVE_STT            int not null,
   primary key (RAP_ID, PHONG_STT, SUATCHIEU_THOIDIEM, GHE_HANG, GHE_STT, USERNAME, MUAVE_STT)
);

alter table BINHLUAN add constraint FK_BINH_LUAN_SAU_KHI_MUA foreign key (USERNAME, MUAVE_STT)
      references MUAVE (USERNAME, MUAVE_STT) on delete restrict on update restrict;

alter table KHUYENMAI add constraint FK_USER_CO_KM foreign key (USERNAME)
      references USER (USERNAME) on delete restrict on update restrict;

alter table MUAVE add constraint FK_AP_DUNG_KM foreign key (KHUYENMAI_ID)
      references KHUYENMAI (KHUYENMAI_ID) on delete restrict on update restrict;

alter table MUAVE add constraint FK_MUA_VE foreign key (USERNAME)
      references USER (USERNAME) on delete restrict on update restrict;

alter table MUAVE add constraint FK_SUAT_NAO foreign key (RAP_ID, PHONG_STT, SUATCHIEU_THOIDIEM)
      references SUATCHIEU (RAP_ID, PHONG_STT, SUATCHIEU_THOIDIEM) on delete restrict on update restrict;

alter table PHONG add constraint FK_PHONG_THUOC_RAP foreign key (RAP_ID)
      references RAP (RAP_ID) on delete restrict on update restrict;

alter table SUATCHIEU add constraint FK_CHIEU_TAI_PHONG foreign key (RAP_ID, PHONG_STT)
      references PHONG (RAP_ID, PHONG_STT) on delete restrict on update restrict;

alter table SUATCHIEU add constraint FK_GIA_SUAT_CHIEU foreign key (LOAISUATCHIEU_ID)
      references LOAISUATCHIEU (LOAISUATCHIEU_ID) on delete restrict on update restrict;

alter table SUATCHIEU add constraint FK_RELATIONSHIP_4 foreign key (PHIM_ID)
      references PHIM (PHIM_ID) on delete restrict on update restrict;

alter table VE add constraint FK_DANH_SACH_VE foreign key (USERNAME, MUAVE_STT)
      references MUAVE (USERNAME, MUAVE_STT) on delete restrict on update restrict;

alter table VE add constraint FK_GHE_CUA_VE foreign key (GHE_HANG, GHE_STT)
      references GHE (GHE_HANG, GHE_STT) on delete restrict on update restrict;

alter table VE add constraint FK_VE_THUOC_SUAT_CHIEU foreign key (RAP_ID, PHONG_STT, SUATCHIEU_THOIDIEM)
      references SUATCHIEU (RAP_ID, PHONG_STT, SUATCHIEU_THOIDIEM) on delete restrict on update restrict;

