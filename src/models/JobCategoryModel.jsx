import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Fade, Modal, Stack, Typography, useMediaQuery, useTheme, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { RiCloseCircleLine } from "react-icons/ri";

import { jobCategoryCreateRequest, jobCategoryUpdateRequest, jobCategoryResetState } from '../redux-saga/actions/jobCategory';
import { useSelector, useDispatch } from 'react-redux';

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


const JobCategoryModel = ({ modelOpen, setModelOpen, updateId, setUpdateId, updatableData, setUpdatableData }) => {


    const theme = useTheme();
    const dispatch = useDispatch();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    let jobCategoryData = useSelector(state => state?.jobCategoryData)

    // console.log(updatableData);

    const [initialValues, setInitialValues] = useState({
        jobCategory: ''
    });

    useEffect(() => {

        if (!jobCategoryData?.submitSuccess && jobCategoryData?.error) {
            toast.error(jobCategoryData?.error)
            dispatch(jobCategoryResetState())
        }

        if (jobCategoryData?.submitSuccess && jobCategoryData?.successMessage) {
            handleClose()
            toast.success(jobCategoryData?.successMessage)
            dispatch(jobCategoryResetState())
        }

    }, [jobCategoryData])

    useEffect(() => {

        if (updatableData) {
            setInitialValues({
                jobCategory: updatableData.jobCategory
            })

            setUpdatableData(null)
        }

    }, [updatableData])

    const jobCategoryValidationSchema = Yup.object({
        jobCategory: Yup.string().required('Please fill the JobCategory filed.')
    })

    const jobCategoryFormik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: jobCategoryValidationSchema,
        onSubmit: (values) => {

            if (updateId) {

                dispatch(jobCategoryUpdateRequest({ jobCategoryId: updateId, data: values }))
            }
            else {

                dispatch(jobCategoryCreateRequest(values));
            }


        }
    })

    function handleClose() {
        setModelOpen(false)
        setInitialValues({
            jobCategory: ''
        })
        jobCategoryFormik.resetForm();
        setUpdateId(null)
    }


    return (
        <Modal
            aria-labelledby="jobCategory-modal-title"
            aria-describedby="jobCategory-modal-description"
            open={modelOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={modelOpen} >
                <Box sx={ModelStyle} width={isSm ? 300 : 400}>
                    <Stack sx={{ position: 'relative' }} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography id="jobCategory-modal-title" variant="h5" fontWeight={'bold'} component="h2">
                            Job Category
                        </Typography>
                        <Box onClick={handleClose} sx={{ position: 'absolute', right: -11, top: -13, cursor: 'pointer', lineHeight: 0 }}>
                            <RiCloseCircleLine size={22} />
                        </Box>
                    </Stack>
                    <Box sx={{ marginTop: '24px' }}>

                        <form onSubmit={jobCategoryFormik.handleSubmit}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <TextField fullWidth id="jobCategory" name='jobCategory' label="JobCategory" value={jobCategoryFormik.values.jobCategory} onChange={jobCategoryFormik.handleChange} onBlur={jobCategoryFormik.handleBlur} variant="outlined" size='small' />
                                    {jobCategoryFormik.touched.jobCategory && jobCategoryFormik.errors.jobCategory ? (
                                        <Typography variant="caption" display="block" color={'error'} gutterBottom>
                                            {jobCategoryFormik.errors.jobCategory}
                                        </Typography>) : null}
                                </Grid>
                                <Grid item xs={12} textAlign={'center'}>
                                    {
                                        jobCategoryData?.loading ? (
                                            <Button
                                                className='submit-loading primary-bgcolor'
                                                endIcon={<CircularProgress />}
                                                variant="contained"
                                                disabled
                                                sx={{color: '#fff!Important',  textTransform: 'capitalize', marginTop: '10px', width: '100%' }}
                                            >
                                                submit...
                                            </Button>
                                        ) : (
                                            <Button type='submit' variant="contained" className='primary-bgcolor' sx={{color: '#fff!Important',  textTransform: 'capitalize', marginTop: '10px', width: '100%' }}>submit</Button>
                                        )
                                    }
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default JobCategoryModel