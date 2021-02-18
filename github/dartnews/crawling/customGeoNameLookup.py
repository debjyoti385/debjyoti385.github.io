#!/usr/bin/env python
#-*- coding:utf-8 -*-

# based on geoname.py by Nicolas Laurance (nlaurance@zindep.com)
# This extends his code to perform an extendedFindNearby lookup of a
# lat lon value and produces a list of names from the returned file
#
# NB enter the lat lon values in that order with no comma between If
# you get an AttributeError: Bag instance has no attribute 'geoname',
# it probably just means the server is busy - reload the command and
# do it again
#
# Usage e.g $ python geonameLookup.py 55.751320 11.331710
#
# Daniel Belasco Rogers
# Date: 2010-07-17


from optparse import OptionParser
from time import sleep
from xml.dom import minidom
import sys, urllib, re

HTTP_PROXY = None
DEBUG = 0

def getProxy(http_proxy = None):
    """get HTTP proxy"""
    return http_proxy or HTTP_PROXY

def getProxies(http_proxy = None):
    http_proxy = getProxy(http_proxy)
    if http_proxy:
        proxies = {"http": http_proxy}
    else:
        proxies = None
    return proxies

class Bag: pass

_intFields = ('totalResultsCount')
_dateFields = ()
_listFields = ('code','geoname','country',)
_floatFields = ('lat','lng','distance')

def unmarshal(element):
    #import pdb;pdb.set_trace()
    rc = Bag()
    childElements = [e for e in element.childNodes if isinstance(e, minidom.Element)]
    if childElements:
        for child in childElements:
            key = child.tagName
            if hasattr(rc, key):
                if key in _listFields:
                    setattr(rc, key, getattr(rc, key) + [unmarshal(child)])
            elif isinstance(child, minidom.Element) and (child.tagName in ( )):
                rc = unmarshal(child)
            elif key in _listFields:
                setattr(rc, key, [unmarshal(child)])
            else:
                setattr(rc, key, unmarshal(child))
    else:
        rc = "".join([e.data for e in element.childNodes if isinstance(e, minidom.Text)])
        if str(element.tagName) in _intFields:
            rc = int(rc)
            if DEBUG: print '%s : %s' % (element.tagName,rc)
        elif str(element.tagName) in _floatFields:
            rc = float(rc)
            if DEBUG: print '%s : %s' % (element.tagName,rc)
        elif str(element.tagName) in _dateFields:
            year, month, day, hour, minute, second = re.search(r'(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})', rc).groups()
            rc = (int(year), int(month), int(day), int(hour), int(minute), int(second), 0, 0, 0)
            if DEBUG: print '%s : %s' % (element.tagName,rc)
    return rc

def _do(url, http_proxy):
    proxies = getProxies(http_proxy)
    u = urllib.FancyURLopener(proxies)
    usock = u.open(url)
    rawdata = usock.read()
    if DEBUG: print rawdata
    xmldoc = minidom.parseString(rawdata)
    usock.close()
    data = unmarshal(xmldoc)
#    if hasattr(data, 'ErrorMsg'):
    if 0:
        raise TechnoratiError, data
    else:
        return data

def _buildextendedFindNearby(lat,lng):
    searchUrl = "http://ws.geonames.org/extendedFindNearby?lat=%(lat)s&lng=%(lng)s&username=amitb" % vars()
    return searchUrl

def extendedFindNearby(lat,lng, http_proxy=None):
    """
   
    """
    url = _buildextendedFindNearby(lat,lng)
    if DEBUG: print url
    return _do(url,http_proxy).geonames

def main():
    usage = "usage: %prog 'latitude' 'longitude' 'fname'"
    parser = OptionParser(usage, version="%prog 0.1")
    (options, args) = parser.parse_args()
    if len(args) != 3:
        parser.error("\nplease enter the latitude and longitude of the point you want to look up and the file to write to")
    lat, lng, fname = args
    print 'latitude:%s, longitude:%s, fname:%s' % (lat, lng,fname)
    f=open(fname,"a")
    place = extendedFindNearby(lat, lng)
    f.write('%s\t%s\n'%(lat,lng))
    for b in place.geoname:
        #print '%s\t%s' % (b.name, b.fcode)
        f.write('%s\t%s\n'%(b.name.encode('ascii', 'ignore'),b.fcode.encode('ascii', 'ignore')))
    f.write('##\n')
    f.close()
if __name__ == '__main__':
    sys.exit(main())
