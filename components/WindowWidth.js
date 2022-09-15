import React, { Component } from "react";

class WindowWidth extends Component {    
  constructor(props) {
    super(props);
    this.state = { frameWidth: 0, frameHeight: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ frameWidth: window.innerWidth, frameHeight: window.innerHeight });
    this.props.setFrameSize(this.state.frameWidth, this.state.frameHeight);
  }
  render() {
    return null
     ;
  }
}
export default WindowWidth;