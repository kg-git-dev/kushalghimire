import React, { Component } from "react";
import Layout from "../components/Layout";
import { Grid, Segment, Form, Button, Message, Image, Divider, Step, Icon } from 'semantic-ui-react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


class Welcome extends Component {

  render() {
    const images = [
      "https://tesla-cdn.thron.com/delivery/public/image/tesla/c834642e-bd02-47d1-a16d-eddabd15ddb8/bvlatuR/std/1251x704/Cybertruck-Order-Hero-Global",
      "https://tesla-cdn.thron.com/delivery/public/image/tesla/ce5cb47c-7cc0-4ddb-8e1e-a5f8b8deec35/bvlatuR/std/2800x1400/Cybertruck-Slide1-D-Carousel-New",
      "https://www.tesla.com/xNVh4yUEc3B9/08_Desktop.jpg",
      "https://www.tesla.com/xNVh4yUEc3B9/09_Desktop.jpg",
    ];

    return (
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
            </Grid.Column>
            <Grid.Column width={12}>
              <Slide autoplay={false}>
                <div className="each-slide-effect">
                  <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                    <span><Button>One Click Contract</Button></span>
                  </div>
                </div>
                <div className="each-slide-effect">
                  <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                    <span>Buy yours now with one click</span>
                    <span><Button>One Click Contract</Button></span>
                  </div>
                </div>
                <div className="each-slide-effect">
                  <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                    <span>Slide 3</span>
                  </div>
                </div>
                <div className="each-slide-effect">
                  <div style={{ 'backgroundImage': `url(${images[3]})` }}>
                    <span>Slide 4</span>
                  </div>
                </div>
              </Slide>
            </Grid.Column>
            <Grid.Column width={2}>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}
export default Welcome;