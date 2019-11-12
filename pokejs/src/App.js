import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import './App.css';

const gridExamplesPage = () => {
  return (
  <MDBContainer>
    <MDBRow>
      <MDBCol md="4">.col-md-4</MDBCol>
      <MDBCol md="4">.col-md-4</MDBCol>
      <MDBCol md="4">.col-md-4</MDBCol>
    </MDBRow>
  </MDBContainer>
  );
  }
  
  export default gridExamplesPage;