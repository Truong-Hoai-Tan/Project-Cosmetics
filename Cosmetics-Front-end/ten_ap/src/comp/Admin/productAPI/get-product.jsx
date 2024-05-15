import React, { useEffect, useState } from "react";
import httpService from "../../service/http.service";
import "./product.css";
import { Link, useNavigate } from "react-router-dom";
import Sweetpagination from "sweetpagination";
import { Box, Fade, Modal } from "@mui/material";
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

const HomeProduct = () => {
  const navagite = useNavigate();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState(null);
  const [dataProduct, setProduct] = useState([]);
  const [isReload, setIsReload] = useState(false)
  const [productAll, setProductALl] = useState([]);
  const [textSeach, setTextSeach] = useState("");
  const [productAllfilter, setProductALlfilter] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]); //1
  const [itemEdit, setItemEdit] = useState(null);
  const [categoryId, setCategoryId] = useState(null)
  const [categories, setCategories] = useState([]);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const deleteProduct = async (id) => {
    const response = await httpService.delete(
      `/api/products/${id}`
    )
  }

  useEffect(() => {
    httpService.get('/api/categories').then((data) => {
      setCategories(data.data)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    httpService.patch(`/api/products/${itemEdit._id  }`, { body: {...itemEdit, category: categoryId} })
      .then((data) => {
        console.log({ body: itemEdit, category: categoryId })
        setOpen(false);
        setItemEdit(null);

        setIsReload(!isReload)
      },
      )
  } 

  useEffect(() => {
    let newArray = [];
    for (let item of productAll) {
      if (item.name.toLowerCase().includes(textSeach.toLowerCase())) {
        newArray.push(item)
      }
    }
    setProductALlfilter(newArray)
  }, [textSeach])

  const handledeleteproduct = (id) => {
    deleteProduct(id);
    setIsReload(!isReload)
  }
  useEffect(() => {
    httpService.get("/api/products").then((data) => {
      setProductALl(data.data)
      setProductALlfilter(data.data)
    })
  }, [isReload])
  // useEffect(() => {
  //   httpService
  //     .get("/api/categories", {})
  //     .then((data) => {
  //       setData(data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [isReload]);
  // useEffect(() => {
  //   if (category !== null) {
  //     httpService
  //       .get(`/api/products/${category}`)
  //       .then((data) => setProduct(data.data));
  //   }
  //   console.log(category);
  // }, [category]);
  const getAccountName = (id) => {
    for (let i = 0; i < categories.length; i++) { 
        if (categories[i]._id === id) {
            return categories[i].name
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
          <div className="slog"><h1 className="dis">SẢN PHẨM</h1></div> <br />
            <form className="formedit" onSubmit={handleSubmit}>
              <label className="Boxname">TÊN SẢN PHẨM:</label> <br />
              <input className="inpedit" type="text" value={itemEdit?.name} onChange={e => setItemEdit({ ...itemEdit, name: e.target.value })} /><br />
              <label className="Boxname">HÌNH ẢNH:</label><br />
              <input className="inpedit" type="text" value={itemEdit?.img} onChange={e => setItemEdit({ ...itemEdit, img: e.target.value })} /><br />
              <label className="Boxname">GIÁ TIỀN:</label><br />
              <input className="inpedit" type="text" value={itemEdit?.price} onChange={e => setItemEdit({ ...itemEdit, price: e.target.value })} /><br />
              <label className="Boxname">SẢN PHẨM MỚI:</label><br />
              <input className="inpedit" type="text" value={itemEdit?.product_hot} onChange={e => setItemEdit({ ...itemEdit, product_hot: e.target.value })} /><br />
              <select className="Selecter" onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
              <button className="submitedit" type="submit">SỬA</button>
            </form>
          </Box>
        </Fade>
      </Modal>
      <div>
        <div className="tableProduct">
         <h4>TÊN SẢN PHẨM</h4>
         <h4>HÌNH ẢNH</h4>
         <h4>GIÁ TIỀN</h4>
         <h3>
         {" "}
            <input className="SerchJob" type="text" placeholder="Tìm Kiếm Products" onChange={(e) => setTextSeach(e.target.value)} />
            {/* <select className="Selecter" onChange={(e) => setCategory(e.target.value)}>
              {data.map((item) => (
                <option key={item.id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select> */}
         </h3>
        </div>
        <div className="products">
          {currentPageData &&
            currentPageData.length > 0 &&
            currentPageData.map((item) => (
              <div className="Sum_product" key={item._id}>
                <div className="product_item">
                  <h4>{item.name}</h4>
                </div>
                <div className="product_item">
                  <img className="productimg" src={item.img} alt=""
                  />
                </div>
                <div className="product_item">
                  <h4>{item.price}</h4>
                </div>
                {/* <div className="product_item">
                  <h4>{item.createdAt}</h4>
                </div> */}
                <div className="product_item">
                  <h4>{getAccountName(item.category)}</h4>
                </div>
                {/* <div className="product_item">
                  <h4>{item.description}</h4>
                </div> */}
                <div className="product_item2">
                  <button className="delproduct" onClick={() => handledeleteproduct(item._id)}> 
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
        </div>
        <div>
          <br></br>
          <Link className="creatProduct" to="/Admin/CreateProducts">Thêm Sản Phẩm</Link>
          <div>
            <Sweetpagination
              currentPageData={setCurrentPageData}
              getData={productAllfilter}
              dataPerPage={5}
              navigation={true}
              getStyle={"style-1"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeProduct;
