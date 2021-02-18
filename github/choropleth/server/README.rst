AirQuality
==============================

Files
-----

This directory contains following files:

    * model.json      - logical model
    * slicer.ini      - server configuration file
    * data.csv        - source data
    * prepare_data.py - script for preparing the data: load them into database
                        and create a view
    * aggregate.py    - example aggregations
    * requirements.sh - Install all the pip requirements 
Quick start
-----------

Prepare data::

    python2.7 prepare_data.py

Get some aggregations::

    python2.7 aggregate.py

AirQuality Server!
-------------

Run the server::

    slicer serve slicer.ini
    
Try the server. Aggregate::

  curl "http://localhost:5000/cube/airquality/aggregate"
    
Aggregate by year::

  curl "http://localhost:5000/cube/airquality/aggregate?drilldown=year"

Aggregate by category (top level for dimension item)::

  curl "http://localhost:5000/cube/airquality/aggregate?drilldown=item" 

Aggregate by subcategory for item category 'e'::

  curl "http://localhost:5000/cube/airquality/aggregate?drilldown=city&cut=parameter:Ozone"

Note the implicit hierarchy of the `parameter` dimension.

See also the Slicer server documentation for more types of requests:
http://packages.python.org/cubes/server.html

Credits
-------



