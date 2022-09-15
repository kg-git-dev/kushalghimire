import React, { Component } from "react";
// import MultipleSteps from "../components/MultiSteps";
import Layout from "../components/Layout";
import MultiStep from "../components/MultiStep";
import { Grid, Image } from 'semantic-ui-react';

class Knock extends Component {    
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
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
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    return (
        <Layout>
          <div>
            <Grid>
              <Grid.Row>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={10}>
                  {this.state.width}
                  <MultiStep />
                </Grid.Column>
                <Grid.Column width={3}>
                </Grid.Column>
              </Grid.Row>
            </Grid>
        </div>
      </Layout>
    );
  }
}
export default Knock;