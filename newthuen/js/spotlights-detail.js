var dSpotlightsDetail = {
	detailDateTime : new Date(),

	parseDetailDateTime : function() {
		try {
			this.detailDateTime = this.getDateObject($(
					'div.column_1 > ul > input[name=thuimg_datetime]').val());
		} catch (err) {
		}
	},

	renderPreviousDays : function() {
		$('div.column_1 > ul > li:not(.today,.more,.stat)').remove();
		try {
			var more = this.jdataClone[this.detailDateTime.getFullYear()][this.detailDateTime
					.getMonth() + 1]['columnUrl'];
			var $liMore = $('div.column_1 > ul > li.more');
			$liMore.children('a').attr('href', more);

			var i = 0;
			var date = new Date(this.detailDateTime.getTime());
			var $li, $a, date, strDate;
			while (i < 4) {
				i++;
				date = this.getPreviousDay(date);
				if (date == null) {
					break;
				}
				strDate = date.Format('yyyy-MM-dd');
				$a = $('<a/>').attr('href', jdata[strDate]['url']).append(
						$('<span/>').text(getMd1(strDate))).append(
						getYyyy1(strDate));
				$li = $('<li/>').append($a);
				$liMore.before($li);
			}
		} catch (err) {
		}
	},

	/*
	 * 递归获取上一篇映像日期
	 * 
	 * 如果不存在，返回null
	 */
	getPreviousDay : function(dateObj) {
		if (dateObj < this.earliestDateTime) {
			return null;
		}
		var previous = new Date(dateObj.getTime());
		previous.setDate(dateObj.getDate() - 1);
		if (!jdata[previous.Format('yyyy-MM-dd')]) {
			return this.getPreviousDay(previous);
		}
		return previous;
	}

};

$.extend(true, dSpotlights, dSpotlightsDetail);

dSpotlights.cloneJdata();
dSpotlights.parseDetailDateTime();
dSpotlights.renderPreviousDays();
