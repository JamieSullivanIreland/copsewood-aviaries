/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/node-libs-browser/node_modules/path-browserify/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/path-browserify/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// resolves . and .. elements in a path array with directory names there\n// must be no slashes, empty elements, or device names (c:\\) in the array\n// (so also no leading and trailing slashes - it does not distinguish\n// relative and absolute paths)\nfunction normalizeArray(parts, allowAboveRoot) {\n  // if the path tries to go above the root, `up` ends up > 0\n  var up = 0;\n  for (var i = parts.length - 1; i >= 0; i--) {\n    var last = parts[i];\n    if (last === '.') {\n      parts.splice(i, 1);\n    } else if (last === '..') {\n      parts.splice(i, 1);\n      up++;\n    } else if (up) {\n      parts.splice(i, 1);\n      up--;\n    }\n  }\n\n  // if the path is allowed to go above the root, restore leading ..s\n  if (allowAboveRoot) {\n    for (; up--; up) {\n      parts.unshift('..');\n    }\n  }\n\n  return parts;\n}\n\n// Split a filename into [root, dir, basename, ext], unix version\n// 'root' is just a slash, or nothing.\nvar splitPathRe =\n    /^(\\/?|)([\\s\\S]*?)((?:\\.{1,2}|[^\\/]+?|)(\\.[^.\\/]*|))(?:[\\/]*)$/;\nvar splitPath = function(filename) {\n  return splitPathRe.exec(filename).slice(1);\n};\n\n// path.resolve([from ...], to)\n// posix version\nexports.resolve = function() {\n  var resolvedPath = '',\n      resolvedAbsolute = false;\n\n  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {\n    var path = (i >= 0) ? arguments[i] : process.cwd();\n\n    // Skip empty and invalid entries\n    if (typeof path !== 'string') {\n      throw new TypeError('Arguments to path.resolve must be strings');\n    } else if (!path) {\n      continue;\n    }\n\n    resolvedPath = path + '/' + resolvedPath;\n    resolvedAbsolute = path.charAt(0) === '/';\n  }\n\n  // At this point the path should be resolved to a full absolute path, but\n  // handle relative paths to be safe (might happen when process.cwd() fails)\n\n  // Normalize the path\n  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {\n    return !!p;\n  }), !resolvedAbsolute).join('/');\n\n  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';\n};\n\n// path.normalize(path)\n// posix version\nexports.normalize = function(path) {\n  var isAbsolute = exports.isAbsolute(path),\n      trailingSlash = substr(path, -1) === '/';\n\n  // Normalize the path\n  path = normalizeArray(filter(path.split('/'), function(p) {\n    return !!p;\n  }), !isAbsolute).join('/');\n\n  if (!path && !isAbsolute) {\n    path = '.';\n  }\n  if (path && trailingSlash) {\n    path += '/';\n  }\n\n  return (isAbsolute ? '/' : '') + path;\n};\n\n// posix version\nexports.isAbsolute = function(path) {\n  return path.charAt(0) === '/';\n};\n\n// posix version\nexports.join = function() {\n  var paths = Array.prototype.slice.call(arguments, 0);\n  return exports.normalize(filter(paths, function(p, index) {\n    if (typeof p !== 'string') {\n      throw new TypeError('Arguments to path.join must be strings');\n    }\n    return p;\n  }).join('/'));\n};\n\n\n// path.relative(from, to)\n// posix version\nexports.relative = function(from, to) {\n  from = exports.resolve(from).substr(1);\n  to = exports.resolve(to).substr(1);\n\n  function trim(arr) {\n    var start = 0;\n    for (; start < arr.length; start++) {\n      if (arr[start] !== '') break;\n    }\n\n    var end = arr.length - 1;\n    for (; end >= 0; end--) {\n      if (arr[end] !== '') break;\n    }\n\n    if (start > end) return [];\n    return arr.slice(start, end - start + 1);\n  }\n\n  var fromParts = trim(from.split('/'));\n  var toParts = trim(to.split('/'));\n\n  var length = Math.min(fromParts.length, toParts.length);\n  var samePartsLength = length;\n  for (var i = 0; i < length; i++) {\n    if (fromParts[i] !== toParts[i]) {\n      samePartsLength = i;\n      break;\n    }\n  }\n\n  var outputParts = [];\n  for (var i = samePartsLength; i < fromParts.length; i++) {\n    outputParts.push('..');\n  }\n\n  outputParts = outputParts.concat(toParts.slice(samePartsLength));\n\n  return outputParts.join('/');\n};\n\nexports.sep = '/';\nexports.delimiter = ':';\n\nexports.dirname = function(path) {\n  var result = splitPath(path),\n      root = result[0],\n      dir = result[1];\n\n  if (!root && !dir) {\n    // No dirname whatsoever\n    return '.';\n  }\n\n  if (dir) {\n    // It has a dirname, strip trailing slash\n    dir = dir.substr(0, dir.length - 1);\n  }\n\n  return root + dir;\n};\n\n\nexports.basename = function(path, ext) {\n  var f = splitPath(path)[2];\n  // TODO: make this comparison case-insensitive on windows?\n  if (ext && f.substr(-1 * ext.length) === ext) {\n    f = f.substr(0, f.length - ext.length);\n  }\n  return f;\n};\n\n\nexports.extname = function(path) {\n  return splitPath(path)[3];\n};\n\nfunction filter (xs, f) {\n    if (xs.filter) return xs.filter(f);\n    var res = [];\n    for (var i = 0; i < xs.length; i++) {\n        if (f(xs[i], i, xs)) res.push(xs[i]);\n    }\n    return res;\n}\n\n// String.prototype.substr - negative index don't work in IE8\nvar substr = 'ab'.substr(-1) === 'b'\n    ? function (str, start, len) { return str.substr(start, len) }\n    : function (str, start, len) {\n        if (start < 0) start = str.length + start;\n        return str.substr(start, len);\n    }\n;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/node-libs-browser/node_modules/path-browserify/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./src/config/keys.js":
/*!****************************!*\
  !*** ./src/config/keys.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  MONGO_URI: 'mongodb://jamie:j6iQQA@ds115553.mlab.com:15553/copsewood-aviaries'\n};\n\n//# sourceURL=webpack:///./src/config/keys.js?");

/***/ }),

/***/ "./src/config/passport.js":
/*!********************************!*\
  !*** ./src/config/passport.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar LocalStrategy = __webpack_require__(/*! passport-local */ \"passport-local\").Strategy;\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nvar adminModel = __webpack_require__(/*! ../models/Admin */ \"./src/models/Admin.js\");\nvar Admin = mongoose.model('Admin', adminModel);\n\nmodule.exports = function (passport) {\n  // Local Strategy\n  passport.use(new LocalStrategy(function (username, password, done) {\n    // Match username\n    var query = { username: username };\n    Admin.findOne(query, function (err, user) {\n      if (err) throw err;\n\n      if (!user) {\n        return done(null, false, { message: 'No Admin Found' });\n      }\n\n      // Match password\n      bcrypt.compare(password, user.password, function (err, isMatch) {\n        if (err) throw err;\n\n        if (isMatch) {\n          return done(null, user);\n        } else {\n          return done(null, false, { message: 'Wrong Password' });\n        }\n      });\n    });\n  }));\n\n  passport.serializeUser(function (user, done) {\n    done(null, user.id);\n  });\n\n  passport.deserializeUser(function (id, done) {\n    Admin.findById(id, function (err, user) {\n      done(err, user);\n    });\n  });\n};\n\n//# sourceURL=webpack:///./src/config/passport.js?");

/***/ }),

/***/ "./src/models/Admin.js":
/*!*****************************!*\
  !*** ./src/models/Admin.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar adminModel = mongoose.Schema({\n  username: {\n    type: String,\n    required: true\n  },\n  password: {\n    type: String,\n    required: true\n  },\n  addedBy: {\n    type: String\n  },\n  updatedBy: {\n    type: String\n  }\n});\n\nmodule.exports = adminModel;\n\n//# sourceURL=webpack:///./src/models/Admin.js?");

/***/ }),

/***/ "./src/models/Bird.js":
/*!****************************!*\
  !*** ./src/models/Bird.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar birdModel = mongoose.Schema({\n  images: [{\n    fieldname: String,\n    originalname: String,\n    encoding: String,\n    mimetype: String,\n    destination: String,\n    filename: String,\n    path: String,\n    size: Number\n  }],\n  breed: {\n    type: String,\n    required: true\n  },\n  price: {\n    type: Number,\n    required: true\n  },\n  category: {\n    type: String,\n    required: true\n  },\n  addedBy: {\n    type: String\n  }\n});\n\nmodule.exports = birdModel;\n\n//# sourceURL=webpack:///./src/models/Bird.js?");

/***/ }),

/***/ "./src/models/Product.js":
/*!*******************************!*\
  !*** ./src/models/Product.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar productModel = mongoose.Schema({\n  name: {\n    type: String,\n    required: true\n  },\n  price: {\n    type: Number,\n    required: true\n  }\n});\n\nmodule.exports = productModel;\n\n//# sourceURL=webpack:///./src/models/Product.js?");

/***/ }),

/***/ "./src/routes/api/admins.js":
/*!**********************************!*\
  !*** ./src/routes/api/admins.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar bcrypt = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\nvar passport = __webpack_require__(/*! passport */ \"passport\");\n\nvar adminModel = __webpack_require__(/*! ../../models/Admin */ \"./src/models/Admin.js\");\nvar Admin = mongoose.model('Admin', adminModel);\n\n// Login Admin Process\nrouter.post('/login', function (req, res, next) {\n  passport.authenticate('local', {\n    successRedirect: '/admin-panel',\n    failureRedirect: '/login',\n    failureFlash: true\n  })(req, res, next);\n});\n\n// logout\nrouter.get('/logout', function (req, res) {\n  req.logout();\n  req.flash('alert alert-success', 'You are now logged out');\n  res.redirect('/login');\n});\n\n// Register Admin Process\nrouter.post('/register', function (req, res) {\n  req.checkBody('username', 'Name is Required').notEmpty();\n  req.checkBody('password', 'Password is Required').notEmpty();\n  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);\n\n  var errors = req.validationErrors();\n\n  if (errors) {\n    errors.forEach(function (error) {\n      req.flash('alert alert-danger', error.msg);\n    });\n    res.status(404).redirect('/admin-panel');\n  } else {\n    var newAdmin = new Admin({\n      username: req.body.username,\n      password: req.body.password,\n      addedBy: req.user.username\n    });\n\n    bcrypt.genSalt(10, function (err, salt) {\n      bcrypt.hash(newAdmin.password, salt, function (err, hash) {\n        if (err) {\n          console.log(err);\n        } else {\n          newAdmin.password = hash;\n          newAdmin.save().then(function (admin) {\n            req.flash('alert alert-success', 'New Admin was Registered Successfully');\n            res.status(200).redirect('/admin-panel');\n          }).catch(function (err) {\n            console.log(err);\n            res.status(404).json({ success: false });\n          });\n        }\n      });\n    });\n  }\n});\n\n// Update Admin Process\nrouter.post('/register/:id', function (req, res) {\n  req.checkBody('username', 'Name is Required').notEmpty();\n  req.checkBody('password', 'Password is Required').notEmpty();\n  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);\n\n  var errors = req.validationErrors();\n\n  if (errors) {\n    errors.forEach(function (error) {\n      req.flash('alert alert-danger', error.msg);\n    });\n    res.status(404).redirect('back');\n  } else {\n    var updatedAdmin = {\n      username: req.body.username,\n      password: req.body.password,\n      updatedBy: req.user.username\n    };\n\n    bcrypt.genSalt(10, function (err, salt) {\n      bcrypt.hash(updatedAdmin.password, salt, function (err, hash) {\n        if (err) {\n          console.log(err);\n        } else {\n          updatedAdmin.password = hash;\n          Admin.findByIdAndUpdate(req.params.id, updatedAdmin).then(function (admin) {\n            req.flash('alert alert-success', 'Admin was Updated Successfully');\n            res.status(200).redirect('/admin-panel');\n          }).catch(function (err) {\n            console.log(err);\n            res.status(404);\n          });\n        }\n      });\n    });\n  }\n});\n\n// @router        GET api/admins\n// @description   Get all admins\nrouter.get('/', function (req, res) {\n  Admin.find().sort({ name: 1 }).then(function (admins) {\n    return res.status(200).json(admins);\n  }).catch(function (err) {\n    return res.status(404);\n  });\n});\n\n// @router        GET api/admins/:id\n// @description   Get a single admin\nrouter.get('/:id', function (req, res) {\n  Admin.findById(req.params.id).then(function (admin) {\n    return res.status(200).json(admin);\n  }).catch(function (err) {\n    return res.status(404).json({ success: false });\n  });\n});\n\n// @router        DELETE api/admins/:id\n// @description   Delete an admin\nrouter.delete('/:id', function (req, res) {\n  Admin.findById(req.params.id).then(function (admin) {\n    return admin.remove().then(function () {\n      return res.status(200).json({ success: true });\n    });\n  }).catch(function (err) {\n    return res.status(404).json({ success: false });\n  });\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/api/admins.js?");

/***/ }),

/***/ "./src/routes/api/birds.js":
/*!*********************************!*\
  !*** ./src/routes/api/birds.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar multer = __webpack_require__(/*! multer */ \"multer\");\nvar fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\nvar birdModel = __webpack_require__(/*! ../../models/Bird */ \"./src/models/Bird.js\");\nvar Bird = mongoose.model('Bird', birdModel);\n\n// Multer storage engine\nvar storage = multer.diskStorage({\n  destination: function destination(req, file, cb) {\n    cb(null, './uploads/birds');\n  },\n  filename: function filename(req, file, cb) {\n    cb(null, Date.now() + file.originalname);\n  }\n});\n\n// Filter images\nvar fileFilter = function fileFilter(req, file, cb) {\n  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {\n    cb(null, true);\n  } else {\n    cb(null, false);\n  }\n};\n\n// Init multer uploads\nvar upload = multer({\n  storage: storage,\n  fileFilter: fileFilter\n});\n\n// @route        GET api/birds\n// @description   Get all birds\nrouter.get('/', function (req, res) {\n  Bird.find().sort({ breed: 1 }).then(function (birds) {\n    return res.status(200).send(birds);\n  }).catch(function (err) {\n    return res.status(404);\n  });\n});\n\n// @route        GET api/birds/:id\n// @description   Get a single bird\nrouter.get('/:id', function (req, res) {\n  Bird.findById(req.params.id).then(function (bird) {\n    return res.status(200).send(bird);\n  }).catch(function (err) {\n    return res.status(404).json({ success: false });\n  });\n});\n\n// @route        POST api/birds\n// @description   Create a Bird\nrouter.post('/', upload.any('images'), function (req, res) {\n  req.checkBody('breed', 'Breed is Required').notEmpty();\n  req.checkBody('price', 'Price is Required').notEmpty();\n  req.checkBody('category', 'Category is Required').notEmpty();\n\n  var errors = req.validationErrors();\n\n  if (errors) {\n    errors.forEach(function (error) {\n      req.flash('alert alert-danger', error.msg);\n    });\n    res.status(404).redirect('/admin-panel');\n  } else {\n    var newBird = new Bird({\n      images: req.files,\n      breed: req.body.breed,\n      price: req.body.price,\n      category: req.body.category\n    });\n\n    newBird.save().then(function (bird) {\n      req.flash('alert alert-success', 'Bird was Created Successfully');\n      res.status(200).redirect('/birds');\n    }).catch(function (err) {\n      return console.log(err);\n    });\n  }\n});\n\n// @router        POST api/birds/:id\n// @description   Update a bird\nrouter.post('/:id', function (req, res) {\n  var updatedBird = {\n    breed: req.body.breed,\n    price: req.body.price,\n    category: req.body.category\n  };\n\n  Bird.findByIdAndUpdate(req.params.id, updatedBird).then(function (bird) {\n    req.flash('alert alert-success', 'Bird was Updated Successfully');\n    res.status(200).redirect('/admin-panel');\n  }).catch(function (err) {\n    return res.status(404);\n  });\n});\n\n// @route        DELETE api/birds/:id\n// @description   Delete a bird\nrouter.delete('/:id', function (req, res) {\n  var path = void 0;\n\n  Bird.findById(req.params.id).then(function (bird) {\n    // Delete images if they exist\n    if (bird.images.length > -1) {\n      for (var i = 0; i < bird.images.length; ++i) {\n        // Assign image path\n        path = bird.images[i].path;\n\n        if (fs.existsSync(path)) {\n          fs.unlink(path, function (err) {\n            if (err) console.log(err);\n          });\n        }\n      }\n    }\n\n    bird.remove().then(function () {\n      return res.status(200).json({ success: true });\n    });\n  }).catch(function (err) {\n    return res.status(404).json({ success: false });\n  });\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/api/birds.js?");

/***/ }),

/***/ "./src/routes/api/products.js":
/*!************************************!*\
  !*** ./src/routes/api/products.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar productModel = __webpack_require__(/*! ../../models/Product */ \"./src/models/Product.js\");\nvar Product = mongoose.model('Product', productModel);\n\n// @router        GET api/products\n// @description   Get all products\nrouter.get('/', function (req, res) {\n  Product.find().sort({ price: 1 }).then(function (products) {\n    return res.status(200);\n  }).catch(function (err) {\n    return res.status(404);\n  });\n});\n\n// @router        GET api/products/:id\n// @description   Get a single product\nrouter.get('/:id', function (req, res) {\n  Product.findById(req.params.id).then(function (product) {\n    return res.status(200);\n  }).catch(function (err) {\n    return res.status(404).json({ success: false });\n  });\n});\n\n// @router        POST api/products\n// @description   Create a Product\nrouter.post('/', function (req, res) {\n  req.checkBody('name', 'Name is Required').notEmpty();\n  req.checkBody('price', 'Price is Required').notEmpty();\n\n  var errors = req.validationErrors();\n\n  if (errors) {\n    errors.forEach(function (error) {\n      req.flash('alert alert-danger', error.msg);\n    });\n    res.status(404).redirect('/admin-panel');\n  } else {\n    var newProduct = new Product({\n      name: req.body.name,\n      price: req.body.price\n    });\n\n    newProduct.save().then(function (product) {\n      req.flash('alert alert-success', 'New Product was Created Successfully');\n      res.status(200).redirect('/admin-panel');\n    }).catch(function (err) {\n      return res.status(404).json({ success: false });\n    });\n  }\n});\n\n// @router        POST api/products/:id\n// @description   Update a product\nrouter.post('/:id', function (req, res) {\n  var updatedProduct = {\n    name: req.body.name,\n    price: req.body.price\n  };\n\n  Product.findByIdAndUpdate(req.params.id, updatedProduct).then(function (product) {\n    req.flash('alert alert-success', 'Product was Updated Successfully');\n    res.status(200).redirect('/admin-panel');\n  }).catch(function (err) {\n    return res.status(404);\n  });\n});\n\n// @router        DELETE api/products/:id\n// @description   Delete a product\nrouter.delete('/:id', function (req, res) {\n  Product.findById(req.params.id).then(function (product) {\n    return product.remove().then(function () {\n      return res.status(200).json({ success: true });\n    });\n  }).catch(function (err) {\n    return res.status(404).json({ success: false });\n  });\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/api/products.js?");

/***/ }),

/***/ "./src/routes/pages.js":
/*!*****************************!*\
  !*** ./src/routes/pages.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar express = __webpack_require__(/*! express */ \"express\");\nvar router = express.Router();\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\n// Models\nvar birdModel = __webpack_require__(/*! ../models/Bird */ \"./src/models/Bird.js\");\nvar Bird = mongoose.model('Bird', birdModel);\nvar productModel = __webpack_require__(/*! ../models/Product */ \"./src/models/Product.js\");\nvar Product = mongoose.model('Product', productModel);\nvar adminModel = __webpack_require__(/*! ../models/Admin */ \"./src/models/Admin.js\");\nvar Admin = mongoose.model('Admin', adminModel);\n\n// Access control\nfunction ensureAuthenticated(req, res, next) {\n  if (req.isAuthenticated()) {\n    return next();\n  } else {\n    req.flash('alert alert-danger', 'Please Login');\n    res.redirect('/login');\n  }\n}\n\n// Home Page\nrouter.get('/', function (req, res) {\n  res.render('pages/index', {\n    title: 'Home'\n  });\n});\n\n// Admin Panel Page\nrouter.get('/admin-panel', function (req, res) {\n  Admin.find({}, function (err, admins) {\n    if (err) {\n      console.log(err);\n    } else {\n      res.render('pages/admin-panel', {\n        title: 'Admins',\n        admins: admins\n      });\n    }\n  });\n});\n\n// Admins Page\nrouter.get('/admins', function (req, res) {\n  Admin.find({}, function (err, admins) {\n    if (err) {\n      console.log(err);\n    } else {\n      res.render('pages/admins', {\n        title: 'Admins',\n        admins: admins\n      });\n    }\n  });\n});\n\n// About Page\nrouter.get('/about', function (req, res) {\n  res.render('pages/about', {\n    title: 'About'\n  });\n});\n\n// Birds Page\nrouter.get('/birds', function (req, res) {\n  // {} for all results\n  Bird.find({}, function (err, birds) {\n    if (err) {\n      console.log(err);\n    } else {\n      res.render('pages/birds', {\n        title: 'Birds',\n        birds: birds\n      });\n    }\n  });\n});\n\n// Products Page\nrouter.get('/products', function (req, res) {\n  Product.find({}, function (err, products) {\n    if (err) {\n      console.log(err);\n    } else {\n      res.render('pages/products', {\n        title: 'Products',\n        products: products\n      });\n    }\n  });\n});\n\n// Contact Page\nrouter.get('/contact', function (req, res) {\n  res.render('pages/contact', {\n    title: 'Contact'\n  });\n});\n\n// Login Page\nrouter.get('/login', function (req, res) {\n  res.render('pages/login', {\n    title: 'Login'\n  });\n});\n\n// Render bird information page\nrouter.get('/birds_:id', function (req, res) {\n  Bird.findById(req.params.id, function (err, bird) {\n    res.render('object-info/bird', {\n      title: bird.breed,\n      bird: bird,\n      isEditing: false\n    });\n  });\n});\n\n// Render product information page\nrouter.get('/products_:id', function (req, res) {\n  Product.findById(req.params.id, function (err, product) {\n    res.render('object-info/product', {\n      title: product.name,\n      product: product,\n      isEditing: false\n    });\n  });\n});\n\n// Render admin information page\nrouter.get('/admins_:id', function (req, res) {\n  Admin.findById(req.params.id, function (err, admin) {\n    res.render('object-info/admin', {\n      title: admin.name,\n      admin: admin,\n      isEditing: false\n    });\n  });\n});\n\n// Edit bird page\nrouter.get('/edit-bird_:id', ensureAuthenticated, function (req, res) {\n  Bird.findById(req.params.id, function (err, bird) {\n    res.render('object-info/bird', {\n      title: bird.breed,\n      bird: bird,\n      isEditing: true\n    });\n  });\n});\n\n// Edit product page\nrouter.get('/edit-product_:id', ensureAuthenticated, function (req, res) {\n  Product.findById(req.params.id, function (err, product) {\n    res.render('object-info/product', {\n      title: product.name,\n      product: product,\n      isEditing: true\n    });\n  });\n});\n\n// Edit admin page\nrouter.get('/edit-admin_:id', ensureAuthenticated, function (req, res) {\n  Admin.findById(req.params.id, function (err, admin) {\n    res.render('object-info/admin', {\n      title: admin.name,\n      admin: admin,\n      isEditing: true\n    });\n  });\n});\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/routes/pages.js?");

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar express = __webpack_require__(/*! express */ \"express\");\nvar mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nvar path = __webpack_require__(/*! path */ \"./node_modules/node-libs-browser/node_modules/path-browserify/index.js\");\nvar expressValidator = __webpack_require__(/*! express-validator */ \"express-validator\");\nvar session = __webpack_require__(/*! express-session */ \"express-session\");\nvar flash = __webpack_require__(/*! connect-flash */ \"connect-flash\");\nvar passport = __webpack_require__(/*! passport */ \"passport\");\n\n// Initialise\nvar app = new express();\nvar port = process.env.PORT || 3000;\n\n// View engine\nvar ejs = __webpack_require__(/*! ejs */ \"ejs\").__express;\napp.engine('.ejs', ejs);\napp.set('views', path.join(__dirname, 'views'));\napp.set('view engine', 'ejs');\n\n// Set path for static files\napp.use(express.static(path.join(__dirname, 'public')));\napp.use('/uploads', express.static('uploads'));\n\n// Bodyparser middleware\napp.use(bodyParser.urlencoded({ extended: true }));\napp.use(bodyParser.json());\n\n// Express Session Middleware\napp.use(session({\n  secret: 'keyboard cat',\n  resave: true,\n  saveUninitialized: true\n}));\n\n// Express Messages Middleware\napp.use(flash());\napp.use(function (req, res, next) {\n  res.locals.messages = __webpack_require__(/*! express-messages */ \"express-messages\")(req, res);\n  next();\n});\n\n// Express validator middleware\napp.use(expressValidator({\n  errorFormatter: function errorFormatter(param, msg, value) {\n    var namespace = param.split('.'),\n        root = namespace.shift(),\n        formParam = root;\n\n    while (namespace.length) {\n      formParam += '[' + namespace.shift() + ']';\n    }\n\n    return {\n      param: formParam,\n      msg: msg,\n      value: value\n    };\n  }\n}));\n\n// Middleware to remove any trailing / on routes\napp.use(function (req, res, next) {\n  if (req.path.substr(-1) == '/' && req.path.length > 1) {\n    var query = req.url.slice(req.path.length);\n    res.redirect(301, req.path.slice(0, -1) + query);\n  } else {\n    next();\n  }\n});\n\n// Passport config\n__webpack_require__(/*! ./config/passport */ \"./src/config/passport.js\")(passport);\n\n// Passport middleware\napp.use(passport.initialize());\napp.use(passport.session());\n\n// Set Global User Variable\napp.get('*', function (req, res, next) {\n  res.locals.user = req.user || null;\n  next();\n});\n\n// DB Config\nvar db = process.env.MONGO_URI || __webpack_require__(/*! ./config/keys */ \"./src/config/keys.js\").MONGO_URI;\n\n// Connect to Database\nmongoose.connect(db, { useNewUrlParser: true }).then(function () {\n  return console.log('MongoDB Connected...');\n}).catch(function (err) {\n  return console.log(err);\n});\n\n// Routes\nvar pages = __webpack_require__(/*! ./routes/pages */ \"./src/routes/pages.js\");\napp.use('/', pages);\n\nvar birds = __webpack_require__(/*! ./routes/api/birds */ \"./src/routes/api/birds.js\");\napp.use('/api/birds', birds);\n\nvar products = __webpack_require__(/*! ./routes/api/products */ \"./src/routes/api/products.js\");\napp.use('/api/products', products);\n\nvar admins = __webpack_require__(/*! ./routes/api/admins */ \"./src/routes/api/admins.js\");\napp.use('/api/admins', admins);\n\n// Start Server\napp.listen(port, function () {\n  console.log('Server Started on ' + port);\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./src/server.js?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcryptjs\");\n\n//# sourceURL=webpack:///external_%22bcryptjs%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "connect-flash":
/*!********************************!*\
  !*** external "connect-flash" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"connect-flash\");\n\n//# sourceURL=webpack:///external_%22connect-flash%22?");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ejs\");\n\n//# sourceURL=webpack:///external_%22ejs%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-messages":
/*!***********************************!*\
  !*** external "express-messages" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-messages\");\n\n//# sourceURL=webpack:///external_%22express-messages%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validator\");\n\n//# sourceURL=webpack:///external_%22express-validator%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"multer\");\n\n//# sourceURL=webpack:///external_%22multer%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-local\");\n\n//# sourceURL=webpack:///external_%22passport-local%22?");

/***/ })

/******/ });