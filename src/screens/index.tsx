import React from 'react';
import {useAppDispatch, useAppSelector} from '../hook/hook';
import {fetchUser} from '../redux/slice/userSlice';
import {Button, Text, View} from 'react-native';

const UserDisplay: React.FC = () => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(state => state.users?.users[0]);
    const userFetchStatus = useAppSelector(state=>state.users.status);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>{userName}</Text>
      <Button title="fetch-user" onPress={() => dispatch(fetchUser())} />
      {userFetchStatus === 'loading' && <Text>Fetching user...</Text>}
    </View>
  );
};

export default UserDisplay;
