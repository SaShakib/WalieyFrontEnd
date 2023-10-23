import { Typography } from "@material-ui/core";
import React from "react";

import TopCategory from "../../Layout/Card/TopCategory";

function CategoryIndex(props) {
  const { categories } = props;
  if (categories) {
    var category = categories.map((cat, key) => (
      <TopCategory
        key={cat._id.toString()}
        name={cat.name}
        id={cat._id}
        img={cat.categoryImage}
      />
    ));
  }
  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        display="block"
        align="center"
        color="secondary"
        style={{
          fontStyle: "italic",
          textTransform: "uppercase",
          marginBottom: 20,
          
        }}
      >
        FEATURED CATEGORIES
      </Typography>
      <Typography
        variant="body2"
        style={{ fontStyle: "italic", textTransform: "uppercase" , marginBottom: 20, }}
        gutterBottom
        
        align="center"
        
        color="secondary"
      >
        Here are the Top Categories Listed For you. Select One of them and
        Discover Some Awesome Products
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 10,
          margin: 10,
          flexWrap: "wrap",
        }}
      >
        {category}
      </div>
    </div>
  );
}

export default CategoryIndex;
