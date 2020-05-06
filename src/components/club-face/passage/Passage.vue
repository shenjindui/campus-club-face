<template>
	<div class="" v-if="typeId ==1 ">  <!--社团联简介-->
		<span class="title"><!--{{ passage.title }}-->社团联简介</span>
		<div class="time-wrap">
			发布时间:<span class="time"><!--{{ passage.publishTime }}-->2020年2月25日</span>
		</div>
		<div  class="content">
			如果你怀有一颗积极向上的心，如果你不想让自己的大学过的单调乏味，如果你负责有耐心，那么请给自己一次学习的机会，
			给自己一个展示的舞台，给自己一份学习之余的精彩。青春是张扬、奋进与梦想，寻一个锻炼的机会，寻一支团结进取的团队
			寻一群志同道合的朋友，寻一个温暖的社联之家。　这里有丰富的文化活动，这里有浓厚的文化气息，这是你接触文化艺术类社团的平台
			，这是你施展才华的天地，你将感受别样的精彩！大学只有一次，请给它炫彩的权利，我在社联这个大家庭中等待你的到来！
		</div>
		    <!--{{ fileList }}-->
			<div v-for="file in fileList" :key="file.fileId">
				<img :src="file.fileRte" alt="file.fileNm" class="slider-img" />
				<!--<img :src="'/fileServer' + file.fileRte" class="show-image" :alt="file.fileNm" v-if="isImage(file.fileNm)" />-->
				<!--<a :href="'/fileServer' + file.fileRte" v-else>{{ file.fileNm }}</a>-->
			</div>
				本学生社团联合会是由校党委领导接受，校团委指导和支持的在册学生社团的联合体，成立于2008年， 是一个以丰富校园文化
				生活、弘扬校园主旋律，服务管理学生社团为宗旨，以为各个学生社团的良好发展创造条件，协调各学生社团之间的关系， 加强
				学生社团的统一建设为基本任务，联合全校学生社团创造性地开展理论教育、科技创新、文化体育、社会实践等丰富多彩的活动，
				按照自我教育 、自我管理、自我服务的要求，突出在校生学生社团的思想性、学术性、知识性、趣味性，提高大学生综合素质，
				为学生社团成员的全面成长成才服务的组织。
		<div class="footer">
			<Share />
		</div>

	   </div>

	<div class="" v-else-if="typeId ==2 ">  <!--社团联简介-->
		<span class="title">{{ stInfo.stName }}社团简介</span>
		<div class="time-warp2">
			<el-input  placeholder="请输入社团编号" style="width: 200px" v-model="params.stCd"></el-input>&nbsp;
			<el-button type="danger" icon="search" @click="search()">搜索</el-button>
			<el-button type="danger" icon="reset" @click="reset()">重置</el-button>
			<span class="serach">成立时间:{{dateformat(stInfo.createTime)}}</span>
		</div>
		<span>【现任社长:{{stInfo.stChargeName}}】</span>
		<div  class="content">
			{{stInfo.stDesc}}
		</div>
		<!--{{ fileList }}-->
		<!--<div v-for="file in fileList" :key="file.fileId">-->
			<img :src="stInfo.fileRte" alt="file.fileNm" class="slider-img" />
			<!--<img :src="'/fileServer' + file.fileRte" class="show-image" :alt="file.fileNm" v-if="isImage(file.fileNm)" />-->
			<!--<a :href="'/fileServer' + file.fileRte" v-else>{{ file.fileNm }}</a>-->
		<!--</div>--><p></p>
		本学生社团优秀成员:<p></p>
		<div v-for="member in stBestMembers" :key="member.memberSno">
			<span>姓名:{{member.memberName}}   性别：{{ sexformat(member.sex) }}  专业:{{member.major}}  班级:{{member.class }}  学号:{{ member.memberSno}}</span>
		    <hr/>
		</div>
		<!--<div class="footer">
			<Share />
		</div>-->

	</div>  <!--社团简介-->
</template>

<script>
import Share from '@/components/club-face/common/Share.vue';
const OK = 200;
export default {
	data() {
		return {
			passage: {},
			fileList:[],
			typeId:'',

		     params:{stCd:"st-00001",},
		     stInfo:[],
			stBestMembers:[]

		};
	},
	components: { Share },
	methods: {
		dateformat: function (date) {
			var date = new Date(date).toJSON();
			return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().
			replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
		},
		sexformat:function(sex){
           switch (sex) {
			   case '1':return '男';break;
			   case '0':return '女';break;
			   default :return '未知错误';break;
		   }
		},
		get: function(typeId) {
			this.$axios
					.post('/api/fileListFace', {
						filePurpose: typeId,//文件用途标号
					})
					.then(res => {
						if (res.data.status == OK) {
							this.fileList = res.data.data.grid.list;
							this.total='';
							this.total=res.data.data.grid.total;
							console.log(JSON.stringify(this.fileList));
						} else {
						}
					});
		},
		isImage: function(fileName) {
			var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
			if (ext == 'png' || ext == 'jpg') {
				return true;
			}
			return false;
		},
		getStInfo(stNmOrId){
			this.$axios
					.post('/api/menhu/clubdetail', {
						stCd: stNmOrId,//
						//stName:this.params.stCd
					})
					.then(res => {
						if (res.data.status == OK) {
							this.stInfo=res.data.data;
							console.log("社团详情"+JSON.stringify(res.data))
							this.stBestMembers=this.stInfo.stBestMembers;
							/*this.fileList = res.data.data.grid.list;
							this.total='';
							this.total=res.data.data.grid.total;
							console.log(JSON.stringify(this.fileList));*/
						} else if(res.data.status == 400){
							this.$message({
								message: "暂无此社团数据",
								type: 'warning'
							})
						}
					});
		},
		search(){
          this.getStInfo(this.params.stCd);
		},
		reset(){
			this.params.stCd='st-00001';
			this.getStInfo('st-00001');
		}
	},
	created() {
		var id = this.$route.params.id;
		this.typeId=id;
		this.get(5);
		this.getStInfo(this.params.stCd);
	},
	watch: {
		$route(to, from) {
			var id = this.$route.params.id;
			/*alert(id)
			switch (id) {
				case 1:this.get(5);break;
				case 2:this.getStInfo();break;
			}*/
			this.get(5);
			this.typeId=id;
		}
	}
};
</script>

<style scoped="scoped">
.title {
	display: block;
	font-size: 24px;
	color: #9a0e14;
	margin-top: 10px;
}
.time-wrap {
	float: right;
	margin-right: 100px;
}
.serach-wrap{
	float: left;
	margin-left: 100px;
}
.serach-time{
	display: inline-block;
	margin-top: 20px;
	margin-left: 615px;
	float: left;
	font-size: 18px;
	clear: both;
}
.serach-span{
	display: inline-block;
	margin-top: 20px;
	margin-left: 65px;
	float: left;
	font-size: 15px;
}
.time {
	display: inline-block;
	margin-top: 20px;
	margin-left: 15px;
	font-size: 18px;
}
.serach{
	display: inline-block;
	margin-top: 20px;
	margin-left: 330px;
	font-size: 16px;
	text-align: right;
}
.content {
	line-height: 150%;
	padding: 20px;
	margin-top: 40px;
	text-indent: 35px;
	text-align: left;
}
.show-image{
	width: 250px;
	height: 200px;
	/*float: left;*/
}
.time-warp2{
	float: left;
	margin-right: 100px;
}
	.handle-input mr10{
		size: 10px;
		width: 250px;
		float: right;
		clear: both;
	}
	.handle-box{
		width: 350px;
		float: left;
	}
	.handle-button{
		float: left;clear: both;

	}
	.footer{
		margin-top: 180px;
	}

</style>
