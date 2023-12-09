<template>
	<main-masterpage>
		<template #title>
			<h2 class="text-h4 text-indigo-darken-2 mb-5">Наші автобуси</h2>
		</template>
		
		<template #list>
			<div v-if="isLoading">Loading ....</div>
	    	<div v-else-if="hasError">Error</div>
			<table class="mb-5 w-75">
				<thead>
					<tr>
						<th>Номер</th>
						<th>Кількість місць</th>
						<th></th>
					</tr>
				</thead>
				<tr v-for="bus in getBussesList" :key="bus.id">
					<td>{{ bus.plateNumber }}</td>
					<td>{{ bus.passengers }}</td>
					<td>
						<v-btn size="small" prepend-icon='mdi-pencil-outline' @click="onEdit(bus.id)">
	  						Edit
						</v-btn>
						<v-btn size="small" prepend-icon='mdi-trash-can-outline' @click="deleteBus(bus.id)">
	  						Delete
						</v-btn>
					</td>
				</tr>
			</table>
		</template>
		<template #actionBtn>
			<v-btn @click="onAdd">Додати</v-btn>
		</template>
	</main-masterpage>

	<router-view/>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import MainMasterpage from '../masterpages/MainMasterpage.vue';

	export default {
		name: 'BussesView',
		components: {
			MainMasterpage
		},
		computed: {
			...mapGetters('busses', ['getBussesList', 'isLoading', 'hasError'] ) 
		},
		created () {
			this.loadBussesList();
		},
		methods: {
			...mapActions('busses', ['loadBussesList', 'deleteBus']),

			onEdit(id) {
				this.$router.push({
					name: 'busEditor',
					params: {
						busId: id
					}
				})
			},

			onAdd() {
				this.$router.push({
					name: 'busEditor',
				})
		},
		},
	}
</script>

<style lang="scss" scoped>


</style>