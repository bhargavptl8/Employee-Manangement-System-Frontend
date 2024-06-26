import React, { useState } from 'react'
import { Backdrop, Box, Fade, Modal, Stack, Typography, useMediaQuery, useTheme, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";

import { useSelector } from 'react-redux';

import axios from 'axios';

import { toast } from 'react-toastify';


const ModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // height: '400px',
    overflow: 'auto',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};

const ChangePassword = ({ changePassModelOpen, setChangePassModelOpen }) => {

    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    let loginData = useSelector(state => state.loginData);

    // console.log(loginData);

    const [showPassword, setShowPassword] = useState({
        confirmPassword: false,
        Re_confirmPassword: false
    });

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


    const changePasswordValidationSchema = Yup.object({
        confirmPassword: passwordCheckValidation,
        Re_confirmPassword: passwordCheckValidation
    })

    const changePasswordFormik = useFormik({
        initialValues,
        validationSchema: changePasswordValidationSchema,
        onSubmit: (values, { resetForm }) => {

            let { confirmPassword, Re_confirmPassword } = values

            axios.patch('http://localhost:3000/users/forgetpassword', { email : loginData?.email, confirmPassword, re_enter_confirmPassword: Re_confirmPassword })
                .then((res) => {

                    resetForm()
                    setInitialValues({
                        confirmPassword: '',
                        Re_confirmPassword: ''
                    })
                    setChangePassModelOpen(false)

                    toast.success(res.data.message)
                })
                .catch((err) => {
                    toast.error(err.response.data.message)
                })

        }
    })

    const handleClose = () => {
        setChangePassModelOpen(false)
        setInitialValues({
            confirmPassword: '',
            Re_confirmPassword: ''
        })
        changePasswordFormik.resetForm();
    }


    return (
        <Modal
            aria-labelledby="changePassword-modal-title"
            aria-describedby="changePassword-modal-description"
            open={changePassModelOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={changePassModelOpen} >
                <Box sx={ModelStyle} width={isSm ? 300 : 400}>
                    <Stack sx={{ position: 'relative' }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography id="change-password-modal-title" variant="h5" fontWeight={'bold'} component="h2">
                            Change Password
                        </Typography>
                        <Box onClick={handleClose} sx={{ position: 'absolute', right: -11, top: -13, cursor: 'pointer', lineHeight: 0 }}>
                            <RiCloseCircleLine size={22} />
                        </Box>
                    </Stack>
                    <Box sx={{ marginTop: '24px' }}>

                        <form onSubmit={changePasswordFormik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined" size='small'>
                                        <InputLabel htmlFor="confirmPassword">NewPassword</InputLabel>
                                        <OutlinedInput
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showPassword.confirmPassword ? 'text' : 'password'}
                                            value={changePasswordFormik.values.confirmPassword}
                                            onChange={changePasswordFormik.handleChange}
                                            onBlur={changePasswordFormik.handleBlur}
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
                                    {changePasswordFormik.touched.confirmPassword && changePasswordFormik.errors.confirmPassword ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {changePasswordFormik.errors.confirmPassword}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined" size='small'>
                                        <InputLabel htmlFor="Re_confirmPassword">ConfirmPassword</InputLabel>
                                        <OutlinedInput
                                            id="Re_confirmPassword"
                                            name="Re_confirmPassword"
                                            type={showPassword.Re_confirmPassword ? 'text' : 'password'}
                                            value={changePasswordFormik.values.Re_confirmPassword}
                                            onChange={changePasswordFormik.handleChange}
                                            onBlur={changePasswordFormik.handleBlur}
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
                                    {changePasswordFormik.touched.Re_confirmPassword && changePasswordFormik.errors.Re_confirmPassword ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {changePasswordFormik.errors.Re_confirmPassword}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item xs={12} textAlign={'center'}>
                                    <Button type='submit' variant="contained" className='primary-bgcolor' sx={{ textTransform: 'capitalize', marginTop: '10px', width: '100%' }}>submit</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default ChangePassword