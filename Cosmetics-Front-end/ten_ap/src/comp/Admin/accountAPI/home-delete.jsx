import React, { useEffect, useState } from "react";
import axios from "axios";
import "./account.css";
import { Link, NavLink } from "react-router-dom";
import httpService from "../../service/http.service";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Sweetpagination from "sweetpagination";

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

const HomeAccount = () => {
  const navagite = useNavigate();
  const [data, setData] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const [itemEdit, setItemEdit] = useState(null);
  const [currentPageData, setCurrentPageData] = useState([]); //1
  // edit
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    setItemEdit(item);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    httpService
      .patch(`/api/accounts/${itemEdit._id}`, { body: itemEdit })
      .then((data) => {
        setOpen(false);
        setItemEdit(null);
        setIsReload(!isReload);
      });
  };

  const getListData = async () => {
    const response = await httpService.get("/api/accounts", {});
    setData(response.data);
  };

  const deleteData = async (id) => {
    const response = await httpService.delete(`/api/accounts/${id}`);
  };

  const handledeleteData = (id) => {
    deleteData(id);
    setIsReload(!isReload);
  };

  useEffect(() => {
    getListData();
  }, [isReload]);

  console.log(data);

  return (
    <>
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
              <h1 className="dis">TÀI KHOẢN</h1>
            </div>{" "}
            <br />
            <form className="formedit" onSubmit={handleSubmit}>
              <label className="Boxname">TÀI KHOẢN:</label> <br />
              <input
                className="inpedit"
                type="text"
                value={itemEdit?.username}
                onChange={(e) =>
                  setItemEdit({ ...itemEdit, username: e.target.value })
                }
              />
              <br />
              <label className="Boxname">HỌ VÀ TÊN:</label>
              <br />
              <input
                className="inpedit"
                type="text"
                value={itemEdit?.fullname}
                onChange={(e) =>
                  setItemEdit({ ...itemEdit, fullname: e.target.value })
                }
              />
              <br />
              <label className="Boxname">NGÀY SINH:</label>
              <br />
              <input
                className="inpedit"
                type="text"
                value={itemEdit?.dob}
                onChange={(e) =>
                  setItemEdit({ ...itemEdit, dob: e.target.value })
                }
              />
              <br />
              <label className="Boxname">role:</label>
              <br />
              <input
                className="inpedit"
                type="text"
                value={itemEdit?.role}
                onChange={(e) =>
                  setItemEdit({ ...itemEdit, role: e.target.value })
                }
              />
              <br />
              <label className="Boxname">SỐ ĐIỆN THOẠI:</label>
              <br />
              <input
                className="inpedit"
                type="text"
                value={itemEdit?.phone}
                onChange={(e) =>
                  setItemEdit({ ...itemEdit, phone: e.target.value })
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
      <div className="sumtable">
        <div className="menucreat">
          <h4>TÀI KHOẢN</h4>
          <h4>TÊN ĐẦY ĐỦ</h4>
          <h4>NGÀY SINH</h4>
          <h4>SỐ ĐIỆN THOẠI</h4>
          <h4>CÀI ĐẶT</h4>
        </div>
        {currentPageData && currentPageData.length > 0 && (
          <div className="accounts">
            {currentPageData.map((item) => (
              <div className="tablemenu">
                <div className="account_item">
                  <h4>{item.username}</h4>
                </div>
                <div className="account_item">
                  <h4>{item.fullname}</h4>
                </div>
                <div className="account_item">
                  <h4>{item.dob}</h4>
                </div>
                <div className="account_item">
                  <h4>{item.phone}</h4>
                </div>
                <div className="account_item">
                  <button
                    className="delaccount"
                    onClick={() => {
                      handledeleteData(item._id);
                    }}
                  >
                    XÓA
                  </button>
                  <button
                    className="editaccount"
                    onClick={() => {
                      setItemEdit(item);
                      setOpen(true);
                    }}
                  >
                    SỬA
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="link2">
          <Link className="Creataccounts" to="/Admin/CreatAccounts">
            Thêm Tài Khoản
          </Link>
        </div>
        <div>
          <Sweetpagination
            currentPageData={setCurrentPageData}
            getData={data}
            dataPerPage={5}
            navigation={true}
            getStyle={"style-1"}
          />
        </div>
      </div>
    </>
  );
};
export default HomeAccount;
