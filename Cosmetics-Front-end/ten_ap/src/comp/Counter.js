import React, { Component } from "react";

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cnt: 0,
        };
    }

    componentDidMount() {
        // Gọi method start interval
        this.startCounting();
    }

    componentWillUnmount() {
        // Vì component đang gọi 2 lần didMount và 1 lần willUnmout nên dẫn đến tạo 2 interval => Cần hủy 1 cái đi trước
        this.clearCounting();
    }

    startCounting = () => {
        // Khởi tạo interval và lưu lại biến countInterval
        this.countInterval = setInterval(this.updateCount, 1000);
    };

    clearCounting = () => {
        // Gọi method clearInterval
        clearInterval(this.countInterval);
    };

    updateCount = () => {
        // Kiểm tra nếu giá trị nó count tới 5 r thì thôi clear đi và không update interval nữa
        if (this.state.cnt + 1 === 5) {
            this.clearCounting();
        }

        this.setState({
            cnt: this.state.cnt + 1,
        });
    };

    render() {
        return (
            <div>
                <h1>Giá trị: {this.state.cnt}</h1>
            </div>
        );
    }
}

export default Counter;