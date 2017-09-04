import moment from 'moment'
import Vue from 'vue'

Vue.filter('time', function(value, formatString, type){
	formatString = formatString || "YYYY-MM-DD H:mm:ss";
	type = type.trim().toLowerCase() || 'unix';
	if(value){
		switch(type){
			case 'unix':
				return moment.unix(value).format(formatString);
				break;
			case 'utc':
				return moment.utc(value).format(formatString);
				break;
			default:
				return '';
		}
	}else{
		return '';
	}
})