import PropTypes from "prop-types";
import React, { Component } from "react";
import ScrollTopIcon from "../common/scroll-top-button";
import MarkdownViewer from '../common/markdown-viewer';
import TextViewer from '../common/text-viewer';
import FoldedIcon from "./folded-icon";
import { PAGES, PARAGRAPHS, DEFAULT_IMAGE } from "../utils/constants";

import "./index.css";

export default class Main extends Component {

  static propTypes = {
    toggleRightPanel: PropTypes.func.isRequired,
    isShowRightPanel: PropTypes.bool.isRequired,
    currentPageIndex: PropTypes.number.isRequired,
    currentFile: PropTypes.object.isRquired,
    context: PropTypes.string,
    style: PropTypes.object
  };

  constructor (props) {
    super(props);
    this.state = {
      isMoving: false,
      isShowTopIcon: false
    };
    this.timer = null;
  }

  onScroll = (e) => {
    if (!this.state.isMoving && !this.state.isShowTopIcon && e.target.scrollTop > window.innerHeight) {
      this.setState({
        isShowTopIcon: true
      });
    }
    if (!this.state.isMoving && this.state.isShowTopIcon && e.target.scrollTop < window.innerHeight) {
      this.setState({
        isShowTopIcon: false
      });
    }
  };

  scrollToTop = () => {
    this.setState({
      isMoving: true
    }, () => {
      let currentTop = this.longPageRef.scrollTop;
      const indent = currentTop / 50;
      this.timer = setInterval(() => {
        currentTop = currentTop - indent * 3;
        this.longPageRef.scrollTop = currentTop;
        if (currentTop < 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.setState({
            isMoving: false,
            isShowTopIcon: false
          });
        }
      }, 20);
    });
  };

  renderContext = () => {
    const { currentFile, currentPageIndex } = this.props;

    // 这里数据类型处理的不好，未来重新处理
    let context = "";
    if (currentFile.type === PAGES || currentFile.type === PARAGRAPHS) {
      context = currentFile.context[currentPageIndex];
    } else {
      context = currentFile.context;
    }

    // markdown 格式
    if (currentFile && currentFile.name.toLowerCase().includes('.md')) {
      return (
        <MarkdownViewer context={context} />
      );
    }
    // txt 格式
    return (
      <TextViewer context={context}/>
    );
    // 未来支持其他格式（js 代码片段格式等）
  };

  render () {
    const { currentFile, style } = this.props;

    if (!currentFile) {
      return (
        <div id="main" className="main error center">
          当前没有文本，请上传并选择文本
        </div>
      );
    }

    return (
      <div id="main" className="main">
        {/* TODO: FoldedIcon for LeftPanel */}
        <div
          className="long-page"
          style={{ backgroundImage: `url('${style.backgroundImage || DEFAULT_IMAGE}')` }}
          onScroll={this.onScroll}
          ref={node => { this.longPageRef = node; }}
        >
          <div className='long-page-container' style={Object.assign({}, style, { opacity: 0.75 })}>
            {this.renderContext()}
          </div>
          <ScrollTopIcon
            onClick={this.scrollToTop}
            style={{ bottom: this.state.isShowTopIcon ? 20 : -70 }}
          />
        </div>
        <FoldedIcon
          toggleRightPanel={this.props.toggleRightPanel}
          isShowRightPanel={this.props.isShowRightPanel}
        />
      </div>
    );
  }
}
