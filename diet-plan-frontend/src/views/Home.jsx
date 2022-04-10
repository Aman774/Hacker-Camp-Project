import React from "react";

import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import "./Home.css";
import { Link } from "react-router-dom";
function Home(props) {
  return (
    <div>
      {/* {JSON.parse(localStorage.getItem("user_info")).details.active ===
      false ? (
        <PasswordReset></PasswordReset>
      ) : (
        <div>Hi this is home screen of rapipay</div>
      )} */}

      <div className="container">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",

            "& > :not(style)": {
              m: 4,
              width: 180,
              height: 180,
            },
          }}
        >
          <Link to="/createDiet">
            <Paper elevation={3}>
              <div className="row">
                <div className="col-lg-12 paper-prop ">
                  <h5 className="paper-head">Create Diet</h5>
                </div>
              </div>
            </Paper>{" "}
          </Link>

          <Link to="/dietSchedule">
            <Paper elevation={3}>
              <div className="row">
                <div className="col-lg-12 paper-prop ">
                  <h5 className="paper-head">See Your Diet Schedule</h5>
                </div>
              </div>
            </Paper>{" "}
          </Link>

          <Link to="/bmi">
            <Paper elevation={3}>
              <div className="row">
                <div className="col-lg-12 paper-prop ">
                  <h5 className="paper-head">Check BMI</h5>
                </div>
              </div>
            </Paper>{" "}
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default Home;
