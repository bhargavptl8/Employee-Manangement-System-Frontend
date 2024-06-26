import React, { useEffect, useState } from 'react'
import { Typography, Breadcrumbs, Box, Grid, styled, Paper, Stack, useTheme, useMediaQuery } from '@mui/material';

import { empDetailsFetchRequest } from '../redux-saga/actions/empDetails';
import { jobCategoryFetchRequest } from '../redux-saga/actions/jobCategory';
import { useDispatch, useSelector } from 'react-redux';

import { HiMiniUserGroup } from "react-icons/hi2";
import { FaUsersViewfinder, FaUsersSlash } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";

import Linechart from '../charts/Linechart';
import Loading from '../components/Loading';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  borderRadius: '20px',
  color: theme.palette.text.secondary,
}));





const Dashboard = () => {

  const theme = useTheme();

  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  let empDetailsData = useSelector(state => state?.empDetailsData);

  let jobCategoryData = useSelector(state => state?.jobCategoryData);

  // console.log(empDetailsData);
  // console.log(jobCategoryData);

  const [selectedMonth, setSelectedMonth] = useState(null);

  // console.log(selectedMonth);

  useEffect(() => {

    dispatch(empDetailsFetchRequest())
    dispatch(jobCategoryFetchRequest())
  }, [])


  return (

    empDetailsData?.loading && jobCategoryData?.loading ? (<Loading />) : (

      <Box>

        <Box sx={{ marginBottom: '10px' }}>
          <Typography variant='h6' fontWeight='600' className='primary-color'>Dashboard</Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary" fontSize='14px'>Home</Typography>
            <Typography color="text.primary" fontSize='14px'>Dashboard</Typography>
          </Breadcrumbs>
        </Box>

        <Box sx={{ paddingY: '20px' }}>
          <Grid container spacing={5}>
            <Grid item lg={4} sm={6} xs={12}>
              <Item className='secondary-bgcolor'>
                <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
                  <Box sx={{ marginRight: isSM ? '20px' : '10px' }}>
                    <HiMiniUserGroup className='icon-color' size={45} />
                  </Box>
                  <Stack>
                    <Typography variant='h6' className='primary-color' sx={{ fontSize: isMD ? '22px' : '20px', fontWeight: '600' }}>
                      Total Employee's
                    </Typography>
                    <Typography sx={{ fontSize: '28px', color: 'rgba(0,0,0,0.5)' }}>
                      {empDetailsData?.data?.length}
                    </Typography>
                  </Stack>
                </Stack>
              </Item>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Item className='secondary-bgcolor'>
                <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
                  <Box sx={{ marginRight: isSM ? '20px' : '10px' }}>
                    <FaUsersViewfinder className='icon-color' size={45} />
                  </Box>
                  <Stack>
                    <Typography variant='h6' className='primary-color' sx={{ fontSize: isMD ? '22px' : '20px', fontWeight: '600' }}>
                      Total Current Emp's
                    </Typography>
                    <Typography sx={{ fontSize: '28px', color: 'rgba(0,0,0,0.5)' }}>
                      {empDetailsData?.data?.filter((data) => data?.resignDate === '')?.length}
                    </Typography>
                  </Stack>
                </Stack>
              </Item>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Item className='secondary-bgcolor'>
                <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
                  <Box sx={{ marginRight: isSM ? '20px' : '10px' }}>
                    <FaUsersSlash className='icon-color' size={45} />
                  </Box>
                  <Stack>
                    <Typography variant='h6' className='primary-color' sx={{ fontSize: isMD ? '22px' : '20px', fontWeight: '600' }}>
                      Total Resign Emp's
                    </Typography>
                    <Typography sx={{ fontSize: '28px', color: 'rgba(0,0,0,0.5)' }}>
                      {empDetailsData?.data.filter((data) => {
                        if (data?.resignDate) {
                          return data
                        }
                      }).length}
                    </Typography>
                  </Stack>
                </Stack>
              </Item>
            </Grid>
            {
              jobCategoryData?.data?.map((data, index) => (
                <Grid key={index} item lg={4} sm={6} xs={12}>
                  <Item className='secondary-bgcolor'>
                    <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
                      <Box sx={{ marginRight: isSM ? '20px' : '10px' }}>
                        <FaUserTie className='icon-color' size={45} />
                      </Box>
                      <Stack>
                        <Typography variant='h6' className='primary-color' sx={{ fontSize: isMD ? '22px' : '20px', fontWeight: '600' }}>
                          {data?.jobCategory} Emp's
                        </Typography>
                        <Typography sx={{ fontSize: '28px', color: 'rgba(0,0,0,0.5)' }}>
                          {empDetailsData?.data?.filter((el) => el?.jobCategory === data?._id)?.length}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Item>
                </Grid>
              ))
            }
            <Grid item sm={8} xs={12}>
              <Item>
                <Box sx={{width : '100%', height : '350px'}}>
                  <Linechart selectedMonth={selectedMonth} />
                </Box>
                <Box sx={{ marginTop: '20px' }}>
                  <input type="month" onChange={(e) => setSelectedMonth(e.target.value)} />
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>

      </Box >
    )
  )
}

export default Dashboard