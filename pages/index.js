import { useMoralis } from "react-moralis"
import Head from "next/head"
import { Box, Button, Flex,Tabs, TabList, Text, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import Header from "../components/Header"
import Profile from "../components/Profile"
import Balance from "../components/Balance"
import Transactions from "../components/Transactions"
import NFTs from "../components/NFTs"
import SendEth from "../components/SendEth"


export default function Home() {
  const {isAuthenticated, authenticate, user, logout, isLoggingOut } = useMoralis()
  console.log(isAuthenticated)
  if (!isAuthenticated) return (
    <>
      <Head>
        <title> Login | Wallet Dashboard</title>
      </Head>
      <Flex 
        direction={"column"} 
        justifyContent={"center"} 
        alignItems="center" 
        width="100vw" 
        height="100vh" 
        bgGradient={"linear(to-br, teal.400, cyan.300)"}
        >
          <Text fontSize={"5xl"} fontWeight="bold" color='white'>Wallet Dashboard</Text>
          <Button onClick={()=> authenticate({signingMessage: "Sign into Wallet Dashboard"})} colorScheme='cyan' size='lg' mb='6'>Connect with Metamask</Button>
      </Flex>
    </>
    )
  return (
    <>
     <Head>
       <title> Wallet Dashboard</title>
     </Head>
     <Flex direction={'column'} width='100vw' height='100vh'>
       <Header isLoggingOut={isLoggingOut} user={user} logout={logout}/>
       <Box flex='1' bg={'cyan.100'} px='44' py='20'>
         <Tabs size='lg' colorScheme='teal' align="center">
           <TabList>
            <Tab fontWeight={'bold'}>Profile</Tab>
            <Tab fontWeight={'bold'}>Balance</Tab>
            <Tab fontWeight={'bold'}>Transactions</Tab>
            <Tab fontWeight={'bold'}>NFTs</Tab>
            <Tab fontWeight={'bold'}>Send ETH</Tab>
           </TabList>
           <TabPanels>
              <TabPanel>
                <Profile user={user}/>
              </TabPanel>
              <TabPanel>
                <Balance user={user}/>
              </TabPanel>
              <TabPanel>
                <Transactions user={user}/>
              </TabPanel>
              <TabPanel>
                <NFTs user={user}/>
              </TabPanel>
              <TabPanel>
                <SendEth user={user}/>
              </TabPanel>
           </TabPanels>
         </Tabs>
       </Box>
     </Flex>
    </>
  )
}