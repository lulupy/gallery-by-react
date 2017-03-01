import React, { Component } from 'react';
import '../styles/style.css';

class Main extends Component{
    render() {
        return (
            <section className="stage">
                <section className="img-list">
                    <figure className="img-figure">
                        <img src="../images/1.jpg" alt="" />
                        <figcaption>
                            <h2>title</h2>
                            <p>description</p>
                        </figcaption>
                    </figure>
                </section>
                <nav className="control-nav">
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                </nav>
            </section>
        );
        
    }
}

export default Main;