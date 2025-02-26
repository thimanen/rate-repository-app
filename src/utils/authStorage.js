/*import AsyncStorage from "@react-native-async-storage/async-storage";*/
import * as SecureStore from "expo-secure-store";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    /*
    const accessToken = await AsyncStorage.getItem(
      `${this.namespace}:accessToken`
    );
    */
    const accessToken = await SecureStore.getItemAsync(
      `${this.namespace}-accessToken`
    );
    if (accessToken) {
      return accessToken ? JSON.parse(accessToken) : [];

      /*return accessToken;*/
    }
  }

  async setAccessToken(accessToken) {
    /*
    await AsyncStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(accessToken)
    );
    */
    await SecureStore.setItemAsync(
      `${this.namespace}-accessToken`,
      JSON.stringify(accessToken)
    );
  }

  async removeAccessToken() {
    /*
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
    */
    await SecureStore.deleteItemAsync(`${this.namespace}-accessToken`);
  }
}

export default AuthStorage;
