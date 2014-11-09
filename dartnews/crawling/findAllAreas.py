import os,sys
outputfile="delhiAreas"
lat=28.5
while(lat<=28.7):
	lon=77.2
	while(lon<=77.3):
		os.system("python customGeoNameLookup.py "+str(lat)+" "+str(lon)+" "+outputfile)
		lon+=0.001
	lat+=0.01
