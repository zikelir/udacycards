import { AsyncStorage, ToastAndroid } from 'react-native';

// initial put of array on asyncstorage
export const initialArr = async () => {
  try {
    await AsyncStorage.setItem('decks', JSON.stringify([]));
  } catch (error) {
    // Error saving data
    ToastAndroid.showWithGravity(
      error,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
}

//function to save ssome deck in the array
export const asyncSaveDeck  = async (deck) => {
  try {
    await AsyncStorage.setItem('decks', JSON.stringify(deck));
  } catch (error) {
    // Error saving data
    ToastAndroid.showWithGravity(
      error,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
}

//function to get all decks
export const asyncGetDecks = async () => {
  const decks = await AsyncStorage.getItem('decks');
  return decks;
}

//function to delete all decks
export const asyncDeleteDecks = async () => {
  const decks = await AsyncStorage.clear();
  ToastAndroid.showWithGravity(
    'Deleted All Questions!!!  😢😢😢😢',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
  return decks;
}

// export const asyncGetAll = async () => {
//   const all = await AsyncStorage.getAllKeys((err, keys) => {
//     AsyncStorage.multiGet(keys, (err, stores) => {
//       stores.map((result, i, store) => {
//         // get at each store's key/value so you can work with it
//         let key = store[i][0];
//         let value = store[i][1];
//       });
//     });
//   });
// }

