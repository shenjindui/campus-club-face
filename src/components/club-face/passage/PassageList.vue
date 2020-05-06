<template>
	<el-container>
		<el-header>
			<div class="site-nav" v-if="passageTypeId==1">
				当前位置:
				<router-link :to="{ name: 'Home' }">首页</router-link>
				>
				<span class="large_type">社团快讯</span>
				>
				<span class="large_type">社团要闻</span>
				>
				<router-link :to="{ name: 'PassageList', query: { typeId: newsPageVo.newsCd } }" class="news-title" v-if="newsPageVo != null">
					{{ newsPageVo.newsCd }}
				</router-link>
			</div>
			<div class="site-nav" v-if="passageTypeId==2">
				当前位置:
				<router-link :to="{ name: 'Home' }">首页</router-link>
				>
				<span class="large_type">社团快讯</span>
				>
				<span class="large_type">重要公告</span>
				>
				<router-link :to="{ name: 'PassageList', query: { typeId: newsPageVo.newsCd } }" class="news-title" v-if="newsPageVo != null">
					{{ newsPageVo.newsCd }}
				</router-link>
			</div>
		</el-header>

		<el-container>
			<el-aside width="200px"><pasage-type-list /></el-aside>
			<!--{{newsPageVo}}-->
			<el-main v-if="newsPageVo != null&&passageTypeId==1">
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

			<el-main v-if="noticesPageVo != null&&passageTypeId==2">
				<!--{{noticesPageVo}}-->
				<div class="news-title-wrap">
					<el-row>
						<span class="news-title" v-if="noticesPageVo != null">{{ noticesPageVo.noticeDesc }}</span>
					</el-row>
				</div>
				<v-hr />
				<ul class="news-list" v-if="noticesPageVo != null">
					<li v-for="news in noticesPageVo">
						<!-- <div> -->
						<router-link :to="{ name: 'Passage', params: { noticeCd: news.noticeCd } }" :key="news.noticeCd">{{ news.noticeDesc }}</router-link>
						<span class="time">{{ dateformat(news.releaseTime) }}</span>
						<!-- </div> -->
					</li>
				</ul>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
const OK = 200;
import pasageTypeList from '@/components/club-face/passage/PassageTypeList.vue';
import Hr from '@/components/club-face/common/Hr.vue';
export default {
	data() {
		return {
			newsPageVo: {},
			noticesPageVo:{},
			typeId: '',
			currentPage: 1,
			passageTypeId:''
		};
	},
	components: { pasageTypeList, 'v-hr': Hr },
	methods: {
		dateformat: function (date) {
			var date = new Date(date).toJSON();
			return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().
			replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
		},
		getNewsPage: function(pageNum, pageSize) {
			var newsStCd = this.$route.query.newsStCd;
			if(newsStCd==null){
				newsStCd='st-00001';
			}
			this.$axios
				.post('/api/clubnewslists', {
					newsStCd:newsStCd,
				})
				.then(res => {
					if (res.data.status == OK) {
						this.newsPageVo = res.data.data.grid.list;
					} else {
						this.$layer.alert(res.data.data);
					}
				});
		},
		getNoticesPage: function(pageNum, pageSize) {
			var newsStCd = this.$route.query.newsStCd;
			if(newsStCd==null){
				newsStCd='st-00001';
			}
			this.$axios
					.post('/api/clubnoticeslists', {
						newsStCd:newsStCd,
					})
					.then(res => {
						if (res.data.status == OK) {
							this.noticesPageVo = res.data.data.grid.list;
						} else {
							this.$layer.alert(res.data.data);
						}
					});
		},
		refreshPasagePage: function() {
			this.getNewsPage(this.currentPage, 8);
		}
	},
	created() {
		//alert(this.passageTypeId);
		if(this.passageTypeId==null||this.passageTypeId==''){
			this.passageTypeId=1;
		}
		this.getNewsPage(1, 8);
		this.getNoticesPage(1, 8);
	},
	watch: {
		$route(to, from) {
			this.getNewsPage(this.currentPage, 8);
			this.getNoticesPage(this.currentPage, 8);
			var passageTypeId = this.$route.query.passageTypeId;
			this.passageTypeId=passageTypeId;
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
.large_type {
	margin: 0 5px;
}
.news-title-wrap .news-title {
	display: block;
	width: 120px;
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

@media screen and (max-width: 600px) {
	.el-header, .el-aside {
		display: none;
	}
	.news-list li > a {
		float: left;
		width: 100px;
	}
	.news-list li > .time {
		float: left;
		margin-left: 30px;
	}
}
</style>
