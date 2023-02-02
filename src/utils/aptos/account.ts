// Copyright (c) Aptos
// SPDX-License-Identifier: Apache-2.0

import {getData} from '@utils/AsyncStorage';
import {AptosAccount, AptosAccountObject} from 'aptos';
import {Buffer} from 'buffer';
import {KEY_LENGTH, WALLET_STATE_ASYNC_STORAGE_KEY} from './core/constants';
import {
  AptosAccountState,
  AsyncStorageState,
  Result,
  err,
  ok,
} from './core/types';

export function loginAccount(key: string): Result<AptosAccount, Error> {
  if (key.length === KEY_LENGTH) {
    try {
      const encodedKey = Uint8Array.from(Buffer.from(key, 'hex'));
      // todo: Ping API to check if a legit account
      const account = new AptosAccount(encodedKey, undefined);
      return ok(account);
    } catch (e) {
      return err(e as Error);
    }
  } else {
    return err(new Error('Key not the correct the length'));
  }
}

export function createNewAccount(): AptosAccount {
  const account = new AptosAccount();
  // todo: make request to create account on chain
  return account;
}

export async function getAsyncStorageState(): Promise<AsyncStorageState | null> {
  // Get from local storage by key
  const item = await getData(WALLET_STATE_ASYNC_STORAGE_KEY);
  // console.log("getData")
  // console.log(item)
  if (item) {
    const accountObject: AptosAccountObject = JSON.parse(item);
    return {aptosAccountObject: accountObject};
  }
  return null;
}

export async function getAptosAccountState(): Promise<AptosAccountState | null> {
  const asyncStorage = await getAsyncStorageState();
  if (asyncStorage) {
    const {aptosAccountObject}: any = asyncStorage;
    return aptosAccountObject
      ? AptosAccount.fromAptosAccountObject(aptosAccountObject)
      : undefined;
  }
  return undefined;
}
