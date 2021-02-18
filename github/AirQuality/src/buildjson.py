import json
import urllib
from pprint import pprint
url="http://cube.geekological.com/cube/airquality/aggregate?drilldown=year|parameter"
response = urllib.urlopen(url)
data = json.loads(response.read())
p_set=["Nitric oxide (NO)","Nitrogen dioxide (NO2)","Oxides of nitrogen (NOx)","Ozone","1,1,2,2-Tetrachloroethane","1,1,2-Trichloro-1,2,2-trifluoroethane","1,1,2-Trichloroethane","1,1-Dichloroethane","1,3-Butadiene","Ammonium Sulfate PM2.5 LC","Aluminum PM2.5 LC","Cadmium PM2.5 LC","Copper PM2.5 LC","EC2 PM2.5 LC","Lead PM2.5 LC","Indium PM2.5 LC","Sulfur dioxide","Phosphorus PM2.5 LC","Selenium PM2.5 LC","Titanium PM2.5 LC","Silicon PM2.5 LC","Zinc PM2.5 LC","Zirconium PM2.5 LC","Black Carbon PM2.5 LC","Carbon disulfide","Carbon tetrachloride","Antimony PM10 STP","Carbon monoxide","Arsenic PM10 STP","Beryllium PM10 STP","Cobalt PM10 STP","Lead PM10 STP","Manganese PM10 STP","Nickel PM10 STP","Selenium PM10 STP"]

print p_set
with open('data.json') as data_file:    
    # data = json.load(data_file)
    pprint(data)
    cells=data["cells"]
    # print len(cells)
    parameters={}
    output = []
    i=0
    for cell in cells:
        i+=1
        print i
        if cell["parameter"] not in parameters:
            parameters[cell["parameter"]]=[]
        parameters[cell["parameter"]].append((cell["year"],cell["average_mean"]))

for key in parameters.keys():
    print key
    articles=[]
    total=0
    for e in parameters[key]:
        articles.append([e[0],e[1]])
        total+=e[1]
    name=key
    temp={}
    temp["articles"]=articles
    temp["total"]=total
    temp["name"]=name
    if key in p_set:
        output.append(temp)

with open('output.json', 'w') as outfile:
    json.dump(output, outfile)
pprint(output)
