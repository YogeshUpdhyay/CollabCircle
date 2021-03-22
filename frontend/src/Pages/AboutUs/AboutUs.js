import React from "react";
import "./AboutUs.css";
import NavBar from "../../components/Layout/NavBar/NavBar";
import Banner from "../../components/Layout/Banner/Banner_AboutUs";
import Footer from "../../components/Layout/Footer/index";

export default function Homepage() {
  return (
    <div>
      <NavBar />
      <Banner />
      <div className="Container">
        <br></br>
        <h1 className="heading"> About Us </h1>
        <br></br>
        <p className="info">
          When a student finishes learning a new thing, he/she tries to build a
          project and most of them fail to complete it and move on to something
          else without putting their knowledge to practice. CollabCircle is a
          project collaboration WebApp where any student irrespective of which
          college they attend will be able to team up and work on a project
          related to any technological fields be it Data Science, Machine
          Learning, Web Development etc. with the perfect partner(s). 
          <br></br>
          CollabCircle
          will also let students form a group of people who will be taking the
          same course which in turn will help in better understanding of the
          concepts as they will be able to clear their doubts immediately. This
          will also make sure that a person stays motivated to learn and gain
          knowledge by interacting with their peers. These days it is tough to
          find a mentor who will be able to guide a student on the right path
          and stop him/her from committing the mistakes he did during his
          journey thus saving the time of a student. A student becomes a mentor
          once he does enough projects and helps other students in the
          discussion forum. This is basically an all-in-one platform for any
          student to learn and improve their skill set as well as work on more
          productive projects with their perfect partner.
        </p>
      </div>
      <Footer>
        <Footer.Wrapper>
          <Footer.Row>
            <Footer.Column>
              <Footer.Title>About Us</Footer.Title>
              <Footer.Link href="#">Story</Footer.Link>
              <Footer.Link href="#">Projects</Footer.Link>
              <Footer.Link href="#">Chat Rooms</Footer.Link>
            </Footer.Column>
            <Footer.Column>
              <Footer.Title>Services</Footer.Title>
              <Footer.Link href="#">Projects</Footer.Link>
              <Footer.Link href="#">Practice</Footer.Link>
              <Footer.Link href="#">Code</Footer.Link>
            </Footer.Column>
            <Footer.Column>
              <Footer.Title>Contact Us</Footer.Title>
              <Footer.Link href="#">Coming Soon</Footer.Link>
              <Footer.Link href="#">Coming Soon</Footer.Link>
              <Footer.Link href="#">Coming Soon</Footer.Link>
            </Footer.Column>
          </Footer.Row>
        </Footer.Wrapper>
      </Footer>
    </div>
  );
}
