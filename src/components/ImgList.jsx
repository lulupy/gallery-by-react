import React, { Component } from 'react';
import ImgItem from './ImgItem.jsx';

class ImgList extends Component{
    render() {
        let data = this.props.data;
        return (
            <section className="img-list">
                {
                    data.map((item,i)=>{
                        return <ImgItem item={item} key={i}/>
                    })
                }
            </section>
        );
        
    }
}

export default ImgList;