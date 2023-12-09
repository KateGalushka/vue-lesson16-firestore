<template>
	<v-row>
		<v-sheet class="mx-auto my-8 w-50">
			
			<div>
				<label>ПІБ шофера</label>
					<v-text-field v-model="driverData.name" type="text"  variant="solo"/>
			</div>
			<div>
				<label>Стаж шофера</label>
					<v-text-field v-model.number="driverData.experience" type="number" variant="solo"/>
			</div>
			<v-btn @click="onAction">{{ actionButtonTitle }}</v-btn>
			<v-btn @click="onCancel"> Скасувати</v-btn>
		</v-sheet>
	</v-row>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'DriverEditorView',

	data() {
		return {
			driverData: {},
		}
	},
	props: {
		driverId: {
			type: String
		},
	},

	computed: {
		...mapGetters('drivers', ['getDriverById']),
		
		actionButtonTitle() {
			return this.driverId ? 'Зберегти' : 'Створити'
		},
	},

	created() {
		this.driverData = { ...this.getDriverById(this.driverId) }
	},

	methods: {
		...mapActions('drivers', ['addDriver', 'updateDriver']),
		
		onAction() {
			if (!this.driverId) {
				this.addDriver(this.driverData);
			} else {
				this.updateDriver({
					driverId: this.driverData.id,
					driverData: {
						name: this.driverData.name,
						experience: this.driverData.experience
					}
				});
			};
			this.$router.push({ name: 'drivers' })
		},
		onCancel(){
			this.$router.push({ name: 'drivers' });
		}
	},
}
</script>

<style lang="scss" scoped>

</style>