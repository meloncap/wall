import { Text, Link } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import ContentCard from '../containers/ContentCard'

const Transactions = ({user}) => {
    
    const Web3Api = useMoralisWeb3Api()
    const [transactions, setTransactions] = useState()
    const BASE_URL = 'https://rinkeby.etherscan.io/tx/'
   
    const fetchTransactions = async () => {
        const data = await Web3Api.account.getTransactions({
            chain: "rinkeby",
            address: user.get("ethAddress")
        })
        if (data) setTransactions(data)
    }
    useEffect(() => {
      fetchTransactions()
    }, [])
  return (
    <ContentCard>
        <Text fontSize={'xl'} mb='6' fontWeight='bold'>Transactions:</Text>
        {transactions && transactions?.result?.map(curr=> (
            <div key={curr.hash}>
                <Link href={`${BASE_URL}${curr.hash}`}>{curr.hash}</Link>
            </div>
        ))}
    </ContentCard>
  )
}

export default Transactions