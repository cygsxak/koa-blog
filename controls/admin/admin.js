var models=require('../../models/models.js');
var config = require('../../config/config.js');

module.exports={
	home:function *(next) {
		try {
			var page = this.query.page;
			var posts= yield models.Article.find({}).limit(config.page_size).skip((page-1)*config.page_size);
			var num= yield models.Article.count({});
			yield this.render('admin/admin.html',{
				posts:posts,
				num:num,
				page_size:config.page_size,
				title:'文章管理',
				username:this.session.username
			});
		} catch(e) {
			this.body='发生错误';
			console.error(e);
		}
		
	},
	delete:function *(next) {
		var id=this.query.id;
		try {
			yield models.Article.remove({_id:id});
			this.status=303;
			this.redirect('/admin');
		} catch(e) {
			this.body='删除失败';
			console.log(e);
		}
	},
	edit:function *(next) {
		 /* body... */ 
	},
	search:function *(next) {
		 /* body... */ 
	}
}