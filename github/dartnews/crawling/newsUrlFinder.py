import re,sys,os
from os import listdir
import thread

newsUrlRegex='http://timesofindia.indiatimes.com/[^<]*/articleshow/\d+.cms'
if len(sys.argv)<2:
	print 'Please provide toi html files directory'
	sys.exit(1)
	
mypath=sys.argv[1]
print 'Finding news urls...'
onlyfiles = [ os.path.join(mypath,f) for f in listdir(mypath)]
newsCount=0
mapping=open('mapping.csv','w')
for filepath in onlyfiles:
	toihtml=open(filepath).read()
	newsUrls=re.findall(newsUrlRegex,toihtml)
	for newsUrl in newsUrls:
		#print newsUrl
		thread.start_new_thread( os.system, ('wget '+newsUrl, ) )
		mapping.write(newsUrl.split("/")[-1]+","+newsUrl+"\n")
		#newsCount+=1
		#print "NewsCount=",newsCount
mapping.close()
print 'All done!'
