import React from 'react';
import {Select, Stack, Grid, Box, Text} from "@chakra-ui/react"
import DataTable from "react-data-table-component";

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

const ListedTokens = ({attributes, columns, data}) => {
    const [filters, setFilters] = React.useState({});
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [filteredItems, setFilteredItems] = React.useState([]);
    React.useEffect(() => {
        setFilteredItems([...data.filter(item => {
            let flag = true;
                Object.entries(filters).forEach(([key, value]) => {
                    console.log('kye, value', key, value, (item[key] && item[key].toLowerCase().includes(value.toLowerCase())))
                    if (!(item[key] && item[key].toLowerCase().includes(value.toLowerCase()))) {flag &= false;}
                })
            console.log('trye')
                return flag;
            }
        )])
    }, [filters])
    const handler = (ev, attribute) => {
        if (ev === '' && filters.hasOwnProperty(attribute)) {
            delete filters[attribute]
            setFilters({...filters})
        } else {
            setFilters({...filters, [attribute] : ev})
        }
        console.log('---------', ev, attribute, filters)
    }
    return <Stack pt={10}>
        <Grid templateColumns={{base : "repeat(1, 1fr)", md: "repeat(4, 1fr)", xl : "repeat(6, 1fr)", "2xl": "repeat(8, 1fr)"}} gap={6}>

            {
                Object.entries(attributes).map(([attribute, optionsData]) => {
                    return <Box key={`select_${attribute}`}>
                        <Text fontSize={'md'} align={'left'} color={'gray.600'}>{attribute}</Text>
                        <Select placeholder={''} onChange={ev => handler(ev.target.value, attribute)}>
                            <option value={""}>---</option>
                        {
                            optionsData.map((item, j) => {
                                return <option value={item.name} key={`key_${j}`}>{item.name}</option>
                            })
                        }
                    </Select>
                    </Box>
                })
            }
        </Grid>

        <Stack mt={10}>
            <DataTable
                // title="Listed Tokens"
                columns={columns}
                data={filteredItems}
                pagination
                // defaultSortField="title"
                // sortIcon={ArrowDownIcon}
                customStyles={customStyles}
            />
        </Stack>

    </Stack>
};

export default ListedTokens