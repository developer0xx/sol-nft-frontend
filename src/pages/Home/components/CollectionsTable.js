import React from 'react';
import DataTable from "react-data-table-component";
import {Stack, Image, Flex, Button, Link} from '@chakra-ui/react';
import {Link as ReachLink} from 'react-router-dom';
import "./styles.css";

const formatPrice = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const columns = [
    {
        name: "Project",
        selector: row => row.name,
        sortable: true,
        minWidth: '250px',
        cell: row => <Flex alignItems={'center'}><Image src={row.image} w={10} h={10} rounded={'full'} mr={2}/><Link as={ReachLink} to={`/nft/${row.slug}?code=${row.code}`} align={'left'} _hover={{color: "green.300"}}>{row.name}</Link></Flex>
    },
    {
        name: "# Tokens",
        selector: row => row.tokenCount,
        sortable: true,
        right: true,
    },
    {
        name: "Owners",
        selector: row => row.ownerCount,
        sortable: true,
        right: true,
    },
    {
        name: "Listed %",
        selector: row => row.listed,
        sortable: true,
        right: true,
        cell: row => <div>{row.listed}%</div>
    },
    {
        name: "Floor",
        selector: row => row.tokenFloor,
        sortable: true,
        right: true,
        cell: row => <div>{row.tokenFloor.toFixed(2)}</div>
    },
    {
        name: "USD",
        selector: row => row.floor_usd,
        sortable: true,
        right: true,
        cell: row => <div>${formatPrice(row.floor_usd)}</div>
    },
    {
        name: "Median",
        selector: row => row.tokenAverage,
        sortable: true,
        right: true,
        cell: row => <div>{row.tokenAverage.toFixed(2)}</div>
    },
    {
        name: "USD",
        selector: row => row.median_usd,
        sortable: true,
        right: true,
        cell: row => <div>${formatPrice(row.median_usd)}</div>
    },
    {
        name: "Total Floor Value",
        selector: row => row.total_floor,
        sortable: true,
        right: true,
        minWidth: '200px',
        cell: row => <div>${formatPrice(row.total_floor)}</div>
    },
    {
        name: '',
        cell: row => <Button colorScheme={'green'}>SHOW DATA</Button>
    }
];

const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#f7f7f7',
            fontSize: '18px',
            fontFamily: 'PlayFairDisplay'
        }
    },
    rows: {
        style: {
            // backgroundColor: 'gray'
        },
    },
    cells: {
        style: {
            fontFamily: 'Poppins'
        }
    }
}

const CollectionsTable = ({data, solPrice}) => {
    return (
        <div className="App">
            <Stack w={'80%'} m={'auto'} mt={10}>
                <DataTable
                    title="Current Projects"
                    columns={columns}
                    data={data}
                    defaultSortField="title"
                    // sortIcon={ArrowDownIcon}
                    customStyles={customStyles}
                />
            </Stack>
        </div>
    );
};

export default CollectionsTable;