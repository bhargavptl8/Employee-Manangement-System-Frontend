import React, { useEffect, useState } from 'react'
import { Box, Breadcrumbs, Button, CircularProgress, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

import { FaPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import { jobCategoryFetchRequest, jobCategoryDeleteRequest } from '../redux-saga/actions/jobCategory';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import JobCategoryModel from '../models/JobCategoryModel';

import Loading from '../components/Loading';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'jobCategory',
        headerName: 'Job Category',
        width: 150,
        editable: false,
    },
    {
        field: 'actions',
        headerName: '',
        width: 150,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (e) => (e.value)
    }
];


const JobCategory = () => {

    const dispatch = useDispatch();
    const theme = useTheme();

    const isSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [modelOpen, setModelOpen] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [updatableData, setUpdatableData] = useState(null);


    let jobCategoryData = useSelector(state => state?.jobCategoryData)

    // console.log(jobCategoryData);

    useEffect(() => {

        dispatch(jobCategoryFetchRequest());
    }, [])

    const updateData = (id) => {

        setUpdateId(id)
        setModelOpen(true)

        let copyData = [...jobCategoryData?.data];

        let findUpdatableData = copyData?.find((data) => data?._id === id)

        setUpdatableData(findUpdatableData);
    }

    const rows = jobCategoryData?.data?.map((jobCategoryData, index) => (
        { id: index + 1, jobCategory: jobCategoryData?.jobCategory, actions: <Stack direction='row' justifyContent='flex-end' alignItems='center' sx={{ height: '100%' }}><IconButton aria-label="edit" onClick={() => updateData(jobCategoryData?._id)}><CiEdit color='#0000ff' className='edit-btn' size={25} /></IconButton> <IconButton aria-label="delete" onClick={() => dispatch(jobCategoryDeleteRequest(jobCategoryData?._id))}><MdDelete color='#ff0000' className='delete-btn' size={25} /></IconButton></Stack> }
    ))

    return (
        <Box>
            <Box sx={{ marginBottom: '10px' }}>
                <Typography variant='h6' fontWeight='600' className='primary-color'>Job-Category</Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link className='breadCrumbLink' to='/dashboard'>
                        Home
                    </Link>
                    <Typography color="text.primary" fontSize='14px'>Job-Category</Typography>
                </Breadcrumbs>
            </Box>

            <Box sx={{ paddingY: '20px' }}>

                <Button variant="contained" onClick={() => setModelOpen(true)} className='primary-bgcolor' sx={{ borderRadius: '25px' }} startIcon={<FaPlus size={14} />}>
                    Add
                </Button>

                <JobCategoryModel modelOpen={modelOpen} setModelOpen={setModelOpen} updateId={updateId} setUpdateId={setUpdateId} updatableData={updatableData} setUpdatableData={setUpdatableData} />

            </Box>


            <Box sx={{ paddingY: '20px' }}>
                <Box className='jobCategorytable' sx={{ height: 300, width: isSM ? '100%' : '450px' }}>
                    {
                        jobCategoryData?.loading ? (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress /></Box>) : (
                            <Paper>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                    disableRowSelectionOnClick
                                />
                            </Paper>
                        )
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default JobCategory