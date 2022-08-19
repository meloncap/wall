import { Box, FormLabel, Image,FormControl, NumberDecrementStepper,Button, NumberIncrementStepper, NumberInput, NumberInputField, Text, NumberInputStepper, Input, useToast } from "@chakra-ui/react";
import { useNFTBalances, useWeb3Transfer } from "react-moralis";
import ContentCard from "../containers/ContentCard";
import React, {useState} from "react";
import Moralis from "moralis";

const SendEth = ({ user }) => {
    const [ethAmount, setEthAmount] = useState(0)
    const [address, setAddress] = useState('')

    const handleChange = value => setEthAmount(value)

    

    const toast = useToast()

    const { fetch, isFetching } = useWeb3Transfer({
        amount: Moralis.Units.ETH(!!amount ? 0 : amount),
        receiver: address,
        type: "native",
    });

    console.log(ethAmount, address)

    const handleTransfer = async e => {
        e.preventDefault()
            await Moralis.enableWeb3()
            fetch({
                onSuccess: () => {
                    toast({
                        title: "ETH successfully sent.",
                        description: "The receiver should be able to see the Eth in a couple of minutes.",
                        status: "success",
                        duration: 9000,
                        isClosable: true
                    })
                },
                onError: (error) => {
                    console.log(error)
                    toast({
                        title: "ETH could not be sent.",
                        description: "Please Check your balance and fill out the fields.",
                        status: "error",
                        duration: 9000,
                        isClosable: true
                    })
                }
            })
    }

    return (
        <ContentCard>
            <Text fontSize={'xl'} mb='6' fontWeight='bold'>Send ETH:</Text>
            <form onSubmit={handleTransfer}>
                <FormControl mt='4'>
                    <FormLabel htmlFor="amount">
                        Amount of ETH
                    </FormLabel>
                    <NumberInput onChange={handleChange} step={0.1}>
                        <NumberInputField/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                    <FormLabel mt='4' htmlFor="address">
                        Send to: 
                    </FormLabel>
                    <Input value={address} onChange={({target})=> setAddress(target.value)} type={'text'} id='address' placeholder="Type address here" />
                </FormControl>
                <Button mt='4' type="submit" disabled={isFetching}>Send</Button>
            </form>
        </ContentCard>
    )
}
export default SendEth