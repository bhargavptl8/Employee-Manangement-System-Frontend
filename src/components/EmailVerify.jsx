import React, { useState } from 'react'
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { toast } from 'react-toastify';

const EmailVerify = ({ setIsLogin, setIsEmailVerify, setVerifyEmail }) => {

    const [initialValues, setInitialValues] = useState({
        email: '',
    });

    const emailVerifyValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Please fill the Email is required')
    })

    const emailVerifyFormik = useFormik({
        initialValues,
        validationSchema: emailVerifyValidationSchema,
        onSubmit: (values, { resetForm }) => {

            let { email } = values

            axios.post('http://localhost:3000/users/emailverify', { email })
                .then((res) => {

                    // console.log(res);
                    setVerifyEmail(email)
                    setIsEmailVerify(false)
                    resetForm()
                    setInitialValues({
                        email: '',
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
                            E-Mail Verify
                        </Typography>
                        <Typography variant="body2" marginBottom='20px'>
                            Note : Verify your E-Mail ID. We will send you OTP in your E-Mail ID.
                        </Typography>
                        <Box>
                            <form onSubmit={emailVerifyFormik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Email" id='email' name='email' value={emailVerifyFormik.values.email} onChange={emailVerifyFormik.handleChange} onBlur={emailVerifyFormik.handleBlur} variant="outlined" size="small" />
                                        {emailVerifyFormik.touched.email && emailVerifyFormik.errors.email ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {emailVerifyFormik.errors.email}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type='submit' variant="contained" className='primary-bgcolor' sx={{ textTransform: 'capitalize', marginTop: '10px', width: '100%' }}>submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                        <Box sx={{ textAlign: 'end', marginTop: '10px' }}>
                            <Typography variant="body2" onClick={() => setIsLogin(true)} component={'a'} color={'blue'} sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                Goto Login?
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Container >
        </Box >
    )
}

export default EmailVerify