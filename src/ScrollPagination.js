/**
 * @author gcy[of1518]
 * @date 16/10/11
 *
 * @description QMPage基于AntDesign的实现类
 * 基于修饰器API,作为一个桥接用以实现，讲qm-ux的API翻译下
 */
import React, {Component} from 'react';
import ReactDom from 'react-dom'
import {PaginationUI} from 'qm-ui';
import {Spin} from 'antd'
import assign from 'object-assign'
const noop = ()=>{}

import PaginationService from './PaginationService';

@PaginationService
export default class ScrollPagination extends Component {

    static defaultProps = {
        height:'490'
    }

    mounted = false

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.mounted = true
        if(typeof this.props.size == "function") {
            let _dom = ReactDom.findDOMNode(this.refs['scroll-container'])
            let width = _dom.offsetWidth;
            let height = _dom.offsetHeight
            this.props.onPageChange({pageCurrent: 1, pageSize: this.props.size(width, height)||10});
        }
    }

    _scroll(e){
        let dom = ReactDom.findDOMNode(this.refs['scroll-container']);
        let {dataTotal,pageCurrent,pageSize} = this.props;
        let pageTotal = Math.ceil(dataTotal/pageSize)
        //console.log("====>"+parseInt(dom.scrollHeight)+ "====="+dom.clientHeight+"======="+parseInt(dom.scrollTop))
        if(parseInt(dom.scrollHeight)-dom.clientHeight-parseInt(dom.scrollTop) ==0){
            if(pageCurrent<pageTotal&&!this.props.netLoading) {
                this.props.onPageChange({pageCurrent: pageCurrent+1, mode: "append"});
            }
        }
    }

    render() {
        if(!this.mounted && typeof this.props.size=="function"){
            return (
                <div ref="scroll-container"
                     style={assign(this.props.style||{},{height:this.props.height,overflow:"scroll"})}
                     className={this.props.className}>
                </div>)
        }
        return (
            <div ref="scroll-container"
                 style={assign(this.props.style||{},{height:this.props.height,overflow:"scroll"})}
                 className={this.props.className}
                 onScroll={this._scroll.bind(this)}>
                    {this.props.children}
            </div>
        )

    }

}