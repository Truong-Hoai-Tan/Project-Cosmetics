import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import httpService from "../service/http.service";
import { useParams } from "react-router";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import "./information.css";
import storageService from "../service/storage.service";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Information = () => {
  const [account, setAccount] = useState({});
  const [isReload, setIsReload] = useState(false);
  const [cateBig, setCateBig] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  useEffect(() => {
    httpService.get(`/api/accounts/information/${id}`, {}).then((data) => {
      setAccount(data.data);
      console.log(data.data);
    });
  }, []);

  useEffect(() => {
    httpService.get("/api/categoryBig", {}).then((data) => {
      setCateBig(data.data);
    });
  }, []);
  const handleShowInfor = () => {
    navigate(`/information/${storageService.get("account_id")}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    httpService.patch(`/api/accounts/${id}`, { body: account }).then((data) => {
      setOpen(false);
      setIsReload(!isReload);
    });
  };
  const handleLogOut = () => {
    storageService.remove("role");
    storageService.remove("access_token");
    navigate("/login");
  };
  // useEffect((id)=>{
  //     httpService.get(`/api/accounts/information/${id}`).then(data =>{
  //         console.log(data.data)
  //     })
  // },[])
  return (
    <>
      <div className="header_index">
        <div className="menu_header">
          <div className="menu_header_item">
            <a>Message</a>
          </div>
          <div className="menu_header_item">
            <a>Email</a>
          </div>
          <div className="menu_header_item">
            <a>Phone</a>
          </div>
        </div>
        <div className="menu_header2">
          <div className="item_productt">
            <Link className="auth" to="/login">
              Đăng Nhập
            </Link>
          </div>
          <div className="item_productt">
            <Link className="auth" to="/register">
              Đăng Ký
            </Link>
          </div>
          <div className="item_productt">
            {storageService.get("role") && (
              <button className="item_auth" onClick={handleShowInfor}>
                Thông Tin
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="menu_index">
        <div className="menu_item">
          <Link to="/">
            <img
              className="logo_index"
              width={"190px"}
              src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
              alt=""
            />
          </Link>
        </div>
        <div className="menu_item list_menu">
          <div>
            {cateBig && cateBig.length > 0 && (
              <div className="cateBig">
                {cateBig.map((item) => (
                  <ul>
                    <li>
                      <Link className="item_cate" to={item.link}>
                        {item.name}
                      </Link>
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="menu_item">
          <Link className="cart" to="/cart">
            <img
              width={"50px"}
              height={"50px"}
              src="https://cdn.pixabay.com/photo/2017/03/29/04/09/shopping-icon-2184065_1280.png"
              alt=""
            />
          </Link>
        </div>
      </div>
      <div className="Sum_hoso">
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade
            style={{
              width: "420px",
              height: "500px",
              border: "0px",
              borderRadius: "5px",
            }}
            in={open}
          >
            <Box sx={style}>
              <button style={{ margin: "0px" }} onClick={() => setOpen(false)}>
                x
              </button>
              <div className="slog">
                <h1 className="dis">EDIT ACCOUNT</h1>
              </div>{" "}
              <br />
              <form className="formedit" onSubmit={handleSubmit}>
                <label className="Boxname">Fullname:</label>
                <br />
                <input
                  className="inpedit"
                  type="text"
                  value={account?.fullname}
                  onChange={(e) =>
                    setAccount({ ...account, fullname: e.target.value })
                  }
                />
                <br />
                <label className="Boxname">Dob:</label>
                <br />
                <input
                  className="inpedit"
                  type="text"
                  value={account?.dob}
                  onChange={(e) =>
                    setAccount({ ...account, dob: e.target.value })
                  }
                />
                <br />
                <label className="Boxname">Phone:</label>
                <br />
                <input
                  className="inpedit"
                  type="text"
                  value={account?.phone}
                  onChange={(e) =>
                    setAccount({ ...account, phone: e.target.value })
                  }
                />
                <br />
                <label className="Boxname">Avatar</label>
                <br />
                <input
                  className="inpedit"
                  type="text"
                  value={account?.avatar}
                  onChange={(e) =>
                    setAccount({ ...account, avatar: e.target.value })
                  }
                />
                <br />
                <button className="submitedit" type="submit">
                  Edit
                </button>
              </form>
            </Box>
          </Fade>
        </Modal>
        <div className="Sum_Statis">
          <div className="Ho_So">
            <h1>Hồ Sơ Thông Tin</h1>
          </div>
          <hr />
          <div className="sum">
            <div className="tieude2">Tài khoản:</div>{" "}
            <div className="ingame">{account?.username}</div>
          </div>
          <div className="sum">
            <div className="tieude2">Họ và tên:</div>{" "}
            <div className="ingame">{account?.fullname}</div>
          </div>
          <div className="sum">
            <div className="tieude2">Ngày Sinh:</div>{" "}
            <div className="ingame">{account?.dob}</div>
          </div>
          <div className="sum">
            <div className="tieude2">Số điện thoại:</div>{" "}
            <div className="ingame">{account?.phone}</div>
          </div>
        </div>
        <div className="statis_right">
          <div className="avatar_logout">
              <span>
                <h2>Avatar</h2>
                <img className="avatar_ac" src={account?.avatar} alt="" />
              </span>
            <div className="menu_avt">
              <button
                className="OnlickEdit"
                onClick={() => {
                  setOpen(true);
                }}
              >
                CHỈNH SỬA
              </button>
              {storageService.get("role") && (
                <button className="OnlickEdit" onClick={handleLogOut}>
                  ĐĂNG XUẤT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="tintuc">
        <div className="tintuc_top">
          <h1>Tin Tức</h1>
        </div>
        <div className="tintuc_bottom">
          <div className="item_tintuc">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/8bMZUNEiGLI?si=gUsV8uNdrtuLVUvq"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="item_tintuc">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/XY-TVcmCGYw?si=ZmG1eewfWneYuYeJ"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="item_tintuc">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/afcAr_alvpA?si=OVtHyG5-lw5bgzAY"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <br></br>
      <div className="hover_logo">
        <ul>
          <li>
            <Link to="https://www.facebook.com/truonghoai.tan.75/">
              {" "}
              <img
                width={"35px"}
                src="https://i.pinimg.com/474x/16/b8/22/16b82240a640db6fb6c18297fc1dcfd3.jpg"
                alt=""
              />
            </Link>
          </li>
          <li>
            <Link to="https://www.facebook.com/truonghoai.tan.75/">
              {" "}
              <img
                width={"35px"}
                src="https://thumbs.dreamstime.com/z/youtube-logo-icon-voronezh-russia-november-square-black-color-164586300.jpg?w=768"
                alt=""
              />
            </Link>
          </li>
          <li>
            <Link to="https://www.facebook.com/truonghoai.tan.75/">
              {" "}
              <img
                width={"35px"}
                src="https://thumbs.dreamstime.com/z/twitter-logo-bird-isolated-over-white-background-social-media-networking-communications-symbol-breaking-news-130861855.jpg?w=768"
                alt=""
              />
            </Link>
          </li>
          <li>
            <Link to="https://www.facebook.com/truonghoai.tan.75/">
              {" "}
              <img
                width={"35px"}
                src="https://brasol.vn/wp-content/uploads/2022/09/logo-instagram-vector.jpg"
                alt=""
              />
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer_index">
        <div className="logo">
          <img
            width={"280px"}
            src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
            alt=""
          />
          <div className="logo_text">
            <h4>
              Địa Chỉ : <span>Nguyên Văn Cừ, An Khánh, TP.Cần Thơ</span>
            </h4>
            <h4>
              Số Điện Thoại: <span>0944968275</span>
            </h4>
            <h4>
              Email : <span>truonghoaitanag@gmail.com</span>
            </h4>
            <h4>Mở cửa từ 8:00 AM đến 9:00 PM tất cả các ngày trong tuần</h4>
          </div>
        </div>
        <div className="menu_footer">
          <div className="menu_footer_item">
            <h3>MENU</h3>
          </div>
          <div className="menu_footer_item">
            <Link to="/" className="menu_li">
              Trang chủ
            </Link>
          </div>
          <div className="menu_footer_item">
            <Link to="/Product" className="menu_li">
              Sản Phẩm
            </Link>
          </div>
          <div className="menu_footer_item">
            <Link to="/statistical" className="menu_li">
              Giới Thiệu
            </Link>
          </div>
          <div className="menu_footer_item">
            <Link to="/cart" className="menu_li">
              Giỏ Hàng
            </Link>
          </div>
        </div>
        <div className="menu_footer">
          <div className="menu_footer_item">
            <h3>TIN TỨC</h3>
          </div>
          <div className="menu_footer_item">
            <Link className="menu_li">Sale 30%</Link>
          </div>
          <div className="menu_footer_item">
            <Link className="menu_li">Sản Phẩm Mới</Link>
          </div>
          <div className="menu_footer_item">
            <Link className="menu_li">Sản Phẩm Hot</Link>
          </div>
          <div className="menu_footer_item">
            <Link className="menu_li">Sản Phẩm Lỗi</Link>
          </div>
        </div>
        <div className="menu_footer">
          <div className="menu_footer_item">
            <h3>DỊCH VỤ</h3>
          </div>
          <div className="menu_footer_item">
            <Link className="menu_li">ZaloPay</Link>
          </div>
          <div className="menu_footer_item">
            <Link className="menu_li">Hoàn Trả</Link>
          </div>
          <div className="menu_footer_item">
            <Link className="menu_li">Chăm Sóc KH</Link>
          </div>
          <div className="menu_footer_item">
            <Link className="menu_li">Trao Đổi TT</Link>
          </div>
        </div>
      </div>
      <div className="footer_coppyright">
        <p>Copyright © Trương Hoài Tấn</p>
      </div>
    </>
  );
};
export default Information;
