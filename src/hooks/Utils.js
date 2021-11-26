import React from 'react';
import StoresContext from '../StoresContext';
import {
    useLocation
} from "react-router-dom";

const useStores = () => {
    return React.useContext(StoresContext);
};

const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export {useStores, useQuery}