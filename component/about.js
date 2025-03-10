import React from "react";
import Header from "./Header";
import Footer from "./footer";

const About = () => {
  return (

    <>
  <Header/>
    <section className="container p-3  about">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2 className="fw-bold">About AlgoScope</h2>
          <p className="text-muted">
            AlgoScope is a powerful visualization tool designed to help students
            and professionals understand Data Structures and Algorithms
            interactively. With intuitive animations and real-time execution, it
            makes learning complex concepts easier and more engaging.
          </p>
          <p className="text-muted">
            Our mission is to bridge the gap between theoretical knowledge and
            practical implementation, making algorithmic learning fun,
            efficient, and accessible to all.
          </p>
        </div>
       
      </div>
    </section>
<Footer/>
    </>
  );
};

export default About;
