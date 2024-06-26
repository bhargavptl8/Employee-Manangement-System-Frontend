import React, { lazy, useState, Suspense } from 'react'
import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { loginDataFetch } from '../redux-saga/actions/login';
import { useDispatch } from 'react-redux';

import Loading from '../components/Loading';

const EmailVerify = lazy(() => import('../components/EmailVerify'))
const OTPVerify = lazy(() => import('../components/OTPVerify'))
const ForgetPassword = lazy(() => import('../components/ForgetPassword'))

import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(true)
    const [isEmailVerify, setIsEmailVerify] = useState(true)
    const [isOTPVerify, setIsOTPVerify] = useState(true)

    const[verifyEmail, setVerifyEmail] = useState('')

    const [showPassword, setShowPassword] = useState(false);

    const [initialValues, setInitialValues] = useState({
        email: '',
        password: '',
    });


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Please fill the Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .max(12, 'Password must be at least max 12 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&#]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &, #)')
            .required('one lowercase letter,one uppercase letter,one number,one special character is required with at least 8 characters')
    })

    const loginFormik = useFormik({
        initialValues,
        validationSchema: loginValidationSchema,
        onSubmit: (values, { resetForm }) => {

            let{email, password} = values

            axios.post('http://localhost:3000/users/login',{email, password})
            .then((res) => {
                // console.log(res.data);
                dispatch(loginDataFetch(res.data.data))
                localStorage.setItem('userLoginToken',res.data.token)
                resetForm()
                setInitialValues({
                    email: '',
                    password: '',
                })

                history.push('/dashboard')
            })
            .catch((err) => {
                // console.log(err)
                toast.error(err.response.data.message)
            })

         
        }
    })


    return (
        isLogin ? (
            <Box className='default-bgcolor' sx={{ height: '100vh' }}>
                <Container maxWidth='sm'>
                    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Paper elevation={1} sx={{ width: '400px', padding: '30px' }}>
                            <Typography variant="h5" textAlign={'center'} sx={{ marginBottom: '25px', fontWeight: 'bold' }}>
                                Login
                            </Typography>
                            <Box>
                                <form onSubmit={loginFormik.handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField fullWidth label="Email" id='email' name='email' value={loginFormik.values.email} onChange={loginFormik.handleChange} onBlur={loginFormik.handleBlur} variant="outlined" size="small" />
                                            {loginFormik.touched.email && loginFormik.errors.email ? (
                                                <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                    {loginFormik.errors.email}
                                                </Typography>) : null}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl fullWidth variant="outlined" size='small'>
                                                <InputLabel htmlFor="password">Password</InputLabel>
                                                <OutlinedInput
                                                    id="password"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={loginFormik.values.password}
                                                    onChange={loginFormik.handleChange}
                                                    onBlur={loginFormik.handleBlur}
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
                                            {loginFormik.touched.password && loginFormik.errors.password ? (
                                                <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                                    {loginFormik.errors.password}
                                                </Typography>) : null}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type='submit' variant="contained" className='primary-bgcolor' sx={{ textTransform: 'capitalize', marginTop: '10px', width: '100%' }}>submit</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                            <Box sx={{ textAlign: 'end', marginTop: '10px' }}>
                                <Typography variant="body2" onClick={() => setIsLogin(false)} component={'a'} color={'blue'} sx={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                    Forget Password?
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Container >
            </Box >
        ) : <Suspense fallback={<Loading/>}>
            {
                isEmailVerify ? <EmailVerify setIsLogin={setIsLogin} setIsEmailVerify={setIsEmailVerify} setVerifyEmail={setVerifyEmail}/> : isOTPVerify ? <OTPVerify setIsOTPVerify={setIsOTPVerify} verifyEmail={verifyEmail}/> : <ForgetPassword verifyEmail={verifyEmail} setIsLogin={setIsLogin} setIsEmailVerify={setIsEmailVerify} setIsOTPVerify={setIsOTPVerify} />
            }
        </Suspense>
    )
}

export default Login