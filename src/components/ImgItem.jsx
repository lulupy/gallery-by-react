import React, { Component } from 'react';

class ImgItem extends Component{
    render() {
        let {
            item,
            styleInfo
        } = this.props;
        let style = {
            top: styleInfo.pos.top,
            left: styleInfo.pos.left
        }

        return (
            <figure className="img-figure" style={style}>
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