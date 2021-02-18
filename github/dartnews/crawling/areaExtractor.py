import sys
from sets import Set
if len(sys.argv)!=3:
	print 'Provide <newsSummaryFile> <outputFile> arguments'
	sys.exit(1)

newsSummaryFile=open(sys.argv[1],"r")
out=open(sys.argv[2],"w")
delhi_areas = Set(['Hauz Khaz','Malviya Nagar','Saket','Pushp Vihar','Mehrauli','Defence Colony','Gul Mohar Park','AIIMS','Lodhi Colony','Pragati Vihar','Khanpur','Lajpat Nagar','Amar Colony','Garthi','Okhla','Sunlight Colony','New Friends Colony','Sukhdev Vihar','Bharat Nagar','Hz. Nizammudin','Jangpura','Sarai Kale Khan','Greater Kailash','Chitranjan Park','Ambedkar Nagar','Madangir','Sainik Farm','Kalkaji','Nehru Place','Badarpur','Sarita Vihar','Sangam Vihar','East Kidwai Nagar','Panchasheel','Kalyanpuri','New Ashok Nagar','Trilokpuri','27-Blk Trilokpuri','Mayur Vihar I,Mayur Vihar II','Mandawali Fazad','Vivek Vihar','Laxmi Nagar','Patpargang','Gazipur','Anaz Mundi','Anand Vihar','New Shahdara Karkardooma','Preet Vihar','Shakarpur','Gandhi Nagar','Krishna Nagar','Old Sheelampur','Gita Colony','Jheel','Patel Nagar','Anand Parbat','Moti Nagar','Tilak Nagar','Khayala','Janakpuri','Uttam Nagar','Matiyala','Punjabi Bagh','Vikas Puri','Meera Bagh','Madipur','Paschim Vihar','Miawali Nagar','Mangolpuri','Tikri Border','Raja Garden','Rajouri Garden','Mansarover Garden','MIG Flats Hari Nagar','Kirti Nagar','Raghubir Nagar','Nangloi','Civil Lines','Bela Road','Majnu Ka Tila','Sant Ngar','Roop Nagar','Maurice Nagar','Shakti Nagar','Subzi mandi','Tis Hazari','Rana Pratap Bagh','Andha Mugal','Gulabi Bagh','Sarai Rohilla','Inder Lok','Sadar Bazar','Ahata Kedara','Bara Hindu Rao','Kashmere Gate','Kotwali','Mori Gate','Red Fort','Yamuna Bazar','Lahori Gate','Church Mission','Town Hall','Nai Sarak','Chandni Chowk','Sultanpuri','Mangolpuri','Narela','Kanjhawala','Ashok Vihar','Wazirpur','Saraswati Vihar','Pitampura','Rani Bagh','Prashant Vihar','Jahangirpuri','Adarsh Nagar','Bawana','Alipur','Auchandi Border','Sameypur-Bodli','Mukherjee Nagar','Azadpur','Model Town','Sangam Park','Vijay Nagar','Keshav Puram','Shalimar Bagh','Rohini','Kingsway Camp','Seelampur,Gokul Puri','Khazuri Khas','Karawal Nagar','Bhajan Pura','Yamuna Vihar Gamri','Shahdra','Welcome Colony','Mansarover Park','Seema Puri','G.T.B. Nagar','Nand Nagri','Ashok Nagar','Sunder Nagri','Harsh Vihar','Darya Ganj','Chandini Mahal','Turkman Gate','Jama Masjid','Kamla Market','Shahganj','Hauz Quazi','Balli maran','Lal kaun','I.P. Estate','LNJP Hospital','Pahar Ganj','DBG Road','Shidipura','Govt. Qtr. Dev Nagar','Karol Bagh,Prasad Nagar','Rajender Nagar','Pusa Road','Sita Ram Bazar','Sangtrashan','Nabi Karim','Parliament Street,Chanakya Puri,Connaught Place,Boat Club,North Avenue','South Avenue','Malcha Marg','R.M.L Hospital','Sucheeta Kriplani Hospital','Panckuian Road','Gole Market,Tuglak Road,Mandi House,Bapa Nagar','Rabindra Nagar','Kaka Nagar','Vasant Vihar,Vasant Kunj','Nanak Pura','Vinay Nagar','R.K. Puram','Delhi Cantt','Dhaula Kuan','Palam Colony','Palam Village','Dabri','Raghu Nagar,Naraina','Inderpuri','Mayapuri','Najaf garh','Kapashera','Jaffer pur','Samalakha','West Kidwai Nagar','Yamuna Vihar', 'Vinod Nagar depot', 'INA', 'Dhaula Kuan', 'Mukundpur depot', 'Kalkaji', 'RK Puram', 'Palam','Faridabad','Jahangirpuri', 'Subhash Nagar', 'Botanical Garden','Kashmere Gate','Rithala', 'Jahangirpuri','Indraprastha', 'Dwarka', 'Subhash Nagar', 'Mundka', 'Chhattarpur', 'Sarita Vihar','Sushant Lok', 'Park Street','IGI','Janpath', 'ITO', 'Jama Masjid','Red Fort','Badapur'])

for newsSummary in newsSummaryFile:
	sp=newsSummary.split("\x01")
	present=""
	for area in delhi_areas:
		if area in sp[1] or area in sp[2]:
			present+=area+","
	if present=="":
		present="delhi"
	out.write(present+"|"+newsSummary.replace("\x01","|"))
out.close()
