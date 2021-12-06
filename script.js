//$(document).ready(function(){
toastr.options = {
"closeButton": true,
"debug": false,
"newestOnTop": true,
"progressBar": true,
"positionClass": "toast-top-center",
"preventDuplicates": true,
"onclick": null,
"showDuration": "1000",
"hideDuration": "1000",
"timeOut": "5000",
"extendedTimeOut": "1000",
"showEasing": "swing",
"hideEasing": "linear",
"showMethod": "fadeIn",
"hideMethod": "fadeOut"
}
function toFixed( num, precision ) {
return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}	   
// get location
//function getLocation() {
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(success, error);
} else {
console.log("Geo location is not supported by this browser");
 }	
// }	
function success(pos) {
console.log('success');	
var lat = pos.coords.latitude;
var lon = pos.coords.longitude;
console.log(lat);
console.log(lon);
var lat = toFixed(lat,7);
var lon = toFixed(lon,7);
document.getElementById("latitude").value = lat;
document.getElementById("longitude").value = lon;
var nexttimes = updateprayer(lat,lon);
TimeRemainingcounter(nexttimes);
document.getElementById("tonexttimes").innerHTML = nexttimes;
	};
	
function error() {
switch(error.code) {
case error.PERMISSION_DENIED:
var message = "User denied the request for Geolocation.";
var message_ar = "رفض المستخدم تحديد موقعه .";
break;
case error.POSITION_UNAVAILABLE:
var message = "Location information is unavailable.";
var message_ar = "معلومات الموقع الجغرافي غير متوفرة .";
break;
case error.TIMEOUT:
var message = "The request to get user location timed out.";
var message_ar = "إنتهي وقت الإستعلام عن المكان قم بتحديث الصفحة.";
break;
case error.UNKNOWN_ERROR:
var message = "An unknown error occurred.";
var message_ar = "حدث خطأ غير معروف .";
break;
}
	   
toastr.warning(" "+message+" ");
toastr.warning(" "+message_ar+"");
toastr.warning(" في هذه الحالة يعرض مواقيت الصلاة بمكة المكرمة ");

//var lat ='21.42249';
//var long = '39.82618';
var lat ='37.0066244';
var lon = '6.5700192';
document.getElementById("latitude").value = lat;
document.getElementById("longitude").value = lon;
console.log('error');
console.log(lat);
console.log(lon);
var nexttimes = updateprayer(lat,lon);
TimeRemainingcounter(nexttimes);
document.getElementById("tonexttimes").innerHTML = nexttimes;
}; 
				
function currentPrayer(date,times) {
if (date >= times.isha) {
return times.isha;
} else if (date >= times.maghrib) {
return times.maghrib;				
} else if (date >= times.asr) {
return times.asr;
} else if (date >= times.dhuhr) {
return times.dhuhr;
} else if (date >= times.fajr) {
return times.fajr;
} 
}	

function addZero(i) {
if (i < 10) {
i = "0" + i;
}
return i;
}

function getDate(times,addday) {
var d = new Date();
var nameOfMonth = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
//Sun Mon Tue Wed Thu Fri Sat
var nameOfweekday = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];	
if(addday == 1){
var date = d.getDate() + 1;// 1-31
}else{
var date = d.getDate();// 1-31
}
var day = d.getDay();// 0-6
var month = d.getMonth()+ 1; // 0-11 but change to 1-12
var year = d.getFullYear();// 2020, 2021, so on
var monthName = nameOfMonth[month- 1]; // 3 char of month name
var todaysName = nameOfweekday[day]; // 3 char of todays day of the week
//var timenow = ''+monthName+' '+date+' '+year+' '+times+':00';
var timenow = ''+todaysName+' '+monthName+' '+date+' '+year+' '+times+':00';
return new Date(timenow);
}

function mynext_time(ntm) {
var d = new Date(ntm);
var h = addZero(d.getHours());
var m = addZero(d.getMinutes());
//var s = addZero(d.getSeconds());
var timenow = h + ":" + m;
return timenow;
}
	  
var i;
// check just to avoid error messages
if (document.getElementById('method')) {
for (i = 0; i < document.getElementById('method').options.length; i++) {
if (document.getElementById('method').options[i].value == 'DZM' ) {
document.getElementById('method').selectedIndex = i;
break;
}
}
}

var rightNow = new Date();
var jan1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
var temp = jan1.toGMTString();
var jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
var std_time_offset = (jan1 - jan2) / (1000 * 60 * 60);
var june1 = new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0, 0);
temp = june1.toGMTString();
var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
var daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
var dst;
if (std_time_offset == daylight_time_offset) {
    dst = "0"; // daylight savings time is NOT observed
} else {
    dst = "1"; // daylight savings time is observed
}
console.log('timezone:'+std_time_offset);
console.log('dst:'+dst);

var r;
// check just to avoid error messages
if (document.getElementById('dst')) {
for (r = 0; r < document.getElementById('dst').options.length; r++) {
if (document.getElementById('dst').options[r].value == dst ) {
document.getElementById('dst').selectedIndex = r;
break;
}
}
}
var p;
// check just to avoid error messages
if (document.getElementById('timezone')) {
for (p = 0; p < document.getElementById('timezone').options.length; p++) {
if (document.getElementById('timezone').options[p].value == std_time_offset ) {
document.getElementById('timezone').selectedIndex = p;
break;
}
}
}
function updateprayer(lat,lng) {
	
var lat = document.getElementById('latitude').value;
var lng = document.getElementById('longitude').value;
		
var mytimezonelist = document.getElementById("timezone");
var timezone = mytimezonelist.options[mytimezonelist.selectedIndex].value;

var mydst = document.getElementById("dst");
var dst = mydst.options[mydst.selectedIndex].value;
		
var mymethod = document.getElementById("method");
var method = mymethod.options[mymethod.selectedIndex].value;
var methodname = mymethod.options[mymethod.selectedIndex].text;
$("#methodname").text(methodname);
		
var myjurisdiction = document.getElementById("jurisdiction");
var jurisdiction = myjurisdiction.options[myjurisdiction.selectedIndex].value;
var jurisdictionname = myjurisdiction.options[myjurisdiction.selectedIndex].text;
$("#jurisdictionname").text(jurisdictionname);
 
//toastr.success('Prayer time has been update!');
toastr.success('تجديد مواقيت الصلاة ');
//toastr.success('في إنتظار صلاة '+nextprayer+''); 
 
//console.log('latitude:'+lat);
//console.log('longitude:'+lng);
//console.log('timezone:'+timezone);
//console.log('dst:'+dst);
//console.log('method:'+method);
//console.log('jurisdiction:'+jurisdiction);

var prayTimes = new PrayTimes();
console.log(prayTimes);
prayTimes.adjust({asr: jurisdiction});
prayTimes.setMethod(method);
//prayTimes.tune( { maghrib: 3 } );
//prayTimes.tune( { isha: -2 } );

var todaydate = new Date(); // today
//console.log('getTimezoneOffset:'+todaydate.getTimezoneOffset()); 

var times = prayTimes.getTimes(todaydate,[lat,lng],timezone,dst,'24h');


var optionscounter = {
hour12 : false,
hour:  "2-digit",
minute: "2-digit",
second: "2-digit",
}
var daycounter = new Date().toLocaleTimeString("en-US",optionscounter);

var optionsdtn = {
hour12 : false,
hour:  "2-digit",
minute: "2-digit",
}
var nowday = new Date().toLocaleTimeString("en-US",optionsdtn);
//console.log('now_time_day:'+nowday);
var prayernow;
if (nowday == times.fajr ) {
$("#prayernow").text('الفجر');
prayernow = 'الفجر';
} else if (nowday == times.dhuhr) {
$("#prayernow").text('الظهر');
prayernow = 'الظهر';	
} else if (nowday == times.asr) {
$("#prayernow").text('العصر');	
prayernow = 'العصر';
} else if (nowday == times.maghrib) {
$("#prayernow").text('المغرب');	
prayernow = 'المغرب';
} else if (nowday == times.isha) {
$("#prayernow").text('العشاء');	
prayernow = 'العشاء';
} 
	
var nextprayer;
var nexttimes;
		  
if (nowday > times.fajr && nowday < times.dhuhr) {
nextprayer = 'الظهر';
nexttimes = getDate(times.dhuhr,0);
} else if (nowday > times.dhuhr && nowday < times.asr) {
nextprayer = 'العصر';
nexttimes = getDate(times.asr,0);
} else if (nowday > times.asr && nowday < times.maghrib) {
nextprayer = 'المغرب';
nexttimes = getDate(times.maghrib,0);
} else if (nowday > times.maghrib && nowday < times.isha) {
nextprayer = 'العشاء';
nexttimes = getDate(times.isha,0);
} else if (nowday > times.isha) {
nextprayer = 'الفجر';
nexttimes = getDate(times.fajr,1);
} 
console.log('nexttimes-2:'+ getDate(times.asr,0));
console.log('nexttimes-1:'+ getDate(times.asr,0).getTime());
console.log('nexttimes-1:'+ getDate(times.asr,1));

  var from = new Date();
  var to = new Date(nexttimes);
  var diff = datediff(from,to);
    
  var totalsdiff = diff.hours + diff.minutes + diff.seconds;
   
  if (totalsdiff == 0 ) {

  $("#nextprayer").text('الصلاة الأن  ('+prayernow+')  ');
  $("#days").text('');
  $("#hours").text('');
  $("#seconds").text('');
  $("#minutes").text('');	  
  }else{
	 	  
  $("#days").text(''+diff.days+' يوم');
  $("#hours").text(''+diff.hours+' ساعة');
  $("#minutes").text(''+diff.minutes+' دقيقه');
  $("#seconds").text(''+diff.seconds+' ثانية');	
  $("#nextprayer").text('الصلاه القادمه ('+nextprayer+') ستبدا بعد: ');  
  }

var list = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
var listar = ['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء'];

var html = '<table dir="rtl" class="table table-hover mb-5">';

html += '<tr><th colspan="3">'+ daycounter +'</th></tr>';

  for(var i in list)	{
  if (nowday == times[list[i].toLowerCase()]) {
  html += '<tr class="table-success">';
  } else if (currentPrayer(nowday,times)== times[list[i].toLowerCase()]){
  html += '<tr class="table-danger">';
  } else if (mynext_time(nexttimes) == times[list[i].toLowerCase()]){
  html += '<tr class="table-warning">';
  }
  html += '<td>'+ listar[i]+ '</td>';
  html += '<td id="time_alert_' + i + '">'+ times[list[i].toLowerCase()]+ '</td>';
  html += '<td>'+ list[i]+ '</td></tr>';
  }
  html += '</table>';
  
  html += '<table class="table table-hover mt-5">';
  html += '<tr class="table-info"><td> شروق الشمس '+ times.sunrise +'</td></tr>';
  html += '<tr class="table-info"><td> غروب الشمس '+ times.sunset +'</td></tr>';
  html += '<tr class="table-info"><td> منتصف الليل '+ times.midnight +'</td></tr>';
  html += '</table>';

  $("#prayertimes").html(html);

return nexttimes;

}

function TimeRemainingcounter(nexttimes) {
	
$('#showprayertimes').hide();	
	
//console.log(nexttimes);
var countDownDate = new Date(nexttimes).getTime();
//var countDownDate = new Date('Sun Jul 11 2021 13:41:00').getTime();
//var countDownDate = new Date().getTime();
// Update the count down every 1 second
//$('#showprayertimes').hide();
var x = setInterval(function() {
  // Get today's date and time
  var now = new Date().getTime();   
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  // console.log('distance:'+distance);   
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

if(hours == 0 && minutes == 10 && seconds == 0) {	
console.log(hours+' '+minutes+' '+seconds )
shownotifyMe();
} 
// Output the result in an element with id="demo"
document.getElementById("countdown-timer").innerHTML = days + "&nbsp; يوم  /&nbsp;" + hours + "&nbsp; ساعة /&nbsp;"
  + minutes + "&nbsp; دقيقة /&nbsp;" + seconds + "&nbsp; ثانية ";   
  // If the count down is over, write some text 
  if (distance <= 0) {
    clearInterval(x);	
 console.log('distance:'+distance);	
 document.getElementById("countdown-timer").innerHTML = " وقت الصلاة ";
  //$('#left_modal_xs').modal('show');
  $('#showprayertimes').show();
  //$('#showprayertimes').hide();
  $('#showprayertimes').fadeIn();
  $('#showprayertimes').slideDown(); 
  play_athan();
  setTimeout(updateprayer, 0);
  setTimeout(refreshPage, 203000);
  }
 }, 1000);
 }
function refreshPage() {
window.location.reload();
} 	
function secondsToTime(secs) { // we will use this function to convert seconds in normal time format
var hr = Math.floor(secs / 3600);
var min = Math.floor((secs - (hr * 3600))/60);
var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
if (hr < 10) {hr = "0" + hr; }
if (min < 10) {min = "0" + min;}
if (sec < 10) {sec = "0" + sec;}
if (hr) {hr = "00";}
return hr + ':' + min + ':' + sec;
};
function play_athan() {
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'uploads/adhanmakkah.mp3');	
//setTimeout(updateprayer, 0);
//setTimeout(TimeRemainingcounter, 60000);
audioElement.play();
$("#btn_close").click(function() {
audioElement.pause();
});
$("#btn_btn_close").click(function() {
audioElement.pause();
});
audioElement.addEventListener('ended', function() {
//  this.play();
this.pause();
$('#left_modal_xs').modal('hide');  
//window.location.reload();
}, false);
audioElement.addEventListener("canplay",function(){
$("#length").html('المدة:<span class="badge badge-primary">' + secondsToTime(audioElement.duration) + '</span>');
$("#source").text("المصدر:" + audioElement.src);
$("#status").text("الحالة: الأذان ير فع الأن").css("color","green");
});
audioElement.addEventListener("timeupdate",function(){
$("#currentTime").text("الوقت الأن:" + secondsToTime(audioElement.currentTime));
$('#seekbar').attr("value", audioElement.currentTime / audioElement.duration);
});   
$('#play').click(function() {
audioElement.play();
$("#status").text("الحالة: يشتغل");
});
$('#pause').click(function() {
audioElement.pause();
$("#status").text("الحالة : متوقف");
});
$('#restart').click(function() {
audioElement.currentTime = 0;
});			
}  
function shownotifyMe() {	
let permission = Notification.permission;
console.log(permission);
if(permission === "granted") {	
showNotification();
} else if(permission === "default"){	
requestAndShowPermission();
} else if (permission === 'denied') {
$('#status').show();
$('#status').fadeIn();
$('#status').slideDown();	
$("#status").text("لقد منعت تنبيهات أوقات الصلاة يمكنك السماح لها");
}
function showNotification() {	
var title = "تنبيه دخول وقت الصلاة";
icon = "./img/masjid.png"
var body = "بقي عشرة دقائق علي وقت الصلاة";
var notification = new Notification(title, { body, icon });
// close the notification after 30 seconds
setTimeout(() => {
notification.close();
}, 30 * 1000);
notification.onclick = () => { 
notification.close();
window.parent.focus();
}
}
function requestAndShowPermission() {
Notification.requestPermission(function (permission) {
if (permission === "granted") {
showNotification();
}
});
}		
}
