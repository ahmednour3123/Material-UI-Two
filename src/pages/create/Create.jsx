import { Box, Button, InputAdornment, TextField, styled } from "@mui/material";
import "./Create.css";
import { useState } from "react";
import { purple } from "@mui/material/colors";
import { ChevronRight } from "@mui/icons-material";
import { Navigate, useNavigate, useNavigationType } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  // @ts-ignore
  backgroundColor: theme.palette.ahmed.main,
  "&:hover": {
    // @ts-ignore
    backgroundColor: theme.palette.ahmed.main,
    scale: "0.99",
  },
}));

const Create = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ price, title }) => {
    price =Number(price)

    fetch("http://localhost:3000/mydata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price, title }),
    }).then(() => {
      navigate("/");
    });
  };

  // Why <<<component="form">>> ?
  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      {...register("title")}
      autoComplete="off"
      sx={{ width: "380px" }}
      component="form"
    >
      <TextField
        onChange={(eo) => {
          // settitle(eo.target.value)
        }}
        fullWidth={true}
        label="Transaction Title"
        sx={{ mt: "22px", display: "block" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">👉</InputAdornment>,
        }}
        variant="filled"
        {...register("title", {
          required: { value: true, message: "Incorrect entry" },
          minLength: { value: 3, message: "minumn length is 3" },
        })}
        error={Boolean(errors.title)}
        helperText={Boolean(errors.title) ? errors.title?.message.toString() : null}
      />

      <TextField
        //    error={}
        {...register("price", { required: {value:true,message:"required filed"} })}
        // error={}
        fullWidth={true}
        label="Amount"
        id="filled-start-adornment"
        sx={{ mt: "22px", display: "block" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        variant="filled"
        type="number"
        error={Boolean(errors.price)}
        helperText={Boolean(errors.price) ? errors.price?.message.toString() : null}
      />

      <ColorButton
        type="submit"
        onClick={() => {}}
        sx={{ mt: "22px" }}
        variant="contained"
      >
        Submit <ChevronRight />
      </ColorButton>
    </Box>
  );
};

export default Create;
