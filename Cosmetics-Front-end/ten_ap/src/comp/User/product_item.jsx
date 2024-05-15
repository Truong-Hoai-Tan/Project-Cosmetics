import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import UserProducts from "./product";
import HomeProduct from "../Admin/productAPI/get-product";
import "./index.css";
import "./product_item.css";
import "../../img/z4815540120478_0c12c358ffeb3fd46e8d9cd93b71ba7c.jpg";
import storageService from "../service/storage.service";
import { useNavigate } from "react-router";
import Sweetpagination from "sweetpagination";
import { Link } from "react-router-dom";
import ZoomSlideshow from "./slider/ZoomEffectSlider";
import iteamProducts from "./product-productIteam";
import UseProducts from "./product-productIteam";
import { toast } from "react-toastify";
import UserProductSale from "./productsale";
import { FaUser } from "react-icons/fa";
///fillter product

const ProductIteam = () => {
  const [category, setCategory] = useState([]);
  const [productfilter, setProductfilter] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [productAll, setProductALl] = useState([]);
  const [textSeach, setTextSeach] = useState("");
  const [isReload, setIsReload] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [cateBig, setCateBig] = useState([]);

  useEffect(() => {
    httpService.get("/api/categoryBig", {}).then((data) => {
      setCateBig(data.data);
    });
  }, []);
  const handleShowInfor = () => {
    navigate(`/information/${storageService.get("account_id")}`);
  };

  const handleClickProduct = (id_product) => {
    navigate(`/products/${id_product}`);
  };

  const handleAddToCart = (item) => {
    // console.log(item)
    // console.log({
    //     "id_product": item._id,
    //     "quantity": 1
    // })
    httpService
      .post("/api/carts", {
        body: {
          id_product: item._id,
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

  const EnterSerch = (event) => {
    console.log(event);
    if (event.keyCode === 13) {
      setIsSearch(!isSearch);
      console.log("adasd");
    }
  };
  useEffect(() => {
    let newArray = [];
    for (let item of productAll) {
      if (item.name.toLowerCase().includes(textSeach.toLowerCase())) {
        newArray.push(item);
      }
    }
    setProductfilter(newArray);
  }, [isSearch]);

  useEffect(() => {
    httpService.get("/api/categories/").then((data) => {
      setCategory(data.data);
      console.log(data.data);
    });
  }, []);

  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const handleLogOut = () => {
    storageService.remove("role");
    storageService.remove("access_token");
    navigate("/login");
  };
  const handleToCart = (item) => {
    // console.log(item)
    // console.log({
    //     "id_product": item._id,
    //     "quantity": 1
    // })
    httpService
      .post("/api/carts", {
        body: {
          id_product: item._id,
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
  useEffect(() => {
    httpService.get("/api/products/", {}).then((data) => {
      setProduct(data.data);
      setProductALl(data.data);
    });
  }, []);

  useEffect(() => {
    if (currentCategory === null) {
      setProductfilter(product);
      return;
    }
    setProductfilter(
      product.filter((item) => item.category === currentCategory._id)
    );
  }, [currentCategory, product]);

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
            <input
              className="sreach_product"
              type="text"
              placeholder="Tìm kiếm sản phẩm...."
              onKeyDown={(e) => {
                setTextSeach(e.target.value);
                EnterSerch(e);
              }}
            />
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
        <div className="product_hot">
          <div className="product_hot_item">{<UserProductSale />}</div>
        </div>
        <div className="detail_index">
          <div className="left_product">
            <div className="left_product_item">
            <h3>Danh Mục Sản Phẩm</h3>

            </div>
            <div className="left_product_item">
            <ul>
              {category.map((item, index) => {
                return (
                  <li onClick={() => setCurrentCategory(item)} key={index}>
                    {item.name}
                  </li>
                );
              })}
            </ul>
            </div>
            <div className="left_product_item">
              <div className="slider_name">
                <ZoomSlideshow />
              </div>
            </div>
            
            
          </div>
          <div className="right_product">
            {currentPageData && currentPageData.length > 0 && (
              <div className="right_product_item">
                {currentPageData.map((item) => (
                  <div className="item" key={item._id}>
                    <h4>
                      {" "}
                      <img
                        onClick={() => handleClickProduct(item._id)}
                        className="img_product"
                        src={item.img}
                        alt=""
                      />
                    </h4>
                    <h3>{item.name}</h3>
                    <h2>{item.price}.đ</h2>
                    <div className="addd_cart">
                      <button
                        className="add_cart1"
                        onClick={() => handleAddToCart(item)}
                      >
                        Thêm Giỏ Hàng
                      </button>
                      <button
                        className="add_cart0"
                        onClick={() => handleToCart(item)}
                      >
                        Mua Ngay{" "}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div>
              <br />
              <Sweetpagination
                currentPageData={setCurrentPageData}
                getData={productfilter}
                dataPerPage={8}
                navigation={true}
                getStyle={"style-1"}
              />
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
      </div>
    </>
  );
};
export default ProductIteam;
