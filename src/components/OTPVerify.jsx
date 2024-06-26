import React, { useState } from 'react'
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import axios from 'axios';

const OTPVerify = ({ setIsOTPVerify, verifyEmail }) => {


    const [initialValues, setInitialValues] = useState({
        OTP: '',
    });

    const verifyOTPValidationSchema = Yup.object({
        OTP: Yup.string().required('Please fill the OTP is required')
    })

    const verifyOTPFormik = useFormik({
        initialValues,
        validationSchema: verifyOTPValidationSchema,
        onSubmit: (values, { resetForm }) => {

            let { OTP } = values;

            axios.post('http://localhost:3000/users/otpverify', { email: verifyEmail, OTP })
                .then((res) => {

                    setIsOTPVerify(false)
                    resetForm()
                    setInitialValues({
                        OTP: '',
                    })
                    
                    toast.success(res.data.message)

                })
                .catch((err) => {
                    toast.error(err.response.data.message)
                })

        }
    })


    return (
        <Box className='default-bgcolor' sx={{ height: '100vh' }}>
            <Container maxWidth='sm'>
                <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper elevation={1} sx={{ width: '400px', padding: '30px' }}>
                        <Typography variant="h5" textAlign={'center'} sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                            OTP Verify
                        </Typography>
                        <Typography variant="body2" marginBottom='20px'>
                            Note : Verify Your OTP. We have send you an OTP on your E-Mail ID.
                        </Typography>
                        <Box>
                            <form onSubmit={verifyOTPFormik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="OTP" id='OTP' name='OTP' value={verifyOTPFormik.values.OTP} onChange={verifyOTPFormik.handleChange} onBlur={verifyOTPFormik.handleBlur} variant="outlined" size="small" />
                                        {verifyOTPFormik.touched.OTP && verifyOTPFormik.errors.OTP ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {verifyOTPFormik.errors.OTP}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type='submit' variant="contained" className='primary-bgcolor' sx={{ textTransform: 'capitalize', marginTop: '10px', width: '100%' }}>submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                        {/* <Box sx={{ textAlign: 'end', marginTop: '10px' }}>
                            <Typography variant="body2" onClick={() => setIsLogin(true)} component={'a'} color={'blue'} sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                Goto Login?
                            </Typography>
                        </Box> */}
                    </Paper>
                </Box>
            </Container >
        </Box >
    )
}

export default OTPVerify