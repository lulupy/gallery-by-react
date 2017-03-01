import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class ImgItem extends Component{
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
            item,
            styleInfo
        } = this.props;

        let {
            pos,
            rotate,
            isReverse
        } = styleInfo;

        let style = {
            top: pos.top,
            left: pos.left,
            transform: 'rotate('+rotate+'deg)'
        }
        

        if(isReverse){
            style.transform = 'rotateY(180deg) translateX(-100%)'
        }

        return (
            <figure className="img-figure" style={style} onClick={this.handleClick}>
                <img src={item.imgUrl} alt="" />
                <figcaption>
                    <h2>{item.title}</h2>
                    <p>{item.desc}</p>
                </figcaption>
            </figure>
        );
        
    }
}

export default ImgItem;