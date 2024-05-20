import React, { useEffect, useState } from "react";
import httpService from "../../service/http.service";
import { Link } from "react-router-dom";
import "./job.css"
import Sweetpagination from "sweetpagination";
import { Box, Fade, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from "react-router-dom";
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


const HomeJob = () => {
  const [data, setData] = useState([]);
  const [job, setJob] = useState(null);
  const [dataProduct, setProduct] = useState([]);
  const [productAll, setProductALl] = useState([]);
  const [isReload, setIsReload] = useState(false)
  const [textSeach, setTextSeach] = useState("");
  const [Alljobs, setAllJobs] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [itemEdit, setItemEdit] = useState(null);
  const [categoryId, setCategoryId] = useState(null)
  const [accounts, setCategories] = useState([]);
  const navagite = useNavigate();
  
  useEffect(() => {
    httpService.get('/api/accounts').then((data) => {
      setCategories(data.data)
    })
  }, [])

  const onSubmit = (data) => {
    httpService
    .post(`/api/jobs/${categoryId}`, { body: data })
    .then(data => setCategoryId(data))
    navagite('/Admin/job')

  }

  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    setItemEdit(item);
    setOpen(true);
  };//1

  const deleteJob = async (id) => {
    const response = await httpService.delete(
      `/api/jobs/${id}`
    )
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    httpService.patch(`/api/jobs/${itemEdit._id}`, { body: {...itemEdit, account: categoryId} })
      .then((data) => {
        console.log({body: {...itemEdit, category: categoryId}})
        setOpen(false);
        setItemEdit(null);
        setIsReload(!isReload)
      },
      )
  }
  const handledeleteJobs = (id) => {
    deleteJob(id);
    setIsReload(!isReload)
  }
  useEffect(() => {
    let newArray = [];
    for (let item of productAll) {
      if (item.name.toLowerCase().includes(textSeach.toLowerCase())) {
        newArray.push(item)
      }
    }
    setAllJobs(newArray)
  }, [textSeach])

  useEffect(() => {
    httpService.get("/api/jobs").then((data) => {
      setProductALl(data.data)
      setAllJobs(data.data)
    }) 
  }, [isReload])

  useEffect(() => {
    httpService
      .get("/api/accounts", {})
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (job !== null) {
      httpService
        .get(`/api/jobs/${job}`)
        .then((data) => setProduct(data.data));
    }
  }, [job]);

  const getAccountName = (id) => {
    for (let i = 0; i < data.length; i++) { 
        if (data[i]._id === id) {
            return data[i].fullname
        }
    }
    return id;
}
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
        <Fade style={{width:"420px" , height: "500px" , border: "0px" , borderRadius:"5px"}}  in={open}>
          <Box sx={style}>
          <button style={{margin: "0px"}} onClick={() => setOpen(false)}>x</button>
          <div className="slog"><h1 className="dis">NHIỆM VỤ</h1></div> <br />
            <form className="formedit" onSubmit={handleSubmit}>
              <label className="Boxname">NHIỆM VỤ:</label> <br />
              <input className="inpedit" type="text" value={itemEdit?.name} onChange={e => setItemEdit({ ...itemEdit, name: e.target.value })} /><br />
              <label className="Boxname">MÔ TẢ:</label><br />
              <input className="inpedit" type="text" value={itemEdit?.detail} onChange={e => setItemEdit({ ...itemEdit, detail: e.target.value })} /><br />
              <label className="Boxname">THỜI GIAN:</label><br />
              <input className="inpedit" type="text" value={itemEdit?.status} onChange={e => setItemEdit({ ...itemEdit, status: e.target.value })} /><br />
              <select className="Selecter" onChange={(e) => setCategoryId(e.target.value)}>
          {accounts.map((item) => (
            <option key={item._id} value={item._id}>
              {item.username}
            </option>
          ))}
        </select>
              <button className="submitedit" type="submit">SỬA</button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <div>
        <div className="tableJob">
          <h4>NHIỆM VỤ</h4>
          <h4>MÔ TẢ</h4>
          <h4>THỜI GIAN</h4>
          <h4>{" "}
          <input className="SerchJob" type="text" placeholder="Tìm Kiếm Jobs " onChange={(e) => setTextSeach(e.target.value)} />
            {/* <select className="Selecter" onChange={(e) => setJob(e.target.value)}>
              {data.map((item) => (
                <option key={item.id} value={item._id}>
                  {item.username}
                </option>
              ))}
            </select> */}</h4>
        </div>
        <div className="jobs">
          {currentPageData &&
            currentPageData.length > 0 &&
            currentPageData.map((item) => (
              <div className="Sum_Job" key={item._id}>
                <div className="job_item">
                  <h4>{item.name}</h4>
                </div>
                <div className="job_item">
                  <h4>{item.detail}</h4>
                </div>
                <div className="job_item">
                  <h4>{item.status}</h4>
                </div>
                <div className="job_item">
                  <h4>{getAccountName(item.account)}</h4>
                </div>
                <div className="job_item2">
                  <button className="deljob" onClick={() => handledeleteJobs(item._id)}>
                  XÓA
                  </button>
                  <button
                   className="editjob"
                    onClick={() => {
                      setItemEdit(item);
                      setOpen(true)
                    }}
                  >
                    SỬA
                  </button>
                </div>
              </div>
            ))}
            <br />
        </div>
        <Link className="Creataccounts" to="/Admin/CreatJob">Thêm Nhiệm Vụ</Link>
        <div>
        <Sweetpagination
            currentPageData={setCurrentPageData}
            getData={Alljobs}
            dataPerPage={5}
            navigation={true}
            getStyle={"style-1"}
          />
        </div>
      </div>
    </>
  );
};
export default HomeJob;