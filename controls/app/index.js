var models=require('../../models/models.js');
var config = require('../../config/config.js');

module.exports={
	//首页
	home:function *(next) {
		try {
			var page = this.query.page;
			var posts=yield models.Article.find({}).sort({_id:-1}).limit(config.page_size).skip((page-1)*config.page_size);
			var num= yield models.Article.count({});
			var hotPosts=yield models.Article.find({}).limit(5).sort({views:-1});
			if (this.session.username) {
				var username=this.session.username;
			}
			yield this.render('app/index.html',{
				title:'首页',
				username:username,
				posts:posts,
				num:num,
				page_size:config.page_size,
				hotPosts:hotPosts
			});
		} catch(e) {
			this.body='加载错误';
			console.log(e);
		}
	}
}