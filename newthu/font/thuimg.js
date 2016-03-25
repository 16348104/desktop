{
#foreach($article in $columninfo.getColumnPhotoinfo("(8013)",1,31,25))

 "$article.Datetime":
	{"id":"1","title":"$article.cuttitle"","img":"$article.titlepicurl","url":"$article.href"}
	
#end	
}