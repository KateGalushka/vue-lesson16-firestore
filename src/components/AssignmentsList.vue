<template>
	<div>
		<div v-if="noAssignments" class="mb-7 text-h5 font-italic">
			Поки немає призначень
		</div>
		<div v-else>
			<div v-if="isLoading">Loading ....</div>
			<div v-else-if="hasError">Error</div>
			<table class="mb-5">
				<thead>
					<tr class="mb-4 border">
						<th>Шофер</th>
						<th>Номер автобуса</th>
						<th></th>
					</tr>
				</thead>
				<tr v-for="ass in getAssignmentsListWithNames" :key="ass.id">
					<td>{{ ass.driverName }}</td>
					<td>{{ ass.busNumber }}</td>
					<td>
						<v-btn @click="deleteAssignment(ass.id)" size="small" prepend-icon='mdi-trash-can-outline'>
			  				Delete
						</v-btn>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'AssignmentsList',
	
	computed: {
		...mapGetters('assignments', ['getAssignmentsList', 'getAssignmentsListWithNames', 'isLoading', 'hasError']),

		noAssignments(){
			return !this.getAssignmentsList.length
		}
	},
	
	methods: {
	...mapActions('assignments', ['deleteAssignment']),
	},
}
</script>

<style lang="scss" scoped></style>