import React, { useEffect, useState } from 'react'; // Đảm bảo bạn import httpService từ đúng vị trí
import httpService from '../../service/http.service';
import "./statisAdmin.css"
function ProductStatistics() {
    const [newProductsCount, setNewProductsCount] = useState(0);
    const [dailyOrderCount, setDailyOrderCount] = useState(0);
    const [newCommentCount, stNewCommentCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    //product
    useEffect(() => {
        httpService.get("/api/products")
            .then(response => {
                if (response && response.data) {
                    const newProductsToday = response.data.filter(product => {
                        // Lấy ngày hiện tại
                        const today = new Date();
                        // Đặt thời gian bắt đầu là 00:00:00 sáng hôm nay
                        today.setHours(0, 0, 0, 0);
                        // console.log(today)
                        // Lấy ngày tạo sản phẩm
                        // console.log(product.createdAt)
                        
                        const productCreatedAt = new Date(product.createdAt);
                        // console.log(today.getTime < productCreatedAt.getTime)
                        // Lọc ra các sản phẩm được tạo ra trong ngày hôm nay
                        return productCreatedAt.getTime() >= today.getTime();
                    }); 
                    // Đếm số lượng sản phẩm mới được thêm vào trong ngày
                    setNewProductsCount(newProductsToday.length);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setIsLoading(false);
            });
    }, []);
    //Oder
    useEffect(() => {
        httpService.get("/api/oders")
            .then(response => {
                if (response && response.data) {
                    // Lọc ra các đơn hàng được đặt trong ngày hôm nay
                    const newOderToday = response.data.filter(oders => {
                        // Lấy ngày hiện tại
                        const today = new Date();
                        // Đặt thời gian bắt đầu là 00:00:00 sáng hôm nay
                        today.setHours(0, 0, 0, 0);
                        console.log(today)
                        // Lấy ngày tạo sản phẩm
                        console.log("ád")
                        
                        const productCreatedAt = new Date(oders.createdAt);
                        console.log(today.getTime < productCreatedAt.getTime)
                        // Lọc ra các sản phẩm được tạo ra trong ngày hôm nay
                        return productCreatedAt.getTime() >= today.getTime();
                    }); 
                    // Đếm số lượng sản phẩm mới được thêm vào trong ngày
                    setDailyOrderCount(newOderToday.length);
                    setIsLoading(false);
                    // Đếm số lượng đơn hàng được đặt trong ngày
                    
                }
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setIsLoading(false);
            });
    }, []);
    //comment
    useEffect(() => {
        httpService.get("/api/comments")
            .then(response => {
                if (response && response.data) {
                    // Lọc ra các đơn hàng được đặt trong ngày hôm nay
                    const newOderToday = response.data.filter(oders => {
                        // Lấy ngày hiện tại
                        const today = new Date();
                        // Đặt thời gian bắt đầu là 00:00:00 sáng hôm nay
                        today.setHours(0, 0, 0, 0);
                        console.log(today)
                        // Lấy ngày tạo sản phẩm
                        console.log("ád")
                        
                        const productCreatedAt = new Date(oders.createdAt);
                        console.log(today.getTime < productCreatedAt.getTime)
                        // Lọc ra các sản phẩm được tạo ra trong ngày hôm nay
                        return productCreatedAt.getTime() >= today.getTime();
                    }); 
                    // Đếm số lượng sản phẩm mới được thêm vào trong ngày
                    stNewCommentCount(newOderToday.length);
                    setIsLoading(false);
                    // Đếm số lượng đơn hàng được đặt trong ngày
                    
                }
            }) 
            .catch(error => {
                console.error("Error fetching orders:", error);
                setIsLoading(false);
            });
    }, []);
    //dem giờ
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Cập nhật thời gian mỗi giây

        return () => clearInterval(interval); // Hủy interval khi component unmount
    }, []);

    const formattedDateTime = currentDateTime.toLocaleString(); // Chuyển đổi thời gian sang định dạng chuỗi

        
  return (
        <div>
        <div className='name_statisPD' >
       
           <div className='item_statis'>
           <img
                src="https://png.pngtree.com/png-clipart/20230504/original/pngtree-products-line-icon-png-image_9137821.png"
                alt=""
              />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <h4>{newProductsCount}</h4>
            )}
            <h3>Sản Phẩm</h3>
           </div>
           <div className='item_statis'>
           <img
                src="https://png.pngtree.com/png-clipart/20230811/original/pngtree-bill-invoice-bill-receipt-vector-picture-image_10399500.png"
                alt=""
              />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <h4>{dailyOrderCount}</h4>
            )}
            <h3>Hóa Đơn</h3>
           </div>
           <div className='item_statis'>
           <img
                src="https://png.pngtree.com/png-clipart/20231220/original/pngtree-webinar-icon-comment-bubble-blue-photo-png-image_13890028.png"
                alt=""
              />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <h4>{newCommentCount}</h4>
            )}
            <h3>Bình Luận</h3>
           </div>
        </div>
        <div className='bieudo'>
                
            <div className='item_bieudo'>
            <img className='radius'
                src="https://wpro.vn/wp-content/uploads/2020/10/bieu-do-cot-excel-bao-cao-ban-hang-1.png"
                alt=""
              />
            <img
            className='bieudo_item'
                src="https://media.vneconomy.vn/w900/images/upload/2023/01/04/sapo-nhan-dinh-2023.png"
                alt=""
              />
              
            </div>
            <p className='Time_on'>{formattedDateTime}</p>
        </div>
        </div>
    );
}

export default ProductStatistics;