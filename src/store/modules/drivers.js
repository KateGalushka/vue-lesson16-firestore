import DbOperations from '../helpers/DbOperations';
const collectionDB = new DbOperations('drivers');

export default {
		namespaced: true,
		state: {
			driversList: [],
			loading: false,
			error: null,
			// filterObj: {}
		},
		getters: {
			isLoading: (state) => state.loading,
			hasError: (state) => state.error,
			getDriversList: ({driversList}) => driversList,
			getDriverById: (state) => (driverId) => state.driversList.find((driver) => driver.id == driverId),
			
		},
		mutations: {
			setDriversList(state, list){
				state.driversList = list
			},
			setError(state, error) {
				state.error = error
			},
			setLoading(state, value) {
				state.loading = value
			},
			deleteDriver(state, driverId) {
				state.driversList = state.driversList.filter((driver) => driver.id !== driverId)
			},
			
			// updateFilterObj(state, filterObj) {
			// 	state.filterObj = filterObj
			// },
		},
		actions: {
			loadDriversList({ commit }) {
				commit('setError', null);
				commit('setLoading', true);
				collectionDB
					.loadItemsList()
					.then((list) => {
						commit('setDriversList', list)
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			},

			addDriver({ commit, dispatch }, driverData) {
				commit('setError', null);
				commit('setLoading', true);
				collectionDB
					.addItem(driverData)
					.then(()=> {
						dispatch('loadDriversList')
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
				},
			
			deleteDriver({ commit, dispatch }, driverId) {
				commit('setError', null);
				commit('setLoading', true);
				collectionDB
					.deleteItem(driverId)
					.then(() => {
						dispatch('loadDriversList').then(()=>{
							commit('deleteDriver', driverId);
							dispatch('assignments/deleteAssignmentByDriverId', driverId, { root: true })
						})
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
							
			},
			updateDriver({ commit, dispatch }, { driverId, driverData }) {
				// console.log(driverData);
				commit('setError', null);
				commit('setLoading', true);
				collectionDB
					.updateItem(driverId, driverData)
					.then(() => {
						dispatch('loadDriversList')
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			},
			// updateFilter({ commit }, filterObj) {
			// 	commit('updateFilterObj', filterObj);
			// },
			loadFilteredList({ commit }, filterObj){
				commit('setError', null);
				commit('setLoading', true);
				let {name, expFrom, expTo} = filterObj;
				console.log(name, expFrom, expTo);
				collectionDB
					.loadFilteredDriversData(name, parseInt(expFrom), parseInt(expTo))
					.then((list) => {
						commit('setDriversList', list)
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})

			}
		}

		


	}
