import { Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getlocation } from "../../../features/Utils/index_location";
import LocationCard from "../../Layout/Card/Locations";

function LocationIndex() {
  const state = useSelector((state) => state.location);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getlocation());
  }, [dispatch]);

  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        style={{
          fontStyle: "italic",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
        display="block"
        align="center"
        color="secondary"
      >
        Locations
      </Typography>
      <Typography
        variant="body2"
        style={{
          fontStyle: "italic",
          textTransform: "uppercase",
          marginBottom: 20,
        }}
        gutterBottom
        display="block"
        align="center"
        color="secondary"
      >
        Waliey Dedicately give Survices on Those Locations. <br />
        Check Avaiable Shops Near Your Location
      </Typography>
      {state.loading === true ? (
        <div className="">loading</div>
      ) : (
        <Grid
          container
          justify="center"
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {state.loading === false && state.locations
            ? state.locations.map((location, key) => (
                <Grid
                  key={key}
                  item
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <LocationCard {...location} />
                </Grid>
              ))
            : null}
        </Grid>
      )}
    </div>
  );
}

export default LocationIndex;
