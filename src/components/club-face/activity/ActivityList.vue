<template>
	<el-container>
		<el-header>
			<div class="site-nav">
				当前位置:
				<router-link :to="{ name: 'Home' }">首页</router-link>
				>
				<span>社团风采</span>
				>
				<router-link :to="{ name: 'ActivityList', query: { typeId: activityPageVo } }" class="activity-title" v-if="activityPageVo.activityType != null">
					{{ activityPageVo.activityType.type }}
				</router-link>
			</div>
		</el-header>
		<el-container>
			<el-aside width="200px"><pasage-type-list /></el-aside>
			<!--{{newsPageVo}}-->
			<el-main v-if="activityPageVo != null&&passageTypeId==1">
				<div class="news-title-wrap">
					<el-row>
						<span class="news-title" v-if="newsPageVo != null">{{ newsPageVo.newsTitle }}</span>
					</el-row>
				</div>
				<v-hr />
				<ul class="news-list" v-if="newsPageVo != null">
					<li v-for="news in newsPageVo">
						<!-- <div> -->
						<router-link :to="{ name: 'Passage', params: { newsCd: news.newsCd } }" :key="news.newsCd">{{ news.newsTitle }}</router-link>
						<span class="time">{{ dateformat(news.publishTime) }}</span>
						<!-- </div> -->
					</li>
				</ul>
			</el-main>

			<el-main v-if="activityPageVo != null">
				<!--{{activityPageVo}}-->
				<div class="news-title-wrap">
					<el-row>
						<!--<span class="news-title" v-if="activityPageVo != null">社团活动</span>-->
					</el-row>
				</div>
				<v-hr />
				<ul class="news-list" v-if="activityPageVo != null">
					<li v-for="news in activityPageVo">
						<!-- <div> -->
						<router-link :to="{ name: 'Passage', params: { activityId: news.activityId } }" :key="news.activityId">{{ news.activityName }}</router-link>
						<span class="time">{{ dateformat(news.createTime) }}</span>
						<!-- </div> -->
					</li>
				</ul>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
const OK = 200;
import activityTypeList from '@/components/club-face/activity/ActivityTypeList';
import Hr from '@/components/club-face/common/Hr.vue';
export default {
	data() {
		return {
			activityPageVo: {},
			currentPage: 1
		};
	},
	components: { activityTypeList, 'v-hr': Hr },
	methods: {
		dateformat: function (date) {
			var date = new Date(date).toJSON();
			return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().
			replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
		},
		getActivityPage: function(pageNum, pageSize) {
			var typeId = this.$route.query.typeId;
			console.log(typeId);
			this.$axios
					.post('/api/hotActivitys', {
						/*filePurpose: typeId,//文件用途标号*/
					})
					.then(res => {
						if (res.data.status == OK) {
							this.activityPageVo = res.data.data.grid.list;
							this.total='';
							this.total=res.data.data.grid.total;
						} else {
						}
					});
		},
		refreshActivityPage: function() {
			this.getActivityPage(this.currentPage, 8);
		}
	},
	created() {
		this.getActivityPage(this.currentPage, 8);
	},
	watch: {
		$route(to, from) {
			this.getActivityPage(this.currentPage, 8);
		}
	}
};
</script>

<style scoped="scoped">
.site-nav {
	float: left;
	height: 70px;
	line-height: 70px;
	font-size: 20px;
}
.activity-title-wrap .activity-title {
	display: block;
	width: 160px;
	font-size: 24px;
	color: #9a0e14;
	margin-bottom: 15px;
}
.news-list li {
	height: 32px;
	line-height: 32px;
}

.news-list li > a {
	display: inline-block;
	float: left;
	margin-left: 20px;
	width: 170px;
	height: 32px;
	line-height: 32px;
	text-align: left;

	-webkit-line-clamp: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	white-space: normal;
}
.news-list li > .time {
	float: left;
	margin-left: 75px;
}

.activity-list li {
	height: 32px;
	line-height: 32px;
	width: 800px;
}
/*.activity-list span{
	float: right;
	margin-right: 200px;
}*/
.activity-list li > a {
	display: inline-block;
	width: 300px;
	height: 32px;
	line-height: 32px;
	margin: 2px 2px;
	text-align: left;

	-webkit-line-clamp: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	white-space: normal;
}

@media screen and (max-width: 600px) {
	.el-header, .el-aside {
		display: none;
	}
}
</style>
