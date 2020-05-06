<template>
	<el-carousel indicator-position="outside">
		<el-carousel-item v-for="carousel in carouselImg" :key="carousel.fileId">
			<router-link :to="{ name: 'Passage', params: { id: carousel.uuid } }">
				<img :src="carousel.fileRte" alt="carousel.fileNm" class="slider-img" />
				<!--<img :src="'/fileServer/' + carousel.filePath" alt="carousel.fileName" class="slider-img" />-->
			</router-link>
		</el-carousel-item>
	</el-carousel>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			carouselImg: []
		};
	},
	methods: {
		getCarouselList: function(typeId) {
			this.$axios
				.post('/api/fileListFace', {
						filePurpose: typeId,//文件用途标号
				})
				.then(res => {
					if (res.data.status == OK) {
						this.carouselImg = res.data.data.grid.list;
						this.total='';
						this.total=res.data.data.grid.total;
						console.log(JSON.stringify(this.carouselImg));
					} else {
					}
				});
		},

		refreshPasagePage: function() {
			this.getCarouselList(3);
		}
	},
	created() {
		this.getCarouselList(3);
	}
};
</script>

<style scoped="scoped">
.el-carousel__item h3 {
	color: #475669;
	font-size: 18px;
	opacity: 0.75;
	line-height: 400px;
	margin: 0;
}

.slider-img {
	cursor: pointer;
	width: 1196px;
}
.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #d3dce6;
}
</style>
