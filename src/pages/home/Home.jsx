import { Box } from "@mui/system";
import "./Home.css";
import React, { useState } from "react";
import { Paper, Typography, IconButton,   } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useEffect } from "react";

const Home = () => {
  const [mydata, setdata] = useState([])


 useEffect(() => {

  
  async function logMovies() {
    const response = await fetch("http://localhost:3000/mydata");
    const movies = await response.json();
    setdata(movies)
  }
  logMovies()


},[]);


const [total, settotal] = useState(0)
let totalprice=0
  return (
    <Box>

      {mydata.map((item) => {
        totalprice+=item.price
        return(
          <Paper
          key={item.id}
        sx={{
          position: "relative",
          width: "366px",
          display: "flex",
          justifyContent: "space-between",
          mt: "22px",
          pt: "27px",
          pb: "7px",
        }}
      >
        <Typography sx={{ ml: "16px", fontSize: "1.3em" }} variant="h6">
        {item.title}
        </Typography>
        <Typography
          sx={{
            mr: "33px",
            fontWeight: 500,
            fontSize: "1.4em",
            opacity: "0.8",
          }}
          variant="h6"
        >
        {item.price}
        </Typography>

        <IconButton onClick={() => {
          fetch(`http://localhost:3000/mydata/${item.id}`,{method:'DELETE'})


          const newArr=mydata.filter((myobj) => {
            return myobj.id !== item.id
          })
          setdata(newArr)


        }} 
        
        sx={{ position: "absolute", top: "0", right: "0" }}>

          <Close  sx={{ fontSize: "20px" }} />
        </IconButton>
      </Paper>
        )
      }
        )}
      <Typography variant="body1" >
        You Spend ${totalprice}
      </Typography>
 
    </Box>
  );
};

export default Home;
