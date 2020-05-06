<template>
	<div class="footer-wrap">
		<div class="footer">
			<p class="introduce">欢迎访问社团管理系统,By shenjindui@cn.com</p>
			<p>基于VUE+springboot的校园社团毕业设计</p>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped="scoped">
	.footer-wrap {
		background-color:#9a0e14 ;
    position: fixed;
    left: 0;
    right: 0;
    bottom:0;
    height: 70px;
	}
	.footer-wrap .footer {
		width: 1024px;
		margin: 0 auto;
		height: 70px;
	}
  .introduce{
    margin: 10px;
  }
	.footer-wrap .footer p{
		line-height: 16px;
	}

	@media screen and (max-width: 600px){
	  .footer-wrap {
	  	padding: 2px 15px;
	  }
	}
</style>
