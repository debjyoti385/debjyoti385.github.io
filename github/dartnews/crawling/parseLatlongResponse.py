f=open('geoInfoFileAll','r')
out=open('latlongmapping.csv',"w")
line=f.readline()
D={}
names=[]
while(line!=''):
	if '"formatted_address" : "' in line:
		address=line.split('"formatted_address" : "')[1].split('"')[0]
		while('"location" :' not in line):
			line=f.readline()
		line=f.readline()
		lat=line.split('"lat" : ')[1].split(",")[0]
		line=f.readline()
		lng=line.strip().split('"lng" : ')[1]
		D[lat,lng]=address.lower()
		#out.write(lat+"|"+lng+"|"+address+"\n")
	line=f.readline()
f.close()

for (lat,lng) in D:
	out.write(lat+"|"+lng+"|"+D[lat,lng]+"\n")
out.close()
