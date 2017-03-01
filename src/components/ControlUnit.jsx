import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class ControlUnit extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        let index = this.props.index;
        let centerIndex = this.props.centerIndex;
        
        if(index===centerIndex){
            PubSub.publish('setReverse', index);
        }
        else{
            PubSub.publish('setCenter', index);
        }
    
    }
    render() {
        let {
            styleInfo,
            centerIndex,
            index
        } = this.props;

        let isReverse = styleInfo.isReverse;
        let className = '';
        
        if(index===centerIndex){
            className = 'is-center';
        }
        if(isReverse){
            className += ' is-reverse';
        }
        return (
            <li className={className} onClick={this.handleClick}></li>
        );
        
    }
}

export default ControlUnit;