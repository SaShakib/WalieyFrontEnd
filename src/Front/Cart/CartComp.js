import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import React from "react";
import { useDispatch } from "react-redux";
import ClearIcon from "@material-ui/icons/Clear";
import { addQuantity, decreaseQuantity, removeCart } from "../../features/Cart/CartRedux";
function CartComp(props) {
  const dispatch = useDispatch();
  return (
    <div style={{ padding: 15 }}>
      <Typography variant="h6" align="center" gutterBottom>
        CART ITEMS
      </Typography>
      <TableContainer
        style={{
          background: "#ffffff",
          boxShadow: "0px 0px 10px #00000026",
          borderRadius: 12,
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>

              <TableCell align="center">Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.item && props.item.length
              ? props.item.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: 0,
                      }}
                    >
                      <IconButton onClick={() => dispatch(removeCart({id: item._id}))}><ClearIcon/></IconButton>
                      <img
                        src={item.img}
                        alt="Nothing"
                        width="60px"
                        height="60px"
                      />
                      <Typography
                        color="secondary"
                        variant="h6"
                        style={{
                          paddingLeft: 8,
                          fontStyle: "italic",
                        }}
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        color="secondary"
                        variant="body2"
                        style={{
                          paddingLeft: 4,
                          fontStyle: "italic",
                        }}
                      >
                        {item.color ? `- ${item.color}` : null}{" "}
                        {item.size ? `- ${item.size}` : null}
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="center"
                      color="secondary"
                      style={{ border: 0 }}
                    >
                      <IconButton
                        onClick={() => dispatch(addQuantity({ id: item._id }))}
                      >
                        <AddIcon color="secondary" />
                      </IconButton>
                      {item.quantity}
                      <IconButton
                        onClick={() =>
                          dispatch(decreaseQuantity({ id: item._id }))
                        }
                      >
                        <RemoveIcon color="secondary" />
                      </IconButton>
                    </TableCell>

                    <TableCell color="secondary" style={{ border: 0 }}>
                    ৳{item.price}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CartComp;
