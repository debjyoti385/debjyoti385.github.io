import csv,json

addressPoints=[]	
with open('fulldata.csv', 'r') as csvfile:
	newsreader=csv.reader(csvfile, delimiter='|',quotechar='"')
	records=[]
	out=open('newsjson.js',"w")
	out.write('var addressPoints = [')
	for row in newsreader:
		news={}
		news['category']=row[0]
		news['dateTime']=row[2]
		news['heading']=row[3]
		news['contents']=row[4]
		news['link']=row[5]
		areas=row[6].split(";")
		result=[]
		L=[]
		for area in areas:
			if area=='':
				continue
			L.append(map(float,area.split(",")))
		result.append(L)
		try:
			result.append(json.dumps(news,ensure_ascii=False))
		except UnicodeDecodeError:
			print 'Couldnt write news',news
		if result!=[]:
			out.write(str(result)+",\n")
	out.write("];")
out.close()
		

