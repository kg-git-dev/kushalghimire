import React, { Component } from "react";
import Layout from "../components/Layout";
import { Grid } from 'semantic-ui-react';
import WelcomeMultiStep from "../components/WelcomeMultiStep";


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 'Desktop' };
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
    if (window.innerWidth >= 768) {
      this.setState({ step: 'Desktop' })
    } else {
      this.setState({ step: 'Mobile' })
    }
  }

  render() {
    const { step } = this.state;

    switch (step) {
      case 'Desktop':
        return (
          <Layout>
            <div>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={2}>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <br /><br /><br />
                    <WelcomeMultiStep deviceType="desktop" />
                    <br /><br />
                  </Grid.Column>
                  <Grid.Column width={2}>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Layout>
        );

      case 'Mobile':
        return (
          <Layout>
            <div>
              <Grid>
                <Grid.Row>
                  <Grid.Column>
                  <WelcomeMultiStep deviceType="mobile" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Layout>
        );
      default:
        return (
          <div>
          </div>
        );
    }
  }
}

export default HomePage;