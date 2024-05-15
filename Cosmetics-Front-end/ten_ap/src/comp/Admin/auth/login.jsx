import React, { useEffect, useLayoutEffect, useState} from "react";
import httpService from "../../service/http.service";
import storageService from "../../service/storage.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './auth.css'
import { Link, NavLink } from "react-router-dom";

const LoginCT = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navagite = useNavigate();
  let isShowMessage = false
  useEffect(()=>{
    if(storageService.get("role") === "admin" ||storageService.get("role") === "user"){
      if(!isShowMessage){
        toast.info("Bạn Đang Đăng Nhập")
        isShowMessage = true
      }
      navagite('/')
    }
    
  },[])

  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    httpService
      .post("/api/auth/login", {
        body: { username, password },
      })
      .then(data => {
        console.log(data)
        // Store data login
        storageService.set("access_token", data?.data?.jwt);
        storageService.set("role", data?.data?.role);
        storageService.set("account_id", data?.data?._id);

        // Sau khi login navigate ...
        if (data.data.role === "admin") {
          // navigate tới trang admin
          navagite("/Admin");
          toast.success("Đăng Nhập Thành Công")
        } else {
          // navigate tới trang user
          navagite("/");
          toast.success("Đăng Nhập Thành Công")
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      }
      );
  };

  return (
    <>
    <div className="SumAuth">
      <form
        onSubmit={handleOnSubmit}
        className="login__form"
        // style={{ margin: "auto", textAlign: "center" }}
      > 
      <img className="authImg" src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png" alt="" />
        <h3>ĐĂNG NHẬP</h3>
        <div className="form__item">
          <label>TÊN TÀI KHOẢN :</label> <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            
          />
        </div>

        <div className="form__item">
          <label>MẬT KHẨU :</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            
          />
        </div>

        <div className="form__item">
          <button
          className="authbutton"
            type="submit"
           
          >
            XÁC NHẬN
          </button>
        </div>
        <div className="linkRegis">
        Bạn chưa có tài khoản?<Link className="phu123" to={"/Register"}> Đăng Ký</Link>
        </div>
      </form>
      </div>
    </>
  );
};

export default LoginCT;
