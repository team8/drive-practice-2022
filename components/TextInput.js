import React from 'react';
import { TextInput } from 'react-native';

const NotesInput = (props) => {
    return (
      <TextInput
        {...props}
        editable
        maxLength={80}
      />
    );
}

export default NotesInput;