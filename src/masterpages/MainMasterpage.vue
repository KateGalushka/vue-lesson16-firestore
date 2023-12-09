<template>
	<v-container class="w-75">
		<nav>
			<router-link to="/">Головна</router-link> |
			<router-link :to="{name: 'drivers'}">Водії</router-link> |
			<router-link :to="{name: 'busses'}">Автобуси</router-link> |
			<router-link :to="{name: 'assignments'}">Призначення</router-link>
		</nav>
		<slot></slot>
		<slot name="title"></slot>
		<slot name="filters"></slot>
		<slot name="list"></slot>
		<slot name="actionBtn"></slot>
				
	</v-container>
</template>

<script>
	export default {
		name: 'MainMasterpage'
	}
</script>

<style lang="scss" scoped>

</style>