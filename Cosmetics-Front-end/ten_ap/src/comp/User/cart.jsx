import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
import "./cart.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import storageService from "../service/storage.service";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Sweetpagination from "sweetpagination";
import { FaUser } from "react-icons/fa";


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

const CartUse = () => {
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isReload, setisReload] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [cateBig, setCateBig] = useState([]);
  const [payment, setPayment] = useState("cod");
  const [currentPageData, setCurrentPageData] = useState([]);

  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    httpService.get("/api/accounts/profile", {}).then((data) => {
      setProfile(data.data);
    });
    setOpen(true);
  };
  const handleShowInfor = () => {
    navigate(`/information/${storageService.get("account_id")}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    httpService
      .post("/api/oders", {
        body: {
          customer_name: profile.fullname,
          phone: profile.phone,
          address: profile.address,
          payment: 0,
          is_payment: "Browsing",
          accounts: storageService.get("account_id"),
          cart: cartId,
          payment: payment,
          totalPrice: totalPrice,
        },
      })
      .then((data) => {
        if (payment === "zalopay") {
          window.location.href = data.data;
          return;
        }

        setProfile({ customer_name: "", phone: "", address: "" });
        handleClose();
        setisReload(!isReload);
        toast.success("Đặt hàng Thành Công");
        navigate("/");
      });
  };

  const handleDeleteProducts = (id) => {
    console.log(id);
    httpService
      .delete(`/api/carts/${id}`)
      .then((data) => {
        toast.success("Thành Công");
        setisReload(!isReload);
      })
      .catch((error) => {
        toast.error("Không Thành Công");
      });
  };
  // useEffect(()=>{
  //     httpService.get("/api/carts").then(data =>{
  //         console.log(data)
  //     })
  // },[])
  useEffect(() => {
    httpService.get("/api/carts", {}).then((data) => {
      if (data || data?.data) {
        setProducts(data?.data?.items);
        const listProduct = data?.data?.items;
        let prices = 0;
        setCartId(data?.data?._id);
        let total = 0;
        for (let i = 0; i < listProduct?.length; i++) {
          total += listProduct[i]?.quantity;
          prices += +listProduct[i]?.product?.price;
        }
        setTotalPrice(prices);
        setTotalProducts(total);
      }
    });
  }, [isReload]);
  useEffect(() => {
    httpService.get("/api/categoryBig", {}).then((data) => {
      setCateBig(data.data);
    });
  }, []);

  const handleChangeOption = ({ target: { value } }) => {
    setPayment(value);
  };

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
        <div className="cartdetail">
          <div className="ClearCart">
            <img src="https://bizweb.dktcdn.net/100/360/190/themes/729071/assets/empty-cart.png?1700797574469"></img>
          </div>

          <div className="sum_cart">
            {products && products.length > 0 && (
              <div className="item_cart">
                <div className="Sum">
                  <h1>GIỎ HÀNG</h1>
                </div>
                <div className="Name_Cart">
                  <div className="name_cart_item">
                    <h4>Tên Sản Phẩm</h4>
                  </div>
                  <div className="name_cart_item">
                    <h4>Hình Ảnh</h4>
                  </div>
                  <div className="name_cart_item">
                    <h4>Giá Tiền</h4>
                  </div>
                  <div className="name_cart_item">
                    <h4>Số Lượng</h4>
                  </div>
                  <div className="name_cart_item"></div>
                </div>
                {currentPageData.map((item) => (
                  <div className="product_cart" key={item._id}>
                    <div className="product_cart_item">
                      <h4>{item?.product?.name}</h4>
                    </div>
                    <div className="product_cart_item">
                      <img
                        className="img_cart"
                        src={item?.product?.img}
                        alt=""
                      />
                    </div>
                    <div className="product_cart_item">
                      <h4>{item?.product?.price}.đ</h4>
                    </div>
                    <div className="product_cart_item">
                      <h4>{item?.quantity}</h4>
                    </div>
                    <div className="product_cart_item">
                      <button
                        className="delete_cart"
                        onClick={() => handleDeleteProducts(item?.product?._id)}
                      >
                        Xóa Khỏi Giỏ Hàng
                      </button>
                    </div>
                  </div>
                ))}
                <Sweetpagination
                  currentPageData={setCurrentPageData}
                  getData={products}
                  dataPerPage={3}
                  navigation={true}
                  getStyle={"style-1"}
                />
                <h4 className="Sum_product_item">
                  Bạn Đang Có : {totalProducts} SP Trong Giỏ Hàng
                </h4>

                <button className="OnclickOder" onClick={() => handleOpen()}>
                  Thanh Toán
                </button>
              </div>
            )}
          </div>
          <div>
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
                  width: "800px",
                  height: "450px",
                  border: "0px",
                  borderRadius: "5px",
                }}
                in={open}
              >
                <Box sx={style}>
                  <button
                    style={{ margin: "0px" }}
                    onClick={() => setOpen(false)}
                  >
                    x
                  </button>
                  <div className="slog">
                    <h1 className="dis">Oder</h1>
                  </div>{" "}
                  <br />
                  <div className="Sum_cartOder">
                    <form className="formOder" onSubmit={handleSubmit}>
                      <label className="lableOder">CUSTOMER_NAME:</label> <br />
                      <input
                        className="inpOder"
                        type="text"
                        value={profile?.fullname}
                        onChange={(e) =>
                          setProfile({ ...profile, fullname: e.target.value })
                        }
                      />
                      <br />
                      <label className="lableOder">PHONE:</label>
                      <br />
                      <input
                        className="inpOder"
                        type="text"
                        value={profile?.phone}
                        onChange={(e) =>
                          setProfile({ ...profile, phone: e.target.value })
                        }
                      />
                      <br />
                      <label className="lableOder">ADDRESS:</label>
                      <br />
                      <input
                        className="inpOder"
                        type="text"
                        value={profile?.address}
                        onChange={(e) =>
                          setProfile({ ...profile, address: e.target.value })
                        }
                      />
                      <br />
                      <select
                        className="payment"
                        name="payment"
                        id=""
                        onChange={handleChangeOption}
                        value={payment}
                      >
                        <option value="cod">Tiền Mặt</option>
                        <option value="zalopay">ZaloPay</option>
                      </select>
                      <br />
                      <button className="payment1" type="submit">
                        Xác Nhận
                      </button>
                    </form>
                    <div className="sum_oder">
                      <div className="cart_name">
                        <h4>Name</h4>
                        <h3>Price</h3>
                        <h3>Quantity</h3>
                      </div>
                      {products && products.length > 0 && (
                        <div item_oders>
                          {products.map((item) => (
                            <div className="cart_oder" key={item._id}>
                              <h4>{item?.product?.name}</h4>
                              <h3>{item?.product?.price}.đ</h3>
                              <h3>{item?.quantity}</h3>
                            </div>
                          ))}
                        </div>
                      )}

                      <h1>Tổng : {totalPrice} đ</h1>
                    </div>
                  </div>
                </Box>
              </Fade>
            </Modal>
          </div>
        </div>

        <br></br>
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
export default CartUse;
