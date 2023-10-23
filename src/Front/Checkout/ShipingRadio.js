import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addShiping } from "../../features/Cart/CartRedux";
import { useEffect } from "react";

function ShipingRadio() {
  const [value, setValue] = React.useState("free");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addShiping(value));
  }, [dispatch, value]);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <RadioGroup
      aria-label="gender"
      name="gender1"
      value={value}
      onChange={handleChange}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Radio value="free" size="small" color="primary" />
        <Typography variant="subtitle2">Free </Typography>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Radio value="emergency" size="small" color="primary" />
        <Typography variant="subtitle2">
          Emergency <span style={{ color: "#fd226fcf" }}> ৳20</span>
        </Typography>
      </div>
    </RadioGroup>
  );
}

export default ShipingRadio;
