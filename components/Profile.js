import { FormControl, Text, FormLabel, Input, Button } from '@chakra-ui/react'
import React, {useState} from 'react'
import { useMoralis } from 'react-moralis'
import ContentCard from '../containers/ContentCard'

const Profile = ({user}) => {
    const [newUsername, setNewUsername] = useState('')
    const {setUserData, isUserUpdating} = useMoralis()
  return (
    <ContentCard>
        <Text><b>Username:</b> {user.getUsername()}</Text>
        <Text><b>Address:</b> {user.get("ethAddress")}</Text>
        <form onSubmit={e=>{
            e.preventDefault()
            if(newUsername.trim() == "")return
            setUserData({username: newUsername}).then(()=> setNewUsername(""))
        }}>
            <FormControl mt='6'>
                <FormLabel htmlFor='username'>
                    Set a new username
                </FormLabel>
                <Input id="username" type='text' placeholder="Type a new Username" value={newUsername} onChange={e=> setNewUsername(e.target.value)}/>
            </FormControl>
            <Button mt='6' type='submit' colorScheme={'teal'} disabled={isUserUpdating}>Change your Username</Button>
        </form>
    </ContentCard>
  )
}

export default Profile