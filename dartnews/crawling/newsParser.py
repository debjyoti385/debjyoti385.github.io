from HTMLParser import HTMLParser
import sys, re,os
from os import listdir
import Levenshtein

class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ''.join(self.fed)

def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()

f=open('latlongmapping.csv',"r")
L=[]
for line in f:
	(lat,lng,address)=line.strip().split("|")
	L.append((lat,lng,address))
f.close()


newsCount=0
if __name__=='__main__':
	if len(sys.argv)<4:
		print "Please provide <news webpages directory> <urlmapping file> <outputnewssummary file>"
		sys.exit(1)
	mypath=sys.argv[1]
	urlmappingfile=open(sys.argv[2])
	print 'calculating url mapping ...'
	urlmapping={}
	for line in urlmappingfile:
		sp=line.strip().split(",")
		urlmapping[sp[0]]=sp[1]
	print 'url mapping calculated, starting parser...'
	out=open(sys.argv[3],"w")
	onlyfiles = [ os.path.join(mypath,f) for f in listdir(mypath) ]
	fcount=0
	for filepath in onlyfiles:
		f=open(filepath)
		content=f.read()
		f.close()
		headlineSearch=re.search('<h1[^<]*>(.*)</h1>',content)
		headline=""
		if headlineSearch:
			headline=strip_tags(headlineSearch.group(1))
		time=re.search('((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[^<]*IST)',content)
		if time:
			time=strip_tags(time.group(1))
		else:
			time=""
		news=re.search('<div[\s]+class="Normal">(.*)</div>[\s]*<',content)
		if news:
			news=strip_tags(news.group(1))
		else:
			news=re.findall('<div [^<]*mod-articletext[^<]*>(.*)</div>[\w\s]*<',content)
			newsstr=""
			if news:
				for n in news:
					newsstr+=(" "+strip_tags(n))
			news=newsstr
		if news=='':
			#print "Got empty news in",filepath
			pass
		if 'delhi' in headline.lower() or 'delhi' in news[:50].lower():
			url=urlmapping[filepath.split("/")[-1]]
			D={}
			for (lat,lng,address) in L:
				s=0
				for keyword in address.split(",")[0:2]:
					if keyword in news.lower():
						s+=1
				D[(lat,lng,address)]=s
			entries=sorted(D,key=lambda x: D[x],reverse=True)
			if entries!=[]:
				print entries[0],news,s
			#out.write(time+"\x01"+headline+'\x01'+news+"\x01"+url+"\n");
		fcount+=1
		if fcount%10000==0:
			print 'Processed',fcount,'files'
out.close()
