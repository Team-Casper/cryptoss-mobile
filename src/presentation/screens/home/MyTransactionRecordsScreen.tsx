import {_globalStyles} from '@screens/styles';
import {colors, height, width} from '@utils/globalConfig';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

type TransactionType = {
  NftMint: 'nft_mint';
  CoinSend: 'coin_send';
  CoinReceive: 'coin_receive';
};

interface TransactionInfo {
  transactionType: TransactionType;
  gas: number; // *10^(-8)
  dateMilliSeconds: number;
  receiver?: string;
  sender?: string;
}

const sampleData = [
  {
    time: '16:31',
    type: '코인 전송',
    address: '0x8765...4321',
    aptAmount: '49.68132',
    gas: '0.0032265',
  },
  {
    time: '16:26',
    type: '코인 수령',
    address: '0x9898...7676',
    aptAmount: '32.3221',
    gas: '0.0035213',
  },
  {
    time: '01:03',
    type: '코인 전송',
    address: '0x8765...4321',
    aptAmount: '0.2222',
    gas: '0.0032265',
  },
  {
    time: '01:01',
    type: '코인 수령',
    address: '0x9898...7676',
    aptAmount: '19.1123',
    gas: '0.0035213',
  },
  {
    time: '00:56',
    type: 'NFT Mint',
    address: '0x8765...4321',
    aptAmount: '0',
    gas: '0.0034433',
  },
  {
    time: '00:30',
    type: '코인 전송',
    address: '0x8765...4321',
    aptAmount: '0.2222',
    gas: '0.0032265',
  },
];

const transactionElementComponent = ({
  time,
  type,
  address,
  aptAmount,
  gas,
}: {
  time: string;
  type: string;
  address: string;
  aptAmount: string;
  gas: string;
}) => {
  return (
    <View style={_styles.transactionElementContainer}>
      <View style={_styles.timeAndTransactionTypeContainer}>
        <Text style={_styles.timeText}>{time}</Text>
        <Text style={_styles.transactionTypeText}>{type}</Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: 58 * height,
        }}>
        <Text style={_styles.timeText}>{address}</Text>
        <Text
          style={[
            _styles.transactionTypeText,
            {right: -2 * width},
            {
              color: type === '코인 수령' ? colors.red : colors.blue,
            },
          ]}>
          {aptAmount} APT
        </Text>
        <Text style={_styles.gasFeeText}>Gas {gas} APT</Text>
      </View>
    </View>
  );
};

const hardCodedSampleUI = () => {
  return (
    <>
      <Text style={[_styles.dateText]}>2023년 2월 2일</Text>
      <View style={_styles.transactionListContainer}>
        {sampleData.map((val: any, idx) => {
          return (
            <React.Fragment key={idx}>
              {transactionElementComponent({
                time: val.time,
                type: val.type,
                address: val.address,
                aptAmount: val.aptAmount,
                gas: val.gas,
              })}
            </React.Fragment>
          );
        })}
      </View>
      <Text style={[_styles.dateText, {marginTop: 25 * height}]}>
        2023년 2월 1일
      </Text>
      <View style={_styles.transactionListContainer}>
        {sampleData.slice(3).map((val: any, idx) => {
          return (
            <React.Fragment key={idx}>
              {transactionElementComponent({
                time: val.time,
                type: val.type,
                address: val.address,
                aptAmount: val.aptAmount,
                gas: val.gas,
              })}
            </React.Fragment>
          );
        })}
      </View>
    </>
  );
};

const milliseconds_getTimeString = (milliseconds: number) => {
  const my_date = new Date(milliseconds);
  const hours = my_date.getHours();
  const minutes = my_date.getMinutes();
  return hours + ':' + minutes;
};

export const MyTransactionRecordsScreen = ({navigation}: {navigation: any}) => {
  const [myTransactionList, setMyTransactionList] = useState([]);

  return (
    <View style={_styles.outerContainerStyle}>
      <Text
        style={[
          _globalStyles.mainText,
          {
            lineHeight: 29 * height,
            marginBottom: 25 * height,
            paddingHorizontal: 20 * width,
          },
        ]}>
        거래이력
      </Text>
      <ScrollView
        style={{width: 375 * width}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingBottom: 25 * height,
          paddingHorizontal: 20 * width,
        }}>
        {myTransactionList.length >= 1 && (
          <>
            <Text style={[_styles.dateText]}>2023년 2월 3일</Text>
            <View style={_styles.transactionListContainer}>
              {myTransactionList.map((val: any, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {transactionElementComponent({
                      time: milliseconds_getTimeString(val.milliseconds), // tmp
                      type: '코인 전송',
                      address: val.address, // tmp
                      aptAmount: val.aptAmount, // tmp
                      gas: (val.gas * Math.pow(10, -8)).toString(), // tmp
                    })}
                  </React.Fragment>
                );
              })}
            </View>
          </>
        )}

        {hardCodedSampleUI()}
      </ScrollView>
    </View>
  );
};

const _styles = StyleSheet.create({
  gasFeeText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 10 * height,
    lineHeight: 16 * height,
    color: colors.gray_3,
  },
  transactionTypeText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18 * height,
    lineHeight: 22 * height,
    color: 'black',
  },
  timeText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 12 * height,
    lineHeight: 15 * height,
    color: colors.gray_2,
  },
  timeAndTransactionTypeContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: -4 * height,
  },
  transactionListContainer: {
    marginTop: 8 * height,
    backgroundColor: 'white',
    borderRadius: 20 * height,
    width: '100%',
    paddingHorizontal: 15 * width,
  },
  transactionElementContainer: {
    width: '100%',
    paddingLeft: 10 * width,
    paddingRight: 7 * width,
    height: 100 * height,
    borderBottomColor: colors.gray_6,
    borderBottomWidth: 1 * height,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14 * height,
    lineHeight: 17 * height,
    textAlign: 'center',
    color: 'black',
  },
  footerContainer: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12 * height,
    lineHeight: 16 * height,
    textAlign: 'center',
  },
  outerContainerStyle: {
    flex: 1,
    backgroundColor: colors.homeScreenBackgroundColor,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 60 * height,
  },
});
