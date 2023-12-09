<template>
	<div class="mb-10 w-50 mx-auto">
		<h3 class="mb-5 text-indigo-darken-2 font-italic">Нове призначення</h3>
		<div>
			<v-select
				v-model="assignment.driverId"
				:items="getDriversList"
				label="Виберіть водія"
				item-title="name"
				item-value="id"
				variant="solo"
				clearable>
					<template v-slot:item="{ props, item }">
						<v-list-item 
							v-bind="props"
							:value="item.raw.id"
							:subtitle="item.raw.experience">
						</v-list-item>
	            </template>
			</v-select>
			<v-select
				v-model="assignment.busId"
				:items="getBussesList"
				label="Автобус"
				item-title="plateNumber"
				item-value="id"
				variant="solo"
				clearable>
					<template v-slot:item="{ props, item }">
						<v-list-item 
							v-bind="props"
							:value="item.raw.id"
							:subtitle="item.raw.passengers">
						</v-list-item>
		         </template>
			</v-select>
		</div>
	
		<v-btn @click="onAddAssignment">Додати</v-btn>
		<v-btn @click="onCancel">Скасувати</v-btn>
	</div>  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
	name: 'SelectForAssignments',
	data() {
		return {
			assignment: {}
		}
	},
	computed: {
		...mapGetters('drivers', ['getDriversList']),
		...mapGetters('busses', ['getBussesList']),

	},
	methods: {
		...mapActions('assignments', ['addAssignment']),

		onAddAssignment(){
			this.addAssignment(this.assignment);
			this.assignment = {};
		},

		onCancel(){
			this.assignment = {};
		}
	},
}
</script>

<style lang="scss" scoped></style>