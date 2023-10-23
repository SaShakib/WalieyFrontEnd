import { Tab, Tabs, Typography } from "@material-ui/core";
import React from "react";
import BestSeller from "./BestSeller/BestSeller";
import Featured from "./Featured/Featured";

function ProductsIndex(props) {
  const { bestseller, featured } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <br />
      <Typography variant="h5" gutterBottom display="block" style={{
          fontStyle: "italic",
          textTransform: "uppercase",
          marginBottom: 20,
        }} align="center">
        FEATURED PRODUCTS
      </Typography>
      <Typography
        variant="body2"
        style={{ fontStyle: "italic", textTransform: "uppercase",  }}
        gutterBottom
        display="block"
        align="center"
        color="secondary"
      >
        Here we have Listed best sellers and Featured products For find out more
        values For you
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="BEST SELLER" />
        <Tab label="FEATURED" />
      </Tabs>
      {value === 0 && <BestSeller bestseller={bestseller} />}
      {value === 1 && <Featured featured={featured} />}
      <br />
      <br />
    </div>
  );
}

export default ProductsIndex;
