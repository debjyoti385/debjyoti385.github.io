function calcAqi(avg_mean, parameter){
	round_off(avg_mean)
	
	o3Aqi = o3Aqi(avg_mean, parameter);
	so2Aqi = so2Aqi(avg_mean, parameter);
	no2Aqi=no2Aqi(avg_mean, parameter);
	coAqi = coAqi(avg_mean, parameter);
	pm25Aqi = pm25Aqi(avg_mean, parameter);
	pm10Aqi = pm10Aqi(avg_mean, parameter);
	return max(pm25Aqi,pm10Aqi,coAqi,no2Aqi,so2Aqi,o3Aqi);
	
}
function o3Aqi(avg_mean){
	
	if(0.0<avg_mean<0.064){
		Ihi =50
		Ilo=0
		BPhi = 0.064
		BPlo = 0.0
			
	}else if(0.065<avg_mean<0.084){
		Ihi =100
		Ilo=51
		BPhi = 0.084
		BPlo = 0.065
		
	}else if(0.085<avg_mean<0.104){
		Ihi =150
		Ilo=101
		BPhi = 0.104
		BPlo = 0.085
		
	}else if(0.105<avg_mean<0.124){
		Ihi = 200
		Ilo=151
		BPhi = 0.124
		BPlo = 0.105
		
	}else if(0.125<avg_mean<0.374){
		Ihi =0.374
		Ilo=0.125
		BPhi = 300
		BPlo = 201
		
	}else{
		return 500
	}
	
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo
}

function pm10Aqi(avg_mean){

	if(0<avg_mean<54){
		Ihi =500
		Ilo=0
		BPhi = 54
		BPlo = 0
			
	}else if(55<avg_mean<154){
		Ihi =100
		Ilo=51
		BPhi = 154
		BPlo = 55
		
	}else if(155<avg_mean<254){
		Ihi =150
		Ilo=101
		BPhi = 254
		BPlo = 155
		
	}else if(255<avg_mean<354){
		Ihi = 200
		Ilo=151
		BPhi = 354
		BPlo = 255
		
	}else if(355<avg_mean<424){
		Ihi =0.374
		Ilo=0.125
		BPhi = 424
		BPlo = 355
		
	}else if(425<avg_mean<504){
		Ihi =0.374
		Ilo=0.125
		BPhi = 504
		BPlo = 425
	
	}else if(505<avg_mean<604){
		Ihi =0.374
		Ilo=0.125
		BPhi = 604
		BPlo = 505
	}
	
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo
}

function pm25Aqi(avg_mean){
	if(0.0<avg_mean<15.4){
		Ihi =50
		Ilo=0
		BPhi = 15.4
		BPlo = 0.0
			
	}else if(15.5<avg_mean<40.4){
		Ihi =100
		Ilo=51
		BPhi = 40.4
		BPlo = 15.5
		
	}else if(40.5<avg_mean<65.4){
		Ihi =150
		Ilo=101
		BPhi = 65.4
		BPlo = 40.5
		
	}else if(65.5<avg_mean<150.4){
		Ihi = 200
		Ilo=151
		BPhi = 150.4
		BPlo = 65.5
		
	}else if(150.5<avg_mean<250.4){
		Ihi =0.374
		Ilo=0.125
		BPhi = 250.4
		BPlo = 150.5
		
	}else if(250.5<avg_mean<350.4){
		Ihi =0.374
		Ilo=0.125
		BPhi = 350.4
		BPlo = 250.5
		
	}else if(350.5<avg_mean<500.4){
		Ihi =0.374
		Ilo=0.125
		BPhi = 350.5
		BPlo = 500.4
	}	
	
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo
}

function coAqi(avg_mean){
	if(0.0<avg_mean<4.4){
		Ihi =50
		Ilo=0
		BPhi = 4.4
		BPlo = 0.0
			
	}else if(4.5<avg_mean<9.4){
		Ihi =100
		Ilo=51
		BPhi = 9.4
		BPlo = 4.5
		
	}else if(9.5<avg_mean<12.4){
		Ihi =150
		Ilo=101
		BPhi = 12.4
		BPlo = 9.5
		
	}else if(12.5<avg_mean<15.4){
		Ihi = 200
		Ilo=151
		BPhi = 15.4
		BPlo = 12.5
		
	}else if(15.5<avg_mean<30.4){
		Ihi =0.374
		Ilo=0.125
		BPhi = 30.4
		BPlo = 15.5
		
	}else if(30.5<avg_mean<40.4){
		Ihi =0.374
		Ilo=0.125
		BPhi = 40.4
		BPlo = 30.5
	}else if(40.5<avg_mean<50.4){
		Ihi =0.374
		Ilo=0.125
		BPhi = 50.4
		BPlo = 40.5
		
	}
	
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo
}
function so2Aqi(avg_mean){

	if(0.0<avg_mean<0.034){
		Ihi =50
		Ilo=0
		BPhi = 0.034
		BPlo = 0.0
			
	}else if(0.035<avg_mean<0.144){
		Ihi =100
		Ilo=51
		BPhi = 0.144
		BPlo = 0.035
		
	}else if(0.145<avg_mean<0.224){
		Ihi =150
		Ilo=101
		BPhi = 0.224
		BPlo = 0.145
		
	}else if(0.225<avg_mean<0.304){
		Ihi = 200
		Ilo=151
		BPhi = 0.304
		BPlo = 0.225
		
	}else if(0.305<avg_mean<0.604){
		Ihi =300
		Ilo=201
		BPhi = 0.604
		BPlo = 0.305
		
	}else if(0.605<avg_mean<0.804){
		Ihi =400
		Ilo=301
		BPhi = 0.804
		BPlo = 0.605
	}else if(0.805<avg_mean<0.1004){
		Ihi =500
		Ilo=401
		BPhi = 0.1004
		BPlo = 0.805
		
	}
	
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo
}
function no2Aqi(avg_mean){

	if(0.65<avg_mean<0.124){
		Ihi =300
		Ilo=201
		BPhi = 0.124
		BPlo = 0.65
			
	}else if(1.25<avg_mean<1.64){
		Ihi =400
		Ilo=301
		BPhi = 1.64
		BPlo = 0.65
		
	}else if(1.65<avg_mean<2.04){
		Ihi =500
		Ilo=401
		BPhi = 2.04
		BPlo = 1.65
		
	}
	return AQI = (Ihi-Ilo)*(avg_mean-BPlo)/(BPhi-BPlo)+Ilo
}
