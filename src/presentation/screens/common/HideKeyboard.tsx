import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

export const HideKeyboard = ({children}: {children: JSX.Element}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
