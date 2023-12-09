<template>
	<v-row class="my-6">
		<h4 class="text-h6">Фільтри:</h4>
		<v-col>
			<v-text-field v-model.lazy="driversFilterObj.name" label="ПІБ" variant="solo" clearable persistent-clear class="name"></v-text-field>
			<v-btn @click="onFilter">Шукати</v-btn>
			<v-btn @click="onClear">Очистити фільтри</v-btn>
		</v-col>
		<v-col>
			<div class="d-flex ga-4">
				<span>Стаж:</span>
				<v-text-field v-model.lazy="driversFilterObj.expFrom" label="від" type="number" variant="solo" clearable persistent-clear class="experience"></v-text-field>
				<v-text-field v-model.lazy="driversFilterObj.expTo" label="до" type="number" variant="solo" clearable persistent-clear class="experience"></v-text-field>
			</div>
			
		</v-col>
	</v-row>
</template>

<script>
import { mapActions } from 'vuex';


	export default {
		name: 'FiltersForDrivers',
		data() {
			return {
				driversFilterObj: {}
			}
		},
		watch: {
			// driversFilterObj:{
			// 	handler(newVal){
			// 		this.updateFilter(newVal);
			// 		this.loadFilteredList(newVal);
			// 	},
			// 	deep:true
			// }
		},
		methods: {
			...mapActions('drivers', ['updateFilter', 'loadDriversList' ,'loadFilteredList']),

			onFilter(){
				this.loadFilteredList(this.driversFilterObj);
			},
			
			onClear(){
				this.driversFilterObj = {};
				this.loadDriversList()
			}
		},
	}
</script>

<style lang="scss" scoped>
.name{
	max-width:500px;
}
.experience{
	max-width: 150px;
}

</style>