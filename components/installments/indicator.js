import React, { Component } from 'react';
import { Steps } from 'semantic-ui-react';
 
class InstallmentIndicator extends Component {

  render() {
    console.log(this.props.responseCounter);

    return (
        <div>   
            <div className="ui mini vertical ordered steps">
            <div className={`${this.props.responseCounter > 0 ? 'completed' : this.props.responseCounter == 0 ? 'active' : 'disabled'} step`}>
                <div className="content">
                <div className="title"></div>
                </div>
            </div>
            <div className={`${this.props.responseCounter > 1 ? 'completed' : this.props.responseCounter == 1 ? 'active' : 'disabled'} step`}>
                <div className="content">
                <div className="title"></div>
                </div>
            </div>
            <div className={`${this.props.responseCounter > 2 ? 'completed' : this.props.responseCounter == 2 ? 'active' : 'disabled'} step`}>
                <div className="content">
                <div className="title"></div>
                </div>
            </div>
            </div>
        </div>
    );
  }
}
 
export default InstallmentIndicator;



