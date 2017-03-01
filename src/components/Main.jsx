import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import '../styles/style.css';

import ImgList from './ImgList.jsx';
import ControlNav from './ControlNav.jsx';

let data = require('../data/img-data.json');

data.forEach((item)=>{
    item.imgUrl = require('../images/'+item.fileName);
});

/**
 * 获取一个在一定范围的随机整数
 * @param  {number} low  范围的较小值
 * @param  {number} high 范围的较大值
 * @return {number}      随机整数
 */
function getRandom(low, high){
    return parseInt(low + Math.random()*(high-low));
}

class Main extends Component{
    
    constructor(props){
        super(props);

        //图片排列的位置范围
        //舞台中心放一张图片, 舞台上边，左边，右边都可以放图片，舞台下边不放图片
        //这里表示的图片的位置范围,所以我们用一个数组表示范围，比如top: [0,100]表示top的值在0到100之间
        //这里是初始化，所以都为0，放在后面计算
        this.posRange = {
            centerPoint: {
                top: 0,
                left: 0
            },
            leftSide: {
                top: [0,0],
                left: [0,0]
            },
            rightSide: {
                top: [0, 0],
                left: [0,0]
            },
            topSide: {
                top: [0,0],
                left: [0,0]
            }
        }

        this.state = {
            //样式信息
            styleList: []
        }

        for(let i=0;i<data.length;i++){
            this.state.styleList.push({
                pos: {
                    top: 0,
                    left: 0
                },
                rotate: 0,
                isReverse: false
            })
        }
    }

    componentDidMount(){
        let refs = this.refs;
        let stageEl = refs.stage;
        let imgItemEl = stageEl.querySelector('.img-figure');

        let stageW = stageEl.clientWidth;
        let stageH = stageEl.clientHeight;

        let imgW = imgItemEl.offsetWidth;
        let imgH = imgItemEl.offsetHeight;

        this.posRange.centerPoint = {
            top: stageH/2 - imgH/2,
            left: stageW/2 - imgW/2
        };

        this.posRange.leftSide = {
            top: [
                -imgH/2,
                stageH-imgH/2
            ],
            left: [
                -imgW/2,
                stageW/2 - imgW/2 - imgW
            ]
        };

        this.posRange.rightSide = {
            top: [
                -imgH/2,
                stageH-imgH/2
            ],
            left: [
                stageW/2 - imgW/2 + imgW,
                stageW - imgW/2
            ]
        };

        this.posRange.topSide = {
            top: [
                -imgH/2,
                stageH/2 - imgH/2 - imgH
            ],
            left: [
                stageW/2  - imgW,
                stageW/2  + imgW
            ]
            
        }

        this.computePos(0);

        
        PubSub.subscribe('setCenter', (evName, index)=>{
            this.computePos(index);
        });

        PubSub.subscribe('setReverse', (evName, index)=>{
            this.setReverse(index);
        });

    }
    
    //计算位置信息
    computePos(centerIndex){

        let styleList = this.state.styleList.slice();
        let posRange = this.posRange;
        let centerItem = styleList.splice(centerIndex, 1)[0];
        
        centerItem.pos = {
            top: posRange.centerPoint.top,
            left: posRange.centerPoint.left
        }
        
        //在舞台上边的图片个数，为0或1
        let topNum = Math.random()>0.5 ? 0 : 1;
        let topItems = [];
        let topIndexs = [];

        for(let i=0;i<topNum;i++){
            topIndexs[i] = getRandom(0, styleList.length);
            topItems[i] = styleList.splice(topIndexs[i], 1)[0];
            topItems[i].pos = {
                top: getRandom(posRange.topSide.top[0], posRange.topSide.top[1]),
                left: getRandom(posRange.topSide.left[0], posRange.topSide.left[1])
            }
        }


        //剩下的图片一半在左，一半在右
        for(let i=0;i<styleList.length;i++){
            if(i<styleList.length/2){
                styleList[i].pos = {
                    top: getRandom(posRange.leftSide.top[0], posRange.leftSide.top[1]),
                    left: getRandom(posRange.leftSide.left[0], posRange.leftSide.left[1])
                }
            }
            else{
                styleList[i].pos = {
                    top: getRandom(posRange.rightSide.top[0], posRange.rightSide.top[1]),
                    left: getRandom(posRange.rightSide.left[0], posRange.rightSide.left[1])
                }
            }
        }

        //将开始提出来的项重新插入原数组，注意，后提出的先插入
        for(let i=topNum-1;i>-1;i--){
            styleList.splice(topIndexs[i], 0, topItems[i]);
        }

        //加上旋转信息
        styleList.forEach((item)=>{
            item.rotate = getRandom(-30,30);
            item.isReverse = false;
        });
        
        centerItem.rotate = 0;
        styleList.splice(centerIndex, 0, centerItem);


        styleList.centerIndex = centerIndex;

        this.setState({
            styleList: styleList
        })

        
    }
    
    setReverse(index){
        let styleList = this.state.styleList.slice();
        styleList[index].isReverse = !styleList[index].isReverse;
        styleList.centerIndex = index;

        this.setState({
            styleList: styleList
        })
    }

    render() {
        let styleList = this.state.styleList;
        return (
            <section className="stage" ref="stage">
                <ImgList data={data} styleList={styleList}/>
                <ControlNav styleList={styleList}/>
            </section>
        );
        
    }
}

export default Main;