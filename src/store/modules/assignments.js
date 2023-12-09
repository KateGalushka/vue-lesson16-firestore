import DbOperations from '../helpers/DbOperations';
const collectionDB = new DbOperations('assignments');

export default {
	namespaced: true,
	state: ()=>({
		assignmentsList:[],
		loading: false,
		error: null
	}),
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,
		getAssignmentsList: (state) => state.assignmentsList,
		getAssignmentsByDriverId: (state) => (driverId) => state.assignmentsList.find(assignment => assignment.driverId == driverId),
		getAssignmentsByBusId: (state) => (busId) => state.assignmentsList.find(assignment => assignment.busId == busId),

		getAssignmentsListWithNames: (state, getters, rootState, rootGetters) =>
			state.assignmentsList.map((assignment) => {
				const driver = rootGetters['drivers/getDriverById'](assignment.driverId);
				const bus = rootGetters['busses/getBusById'](assignment.busId);
				let driverName = driver? driver.name : 'unknown';
				let busNumber = bus? bus.plateNumber : 'unknown';
				return {
					id: assignment.id,
					driverName: driverName,
					busNumber: busNumber
				}
			}),
	},
	mutations: {
		setAssignList(state, list){
			state.assignmentsList = list;
			console.log(state.assignmentsList)
		},
		setError(state, error) {
			state.error = error
		},
		setLoading(state, value) {
			state.loading = value
		},
		deleteAssignment(state, id) {
			state.assignmentsList = state.assignmentsList.filter((assignment) => assignment.id !== id)
		},
	},

	actions: {
		loadAssignList({ commit }) {
			commit('setError', null);
			commit('setLoading', true);
			collectionDB
				.loadItemsList()
				.then((list) => {
					commit('setAssignList', list)
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		addAssignment({ commit, dispatch }, assignment) {
			// console.log(assignment);
			commit('setError', null);
			commit('setLoading', true);
			collectionDB
				.addItem(assignment)
				.then(() => {
					dispatch('loadAssignList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		deleteAssignment({ commit }, assignId) {
			commit('setError', null);
			commit('setLoading', true);
			collectionDB
				.deleteItem(assignId)
				.then(() => {
					commit('deleteAssignment', assignId);
					// dispatch('loadAssignList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		deleteAssignmentByBusId({ dispatch, getters }, busId) {
			const assignmentToDelete = getters.getAssignmentsByBusId(busId);
			if (assignmentToDelete) {
				let assignId = assignmentToDelete.id;
				dispatch('deleteAssignment', assignId)
			}
		},
		deleteAssignmentByDriverId({ dispatch, getters }, driverId) {
			const assignmentToDelete = getters.getAssignmentsByDriverId(driverId);
			if (assignmentToDelete) {
				let assignId = assignmentToDelete.id;
				dispatch('deleteAssignment', assignId)
			}
		},
		
	},
	
}

