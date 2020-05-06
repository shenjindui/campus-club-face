<template>
	<el-menu default-active="activeIndex"  active-text-color="#9a0e14" text-color="#000" v-if="passageTypeId==1||passageTypeId==''">
		<!--{{newsTypeList}}-->
		<el-menu-item v-for="(newsType, index) in newsTypeList" :key="index" >
			<span slot="title">
				<router-link :to="{ name: 'PassageList', query: { passageTypeId:1,newsStCd: newsType.stCd } }">{{ newsType.stName }}</router-link>
			</span>
		</el-menu-item>
	</el-menu>
	<el-menu default-active="activeIndex"  active-text-color="#9a0e14" text-color="#000" v-else-if="passageTypeId==2">
		<!--{{newsTypeList}}-->
		<el-menu-item v-for="(newsType, index) in newsTypeList" :key="index" >
			<span slot="title">
				<router-link :to="{ name: 'PassageList', query: { passageTypeId:2,newsStCd: newsType.stCd } }">{{ newsType.stName }}</router-link>
			</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			newsTypeList: [],
			activeIndex: '1',
			passageTypeId:''
		};
	},
	methods: {
		getNewsTypeList: function() {
			/*this.newsTypeList =[{
				id:'1',
				type:'文化类'
			}]*/

			;
			this.$axios.post('/api/menhu/clublists',{}).then(res => {
				if (res.data.status == OK) {
					this.newsTypeList = res.data.data.grid.list;
				} else {
					this.$layer.alert(res.data.data);
				}
			});
		}
	},
	created() {
		this.getNewsTypeList();
	},
	watch: {
		$route(to, from) {
			this.getNewsTypeList();
			var passageTypeId = this.$route.query.passageTypeId;
			this.passageTypeId=passageTypeId;
		}
	}
};
</script>

<style scoped="scoped">
.router-link-exact-active.router-link-active{
		font-size: 120%;
		font-weight: 900;
		color: #9a0e14;
	}
</style>
