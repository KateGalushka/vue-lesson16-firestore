<template>
	<v-row>
		<v-sheet class="mx-auto my-8 w-50">
			<div>
				<label>Номер автобуса</label>
					<v-text-field v-model="busData.plateNumber" type="text"  variant="solo"/>
			</div>
			<div>
				<label>Кількість місць</label>
					<v-text-field v-model.number="busData.passengers" type="number" variant="solo"/>
			</div>
			<v-btn @click="onAction">{{ actionButtonTitle }}</v-btn>
			<v-btn @click="onCancel"> Скасувати</v-btn>
		</v-sheet>
	</v-row>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'BusEditorView',

	data() {
		return {
			busData: {},
		}
	},
	props: {
		busId: {
			type: String
		},
	},

	computed: {
		...mapGetters('busses', ['getBusById']),

		actionButtonTitle() {
			return this.busId ? 'Зберегти' : 'Створити'
		},
	},

	created() {
		this.busData = { ...this.getBusById(this.busId) }
	},

	methods: {
		...mapActions('busses', ['addBus', 'updateBus']),
		
		onAction() {
			if (!this.busId) {
				this.addBus(this.busData);
			} else {
				this.updateBus({
					busId: this.busData.id,
					busData: {
						plateNumber: this.busData.plateNumber,
						passengers: this.busData.passengers
					}
				});
			};
			this.$router.push({ name: 'busses' })
		},
		onCancel(){
			this.$router.push({ name: 'busses' });
		}
	},
}
</script>

<style lang="scss" scoped>

</style>