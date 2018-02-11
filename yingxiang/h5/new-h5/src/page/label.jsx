import React, { Component } from 'react';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneMath from 'cornerstone-math';
import loader from '../util/exampleImgLoader';
import '../style/label.styl';
loader(cornerstone)
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
console.log(cornerstoneTools)
import { getToolState } from 'cornerstone-tools';
import ToolsEvents from '../util/toolsEvents';
import History from '../util/history';
const history = new History();
console.log(history);

cornerstoneTools.toolStyle.setToolWidth(10);
cornerstoneTools.toolColors.setToolColor("#ff6633");
cornerstoneTools.toolColors.setActiveColor("#0000ff");
cornerstoneTools.toolColors.setFillColor("#0033ff");

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.activateTool = this.activateTool.bind(this);
  }
  componentDidMount(){
    // const element = this.box;
    // cornerstone.enable(element);
    // const imageId = 'example://1';
    // element.addEventListener('cornerstoneimagerendered', (e) => {
    //   var appState = cornerstoneTools.appState.save([this.box]);
    //   // console.log("Saving state");
    //   history.add(appState);
    //   // history.get();
    // });
    // element.addEventListener('cornerstoneimagecachechanged', (e) => {
    //   console.log("Saving state");
    // });
    // cornerstone.loadImage(imageId).then( image => {
    //   console.log(1);
    //   history.active(imageId);
    //   cornerstone.displayImage(element, image);
    //   cornerstoneTools.mouseInput.enable(element);
    //   cornerstoneTools.mouseWheelInput.enable(element);
    //   cornerstoneTools.pan.enable(element, 2); 
    //   cornerstoneTools.zoom.enable(element, 4);
    //   // cornerstoneTools.zoomWheel.activate(element);
    //   cornerstoneTools.length.enable(element);
    //   cornerstoneTools.ellipticalRoi.enable(element);
    //   cornerstoneTools.rectangleRoi.enable(element);
    // });
  }
  activateTool(e) {
    this.disableAllTools();
    const { type } = e.currentTarget.dataset;
    const tool = {
      'wwwc': ()=> {
        cornerstoneTools.wwwc.activate(this.box, 1);
      },
      'pan': ()=> {
        cornerstoneTools.pan.activate(this.box, 1);
      },
      'zoom': () => {
        cornerstoneTools.zoom.activate(this.box, 1);
      },
      'leftRotate': () => {
        this.rotateViewport('left', 90);
      },
      'rightRotate': () => {
        this.rotateViewport('right', 90);
      },
      'freehand': () => {
        history.setStatus('add');
        cornerstoneTools.freehand.activate(this.box, 1);
      },
      'rectangleRoi': () => {
        history.setStatus('add');
        cornerstoneTools.rectangleRoi.activate(this.box, 1);
      },
      'ellipticalRoi': () => {
        history.setStatus('add');
        cornerstoneTools.ellipticalRoi.activate(this.box, 1);
      },
      'saveImg': () => {
        const filename = '123';
        cornerstoneTools.saveAs(this.box, filename);
      },
      'color': () => {

      },
      'lineWidth': () => {

      },
      'prevStep': () => {
        // 0 代表不需要任何操作
        let stepState = history.prev();
        if (stepState === 0) {
          return;
        } else if (stepState === 1) {
          const toolStateManager = cornerstoneTools.getElementToolStateManager(this.box);
          toolStateManager.clear(this.box)
          cornerstone.updateImage(this.box);
        } else {
          cornerstoneTools.appState.restore(stepState);
        }
      },
      'nextStep': () => {
        // 0 代表不需要任何操作
        let stepState = history.next();
        if (stepState === 0) {
          return;
        } else {
          cornerstoneTools.appState.restore(stepState);
        }
      },
      'saveJson': () => {
        var appState = cornerstoneTools.appState.save([this.box]);
        console.log(appState)
        console.log(history.get());
        return;
        var appState = cornerstoneTools.appState.save([this.box]);
        console.log("Saving state");
        console.log(appState);
        var serializedState = JSON.stringify(appState);
        localStorage.setItem('customBrush', serializedState);
      },
    }
    tool[type]();
  }

  rotateViewport(type, deg) {
    let viewport = cornerstone.getViewport(this.box);
    let rotation = viewport.rotation - 0; 
    rotation = type === 'left' ? rotation -= deg : rotation += deg;
    // console.log(rotation);
    viewport.rotation = rotation;
    cornerstone.setViewport(this.box, viewport);
  }
  activateAllTools(element) {
    ToolsEvents.forEach((val, i) => {
      cornerstoneTools[val].enable(this.box);
    });
  }
  disableAllTools() {
    const Tools = ['wwwc', 'pan', 'zoom', 'freehand', 'rectangleRoi', 'ellipticalRoi']
    Tools.forEach((val, i) => {
      cornerstoneTools[val].deactivate(this.box, 1);
    });
  }
  render() {
    return (
      <div>
        <div className="tool__container">
          <div className="tool__item" onClick={this.activateTool} data-type="wwwc">明暗</div>
          <div className="tool__item" onClick={this.activateTool} data-type="pan">移动</div>
          <div className="tool__item" onClick={this.activateTool} data-type="zoom">缩放</div>
          <div className="tool__item" onClick={this.activateTool} data-type="leftRotate">左旋</div>
          <div className="tool__item" onClick={this.activateTool} data-type="rightRotate">右旋</div>
          <div className="tool__item" onClick={this.activateTool} data-type="color">颜色</div>
          <div className="tool__item" onClick={this.activateTool} data-type="lineWidth">线条</div>
          <div className="tool__item" onClick={this.activateTool} data-type="freehand">多边形</div>
          <div className="tool__item" onClick={this.activateTool} data-type="rectangleRoi">矩形</div>
          <div className="tool__item" onClick={this.activateTool} data-type="ellipticalRoi">椭圆</div>
          <div className="tool__item" onClick={this.activateTool} data-type="prevStep">上一步</div>
          <div className="tool__item" onClick={this.activateTool} data-type="nextStep">下一步</div>
          <div className="tool__item" onClick={this.activateTool} data-type="saveJson">保存</div>
          <div className="tool__item" onClick={this.activateTool} data-type="saveImg">另存为</div>
        </div>
        <div className="canvas__box"
          ref={(box) => { this.box = box; }}
        ></div>
      </div>
    );
  }
} 