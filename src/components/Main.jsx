import React, { Component } from 'react';
import '../styles/style.css';

import ImgList from './ImgList.jsx';
import ControlNav from './ControlNav.jsx';

let data = require('../data/img-data.json');

data.forEach((item)=>{
    item.imgUrl = require('../images/'+item.fileName);
});

class Main extends Component{
    render() {
        return (
            <section className="stage">
                <ImgList data={data}/>
                <ControlNav data={data}/>
            </section>
        );
        
    }
}

export default Main;