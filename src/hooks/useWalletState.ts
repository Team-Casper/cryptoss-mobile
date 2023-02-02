// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import { useState, useCallback } from 'react';
import constate from 'constate';
import { getAptosAccountState, getAsyncStorageState } from '../utils/aptos/account';
import { WALLET_STATE_ASYNC_STORAGE_KEY } from '../utils/aptos/core/constants';
import { AptosAccountState, AsyncStorageState } from '../utils/aptos/core/types';
import { removeData, storeData } from '@utils/AsyncStorage';

const defaultValue: AsyncStorageState = {
  aptosAccountObject: undefined,
};

export interface UpdateWalletStateProps {
  aptosAccountState: AptosAccountState
}

export default function useWalletState() {
  const [asyncStorageState, setAsyncStorageState] = useState<AsyncStorageState | Promise<AsyncStorageState | null>>(
    () => getAsyncStorageState() ?? defaultValue,
  );

  const [aptosAccount, setAptosAccount] = useState<AptosAccountState>(() => getAptosAccountState());

  const updateWalletState = useCallback(async({ aptosAccountState }: UpdateWalletStateProps) => {
    try {
      const privateKeyObject = aptosAccountState?.toPrivateKeyObject();
      setAptosAccount(aptosAccountState);
      setAsyncStorageState({ aptosAccountObject: privateKeyObject });
      await storeData(WALLET_STATE_ASYNC_STORAGE_KEY, JSON.stringify(privateKeyObject));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }, []);

  const signOut = useCallback(async() => {
    setAptosAccount(undefined);
    setAsyncStorageState({ aptosAccountObject: undefined });
    await removeData(WALLET_STATE_ASYNC_STORAGE_KEY);
  }, []);

  return {
    aptosAccount, signOut, updateWalletState, walletState: asyncStorageState,
  };
}

export const [WalletStateProvider, useWalletStateContext] = constate(useWalletState);
