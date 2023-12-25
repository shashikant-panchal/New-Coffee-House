import React from 'react';
import { Input, Icon } from 'react-native-elements';

const SearchBar = ({ placeholder, onChangeText, onSearchPress }) => {
  return (
    <Input
      placeholder={placeholder}
      onChangeText={onChangeText}
      leftIcon={<Icon name="search" type="font-awesome" />}
    //   rightIcon={<Icon name="search" type="font-awesome" onPress={onSearchPress} />}
    />
  );
};

export default SearchBar;
