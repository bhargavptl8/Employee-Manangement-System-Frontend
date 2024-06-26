import React from 'react'
import { Box } from '@mui/material'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, LinearScale, CategoryScale, PointElement, Tooltip, Legend, TimeScale, Title, } from "chart.js";
import 'chartjs-adapter-date-fns';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    TimeScale,
    Title
)

const Linechart = ({ selectedMonth }) => {

    let empDetailsData = useSelector(state => state?.empDetailsData)
    let jobCategoryData = useSelector(state => state?.jobCategoryData)

    const styles = [
        {
            backgroundColor: 'aqua',
            borderColor: '#000000',
            pointBorderColor: 'aqua',
            tension: 0.4,
            fill: true
        },
        {
            backgroundColor: 'red',
            borderColor: '#5a61bc',
            pointBorderColor: 'red',
            tension: 0.4
        },
        {
            backgroundColor: '#3498db',
            borderColor: '#f1c40f',
            pointBorderColor: '#3498db',
            tension: 0.4
        }
    ]


    let filterData = jobCategoryData?.data?.map((data, index) => {

        let storeData = [];
        let store = [];

        empDetailsData?.data?.filter((empData) => empData?.jobCategory === data?._id)
            .map((el) => {

                if (!store?.includes(moment(el?.joiningDate)?.format()?.split('T')[0])) {
                    store.push(moment(el?.joiningDate)?.format()?.split('T')[0]);
                    storeData.push({ x: moment(el?.joiningDate)?.format()?.split('T')[0], y: 1 });
                }
                else {

                    storeData?.map((storeData) => {

                        if (storeData.x === moment(el?.joiningDate)?.format()?.split('T')[0]) {
                            storeData.y++
                        }
                    })
                }
            })


        return { id: data?._id, filterDatas: storeData, style : styles[index]}
    })


    let data = {
        // labels: ['2023-01-01', '2023-02-02', '2023-03-03', '2023-10-10', '2024-6-24'],
        datasets: jobCategoryData?.data?.map((data) => {

            const filterEntry = filterData?.find(el => el?.id === data?._id);

            return {
                label: data?.jobCategory,
                data: filterEntry?.filterDatas,
                ...filterEntry?.style
            }
        })
    }

    let defaultOptions = {
        responsive: true,
        plugins: {
            Legend: true,
            title: {
                display: true,
                text: 'Employee Management System'
            },
        },
        scales: {
            x: {
                min: '2024-05-01',
                max: '2024-12-30',
                type: 'time',
                time: {
                    unit: 'day'
                }
            },
        }
    }


    let filterDataByMonth = (month) => {

        let currentMonth = month?.split('-')[1]
        let currentYear = month?.split('-')[0]


        if (currentMonth && currentYear) {
            let endD = moment(new Date(currentYear, currentMonth, 0))?.format('L');

            let endDateSplit = endD.split('/')

            let startDate = `${endDateSplit[2]}-${endDateSplit[0]}-01`
            let endDate = `${endDateSplit[2]}-${endDateSplit[0]}-${endDateSplit[1]}`

            console.log(startDate);
            console.log(endDate);

            return {
                ...defaultOptions,
                scales: {
                    ...defaultOptions?.scales,
                    x: {
                        ...defaultOptions?.scales?.x,
                        min: startDate,
                        max: endDate
                    }
                }
            }

        }

    }

    const filteredOptions = filterDataByMonth(selectedMonth);


    return (
        <Box sx={{ width: '100%', height: '100%'}}>
            <Line
                data={data}
                options={filteredOptions}
            ></Line>
        </Box>
    )
}

export default Linechart