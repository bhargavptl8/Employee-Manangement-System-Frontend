import React, { useState } from 'react'
import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

import { toast } from 'react-toastify';

const ForgetPassword = ({verifyEmail, setIsLogin, setIsEmailVerify, setIsOTPVerify }) => {

  const [showPassword, setShowPassword] = useState({
    confirmPassword: false,
    Re_confirmPassword: false
  });

  // console.log(verifyEmail);

  const [initialValues, setInitialValues] = useState({
    confirmPassword: '',
    Re_confirmPassword: ''
  });

  const handleClickShowPassword = (filed) => {

    setShowPassword((prev) => ({ ...prev, [filed]: !showPassword[filed] }))
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const passwordCheckValidation = Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(12, 'Password must be at least max 12 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &, #)')
    .required('one lowercase letter,one uppercase letter,one number,one special character is required with at least 8 characters')

  const forgetPasswordValidationSchema = Yup.object({
    confirmPassword: passwordCheckValidation,
    Re_confirmPassword: passwordCheckValidation
  })

  const forgetPasswordFormik = useFormik({
    initialValues,
    validationSchema: forgetPasswordValidationSchema,
    onSubmit: (values, { resetForm }) => {

      let {confirmPassword, Re_confirmPassword } = values

      axios.patch('http://localhost:3000/users/forgetpassword', { email : verifyEmail, confirmPassword, re_enter_confirmPassword : Re_confirmPassword})
        .then((res) => {

          setIsLogin(true)
          setIsEmailVerify(true)
          setIsOTPVerify(true)
          resetForm()
          setInitialValues({
            confirmPassword: '',
            Re_confirmPassword: ''
          })

          toast.success(res.data.message)
        })
        .catch((err) => {
            toast.error(err.response.data.message)
        })

    }
  })



  return (
    <Box className='default-bgcolor' sx={{ height: '100vh' }} >
      <Container maxWidth='sm'>
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper elevation={1} sx={{ width: '400px', padding: '30px' }}>
            <Typography variant="h5" textAlign={'center'} sx={{ marginBottom: '25px', fontWeight: 'bold' }}>
              Forget Password
            </Typography>
            <Box>
              <form onSubmit={forgetPasswordFormik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" size='small'>
                      <InputLabel htmlFor="confirmPassword">NewPassword</InputLabel>
                      <OutlinedInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword.confirmPassword ? 'text' : 'password'}
                        value={forgetPasswordFormik.values.confirmPassword}
                        onChange={forgetPasswordFormik.handleChange}
                        onBlur={forgetPasswordFormik.handleBlur}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleClickShowPassword('confirmPassword')}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword.confirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="NewPassword"
                      />
                    </FormControl>
                    {forgetPasswordFormik.touched.confirmPassword && forgetPasswordFormik.errors.confirmPassword ? (
                      <Typography variant="caption" display="block" color={'error'} gutterBottom>
                        {forgetPasswordFormik.errors.confirmPassword}
                      </Typography>) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" size='small'>
                      <InputLabel htmlFor="Re_confirmPassword">ConfirmPassword</InputLabel>
                      <OutlinedInput
                        id="Re_confirmPassword"
                        name="Re_confirmPassword"
                        type={showPassword.Re_confirmPassword ? 'text' : 'password'}
                        value={forgetPasswordFormik.values.Re_confirmPassword}
                        onChange={forgetPasswordFormik.handleChange}
                        onBlur={forgetPasswordFormik.handleBlur}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleClickShowPassword('Re_confirmPassword')}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword.Re_confirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="ConfirmPassword"
                      />
                    </FormControl>
                    {forgetPasswordFormik.touched.Re_confirmPassword && forgetPasswordFormik.errors.Re_confirmPassword ? (
                      <Typography variant="caption" display="block" color={'error'} gutterBottom>
                        {forgetPasswordFormik.errors.Re_confirmPassword}
                      </Typography>) : null}
                  </Grid>
                  <Grid item xs={12} textAlign={'center'}>
                    <Button type='submit' variant="contained" className='primary-bgcolor' sx={{ textTransform: 'capitalize', marginTop: '10px', width: '100%' }}>submit</Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
            <Box sx={{ textAlign: 'end', marginTop: '10px' }}>
              <Typography variant="body2" onClick={() => { setIsLogin(true); setIsEmailVerify(true); setIsOTPVerify(true) }} component={'a'} color={'blue'} sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                Goto Login?
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container >
    </Box >
  )
}

export default ForgetPassword