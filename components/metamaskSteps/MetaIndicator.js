import React, { Component } from 'react';
import { Segment, Grid, Form, Button, Message } from 'semantic-ui-react';


class MetaIndicator extends Component {

    saveAndContinueTest = (e) => {
        e.preventDefault();
        this.props.nextStepMetaTest();
    }

    saveAndContinueMeta = (e) => {
        e.preventDefault();
        this.props.nextStepMeta();
    }

    backMeta = (e) => {
        e.preventDefault();
        this.props.prevStepMeta();
    }

    render() {
        const { currentStepMeta: { currentStepMeta } } = this.props;

        return (
            <div>
                <Segment>
                    <div className="ui ordered fluid mini steps">
                        <div className="completed step">
                            <div className="content">
                                <div className="title">{this.props.currentStepMeta}</div>
                            </div>
                        </div>
                        <div className="completed step">
                            <div className="content">
                                <div className="title">Advanced Settings</div>
                            </div>
                        </div>
                        <div className="active step">
                            <div className="content">
                                <div className="title">Test Networks</div>
                            </div>
                        </div>
                        <div className="active step">
                            <div className="content">
                                <div className="title">Rinkeby</div>
                            </div>
                        </div>
                        <div className="active step">
                            <div className="content">
                                <div className="title">Receive Ether</div>
                            </div>
                        </div>
                    </div>
                </Segment>
            </div>

        );
    }
}

export default MetaIndicator;