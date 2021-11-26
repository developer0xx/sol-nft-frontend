import React from 'react';
import { useQuery } from "../../hooks/Utils";
import axios from "axios";
import {Flex, Image, Link, Button} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";

const formatPrice = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const columns = [
    {
        name: "Image",
        selector: row => row.image,
        cell: row => <Image src={row.image} w={10} h={10}/>
    },
    {
        name: "Rank *",
        selector: row => row.rank,
        sortable: true,
    },
    {
        name: "#",
        selector: row => row.tokenId,
        sortable: true,
    },
    {
        name: "Listed On",
        selector: row => row.listedOn,
        sortable: true,
    },
    {
        name: "Price",
        selector: row => row.price,
        sortable: true,
    },
    {
        name: 'USD',
        selector: row => row.usd,
        sortable: true
    },
    {
        name: "Buy Link",
        selector: row => row.buyLink,
        cell: row => <Link href={row.buyLink} isExternal><Button colorScheme="green">Buy</Button></Link>
    },
];


const useViewModel = (slug) => {
    const query = useQuery();
    const [tokens, setTokens] = React.useState([]);
    const [attributes, setAttributes] = React.useState([]);
    const [listedTokens, setListedTokens] = React.useState([]);
    const [columnsData, setColumnsData] = React.useState(columns);

    React.useEffect(() => {
        getListedTokens();
        getAttribute();
    }, [])

    const getAttribute = async () => {
        const result = await axios.post(`${process.env.REACT_APP_API_HOST}/collections/${slug}`, {includeLogs: true, slug})
        if (result.status === 200) {
            console.log('result----', result.data.attributes);
            setAttributes(result.data.attributes)
            Object.keys(result.data.attributes).map(key => {
                columnsData.push({
                    name: key,
                    selector: row => row[key],
                    sortable: true,
                })
            })
            setColumnsData([...columnsData]);
        }
    }

    const getListedTokens = async () => {
        const result = await axios.post(`${process.env.REACT_APP_API_HOST}/tokens/listed`, {collection: query.get('code')})
        if (result.status === 200) {
            console.log('listed tokens---', result.data);
            setListedTokens([...result.data.map(item => {return {...item, ...item.attributes}})])
        }
    }

    return {
        attributes,
        columnsData,
        listedTokens
    }
};

export default useViewModel