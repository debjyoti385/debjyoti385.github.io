import os,sys
if len(sys.argv)!=2:
	print 'Provide TOIWEBDIR'
	sys.exit(1)
allfiles=[os.path.join(sys.argv[1],f) for f in os.listdir(sys.argv[1])]
for filepath in allfiles:
	if 'http://103.6.156.200/' in open(filepath).read():
		os.remove(filepath)
		print 'removed',filepath
