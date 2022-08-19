import { Text, Divider, } from '@chakra-ui/react'
import Moralis from 'moralis'
import React, {useState, useEffect} from 'react'
import { useERC20Balances, useMoralisWeb3Api } from 'react-moralis'
import ContentCard from '../containers/ContentCard'

const Balance = ({user}) => {
    const [nativeBalance, setNativeBalance] = useState()

    const Web3Api = useMoralisWeb3Api()
    const {fetchERC20Balances, data} = useERC20Balances()

    const fetchNativeBalance = async() => {
        const result = await Web3Api.account.getNativeBalance({
            chain: "rinkeby",
            address: user.get("ethAddress")
        }).catch(e=> console.dir(e))
        if (result?.balance) {
            setNativeBalance(Moralis.Units.FromWei(result.balance))
        }
    }

    useEffect(() => {
      fetchNativeBalance()
      fetchERC20Balances({
          params: {
            chain: "rinkeby",
            address: user.get("ethAddress")
          }
      })
    
    }, []) 
   
  return (
    <ContentCard>
        <Text fontSize={'xl'} fontWeight='bold'>My ERC20 Tokens:</Text>
        {!!nativeBalance && <Text mt='6'><b>ETH: </b>{nativeBalance}</Text>}
        <Divider mt='2'/>
        {!!data && data.map((curr,index) => (
            <>
                <Text mt='2'><b>{curr?.symbol || curr?.name}: </b> {Moralis.Units.FromWei(curr.balance)}</Text>
                {index !== data.length ?? <Divider mt='2'/>}
            </>
            ))}
    </ContentCard>
  )
}

export default Balance