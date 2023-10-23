import { Container } from "@material-ui/core";
import React from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import BottomNavigationIndex from "../BottomNavigation/BottomNavigation.index";
import AdminAddSize from "./AdminAddSize";
import AdminSizeList from "./AdminSizeList";

function AdminSizeIndex() {
  return (
    <div>
      <AdminHeader />
      <BottomNavigationIndex />

      <Container
        component="main"
        maxWidth="xs"
        style={{ paddingRight: 4, paddingLeft: 4, marginBottom: "90px" }}
      >
        <AdminAddSize />
        <AdminSizeList />
      </Container>
    </div>
  );
}

export default AdminSizeIndex;
