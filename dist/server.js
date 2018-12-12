!function(r){var n={};function i(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return r[e].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=r,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=13)}([function(e,t){e.exports=require("mongoose")},function(e,t){e.exports=require("express")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createCategoriesQuery=function(r){var n="?categories=";"string"==typeof r?n+=r.split(" ")[0].toLowerCase():r.forEach(function(e,t){e=e.split(" "),t===r.length-1?n+=e[0].toLowerCase():n+=e[0].toLowerCase()+"_"});return n},t.createPriceQuery=function(e,t){return(t=-1<t.indexOf("categories")?"&price="+e:"?price="+e).replace(" ","+")},t.createSortQuery=function(e,t,r){return r=-1<r.indexOf("categories")||-1<r.indexOf("price")?"&sortby="+e+"+"+t:"?sortby="+e+"+"+t},t.createPageQuery=function(e,t){return t=-1<t.indexOf("categories")||-1<t.indexOf("price")||-1<t.indexOf("sortby")?"&page="+e:"?page="+e}},function(e,t){e.exports=require("passport")},function(e,t,r){"use strict";var n=r(0).Schema({username:{type:String,required:!0},password:{type:String,required:!0},addedBy:{type:String},updatedBy:{type:String}});e.exports=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.verifyToken=function(r,n,i){var e=r.cookies.jwt;{if(void 0===e)return n.status(403).send({success:!1,message:"No token provided"});s.verify(e,o,function(e,t){if(e)return n.json({success:!1,message:"Failed to authenticate token",err:e});r.decoded=t,i()})}};var s=r(12),o=t.JWT_KEY=process.env.JWT_KEY||"671t^U#LsJrRFV992Gbs0hR9^HyL50"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(11),i=t.storage=n.diskStorage({destination:function(e,t,r){r(null,"./uploads/birds")},filename:function(e,t,r){t.originalname=t.originalname.replace(" ","-"),r(null,Date.now()+t.originalname)}}),s=t.fileFilter=function(e,t,r){"image/jpeg"===t.mimetype||"image/jpg"===t.mimetype||"image/png"===t.mimetype?r(null,!0):r(null,!1)};t.upload=n({storage:i,fileFilter:s})},function(e,t){e.exports=require("bcryptjs")},function(e,t,r){"use strict";var n=r(0).Schema({images:[{fieldname:String,originalname:String,encoding:String,mimetype:String,destination:String,filename:String,path:String,size:Number}],breed:{type:String,required:!0},price:{type:Number,required:!0},category:{type:String,required:!0},addedBy:{type:String},date:{type:String,required:!0},time:{type:String,required:!0},timestamp:{type:Number,required:!0}});e.exports=n},function(e,t,r){"use strict";var n=r(0).Schema({name:{type:String,required:!0},price:{type:Number,required:!0}});e.exports=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.filterByCategory=function(e,r){var n=[];return(e=e.split("_")).forEach(function(t){r.forEach(function(e){-1<e.category.toLowerCase().indexOf(t.toLowerCase())&&n.push(e)})}),n},t.filterByPrice=function(e,t){var r=e[0],n=e[1];return t.filter(function(e){return"<"===r?e.price<n:e.price>n})}},function(e,t){e.exports=require("multer")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,n){"use strict";var r=p(n(1)),i=p(n(0)),s=p(n(14)),o=p(n(15)),a=p(n(16)),u=p(n(17)),c=p(n(18)),d=p(n(3)),f=p(n(19)),l=p(n(20));function p(e){return e&&e.__esModule?e:{default:e}}setInterval(function(){l.default.get("http://copsewood-aviaries.herokuapp.com/")},6e5);var g=(0,r.default)(),m=process.env.PORT||3e3,y=n(21).__express;g.engine(".ejs",y),g.set("views",o.default.join(__dirname,"views")),g.set("view engine","ejs"),g.use(r.default.static(o.default.join(__dirname,"public"))),g.use("/uploads",r.default.static("uploads")),g.use(s.default.urlencoded({extended:!0})),g.use(s.default.json()),g.use((0,f.default)()),g.use((0,u.default)({secret:"keyboard cat",resave:!0,saveUninitialized:!0})),g.use((0,c.default)()),g.use(function(e,t,r){t.locals.messages=n(22)(e,t),r()}),g.use((0,a.default)({errorFormatter:function(e,t,r){for(var n=e.split("."),i=n.shift();n.length;)i+="["+n.shift()+"]";return{param:i,msg:t,value:r}}})),g.use(function(e,t,r){if("/"==e.path.substr(-1)&&1<e.path.length){var n=e.url.slice(e.path.length);t.redirect(301,e.path.slice(0,-1)+n)}else r()}),n(23)(d.default),g.use(d.default.initialize()),g.use(d.default.session()),g.get("*",function(e,t,r){t.locals.user=e.user||null,r()});var h=process.env.MONGO_URI||n(25).MONGO_URI;i.default.connect(h,{useNewUrlParser:!0}).then(function(){return console.log("MongoDB Connected...")}).catch(function(e){return console.log(e)});var v=n(26);g.use("/",v);var b=n(29);g.use("/api/birds",b);var w=n(32);g.use("/api/products",w);var q=n(33);g.use("/api/admins",q),g.listen(m,function(){console.log("Server Started on "+m)})},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("express-validator")},function(e,t){e.exports=require("express-session")},function(e,t){e.exports=require("connect-flash")},function(e,t){e.exports=require("cookie-parser")},function(e,t){e.exports=require("http")},function(e,t){e.exports=require("ejs")},function(e,t){e.exports=require("express-messages")},function(e,t,r){"use strict";var n=r(24).Strategy,i=r(0),s=r(7),o=r(4),a=i.model("Admin",o);e.exports=function(e){e.use(new n(function(e,t,n){var r={username:e};a.findOne(r,function(e,r){if(e)throw e;if(!r)return n(null,!1,{message:"No Admin Found"});s.compare(t,r.password,function(e,t){if(e)throw e;return t?n(null,r):n(null,!1,{message:"Wrong Password"})})})})),e.serializeUser(function(e,t){t(null,e.id)}),e.deserializeUser(function(e,r){a.findById(e,function(e,t){r(e,t)})})}},function(e,t){e.exports=require("passport-local")},function(e,t,r){"use strict";e.exports={MONGO_URI:"mongodb://jamie:j6iQQA@ds115553.mlab.com:15553/copsewood-aviaries"}},function(e,t,r){"use strict";var n=r(1).Router(),i=r(0),s=(r(3),r(8)),o=i.model("Bird",s),a=r(9),u=i.model("Product",a),c=r(4),d=i.model("Admin",c),f=r(10).filterByCategory,l=r(10).filterByPrice,p=r(27).changePage,g=r(28).sort;function m(e,t,r){if(e.isAuthenticated())return r();e.flash("alert alert-danger","You Must Be Logged In To Access This Page"),t.status(401).redirect("/login")}n.get("/",function(e,t){t.render("pages/index",{title:"Home"})}),n.get("/admin-panel",m,function(e,r){d.find({},function(e,t){e?console.log(e):r.render("pages/admin-panel",{title:"Admins",admins:t})})}),n.get("/admins",m,function(e,r){d.find({},function(e,t){e?console.log(e):r.render("pages/admins",{title:"Admins",admins:t})})}),n.get("/about",function(e,t){t.render("pages/about",{title:"About"})}),n.get("/birds",function(n,i){o.find({}).sort({breed:1}).then(function(e){var t,r=e.length;n.query.categories&&(e=f(n.query.categories,e)),n.query.price&&(e=l(n.query.price.split(" "),e)),n.query.sortby&&(e=g(n.query.sortby.split(" "),e)),t=Math.ceil(e.length/10),r=e.length,e=n.query.page?p(n.query.page,e,10):p(1,e,10),i.render("pages/birds",{title:"Birds",birds:e,total:r,numPages:t})}).catch(function(e){console.log(e),i.status(404)})}),n.get("/products",function(e,r){u.find({},function(e,t){e?console.log(e):r.render("pages/products",{title:"Products",products:t})})}),n.get("/contact",function(e,t){t.render("pages/contact",{title:"Contact"})}),n.get("/login",function(e,t){t.render("pages/login",{title:"Login"})}),n.get("/birds_:id",function(e,r){o.findById(e.params.id,function(e,t){r.render("object-info/bird",{title:t.breed,bird:t,isEditing:!1})})}),n.get("/products_:id",function(e,r){u.findById(e.params.id,function(e,t){r.render("object-info/product",{title:t.name,product:t,isEditing:!1})})}),n.get("/admins_:id",m,function(e,r){d.findById(e.params.id,function(e,t){r.render("object-info/admin",{title:t.name,admin:t,isEditing:!1})})}),n.get("/edit-bird_:id",m,function(e,r){o.findById(e.params.id,function(e,t){r.render("object-info/bird",{title:t.breed,bird:t,isEditing:!0})})}),n.get("/edit-product_:id",m,function(e,r){u.findById(e.params.id,function(e,t){r.render("object-info/product",{title:t.name,product:t,isEditing:!0})})}),n.get("/edit-admin_:id",m,function(e,r){d.findById(e.params.id,function(e,t){r.render("object-info/admin",{title:t.name,admin:t,isEditing:!0})})}),e.exports=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.changePage=function(e,t,r){var n=[],i=1;e=Number(e);for(var s=0;s<t.length&&(i===e&&n.push(t[s]),(s+1)%r==0&&++i,!(e<i));++s);return n}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.sort=function(e,t){var r=e[0],n=e[1];switch(r){case"breed":u=n,(c=t).sort(function(e,t){var r=e.breed.toLowerCase(),n=t.breed.toLowerCase();return r<n?-1:n<r?1:0}),t="asc"===u?c:c.reverse();break;case"price":o=n,(a=t).sort(function(e,t){return e.price-t.price}),t="asc"===o?a.reverse():a;break;case"date":i=n,(s=t).sort(function(e,t){return e.timestamp-t.timestamp}),t="asc"===i?s.reverse():s;break;default:return t}var i,s;var o,a;var u,c;return t}},function(e,t,r){"use strict";var n=r(1).Router(),i=r(0),s=(r(11),r(30)),o=r(8),a=i.model("Bird",o),u=r(5).verifyToken,c=r(2).createCategoriesQuery,d=r(2).createPriceQuery,f=r(2).createSortQuery,l=r(2).createPageQuery,p=r(31).createDateInfo,g=(r(6).storage,r(6).fileFilter,r(6).upload);n.get("/",function(e,t){var r="";if(console.log(e.query),e.query.categories&&(r=c(e.query.categories)),e.query.price&&(r+=d(e.query.price,r)),e.query.sort){var n=e.query.sort.split(" ");r+=f(n[0],n[1],r)}if(e.query.page){var i=e.query.page.split("-")[1];r+=l(i,r)}a.find({}).then(function(e){t.status(200).redirect("/birds"+r)}).catch(function(e){console.log(e),t.status(404)})}),n.get("/:id",u,function(e,t){a.findById(e.params.id).then(function(e){return t.status(200).send(e)}).catch(function(e){return t.status(404).json({success:!1})})}),n.post("/",g.any("images"),u,function(t,r){t.checkBody("breed","Breed is Required").notEmpty(),t.checkBody("price","Price is Required").notEmpty(),t.checkBody("category","Category is Required").notEmpty();var e=t.validationErrors();if(e)e.forEach(function(e){t.flash("alert alert-danger",e.msg)}),r.status(404).redirect("/admin-panel");else{var n=p(),i=new a({images:t.files,breed:t.body.breed,price:t.body.price,category:t.body.category,addedBy:t.user.username,timestamp:n.timestamp,date:n.date,time:n.time});i.save().then(function(e){t.flash("alert alert-success",i.breed+" Was Created Successfully"),r.status(200).redirect("/")}).catch(function(e){return console.log(e)})}}),n.post("/:id",u,function(t,r){var e={breed:t.body.breed,price:t.body.price,category:t.body.category};a.findByIdAndUpdate(t.params.id,e).then(function(e){t.flash("alert alert-success",e.breed+" Was Updated Successfully"),r.status(200).redirect("/birds")}).catch(function(e){return r.status(404)})}),n.delete("/",u,function(t,r){a.find({}).then(function(e){e.forEach(function(e){e.remove().then(function(){t.flash("alert alert-success","All Birds Were Deleted Successfully"),r.status(200).redirect("/birds")}).catch(function(e){console.log(e)})})}).catch(function(e){console.log(e),r.json({success:!1})})}),n.delete("/:id",u,function(r,n){var i=void 0;a.findById(r.params.id).then(function(e){if(-1<e.images.length)for(var t=0;t<e.images.length;++t)i=e.images[t].path,s.existsSync(i)&&s.unlink(i,function(e){e&&console.log(e)});e.remove().then(function(){r.flash("alert alert-success",e.breed+" Was Deleted Successfully"),n.status(200).redirect("/birds")})}).catch(function(e){console.log(e),n.status(404).json({success:!1})})}),e.exports=n},function(e,t){e.exports=require("fs")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createDateInfo=function(){var e=new Date,t=void 0,r=void 0,n=[];t=e.getDate()+"/"+(e.getMonth()+1)+"/"+e.getFullYear(),r=1===e.getHours().toString().length?"0"+e.getHours():""+e.getHours();1===e.getMinutes().toString().length?r+=":0"+e.getMinutes():r+=":"+e.getMinutes();11<e.getHours()?r+=" PM":r+=" AM";return n.timestamp=e.getTime(),n.date=t,n.time=r,n}},function(e,t,r){"use strict";var n=r(1).Router(),i=r(0),s=r(9),o=i.model("Product",s);n.get("/",function(e,t){o.find().sort({price:1}).then(function(e){return t.status(200)}).catch(function(e){return t.status(404)})}),n.get("/:id",function(e,t){o.findById(e.params.id).then(function(e){return t.status(200)}).catch(function(e){return t.status(404).json({success:!1})})}),n.post("/",function(t,r){t.checkBody("name","Name is Required").notEmpty(),t.checkBody("price","Price is Required").notEmpty();var e=t.validationErrors();e?(e.forEach(function(e){t.flash("alert alert-danger",e.msg)}),r.status(404).redirect("/admin-panel")):new o({name:t.body.name,price:t.body.price}).save().then(function(e){t.flash("alert alert-success","New Product was Created Successfully"),r.status(200).redirect("/admin-panel")}).catch(function(e){return r.status(404).json({success:!1})})}),n.post("/:id",function(t,r){var e={name:t.body.name,price:t.body.price};o.findByIdAndUpdate(t.params.id,e).then(function(e){t.flash("alert alert-success","Product was Updated Successfully"),r.status(200).redirect("/admin-panel")}).catch(function(e){return r.status(404)})}),n.delete("/:id",function(e,t){o.findById(e.params.id).then(function(e){return e.remove().then(function(){return t.status(200).json({success:!0})})}).catch(function(e){return t.status(404).json({success:!1})})}),e.exports=n},function(e,t,r){"use strict";var n=r(1).Router(),i=r(0),s=r(7),o=r(3),a=r(12),u=r(4),c=i.model("Admin",u),d=process.env.JWT_KEY||r(5).JWT_KEY,f=r(5).verifyToken;n.post("/login",function(n,i,s){o.authenticate("local",function(e,t,r){return e?(n.flash("alert alert-danger","There was a problem logging in"),s(e)):t?void n.logIn(t,function(e){if(e)return n.flash("alert alert-danger","There was a problem logging in"),s(e);var t={username:n.user.username};a.sign(t,d,{expiresIn:"6h"},function(e,t){return e?i.json({success:!1,message:"Failed to create token"}):(i.cookie("jwt",t),i.redirect("/admin-panel"))})}):(n.flash("alert alert-danger",r.message),i.redirect("/login"))})(n,i)}),n.get("/logout",function(e,t){t.clearCookie("jwt"),e.logout(),e.flash("alert alert-success","You are now logged out"),t.redirect("/login")}),n.post("/register",f,function(r,n){r.checkBody("username","Name is Required").notEmpty(),r.checkBody("password","Password is Required").notEmpty(),r.checkBody("confirmPassword","Passwords do not match").equals(r.body.password);var e=r.validationErrors();if(e)e.forEach(function(e){r.flash("alert alert-danger",e.msg)}),n.status(404).redirect("/admin-panel");else{var i=new c({username:r.body.username,password:r.body.password,addedBy:r.user.username});s.genSalt(10,function(e,t){s.hash(i.password,t,function(e,t){e?console.log(e):(i.password=t,i.save().then(function(e){r.flash("alert alert-success","New Admin was Registered Successfully"),n.status(200).redirect("/admin-panel")}).catch(function(e){console.log(e),n.status(404).json({success:!1})}))})})}}),n.post("/register/:id",f,function(r,n){r.checkBody("username","Name is Required").notEmpty(),r.checkBody("password","Password is Required").notEmpty(),r.checkBody("confirmPassword","Passwords do not match").equals(r.body.password);var e=r.validationErrors();if(e)e.forEach(function(e){r.flash("alert alert-danger",e.msg)}),n.status(404).redirect("back");else{var i={username:r.body.username,password:r.body.password,updatedBy:r.user.username};s.genSalt(10,function(e,t){s.hash(i.password,t,function(e,t){e?console.log(e):(i.password=t,c.findByIdAndUpdate(r.params.id,i).then(function(e){r.flash("alert alert-success","Admin was Updated Successfully"),n.status(200).redirect("/admin-panel")}).catch(function(e){console.log(e),n.status(404)}))})})}}),n.get("/",f,function(e,t){c.find().sort({name:1}).then(function(e){return t.status(200).json(e)}).catch(function(e){return t.status(404)})}),n.get("/:id",f,function(e,t){c.findById(e.params.id).then(function(e){return t.status(200).json(e)}).catch(function(e){return t.status(404).json({success:!1})})}),n.delete("/:id",f,function(e,t){c.findById(e.params.id).then(function(e){return e.remove().then(function(){return t.status(200).json({success:!0})})}).catch(function(e){return t.status(404).json({success:!1})})}),e.exports=n}]);