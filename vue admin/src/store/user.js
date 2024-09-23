import { defineStore } from "pinia";
const UserStore = defineStore("UserId", {
  state: () => {
    return {
        user: {},
    };
  },
  getters: {
  },
  actions: {
  },
  
  persist: {
    enabled: true, 
    key: 'UserInfo',
    paths: ['user'],
  },
});

export default UserStore;
