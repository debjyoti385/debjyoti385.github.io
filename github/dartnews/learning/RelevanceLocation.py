import nltk
import random
import sys
import glob
import csv
import pickle

import os, sys
import re
from nltk.corpus import stopwords
from nltk.tokenize import RegexpTokenizer
from sets import Set

Lclasses=['development','religiousnews','healthhospital','waternews','pollutionenvironment','womenissues','transportnews','industry', 'political', 'sportsnews', 'governance', 'crime', 'culture', 'weathernews', 'electricitylighting', 'socialissues', 'others', 'education', 'agriculture', 'events', 'accidentcalamity']

fwlist=open('wlistfile','r')
csvfwlist=csv.reader(fwlist)
Wlist=csvfwlist.next()
print len(Wlist)
fwlist.close()

fflist=open('flistfile','r')
csvfflist=csv.reader(fflist)
word_features1=csvfflist.next()
fflist.close()

S=stopwords.words('english')

def remove_stopw(words):
	important_words=[]
	for w in words:
		if w.lower() not in S : 
			important_words.append(w.lower())	
	return important_words

def document_features(document,word_features): 
    document_words = set(document) 
    features = {}
    for word in word_features:
        features['contains(%s)' % word] = (word in document_words)
    return features


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


latlongfile=open('latlongmapping.csv',"r")
locations={}
# read latlongs
for line in latlongfile:
	sp=line.strip().split("|")
	locations[sp[2].lower()]=sp[0]+","+sp[1]
latlongfile.close()

labdata=open('manual_tagstxt.csv','r')
labdata_reader=csv.reader(labdata, delimiter=',', quotechar='"')
tokenizer = RegexpTokenizer(r'\w+')

classifiers={}
for c in Lclasses:
	fcl=open(c+'_classifier.pickle')
	classifiers[c] = pickle.load(fcl)
	fcl.close()

out=open('fulldata2.csv','w')
latlongs2={}
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
	loclist=[]
		#print news
	for location in locations:
		locationTags=checkLocationPresence(location,news)
		#print locationTags
		#LABDATA.append([row[0].lower(),news])
		if locationTags!=[]:
			areaTags.add(locationTags[0])
			latlongs2[locationTags[0]]=locations[location]
	print areaTags
	#print news
	news=remove_stopw(news)
	Lnws=len(news)
	tagsWithScores={}
	for A in areaTags:
		AL=A.split(' ')
		#print news
		if(AL[0] in news):
			i=news.index(AL[0])
		else:		
			continue
		ilow=i-int(0.2*Lnws)
		ihigh=i+int(0.2*Lnws)
		if(ilow < 0): ilow=0
		if(ihigh > Lnws): ihigh= Lnws	
		DA=news[ilow:ihigh]
		F=document_features(DA,word_features1)
		pdist=classifiers[row[0].lower()].prob_classify(F)
		scoreA=pdist.prob(row[0].lower())
		#print A+':'+str(scoreA)
		tagsWithScores[A]=scoreA
		#print location,locationTags,locations[location]
	tagsWithScores2=sorted(tagsWithScores, key=lambda x: tagsWithScores[x],reverse=True)
	tags = [x for x in tagsWithScores2 if tagsWithScores[x]>=0.5]
	latlongs=[(str(latlongs2[x])+":"+str(tagsWithScores[x])) for x in tags]
	out.write(row[0]+"|"+','.join(tags)+"|"+row[2]+"|"+' '.join(title)+"|"+' '.join(body)+"|"+row[5]+"|"+';'.join(latlongs)+"\n")
		#print row[0]+"|"+','.join(areaTags)+"|"+row[2]+"|"+' '.join(title)+"|"+' '.join(body)+"|"+row[5]+"|"+';'.join(latlongs)+"\n"
	#print '\n\n'
labdata.close()
out.close()



