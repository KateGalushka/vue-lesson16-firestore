<template>
	<main-masterpage>
		<h2 class="text-h4 text-indigo-darken-2 mb-5">Призначення</h2>
		
		<assignments-list/>

		<template #filters>
			<select-for-assignments/>
		</template>
				
	</main-masterpage>
	
</template>

<script>

import MainMasterpage from '@/masterpages/MainMasterpage.vue';
import SelectForAssignments from '@/components/SelectForAssignments.vue';
import AssignmentsList from '@/components/AssignmentsList.vue';
import { mapActions } from 'vuex';

	export default {
		name: 'AssignmentsView',
		components: {
			MainMasterpage, SelectForAssignments, AssignmentsList
		},
		
		created () {
			this.loadAssignList();
			this.loadDriversList();
			this.loadBussesList();
		},
		methods: {
			...mapActions('assignments', ['loadAssignList']), 
			...mapActions('drivers', ['loadDriversList']), 
			...mapActions('busses', ['loadBussesList']), 
		},
	}
</script>

<style lang="scss" scoped>

</style>