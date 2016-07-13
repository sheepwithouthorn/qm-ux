/**
 *  时间工具类
 *  @author gcy
 *  @date 2016/07/13
 */

/**
 *  返回所加天数的==>年月日
 *
 *  @param count //获取AddDayCount天后的日期
 */
exports.getDateStr = function(count){
  var dd = new Date();
  dd.setDate(dd.getDate()+count);
  var y = dd.getFullYear();
  var m = dd.getMonth()+1 < 10 ? ('0'+(dd.getMonth()+1))  : dd.getMonth()+1;
  var d = dd.getDate() < 10 ? ('0'+dd.getDate()) : dd.getDate();
  return y+"-"+m+"-"+d;
};

/**
 *  返回所加天数的==>年月日 时分秒
 *  @param count
 *  @return string
 */
exports.getAddDateStr = function (count){
  var d = new Date();
  d.setDate(d.getDate()+count);       //获取几天后的count日期;count可以为负数
  var year = d.getFullYear();
  var mouth = d.getMonth()+1 < 10 ? ('0'+(d.getMonth()+1)) : d.getMonth()+1;
  var day = d.getDate() < 10 ? ('0'+d.getDate()) : d.getDate();
  var hour = d.getHours() < 10 ? ('0'+d.getHours()) : d.getHours();
  var min = d.getMinutes() < 10 ? ('0'+d.getMinutes()) : d.getMinutes();
  var seconds = d.getSeconds() < 10 ? ('0'+d.getSeconds()) : d.getMinutes();
  return year+'-'+mouth+'-'+day+' '+hour+':'+min+':'+seconds;
};

/**
 *  获取当天起始时间
 *  @param date
 *  @return string
 *  @example 2015/07/22 00:00:00
 */
exports.getDayStart = function(date){
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  if(this.isSingle(month)){
    month = '0'+month;
  }
  if(this.isSingle(day)){
    day = '0'+day;
  }
  var timeStr = year+'-'+month+'-'+day+' 00:00:00';
  return timeStr;
};

/**
 *  获取当天结尾时间
 *  @param  date
 *  @return string
 *  @example 2015/07/22 23:59:59
 */
exports.getDayEnd = function(date){
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  if(this.isSingle(month)){
    month = '0'+month;
  }
  if(this.isSingle(day)){
    day = '0'+day;
  }
  var timeStr = year+'-'+month+'-'+day+' 23:59:59';
  return timeStr;
};

/**
 *  获取本周起始时间
 *  @param date
 *  @return Date
 *  @example
 */
exports.getWeekStart = function(date){
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
};

/**
 *  获取本周结尾时间
 *  @param date
 *  @return timeStr
 *  @example
 */
exports.getWeekEnd = function(date){
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
};

/**
 *  获取本月起始时间
 *  @param date
 *  @return string
 *  @example 2015/07/01 00:00:00
 */
exports.getMonthStart = function(date){
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  if(this.isSingle(month)){
    month = '0'+month;
  }
  var timeStr = year+'-'+month+'-01';
  return timeStr;
};

/**
 *  获取本月结尾时间
 * @param  date
 * @return string
 */
exports.getMonthEnd = function(date){
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
    day = '31';
  }else if(month == 4 || month == 6 || month == 9 || month == 11){
    day = '30';
  }else{
    if(this.isLeapYear(year)){
      day = '29';
    }else{
      day = '28';
    }
  }
  if(this.isSingle(month)){
    month = '0'+month;
  }
  var timeStr = year+'-'+month+'-'+day;
  return timeStr;
};

/**
 *  获取本季度起始时间
 * @param   date
 * @return string
 * @example 2015-07-01 00:00:00
 */
exports.getQuarterStart = function(date){
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  switch(parseInt(month/3)){
    case 0:
      month = '01';
      day = '01';
      break;
    case 1:
      month = '04';
      day = '01';
      break;
    case 2:
      month = '07';
      day = '01';
      break;
    case 3:
      month = '10';
      day = '01';
      break;
  }
  var timeStr = year+'-'+month+'-'+day;
  return timeStr;
};

/**
 *  获取本季度结尾时间
 *  @param  date
 *  @return string
 *  @example Q3: 2015-09-30 23:59:59
 */
exports.getQuarterEnd = function(date){
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  switch(parseInt(month/3)){
    case 0:
      month = '03';
      day = '31';
      break;
    case 1:
      month = '06';
      day = '30';
      break;
    case 2:
      month = '09';
      day = '30';
      break;
    case 3:
      month = '12';
      day = '31';
      break;
  }
  var timeStr = year+'-'+month+'-'+day;
  return timeStr;

};

/**
 *  获取本年起始时间
 *  @param  date
 *  @return string
 *  @example 2015-01-01 00:00:00
 */
exports.getYearStart = function(date){
  var year = date.getFullYear();
  var timeStr = year+'-01-01';
  return timeStr;
};

/**
 *  获取本年结尾时间
 *  @param  date
 *  @return string
 *  @example 2015-12-31 23:59:59
 */
exports.getYearEnd = function(date){
  var year = date.getFullYear();
  var timeStr = year+'-12-31';
  return timeStr;
};

/**
 *  判断是否为闰年
 *  @param year
 *  @return boolean
 */
exports.isLeapYear = function(year){
  if((year%4==0&&year%100!=0) || (year%400==0)){
    return true;
  }else
    return false;
};

/**
 *  判断月份或者日期是否为单数
 *  @param date
 *  @return boolean
 */
exports.isSingle = function(date){
  if(date <= 9){
    return true;
  }else
    return false;
};

