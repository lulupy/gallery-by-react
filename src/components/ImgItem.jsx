import React, { Component } from 'react';

class ImgItem extends Component{
    render() {
        let item = this.props.item;
        return (
            <figure className="img-figure">
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