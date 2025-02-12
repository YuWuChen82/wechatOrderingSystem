import {
	defineStore
} from 'pinia';

export const addressStore = defineStore('addressStore', {
	state: () => ({
		checkedId: '',
		address: "",
		area: "",
		phone: "",
		userName: "",
	}),
	actions: {
		
	},
});