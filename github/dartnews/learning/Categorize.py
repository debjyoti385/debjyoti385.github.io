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


LABDATA=[]
CLASSES=[]
labdata=open('manual_tagstxt.csv','r')
labdata_reader=csv.reader(labdata, delimiter=',', quotechar='"')

i=0
tokenizer = RegexpTokenizer(r'\w+')
for row in labdata_reader:
	if(i==0):	
		#skipping the header
		i=i+1
		continue;
	body=row[4]
	title=row[3]
	if(':' in body):
		body=body[body.find(':')+1:body.find('FEATURED ARTICLES')]
	else :
		body=body[0:body.find('FEATURED ARTICLES')]
	body=tokenizer.tokenize(body)
	title=tokenizer.tokenize(title)	
	news=title+body
	LABDATA.append([row[0].lower(),news])
	if(row[0]=='others'): continue
	if(row[0].lower() not in CLASSES):
		CLASSES.append(row[0].lower())
	
labdata.close()

S=stopwords.words('english')

def remove_stopw(words):
	important_words=[]
	for w in words:
		if w.lower() not in S : 
			important_words.append(w.lower())	
	return important_words

Wlist=[]
for I in LABDATA:
	WRDS=I[1]
	#print WRDS
	WRDS1=remove_stopw(WRDS)
	#print WRDS1
	#print '\n\n\n'
	Wlist=Wlist+WRDS1


print str(len(Wlist))
print nltk.FreqDist(w.lower() for w in Wlist)
all_words = nltk.FreqDist(w.lower() for w in Wlist)
word_features1 = all_words.keys()[:2000]
print str(len(word_features1))
#print Wlist

def document_features(document,word_features): 
    document_words = set(document) 
    features = {}
    for word in word_features:
        features['contains(%s)' % word] = (word in document_words)
    return features

Dat=[]
for I in LABDATA:
	F=document_features(remove_stopw(I[1]),word_features1)
	T=(F,I[0])
	Dat.append(T)

print CLASSES

Dcat={}
psplit=.8


for c in CLASSES:
	Dfull=[]
	Dcat[c]=0
	for I in Dat:
		if(I[1]==c):
			Dfull.append([I[0],c])
			Dcat[c]+=1
		else:
			Dfull.append([I[0],'others'])
	random.shuffle(Dfull)
	print c+':'+str(Dcat[c])
	trainset=Dfull[0:int(psplit*(len(Dfull)))]
	testset=Dfull[int(psplit*(len(Dfull))):len(Dfull)]
	classifier1 = nltk.NaiveBayesClassifier.train(trainset)
	fcl = open(c+'_classifier.pickle', 'wb')
	pickle.dump(classifier1, fcl)
	fcl.close()

	fcl=open(c+'_classifier.pickle')
	classifier = pickle.load(fcl)
	fcl.close()
	CM={c:{c:0,'others':0},'others':{c:0,'others':0}}
	for Fr in testset:
		pdist = classifier.prob_classify(Fr[0])
		#print c+':'+str(pdist.prob(c))+' '+'others:'+str(pdist.prob('others'))+' ::: '+Fr[1]
		label='others'
		if pdist.prob(c) > pdist.prob('others') :
			label=c
		if((Fr[1]==c) and (label==c)):
			CM[c][c]+=1
		elif((Fr[1]=='others') and (label=='others')):
			CM['others']['others']+=1
		elif((Fr[1]==c) and (label=='others')):
			CM[c]['others']+=1
		else:
			CM['others'][c]+=1
	print '\t'+c+'\t'+'others'
	print c+':'+str(CM[c][c])+'\t'+str(CM[c]['others'])
	print 'others'+':'+str(CM['others'][c])+'\t'+str(CM['others']['others'])
	print '\n'
	print 'Accuracy: %4.2f' % nltk.classify.accuracy(classifier, testset)
	classifier.show_most_informative_features(25)
		
print str(Dcat)

'''
for i  in range(1,10):
	c='crime'
	Dfull=[]
	Dcat[c]=0
	for I in Dat:
		if(I[1]=='crime'):
			Dfull.append([I[0],c])
			Dcat[c]+=1
		else:
			Dfull.append([I[0],'other'])
	random.shuffle(Dfull)
	trainset=Dfull[0:int(psplit*(len(Dfull)))]
	testset=Dfull[int(psplit*(len(Dfull))):len(Dfull)]
	classifier = nltk.NaiveBayesClassifier.train(trainset)
	print 'Accuracy: %4.2f' % nltk.classify.accuracy(classifier, testset)
	print str(Dcat)
'''

fwlist=open('wlistfile','w')
csvfwlist=csv.writer(fwlist)
csvfwlist.writerow(Wlist)
fwlist.close()

fflist=open('flistfile','w')
csvfflist=csv.writer(fflist)
csvfflist.writerow(word_features1)
fflist.close()

