import React, { Component } from 'react';
import ControlUnit from './ControlUnit.jsx';
class ControlNav extends Component{
    render() {
        let {
            styleList
        } = this.props;
        return (
            <nav className="control-nav">
                <ul>
                    {
                        styleList.map((item, i)=>{
                            return <ControlUnit key={i} styleInfo={item} centerIndex={styleList.centerIndex} index={i} />
                        })
                    }
                </ul>
            </nav>
        );
        
    }
}

export default ControlNav;