<template>
	<div>
		<Slider />
		<el-row :gutter="60">
			<el-col :span="12" :xs="24">
				<!--{{ topNewsListVo }}-->
				<div class="" v-if="topNewsListVo != null">
					<div class="news-title-wrap">
						<span class="news-title">社团要闻</span>
						<router-link :to="{ name: 'PassageList', query: { passageTypeId: 1 } }" class="more" tag="span">更多>></router-link>
					</div>
					<ul class="news-list">
						<li v-for="news in topNewsListVo">
							<div>
								<router-link :to="{ name: 'Passage', params: { id: news.id } }" tag="a">{{ news.newsTitle }}</router-link>
								<span class="time">{{ dateformat(news.publishTime) }}</span>
							</div>
						</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="12" :xs="24">
				<!--{{ topNoticesVo }}-->
				<div class="grid-content bg-purple" v-if="topNoticesVo != null">
					<div class="news-title-wrap">
						<el-row >
							<span class="news-title">重要公告</span>
							<router-link :to="{ name: 'PassageList', query: { passageTypeId: 2 } }" class="more" tag="span">更多>></router-link>
						</el-row>
					</div>
					<ul class="news-list">
						<li v-for="news in topNoticesVo">
							<!--{{ news }}-->
							<el-row>
								<router-link :to="{ name: 'Passage', params: { noticeCd: news.noticeCd } }">{{ news.noticeDesc }}</router-link>
								<span class="publishTime">{{ dateformat(news.releaseTime) }}</span>
							</el-row>
						</li>
					</ul>
				</div>
			</el-col>
		</el-row>

		<div class="news-title-wrap show-wrap"><div class="news-title show">视展青春</div></div>
		<el-row :gutter="10"><IndexHotActivities /></el-row>
	</div>
</template>

<script>
const OK = 200;
import Slider from '@/components/club-face/common/Slider';
import IndexHotActivities from '@/components/club-face/home/IndexHotActivities';
export default {
	data() {
		return {
			topNoticesVo: {},
			topNewsListVo: {},
			topActivityVo: {},
			activityList: []
		};
	},
	components: {
		Slider,
		IndexHotActivities
	},
	methods: {
		dateformat: function (date) {
			var date = new Date(date).toJSON();
			return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().
			replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
		},
		getTopNotices: function() {  //获取社团公告前几名
			this.$axios
				.post('/api/clubnoticeslists', {
					/*passageTypeId: typeId*/
				})
				.then(res => {
					if (res.data.status == OK) {
						this.topNoticesVo = res.data.data.grid.list;
					} else {
						let warnMessage = res.data.description;
						this.$message({
							message: warnMessage,
							type: 'warning'
						})
					}
				});
		},
		getTopNewsList: function() {   //获取社团新闻
			this.$axios
				.post('/api/clubnewslists', {
						/*passageTypeId: typeId*/
				})
				.then(res => {
					if (res.data.status == OK) {
						this.topNewsListVo = res.data.data.grid.list;
					} else {
						let warnMessage = res.data.description;
						this.$message({
							message: warnMessage,
							type: 'warning'
						})
					}
				});
		},
		getTopActivityList: function(typeId, n) {  //获取社团活动前
			this.$axios
				.get('/api/activities', {
					params: {
						activityTypeId: typeId,
						pageNum: 1,
						pageSize: n
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.topActivityVo = res.data.data;
						this.activityList = this.topActivityVo.activityList;
						console.log(this.topActivityVo);
					} else {
						this.$layer.alert('error');
					}
				});
		}
	},
	created() {
		this.getTopNotices();
		this.getTopNewsList();
		//this.getTopActivityList(2, 4);
	}
};
</script>

<style scoped="scoped">
.news-title-wrap {
	background-color: #9a0e14;
	border-radius: 20px;
	position: relative;
}

.news-title-wrap .news-title {
	display: inline-block;
	left: 220px;
	top: 0px;
	width: 300px;
	color: white;
	font-family: '微软雅黑';
	font-weight: 900;
	font-size: 18px;
	height: 40px;
	line-height: 40px;
}

.news-title-wrap .more {
	position: absolute;

	right: 20px;
	top:10px;
	color: #fff;
	font-size: 16px;
	cursor: pointer;
}

.news-title-wrap.show-wrap {
	margin-top: 18px;
	position: relative;
	height: 40px;
	line-height: 40px;
}

.news-title-wrap .show {
	position: absolute;
	left: 10px;

}

.news-list li {
	height: 32px;
	line-height: 32px;

}

.news-list li{
	display: inline-block;
	float: left;
	width: 390px;
	height: 32px;
	line-height: 32px;
	margin-left: 25px;
	text-align: left;

	-webkit-line-clamp: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	white-space: normal;
}

.news-list li span {
	display: inline-block;
	margin-left: 85px;

	color: #000;
	font-size: 16px;
	height: 32px;
	line-height: 32px;
}
</style>
