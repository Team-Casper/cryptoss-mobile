import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {colors, height, width} from '@utils/globalConfig';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import Icon_PhoneBook from '@assets/icons/icon_phone_book.svg';
import Icon_Pig from '@assets/icons/icon_pig.svg';
import Icon_Transaction_Inbox from '@assets/icons/icon_transaction_inbox.svg';
import Icon_Menu_Burger from '@assets/icons/icon_menu_burger.svg';
import Icon_File from '@assets/icons/icon_file.svg';

import {HomeScreen} from './HomeScreen';
import {MyAssetScreen} from './MyAssetScreen';
import {MyTransactionRecordsScreen} from './MyTransactionRecordsScreen';
import {CategoriesScreen} from './CategoriesScreen';

const Tab = createBottomTabNavigator();

export const HomeBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={'PhoneBook'}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderRadius: 16 * height,
          backgroundColor: 'white',
          borderTopWidth: 1 * height,
          borderTopColor: colors.gray_6,
          height: 95 * height,
          paddingTop: 12 * height,
          paddingHorizontal: 15 * height,
        },
      }}>
      <Tab.Screen
        name="PhoneBook"
        component={HomeScreen}
        options={{
          tabBarLabel: '연락처',
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.pointColor_light,
          tabBarInactiveTintColor: colors.gray_1,
          tabBarLabelStyle: _styles.tabBarLabelStyle,
          tabBarIcon: ({color}) => (
            <View style={{}}>
              <Icon_PhoneBook
                width={18 * height}
                height={18 * height}
                fill={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyAsset"
        component={MyAssetScreen}
        options={{
          tabBarLabel: '자산',
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.pointColor_light,
          tabBarInactiveTintColor: colors.gray_1,
          tabBarLabelStyle: _styles.tabBarLabelStyle,
          tabBarIcon: ({color}) => (
            <Icon_Pig width={18 * height} height={18 * height} fill={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyTransactionRecords"
        component={MyTransactionRecordsScreen}
        options={{
          tabBarLabel: '거래이력',
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.pointColor_light,
          tabBarInactiveTintColor: colors.gray_1,
          tabBarLabelStyle: _styles.tabBarLabelStyle,
          tabBarIcon: ({color}) => (
            <View style={{}}>
              <Icon_File //Icon_Transaction_Inbox
                width={18 * height}
                height={18 * height}
                fill={color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarLabel: '카테고리',
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: colors.pointColor_light,
          tabBarInactiveTintColor: colors.gray_1,
          tabBarLabelStyle: _styles.tabBarLabelStyle,
          tabBarIcon: ({color}) => (
            <View style={{}}>
              <Icon_Menu_Burger
                width={18 * height}
                height={18 * height}
                fill={color}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const _styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12 * height,
    lineHeight: 16 * height,
    textAlign: 'center',
  },
});
