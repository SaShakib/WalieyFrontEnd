import { Container } from "@material-ui/core";
import React from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import BottomNavigationIndex from "../BottomNavigation/BottomNavigation.index";

import AdminCategoryList from "./AdminCategoryList";

function AdminCategoryIndex() {
  return (
    <div>
      <AdminHeader />
      <BottomNavigationIndex />

      <Container
        component="main"
        maxWidth="xs"
        style={{ paddingRight: 4, paddingLeft: 4 }}
      >
       
        <AdminCategoryList />
      </Container>
    </div>
  );
}

export default AdminCategoryIndex;
