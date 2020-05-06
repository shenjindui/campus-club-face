<template>
	<el-container>
		<el-header>
			<div class="site-nav">
				当前位置:
				<router-link :to="{ name: 'Home' }">首页</router-link>
				>
				<span class="large_type">活动资料下载</span>
                <el-button type="success" icon="reset" @click="exportExcel()" plain>全部下载</el-button>
			</div>
		</el-header>
		<el-container>
				<!--<ul class="file-list">
					<li v-for="file in files" :key="file.id">
						<a :href="'/fileServer/'+file.filePath">{{ file.fileName }}</a>
						&lt;!&ndash; <router-link :to="{name:'files',params:{id:file.id}}">{{file.fileName}}</router-link> &ndash;&gt;
						<span>{{ file.createTime }}</span>
					</li>
				</ul>
			</el-main>-->
            <div style="height: 30px;">

            </div>
			<el-table
					:data="tableData"
					border
					style="width: 100%;height: 97%">
				<el-table-column
						fixed align="center"
						prop="activityId"
						label="活动编号"
						width="150">
				</el-table-column>
				<el-table-column
						align="center"
						prop="activityName"
						label="活动名称"
						width="120">
				</el-table-column>
				<el-table-column
						align="center"
						prop="activitySpace"
						label="活动地点"
						width="120">
				</el-table-column>
				<el-table-column
						align="center"
						prop="hostStCd"
						label="主办社团"
						width="120">
				</el-table-column>
				<el-table-column
						align="center"
						prop="startTime"
						label="活动开始时间"
						width="180">
				</el-table-column>
				<el-table-column
						align="center"
						prop="endTime"
						label="活动结束时间"
						width="180">
				</el-table-column>
				<el-table-column
						fixed="right"
						label="操作"
						width="100">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small" @click="exportExcelSimple(scope.row)">下载</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-container>
		<div class="pagination">
			<!-- :current-page="currentPage4"-->
			<el-pagination

					@current-change="handleCurrentChange"
					:page-sizes="[5, 10, 20, 50]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="tableData.length">
			</el-pagination>
		</div>
	</el-container>

</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			filePageVo:{},
			files: [],
			currentPage:1,
			fileDownPath: "",
			tableData:[]
			/*tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1518 弄',
				zip: 200333
			}, {
				date: '2016-05-04',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1517 弄',
				zip: 200333
			}, {
				date: '2016-05-01',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1519 弄',
				zip: 200333
			}, {
				date: '2016-05-03',
				name: '王小虎',
				province: '上海',
				city: '普陀区',
				address: '上海市普陀区金沙江路 1516 弄',
				zip: 200333
			}]
*/
		};
	},
	methods: {
		handleClick(row){
			let successMessage = "活动编号:"+row.activityId+"活动名称:"+row.activityName;
			this.$message({
				message: successMessage,
				type: 'success'
			})
		},
		exportExcelSimple(row){
			window.open("/api/exportExcel?activityId="+row.activityId);
		},
        exportExcel(){
            window.open("/api/exportExcel");

        },
		getActivityList: function(typeId, pageNum, pageSize) {
			this.$axios
				.post('/api/menhu/clubActivityListFace', {
					params: {

					}
				})
				.then(res => {
					if (res.data.status == OK) {
						this.tableData=res.data.data.grid.list;
					} else {
					}
				});
		},
		refreshPasagePage: function() {
			this.getFileList(3,this.currentPage, 8);
		}
	},
	created() {
		var typeId = this.$route.query.typeId;
		this.getActivityList(3,this.currentPage, 8);
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
.file-title {
	display: block;
	width: 120px;
	margin: 0 auto;
	font-size: 24px;
	color: #9a0e14;
	margin-bottom: 15px;
}
.file-list li {
	height: 32px;
	line-height: 32px;
}

.file-list li > a {
	display: inline-block;
	width: 270px;
	height: 32px;
	line-height: 32px;
	float: left;
	margin-left: 150px;
	text-align: left;

	-webkit-line-clamp: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	white-space: normal;
}
.file-list li > span {
	height: 32px;
	line-height: 32px;
	color: #111;
	font-size: 16px;
}
</style>
