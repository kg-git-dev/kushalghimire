import React, { Component } from "react";
import Layout from "../components/Layout";
import { Grid, Segment, Form, Button, Message, Image, Divider, Step, Icon } from 'semantic-ui-react';



class CyberTruck extends Component {
    state = {
        activated: false,
    }

    componentDidMount() {
        const items = document.querySelectorAll('.item-custom-created'),
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
                    let count = 5,
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

    initializeContract = (e) => {
        this.props.saveAndContinue();
        this.setState({activated: true})
    }

    render() {


        return (
            <Layout>
                <div className="slideshow-box">
                    <div className="content-width">
                        <div className="slideshow">

                            <div className="slideshow-items">
                                <div className="item-custom-created">
                                    <div className="item-image-container">
                                        <img className="item-image" src="https://tesla-cdn.thron.com/delivery/public/image/tesla/c834642e-bd02-47d1-a16d-eddabd15ddb8/bvlatuR/std/1251x704/Cybertruck-Order-Hero-Global" />
                                    </div>

                                    <div className="item-header">
                                        <span className="vertical-part"><b>o</b></span>
                                        <span className="vertical-part"><b>n</b></span>
                                        <span className="vertical-part"><b>e</b></span>
                                        <span className="vertical-part"><b>-</b></span>
                                        <span className="vertical-part"><b>c</b></span>
                                        <span className="vertical-part"><b>l</b></span>
                                        <span className="vertical-part"><b>i</b></span>
                                        <span className="vertical-part"><b>c</b></span>
                                        <span className="vertical-part"><b>k</b></span>
                                        <span className="vertical-part"><b>-</b></span>
                                        <span className="vertical-part"><b>p</b></span>
                                        <span className="vertical-part"><b>u</b></span>
                                        <span className="vertical-part"><b>r</b></span>
                                        <span className="vertical-part"><b>c</b></span>
                                        <span className="vertical-part"><b>h</b></span>
                                        <span className="vertical-part"><b>a</b></span>
                                        <span className="vertical-part"><b>s</b></span>
                                        <span className="vertical-part"><b>e</b></span>
                                    </div>

                                    <div className="item-description">
                                        <span className="vertical-part">
                                            <b>Sign&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>the&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>contract&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>and&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>pay&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>with&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>a&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>click.</b>
                                        </span>
                                    </div>
                                </div>
                                <div className="item-custom-created">
                                    <div className="item-image-container">
                                        <img className="item-image" src="https://tesla-cdn.thron.com/delivery/public/image/tesla/ce5cb47c-7cc0-4ddb-8e1e-a5f8b8deec35/bvlatuR/std/2800x1400/Cybertruck-Slide1-D-Carousel-New" />
                                    </div>

                                    <div className="item-header">
                                        <span className="vertical-part"><b>f</b></span>
                                        <span className="vertical-part"><b>l</b></span>
                                        <span className="vertical-part"><b>e</b></span>
                                        <span className="vertical-part"><b>x</b></span>
                                        <span className="vertical-part"><b>i</b></span>
                                        <span className="vertical-part"><b>b</b></span>
                                        <span className="vertical-part"><b>l</b></span>
                                        <span className="vertical-part"><b>e</b></span>
                                        <span className="vertical-part"><b>-</b></span>
                                        <span className="vertical-part"><b>p</b></span>
                                        <span className="vertical-part"><b>a</b></span>
                                        <span className="vertical-part"><b>y</b></span>
                                        <span className="vertical-part"><b>m</b></span>
                                        <span className="vertical-part"><b>e</b></span>
                                        <span className="vertical-part"><b>n</b></span>
                                        <span className="vertical-part"><b>t</b></span>
                                        <span className="vertical-part"><b>s</b></span>
                                    </div>

                                    <div className="item-description">
                                        <span className="vertical-part">
                                            <b>Skip&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>upto&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>2&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>installments&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>in&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>6&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>months.</b>
                                        </span>
                                    </div>
                                </div>
                                <div className="item-custom-created">
                                    <div className="item-image-container">
                                        <img className="item-image" src="https://www.tesla.com/xNVh4yUEc3B9/08_Desktop.jpg" />
                                    </div>

                                    <div className="item-header">
                                        <span className="vertical-part"><b>f</b></span>
                                        <span className="vertical-part"><b>u</b></span>
                                        <span className="vertical-part"><b>l</b></span>
                                        <span className="vertical-part"><b>l</b></span>
                                        <span className="vertical-part"><b>-</b></span>
                                        <span className="vertical-part"><b>c</b></span>
                                        <span className="vertical-part"><b>o</b></span>
                                        <span className="vertical-part"><b>v</b></span>
                                        <span className="vertical-part"><b>e</b></span>
                                        <span className="vertical-part"><b>r</b></span>
                                        <span className="vertical-part"><b>a</b></span>
                                        <span className="vertical-part"><b>g</b></span>
                                        <span className="vertical-part"><b>e</b></span>
                                    </div>

                                    <div className="item-description">


                                        <span className="vertical-part">
                                            <b>Fully&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>insured&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>for&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>the&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>first&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>6&nbsp;</b>
                                        </span>
                                        <span className="vertical-part">
                                            <b>months.</b>
                                        </span>

                                    </div>
                                </div>
                            </div>
                            <div className="buy-now-button">
                                <Button className='' onClick={this.initializeContract} disabled={this.state.activated} positive icon labelPosition='right'><Icon name='right arrow' />let-me-get-it-now</Button>
                            </div>
                            <div className="controls">
                                <ul>
                                    <li className="control" data-index="0"></li>
                                    <li className="control" data-index="1"></li>
                                    <li className="control" data-index="2"></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        );
    }
}
export default CyberTruck;