# -*- coding: utf-8 -*-
# Data preparation for the hello_world example
from __future__ import print_function

from sqlalchemy import create_engine
from cubes.tutorial.sql import create_table_from_csv

# 1. Prepare SQL data in memory

FACT_TABLE = "airquality"

print("preparing data...")

engine = create_engine('sqlite:///data.sqlite')

create_table_from_csv(engine,
                      "data.csv",
                      table_name=FACT_TABLE,
                      fields=[
                            ("state_code", "integer"),
                            ("county_code", "integer"),
                            ("site_num", "integer"),
                            ("parameter_code", "integer"),
                            ("poc", "integer"),
                            ("datum", "string"),
                            ("parameter_name", "string"),
                            ("sample_duration", "string"),
                            ("pollutant_standard", "string"),
                            ("metric_used", "string"),
                            ("method_name", "string"),
                            ("year", "integer"),
                            ("measure_unit", "string"),
                            ("event_type", "string"),
                            ("observation_count", "integer"),
                            ("observation_percent1", "integer"),
                            ("valid_day_count", "integer"),
                            ("required_day_count", "integer"),
                            ("exceptional_data_count", "integer"),
                            ("null_data_count", "integer"),
                            ("primary_exceedence_count", "integer"),
                            ("secondary_exceedence_count", "integer"),
                            ("certification_indicator", "string"),
                            ("num_obs_below_mdl", "integer"),
                            ("arithmetic_mean", "float"),
                            ("arithmetic_stdev", "float"),
                            ("max1", "float"),
                            ("max1_datetime", "text"),
                            ("max2", "float"),
                            ("max2_datetime", "text"),
                            ("max3", "float"),
                            ("max3_datetime", "text"),
                            ("max4", "float"),
                            ("max4_datetime", "text"),
                            ("percentile_99", "float"),
                            ("percentile_98", "float"),
                            ("percentile_95", "float"),
                            ("percentile_90", "float"),
                            ("percentile_75", "float"),
                            ("percentile_50", "float"),
                            ("percentile_10", "float"),
                            ("local_site", "string"),
                            ("state", "string"),
                            ("county_name", "string"),
                            ("city", "string"),
                            ("cbsa_name", "string"),
                            ("date_of_last_change", "text"),
                            ("subarea", "string")],
                      create_id=True
                  )

print("done. file data.sqlite created")
