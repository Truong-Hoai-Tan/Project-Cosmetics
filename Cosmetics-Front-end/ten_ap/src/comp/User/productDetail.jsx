import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import httpService from "../service/http.service";
import { Button } from "@mui/material/Button";
import storageService from "../service/storage.service";
import "./productDetail.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import ProductRating from "./5s/review";
import { FaUser } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [isReload, setisReload] = useState(false);
  const [listAccount, setListAccount] = useState([]);
  const navigate = useNavigate();
  const [cateBig, setCateBig] = useState([]);

  useEffect(() => {
    httpService.get("/api/categoryBig", {}).then((data) => {
      setCateBig(data.data);
    });
  }, []);

  useEffect(() => {
    httpService.get("/api/accounts").then((data) => {
      setListAccount(data.data);
      console.log(data.data);
    });
  }, []);
  const handleShowInfor = () => {
    navigate(`/information/${storageService.get("account_id")}`);
  };
  const getAccountName = (id) => {
    for (let i = 0; i < listAccount.length; i++) {
      if (listAccount[i]._id === id) {
        return listAccount[i].fullname;
      }
    }
    return id;
  };
  const handleAddToCart = (id) => {
    // console.log(item)
    // console.log({
    //     "id_product": item._id,
    //     "quantity": 1
    // })
    httpService
      .post("/api/carts", {
        body: {
          id_product: id,
          quantity: 1,
        },
      })
      .then((data) => {
        toast.success("Add Thành Công");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleToCart = (id) => {
    httpService
      .post("/api/carts", {
        body: {
          id_product: id,
          quantity: 1,
        },
      })
      .then((data) => {
        navigate("/cart");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleLogOut = () => {
    storageService.remove("role");
    storageService.remove("access_token");
    navigate("/login");
  };
  const { id } = useParams();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log({
    //     content: commentContent,
    //     account: storageService.get("account_id")
    // })
    httpService
      .post(`/api/comments/${id}`, {
        body: {
          content: commentContent,
          account: storageService.get("account_id"),
          start: "Hello",
        },
      })
      .then((data) => {
        setisReload(!isReload);
        setCommentContent("");
      });
  };
  useEffect(() => {
    httpService
      .get(`/api/products/detail/${id}`, { isIndex: true })
      .then((data) => {
        setProduct(data.data);
        console.log(data.data);
      });
  }, []);
  useEffect(() => {
    httpService.get("/api/comments").then((data) => {
      setComments(data.data.filter((item) => item.product === id));
      console.log(data.data.filter((item) => item.product === id));
    });
  }, [isReload]);
  return (
    <>
      <div className="Sum_index">
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
        <div className="imgdetail">
          <img
            className="imgdetail_img"
            src="https://img4.thuthuatphanmem.vn/uploads/2020/12/25/anh-bia-bo-my-pham-fob_094444611.jpg"
            alt=""
          />
        </div>
        <div
          style={{ background: "rgb(212, 212, 212)" }}
          className="Sumproducts"
        >
          <div className="text_product">
            <div className="sum_detail">
              <div className="detail_left">
                <img width={"350px"} className="" src={product?.img} alt="" />
                <h4>Hình Ảnh</h4>
              </div>
              <div className="detail_right">
                <div className="detail_right_item">
                  <h2>{product?.name}</h2>
                </div>
                <div className="detail_right_item">
                  <ProductRating />
                </div>
                <div className="detail_right_item">
                  <h4>{product?.price}.đ</h4>
                </div>

                <div className="detail_right_item">
                  <div className="descript">
                    <h5>
                      Nội Dung: <br /> <br />
                    </h5>
                    <div className="descript_content">
                      {product?.description}
                    </div>
                  </div>
                </div>
                <div className="detail_right_item detail_add">
                  <button
                    className="detail_add_card"
                    onClick={() => handleAddToCart(product._id)}
                  >
                    <BsCart4 />
                    Thêm Giỏ Hàng
                  </button>
                  <button
                    className="detail_add_buy"
                    onClick={() => handleToCart(product._id)}
                  >
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
            <div className="status_detail">{product?.status}</div>
            <div className="name_comment">
              <h1>Comment Khách Hàng</h1>
            </div>
            <div className="detail_footer">
              {comments &&
                comments.length > 0 &&
                comments.map((item) => (
                  <div className="show_comment" key={item._id}>
                    <div className="product_detail">
                      <h3>{getAccountName(item.account)}</h3>
                    </div>
                    <div className="product_detail">
                      <h4>{item.content}</h4>
                    </div>
                  </div>
                ))}

              <form onSubmit={handleOnSubmit}>
                <div className="create_comment">
                  <input
                    className="inp_comment"
                    onChange={(e) => setCommentContent(e.target.value)}
                    value={commentContent}
                    type="text"
                  />
                  <button className="enter_comment" type="submit">
                    Enter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
      </div>
    </>
  );
};
export default ProductDetail;
