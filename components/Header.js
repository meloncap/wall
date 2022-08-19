import { Text, Flex, Center, Button } from "@chakra-ui/react";

export default function Header({user, logout, isLoggingOut}) {
    return ( 
        <header>
            <Flex
                justifyContent="space-between"
                bg='cyan.400'
                color='white'
                px='10'
                py={6}
            >
                <Center>
                    <Text fontSize='xl' fontWeight='bold'>Your Wallet Dashboard</Text>
                </Center>
                <Center>
                    <Text>{user.getUsername()}</Text>
                    <Button ml='4' colorScheme={'teal'} disabled={isLoggingOut} onClick={()=>logout()}>Logout</Button>
                </Center>

            </Flex>
        </header>
    )
}