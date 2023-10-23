import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TopCategory } from "../../../features/Category/category_index";
import HeaderNavigation from "./navigation";
import NavLinks from "./NavLinks";

function HeaderIndex() {
  const dispatch = useDispatch();
  const initial = useCallback(() => {
    dispatch(TopCategory());
  }, [dispatch]);
  useEffect(() => {
    initial();
  }, [initial]);
  return (
    <div className="header">
      <HeaderNavigation />
      <NavLinks />
    </div>
  );
}

export default HeaderIndex;
