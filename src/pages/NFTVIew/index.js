import React from 'react';
import {useParams} from 'react-router-dom'
import {Box, Text, Flex, Link} from '@chakra-ui/react'
import {Link as ReactLink, Routes, Route} from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import ListedTokens from "./components/ListedTokens";
import TokenHolders from "./components/TokenHolders";
import AllTokens from "./components/AllTokens";
import FloorInsights from "./components/FloorInsights";
import Rarities from "./components/Rarities";
import useViewModel from "./methods";

const NFTView = () => {
    const {slug} = useParams();
    const vm = useViewModel(slug);
    return <Box w={'80%'} m={'auto'}>
        <Text fontSize={'4xl'} fontFamily={'PlayFairDisplay'} mt={10} align={'left'}>{slug} - Dashboard</Text>
        <Flex mt={5} bg={'gray.100'} rounded={'xl'} p={2}>
            <Link as={ReactLink} to={'./'} _hover={{color: 'green.300'}} mr={5}>Dashboard</Link>
            <Link as={ReactLink} to={'./listed'} _hover={{color: 'green.300'}} mr={5}>Listed Tokens</Link>
            <Link as={ReactLink} to={'./all-owners'} _hover={{color: 'green.300'}} mr={5}>Token Holders</Link>
            <Link as={ReactLink} to={'./all-tokens'} _hover={{color: 'green.300'}} mr={5}>All Tokens</Link>
            <Link as={ReactLink} to={'./floor-insights'} _hover={{color: 'green.300'}} mr={5}>Floor INSIGHTS</Link>
            <Link as={ReactLink} to={'./rarities'} _hover={{color: 'green.300'}} mr={5}>Rarities</Link>
        </Flex>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='listed' element={<ListedTokens attributes={vm.attributes} columns={vm.columnsData} data={vm.listedTokens}/>}/>
            <Route path='all-owners' element={<TokenHolders/>}/>
            <Route path='all-tokens' element={<AllTokens/>}/>
            <Route path='floor-insights' element={<FloorInsights/>}/>
            <Route path='rarities' element={<Rarities/>}/>
        </Routes>

    </Box>
};

export default NFTView