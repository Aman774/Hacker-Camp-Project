import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@mui/material/MenuItem';
import "./css/CreateDiet.css";

import Button from "@material-ui/core/Button";

// import axios from "axios";

import axios from '../../shared/axios'
import urls from "../../shared/urls";

const useStyles = makeStyles((theme) => ({
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 120,
  // },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function CreateDiet(props) {
  const [dietTypeList, setDietTypeList] = useState(null);

  const classes = useStyles();
  const [dietType, setDietType] = useState("");
  const [itemName,setItemName] =useState("");
  const [scheduleDate,setScheduleDate] =useState("");

  const [recommededItemList,setRecommededItemList] = useState(null)
  const [recommededItem,setRecommededItem] = useState("")

  useEffect(() => {
    axios
      .get(urls.diet.getAllDietTypes)
      .then((response) => {
        console.log("response getAllDietTypes*************", response);
        setDietTypeList(response.data.data);
      })
      .catch((err) => {
        console.log("err getAllDietTypes********", err);
      });
  }, []);


  const handleChange = (event) => {
    console.log("diet_type change", event.target.value);
    setDietType(event.target.value);

  
    axios.get(urls.diet.recommededItems(event.target.value)).then(response=>{
        console.log("response recommended items **********",response.data)
        setRecommededItemList(response.data.data.recommendedItems[0])

    }).catch(err=>{
        console.log("error  recommended items**********",err.response.data)
    })
    


    
  };

  const handleChangeRecommeded=(e)=>{

    console.log("recommended item" ,e.target.value )

    setRecommededItem(e.target.value)

  const recommended_item=  recommededItemList.filter((obj)=>{
      console.log(obj)
   
        if(obj.recommended_item_id==e.target.value){
           
            return {
                id:obj.recommended_item_id,
                recommended_item_name :obj.recommended_item_name}
        }
        
    })

    console.log("recommended item name *******",recommended_item[0].recommended_item_name)

    setItemName(recommended_item[0].recommended_item_name)

  }

  const handleItemNameChange=(e)=>{
      console.log("handleItemNameChange****",e.target.value)

    setItemName(e.target.value)
    setRecommededItem("")
  }

  const handleDietScheduleChange=(e)=>{
      console.log("*******handleDietScheduleChange******",e.target.value)
      setScheduleDate(e.target.value)
  }

  const saveDietSchedule =()=>{
      
     const data ={user_id:JSON.parse(localStorage.getItem("user_info")).userInfo.id,
     item_name :itemName,
     diet_type_id:dietType,
     diet_time:scheduleDate,
     recommended_item_id:recommededItem==""?null:recommededItem,
     recommended :recommededItem==""?false:true}


     console.log("data on saving schedule*******",data);
     axios.post(urls.diet.saveDietSchedule,data).then(response=>{
         console.log("saveDietSchedule response*******",response.data)
     }).catch(err=>{
         console.log("saveDietSchedule error********",err)
     })

  }


  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="diet-head">Create Diet</h2>
          </div>
        </div>

        <br></br>
        <br></br>

        <div className="row">
          <div className="col-lg-2">
    
         <p> Select Diet Type </p>
            <FormControl variant="outlined" className={classes.formControl}>
              {/* <InputLabel htmlFor="outlined-age-native-simple">
                Diet Type
              </InputLabel> */}
              <Select
                native
                value={dietType}
                onChange={handleChange}
                label="Diet Type"
              >
                {dietTypeList !== null ? (
                  dietTypeList.map((val, index) => {
                    return (
                        
                      <option key={index} value={val.id} name={val.diet_type}>
                        {val.diet_type}
                      </option>
                    );
                  })
                ) : (
                  <option value="">None</option>
                )}
              </Select>
            </FormControl>
          </div>


          <div className="col-lg-2">

          <p> Select Recommended Item </p>
            <FormControl variant="outlined" className={classes.formControl}>
              {/* <InputLabel htmlFor="outlined-age-native-simple">
                Diet Type
              </InputLabel> */}
              <Select
                native
                value={recommededItem}
                onChange={handleChangeRecommeded}
                label="Recommended Diet "
              >
                {recommededItemList !== null ? (
                  recommededItemList.map((val, index) => {
                    return (
                      <option key={index} value={val.recommended_item_id} >
                        {val.recommended_item_name}
                      </option>
                    );
                  })
                ) : (
                  <option value="">None</option>
                )}
              </Select>
            </FormControl>
          </div>




          <div className="col-lg-2">
              <p> Or Enter Item Manually </p>
            <TextField
              id="outlined-basic"
              label="Item name"
              variant="outlined"
             
              onChange={handleItemNameChange}
            />
          </div>

          <div className="col-lg-3">
          <p> Select Diet Time </p>
            <TextField
              id="datetime-local"
              label="diet Schedule"
              type="datetime-local"
              defaultValue="2022-04-01T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleDietScheduleChange}
            />
          </div>

          <div className="col-lg-3">
              <p>click below to save schedule</p>
            <Button variant="contained" color="primary" onClick={saveDietSchedule} >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDiet;
