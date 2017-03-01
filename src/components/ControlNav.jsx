import React, { Component } from 'react';
import ControlUnit from './ControlUnit.jsx';
class ControlNav extends Component{
    render() {
        let data = this.props.data;
        return (
            <nav className="control-nav">
                <ul>
                    {
                        data.map((item, i)=>{
                            return <ControlUnit key={i}/>
                        })
                    }
                </ul>
            </nav>
        );
        
    }
}

export default ControlNav;