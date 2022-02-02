import React from "react";
import { Carousel } from "react-bootstrap";
import first from "../../images/1.jpg"
import second from "../../images/2.jpg"
import third from "../../images/3.jpg"

function CarouselPics() {
  return (
    <>
      <Carousel className="my-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100 img-container"
            src={first}
            alt="First slide"
            loading="lazy"
          />
          <Carousel.Caption>
            {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={second}
            alt="Second slide"
            loading="lazy"
          />

          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={third}
            alt="Third slide"
            loading="lazy"
          />

          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default CarouselPics;
