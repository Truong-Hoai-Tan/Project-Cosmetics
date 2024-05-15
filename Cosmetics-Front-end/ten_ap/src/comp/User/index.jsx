import React, { useEffect, useRef, useState } from "react";
import httpService from "../service/http.service";
import UserProducts from "./product";
import HomeProduct from "../Admin/productAPI/get-product";
import "./index.css";
import "../../img/z4815540120478_0c12c358ffeb3fd46e8d9cd93b71ba7c.jpg";
import storageService from "../service/storage.service";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Slideshow from "./slider/SideEffectSlider";
import FadeSlideshow from "./slider/FadeEffectSlider";
import UserProductsNew from "./productnews";
import UserProductSale from "./productsale";
import Timer from "../Admin/statis/time";
import { FaUser } from "react-icons/fa";

const User = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [account, setAccount] = useState([]);
  const [cateBig, setCateBig] = useState([]);
  const [isFixed, setIsFixed] = useState(false);
  const wrapperNavRef = useRef(null);
  useEffect(() => {
    httpService.get("/api/categoryBig", { isIndex: true }).then((data) => {
      setCateBig(data?.data);
    });
  }, []);

  useEffect(() => {
    httpService.get("/api/accounts", { isIndex: true }).then((data) => {
      setAccount(data?.data);
    });
  }, []);
  const handleShowInfor = () => {
    navigate(`/information/${storageService.get("account_id")}`);
  };
  

  useEffect(() => {
    httpService.get("/api/products/", { isIndex: true }).then((data) => {
      setProduct(data?.data);
    });
  }, []);
  //cuon trang
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (wrapperNavRef.current) {
  //       const top =
  //         wrapperNavRef.current.offsetTop -
  //         parseFloat(window.getComputedStyle(wrapperNavRef.current).marginTop);

  //       if (window.pageYOffset > top) {
  //         setIsFixed(true);
  //       } else {
  //         setIsFixed(false);
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [isFixed]);
  return (
    <>
      <header className="App-header">
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
                <FaUser />
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
      </header>
      <div className="menu_detail">
        <FadeSlideshow />
      </div>
      <h2 className="tieude">
        {" "}
        <img
          className="tieude_img"
          src="https://banner2.cleanpng.com/20180612/tlb/kisspng-arrow-computer-icons-forward-5b202017b03ae9.7539254715288320237219.jpg"
          alt=""
        />{" "}
        SẢN PHẨM NỔI BẬT
      </h2>
      <div className="nav_index">{<UserProducts />}</div>
      <h2 className="tieude">
        <img
          className="tieude_img"
          src="https://banner2.cleanpng.com/20180612/tlb/kisspng-arrow-computer-icons-forward-5b202017b03ae9.7539254715288320237219.jpg"
          alt=""
        />
        SẢN PHẨM MỚI NHẤT
      </h2>
      <div className="nav_index">{<UserProductsNew />}</div>
      <h2 className="tieude">
        {" "}
        <img
          className="tieude_img"
          src="https://banner2.cleanpng.com/20180612/tlb/kisspng-arrow-computer-icons-forward-5b202017b03ae9.7539254715288320237219.jpg"
          alt=""
        />{" "}
        SẢN PHẨM SALE
      </h2>
      <div className="nav_index">{<UserProductSale />}</div>
      <br></br>
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
      <h2 className="tieude">
        {" "}
        <img
          className="tieude_img"
          src="https://banner2.cleanpng.com/20180612/tlb/kisspng-arrow-computer-icons-forward-5b202017b03ae9.7539254715288320237219.jpg"
          alt=""
        />{" "}
        ĐỐI TÁC
      </h2>
      <div className="doitac">
        <div className="menu_doitac">
          <img
            width={"150px"}
            src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-abstract-modern-floral-cosmetics-logo-template-vector-logo-for-business-and-png-image_5375383.jpg"
            alt=""
          />
        </div>
        <div className="menu_doitac">
          <img
            width={"150px"}
            src="https://png.pngtree.com/png-clipart/20231001/original/pngtree-luxury-perfume-cosmetic-logo-for-business-and-shops-vector-png-image_12930249.png"
            alt=""
          />
        </div>
        <div className="menu_doitac">
          <img
            width={"150px"}
            src="https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-abstract-flowers-garden-logo-png-image_1753053.jpg"
            alt=""
          />
        </div>
        <div className="menu_doitac">
          <img
            width={"150px"}
            src="https://thegioibienquangcao.com/wp-content/uploads/2018/10/logo-my-pham-9.jpg"
            alt=""
          />
        </div>
        <div className="menu_doitac">
          <img
            width={"150px"}
            src="https://inbienquangcao.vn/wp-content/uploads/2021/11/thiet-ke-logo-my-pham-12_1584438209.jpg"
            alt=""
          />
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
export default User;
