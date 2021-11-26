import React from 'react';
import axios from "axios";

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'COLLECTIONS',
        children: [
            {
                label: 'Solana Monkey Business',
                img: '',
                href: '#',
            }
        ],
    },
    {
        label: 'MY FLOOR INSIGHTS',
        href: '#',
    },
    {
        label: 'HOW TO BUY NFTS',
        href: '#',
    }
];

const useViewModel = () => {
    const [collections, setCollections] = React.useState([]);
    const [navItems, setNavItems] = React.useState(NAV_ITEMS);
    const [solPrice, setSolPrice] = React.useState(0);

    const getCollections = () => {
        return new Promise(resolve => {
            axios.get(`${process.env.REACT_APP_API_HOST}/collections`)
                .then(res => {
                    if (res.status === 200) {
                        console.log('res-----', res.data);
                        const temp = res.data.map(el => {
                            return {
                                ...el,
                                tokenFloor: (el.tokenFloor),
                                tokenAverage: (el.tokenAverage),
                                listed: parseInt((el.listedCount / el.tokenCount) * 100),
                                floor_usd: parseInt(parseFloat(el.tokenFloor) * solPrice),
                                median_usd: parseInt(parseFloat(el.tokenAverage) * solPrice),
                                total_floor: parseInt(el.tokenCount * parseFloat(el.tokenFloor) * solPrice)
                            }
                        })
                        setCollections([...temp]);
                        setNavItems([...navItems.map(el => el.label === 'COLLECTIONS' ? {...el, children: [...res.data.map(e => {return {label: e.name, img: e.image};})]} : el)])
                        resolve(temp);
                    }
                })
        })
    }

    const getOverview = React.useCallback(async (collec) => {
        // await sleep(3000);
        axios.get(`${process.env.REACT_APP_API_HOST}/overview`)
            .then(res => {
                if (res.status === 200) {
                    console.log('market data---', res.data.market_data.current_price.usd, collections.length)
                    const price = res.data.market_data.current_price.usd;
                    setSolPrice(price);
                    const temp = collec.map(item => {
                        return {
                            ...item,
                            floor_usd: parseInt(parseFloat(item.tokenFloor) * price),
                            median_usd: parseInt(parseFloat(item.tokenAverage) * price),
                            total_floor: parseInt(item.tokenCount * parseFloat(item.tokenFloor) * price)
                        }
                    });
                    console.log('tem---', temp)
                    setCollections([...temp])
                }
            })
    }, [])

    const sleep = ms => {
        return new Promise((resolve => {
            setTimeout(resolve, ms)
        }))
    }

    React.useEffect(() => {
        getInit()
    }, [])

    const getInit = async () => {
        const collec = await getCollections();
        getOverview(collec)
    }

    const formatPrice = num => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    return {
        collections,
        getCollections,
        navItems,
        solPrice
    }
};

export default useViewModel