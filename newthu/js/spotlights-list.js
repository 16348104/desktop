var dSpotlightsList = {
	listYear : null,
	listMonth : null,

	initList : function() {
		this.parseListYearAndMonth();
	},

	parseListYearAndMonth : function() {
		try {
			var date = $(
					'div.column_2 ul.thuimglist > li:eq(0) input[name=thuimg_date]')
					.val();
			var dateTime = this.getDateObject(date + " " + this.onlineTime);
			this.listYear = dateTime.getFullYear();
			this.listMonth = dateTime.getMonth() + 1;
		} catch (err) {
		}
	},

	/*
	 * 日历: 1)12个月份是否可点击，及其链接; 2) 当前选中月份
	 */
	renderCalendar : function() {
		var obj = this.jdataClone;
		var listYear = this.listYear;
		var month;

		try {
			$('div.column_1 > ul > li.year > span').html(listYear);
		} catch (err) {
		}

		$('div.column_1 > ul > li.year > ul > li').each(function(index) {
			try {
				month = $(this).text().trim();
				$(this).empty();
				if (obj[listYear][month]) {
					$(this).html('<a>' + month + '</a>');
					var $a = $(this).find('a');
					$a.attr('href', obj[listYear][month]['columnUrl']);
					if (month == dSpotlights.listMonth) {
						$a.addClass('current');
					}
				} else {
					$(this).html('<em>' + month + '</em>');
				}
			} catch (err) {
			}
		});

	},

	/*
	 * 年份列表: 显示除当前年份外的所有年份，链接指向该年最新月份栏目
	 */
	renderYearList : function() {
		$('div.column_1 > ul > li:not(.year,.stat)').remove();
		var $liYear = $('div.column_1 > ul > li.year');
		$.each(this.jdataClone, function(key, value) {
			try {
				if (key != dSpotlights.listYear) {
					var columnUrl = dSpotlights.jdataClone[key][dSpotlights
							.latestMonthOfYear(key)]['columnUrl'];
					$liYear.after('<li><a href="' + columnUrl + '"><span>'
							+ key + '</span></a></li>');
				}
			} catch (err) {
			}
		});
	},

	/*
	 * 根据当前时间和映像内容显示时间过滤右侧列表内容。
	 */
	filterSpotlightsList : function() {
		try {
			$('div.column_2 ul.thuimglist > li').each(function(index) {
				var strDate = $(this).find('input[name=thuimg_date]').val();
				if (!dSpotlights.shouldBeOnline(strDate)) {
					$(this).remove();
				}
			});
		} catch (err) {
		}
	}
};

$.extend(true, dSpotlights, dSpotlightsList);

dSpotlights.cloneJdata();
dSpotlights.initList();
dSpotlights.renderCalendar();
dSpotlights.renderYearList();
dSpotlights.filterSpotlightsList();
