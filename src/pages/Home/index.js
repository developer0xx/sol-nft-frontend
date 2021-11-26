import {
    Box,
} from '@chakra-ui/react';
import CollectionsTable from "./components/CollectionsTable";
import useViewModel from "./method";
import Header from "../../components/Header";
import NFTView from "../NFTVIew";
import {Routes, Route} from 'react-router-dom';

export default function Home() {
    const {collections, navItems, solPrice} = useViewModel();
    return (
        <Box>
            <Header navItems={navItems}/>
            <Routes>
                <Route path='/' element={<CollectionsTable data={collections} solPrice={solPrice}/>}/>
                <Route path='nft/:slug/*' element={<NFTView/>}/>
            </Routes>
            {/*<CollectionsTable data={collections} solPrice={solPrice}/>*/}
        </Box>
    );
}