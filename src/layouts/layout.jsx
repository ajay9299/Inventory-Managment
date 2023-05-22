import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import React from "react";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <>
      <MenuBar />
      <PageHeading />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
