import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('busses')
export default {
	namespaced: true,
	state: () => ({
		// bussesList: [
		// 	{
		// 		id:11,
		// 		plateNumber: 'AA2158AI',
		// 		passengers: 25
		// 	},
		// 	{
		// 		id:22,
		// 		plateNumber: 'plateNumber',
		// 		passengers: 32
		// 	},
		// 	{
		// 		id:33,
		// 		plateNumber: 'BH1756BI',
		// 		passengers: 38
		// 	},
		// 	{
		// 		id:44,
		// 		plateNumber: 'AE3574AA',
		// 		passengers: 20
		// 	},
		// 	{
		// 		id:55,
		// 		plateNumber: 'AI1198AX',
		// 		passengers: 40
		// 	}
		// ],
		bussesList: [],
		loading: false,
		error: null

	}),
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,
		getBussesList: (state) => state.bussesList,
		getBusById: (state) => (busId) => state.bussesList.find((bus) => bus.id == busId),
	},
	mutations: {
		setBussesList(state, list){
			state.bussesList = list
		},
		setError(state, error){
			state.error = error
		},
		setLoading(state, value){
			state.loading = value
		},
		deleteBus(state, busId) {
			state.bussesList = state.bussesList.filter((bus) => bus.id !== busId)
		},
		},
	actions: {
		loadBussesList({ commit }){
			commit('setError', null);
			commit('setLoading', true);

			collectionDB
				.loadItemsList()
				.then((list) => {
					commit('setBussesList', list)
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(()=> {
					commit('setLoading', false)
				})
		},
		addBus({ commit, dispatch }, busData) {
			commit('setError', null);
			commit('setLoading', true);
			collectionDB
				.addItem(busData)
				.then(() => {
					dispatch('loadBussesList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},

		deleteBus({ commit, dispatch }, busId) {
			commit('setError', null);
			commit('setLoading', true);
			collectionDB
				.deleteItem(busId)
				.then(() => {
					dispatch('loadBussesList').then(() => {
						commit('deleteBus', busId);
						dispatch('assignments/deleteAssignmentByBusId', busId, { root: true });
					})
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		updateBus({ commit, dispatch }, { busId, busData }) {
			console.log('busId', busId);
			console.log('busData', busData);
			commit('setError', null);
			commit('setLoading', true);
			collectionDB
				.updateItem(busId, busData)
				.then(() => {
					dispatch('loadBussesList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
	}
}