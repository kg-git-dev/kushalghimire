import React, { Component } from "react";
import Layout from "../components/Layout";
import { Grid, Segment, Form, Button, Message, Image, Divider, Step, Icon } from 'semantic-ui-react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


class Welcome extends Component {
  componentDidMount() {
    const items = document.querySelectorAll('.item'),
      controls = document.querySelectorAll('.control'),
      headerItems = document.querySelectorAll('.item-header'),
      descriptionItems = document.querySelectorAll('.item-description'),
      activeDelay = .76,
      interval = 5000;

    let current = 0;

    const slider = {
      init: () => {
        controls.forEach(control => control.addEventListener('click', (e) => { slider.clickedControl(e) }));
        controls[current].classList.add('active');
        items[current].classList.add('active');
      },
      nextSlide: () => { // Increment current slide and add active class
        slider.reset();
        if (current === items.length - 1) current = -1; // Check if current slide is last in array
        current++;
        controls[current].classList.add('active');
        items[current].classList.add('active');
        slider.transitionDelay(headerItems);
        slider.transitionDelay(descriptionItems);
      },
      clickedControl: (e) => { // Add active class to clicked control and corresponding slide
        slider.reset();
        clearInterval(intervalF);

        const control = e.target,
          dataIndex = Number(control.dataset.index);

        control.classList.add('active');
        items.forEach((item, index) => {
          if (index === dataIndex) { // Add active class to corresponding slide
            item.classList.add('active');
          }
        })
        current = dataIndex; // Update current slide
        slider.transitionDelay(headerItems);
        slider.transitionDelay(descriptionItems);
        intervalF = setInterval(slider.nextSlide, interval); // Fire that bad boi back up
      },
      reset: () => { // Remove active classes
        items.forEach(item => item.classList.remove('active'));
        controls.forEach(control => control.classList.remove('active'));
      },
      transitionDelay: (items) => { // Set incrementing css transition-delay for .item-header & .item-description, .vertical-part, b elements
        let seconds;

        items.forEach(item => {
          const children = item.childNodes; // .vertical-part(s)
          let count = 1,
            delay;

          item.classList.value === 'item-header' ? seconds = .015 : seconds = .007;

          children.forEach(child => { // iterate through .vertical-part(s) and style b element
            if (child.classList) {
              item.parentNode.classList.contains('active') ? delay = count * seconds + activeDelay : delay = count * seconds;
              child.firstElementChild.style.transitionDelay = `${delay}s`; // b element
              count++;
            }
          })
        })
      },
    }

    let intervalF = setInterval(slider.nextSlide, interval);
    slider.init();
  }

  render() {


    return (
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
            </Grid.Column>
            <Grid.Column width={12}>
        <div class="slideshow-box">
          <div class="content-width">
            <div class="slideshow">

              <div class="slideshow-items">
                <div class="item">
                  <div class="item-image-container">
                    <img class="item-image" src="https://i.pinimg.com/564x/23/a4/86/23a4860b8b70b1eb27f2791b97aaee8e.jpg" />
                  </div>

                  <div class="item-header">
                    <span class="vertical-part"><b>N</b></span>
                    <span class="vertical-part"><b>i</b></span>
                    <span class="vertical-part"><b>k</b></span>
                    <span class="vertical-part"><b>e</b></span>
                  </div>

                  <div class="item-description">
                    <span class="vertical-part">
                      <b>Nike</b>
                    </span>
                    <span class="vertical-part">
                      <b>ipsum</b>
                    </span>
                    <span class="vertical-part">
                      <b>dolor</b>
                    </span>
                    <span class="vertical-part">
                      <b>sit</b>
                    </span>
                    <span class="vertical-part">
                      <b>amet,</b>
                    </span>
                    <span class="vertical-part">
                      <b>consectetur</b>
                    </span>
                    <span class="vertical-part">
                      <b>adipiscing</b>
                    </span>
                    <span class="vertical-part">
                      <b>elit.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Pellentesque</b>
                    </span>
                    <span class="vertical-part">
                      <b>elementum</b>
                    </span>
                    <span class="vertical-part">
                      <b>gravida</b>
                    </span>
                    <span class="vertical-part">
                      <b>ex</b>
                    </span>
                    <span class="vertical-part">
                      <b>at</b>
                    </span>
                    <span class="vertical-part">
                      <b>maximus.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Nullam</b>
                    </span>
                    <span class="vertical-part">
                      <b>quis</b>
                    </span>
                    <span class="vertical-part">
                      <b>leo</b>
                    </span>
                    <span class="vertical-part">
                      <b>ipsum.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Lorem</b>
                    </span>
                    <span class="vertical-part">
                      <b>ipsum</b>
                    </span>
                    <span class="vertical-part">
                      <b>Nam</b>
                    </span>
                    <span class="vertical-part">
                      <b>consectetur</b>
                    </span>
                    <span class="vertical-part">
                      <b>malesuada</b>
                    </span>
                    <span class="vertical-part">
                      <b>blandit.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Mauris</b>
                    </span>
                    <span class="vertical-part">
                      <b>vulputate</b>
                    </span>
                    <span class="vertical-part">
                      <b>purus</b>
                    </span>
                    <span class="vertical-part">
                      <b>id</b>
                    </span>
                    <span class="vertical-part">
                      <b>dolor</b>
                    </span>
                    <span class="vertical-part">
                      <b>euismod</b>
                    </span>
                    <span class="vertical-part">
                      <b>varius.</b>
                    </span>
                  </div>
                </div>
                <div class="item">
                  <div class="item-image-container">
                    <img class="item-image" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a1232e48702241.589f548dc6bee.jpg" />
                  </div>

                  <div class="item-header">
                    <span class="vertical-part"><b>S</b></span>
                    <span class="vertical-part"><b>p</b></span>
                    <span class="vertical-part"><b>o</b></span>
                    <span class="vertical-part"><b>t</b></span>
                    <span class="vertical-part"><b>i</b></span>
                    <span class="vertical-part"><b>f</b></span>
                    <span class="vertical-part"><b>y</b></span>
                  </div>

                  <div class="item-description">
                    <span class="vertical-part">
                      <b>Spotify</b>
                    </span>
                    <span class="vertical-part">
                      <b>ipsum</b>
                    </span>
                    <span class="vertical-part">
                      <b>dolor</b>
                    </span>
                    <span class="vertical-part">
                      <b>sit</b>
                    </span>
                    <span class="vertical-part">
                      <b>amet,</b>
                    </span>
                    <span class="vertical-part">
                      <b>consectetur</b>
                    </span>
                    <span class="vertical-part">
                      <b>adipiscing</b>
                    </span>
                    <span class="vertical-part">
                      <b>elit.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Pellentesque</b>
                    </span>
                    <span class="vertical-part">
                      <b>elementum</b>
                    </span>
                    <span class="vertical-part">
                      <b>gravida</b>
                    </span>
                    <span class="vertical-part">
                      <b>ex</b>
                    </span>
                    <span class="vertical-part">
                      <b>at</b>
                    </span>
                    <span class="vertical-part">
                      <b>maximus.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Nullam</b>
                    </span>
                    <span class="vertical-part">
                      <b>quis</b>
                    </span>
                    <span class="vertical-part">
                      <b>leo</b>
                    </span>
                    <span class="vertical-part">
                      <b>ipsum.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Lorem</b>
                    </span>
                    <span class="vertical-part">
                      <b>ipsum</b>
                    </span>
                    <span class="vertical-part">
                      <b>Nam</b>
                    </span>
                    <span class="vertical-part">
                      <b>consectetur</b>
                    </span>
                    <span class="vertical-part">
                      <b>malesuada</b>
                    </span>
                    <span class="vertical-part">
                      <b>blandit.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Mauris</b>
                    </span>
                    <span class="vertical-part">
                      <b>vulputate</b>
                    </span>
                    <span class="vertical-part">
                      <b>purus</b>
                    </span>
                    <span class="vertical-part">
                      <b>id</b>
                    </span>
                    <span class="vertical-part">
                      <b>dolor</b>
                    </span>
                    <span class="vertical-part">
                      <b>euismod</b>
                    </span>
                    <span class="vertical-part">
                      <b>varius.</b>
                    </span>
                  </div>
                </div>
                <div class="item">
                  <div class="item-image-container">
                    <img class="item-image" src="https://i2.wp.com/www.futuristarchitecture.com/wp-content/uploads/2016/11/fantastic-small-living-room-interior-idea-7.jpg?w=700&ssl=1" />
                  </div>

                  <div class="item-header">
                    <span class="vertical-part"><b>A</b></span>
                    <span class="vertical-part"><b>i</b></span>
                    <span class="vertical-part"><b>r</b></span>
                    <span class="vertical-part"><b>b</b></span>
                    <span class="vertical-part"><b>n</b></span>
                    <span class="vertical-part"><b>b</b></span>
                  </div>

                  <div class="item-description">
                    <span class="vertical-part">
                      <b>Airbnb</b>
                    </span>
                    <span class="vertical-part">
                      <b>ipsum</b>
                    </span>
                    <span class="vertical-part">
                      <b>dolor</b>
                    </span>
                    <span class="vertical-part">
                      <b>sit</b>
                    </span>
                    <span class="vertical-part">
                      <b>amet,</b>
                    </span>
                    <span class="vertical-part">
                      <b>consectetur</b>
                    </span>
                    <span class="vertical-part">
                      <b>adipiscing</b>
                    </span>
                    <span class="vertical-part">
                      <b>elit.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Pellentesque</b>
                    </span>
                    <span class="vertical-part">
                      <b>elementum</b>
                    </span>
                    <span class="vertical-part">
                      <b>gravida</b>
                    </span>
                    <span class="vertical-part">
                      <b>ex</b>
                    </span>
                    <span class="vertical-part">
                      <b>at</b>
                    </span>
                    <span class="vertical-part">
                      <b>maximus.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Nullam</b>
                    </span>
                    <span class="vertical-part">
                      <b>quis</b>
                    </span>
                    <span class="vertical-part">
                      <b>leo</b>
                    </span>
                    <span class="vertical-part">
                      <b>ipsum.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Lorem</b>
                    </span>
                    <span class="vertical-part">
                      <b>ipsum</b>
                    </span>
                    <span class="vertical-part">
                      <b>Nam</b>
                    </span>
                    <span class="vertical-part">
                      <b>consectetur</b>
                    </span>
                    <span class="vertical-part">
                      <b>malesuada</b>
                    </span>
                    <span class="vertical-part">
                      <b>blandit.</b>
                    </span>
                    <span class="vertical-part">
                      <b>Mauris</b>
                    </span>
                    <span class="vertical-part">
                      <b>vulputate</b>
                    </span>
                    <span class="vertical-part">
                      <b>purus</b>
                    </span>
                    <span class="vertical-part">
                      <b>id</b>
                    </span>
                    <span class="vertical-part">
                      <b>dolor</b>
                    </span>
                    <span class="vertical-part">
                      <b>euismod</b>
                    </span>
                    <span class="vertical-part">
                      <b>varius.</b>
                    </span>
                  </div>
                </div>
              </div>
              <div class="controls">
                <ul>
                  <li class="control" data-index="0"></li>
                  <li class="control" data-index="1"></li>
                  <li class="control" data-index="2"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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