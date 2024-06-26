import React, { useState } from 'react'
import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography, styled, useMediaQuery, useTheme } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

import { toast } from 'react-toastify';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const SignUp = () => {

    const theme = useTheme();
    const history = useHistory();
    const Sm = useMediaQuery(theme.breakpoints.down('sm'));


    const [showPassword, setShowPassword] = useState(false);
    const [userImage, setUserImage] = useState('');

    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userImage: ''
    });



    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const signUpValidationSchema = Yup.object({
        firstName: Yup.string().min(3, 'Min 3 character').max(15, 'Max 15 character').required('Please fill the FirstName is required'),
        lastName: Yup.string().min(3, 'Min 3 character').max(15, 'Max 15 character').required('Please fill the LastName is required'),
        email: Yup.string().email('Invalid email address').required('Please fill the Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .max(12, 'Password must be at least max 12 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&#]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &, #)')
            .required('one lowercase letter,one uppercase letter,one number,one special character is required with at least 8 characters'),
        userImage: Yup.mixed().test('not upload', 'Upload your img is Required', (value) => {

            if (!value) {
                return false
            }
            return true
        })
    })

    const signUpFormik = useFormik({
        initialValues,
        validationSchema: signUpValidationSchema,
        onSubmit: (values, { resetForm }) => {

            let { firstName, lastName, email, password, userImage } = values

            const formData = new FormData();

            formData.append('firstName', firstName)
            formData.append('lastName', lastName)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('userImage', userImage)

            axios.post('http://localhost:3000/users/signup', formData, { headers: { 'content-type': 'multipart/form-data' } })
                .then((res) => {
                    // console.log(res)
                    resetForm()
                    setInitialValues({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        userImage: ''
                    })
                    setUserImage('')

                    history.push('/login')
                })
                .catch((err) => {
                    // console.log(err)
                    toast.error(err.response.data.message)
                })


        }
    })

    return (
        <Box className='default-bgcolor' sx={{ height: '100vh' }}>
            <Container maxWidth='sm'>
                <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper elevation={1} sx={{ width: '400px', padding: '30px' }}>
                        <Typography variant="h5" textAlign={'center'} sx={{ marginBottom: '25px', fontWeight: 'bold' }}>
                            SignUp
                        </Typography>
                        <Box>
                            <form onSubmit={signUpFormik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item sm={6} xs={12}>
                                        <TextField fullWidth label="FirstName" id='firstName' name='firstName' value={signUpFormik.values.firstName} onChange={signUpFormik.handleChange} onBlur={signUpFormik.handleBlur} variant="outlined" size="small" />
                                        {signUpFormik.touched.firstName && signUpFormik.errors.firstName ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {signUpFormik.errors.firstName}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item sm={6} xs={12}>
                                        <TextField fullWidth label="LastName" id='lastName' name='lastName' value={signUpFormik.values.lastName} onChange={signUpFormik.handleChange} onBlur={signUpFormik.handleBlur} variant="outlined" size="small" />
                                        {signUpFormik.touched.lastName && signUpFormik.errors.lastName ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {signUpFormik.errors.lastName}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Email" id='email' name='email' value={signUpFormik.values.email} onChange={signUpFormik.handleChange} onBlur={signUpFormik.handleBlur} variant="outlined" size="small" />
                                        {signUpFormik.touched.email && signUpFormik.errors.email ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {signUpFormik.errors.email}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth variant="outlined" size='small'>
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <OutlinedInput
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={signUpFormik.values.password}
                                                onChange={signUpFormik.handleChange}
                                                onBlur={signUpFormik.handleBlur}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                label="Password"
                                            />
                                        </FormControl>
                                        {signUpFormik.touched.password && signUpFormik.errors.password ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {signUpFormik.errors.password}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid container item alignItems={'center'}>
                                        <Grid item sm={4} xs={12} sx={{ marginBottom: Sm ? '10px' : '0px' }}>
                                            <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                                Upload Image
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={4} xs={6}>
                                            <Button
                                                component="label"
                                                role={undefined}
                                                variant="contained"
                                                tabIndex={-1}
                                                className='secondary-bgcolor'
                                                sx={{ textTransform: 'capitalize', borderRadius: '25px', color: 'rgba(0, 0, 0, 0.7  )' }}
                                                size='small'
                                            >
                                                choose file
                                                <VisuallyHiddenInput type="file" onChange={(e) => { let userImagefile = e.target.files[0]; signUpFormik.setFieldValue('userImage', userImagefile); setUserImage(userImagefile?.name) }} />
                                            </Button>
                                        </Grid>
                                        <Grid item sm={4} xs={6} >
                                            <Typography variant="body2" sx={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                                {userImage}
                                            </Typography>
                                        </Grid>
                                        {signUpFormik.touched.userImage && signUpFormik.errors.userImage ? (
                                            <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                {signUpFormik.errors.userImage}
                                            </Typography>) : null}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type='submit' variant="contained" className='primary-bgcolor' sx={{ textTransform: 'capitalize', marginTop: '10px', width: '100%' }}>submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                        <Box sx={{ textAlign: 'end', marginTop: '10px' }}>
                            <Typography variant="body2" onClick={() => history.push('/login')} component={'a'} color={'blue'} sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                Already SignUp? <span className='fs-16'>Login</span>
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Container >
        </Box >
    )
}

export default SignUp