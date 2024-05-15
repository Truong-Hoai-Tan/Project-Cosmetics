import React, { useState } from 'react';
import './review.css'

function ProductRating() {
    const [rating, setRating] = useState(null); // Lưu trữ đánh giá
    const [isRated, setIsRated] = useState(false); // Biến kiểm tra đã đánh giá hay chưa
    const [timer, setTimer] = useState(0); // Bộ đếm thời gian

    // Hàm bắt đầu bộ đếm thời gian
    const startTimer = () => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000); // Cập nhật mỗi giây

        // Đặt thời gian cho 5 giây, sau đó dừng bộ đếm
        setTimeout(() => {
            clearInterval(interval);
            setIsRated(true); // Thiết lập là đã đánh giá sau khi hết thời gian
        });
    };

    // Hàm xử lý khi người dùng đánh giá
    const handleRating = (value) => {
        if (!isRated) {
            setRating(value); // Thiết lập đánh giá
            startTimer(); // Bắt đầu bộ đếm thời gian
        }
    };

    return (
        <div>
            {!isRated ? (
                <div className='Star'>
                    <img  onClick={() => handleRating(1)} width={"30px"} src='https://cdn.pixabay.com/photo/2013/07/12/14/10/star-147919_1280.png' />
                    <img  onClick={() => handleRating(2)} width={"30px"} src='https://cdn.pixabay.com/photo/2013/07/12/14/10/star-147919_1280.png' />
                    <img  onClick={() => handleRating(3)} width={"30px"} src='https://cdn.pixabay.com/photo/2013/07/12/14/10/star-147919_1280.png' />
                    <img  onClick={() => handleRating(4)} width={"30px"} src='https://cdn.pixabay.com/photo/2013/07/12/14/10/star-147919_1280.png' />
                    <img  onClick={() => handleRating(5)} width={"30px"} src='https://cdn.pixabay.com/photo/2013/07/12/14/10/star-147919_1280.png' />
                </div>
            ) : (
                <div className='on_star'><h3>Bạn đã đánh giá {rating}</h3>  <img className='star_item' width={"30px"} src='https://cdn.pixabay.com/photo/2013/07/12/14/10/star-147919_1280.png' /></div>
            )}
        </div>
    );
}

export default ProductRating;