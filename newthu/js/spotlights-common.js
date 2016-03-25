var dSpotlights = {
	siteId : "", // newthu, newthuen
	profile : "", // online, preview
	currentDateTime : null, // 当前时间，通过服务器获得，形如 "2015-01-06 11:55:55"
	syncDateTime : null, // 同步程序最近一次执行时间
	onlineTime : "00:00:00", // 当天映像内容显示时间
	earliestDate : "2014-03-03", // 最早一条映像的日期
	earliestDateTime : "2014-03-03" + " " + this.onlineTime,
	jdataClone : {},

	init : function() {
		this.parseSiteId();
		this.parseProfile();
		this.fetchCurrentDateTime();
		this.fetchSyncDateTime();
		this.earliestDateTime = this.getDateObject(this.earliestDate + " "
				+ this.onlineTime);
	},

	fetchCurrentDateTime : function() {
		$.ajax({
			url : '/application/gettime2.jsp',
			async : false,
			success : function(data) {
				try {
					dSpotlights.currentDateTime = dSpotlights
							.getDateObject(data.trim());
				} catch (err) {
				}
			},
			error : function() {
				/* Debug用。上线时删除。 */
				dSpotlights.currentDateTime = dSpotlights
						.getDateObject("2015-01-06 11:55:55");
			}
		});
	},

	fetchSyncDateTime : function() {
		$.ajax({
			url : '/publish/' + dSpotlights.siteId + '/synctime.html',
			async : false,
			success : function(data) {
				try {
					dSpotlights.syncDateTime = dSpotlights.getDateObject(data
							.trim());
				} catch (err) {
				}
			},
			error : function() {
				/* Debug用。上线时删除。 */
				dSpotlights.syncDateTime = dSpotlights
						.getDateObject("2015-01-06 11:55:55");
			}
		});
	},

	getDateObject : function(strDate) {
		try {
			var date = new Date();
			var arr1 = strDate.split(" ");
			var arr2 = arr1[0].split("-");
			var arr3 = arr1[1].split(":");
			date.setFullYear(parseInt(arr2[0]), parseInt(arr2[1]) - 1,
					parseInt(arr2[2]));
			date.setHours(parseInt(arr3[0]), parseInt(arr3[1]),
					parseInt(arr3[2]), 0);
			return date;
		} catch (err) {
			return new Date();
		}
	},

	cloneJdata : function() {
		$.each(jdata, function(key, value) {
			try {
				dSpotlights.cloneJdataNode(key, value);
			} catch (err) {
			}
		});
	},

	shouldBeOnline : function(articleDate) {

		/* 2015-07-02 暂不考虑提前维护问题，因此统一返回true */
		return true;

		if (this.profile == 'preview') {
			return true;
		}

		try {
			var articleOnlineDateTime = this.getDateObject(articleDate + " "
					+ dSpotlights.onlineTime);
			if (this.syncDateTime < articleOnlineDateTime) {
				return false;
			}
			return true;
		} catch (err) {
			return false;
		}
	},

	parseSiteId : function() {
		try {
			$.each(jdata, function(key, value) {
				dSpotlights.siteId = value.img.split('/')[2];
				return false;
			});
		} catch (err) {
			dSpotlights.siteId = "newthu";
		}
	},

	parseProfile : function() {
		try {
			if (window.location.hostname.toLowerCase().indexOf('wwwpreview.') != -1) {
				this.profile = "preview";
			} else {
				this.profile = "online";
			}
		} catch (err) {
			this.profile = "online";
		}
	},

	/*
	 * Utils
	 */
	cloneJdataNode : function(key, value) {
		var obj = dSpotlights.jdataClone;
		if (dSpotlights.shouldBeOnline(key)) {
			var date = dSpotlights.getDateObject(key + " "
					+ dSpotlights.onlineTime);
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			if (!obj[year]) {
				obj[year] = {};
			}
			if (!obj[year][month]) {
				var column = this.parseJdataMonthColumn(value);
				obj[year][month] = {
					'column' : column,
					'columnUrl' : '/publish/' + this.siteId + '/' + column
							+ '/index.html'
				};
			}
			obj[year][month][day] = {
				'url' : value.url
			};
		}
	},

	parseJdataMonthColumn : function(value) {
		return value.img.split('/')[3];
	},

	latestMonthOfYear : function(year) {
		try {
			var month = 1;
			$.each(this.jdataClone[year], function(key, value) {
				key = parseInt(key);
				if (key > month) {
					month = key;
				}
			});
			return month;
		} catch (err) {
			return null;
		}
	}

};

dSpotlights.init();
