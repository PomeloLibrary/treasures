// require json files
var area = require('../../config/data/area');
var role = require('../../config/data/role');
var treasure = require('../../config/data/treasure');

/**
 * Data model `new Data()`
 *
 * @param {Array}
 */
var DataApi = function(data) {
  var fields = {};
  data[1].forEach(function(i, k) {
    fields[i] = k;
  });
  data.splice(0, 2);

  var result = {},
    ids = [],
    item;
  data.forEach(function(k) {
    item = mapData(fields, k);
    result[item.id] = item;
    ids.push(item.id);
  });

  this.data = result;
  this.ids = ids;
};

/**
 * map the array data to object
 *
 * @param {Object}
 * @param {Array}
 * @return {Object} result
 * @api private
 */
var mapData = function(fields, item) {
  var obj = {};
  for (var k in fields) {
    obj[k] = item[fields[k]];
  }
  return obj;
};

/**
 * find items by attribute
 *
 * @param {String} attribute name
 * @param {String|Number} the value of the attribute
 * @return {Array} result
 * @api public
 */
DataApi.prototype.findBy = function(attr, value) {
  var result = [];
  //console.log(' findBy ' + attr + '  value:' + value + '  index: ' + index);
  var i, item;
  for (i in this.data) {
    item = this.data[i];
    if (item[attr] == value) {
      result.push(item);
    }
  }
  return result;
};

/**
 * find item by id
 *
 * @param id
 * @return {Obj}
 * @api public
 */
DataApi.prototype.findById = function(id) {
  return this.data[id];
};

DataApi.prototype.random = function() {
  var length = this.ids.length;
  var rid = this.ids[Math.floor(Math.random() * length)];
  return this.data[rid];
};

/**
 * find all item
 *
 * @return {array}
 * @api public
 */
DataApi.prototype.all = function() {
  return this.data;
};

var DataApiUtil = function() {
  this.areaData = null;
  this.roleData = null;
  this.treasureData = null;
}

DataApiUtil.prototype.area = function() {
  if (this.areaData) {
    return this.areaData;
  }

  this.areaData = new DataApi(area);
  return this.areaData;
}

DataApiUtil.prototype.role = function() {
  if (this.roleData) {
    return this.roleData;
  }

  this.roleData = new DataApi(role);
  return this.roleData;
}

DataApiUtil.prototype.treasure = function() {
  if (this.treasureData) {
    return this.treasureData;
  }

  this.treasureData = new DataApi(treasure);
  return this.treasureData;
}

module.exports = {
  id: "dataApiUtil",
  func: DataApiUtil
}
// module.exports = {
//   area: new DataApi(area),
//   role: new DataApi(role),
//   treasure: new DataApi(treasure)
// };