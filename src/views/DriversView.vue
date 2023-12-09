<template>
	<main-masterpage>
		<template #title>
			<h2 class="text-h4 text-indigo-darken-2 mb-5">Наші водії</h2>
		</template>
		<template #filters>
			<filters-for-drivers/>
		</template>
		<template #list>
			<v-row>
				<div v-if="isLoading">Loading ....</div>
				<div v-else-if="hasError">Error</div>
			</v-row>
			<v-row>
				<table class="mb-5 w-75">
					<thead>
						<tr class="mb-4">
							<th>ПІБ</th>
							<th>Стаж</th>
							<th></th>
						</tr>
					</thead>
					<tr v-for="driver in getDriversList" :key="driver.id">
						<td>{{ driver.name }}</td>
						<td>{{ driver.experience }}</td>
						<td>
							<v-btn size="small" prepend-icon='mdi-pencil-outline' @click="onEdit(driver.id)">
		  						Редагувати
							</v-btn>
							<v-btn size="small" prepend-icon='mdi-trash-can-outline' @click="deleteDriver(driver.id)">
		  						Видалити
							</v-btn>
						</td>
					</tr>
				</table>
			</v-row>
		</template>
			
		<template #actionBtn>
			<v-row>
				<v-btn @click="onAdd">Додати</v-btn>
			</v-row>
		</template>
	</main-masterpage>
	
	<router-view/>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MainMasterpage from '../masterpages/MainMasterpage.vue';
import FiltersForDrivers from '@/components/FiltersForDrivers.vue';

	export default {
		name: 'DriversView',
		components: {
			MainMasterpage, FiltersForDrivers
		},
		computed: {
			...mapGetters('drivers', ['getDriversList', 'isLoading', 'hasError']) 
		},
		created () {
			this.loadDriversList();
		},
		methods: {
			...mapActions('drivers', ['loadDriversList', 'deleteDriver']),
			
			onEdit(id){
				this.$router.push({
					name: 'driverEditor',
					params: {
						driverId: id
					}
				})
			},
			
			onAdd(){
				this.$router.push({
					name: 'driverEditor',
				})
			},

		},
	}
</script>

<style lang="scss" scoped>
table, tr, th, td {
	border: 1px solid #000;
	border-collapse: collapse;
	padding: 5px 10px;
}

</style>