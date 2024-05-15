import { Fragment } from "react";
import "./App.css";
// import Car from "./comp/Car";
// import Counter from "./comp/Counter";
// import Bai2 from "./comp/bai2.js";
// import TodoApp from "./comp/todo/todo";
// import Todo from "./comp/todo2";
import { createStore } from "redux";
import { Provider } from "react-redux";
import CounterApp from "./comp/counter/counteapp";
import { allReducers } from "./comp/counter/reducer/index";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import CreateData from "./comp/Admin/accountAPI/creatData";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeCategory from "./comp/Admin/categoryAPI/Home-delete";
import HomeAccount from "./comp/Admin/accountAPI/home-delete";
import CreateCT from "./comp/Admin/categoryAPI/CreatDataCT";
import LoginCT from "./comp/Admin/auth/login";
import httpService from "./comp/service/http.service";
import Register2 from "./comp/Admin/auth/register";
import Admin from "./comp/Admin/admin";
import { ToastContainer } from "react-toastify";
import User from "./comp/User";
import HomeProduct from "./comp/Admin/productAPI/get-product";
import Abc from "./comp/Admin/productAPI/creat-product";
import HomeJob from "./comp/Admin/job/get-delete";
import storageService from "./comp/service/storage.service";
import CreateProduct from "./comp/Admin/productAPI/creat-product";
import CreateJobs from "./comp/Admin/job/creatJobs";
import CartUse from "./comp/User/cart";
import Comment from "./comp/Admin/comment/get-comment.jsx";
import ProductIteam from "./comp/User/product_item.jsx";
import ProductDetail from "./comp/User/productDetail.jsx";
import Statistical from "./comp/User/Statistical-iteam.jsx";
import StatisticalLayout from "./comp/User/Statistical.jsx";
import Information from "./comp/User/Information.jsx";
import HomeBill from "./comp/Admin/bill/homeBill.jsx";
import HomeCateBig from "./comp/Admin/categoryAPIBig/get-categotybig.jsx";
import CreateBig from "./comp/Admin/categoryAPIBig/creatCateBig.jsx";
import InforOder from "./comp/Admin/bill/inforOder.jsx";
import SuccessPage from "./comp/SuccessPage.jsx";
import ProductStatistics from "./comp/Admin/statis/statisAdmin.jsx";

// import { useNavigate } from "react-router-dom";

const store = createStore(allReducers);
// Change -> update
// type : stateless, statefull
// Class Component <=> Functional

function App() {
  const [isReload, setIsReload] = useState(false);
  const [itemEdit, setItemEdit] = useState(null);

  const creatData = async (data) => {
    const response = await httpService.post("/api/accounts", { body: data });
  };
  const createCT = async (data) => {
    const formData = new FormData();
    formData.append("img", data.img);
    formData.append("name", data.name);
    const response = await httpService.post("/api/categories", { body: formData });
    return response;
  };

  const updateData = async (data) => {
    const response = await httpService.patch(`/api/accounts/${itemEdit._id}`, {
      body: data,
    });
  };
  const updateCT = async (data) => {
    const response = await axios.patch(`http://localhost:5000/api/accounts/${itemEdit._id}`, data);
  };

  const handleCreatCT = (data) => {
    if (itemEdit) {
      updateCT(data);
    } else {
      createCT(data);
    }

    setIsReload(!isReload);
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

  return (
    <>
      {/* { <Car name="Moto" id='100' /> }
      { <Counter /> }
      
      {<Todo/> }
      { <TodoApp/> } */}
      {/* { <CounterApp /> } */}
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<User />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/HomeProduct" element={<HomeProduct />} />
            <Route path="/HomeCategories" element={<HomeCategory />} />
            <Route path="/Register" element={<Register2 />} />
            <Route path="/HomeAccount" element={<HomeAccount />} />
            <Route path="/login" element={<LoginCT />} />
            <Route path="/Admin" element={<Admin />}>
              <Route path="/Admin/accounts" index element={<HomeAccount />} />
              <Route path="/Admin/product" index element={<HomeProduct />} />
              <Route path="/Admin/job" index element={<HomeJob />} />
              <Route path="/Admin/comments" index element={<Comment />} />
              <Route path="/Admin/bills" index element={<HomeBill />} />
              <Route path="/Admin/statisAdmin" index element={<ProductStatistics />} />
              <Route
                path="/Admin/CreatAccounts"
                element={<CreateData onSubmit={handleCreat} data={itemEdit} />}
              />
              <Route
                path="/Admin/CreateProducts"
                element={<CreateProduct onSubmit={handleCreat} data={itemEdit} />}
              />
              <Route
                path="/Admin/CreatCategories"
                element={<CreateCT onSubmit={handleCreatCT} data={itemEdit} />}
              />
              <Route
                path="/Admin/CreatJob"
                element={<CreateJobs onSubmit={handleCreat} data={itemEdit} />}
              />
              <Route
                path="/Admin/CreateCateBig"
                element={<CreateBig onSubmit={handleCreat} data={itemEdit} />}
              />
              <Route path="/Admin/CategoryBig" index element={<HomeCateBig />} />

              <Route path="/Admin/Oders/:id" element={<InforOder />} />
              <Route path="/Admin/categories" index element={<HomeCategory />} />
            </Route>
            <Route path="/cart" element={<CartUse />} />
            <Route path="/Product" element={<ProductIteam />} />
            <Route path="/Products/:id" element={<ProductDetail />} />
            <Route path="/information/:id" element={<Information />} />
            <Route path="/statistical" element={<StatisticalLayout />} />
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer />
    </>
  );
}

export default App;
