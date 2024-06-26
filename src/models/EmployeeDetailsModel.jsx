import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Modal, Fade, Typography, Stack, TextField, Grid, Button, useMediaQuery, useTheme, FormControl, InputLabel, Select, MenuItem, styled, CircularProgress } from '@mui/material'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { empDetailsCreateRequest, empDetailsUpdateRequest, reset } from '../redux-saga/actions/empDetails';
import { jobCategoryFetchRequest } from '../redux-saga/actions/jobCategory';

import { RiCloseCircleLine } from "react-icons/ri";

import { toast } from 'react-toastify';

const ModelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '400px',
    overflow: 'auto',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
};

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

const EmployeeDetailsModel = ({ open, setOpen, updateId, setUpdateId, updatableData, setUpdatableData }) => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    let empDetailsData = useSelector(state => state?.empDetailsData);

    let jobCategoryData = useSelector(state => state.jobCategoryData);

    console.log(jobCategoryData);

    useEffect(() => {

        dispatch(jobCategoryFetchRequest())
    },[])

    const [initialValues, setInitialValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        joiningDate: '',
        resignDate: '',
        diff_CompanyExperience: '',
        jobCategory: '',
        profession_Job: '',
        employeeImage: ''
    })

    const [employeeImage, setEmployeeImage] = useState('');

    // console.log(empDetailsData);
    // console.log(empDetailsData.error);

    useEffect(() => {

        if (!empDetailsData?.submitSuccess && empDetailsData?.error) {
            toast.error(empDetailsData?.error)
            dispatch(reset())
        }

        if (empDetailsData?.submitSuccess && empDetailsData?.successMessage) {
            handleClose()
            toast.success(empDetailsData?.successMessage)
            dispatch(reset())
        }

    }, [empDetailsData])


    useEffect(() => {

        if(updatableData)
            {
                setInitialValues({
                    firstName: updatableData.firstName,
                    lastName: updatableData.lastName,
                    email: updatableData.email,    
                    phoneNo: updatableData.phoneNo,
                    joiningDate: updatableData.joiningDate,
                    resignDate: updatableData.resignDate,
                    diff_CompanyExperience: updatableData.Diff_CompanyExp,
                    jobCategory: updatableData.jobCategory,
                    profession_Job: updatableData.profession_Job,
                    employeeImage: updatableData.empImage[0]
                })

                setEmployeeImage(updatableData?.empImage[0])
        
                setUpdatableData(null)
            }

    }, [updatableData])

  

    const employeeDetailsModelSchema = Yup.object({
        firstName: Yup.string().min(3, 'Min 3 character').required('Please fill the FirstName is required'),
        lastName: Yup.string().min(3, 'Min 3 character').required('Please fill the LastName is required'),
        email: Yup.string().email('Invalid Email').required('Please fill the Email is required'),
        phoneNo: Yup.string().min(10, 'PhoneNo must be exactly 10 digits')
            .max(10, 'PhoneNo must be exactly 10 digits')
            .matches(/^[0-9]+$/, 'PhoneNo must contain only digits')
            .required('Please fill the PhoneNo is required'),
        joiningDate: Yup.string().required('Please fill the JoiningDate is required'),
        jobCategory: Yup.string().required('Please fill the JobCategory is required'),
        profession_Job: Yup.string().required('Please fill the Profession/Job is required'),
        employeeImage: Yup.string().required('Please fill the Employee-Image is required')
    })


    const employeeDetailsModelFormik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: employeeDetailsModelSchema,
        onSubmit: (values) => {

            if (updateId) {

                dispatch(empDetailsUpdateRequest({ empDetailId : updateId, data : values}))
            }
            else {
                dispatch(empDetailsCreateRequest(values));
            }
        }
    })

    function handleClose() {
        setOpen(false);
        employeeDetailsModelFormik.resetForm();
        setInitialValues({
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: '',
            joiningDate: '',
            resignDate: '',
            diff_CompanyExperience: '',
            jobCategory: '',
            profession_Job: '',
            employeeImage: ''
        });
        setEmployeeImage('')
        setUpdateId(null)
    }


    return (
        <Modal
            aria-labelledby="employeeDetails-modal-title"
            aria-describedby="employeeDetails-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open} >
                <Box sx={ModelStyle} width={isSm ? 300 : 400}>
                    <Stack sx={{ position: 'relative' }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography id="employee-Details-modal-title" variant="h5" fontWeight={'bold'} component="h2">
                            Employee Details
                        </Typography>
                        <Box onClick={handleClose} sx={{ position: 'absolute', right: -11, top: -13, cursor: 'pointer', lineHeight: 0 }}>
                            <RiCloseCircleLine size={22} />
                        </Box>
                    </Stack>
                    <Box sx={{ marginTop: '24px' }}>

                        <form onSubmit={employeeDetailsModelFormik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item sm={6} xs={12}>
                                    <TextField fullWidth label="FirstName" id='firstName' name='firstName' value={employeeDetailsModelFormik.values.firstName} onChange={employeeDetailsModelFormik.handleChange} onBlur={employeeDetailsModelFormik.handleBlur} variant="outlined" size="small" />
                                    {employeeDetailsModelFormik.touched.firstName && employeeDetailsModelFormik.errors.firstName ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {employeeDetailsModelFormik.errors.firstName}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item sm={6} xs={12}>
                                    <TextField fullWidth label="LastName" id='lastName' name='lastName' value={employeeDetailsModelFormik.values.lastName} onChange={employeeDetailsModelFormik.handleChange} onBlur={employeeDetailsModelFormik.handleBlur} variant="outlined" size="small" />
                                    {employeeDetailsModelFormik.touched.lastName && employeeDetailsModelFormik.errors.lastName ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {employeeDetailsModelFormik.errors.lastName}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Email" id='email' name='email' value={employeeDetailsModelFormik.values.email} onChange={employeeDetailsModelFormik.handleChange} onBlur={employeeDetailsModelFormik.handleBlur} variant="outlined" size="small" />
                                    {employeeDetailsModelFormik.touched.email && employeeDetailsModelFormik.errors.email ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {employeeDetailsModelFormik.errors.email}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="PhoneNo" id='phoneNo' name='phoneNo' value={employeeDetailsModelFormik.values.phoneNo} onChange={employeeDetailsModelFormik.handleChange} onBlur={employeeDetailsModelFormik.handleBlur} variant="outlined" size="small" />
                                    {employeeDetailsModelFormik.touched.phoneNo && employeeDetailsModelFormik.errors.phoneNo ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {employeeDetailsModelFormik.errors.phoneNo}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={[
                                                'DatePicker',
                                                'MobileDatePicker',
                                                'DesktopDatePicker',
                                                'StaticDatePicker',
                                            ]}
                                        >
                                            <DemoItem >
                                                <DatePicker label='Joining-Date' id='joiningDate' name='joiningDate' value={employeeDetailsModelFormik.values.joiningDate ? dayjs(employeeDetailsModelFormik.values.joiningDate) : null} onChange={(e) => employeeDetailsModelFormik.setFieldValue('joiningDate', e.$d)} slotProps={{ textField: { variant: 'outlined', size: 'small' } }} />
                                            </DemoItem>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                    {employeeDetailsModelFormik.touched.joiningDate && employeeDetailsModelFormik.errors.joiningDate ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {employeeDetailsModelFormik.errors.joiningDate}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer
                                            components={[
                                                'DatePicker',
                                                'MobileDatePicker',
                                                'DesktopDatePicker',
                                                'StaticDatePicker',
                                            ]}
                                        >
                                            <DemoItem >
                                                <DatePicker label='Resign-Date' id='resignDate' name='resignDate' value={employeeDetailsModelFormik.values.resignDate ? dayjs(employeeDetailsModelFormik.values.resignDate) : null} onChange={(e) => employeeDetailsModelFormik.setFieldValue('resignDate', e.$d)} slotProps={{ textField: { variant: 'outlined', size: 'small' } }} />
                                            </DemoItem>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Diff-Company-experience" id='diff_CompanyExperience' name='diff_CompanyExperience' value={employeeDetailsModelFormik.values.diff_CompanyExperience} onChange={employeeDetailsModelFormik.handleChange} onBlur={employeeDetailsModelFormik.handleBlur} variant="outlined" size="small" />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth size='small'>
                                        <InputLabel id="jobCategoryLabel">JobCategory</InputLabel>
                                        <Select
                                            labelId='jobCategoryLabel'
                                            id='jobCategory'
                                            name='jobCategory'
                                            value={employeeDetailsModelFormik.values.jobCategory}
                                            label="JobCategory"
                                            onChange={(e) => employeeDetailsModelFormik.setFieldValue('jobCategory', e.target.value)}
                                            onBlur={employeeDetailsModelFormik.handleBlur}
                                        >
                                            {
                                                jobCategoryData?.data.map((jobCategoryData,index) => (
                                                    <MenuItem key={index} value={jobCategoryData?._id}>{jobCategoryData?.jobCategory}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    {employeeDetailsModelFormik.touched.jobCategory && employeeDetailsModelFormik.errors.jobCategory ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {employeeDetailsModelFormik.errors.jobCategory}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Profession / Job" id='profession_Job' name='profession_Job' value={employeeDetailsModelFormik.values.profession_Job} onChange={employeeDetailsModelFormik.handleChange} onBlur={employeeDetailsModelFormik.handleBlur} variant="outlined" size="small" />
                                    {employeeDetailsModelFormik.touched.profession_Job && employeeDetailsModelFormik.errors.profession_Job ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {employeeDetailsModelFormik.errors.profession_Job}
                                        </Typography>) : null}
                                </Grid>
                                <Grid container item alignItems={'center'}>
                                    <Grid item sm={4} xs={12} sx={{ marginBottom: isSm ? '10px' : '0px' }}>
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
                                            <VisuallyHiddenInput type="file" onChange={(e) => { let employeeImagefile = e.target.files[0]; employeeDetailsModelFormik.setFieldValue('employeeImage', employeeImagefile); setEmployeeImage(employeeImagefile?.name) }} />
                                        </Button>
                                    </Grid>
                                    <Grid item sm={4} xs={6} >
                                        <Typography variant="body2" sx={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                            {employeeImage}
                                        </Typography>
                                    </Grid>
                                    {employeeDetailsModelFormik.touched.employeeImage && employeeDetailsModelFormik.errors.employeeImage ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {employeeDetailsModelFormik.errors.employeeImage}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item xs={12} textAlign={'center'}>
                                    {empDetailsData?.loading ? (
                                        <Button
                                            className='submit-loading primary-bgcolor'
                                            endIcon={<CircularProgress />}
                                            variant="contained"
                                            disabled
                                            sx={{ color: '#fff!Important', textTransform: 'capitalize', borderRadius: '10px', marginTop: '10px', paddingX: '20px' }}
                                        >
                                            submit...
                                        </Button>
                                    ) : (<Button type='submit' variant="contained"
                                        className='primary-bgcolor'
                                        sx={{ textTransform: 'capitalize', borderRadius: '10px', marginTop: '10px', paddingX: '20px' }}>
                                        submit
                                    </Button>)}
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default EmployeeDetailsModel