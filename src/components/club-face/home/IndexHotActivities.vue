<template>
	<div>
		<!--{{ hotActivityImgs }}-->
		<el-col :span="6" v-for="activityImg in hotActivityImgs" :key="activityImg.id" :xs="24" :sm="12" :md="6">
			<router-link class="img-show" :to="{name:'Activity',params:{id:activityImg.activityId}}">
				<img :src="activityImg.fileRte" alt="activityImg.fileNm" class="show-picture" />
			</router-link>
			<span class="news-title">{{ activityImg.activityName}}</span>
			<!-- <a class="img-show" href="#"><img :src="'/fileServer'+img.filePath" alt="img.fileName" class="show-picture" /></a> -->
		</el-col>
	</div>
</template>

<script>
	const OK = 200;
	export default {
		data() {
			return {
				filePageVo:{},
				hotActivityImgs: [],
				currentPage:1,
				fileDownPath: ""
			};
		},
		methods: {

      /*getArtcaList () {
        ArtcaList().then(result => {
          console.log(result)
          if (result.code === 0) {
            return false
          }
          if (result.length > 0) {
            console.log(result.data)
          }
        })
      },*/
			getFileList() {
				this.$axios
						.post('/api/hotActivitys', {
							/*filePurpose: typeId,//文件用途标号*/
						})
						.then(res => {
							if (res.data.status == OK) {
								console.log("活动"+JSON.stringify(res));
								this.hotActivityImgs = res.data.data.grid.list;
								this.total='';
								this.total=res.data.data.grid.total;
								console.log(JSON.stringify(this.hotActivityImgs));
							} else {
							}
						});
			},
		},
		created() {
			//var typeId = this.$route.query.typeId;
			this.getFileList();
          //this.getArtcaList();
		}
	};
</script>

<style>
	.show-picture {
		width: 240px;
		height: 220px;
		padding: 5px;
		cursor: pointer;
	}
</style>
