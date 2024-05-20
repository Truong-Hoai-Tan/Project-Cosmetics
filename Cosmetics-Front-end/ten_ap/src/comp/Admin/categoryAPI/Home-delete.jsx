import React, { useEffect, useState } from "react";
import axios from "axios";
import "./category.css";

import { Link, NavLink } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import httpService from "../../service/http.service";

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

const HomeCategory = () => {
  const [data, setData] = useState(null);
  const [isReload, setIsReload] = useState(false);
  const [itemEdit, setItemEdit] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (item) => {
    setItemEdit(item);
    setOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    httpService
      .patch(`/api/categories/${itemEdit._id}`, { body: itemEdit })
      .then((data) => {
        setOpen(false);
        setItemEdit(null);
        setIsReload(!isReload);
      });
  };
  const getListData = async () => {
    const response = await axios.get("http://localhost:5000/api/categories");
    setData(response.data);
  };

  const deleteData = async (id) => {
    const response = await httpService
      .delete(`/api/categories/${id}`)
      .then((data) => {
        setIsReload(!isReload);
      });
  };

  const creatData = async (data) => {
    const response = await axios.post(
      "http://localhost:5000/api/accounts",
      data
    );
  };

  const updateData = async (data) => {
    const response = await axios.patch(
      `http://localhost:5000/api/accounts/${itemEdit._id}`,
      data
    );
  };

  const handleCreat = (data) => {
    if (itemEdit) {
      updateData(data);
      setItemEdit(null);
    } else {
      creatData(data);
    }

    setIsReload(!isReload);
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
              <h1 className="dis">DANH MỤC</h1>
            </div>{" "}
            <br />
            <form className="formedit" onSubmit={handleSubmit}>
              <label className="Boxname">TÊN DANH MỤC</label> <br />
              <input
                className="inpedit"
                type="text"
                value={itemEdit?.name}
                onChange={(e) =>
                  setItemEdit({ ...itemEdit, name: e.target.value })
                }
              />
              <br />
              <label className="Boxname">HÌNH ẢNH</label>
              <br />
              <input
                className="inpedit"
                type="text"
                value={itemEdit?.img}
                onChange={(e) =>
                  setItemEdit({ ...itemEdit, img: e.target.value })
                }
              />
              <br />
              <button className="submitedit" type="submit">
                SỬA
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <div className="sumtable">
        <div className="table_Cate">
          <h4>TÊN DANH MỤC</h4>
          <h4>HÌNH ẢNH</h4>
          <h4>CÀI ĐẶT</h4>
        </div>
        <div className="HelloCate">
          {data && data.length > 0 && (
            <>
              {data.map((item) => (
                <div className="tableCategory">
                  <div className="Cate_item">
                    <h4 className="abc" onClick={() => setItemEdit(item)}>
                      {item.name}
                    </h4>
                  </div>
                  <div className="Cate_item">
                    <img className="categoryimg" src={item.img} alt="" />
                  </div>
                  <div className="Cate_item">
                    <button
                      className="delCate"
                      onClick={() => handledeleteData(item._id)}
                    >
                      XÓA
                    </button>
                    <button
                      className="editCate"
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
            </>
          )}
        </div>
      </div>
      <div>
        <br></br>
        <Link className="Creataccounts" to="/Admin/CreatCategories">
          Thêm Danh Mục
        </Link>
      </div>
    </>
  );
};
export default HomeCategory;
