import urllib2
baseUrl="http://maps.googleapis.com/maps/api/geocode/json?latlng=%s,%s&sensor=false"
geoInfo=open("geoInfoFile","w")

lat=28.412593
while(lat<=28.881338):
	lng=76.83806899999999
	while(lng<=77.3484579):
		url=baseUrl%(lat,lng)
		print lat,lng
		geoInfo.write(urllib2.urlopen(url).read()+"\n")
		lng+=0.001
	lat+=0.001

	
