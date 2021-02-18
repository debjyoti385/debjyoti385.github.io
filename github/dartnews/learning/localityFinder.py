from nltk.corpus import stopwords
from nltk.tokenize import RegexpTokenizer
import csv
from sets import Set

LABDATA=[]
CLASSES=[]
labdata=open('manual_tagstxt.csv','r')
labdata_reader=csv.reader(labdata, delimiter=',', quotechar='"')
tokenizer = RegexpTokenizer(r'\w+')

def checkLocationPresence(location,news):
	news=' '.join(news)
	location=location.lower()
	news=news.lower()
	
	locationBlocks=location.split(",")[:2]
	locationTags=[]
	#try to match doublets first
	for locationBlock in locationBlocks:
		locationBlockParts=locationBlock.split()
		for i in range(len(locationBlockParts)-1):
			if (len(locationBlockParts[i].strip())>=3 and len(locationBlockParts[i+1].strip())>=3):
				if (locationBlockParts[i].strip()+" "+locationBlockParts[i+1].strip()) in news:
					locationTags.append(locationBlockParts[i]+" "+locationBlockParts[i+1])
	#if there are no doublets, try to match singlets
	if locationTags==[]:
		for locationBlock in locationBlocks:
			locationBlockParts=locationBlock.split()
			if len(locationBlockParts)==1:
				try:
					int(locationBlockParts[0])
					continue
				except ValueError:
					continue
				if locationBlockParts[0].strip() in news:
					locationTags.append(locationBlockParts[0])
	return locationTags

if __name__=='__main__':
	'''
	content=' NEW DELHI: Two senior west Delhi traffic cops have been sent to the lines following a vigilance probe into complaints of their accepting bribes to let private vans ply as commercial vehicles. The inquiry has confirmed that the vehicles were flouting norms in connivance with Tilak Nagar Traffic Inspector Ved Prakash and Uttam Nagar Zonal Officer sub-inspector Bhim Singh. After receiving complaints of private vans plying as commercial vehicles in Uttam Nagar and autorickshaws plying on a shared basis, a vigilance team carried out surveillance in Tilak Nagar traffic circle. In a video of the route from Uttam Nagar terminal till Pankha Road T-point as well as from the DAP III Battalion Delhi Police office to Buttakh Farm, the team found several vehicles plying in an unauthorized manner. var adSkipCounter = 0;  The vigilance team intercepted the errant autos and private vans during a raid at Premwati Sharma Marg-Hastsal crossing near LIG flats, said sources. Ten private vans and 12 TSRs were intercepted within half an hour. While the private vans were found ferrying passengers on fare charged on a per person basis TSRs, too, were found carrying six to seven passengers on a shared basis and operating without a meter. The vans were being used as commercial vehicles despite having no permits. The vehicles were also found flouting other traffic norms, said sources. The probe found the starting point of these vehicles to be Uttam Nagar Chowk and pointed at the connivance of zonal officer Bhim Singh who had been posted there since December 1 this year. "At a rough estimate, about 100-150 TSRs and 50 private Maruti vans had been operating on this route violating traffic norms. Efforts of the TI to curb these illegal activities, if any, were found to be grossly inadequatLABDATAe," said a source. Joint commissioner of police (traffic) Satyendra Garg confirmed the incident, saying, "There was a complaint which was substantiated on inquiry. The two police officers have been transferred to traffic lines."FEATURED ARTICLES5 Steps to a flat tummy in 7 days5 Natural tips to prevent hair loss20 ways to gain weight fastMore:20 ways to gain weight fast7 Day flat belly diet planKapil Sharma walks out of CCL, leaves organisers fumingSussanne will always be the love of my life: Hrithik Roshan10 tips to get rid of under eye puffinessBrilliant ways to beat belly fat'

	headline="Pvt vans double up as cabs, cops sent to the lines"
	news=headline+" "+content
	'''
	latlongfile=open('latlongmapping.csv',"r")
	out=open('fulldata.csv','w')
	locations={}
	# read latlongs
	for line in latlongfile:
		sp=line.strip().split("|")
		locations[sp[2]]=sp[0]+","+sp[1]
	latlongfile.close()
	
	for row in labdata_reader:
		body=row[4]
		title=row[3]
		if(':' in body):
			body=body[body.find(':')+1:body.find('FEATURED ARTICLES')]
		else :
			body=body[0:body.find('FEATURED ARTICLES')]
		body=tokenizer.tokenize(body)
		title=tokenizer.tokenize(title)	
		news=title+body
		areaTags=Set()
		latlongs=[]
		#print news
		for location in locations:
			locationTags=checkLocationPresence(location,news)
			#LABDATA.append([row[0].lower(),news])
			if locationTags!=[]:
				areaTags.add(locationTags[0])
				latlongs.append(locations[location])
				#print location,locationTags,locations[location]
		out.write(row[0]+"|"+','.join(areaTags)+"|"+row[2]+"|"+' '.join(title)+"|"+' '.join(body)+"|"+row[5]+"|"+';'.join(latlongs)+"\n")
	out.close()
