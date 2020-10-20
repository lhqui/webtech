/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     10/17/2020 12:05:25 PM                       */
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
   MUAVE_ID             int not null,
   BINHLUAN_NOIDUNG     varchar(200) not null,
   BINHLUAN_DIEM        int not null,
   primary key (MUAVE_ID)
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
   LOAI_ID              int not null,
   RAP_ID               int,
   PHONG_STT            int,
   SUATCHIEU_THOIDIEM   datetime,
   LOAI_KHUNGGIO_START  int not null,
   LOAI_KHUNGGIO_END    int not null,
   LOAI_KHUNGNGAY       int,
   LOAI_GIA             int not null,
   primary key (LOAI_ID)
);

/*==============================================================*/
/* Table: MUAVE                                                 */
/*==============================================================*/
create table MUAVE
(
   MUAVE_ID             int not null,
   USERNAME             varchar(50) not null,
   KHUYENMAI_ID         int,
   MUAVE_SOLUONG        int not null,
   MUAVE_THOIDIEM       datetime not null,
   MUAVE_TONGTIEN       int not null,
   primary key (MUAVE_ID)
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
   MUAVE_ID             int not null,
   primary key (RAP_ID, PHONG_STT, SUATCHIEU_THOIDIEM, GHE_HANG, GHE_STT, MUAVE_ID)
);

alter table BINHLUAN add constraint FK_RELATIONSHIP_13 foreign key (MUAVE_ID)
      references MUAVE (MUAVE_ID) on delete restrict on update restrict;

alter table KHUYENMAI add constraint FK_RELATIONSHIP_14 foreign key (USERNAME)
      references USER (USERNAME) on delete restrict on update restrict;

alter table LOAISUATCHIEU add constraint FK_RELATIONSHIP_8 foreign key (RAP_ID, PHONG_STT, SUATCHIEU_THOIDIEM)
      references SUATCHIEU (RAP_ID, PHONG_STT, SUATCHIEU_THOIDIEM) on delete restrict on update restrict;

alter table MUAVE add constraint FK_RELATIONSHIP_11 foreign key (USERNAME)
      references USER (USERNAME) on delete restrict on update restrict;

alter table MUAVE add constraint FK_RELATIONSHIP_9 foreign key (KHUYENMAI_ID)
      references KHUYENMAI (KHUYENMAI_ID) on delete restrict on update restrict;

alter table PHONG add constraint FK_RELATIONSHIP_1 foreign key (RAP_ID)
      references RAP (RAP_ID) on delete restrict on update restrict;

alter table SUATCHIEU add constraint FK_RELATIONSHIP_4 foreign key (PHIM_ID)
      references PHIM (PHIM_ID) on delete restrict on update restrict;

alter table SUATCHIEU add constraint FK_RELATIONSHIP_5 foreign key (RAP_ID, PHONG_STT)
      references PHONG (RAP_ID, PHONG_STT) on delete restrict on update restrict;

alter table VE add constraint FK_RELATIONSHIP_10 foreign key (GHE_HANG, GHE_STT)
      references GHE (GHE_HANG, GHE_STT) on delete restrict on update restrict;

alter table VE add constraint FK_RELATIONSHIP_12 foreign key (MUAVE_ID)
      references MUAVE (MUAVE_ID) on delete restrict on update restrict;

alter table VE add constraint FK_RELATIONSHIP_6 foreign key (RAP_ID, PHONG_STT, SUATCHIEU_THOIDIEM)
      references SUATCHIEU (RAP_ID, PHONG_STT, SUATCHIEU_THOIDIEM) on delete restrict on update restrict;

