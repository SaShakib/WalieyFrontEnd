import {
  Container,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import React from "react";


const useStyle = makeStyles((theme) => ({
  Paper: {
    backgroundColor: "#fafafa",
    padding: 16,
    justifyContent: "center",
    justifyItems: "center",
    borderRadius: 12,
    boxShadow: "0px 0px 20px #00000026",
  },
  paperContent: {
    margin: `12px 0px`,
    padding: "10px 12px",
    width: "100%",
    boxShadow: "0px 0px 20px #00000026",
    borderRadius: 12,
    display: "flex",
  },
  
}));
function ProductDescription(props) {
  const classes = useStyle();
  return (
    <Container component="main" maxWidth="md" >

        <Paper
          className={classes.paperContent}
          
          elevation={0}
        >
          <TextField
            InputProps={{
              disableUnderline: true,
            }}

            multiline
            placeholder="Product Description"
            fullWidth
            style={{ paddingLeft: 8, height: 200 }}
            variant="standard"
            onChange={(e) => props.description(e.target.value)}
          />
        </Paper>
        
    </Container>
  );
}

export default ProductDescription;
