import React, { useEffect, useState } from "react";
import httpService from "../../service/http.service";
import './categoryBig.css';
import { Link, NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
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

const HomeCateBig = () => {

  const [categoryBig, setCategoryBig] = useState("")
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
    httpService.patch(`/api/categoryBig/${itemEdit._id}`, { body: itemEdit })
      .then((data) => {
        setOpen(false);
        setItemEdit(null);
        setIsReload(!isReload)
      },
      )
  }
  const handledelete =(id)=>{
    httpService.delete(`/api/categoryBig/${id}`).then(data =>{
      setIsReload(!isReload)
    })
  }
  useEffect(() => {
    httpService.get("/api/categoryBig").then(data => {
      setCategoryBig(data.data)
        setIsReload(!isReload)
    })
  }, [isReload])
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
        <Fade style={{ width: "420px", height: "500px", border: "0px", borderRadius: "5px" }} in={open}>
          <Box sx={style}>
            <button style={{ margin: "0px" }} onClick={() => setOpen(false)}>x</button>
            <div className="slog"><h1 className="dis">DANH MỤC LỚN</h1></div> <br />
            <form className="formedit" onSubmit={handleSubmit}>
              <label className="Boxname">TÊN DANH MỤC</label> <br />
              <input className="inpedit" type="text" value={itemEdit?.name} onChange={e => setItemEdit({ ...itemEdit, name: e.target.value })} /><br />
              <label className="Boxname">ĐƯỜNG DẪN</label><br />
              <input className="inpedit" type="text" value={itemEdit?.link} onChange={e => setItemEdit({ ...itemEdit, link: e.target.value })} /><br />
              <button className="submitedit" type="submit">Edit</button>
            </form>
          </Box>
        </Fade>
      </Modal> 
      <div className="tableBig">
        <h4>TÊN</h4>
        <h5>ĐƯỜNG DẪN</h5>
      </div>
      {categoryBig && categoryBig.length > 0 && (
        <div className="itemOder_get">
          {categoryBig.map((item) => (
            <div className="categoryBig" key={item._id}>
            <div className="cateBig_item">
            <h4>{item.name}</h4>
            </div>
            <div className="cateBig_item">
            <h4>{item.link}</h4>
            </div>
            <div className="cateBig_item2">
            <button className="edit_cate" onClick={() => handledelete(item._id)}>
                      XÓA
                      </button>
                      <button 
                      className="editCate" onClick={() => {
                        setItemEdit(item);
                        setOpen(true)
                      }}>SỬA</button>
            </div>
            </div>
          ))}
          
        </div>
      )}
      <div>
      <br></br>
        <Link className="CreatCate" to="/Admin/CreateCateBig">Thêm Đường Dẫn</Link>
      </div>
    </>
  )

}
export default HomeCateBig