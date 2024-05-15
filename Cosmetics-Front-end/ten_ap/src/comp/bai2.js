import React, { Component } from "react";

class Bai2 extends Component{
    constructor(props){
        super(props);
        this.state ={
            timeSencond: 7000,
        };
    }
    formatTime =(time) =>{}
    render() {
        return (
            <div>
                <h1>Giá trị: {this.state.timeSencond}</h1>
            </div>
        );
    }
}

export default Bai2 ;
