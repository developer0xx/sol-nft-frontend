import React from 'react';
import {
    Box,
    Button,
    Collapse,
    Flex, Icon,
    IconButton,
    Image, Link, Popover, PopoverContent, PopoverTrigger,
    Stack, Text,
    useColorMode,
    useColorModeValue,
    useDisclosure
} from '@chakra-ui/react'
import {ChevronDownIcon, CloseIcon, HamburgerIcon, MoonIcon, SunIcon} from "@chakra-ui/icons";
import {Link as ReactLink} from 'react-router-dom'

const Header = ({navItems}) => {
    const {isOpen, onToggle} = useDisclosure();
    const {colorMode, toggleColorMode} = useColorMode();
    return <Box>
        <Flex
            bg={useColorModeValue('gray.200', 'gray.200')}
            color={useColorModeValue('gray.600', 'white')}
            minH={'60px'}
            py={{base: 2}}
            px={{base: 4}}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align={'center'}>
            <Flex
                flex={{base: 1, md: 'auto'}}
                ml={{base: -2}}
                display={{base: 'flex', md: 'none'}}>
                <IconButton
                    onClick={onToggle}
                    icon={
                        isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>
                    }
                    variant={'ghost'}
                    aria-label={'Toggle Navigation'}
                />
            </Flex>
            <Flex flex={{base: 1}} justify={{base: 'center', md: 'start'}}>
                <Link as={ReactLink} to={'/'}>
                    <Image src={process.env.PUBLIC_URL + '/images/logo.png'} alt={'Logo'} style={{width: 100}}/>
                </Link>

                <Flex display={{base: 'none', md: 'flex'}} ml={10}>
                    <DesktopNav data={navItems}/>
                </Flex>
            </Flex>

            <Stack
                flex={{base: 1, md: 0}}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>
                <Button onClick={toggleColorMode} bg={useColorModeValue('green.300', 'black')}>
                    {colorMode === 'light' ?
                        <MoonIcon/> :
                        <SunIcon/>}
                </Button>
            </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
            <MobileNav data={navItems}/>
        </Collapse>
    </Box>
};
const DesktopNav = ({data}) => {
    const linkColor = useColorModeValue('green.600', 'black');
    const linkHoverColor = useColorModeValue('green.400', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {data.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'md'}
                                fontWeight={700}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({label, href, subLabel, img}: NavItem) => {
    return (
        <Link
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{bg: useColorModeValue('pink.50', 'gray.900')}}>
            <Stack direction={'row'} align={'center'}>
                <Flex alignItems={'center'}>
                    <Image src={img} w={30} h={30} borderRadius={15} mr={4}/>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{color: 'pink.400'}}
                        fontWeight={500}>
                        {label}
                    </Text>
                    {/*<Text fontSize={'sm'}>{subLabel}</Text>*/}
                </Flex>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{opacity: '100%', transform: 'translateX(0)'}}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = ({data}) => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{md: 'none'}}>
            {data.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({label, children, href}: NavItem) => {
    const {isOpen, onToggle} = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{marginTop: '0!important'}}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                    children.map((child) => (
                        <Link key={child.label} py={2} href={child.href}>
                            {child.label}
                        </Link>
                    ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

export default Header