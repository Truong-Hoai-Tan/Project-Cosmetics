import React, { useEffect, useState } from "react";
import httpService from "../../service/http.service";
import { set } from 'react-hook-form';
import Sweetpagination from "sweetpagination";
import "./comment.css"

const Comment = () => {
const [comments , setcomments] = useState ([]);
const [ isReload , setIsReload] = useState (false);
const [account, setAccount] = useState([]);
const [currentPageData, setCurrentPageData] = useState([]); //1
const deleteData = async (id) => {
    const response = await httpService.delete(
      `/api/comments/${id}`
    );
  };
const handledeleteData = (id) => {
    deleteData(id);
    setIsReload(!isReload);
  };
useEffect(()=>{
    httpService.get("/api/comments").then(data =>{
        setcomments(data.data)
    })
},[isReload])

useEffect(()=>{
  httpService.get("/api/accounts").then(data=>{
    setAccount(data.data)
  })
},[])
const getAccountName = (id) => {
  for (let i = 0; i < account.length; i++) { 
      if (account[i]._id === id) {
          return account[i].fullname
      }
  }
  return id;
}
    return (<>
      <div className="tableComment">
      <h4>NỘI DUNG</h4>
      <h4>SẢN PHẨM</h4>
      <h4>TÀI KHOẢN</h4>
      <h3>CÀI ĐẶT</h3>
        </div>
             <div className="comments">
          {currentPageData &&
            currentPageData.length > 0 &&
            currentPageData.map((item) => (
              <div className="Sum_comment" key={item._id}>
                <div className="comment_item">
                  <h4>{item.content}</h4>
                </div>
                <div className="comment_item">
                  <h4>{item.product}</h4>
                </div>
                <div className="comment_item">
                  <h4>{getAccountName(item.account)}</h4>
                </div>
               
                <div>
                    <button className="delcomment"
                    onClick={() => handledeleteData(item._id)}>
                    DELETE
                    </button>
                </div>
              </div>
            ))}
        </div>
        <div>
        <Sweetpagination
            currentPageData={setCurrentPageData}
            getData={comments}
            dataPerPage={5}
            navigation={true}
            getStyle={"style-1"}
          />
        </div>
    </>)
}
export default Comment; 