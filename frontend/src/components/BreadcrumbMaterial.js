import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import styled from "styled-components";
// import Link from "@mui/material/Link";

const BreadcrumbMaterial = ({ children }) => {
  return (
    <Wrapper role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {/* <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Core
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/components/breadcrumbs/"
          aria-current="page"
        >
          Breadcrumbs
        </Link> */}
        {children}
      </Breadcrumbs>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  a {
    font-family: "Poppins", sans-serif;
  }
`;

export default BreadcrumbMaterial;
