import { Box, Image, Text } from "@chakra-ui/react";
import { useNFTBalances } from "react-moralis";
import ContentCard from "../containers/ContentCard";
import React from "react";

const NFTs = ({ user }) => {
    const { getNFTBalances, data } = useNFTBalances();

    React.useEffect(() => {
        getNFTBalances({
            params: {
                chain: "rinkeby",
                address: user.get('ethAddress')
            }
        })
    }, [])
    return (
        <ContentCard>
            <Text fontSize="xl" fontWeight="bold">Your NFTs</Text>
            {data && data.result.map(nft => (
                <Box mt="4" px="2" py="2" borderWidth="1px" borderRadius="md" key={nft.token_uri}>
                    {nft.image && <Image src={nft.image} />}
                    <p>{nft.token_uri}</p>
                </Box>
            ))}
        </ContentCard>
    )
}
export default NFTs