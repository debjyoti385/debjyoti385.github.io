import urllib2,sys,os
from datetime import date
import thread

if len(sys.argv)!=3:
	print 'Please pass parameters <yearStart> <yearEnd>'
	sys.exit(1)

yearStart=int(sys.argv[1])
yearEnd=int(sys.argv[2])

start=date(1899,12,30)

urlformat='http://timesofindia.indiatimes.com/%s/%s/%s/archivelist/year-%s,month-%s,starttime-%s.cms'
totalCount=0
exCount=0
for year in range(yearStart,yearEnd+1):
	for month in range(1,13):
		for day in range(1,32):
			try:
				daysdiff=(date(year,month,day)-start).days
				url=urlformat %(year,month,day,year,month,daysdiff)
				thread.start_new_thread( os.system, ('wget '+url, ) )
				#totalCount+=1
				#print "Webpages fetched=",totalCount
			except ValueError:
				exCount+=1
				print "Exceptions:",exCount
				pass

