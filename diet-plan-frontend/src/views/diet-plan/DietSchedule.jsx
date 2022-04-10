import React, { useEffect, useState } from "react";

import axios from "../../shared/axios";

import urls from "../../shared/urls";

import Button from "@material-ui/core/Button";
import moment from "moment";

function DietSchedule(props) {
  const [dietSchedule, setDietSchedule] = useState(null);

  const ChangeDietScheduleStatus = (schedule_id) => {
    axios
      .post(urls.diet.updateDietSchedule(schedule_id))
      .then((response) => {
        console.log("response updateDietSchedule**********", response.data);
        setDietSchedule(null)
      })
      .catch((err) => {
        console.log("err updateDietSchedule***********", err.response.data);
      });
  };

  useEffect(() => {
    
    getDietSchedule()
  }, [dietSchedule]);


  const getDietSchedule =()=>{
    const user_id = JSON.parse(localStorage.getItem("user_info")).userInfo.id;

    axios
      .get(urls.diet.getDietSchedule(user_id))
      .then((response) => {
        console.log("response  getDietSchedule*********", response.data);
        setDietSchedule(response.data.data.schedule[0]);
      })
      .catch((err) => {
        console.log("err getDietSchedule********", err.response.data);
      });
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <h2>Your Diet Schedule</h2>
        </div>

        {dietSchedule !== null ? (
          <div className="row mt-4">
            <div className="col-md-12">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Serial No.</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Diet Type</th>
                    <th scope="col">Timing</th>
                    <th scope="col">Status</th>
                    <th scope="col">update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dietSchedule.map((val, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index}</th>
                        <td>{val.item_name}</td>
                        <td>{val.diet_type}</td>
                        <td>
                          {moment(val.diet_time).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </td>
                        <td>{val.status ? "completed" : "not-completed"}</td>
                        <td>
                          {" "}
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              ChangeDietScheduleStatus(val.schedule_id);
                            }}
                          >
                            Mark as complete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            <p>Loading.......</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DietSchedule;
