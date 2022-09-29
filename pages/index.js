import React, { Component } from "react";
import Layout from "../components/Layout";
import { Grid } from 'semantic-ui-react';
import WelcomeMultiStep from "../components/WelcomeMultiStep";
import { Helmet } from 'react-helmet';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { step: '' };
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
          <>
            <Helmet>
              <title>Kushal Ghimire - Web SEO and Technical Marketing</title>
              <meta
                name="description"
                content="Welcome to kushalghimire.com. Learn more about me or try a web3 demonstration."
              />
              <meta name="og-title" content="kushalghimire.com" />
              <meta name="og-description" content="Welcome to kushalghimire.com" />
              <meta id="og-image" property="og:image" content="https://kushalghimire.vercel.app/kushal_profile_pic.png" />
            </Helmet>
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
          </>
        );

      case 'Mobile':
        return (
          <>
            <Helmet>
              <title>Kushal Ghimire - Web SEO and Technical Marketing</title>
              <meta
                name="description"
                content="Welcome to kushalghimire.com. Learn more about me or try a web3 demonstration."
              />
              <meta property='og:title' content='Welcome to kushalghimire.com' />
              <meta property='og:image' content='https://kushalghimire.vercel.app/kushal_profile_pic.png' />
              <meta property='og:description' content='Learn more about me or try a web3 demonstration' />
              <meta property='og:url' content='https://kushalghimire.com/' />
            </Helmet>
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
          </>
        );
      default:
        return (
          <>
            <Helmet>
              <title>Kushal Ghimire - Web SEO and Technical Marketing</title>
              <meta
                name="description"
                content="Welcome to kushalghimire.com. Learn more about me or try a web3 demonstration."
              />
              <meta name="og-title" content="kushalghimire.com" />
              <meta name="og-description" content="Welcome to kushalghimire.com" />
              <meta id="og-image" property="og:image" content="https://kushalghimire.vercel.app/kushal_profile_pic.png" />
            </Helmet>
            <Layout/>
          </>
        );
    }
  }
}

export default HomePage;