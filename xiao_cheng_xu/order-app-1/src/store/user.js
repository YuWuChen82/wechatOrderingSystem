import {
	defineStore
} from 'pinia';
import http from '/src/common/http.js'
export const userStore = defineStore('userStore', {
	state: () => ({
		nickName:"",
		avatarUrl:""
	}),
	actions: {
		setAvatarUrl(avatarUrl){
			this.avatarUrl = http.baseUrl + avatarUrl;
		}
	},
});