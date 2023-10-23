import { Container } from "@material-ui/core";
import React from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import BottomNavigationIndex from "../BottomNavigation/BottomNavigation.index";

import AdminColorList from "./AdminColorList";

function AdminColorIndex() {
  return (
    <div>
      <AdminHeader />
      <BottomNavigationIndex />
      <Container
        component="main"
        maxWidth="xs"
        style={{ paddingRight: 4, paddingLeft: 0 }}
      >
        
        <AdminColorList />
      </Container>
    </div>
  );
}

export default AdminColorIndex;
