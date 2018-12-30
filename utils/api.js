import { AsyncStorage, ToastAndroid } from 'react-native';

export const initialArr = async () => {
  try {
    await AsyncStorage.setItem('decks', JSON.stringify([]));
  } catch (error) {
    // Error saving data
    // alert(error);
    ToastAndroid.showWithGravity(
      error,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
}

export const asyncSaveDeck  = async (deck) => {
  try {
    await AsyncStorage.setItem('decks', JSON.stringify(deck));
  } catch (error) {
    // Error saving data
    // alert(error);
    ToastAndroid.showWithGravity(
      error,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
}

export const asyncGetDecks = async () => {
  const decks = await AsyncStorage.getItem('decks');
  return decks;
}

export const asyncGetAll = async () => {
  const all = await AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (err, stores) => {
      stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        let key = store[i][0];
        let value = store[i][1];
      });
    });
  });
}

export const asyncDeleteDecks = async () => {
  const decks = await AsyncStorage.clear();
  ToastAndroid.showWithGravity(
    'Deleted All Questions!!!  😢😢😢😢',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
  return decks;
}