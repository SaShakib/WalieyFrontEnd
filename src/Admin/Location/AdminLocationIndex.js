import { Container } from "@material-ui/core";
import React from "react";
import AdminHeader from "../AdminHeader/AdminHeader";
import BottomNavigationIndex from "../BottomNavigation/BottomNavigation.index";
import AdminLocationCreate from "./AdminLocationCreate";
import AdminLocationList from "./AdminLocationList";

function AdminLocationIndex() {
  return (
    <div>
      <AdminHeader />
      <BottomNavigationIndex />
      <Container
        component="main"
        maxWidth="xs"
        style={{ paddingRight: 4, paddingLeft: 4, marginBottom: "90px" }}
      >
        <AdminLocationCreate />
        <AdminLocationList style={{ paddingRight: 4, paddingLeft: 4}}/>
      </Container>
    </div>
  );
}

export default AdminLocationIndex;
