/**
 * @author gcy[of1518]
 * @date 2016.11
 *
 * @description 这里对ant design中的modal进行了封装
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import {Modal} from 'antd';

const noop = () => undefined;

const QMDialog = {

  nodes: {},
  props: {
    title: '',             //标题	React.Element	|| 'string'
    closable: true,	       //是否显示右上角的关闭按钮
    onCancel: noop,	      //点击遮罩层或右上角叉或取消按钮的回调
    width: 500,	           //宽度	String or Number
    style: {},  	       //可用于设置浮层的样式，调整浮层位置等
    maskClosable: true, 	//点击蒙层是否允许关闭
    wrapClassName: 'vertical-center-modal'	 //对话框外层容器的类名	String	-
  },

  load(content, opt){
    let self = this;
    let index = '';
    //生产主键
    index = opt && (typeof opt === 'object') && 'index' in opt ? opt['index'] : (Math.random() + "").substr(2, 9);

    //merge
    let config = assign(this.props, opt);
    //创建弹窗DOM
    self.nodes[index] = document.createElement('div');
    document.body.appendChild(self.nodes[index]);

    let promise = new Promise(function (resolve, reject) {
      let close = (arg)=> self.close.call(null, arg, index, resolve);
      //render到DOM中
      ReactDOM.render(
        <Modal
          visible
          transitionName="zoom"
          maskTransitionName="fade"
          footer=""
          {...config}
          onCancel={()=>self.close.call(null, null, index)}>
          {
            React.cloneElement(content, {close, fail})
          }
        </Modal>
        , self.nodes[index]);

      function fail() {
        //失败回调
        reject();
      }
    });
    return promise;
  },

  /**
   * 外部关闭
   */
  close(arg, index, resolve){
    if (!!index) {
      removeNode(QMDialog.nodes[index]);
    }
    if (resolve != undefined) {
      resolve(arg);
    }
    function removeNode(node) {
      const unmountResult = ReactDOM.unmountComponentAtNode(node);
      if (unmountResult) {
        //组件是否注销
        node.parentNode.removeChild(node);
      } else {
        console.error(`组件未注销`);
      }
    }
  },

  /**
   *  侧边弹窗 暂未开通
   */
  side(){
  },

  /**
   *  打开链接 暂未开通
   */
  openUrl(){
  }

};

export default QMDialog;
