import React, { Component } from 'react';
import ImgItem from './ImgItem.jsx';

class ImgList extends Component{
    render() {
        let {
            data,
            styleList
        } = this.props;
        return (
            <section className="img-list">
                {
                    data.map((item,i)=>{
                        return <ImgItem index={i} item={item} styleInfo={styleList[i]} key={i} centerIndex={styleList.centerIndex}/>
                    })
                }
            </section>
        );
        
    }
}

export default ImgList;