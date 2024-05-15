import React, { Fragment } from "react";
class Car extends React.Component {
    // Mouting: construct componentDidMount
    // Updating: shoudComponentUpdate (true/false) => componentDidUpdate
    // Unmounting: componentWllUnmount

    constructor() {
        super();
        this.state = {
            username: "ABC",
            password: "123",
        }; // Luu lại data
    }

    componentDidMount() {
        console.log("Call method componentDidMount.....");
        // Call API => Nó chạy 1 lần duy nhất
        window.addEventListener("resize", () => {
            console.log("Window resizing..........");
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidUpdate(preProps) {
        console.log("Call method componentDidUpdate.....");
        // Filter, mapping data từ call API của componentDidMount trả => gán state => rerender
    }

    componentWillUnmount() {
        console.log("Call method componentWillUnmount.....");
        //
        window.removeEventListener("resize", () => {
            console.log("Remove event resize..........");
        });
    }

    // Method bắt buộc
    render() {
        return (
            <>
                <h2>Hello, car class, {this.state.username}</h2>
                <h1>
                    Đây là props: name = {this.props.name}, id = {this.props.id}{" "}
                </h1>
            </>
        );
    }
}

export default Car;