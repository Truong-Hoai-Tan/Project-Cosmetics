import React, { useEffect, useLayoutEffect } from "react";
import HomeAccount from "./accountAPI/home-delete";
import "./admin.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import storageService from "../service/storage.service";
import ProductStatistics from "./statis/statisAdmin";

const Admin = () => {
  let location = useLocation();

  // bắt sự kiện thay đổi router
  useLayoutEffect(() => {
    const role = storageService.get("role");
    if (role === undefined || role === null || role === "") {
      window.location = "/login";
    }
    if (role === "user") {
      if (location.pathname.includes("/Admin") || location.pathname.includes("/admin")) {
        window.location = "/";
      }
    }
  }, [location]);

  return (
    <>
      <div className="SumPj">
        <div className="Sum__left">
          <div className="left__top">
            <Link to="/">
              {" "}
              <img
                src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
                alt=""
              />
            </Link>
          </div>
          <div className="left__bottom">
            <div className="menu_left">
              <img
                src="https://cdn2.iconfinder.com/data/icons/speech-bubbles-filled/48/Dots_Bubble_Filled-512.png"
                alt=""
              />
              <h2>
                <Link className="LinkAdmin" to="/Admin/comments">
                  Bình Luận
                </Link>
              </h2>
            </div>

            <div className="menu_left">
              <img
                src="https://th.bing.com/th/id/R.f91b60a4cbe2fa5fb7c8711e33ceacee?rik=QcHmCIK%2bui2sbg&pid=ImgRaw&r=0"
                alt=""
              />
              <h2>
                <Link className="LinkAdmin" to="/Admin/job">
                  Nhiệm Vụ
                </Link>
              </h2>
            </div>
            <div className="menu_left">
              <img
                src="https://th.bing.com/th/id/R.b34075687db20d542cb7f1af23e9c04e?rik=%2f0jixRloKqk2FQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_319029.png&ehk=o%2bYFk7whOmq71tb%2fSNoDAh%2baWrjqq5Y%2bKwmrnLxfGXk%3d&risl=&pid=ImgRaw&r=0"
                alt=""
              />
              <h2>
                <Link className="LinkAdmin" to="/Admin/accounts">
                  Tài Khoản
                </Link>
              </h2>
            </div>
            <div className="menu_left">
              <img
                src="https://www.pngkey.com/png/full/335-3350331_home-project-hobbies-education-project-management-icon.png"
                alt=""
              />
              <h2>
                <Link className="LinkAdmin" to={"/Admin/categories"}>
                  Danh Mục
                </Link>
              </h2>
            </div>
            <div className="menu_left">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/business-professional-services/product-icon.png"
                alt=""
              />
              <h2>
                <Link className="LinkAdmin" to="/Admin/product">
                  Sản Phẩm
                </Link>
              </h2>
            </div>
            <div className="menu_left">
              <img
                src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-invoice-vector-icon-png-image_4171372.jpg"
                alt=""
              />
              <h2>
                <Link className="LinkAdmin" to="/admin/bills">
                  Hóa Đơn
                </Link>
              </h2>
            </div>
            <div className="menu_left">
            <img
                src="https://www.pngkey.com/png/full/335-3350331_home-project-hobbies-education-project-management-icon.png"
                alt=""
              />
              <h2>
                <Link className="LinkAdmin" to="/Admin/CategoryBig">
                  Danh Mục Lớn
                </Link>
              </h2>
            </div>
            <div className="menu_left">
              <img
                src="https://i.pinimg.com/736x/fc/4c/c2/fc4cc2e2fe39617eb660f5284521a207.jpg"
                alt=""
              />
              <h2>
                <Link className="LinkAdmin" to="/Admin/statisAdmin">
                  Thống Kê Trong Ngày
                </Link>
              </h2>
            </div>
          </div>
        </div>
        <div className="Sum__right">
          <div className="right__Top">
            <h1 className="admin">ADMIN</h1>
          </div>
          <div className="right__bottom">
            {" "}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
