import React, { useEffect, useLayoutEffect, useState } from "react";
import httpService from "../../service/http.service";
import storageService from "../../service/storage.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";
import { Link, NavLink } from "react-router-dom";

const LoginCT = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navagite = useNavigate();
  let isShowMessage = false;
  useEffect(() => {
    if (
      storageService.get("role") === "admin" ||
      storageService.get("role") === "user"
    ) {
      if (!isShowMessage) {
        toast.info("Bạn Đang Đăng Nhập");
        isShowMessage = true;
      }
      navagite("/");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    httpService
      .post("/api/auth/login", {
        body: { username, password },
      })
      .then((data) => {
        console.log(data);
        // Store data login
        storageService.set("access_token", data?.data?.jwt);
        storageService.set("role", data?.data?.role);
        storageService.set("account_id", data?.data?._id);

        // Sau khi login navigate ...
        if (data.data.role === "admin") {
          // navigate tới trang admin
          navagite("/Admin");
          toast.success("Đăng Nhập Thành Công");
        } else {
          // navigate tới trang user
          navagite("/");
          toast.success("Đăng Nhập Thành Công");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  return (
    <>
      <div className="SumAuth">
        <form
          onSubmit={handleOnSubmit}
          className="login__form"
          // style={{ margin: "auto", textAlign: "center" }}
        >
          <div className="login_form_item">
            <img
              className="authImg"
              src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
              alt=""
            />
          </div>
          <div className="login_form_item">
            <h1>ĐĂNG NHẬP</h1>
          </div>
          <div className="login_form_item">
            <label>TÊN TÀI KHOẢN :</label>
          </div>
          <div className="login_form_item">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="login_form_item">
            <label>MẬT KHẨU :</label>
          </div>
          <div className="login_form_item">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
            />
          </div>
          <div className="login_form_item">
            <button className="authsbutton" type="submit">
              XÁC NHẬN
            </button>
          </div>
          <div className="login_form_item">
            <div className="linkLogin">
              Bạn chưa có tài khoản?
              <Link className="tan123" to={"/Register"}>
                {" "}
                Đăng Ký
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginCT;
