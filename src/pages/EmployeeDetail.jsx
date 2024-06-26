import React, { useEffect, useState } from 'react'
import { Typography, Breadcrumbs, Box, Button, styled, Stack, Avatar, useTheme, useMediaQuery, IconButton, TextField, CircularProgress } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { FaPlus } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

import { useSelector, useDispatch } from 'react-redux';
import { empDetailsFetchRequest, empDetailsDeleteRequest, empDetailsSearchRequest } from '../redux-saga/actions/empDetails';
import { jobCategoryFetchRequest } from '../redux-saga/actions/jobCategory';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import EmployeeDetailsModel from '../models/EmployeeDetailsModel';
import moment from 'moment';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<FaAngleDown sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



const EmployeeDetail = () => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  let empDetailsData = useSelector(state => state?.empDetailsData);

  let jobCategoryData = useSelector(state => state.jobCategoryData);

  // console.log(empDetailsData);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = React.useState('panel1');
  const [updateId, setUpdateId] = useState(null)
  const [updatableData, setUpdatableData] = useState(null)
  const [searchTeam, setSearchTeam] = useState('')

  // console.log(updateId);
  // console.log(updatableData);

  useEffect(() => {

    dispatch(empDetailsFetchRequest());
    dispatch(jobCategoryFetchRequest());
  }, [])

  useEffect(() => {

    dispatch(empDetailsSearchRequest(searchTeam));
  }, [searchTeam])

  const updateEmpDeatilsData = (id) => {

    setUpdateId(id)
    setOpen(true)

    let copyData = [...empDetailsData?.data]

    console.log(copyData);

    let empDetailsUpdateData = copyData.find((data) => data?._id === id)

    setUpdatableData(empDetailsUpdateData)

  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      <Box sx={{ marginBottom: '10px' }}>
        <Typography variant='h6' fontWeight='600' className='primary-color'>Employee-Details</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link className='breadCrumbLink' to='/dashboard'>
            Home
          </Link>
          <Typography color="text.primary" fontSize='14px'>Employee-Details</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ paddingY: '20px' }}>

        <Button variant="contained" onClick={() => setOpen(true)} className='primary-bgcolor' sx={{ borderRadius: '25px' }} startIcon={<FaPlus size={14} />}>
          Add
        </Button>

        <EmployeeDetailsModel open={open} setOpen={setOpen} updateId={updateId} setUpdateId={setUpdateId} updatableData={updatableData} setUpdatableData={setUpdatableData} />

      </Box>



      <Box sx={{ marginY: '20px', overflow: 'auto' }}>
        <Box sx={{ width: '1000px' }}>
          <Accordion id="panel-search" className='panel-header' >
            <AccordionSummary>
              <Stack direction='row' alignItems='center' sx={{ width: '100%' }}>
                <IoSearch size={19} className='d-block primary-color' />
                <TextField type='search' className='search' value={searchTeam} onChange={(e) => setSearchTeam(e?.target?.value)} fullWidth placeholder='Search...' size='small'></TextField>
              </Stack>
            </AccordionSummary>
          </Accordion>
          <Accordion className='panel-header' >
            <AccordionSummary id="panel-header">
              <Stack direction={'row'} sx={{ flexGrow: 1 }} alignItems='center'>
                <Box sx={{ fontWeight: '600', width: '10%' }}>ID</Box>
                <Box sx={{ fontWeight: '600', width: '15%' }}>EmpImg</Box>
                <Box sx={{ fontWeight: '600', width: '18%' }}>FirstName</Box>
                <Box sx={{ fontWeight: '600', width: '18%' }}>LastName</Box>
                <Box sx={{ fontWeight: '600', width: '25%' }}>Email</Box>
                <Box sx={{ fontWeight: '600', width: '14%' }}></Box>
              </Stack>
            </AccordionSummary>
          </Accordion>
          {empDetailsData?.loading ? (<Box className='primary-color' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height : '400px'}}><CircularProgress /></Box>) : (
            empDetailsData?.data.map((empdetailData, index) => (
              <Accordion key={index} expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
                <AccordionSummary id='`panel${index}d-header`'>
                  <Stack direction={'row'} sx={{ flexGrow: 1 }} alignItems='center'>
                    <Box sx={{ width: '10%' }}>{index + 1}</Box>
                    <Box sx={{ width: '15%' }}> <Avatar alt={empdetailData?.firstName} sx={{ width: isSm ? 34 : 38, height: isSm ? 34 : 38 }} src={`http://localhost:3000/images/${empdetailData?.empImage[0]}`}></Avatar></Box>
                    <Box sx={{ width: '18%' }}>{empdetailData?.firstName}</Box>
                    <Box sx={{ width: '18%' }}>{empdetailData?.lastName}</Box>
                    <Box sx={{ width: '25%', overflow: 'auto' }}>{empdetailData?.email}</Box>
                    <Box sx={{ width: '14%' }}>
                      <Stack direction='row' justifyContent={'center'} >
                        <IconButton aria-label="edit" onClick={() => updateEmpDeatilsData(empdetailData?._id)}>
                          <CiEdit color='#0000ff' className='edit-btn' size={25} />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => dispatch(empDetailsDeleteRequest(empdetailData?._id))}>
                          <MdDelete color='#ff0000' className='delete-btn' size={25} />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction='row' spacing={5} alignItems='center' justifyContent='space-evenly'>
                    <Box>
                      <Stack direction='row'>
                        <Typography sx={{ fontWeight: '600', paddingRight: '10px' }}>Joining-Date :</Typography>
                        <Typography sx={{ color: 'rgba(0,0,0,0.7)' }}>{moment(empdetailData?.joiningDate).format('Do MMMM YYYY')}</Typography>
                      </Stack>
                      <Stack direction='row'>
                        <Typography sx={{ fontWeight: '600', paddingRight: '10px' }}>Resign-Date :</Typography>
                        <Typography sx={{ color: 'rgba(0,0,0,0.7)' }}>{empdetailData?.resignDate ? moment(empdetailData?.resignDate).format('Do MMMM YYYY') : '--'}</Typography>
                      </Stack>
                      <Stack direction='row'>
                        <Typography sx={{ fontWeight: '600', paddingRight: '10px' }}>PhoneNo :</Typography>
                        <Typography sx={{ color: 'rgba(0,0,0,0.7)' }}>{empdetailData?.phoneNo}</Typography>
                      </Stack>
                    </Box>
                    <Box>
                      <Stack direction='row'>
                        <Typography sx={{ fontWeight: '600', paddingRight: '10px' }}>Diff_CompanyExp :</Typography>
                        <Typography sx={{ color: 'rgba(0,0,0,0.7)' }}>{empdetailData?.Diff_CompanyExp ? empdetailData?.Diff_CompanyExp : '0 month'}</Typography>
                      </Stack>
                      <Stack direction='row'>
                        <Typography sx={{ fontWeight: '600', paddingRight: '10px' }}>JobCategory :</Typography>
                        <Typography sx={{ color: 'rgba(0,0,0,0.7)' }}>{jobCategoryData?.data.find((data) => data?._id === empdetailData?.jobCategory)?.jobCategory}</Typography>
                      </Stack>
                      <Stack direction='row'>
                        <Typography sx={{ fontWeight: '600', paddingRight: '10px' }}>Profession / Job :</Typography>
                        <Typography sx={{ color: 'rgba(0,0,0,0.7)' }}>{empdetailData?.profession_Job}</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      </Box>

    </Box>
  )
}

export default EmployeeDetail