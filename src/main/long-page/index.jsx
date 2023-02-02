import PropTypes from "prop-types";
import React, { Component } from "react";
import { parseTxtToHTML } from "../../utils";
import ScrollTopIcon from "../../common/scroll-top-button";

import "./index.css";

export default class LongPage extends Component {

  static propTypes = {
    context: PropTypes.string,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      isMoving: false,
      isShowTopIcon: false,
    };
    this.timer = null;
  }

  onScroll = (e) => {
    if (!this.state.isMoving && !this.state.isShowTopIcon && e.target.scrollTop > window.innerHeight) {
      this.setState({
        isShowTopIcon: true,
      });
    }
    if (!this.state.isMoving && this.state.isShowTopIcon && e.target.scrollTop < window.innerHeight) {
      this.setState({
        isShowTopIcon: false,
      });
    }
  }

  scrollToTop = () => {
    this.setState({
      isMoving: true,
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
            isShowTopIcon: false,
          });
        }
      }, 20);
    });
  }

  render() {
    const { context, style = {} } = this.props;
    const list = parseTxtToHTML(context);
    const defaultImage = "https://julia-1994.github.io/images/KamisatoAyaka/02.jpg";
    const pageStyle = {
      backgroundImage: `url('${style.backgroundImage || defaultImage}')`,
    };
    const scrollIconStyle = {bottom: this.state.isShowTopIcon ? 20 : -70};
    return (
      <div className="long-page" style={pageStyle} onScroll={this.onScroll} ref={node => this.longPageRef = node}>
        <div className='long-page-container' style={Object.assign({}, style, {opacity: 0.75})}>
          {list.map((item, index) => {
            return (<p key={index}>{item}</p>);
          })}
        </div>
        <ScrollTopIcon onClick={this.scrollToTop} style={scrollIconStyle}/>
      </div>
    );
  }
}
