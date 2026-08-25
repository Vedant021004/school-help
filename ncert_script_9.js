
										 
										 
										 
function change()
{

document.test.tsubject.options[0].text="..Select Subject......";
		document.test.tsubject.options[1].text="";
		document.test.tsubject.options[2].text="";
		 document.test.tsubject.options[3].text="";
		 document.test.tsubject.options[4].text="";
		  document.test.tsubject.options[5].text="";
		  document.test.tsubject.options[6].text="";
		  document.test.tsubject.options[7].text="";
		  document.test.tsubject.options[8].text="";
		  document.test.tsubject.options[9].text="";	
		  document.test.tsubject.options[10].text="";
		 document.test.tsubject.options[11].text="";
		  document.test.tsubject.options[12].text="";
		 document.test.tsubject.options[13].text="";
		 document.test.tsubject.options[14].text="";
		  document.test.tsubject.options[15].text="";
		  document.test.tsubject.options[16].text="";
		  document.test.tsubject.options[17].text="";
       	  	document.test.tsubject.options[18].text="";
		  document.test.tsubject.options[19].text="";
		  document.test.tsubject.options[20].text="";
		  document.test.tsubject.options[21].text="";
		  document.test.tsubject.options[22].text="";
		 document.test.tsubject.options[23].text="";
		document.test.tsubject.options[24].text="";
		 document.test.tsubject.options[25].text="";
		 document.test.tsubject.options[26].text="";
		document.test.tsubject.options[27].text="";
		  document.test.tsubject.options[28].text="";



		 
		
		
		
		
		
	//this function check the classthat you have selected
	
	if (document.test.tclass.value==-1)
	{
		document.test.tsubject.options[0].text=".....Select Subject.....";
		document.test.tsubject.options[1].text="";
		document.test.tsubject.options[2].text="";
		
	}
	else if (document.test.tclass.value==1)// this condition checks which class u have select and you can add subject according to class 1
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="English";
		document.test.tsubject.options[2].text="Mathematics";
		document.test.tsubject.options[3].text="Hindi";
		document.test.tsubject.options[4].text="Urdu";
		//document.test.tsubject.options[5].text="";
		
	}
		
	
	else if (document.test.tclass.value==2)// this condition checks which class u have select and you can add subject according to class 2
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="Mathematics";
		document.test.tsubject.options[2].text="Hindi";
		document.test.tsubject.options[3].text="English";
		document.test.tsubject.options[4].text="Urdu";
	
	}	
else if (document.test.tclass.value==3)// this condition checks which class u have select and you can add subject according to class 3
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		
		
		/*document.test.tsubject.options[1].text="Mathematics";
		document.test.tsubject.options[2].text="Hindi";
		document.test.tsubject.options[3].text="English"
		document.test.tsubject.options[4].text="Environmental Studies"
		document.test.tsubject.options[5].text="Urdu"
		*/
		document.test.tsubject.options[1].text="Mathematics";
		document.test.tsubject.options[2].text="English"
		document.test.tsubject.options[3].text="Hindi";
		document.test.tsubject.options[4].text="The World Around Us";
		document.test.tsubject.options[5].text="Arts";
		document.test.tsubject.options[6].text="Physical Education and Well Being";
		document.test.tsubject.options[7].text="Urdu";

	
	}	
	else if (document.test.tclass.value==4)// this condition checks which class u have select and you can add subject according to class 4
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="Mathematics";
		document.test.tsubject.options[2].text="Hindi";
		document.test.tsubject.options[3].text="English";
		document.test.tsubject.options[4].text="The World Around Us";
		document.test.tsubject.options[5].text="Arts";
		document.test.tsubject.options[6].text="Physical Education and Well Being";
		document.test.tsubject.options[7].text="Urdu";

	
	}
			else if (document.test.tclass.value==5)// this condition checks which class u have select and you can add subject according to class 5
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="Mathematics";
		document.test.tsubject.options[2].text="Hindi";
		document.test.tsubject.options[3].text="English";
		document.test.tsubject.options[4].text="The World Around Us";
		document.test.tsubject.options[5].text="Arts";
		document.test.tsubject.options[6].text="Physical Education and Well Being";
		document.test.tsubject.options[7].text="Urdu";
		
	}	
	else if (document.test.tclass.value==6)// this condition checks which class u have select and you can add subject according to class  6
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="Hindi";
		document.test.tsubject.options[2].text="English";
		document.test.tsubject.options[3].text="Mathematics";
		document.test.tsubject.options[4].text="Social Science";
		document.test.tsubject.options[5].text="Sanskrit";
		document.test.tsubject.options[6].text="Science";
		document.test.tsubject.options[7].text="Arts";
		document.test.tsubject.options[8].text="Physical Education and Well Being";
		document.test.tsubject.options[9].text="Vocational Education";
		document.test.tsubject.options[10].text="Urdu";
		/*document.test.tsubject.options[11].text="Punjabi";
		document.test.tsubject.options[12].text="Santhali";
		document.test.tsubject.options[13].text="Tamil";
		document.test.tsubject.options[14].text="Kannada";
		document.test.tsubject.options[15].text="Nepali";
		document.test.tsubject.options[16].text="Malayalam";
		document.test.tsubject.options[17].text="Marathi";*/
		
		//document.test.tsubject.options[9].text="";
		
	}	
	
else if (document.test.tclass.value==7)// this condition checks which class u have select and you can add subject according to class 7 
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="Hindi";
		document.test.tsubject.options[2].text="English";
		document.test.tsubject.options[3].text="Mathematics";
		document.test.tsubject.options[4].text="Social Science";
		document.test.tsubject.options[5].text="Sanskrit";
		document.test.tsubject.options[6].text="Science";
		document.test.tsubject.options[7].text="Arts";
		document.test.tsubject.options[8].text="Physical Education and Well Being";
		document.test.tsubject.options[9].text="Vocational Education";
		document.test.tsubject.options[10].text="Urdu";
		
		
	}	
else if (document.test.tclass.value==8)// this condition checks which class u have select and you can add subject according to class 8  
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="Hindi";
		document.test.tsubject.options[2].text="English";
		document.test.tsubject.options[3].text="Mathematics";
		document.test.tsubject.options[4].text="Social Science";
		document.test.tsubject.options[5].text="Sanskrit";
		document.test.tsubject.options[6].text="Science";
		document.test.tsubject.options[7].text="Arts";
		document.test.tsubject.options[8].text="Physical Education and Well Being";
		document.test.tsubject.options[9].text="Vocational Education";
		document.test.tsubject.options[10].text="Urdu";
		
	}	
	else if (document.test.tclass.value==9)// this condition checks which class u have select and you can add subject according to class 9 
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="English";
		document.test.tsubject.options[2].text="Hindi";
		document.test.tsubject.options[3].text="Sanskrit";
		document.test.tsubject.options[4].text="Mathematics";
		document.test.tsubject.options[5].text="Science";
		document.test.tsubject.options[6].text="Social Science";	
		document.test.tsubject.options[7].text="Arts";	
		document.test.tsubject.options[8].text="Urdu";
		document.test.tsubject.options[9].text="Physical Education and Well Being";
		document.test.tsubject.options[10].text="ICT";
		document.test.tsubject.options[11].text="Skill Education";
		//document.test.tsubject.options[8].text="Environmental Education";		
		//document.test.tsubject.options[9].text="";
		
	}	
	else if (document.test.tclass.value==10)// this condition checks which class u have select and you can add subject according to class 10
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="Mathematics";
		document.test.tsubject.options[2].text="Science";
		document.test.tsubject.options[3].text="Hindi";
		document.test.tsubject.options[4].text="Social Science";
		document.test.tsubject.options[5].text="English";
		document.test.tsubject.options[6].text="Sanskrit";
		document.test.tsubject.options[7].text="Urdu";
		document.test.tsubject.options[8].text="Health and Physical Education";
		//document.test.tsubject.options[8].text="Environmental Education";
		
	}	
		

	else if (document.test.tclass.value==11)// this condition checks which class u have select and you can add subject according to class 11
	{
		/*document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="Sanskrit";
		document.test.tsubject.options[2].text="Accountancy";
		document.test.tsubject.options[3].text="Chemistry";
		document.test.tsubject.options[4].text="Mathematics";
		document.test.tsubject.options[5].text="Statistics";
		document.test.tsubject.options[6].text="Biology";
		document.test.tsubject.options[7].text="Psychology";
		document.test.tsubject.options[8].text="Geography";
		document.test.tsubject.options[9].text="Physics";	
		document.test.tsubject.options[10].text="Hindi";
		document.test.tsubject.options[11].text="Sociology";
		document.test.tsubject.options[12].text="English";
		document.test.tsubject.options[13].text="Political Science";
		document.test.tsubject.options[14].text="History";
		document.test.tsubject.options[15].text="Economics";
		document.test.tsubject.options[16].text="Business Studies";
		document.test.tsubject.options[17].text="Urdu";
       	//document.test.tsubject.options[18].text="Heritage Crafts";	
		document.test.tsubject.options[18].text="Graphics design";
		document.test.tsubject.options[19].text="Computers and Communication Technology";
		document.test.tsubject.options[20].text="Home Science";
		document.test.tsubject.options[21].text="Creative Writing and Translation";
		document.test.tsubject.options[22].text="Fine Art";
		//document.test.tsubject.options[24].text="Computer Science";
		document.test.tsubject.options[23].text="Informatics Practices";
		document.test.tsubject.options[24].text="Computer Science";*/


		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="Sanskrit";
		document.test.tsubject.options[2].text="Accountancy";
		document.test.tsubject.options[3].text="Chemistry";
		document.test.tsubject.options[4].text="Mathematics";
		//document.test.tsubject.options[5].text="Statistics";
		document.test.tsubject.options[5].text="Biology";
		document.test.tsubject.options[6].text="Psychology";
		document.test.tsubject.options[7].text="Geography";
		document.test.tsubject.options[8].text="Physics";	
		document.test.tsubject.options[9].text="Hindi";
		document.test.tsubject.options[10].text="Sociology";
		document.test.tsubject.options[11].text="English";
		document.test.tsubject.options[12].text="Political Science";
		document.test.tsubject.options[13].text="History";
		document.test.tsubject.options[14].text="Economics";
		document.test.tsubject.options[15].text="Business Studies";
		document.test.tsubject.options[16].text="Urdu";
       	//document.test.tsubject.options[26].text="Heritage Crafts";
		//document.test.tsubject.options[17].text="Graphics design";
		//document.test.tsubject.options[27].text="Computers and Communication Technology";
		document.test.tsubject.options[17].text="Home Science";
		document.test.tsubject.options[18].text="Creative Writing and Translation";
		document.test.tsubject.options[19].text="Fine Art";
		document.test.tsubject.options[20].text="Informatics Practices";
		document.test.tsubject.options[21].text="Computer Science";
		document.test.tsubject.options[22].text="Health and Physical Education";
		document.test.tsubject.options[23].text="Biotechnology";
		document.test.tsubject.options[24].text="Sangeet";
		document.test.tsubject.options[25].text="Knowledge Traditions Practices of India";
	}
	else if (document.test.tclass.value==12)// this condition checks which class u have select and you can add subject according to class 12
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="Mathematics";
		document.test.tsubject.options[2].text="Physics";
		document.test.tsubject.options[3].text="Accountancy"
		document.test.tsubject.options[4].text="Sanskrit"
		document.test.tsubject.options[5].text="Hindi"
		document.test.tsubject.options[6].text="English"
		document.test.tsubject.options[7].text="Biology"
		document.test.tsubject.options[8].text="History"
		document.test.tsubject.options[9].text="Geography"
		document.test.tsubject.options[10].text="Psychology"
		document.test.tsubject.options[11].text="Sociology"
		document.test.tsubject.options[12].text="Chemistry";
		document.test.tsubject.options[13].text="Political Science";
		document.test.tsubject.options[14].text="Economics";
		document.test.tsubject.options[15].text="Business Studies";
		//document.test.tsubject.options[16].text="Heritage Crafts";
		//document.test.tsubject.options[16].text="New Age Graphics Design";
		document.test.tsubject.options[16].text="Home Science";
		document.test.tsubject.options[17].text="Urdu";
		document.test.tsubject.options[18].text="Creative Writing & Translation";
		document.test.tsubject.options[19].text="Fine Art";
		document.test.tsubject.options[20].text="Computer Science";	
		document.test.tsubject.options[21].text="Informatics Practices";
		document.test.tsubject.options[22].text="Biotechnology";
		document.test.tsubject.options[23].text="Sangeet";
		
	}
	else if (document.test.tclass.value==13)// this condition checks which class u have select and you can add subject according to class 11 & 12
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		document.test.tsubject.options[1].text="Hindi";	
		document.test.tsubject.options[2].text="Sanskrit";	
		//document.test.tsubject.options[3].text="Heritage Crafts";
		document.test.tsubject.options[3].text="Urdu";
		
	}
	else if (document.test.tclass.value==14)// this condition checks which class u have select and you can add subject according to class 
	{
		document.test.tsubject.options[0].text="..Select Subject..";
		//document.test.tsubject.options[1].text="Vocational";	
		
	}	
}
function change1(sind)
{ 

	// this function checks which class and subject u have selected
	// and set the value of book accordingly and the name of file that will be open after button clicked
	    
   { 

document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="";				
		document.test.tbook.options[2].text="";				
		document.test.tbook.options[3].text="";
		document.test.tbook.options[4].text="";				
		document.test.tbook.options[5].text="";				
		document.test.tbook.options[6].text="";
		document.test.tbook.options[7].text="";				
		document.test.tbook.options[8].text="";				
		document.test.tbook.options[9].text="";
		document.test.tbook.options[10].text="";				
		document.test.tbook.options[11].text="";	
		document.test.tbook.options[12].text="";
		document.test.tbook.options[13].text="";
		document.test.tbook.options[14].text="";
		
		

	// this function checks which class and subject u have selected
	// and set the value of book accordingly and the name of file that will be open after button clicked
	    
   if((document.test.tclass.value==1) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		//document.test.tbook.options[1].text="Marigold";
		document.test.tbook.options[1].text="Mridang";
		document.test.tbook.options[1].value="textbook.php?aemr1=0-9"
		//document.test.tbook.options[1].value="textbook.php?aeen1=0-10"	
        //document.test.tbook.options[2].text="Raindrops";
		//document.test.tbook.options[2].value="textbook.php?aerd1=0-19"			
		
					
	}
	else if((document.test.tclass.value==1) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Joyful-Mathematics (English)";
		document.test.tbook.options[1].value="textbook.php?aejm1=0-13"		
		document.test.tbook.options[2].text="Joyful-Mathematics (Hindi)";
		document.test.tbook.options[2].value="textbook.php?ahjm1=0-13"
		document.test.tbook.options[3].text="Joyful-Mathematics (Marathi)";
		document.test.tbook.options[3].value="textbook.php?amrjm1=0-13"
		document.test.tbook.options[4].text="Joyful-Mathematics (Sindhi)";
		document.test.tbook.options[4].value="textbook.php?asijm1=0-13"
		document.test.tbook.options[5].text="Joyful-Mathematics (Punjabi)";
		document.test.tbook.options[5].value="textbook.php?apjm1=0-13"
		document.test.tbook.options[6].text="Joyful-Mathematics (Gujarati)";
		document.test.tbook.options[6].value="textbook.php?agjm1=0-13"
		document.test.tbook.options[7].text="Joyful-Mathematics (Malayalam)";
		document.test.tbook.options[7].value="textbook.php?ayjm1=0-13"
		document.test.tbook.options[8].text="Joyful-Mathematics (Konkani)";
		document.test.tbook.options[8].value="textbook.php?akjm1=0-13"
		document.test.tbook.options[9].text="Joyful-Mathematics (Assamese)";
		document.test.tbook.options[9].value="textbook.php?aajm1=0-13"
		document.test.tbook.options[10].text="Joyful-Mathematics (Maithili)";
		document.test.tbook.options[10].value="textbook.php?aijm1=0-13"
		document.test.tbook.options[11].text="Joyful-Mathematics (Bodo)";
		document.test.tbook.options[11].value="textbook.php?aojm1=0-13"
		document.test.tbook.options[12].text="Joyful-Mathematics (Sanskrit)";
		document.test.tbook.options[12].value="textbook.php?askjm1=0-13"
		document.test.tbook.options[13].text="Joyful-Mathematics (Oriya)";
		document.test.tbook.options[13].value="textbook.php?aorjm1=0-13"
		document.test.tbook.options[14].text="Joyful-Mathematics (Bengali)";
		document.test.tbook.options[14].value="textbook.php?abnjm1=0-13"
		document.test.tbook.options[15].text="Joyful-Mathematics (Santhali)";
		document.test.tbook.options[15].value="textbook.php?asnjm1=0-13"
		document.test.tbook.options[16].text="Joyful-Mathematics (Manipuri)";
		document.test.tbook.options[16].value="textbook.php?amnjm1=0-13"
		document.test.tbook.options[17].text="Joyful-Mathematics (Urdu)";
		document.test.tbook.options[17].value="textbook.php?aujm1=0-13"
		document.test.tbook.options[18].text="Joyful-Mathematics (Nepali)";
		document.test.tbook.options[18].value="textbook.php?anpjm1=0-13"
		document.test.tbook.options[19].text="Joyful-Mathematics (Telugu)";
		document.test.tbook.options[19].value="textbook.php?atljm1=0-13"
		document.test.tbook.options[20].text="Joyful-Mathematics (Kannada)";
		document.test.tbook.options[20].value="textbook.php?aknjm1=0-13"
		document.test.tbook.options[21].text="Joyful-Mathematics (Tamil)";
		document.test.tbook.options[21].value="textbook.php?atmjm1=0-13"
		document.test.tbook.options[22].text="Joyful-Mathematics (Dogri)";
		document.test.tbook.options[22].value="textbook.php?adgjm1=0-13"
		document.test.tbook.options[23].text="Joyful-Mathematics (Kashmiri)";
		document.test.tbook.options[23].value="textbook.php?aksjm1=0-13"

		//document.test.tbook.options[3].text="Riyazi Ka Jadoo-I(Urdu)";
		//document.test.tbook.options[3].value="textbook.php?auri1=0-13"		
		
					
	}
	else if((document.test.tclass.value==1) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Sarangi";
		document.test.tbook.options[1].value="textbook.php?ahsr1=0-19"		
		
	}
	else if((document.test.tclass.value==1) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Shahnai";
		document.test.tbook.options[1].value="textbook.php?aush1=0-18"
		
	}

	

	else if((document.test.tclass.value==2) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Joyful-Mathematics (English)";
		document.test.tbook.options[1].value="textbook.php?bejm1=0-11"
		document.test.tbook.options[2].text="Joyful-Mathematics (Hindi)";
		document.test.tbook.options[2].value="textbook.php?bhjm1=0-11"
		document.test.tbook.options[3].text="Joyful-Mathematics (Assamese)";
		document.test.tbook.options[3].value="textbook.php?basjm1=0-11"
		document.test.tbook.options[4].text="Joyful-Mathematics (Punjabi)";
		document.test.tbook.options[4].value="textbook.php?bpnjm1=0-11"
		document.test.tbook.options[5].text="Joyful-Mathematics (Gujarati)";
		document.test.tbook.options[5].value="textbook.php?bgjjm1=0-11"
		document.test.tbook.options[6].text="Joyful-Mathematics (Malayalam)";
		document.test.tbook.options[6].value="textbook.php?bmljm1=0-11"
		document.test.tbook.options[7].text="Joyful-Mathematics (Maithli)";
		document.test.tbook.options[7].value="textbook.php?bmtjm1=0-11"
		document.test.tbook.options[8].text="Joyful-Mathematics (Bodo)";
		document.test.tbook.options[8].value="textbook.php?bbdjm1=0-11"
		document.test.tbook.options[9].text="Joyful-Mathematics (Marathi)";
		document.test.tbook.options[9].value="textbook.php?bmrjm1=0-11"
		document.test.tbook.options[10].text="Joyful-Mathematics (Sindhi)";
		document.test.tbook.options[10].value="textbook.php?bsijm1=0-11"
		document.test.tbook.options[11].text="Joyful-Mathematics (Bengali)";
		document.test.tbook.options[11].value="textbook.php?bbnjm1=0-11"
		document.test.tbook.options[12].text="Joyful-Mathematics (Sanskrit)";
		document.test.tbook.options[12].value="textbook.php?bskjm1=0-11"
		document.test.tbook.options[13].text="Joyful-Mathematics (Nepali)";
		document.test.tbook.options[13].value="textbook.php?bnpjm1=0-11"
		document.test.tbook.options[14].text="Joyful-Mathematics (Oriya)";
		document.test.tbook.options[14].value="textbook.php?borjm1=0-11"
		document.test.tbook.options[15].text="Joyful-Mathematics (Manipuri)";
		document.test.tbook.options[15].value="textbook.php?bmnjm1=0-11"
		document.test.tbook.options[16].text="Joyful-Mathematics (Urdu)";
		document.test.tbook.options[16].value="textbook.php?bujm1=0-11"
		document.test.tbook.options[17].text="Joyful-Mathematics (Santhali)";
		document.test.tbook.options[17].value="textbook.php?bsnjm1=0-11"
		document.test.tbook.options[18].text="Joyful-Mathematics (Konkani)";
		document.test.tbook.options[18].value="textbook.php?bkojm1=0-11"
		document.test.tbook.options[19].text="Joyful-Mathematics (Kannada)";
		document.test.tbook.options[19].value="textbook.php?bknjm1=0-11"
		document.test.tbook.options[20].text="Joyful-Mathematics (Tamil)";
		document.test.tbook.options[20].value="textbook.php?btmjm1=0-11"
		document.test.tbook.options[21].text="Joyful-Mathematics (Telugu)";
		document.test.tbook.options[21].value="textbook.php?btljm1=0-11"
		document.test.tbook.options[22].text="Joyful-Mathematics (Dogri)";
		document.test.tbook.options[22].value="textbook.php?bdgjm1=0-11"
		document.test.tbook.options[23].text="Joyful-Mathematics (Kashmiri)";
		document.test.tbook.options[23].value="textbook.php?bksjm1=0-11"
		
		//document.test.tbook.options[3].text="Riyazi ka Jadu-II(Urdu)";
		//document.test.tbook.options[3].value="textbook.php?buri1=0-15"
		
				
	}
	else if((document.test.tclass.value==2) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Sarangi";
		document.test.tbook.options[1].value="textbook.php?bhsr1=0-26"
		
	}
	
	else if((document.test.tclass.value==2) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Mridang";
		document.test.tbook.options[1].value="textbook.php?bemr1=0-13"
		//document.test.tbook.options[2].text="Raindrops";
		//document.test.tbook.options[2].value="textbook.php?berd1=0-15"
		
	}
	else if((document.test.tclass.value==2) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Shahnai";
		document.test.tbook.options[1].value="textbook.php?bush1=0-19"
		
		
	}

	
/*
else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Rimjhim";
		document.test.tbook.options[1].value="textbook.php?chhn1=0-13"		
		
					
	}
	
	else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="Environmental Studies"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Looking Around";
		document.test.tbook.options[1].value="textbook.php?ceap1=0-24"
		document.test.tbook.options[2].text="Aas-Pass";
		document.test.tbook.options[2].value="textbook.php?chap1=0-24"
		document.test.tbook.options[3].text="Aas-Pass(urdu)";
		document.test.tbook.options[3].value="textbook.php?cuap1=0-24"	
		
					
	}
	
	else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Marigold";
		document.test.tbook.options[1].value="textbook.php?ceen1=0-10"		
		
					
	}
else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Mathematics";
		document.test.tbook.options[1].value="textbook.php?cemh1=0-14"		
		document.test.tbook.options[2].text="Ganit";
		document.test.tbook.options[2].value="textbook.php?chmh1=0-14"
		document.test.tbook.options[3].text="Riyazi Ka Jadoo-III(Urdu)";
		document.test.tbook.options[3].value="textbook.php?curi1=0-14"		
				
	}
	else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Ibtedai Urdu";
		document.test.tbook.options[1].value="textbook.php?culb1=0-20"		
		
				
	}


*/


else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Maths Mela";
		document.test.tbook.options[1].value="textbook.php?cemm1=0-14"	
		document.test.tbook.options[2].text="Ganit Mela";
		document.test.tbook.options[2].value="textbook.php?chmm1=0-14"
		document.test.tbook.options[3].text="Riyazi Mela";
		document.test.tbook.options[3].value="textbook.php?cumm1=0-14"
		document.test.tbook.options[4].text="Maths Mela (Assamese)";
		document.test.tbook.options[4].value="textbook.php?casmm1=0-14"
		document.test.tbook.options[5].text="Maths Mela (Bengali)";
		document.test.tbook.options[5].value="textbook.php?cbnmm1=0-14"
		document.test.tbook.options[6].text="Maths Mela (Bodo)";
		document.test.tbook.options[6].value="textbook.php?cbdmm1=0-14"
		document.test.tbook.options[7].text="Maths Mela (Dogri)";
		document.test.tbook.options[7].value="textbook.php?cdgmm1=0-14"
		document.test.tbook.options[8].text="Maths Mela (Gujarati)";
		document.test.tbook.options[8].value="textbook.php?cgjmm1=0-14"
		document.test.tbook.options[9].text="Maths Mela (Kannada)";
		document.test.tbook.options[9].value="textbook.php?cknmm1=0-14"
		document.test.tbook.options[10].text="Maths Mela (Maithili)";
		document.test.tbook.options[10].value="textbook.php?cmtmm1=0-14"
		document.test.tbook.options[11].text="Maths Mela (Malayalam)";
		document.test.tbook.options[11].value="textbook.php?cmlmm1=0-14"
		document.test.tbook.options[12].text="Maths Mela (Manipuri)";
		document.test.tbook.options[12].value="textbook.php?cmnmm1=0-14"
		document.test.tbook.options[13].text="Maths Mela (Nepali)";
		document.test.tbook.options[13].value="textbook.php?cnpmm1=0-14"
		document.test.tbook.options[14].text="Maths Mela (Odia)";
		document.test.tbook.options[14].value="textbook.php?cormm1=0-14"
		document.test.tbook.options[15].text="Maths Mela (Punjabi)";
		document.test.tbook.options[15].value="textbook.php?cpnmm1=0-14"
		document.test.tbook.options[16].text="Maths Mela (Santhali)";
		document.test.tbook.options[16].value="textbook.php?csnmm1=0-14"
		document.test.tbook.options[17].text="Maths Mela (Tamil)";
		document.test.tbook.options[17].value="textbook.php?ctmmm1=0-14"
		document.test.tbook.options[18].text="Maths Mela (Telugu)";
		document.test.tbook.options[18].value="textbook.php?ctlmm1=0-14"
		document.test.tbook.options[19].text="Maths Mela (Sanskrit)";
		document.test.tbook.options[19].value="textbook.php?cskmm1=0-14"
		document.test.tbook.options[20].text="Maths Mela (Marathi)";
		document.test.tbook.options[20].value="textbook.php?cmrmm1=0-14"
		document.test.tbook.options[21].text="Maths Mela (Konkani)";
		document.test.tbook.options[21].value="textbook.php?ckomm1=0-14"
		document.test.tbook.options[22].text="Maths Mela (Sindhi)";
		document.test.tbook.options[22].value="textbook.php?csimm1=0-14"
		document.test.tbook.options[23].text="Maths Mela (Kashmiri)";
		document.test.tbook.options[23].value="textbook.php?cksmm1=0-14"
					
				
	}
else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Veena";
		document.test.tbook.options[1].value="textbook.php?chve1=0-18"		
		
					
	}
	
	
else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Sitar";
		document.test.tbook.options[1].value="textbook.php?cust1=0-19"		
		
				
	}
	
else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Santoor";
		document.test.tbook.options[1].value="textbook.php?cesa1=0-12"		
		
					
	}	

	else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="The World Around Us"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Our Wondrous World";
		document.test.tbook.options[1].value="textbook.php?ceev1=0-12"
		document.test.tbook.options[2].text="Hamara Adhbhut Sansar";
		document.test.tbook.options[2].value="textbook.php?chev1=0-12"
		document.test.tbook.options[3].text="Hamari Hairat Angez Duniya";
		document.test.tbook.options[3].value="textbook.php?cuev1=0-12"
		
		
		document.test.tbook.options[4].text="Our Wondrous World (Bengali)";
		document.test.tbook.options[4].value="textbook.php?cbnev1=0-12"
		document.test.tbook.options[5].text="Our Wondrous World (Odia)";
		document.test.tbook.options[5].value="textbook.php?corev1=0-12"
		document.test.tbook.options[6].text="Our Wondrous World (Marathi)";
		document.test.tbook.options[6].value="textbook.php?cmrev1=0-12"
		document.test.tbook.options[7].text="Our Wondrous World (Nepali)";
		document.test.tbook.options[7].value="textbook.php?cnpev1=0-12"
		document.test.tbook.options[8].text="Our Wondrous World (Telugu)";
		document.test.tbook.options[8].value="textbook.php?ctlev1=0-12"
		document.test.tbook.options[9].text="Our Wondrous World (Gujrati)";
		document.test.tbook.options[9].value="textbook.php?cgjev1=0-12"
		document.test.tbook.options[10].text="Our Wondrous World (Manipuri)";
		document.test.tbook.options[10].value="textbook.php?cmnev1=0-12"
		document.test.tbook.options[11].text="Our Wondrous World (Sanskrit)";
		document.test.tbook.options[11].value="textbook.php?cskev1=0-12"
		document.test.tbook.options[12].text="Our Wondrous World (Assamese)";
		document.test.tbook.options[12].value="textbook.php?casev1=0-12"
		
		
		
		
		document.test.tbook.options[13].text="Our Wondrous World (Bodo)";
		document.test.tbook.options[13].value="textbook.php?cbdev1=0-12"
		document.test.tbook.options[14].text="Our Wondrous World (Punjabi)";
		document.test.tbook.options[14].value="textbook.php?cpnev1=0-12"
		document.test.tbook.options[15].text="Our Wondrous World (Malayalam)";
		document.test.tbook.options[15].value="textbook.php?cmlev1=0-12"
		document.test.tbook.options[16].text="Our Wondrous World (Maithili)";
		document.test.tbook.options[16].value="textbook.php?cmtev1=0-12"
		document.test.tbook.options[17].text="Our Wondrous World (Dogri)";
		document.test.tbook.options[17].value="textbook.php?cdgev1=0-12"
		document.test.tbook.options[18].text="Our Wondrous World (Kannada)";
		document.test.tbook.options[18].value="textbook.php?cknev1=0-12"
		document.test.tbook.options[19].text="Our Wondrous World (Santhali)";
		document.test.tbook.options[19].value="textbook.php?csnev1=0-12"
		document.test.tbook.options[20].text="Our Wondrous World (Tamil)";
		document.test.tbook.options[20].value="textbook.php?ctmev1=0-12"
		document.test.tbook.options[21].text="Our Wondrous World (Sindhi)";
		document.test.tbook.options[21].value="textbook.php?csiev1=0-12"
		document.test.tbook.options[22].text="Our Wondrous World (Kashmiri)";
		document.test.tbook.options[22].value="textbook.php?cksev1=0-12"
		document.test.tbook.options[23].text="Our Wondrous World (Konkani)";
		document.test.tbook.options[23].value="textbook.php?ckoev1=0-12"

							
	}

	else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="Arts"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Bansuri - I";
		document.test.tbook.options[1].value="textbook.php?cebu1=0-20"
		document.test.tbook.options[2].text="Bansuri - I (Hindi)";
		document.test.tbook.options[2].value="textbook.php?chbu1=0-20"
		document.test.tbook.options[3].text="Bansuri - I (Urdu)";
		document.test.tbook.options[3].value="textbook.php?cubu1=0-20"
		document.test.tbook.options[4].text="Bansuri - I (Bengali)";
		document.test.tbook.options[4].value="textbook.php?cbnbu1=0-20"
		document.test.tbook.options[5].text="Bansuri - I (Maithili)";
		document.test.tbook.options[5].value="textbook.php?cmtbu1=0-20"
		document.test.tbook.options[6].text="Bansuri - I (Manipuri)";
		document.test.tbook.options[6].value="textbook.php?cmnbu1=0-20"
		document.test.tbook.options[7].text="Bansuri - I (Marathi)";
		document.test.tbook.options[7].value="textbook.php?cmrbu1=0-20"
		document.test.tbook.options[8].text="Bansuri - I (Nepali)";
		document.test.tbook.options[8].value="textbook.php?cnpbu1=0-20"
		document.test.tbook.options[9].text="Bansuri - I (Punjabi)";
		document.test.tbook.options[9].value="textbook.php?cpnbu1=0-20"
		document.test.tbook.options[10].text="Bansuri - I (Bodo)";
		document.test.tbook.options[10].value="textbook.php?cbdbu1=0-20"
		document.test.tbook.options[11].text="Bansuri - I (Gujarati)";
		document.test.tbook.options[11].value="textbook.php?cgjbu1=0-20"
		document.test.tbook.options[12].text="Bansuri - I (Dogri)";
		document.test.tbook.options[12].value="textbook.php?cdgbu1=0-20"
		document.test.tbook.options[13].text="Bansuri - I (Konkani)";
		document.test.tbook.options[13].value="textbook.php?ckobu1=0-20"
		document.test.tbook.options[14].text="Bansuri - I (Santhali)";
		document.test.tbook.options[14].value="textbook.php?csnbu1=0-20"
		document.test.tbook.options[15].text="Bansuri - I (Tamil)";
		document.test.tbook.options[15].value="textbook.php?ctmbu1=0-20"
		document.test.tbook.options[16].text="Bansuri - I (Telugu)";
		document.test.tbook.options[16].value="textbook.php?ctlbu1=0-20"
		document.test.tbook.options[17].text="Bansuri - I (Assamese)";
		document.test.tbook.options[17].value="textbook.php?casbu1=0-20"
		document.test.tbook.options[18].text="Bansuri - I (Kannada)";
		document.test.tbook.options[18].value="textbook.php?cknbu1=0-20"
		document.test.tbook.options[19].text="Bansuri - I (Sanskrit)";
		document.test.tbook.options[19].value="textbook.php?cskbu1=0-20"
		document.test.tbook.options[20].text="Bansuri - I (Malayalam)";
		document.test.tbook.options[20].value="textbook.php?cmlbu1=0-20"
		document.test.tbook.options[21].text="Bansuri - I (Odia)";
		document.test.tbook.options[21].value="textbook.php?corbu1=0-20"
		document.test.tbook.options[22].text="Bansuri - I (Sindhi)";
		document.test.tbook.options[22].value="textbook.php?csibu1=0-20"
		document.test.tbook.options[23].text="Bansuri - I (Kashmiri)";
		document.test.tbook.options[23].value="textbook.php?cksbu1=0-20"
		
	


							
	}
	
	else if((document.test.tclass.value==3) && (document.test.tsubject.options[sind].text=="Physical Education and Well Being"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Khel Yoga";
		document.test.tbook.options[1].value="textbook.php?ceky1=0-7"
		document.test.tbook.options[2].text="Khel Yoga (Hindi)";
		document.test.tbook.options[2].value="textbook.php?chky1=0-7"	
		document.test.tbook.options[3].text="Khel Yoga (Malayalam)";
		document.test.tbook.options[3].value="textbook.php?cmlky1=0-7"	
		document.test.tbook.options[4].text="Khel Yoga (Bengali)";
		document.test.tbook.options[4].value="textbook.php?cbnky1=0-7"
		document.test.tbook.options[5].text="Khel Yoga (Gujarati)";
		document.test.tbook.options[5].value="textbook.php?cgjky1=0-7"
		document.test.tbook.options[6].text="Khel Yoga (Kannada)";
		document.test.tbook.options[6].value="textbook.php?cknky1=0-7"	
		document.test.tbook.options[7].text="Khel Yoga (Konkani)";
		document.test.tbook.options[7].value="textbook.php?ckoky1=0-7"
		document.test.tbook.options[8].text="Khel Yoga (Manipuri)";
		document.test.tbook.options[8].value="textbook.php?cmnky1=0-7"
		document.test.tbook.options[9].text="Khel Yoga (Nepali)";
		document.test.tbook.options[9].value="textbook.php?cnpky1=0-7"
		document.test.tbook.options[10].text="Khel Yoga (Odia)";
		document.test.tbook.options[10].value="textbook.php?corky1=0-7"
		document.test.tbook.options[11].text="Khel Yoga (Assamese)";
		document.test.tbook.options[11].value="textbook.php?casky1=0-7"	
		document.test.tbook.options[12].text="Khel Yoga (Dogri)";
		document.test.tbook.options[12].value="textbook.php?cdgky1=0-7"	
		document.test.tbook.options[13].text="Khel Yoga (Punjabi)";
		document.test.tbook.options[13].value="textbook.php?cpnky1=0-7"	
		document.test.tbook.options[14].text="Khel Yoga (Sanskrit)";
		document.test.tbook.options[14].value="textbook.php?cskky1=0-7"	
		document.test.tbook.options[15].text="Khel Yoga (Santhali)";
		document.test.tbook.options[15].value="textbook.php?csnky1=0-7"	
		document.test.tbook.options[16].text="Khel Yoga (Tamil)";
		document.test.tbook.options[16].value="textbook.php?ctmky1=0-7"
		document.test.tbook.options[17].text="Khel Yoga (Marathi)";
		document.test.tbook.options[17].value="textbook.php?cmrky1=0-7"	
		document.test.tbook.options[18].text="Khel Yoga (Bodo)";
		document.test.tbook.options[18].value="textbook.php?cbdky1=0-7"
document.test.tbook.options[19].text="Khel Yoga (Telugu)";
		document.test.tbook.options[19].value="textbook.php?ctlky1=0-7"		
		document.test.tbook.options[20].text="Khel Yoga (Maithili)";
		document.test.tbook.options[20].value="textbook.php?cmtky1=0-7"	
document.test.tbook.options[21].text="Khel Yoga (Urdu)";
		document.test.tbook.options[21].value="textbook.php?cuky1=0-7"
		document.test.tbook.options[22].text="Khel Yoga (Sindhi)";
		document.test.tbook.options[22].value="textbook.php?csiky1=0-7"
	document.test.tbook.options[23].text="Khel Yoga (Kashmiri)";
		document.test.tbook.options[23].value="textbook.php?cksky1=0-7"					
		
				
	}
	
	
 
else if((document.test.tclass.value==4) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		/*document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Math-Magic";
		document.test.tbook.options[1].value="textbook.php?demh1=0-14"
		document.test.tbook.options[2].text="Ganit Ka Jadu";
		document.test.tbook.options[2].value="textbook.php?dhmh1=0-14"
		document.test.tbook.options[3].text="Riyazi Ka Jadu(Urdu)";
		document.test.tbook.options[3].value="textbook.php?duri1=0-14"*/
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Math-Mela";
		document.test.tbook.options[1].value="textbook.php?demm1=0-14"
		document.test.tbook.options[2].text="Ganit Mela";
		document.test.tbook.options[2].value="textbook.php?dhmm1=0-14"
		document.test.tbook.options[3].text="Riyazi Mela";
		document.test.tbook.options[3].value="textbook.php?dumm1=0-14"
		document.test.tbook.options[4].text="Math-Mela (Maithili)";
		document.test.tbook.options[4].value="textbook.php?dmtmm1=0-14"
		document.test.tbook.options[5].text="Math-Mela (Punjabi)";
		document.test.tbook.options[5].value="textbook.php?dpnmm1=0-14"
		document.test.tbook.options[6].text="Math-Mela (Gujarati)";
		document.test.tbook.options[6].value="textbook.php?dgjmm1=0-14"
		document.test.tbook.options[7].text="Math-Mela (Dogri)";
		document.test.tbook.options[7].value="textbook.php?ddgmm1=0-14"
		document.test.tbook.options[8].text="Math-Mela (Nepali)";
		document.test.tbook.options[8].value="textbook.php?dnpmm1=0-14"
		document.test.tbook.options[9].text="Math-Mela (Manipuri)";
		document.test.tbook.options[9].value="textbook.php?dmnmm1=0-14"
		document.test.tbook.options[10].text="Math-Mela (Assamese)";
		document.test.tbook.options[10].value="textbook.php?dasmm1=0-14"
		document.test.tbook.options[11].text="Math-Mela (Sindhi)";
		document.test.tbook.options[11].value="textbook.php?dsimm1=0-14"
		document.test.tbook.options[12].text="Math-Mela (Odia)";
		document.test.tbook.options[12].value="textbook.php?dormm1=0-14"
		document.test.tbook.options[13].text="Math-Mela (Bodo)";
		document.test.tbook.options[13].value="textbook.php?dbdmm1=0-14"
		document.test.tbook.options[14].text="Math-Mela (Bengali)";
		document.test.tbook.options[14].value="textbook.php?dbnmm1=0-14"
		document.test.tbook.options[15].text="Math-Mela (Marathi)";
		document.test.tbook.options[15].value="textbook.php?dmrmm1=0-14"
		document.test.tbook.options[16].text="Math-Mela (Kannada)";
		document.test.tbook.options[16].value="textbook.php?dknmm1=0-14"
		document.test.tbook.options[17].text="Math-Mela (Malayalam)";
		document.test.tbook.options[17].value="textbook.php?dmlmm1=0-14"
		document.test.tbook.options[18].text="Math-Mela (Sanskrit)";
		document.test.tbook.options[18].value="textbook.php?dskmm1=0-14"
		document.test.tbook.options[19].text="Math-Mela (Tamil)";
		document.test.tbook.options[19].value="textbook.php?dtmmm1=0-14"
		document.test.tbook.options[20].text="Math-Mela (Santhali)";
		document.test.tbook.options[20].value="textbook.php?dsnmm1=0-14"
		document.test.tbook.options[21].text="Math-Mela (Telugu)";
		document.test.tbook.options[21].value="textbook.php?dtlmm1=0-14"
		document.test.tbook.options[22].text="Math-Mela (Konkani)";
		document.test.tbook.options[22].value="textbook.php?dkomm1=0-14"
		document.test.tbook.options[23].text="Math-Mela (Kashmiri)";
		document.test.tbook.options[23].value="textbook.php?dksmm1=0-14"
		
						
	}
	else if((document.test.tclass.value==4) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		/*document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Rimjhim";
		document.test.tbook.options[1].value="textbook.php?dhhn1=0-14"*/
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Veena";
		document.test.tbook.options[1].value="textbook.php?dhve1=0-13"
						

	}
	/*else if((document.test.tclass.value==4) && (document.test.tsubject.options[sind].text=="Environmental Studies"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Looking Around(EVS)";
		document.test.tbook.options[1].value="textbook.php?deap1=0-27"
		document.test.tbook.options[2].text="Aas Paas";
		document.test.tbook.options[2].value="textbook.php?dhap1=0-27"
		document.test.tbook.options[3].text="Aas-Paas(Urdu)";
		document.test.tbook.options[3].value="textbook.php?duap1=0-27"
							
	}*/
	else if((document.test.tclass.value==4) && (document.test.tsubject.options[sind].text=="The World Around Us"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Our Wonderous World";
		document.test.tbook.options[1].value="textbook.php?deev1=0-10"
		document.test.tbook.options[2].text="Hamara Adhbhut Sansar";
		document.test.tbook.options[2].value="textbook.php?dhev1=0-10"
		document.test.tbook.options[3].text="Hamari Hairatangez Duniya ";
		document.test.tbook.options[3].value="textbook.php?duev1=0-10"
		document.test.tbook.options[4].text="Our Wonderous World (Punjabi)";
		document.test.tbook.options[4].value="textbook.php?dpev1=0-10"
		document.test.tbook.options[5].text="Our Wonderous World (Gujarati)";
		document.test.tbook.options[5].value="textbook.php?dgjev1=0-10"
		document.test.tbook.options[6].text="Our Wondrous World (Kannada)";
	    document.test.tbook.options[6].value="textbook.php?dknev1=0-10"
		document.test.tbook.options[7].text="Our Wondrous World (Sanskrit)";
		document.test.tbook.options[7].value="textbook.php?dskev1=0-10"
		document.test.tbook.options[8].text="Our Wondrous World (Konkani)";
		document.test.tbook.options[8].value="textbook.php?dkoev1=0-10"
		document.test.tbook.options[9].text="Our Wondrous World (Bengali)";
		document.test.tbook.options[9].value="textbook.php?dbnev1=0-10"
		document.test.tbook.options[10].text="Our Wondrous World (Odia)";
		document.test.tbook.options[10].value="textbook.php?dorev1=0-10"
		document.test.tbook.options[11].text="Our Wondrous World (Marathi)";
		document.test.tbook.options[11].value="textbook.php?dmrev1=0-10"
		document.test.tbook.options[12].text="Our Wondrous World (Malayalam)";
		document.test.tbook.options[12].value="textbook.php?dmlev1=0-10"
		document.test.tbook.options[13].text="Our Wondrous World (Bodo)";
		document.test.tbook.options[13].value="textbook.php?dbdev1=0-10"
		document.test.tbook.options[14].text="Our Wondrous World (Nepali)";
		document.test.tbook.options[14].value="textbook.php?dnpev1=0-10"
		document.test.tbook.options[15].text="Our Wondrous World (Assamese)";
		document.test.tbook.options[15].value="textbook.php?dasev1=0-10"
		document.test.tbook.options[16].text="Our Wondrous World (Dogri)";
		document.test.tbook.options[16].value="textbook.php?ddgev1=0-10"
		document.test.tbook.options[17].text="Our Wondrous World (Manipuri)";
		document.test.tbook.options[17].value="textbook.php?dmnev1=0-10"
		document.test.tbook.options[18].text="Our Wondrous World (Tamil)";
		document.test.tbook.options[18].value="textbook.php?dtmev1=0-10"
		document.test.tbook.options[19].text="Our Wondrous World (Kashmiri)";
		document.test.tbook.options[19].value="textbook.php?dksev1=0-10"
		document.test.tbook.options[20].text="Our Wondrous World (Telugu)";
		document.test.tbook.options[20].value="textbook.php?dtlev1=0-10"
		document.test.tbook.options[21].text="Our Wondrous World (Sindhi)";
		document.test.tbook.options[21].value="textbook.php?dsiev1=0-10"
		document.test.tbook.options[22].text="Our Wondrous World (Santhali)";
		document.test.tbook.options[22].value="textbook.php?dsnev1=0-10"
		document.test.tbook.options[23].text="Our Wondrous World (Maithili)";
		document.test.tbook.options[23].value="textbook.php?dmtev1=0-10"

		
		
		
							
	}
	
	else if((document.test.tclass.value==4) && (document.test.tsubject.options[sind].text=="English"))
	{
		/*document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Marigold";
		document.test.tbook.options[1].value="textbook.php?deen1=0-9"*/
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Santoor";
		document.test.tbook.options[1].value="textbook.php?desa1=0-12"
		
	}
	else if((document.test.tclass.value==4) && (document.test.tsubject.options[sind].text=="Arts"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Bansuri";
		document.test.tbook.options[1].value="textbook.php?debu1=0-18"
		document.test.tbook.options[2].text="Bansuri - I (Hindi)";
		document.test.tbook.options[2].value="textbook.php?dhbu1=0-18"
		document.test.tbook.options[3].text="Bansuri - I (Urdu)";
		document.test.tbook.options[3].value="textbook.php?dubu1=0-18"
		document.test.tbook.options[4].text="Bansuri - I (Odia)";
		document.test.tbook.options[4].value="textbook.php?dorbu1=0-18"
		document.test.tbook.options[5].text="Bansuri - I (Gujarati)";
		document.test.tbook.options[5].value="textbook.php?dgjbu1=0-18"
		document.test.tbook.options[6].text="Bansuri - I (Punjabi)";
		document.test.tbook.options[6].value="textbook.php?dpnbu1=0-18"
		document.test.tbook.options[7].text="Bansuri - I (Sindhi)";
		document.test.tbook.options[7].value="textbook.php?dsibu1=0-18"
		document.test.tbook.options[8].text="Bansuri - I (Tamil)";
		document.test.tbook.options[8].value="textbook.php?dtmbu1=0-18"
		document.test.tbook.options[9].text="Bansuri - I (Bodo)";
		document.test.tbook.options[9].value="textbook.php?dbdbu1=0-18"
		document.test.tbook.options[10].text="Bansuri - I (Nepali)";
		document.test.tbook.options[10].value="textbook.php?dnpbu1=0-18"
		document.test.tbook.options[11].text="Bansuri - I (Konkani)";
		document.test.tbook.options[11].value="textbook.php?dkobu1=0-18"
		document.test.tbook.options[12].text="Bansuri - I (Assamese)";
		document.test.tbook.options[12].value="textbook.php?dasbu1=0-18"
		document.test.tbook.options[13].text="Bansuri - I (Bengali)";
		document.test.tbook.options[13].value="textbook.php?dbnbu1=0-18"
		document.test.tbook.options[14].text="Bansuri - I (Dogri)";
		document.test.tbook.options[14].value="textbook.php?ddgbu1=0-18"
		document.test.tbook.options[15].text="Bansuri - I (Manipuri)";
		document.test.tbook.options[15].value="textbook.php?dmnbu1=0-18"
		document.test.tbook.options[16].text="Bansuri - I (Sanskrit)";
		document.test.tbook.options[16].value="textbook.php?dskbu1=0-18"
		document.test.tbook.options[17].text="Bansuri - I (Malayalam)";
		document.test.tbook.options[17].value="textbook.php?dmlbu1=0-18"
		document.test.tbook.options[18].text="Bansuri - I (Kannada)";
		document.test.tbook.options[18].value="textbook.php?dknbu1=0-18"
		document.test.tbook.options[19].text="Bansuri - I (Kashmiri)";
		document.test.tbook.options[19].value="textbook.php?dksbu1=0-18"
			document.test.tbook.options[20].text="Bansuri - I (Maithili)";
		document.test.tbook.options[20].value="textbook.php?dmtbu1=0-18"
		document.test.tbook.options[21].text="Bansuri - I (Marathi)";
		document.test.tbook.options[21].value="textbook.php?dmrbu1=0-18"
		document.test.tbook.options[22].text="Bansuri - I (Santhali)";
		document.test.tbook.options[22].value="textbook.php?dsnbu1=0-18"
		document.test.tbook.options[23].text="Bansuri - I (Telugu)";
		document.test.tbook.options[23].value="textbook.php?dtlbu1=0-18"
	}
	else if((document.test.tclass.value==4) && (document.test.tsubject.options[sind].text=="Physical Education and Well Being"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Khel Yoga";
		document.test.tbook.options[1].value="textbook.php?deky1=0-3"
		document.test.tbook.options[2].text="Khel Yoga(Hindi)";
		document.test.tbook.options[2].value="textbook.php?dhky1=0-3"
		document.test.tbook.options[3].text="Khel Yoga(Odia)";
		document.test.tbook.options[3].value="textbook.php?dorky1=0-3"
		document.test.tbook.options[4].text="Khel Yoga(Gujarati)";
		document.test.tbook.options[4].value="textbook.php?dgjky1=0-3"
		document.test.tbook.options[5].text="Khel Yoga(Bengali)";
		document.test.tbook.options[5].value="textbook.php?dbnky1=0-3"
		document.test.tbook.options[6].text="Khel Yoga (Assamese)";
		document.test.tbook.options[6].value="textbook.php?dasky1=0-3"
		document.test.tbook.options[7].text="Khel Yoga (Tamil)";
		document.test.tbook.options[7].value="textbook.php?dtmky1=0-3"
		document.test.tbook.options[8].text="Khel Yoga (Punjabi)";
		document.test.tbook.options[8].value="textbook.php?dpnky1=0-3"
		document.test.tbook.options[9].text="Khel Yoga (Marathi)";
		document.test.tbook.options[9].value="textbook.php?dmrky1=0-3"
		document.test.tbook.options[10].text="Khel Yoga (Telugu)";
		document.test.tbook.options[10].value="textbook.php?dtlky1=0-3"
		document.test.tbook.options[11].text="Khel Yoga (Dogri)";
		document.test.tbook.options[11].value="textbook.php?ddgky1=0-3"
		document.test.tbook.options[12].text="Khel Yoga (Kannada)";
		document.test.tbook.options[12].value="textbook.php?dknky1=0-3"
		document.test.tbook.options[13].text="Khel Yoga (Nepali)";
		document.test.tbook.options[13].value="textbook.php?dnpky1=0-3"
		document.test.tbook.options[14].text="Khel Yoga (Sanskrit)";
		document.test.tbook.options[14].value="textbook.php?dskky1=0-3"
		document.test.tbook.options[15].text="Khel Yoga (Kashmiri)";
		document.test.tbook.options[15].value="textbook.php?dksky1=0-3"
		document.test.tbook.options[16].text="Khel Yoga (Malayalam)";
		document.test.tbook.options[16].value="textbook.php?dmlky1=0-3"
		document.test.tbook.options[17].text="Khel Yoga (Manipuri)";
		document.test.tbook.options[17].value="textbook.php?dmnky1=0-3"
		document.test.tbook.options[18].text="Khel Yoga (Bodo)";
		document.test.tbook.options[18].value="textbook.php?dbdky1=0-3"
		document.test.tbook.options[19].text="Khel Yoga (Maithili)";
		document.test.tbook.options[19].value="textbook.php?dmtky1=0-3"
		document.test.tbook.options[20].text="Khel Yoga (Konkani)";
		document.test.tbook.options[20].value="textbook.php?dkoky1=0-3"
		document.test.tbook.options[21].text="Khel Yoga (Sindhi)";
		document.test.tbook.options[21].value="textbook.php?dsiky1=0-3"
		document.test.tbook.options[22].text="Khel Yoga (Santhali)";
		document.test.tbook.options[22].value="textbook.php?dsnky1=0-3"
		
		
		
	}

	/*else if((document.test.tclass.value==4) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Ibtedai Urdu-IV";
		document.test.tbook.options[1].value="textbook.php?dulb1=0-22"
		}*/
		else if((document.test.tclass.value==4) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Sitaar";
		document.test.tbook.options[1].value="textbook.php?dust1=0-14"
		}

	

	else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Math-Mela";
		document.test.tbook.options[1].value="textbook.php?eemm1=0-15"
		document.test.tbook.options[2].text="Ganit-Mela";
		document.test.tbook.options[2].value="textbook.php?ehmm1=0-15"	
		document.test.tbook.options[3].text="Riyazi Mela";
		document.test.tbook.options[3].value="textbook.php?eumm1=0-15"	
		document.test.tbook.options[4].text="Math-Mela (Tamil)";
		document.test.tbook.options[4].value="textbook.php?etmmm1=0-15"
		document.test.tbook.options[5].text="Math-Mela (Marathi)";
		document.test.tbook.options[5].value="textbook.php?emrmm1=0-15"
		document.test.tbook.options[6].text="Math-Mela (Odia)";
		document.test.tbook.options[6].value="textbook.php?eormm1=0-15"	
		document.test.tbook.options[7].text="Math-Mela (Punjabi)";
		document.test.tbook.options[7].value="textbook.php?epnmm1=0-15"	
		document.test.tbook.options[8].text="Math-Mela (Manipuri)";
		document.test.tbook.options[8].value="textbook.php?emnmm1=0-15"
		document.test.tbook.options[9].text="Math-Mela (Kannada)";
		document.test.tbook.options[9].value="textbook.php?eknmm1=0-15"
		document.test.tbook.options[10].text="Math-Mela (Nepali)";
		document.test.tbook.options[10].value="textbook.php?enpmm1=0-15"
        document.test.tbook.options[11].text="Math-Mela (Konkani)";
		document.test.tbook.options[11].value="textbook.php?ekomm1=0-15"	
		document.test.tbook.options[12].text="Math-Mela (Assamese)";
		document.test.tbook.options[12].value="textbook.php?easmm1=0-15"
		document.test.tbook.options[13].text="Math-Mela (Bodo)";
		document.test.tbook.options[13].value="textbook.php?ebdmm1=0-15"
        document.test.tbook.options[14].text="Math-Mela (Bengali)";
		document.test.tbook.options[14].value="textbook.php?ebnmm1=0-15"
		document.test.tbook.options[15].text="Math-Mela (Dogri)";
		document.test.tbook.options[15].value="textbook.php?edgmm1=0-15"
		document.test.tbook.options[16].text="Math-Mela (Malayalam)";
		document.test.tbook.options[16].value="textbook.php?emlmm1=0-15"
		document.test.tbook.options[17].text="Math-Mela (Telugu)";
		document.test.tbook.options[17].value="textbook.php?etlmm1=0-15"
		document.test.tbook.options[18].text="Math-Mela (Kashmiri)";
		document.test.tbook.options[18].value="textbook.php?eksmm1=0-15"
		document.test.tbook.options[19].text="Math-Mela (Gujarati)";
		document.test.tbook.options[19].value="textbook.php?egjmm1=0-15"
		document.test.tbook.options[20].text="Math-Mela (Sindhi)";
		document.test.tbook.options[20].value="textbook.php?esimm1=0-15"
		document.test.tbook.options[21].text="Math-Mela (Santhali)";
		document.test.tbook.options[21].value="textbook.php?esnmm1=0-15"
		document.test.tbook.options[22].text="Math-Mela (Maithili)";
		document.test.tbook.options[22].value="textbook.php?emtmm1=0-15"
		document.test.tbook.options[23].text="Math-Mela (Sanskrit)";
		document.test.tbook.options[23].value="textbook.php?eskmm1=0-15"		
		
				
	}
	
	else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Veena";
		document.test.tbook.options[1].value="textbook.php?ehve1=0-12"
						

	}
	else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="English"))
	{
	
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Santoor";
		document.test.tbook.options[1].value="textbook.php?eesa1=0-10"
		
	}
	else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="The World Around Us"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Our Wonderous World";
		document.test.tbook.options[1].value="textbook.php?eeev1=0-10"
		document.test.tbook.options[2].text="Hamara Adbhut Sansar";
		document.test.tbook.options[2].value="textbook.php?ehev1=0-10"
		document.test.tbook.options[3].text="Hamari Hairatangez Duniya";
		document.test.tbook.options[3].value="textbook.php?euev1=0-10"
		document.test.tbook.options[4].text="Our Wonderous World (Odia)";
		document.test.tbook.options[4].value="textbook.php?eorev1=0-10"
		document.test.tbook.options[5].text="Our Wonderous World (Gujarati)";
		document.test.tbook.options[5].value="textbook.php?egjev1=0-10"
		document.test.tbook.options[6].text="Our Wonderous World (Santhali)";
		document.test.tbook.options[6].value="textbook.php?esnev1=0-10"
		document.test.tbook.options[7].text="Our Wonderous World (Dogri)";
		document.test.tbook.options[7].value="textbook.php?edgev1=0-10"
		document.test.tbook.options[8].text="Our Wonderous World (Malayalam)";
		document.test.tbook.options[8].value="textbook.php?emlev1=0-10"
		document.test.tbook.options[9].text="Our Wonderous World (Sanskrit)";
		document.test.tbook.options[9].value="textbook.php?eskev1=0-10"
		document.test.tbook.options[10].text="Our Wonderous World (Bengali)";
		document.test.tbook.options[10].value="textbook.php?ebnev1=0-10"
		document.test.tbook.options[11].text="Our Wonderous World (Nepali)";
		document.test.tbook.options[11].value="textbook.php?enpev1=0-10"
		document.test.tbook.options[12].text="Our Wonderous World (Kannada)";
		document.test.tbook.options[12].value="textbook.php?eknev1=0-10"
		document.test.tbook.options[13].text="Our Wonderous World (Punjabi)";
		document.test.tbook.options[13].value="textbook.php?epnev1=0-10"
		document.test.tbook.options[14].text="Our Wonderous World (Tamil)";
		document.test.tbook.options[14].value="textbook.php?etmev1=0-10"
		document.test.tbook.options[15].text="Our Wonderous World (Manipuri)";
		document.test.tbook.options[15].value="textbook.php?emnev1=0-10"
			document.test.tbook.options[16].text="Our Wonderous World (Marathi)";
		document.test.tbook.options[16].value="textbook.php?emrev1=0-10"
		document.test.tbook.options[17].text="Our Wonderous World (Telugu)";
		document.test.tbook.options[17].value="textbook.php?etlev1=0-10"
		document.test.tbook.options[18].text="Our Wonderous World (Assamese)";
		document.test.tbook.options[18].value="textbook.php?easev1=0-10"
		document.test.tbook.options[19].text="Our Wonderous World (Kashmiri)";
		document.test.tbook.options[19].value="textbook.php?eksev1=0-10"
		document.test.tbook.options[20].text="Our Wonderous World (Bodo)";
		document.test.tbook.options[20].value="textbook.php?ebdev1=0-10"
		document.test.tbook.options[21].text="Our Wonderous World (Maithili)";
		document.test.tbook.options[21].value="textbook.php?emtev1=0-10"
		document.test.tbook.options[22].text="Our Wonderous World (Konkani)";
		document.test.tbook.options[22].value="textbook.php?ekoev1=0-10"
		document.test.tbook.options[23].text="Our Wonderous World (Sindhi)";
		document.test.tbook.options[23].value="textbook.php?esiev1=0-10"
	
		
							
	}
		else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="Arts"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Bansuri";
		document.test.tbook.options[1].value="textbook.php?eebu1=0-19"
		document.test.tbook.options[2].text="Bansuri (Hindi)";
		document.test.tbook.options[2].value="textbook.php?ehbu1=0-19"
		document.test.tbook.options[3].text="Bansuri (Urdu)";
		document.test.tbook.options[3].value="textbook.php?eubu1=0-19"
		document.test.tbook.options[4].text="Bansuri (Gujarati)";
		document.test.tbook.options[4].value="textbook.php?egjbu1=0-19"
		document.test.tbook.options[5].text="Bansuri (Maithili)";
		document.test.tbook.options[5].value="textbook.php?emtbu1=0-19"
		document.test.tbook.options[6].text="Bansuri (Odia)";
		document.test.tbook.options[6].value="textbook.php?eorbu1=0-19"
		document.test.tbook.options[7].text="Bansuri (Punjabi)";
		document.test.tbook.options[7].value="textbook.php?epnbu1=0-19"
		document.test.tbook.options[8].text="Bansuri (Kannada)";
		document.test.tbook.options[8].value="textbook.php?eknbu1=0-19"
		document.test.tbook.options[9].text="Bansuri (Bengali)";
		document.test.tbook.options[9].value="textbook.php?ebnbu1=0-19"
		document.test.tbook.options[10].text="Bansuri (Dogri)";
		document.test.tbook.options[10].value="textbook.php?edgbu1=0-19"
		document.test.tbook.options[11].text="Bansuri (Tamil)";
		document.test.tbook.options[11].value="textbook.php?etmbu1=0-19"
		document.test.tbook.options[12].text="Bansuri (Kashmiri)";
		document.test.tbook.options[12].value="textbook.php?eksbu1=0-19"
		document.test.tbook.options[13].text="Bansuri (Nepali)";
		document.test.tbook.options[13].value="textbook.php?enpbu1=0-19"
		document.test.tbook.options[14].text="Bansuri (Assamese)";
		document.test.tbook.options[14].value="textbook.php?easbu1=0-19"
		document.test.tbook.options[15].text="Bansuri (Sanskrit)";
		document.test.tbook.options[15].value="textbook.php?eskbu1=0-19"
		document.test.tbook.options[16].text="Bansuri (Marathi)";
		document.test.tbook.options[16].value="textbook.php?emrbu1=0-19"
		document.test.tbook.options[17].text="Bansuri (Sindhi)";
		document.test.tbook.options[17].value="textbook.php?esibu1=0-19"
		document.test.tbook.options[18].text="Bansuri (Telugu)";
		document.test.tbook.options[18].value="textbook.php?etlbu1=0-19"
		document.test.tbook.options[19].text="Bansuri (Manipuri)";
		document.test.tbook.options[19].value="textbook.php?emnbu1=0-19"
		document.test.tbook.options[20].text="Bansuri (Malayalam)";
		document.test.tbook.options[20].value="textbook.php?emlbu1=0-19"
		document.test.tbook.options[21].text="Bansuri (Bodo)";
		document.test.tbook.options[21].value="textbook.php?ebdbu1=0-19"
		document.test.tbook.options[22].text="Bansuri (Santhali)";
		document.test.tbook.options[22].value="textbook.php?esnbu1=0-19"
		document.test.tbook.options[23].text="Bansuri (Konkani)";
		document.test.tbook.options[23].value="textbook.php?ekobu1=0-19"
		
		
		
	}
	else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="Physical Education and Well Being"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Khel Yoga";
		document.test.tbook.options[1].value="textbook.php?eeky1=0-3"
		document.test.tbook.options[2].text="Khel Yoga(Odia)";
		document.test.tbook.options[2].value="textbook.php?eorky1=0-3"
		document.test.tbook.options[3].text="Khel Yoga(Punjabi)";
		document.test.tbook.options[3].value="textbook.php?epnky1=0-3"
		document.test.tbook.options[4].text="Khel Yoga(Kannada)";
		document.test.tbook.options[4].value="textbook.php?eknky1=0-3"
		document.test.tbook.options[5].text="Khel Yoga(Bengali)";
		document.test.tbook.options[5].value="textbook.php?ebnky1=0-3"
		document.test.tbook.options[6].text="Khel Yoga(Tamil)";
		document.test.tbook.options[6].value="textbook.php?etmky1=0-3"
		document.test.tbook.options[7].text="Khel Yoga(Nepali)";
		document.test.tbook.options[7].value="textbook.php?enpky1=0-3"
		document.test.tbook.options[8].text="Khel Yoga(Maithili)";
		document.test.tbook.options[8].value="textbook.php?emtky1=0-3"
		document.test.tbook.options[9].text="Khel Yoga(Manipuri)";
		document.test.tbook.options[9].value="textbook.php?emnky1=0-3"
		document.test.tbook.options[10].text="Khel Yoga(Telugu)";
		document.test.tbook.options[10].value="textbook.php?etlky1=0-3"
		document.test.tbook.options[11].text="Khel Yoga(Gujarati)";
		document.test.tbook.options[11].value="textbook.php?egjky1=0-3"
		document.test.tbook.options[12].text="Khel Yoga(Assamese)";
		document.test.tbook.options[12].value="textbook.php?easky1=0-3"
		document.test.tbook.options[13].text="Khel Yoga(Konkani)";
		document.test.tbook.options[13].value="textbook.php?ekoky1=0-3"
		document.test.tbook.options[13].text="Khel Yoga(Sanskrit)";
		document.test.tbook.options[13].value="textbook.php?eskky1=0-3"
		document.test.tbook.options[14].text="Khel Yoga(Konkani)";
		document.test.tbook.options[14].value="textbook.php?ekoky1=0-3"
		document.test.tbook.options[15].text="Khel Yoga(Bodo)";
		document.test.tbook.options[15].value="textbook.php?ebdky1=0-3"
		document.test.tbook.options[16].text="Khel Yoga(Dogri)";
		document.test.tbook.options[16].value="textbook.php?edgky1=0-3"
		document.test.tbook.options[17].text="Khel Yoga(Kashmiri)";
		document.test.tbook.options[17].value="textbook.php?eksky1=0-3"
		document.test.tbook.options[18].text="Khel Yoga(Marathi)";
		document.test.tbook.options[18].value="textbook.php?emrky1=0-3"
		document.test.tbook.options[19].text="Khel Yoga(Santhali)";
		document.test.tbook.options[19].value="textbook.php?esnky1=0-3"
		document.test.tbook.options[20].text="Khel Yoga(Sindhi)";
		document.test.tbook.options[20].value="textbook.php?esiky1=0-3"
		document.test.tbook.options[21].text="Khel Yoga(Malayalam)";
		document.test.tbook.options[21].value="textbook.php?emlky1=0-3"
		
	}
	else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Sitaar";
		document.test.tbook.options[1].value="textbook.php?eust1=0-18"
		}
	
	/*else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Math-Magic";
		document.test.tbook.options[1].value="textbook.php?eemh1=0-14"	
		document.test.tbook.options[2].text="Ganit";
		document.test.tbook.options[2].value="textbook.php?ehmh1=0-14"
		document.test.tbook.options[3].text="Riyazi Ka Jadoo(Urdu)";
		document.test.tbook.options[3].value="textbook.php?euma1=0-14"
				
	}*/
   
  /* else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Rimjhim";
		document.test.tbook.options[1].value="textbook.php?ehhn1=0-18"	
					
	}*/

   
   /* else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Marigold";
		document.test.tbook.options[1].value="textbook.php?eeen1=0-10"	
						
	}*/

/* else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="Environmental Studies"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Aas-Pass";
		document.test.tbook.options[1].value="textbook.php?ehap1=0-22"		
		document.test.tbook.options[2].text="Looking Around";
		document.test.tbook.options[2].value="textbook.php?eeap1=0-22"
		document.test.tbook.options[3].text="Ass Pass(Urdu)";
		document.test.tbook.options[3].value="textbook.php?euev1=0-22"	
						
	}
else if((document.test.tclass.value==5) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Ibtedai Urdu Class-V";
		document.test.tbook.options[1].value="textbook.php?eulb1=0-22"		
		<!--document.test.tbook.options[2].text="math-magic-V";
		//document.test.tbook.options[2].value="textbook.php?euma1=0-14"-->	
		<!--document.test.tbook.options[3].text="EVS-V (Urdu)";
		//document.test.tbook.options[3].value="textbook.php?euev1=0-22"-->
						
	}	*/


   
	 else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Malhar";
		document.test.tbook.options[1].value="textbook.php?fhml1=0-13"
		
		
		
		
		//document.test.tbook.options[1].text="Vasant";
		//document.test.tbook.options[1].value="textbook.php?fhvs1=0-14"		
		//document.test.tbook.options[2].text="Durva";
		//document.test.tbook.options[2].value="textbook.php?fhdv1=0-28"		
		//document.test.tbook.options[3].text="Bal Ram Katha";
		//document.test.tbook.options[3].value="textbook.php?fhbr1=0-12"
						
	}

	else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Vocational Education"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Kaushal Bodh";
		document.test.tbook.options[1].value="textbook.php?fekb1=0-6"
		document.test.tbook.options[2].text="Kaushal Bodh (Hindi)";
		document.test.tbook.options[2].value="textbook.php?fhkb1=0-6"
		document.test.tbook.options[3].text="Kaushal Bodh (Bengali)";
		document.test.tbook.options[3].value="textbook.php?fbnkb1=0-6"
		document.test.tbook.options[4].text="Kaushal Bodh (Bodo)";
		document.test.tbook.options[4].value="textbook.php?fbdkb1=0-6"
		document.test.tbook.options[5].text="Kaushal Bodh (Dogri)";
		document.test.tbook.options[5].value="textbook.php?fdgkb1=0-6"
		document.test.tbook.options[6].text="Kaushal Bodh (Konkani)";
		document.test.tbook.options[6].value="textbook.php?fkokb1=0-6"
		document.test.tbook.options[7].text="Kaushal Bodh (Odia)";
		document.test.tbook.options[7].value="textbook.php?forkb1=0-6"
		document.test.tbook.options[8].text="Kaushal Bodh (Punjabi)";
		document.test.tbook.options[8].value="textbook.php?fpnkb1=0-6"
		document.test.tbook.options[9].text="Kaushal Bodh (Malayalam)";
		document.test.tbook.options[9].value="textbook.php?fmlkb1=0-6"
		document.test.tbook.options[10].text="Kaushal Bodh (Kannada)";
		document.test.tbook.options[10].value="textbook.php?fknkb1=0-6"
		document.test.tbook.options[11].text="Kaushal Bodh (Manipuri)";
		document.test.tbook.options[11].value="textbook.php?fmnkb1=0-6"
		document.test.tbook.options[12].text="Kaushal Bodh (Tamil)";
		document.test.tbook.options[12].value="textbook.php?ftmkb1=0-6"
		document.test.tbook.options[13].text="Kaushal Bodh (Gujarati)";
		document.test.tbook.options[13].value="textbook.php?fgjkb1=0-6"
		document.test.tbook.options[14].text="Kaushal Bodh (Maithili)";
		document.test.tbook.options[14].value="textbook.php?fmtkb1=0-6"
		document.test.tbook.options[15].text="Kaushal Bodh (Assamese)";
		document.test.tbook.options[15].value="textbook.php?faskb1=0-6"
		document.test.tbook.options[16].text="Kaushal Bodh (Nepali)";
		document.test.tbook.options[16].value="textbook.php?fnpkb1=0-6"
		document.test.tbook.options[17].text="Kaushal Bodh (Sanskrit)";
		document.test.tbook.options[17].value="textbook.php?fskkb1=0-6"
		document.test.tbook.options[18].text="Kaushal Bodh (Kashmiri)";
		document.test.tbook.options[18].value="textbook.php?fkskb1=0-6"
		document.test.tbook.options[19].text="Kaushal Bodh (Marathi)";
		document.test.tbook.options[19].value="textbook.php?fmrkb1=0-6"
		document.test.tbook.options[20].text="Kaushal Bodh (Telugu)";
		document.test.tbook.options[20].value="textbook.php?ftlkb1=0-6"
		document.test.tbook.options[21].text="Kaushal Bodh (Santhali)";
		document.test.tbook.options[21].value="textbook.php?fsnkb1=0-6"
		document.test.tbook.options[22].text="Kaushal Bodh (Sindhi)";
		document.test.tbook.options[22].value="textbook.php?fsikb1=0-6"
		
						
	}

	else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Physical Education and Well Being"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Khel Yatra";
		document.test.tbook.options[1].value="textbook.php?feky1=0-5"
		document.test.tbook.options[2].text="Khel Yatra (Hindi)";
		document.test.tbook.options[2].value="textbook.php?fhky1=0-5";
		document.test.tbook.options[3].text="Khel Yatra (Bengali)";
		document.test.tbook.options[3].value="textbook.php?fbnky1=0-5"
		document.test.tbook.options[4].text="Khel Yatra (Punjabi)";
		document.test.tbook.options[4].value="textbook.php?fpnky1=0-5"
		document.test.tbook.options[5].text="Khel Yatra (Assamese)";
		document.test.tbook.options[5].value="textbook.php?fasky1=0-5"
		document.test.tbook.options[6].text="Khel Yatra (Tamil)";
		document.test.tbook.options[6].value="textbook.php?ftmky1=0-5"
		document.test.tbook.options[7].text="Khel Yatra (Nepali)";
		document.test.tbook.options[7].value="textbook.php?fnpky1=0-5"
		document.test.tbook.options[8].text="Khel Yatra (Odia)";
		document.test.tbook.options[8].value="textbook.php?forky1=0-5"
		document.test.tbook.options[9].text="Khel Yatra (Dogri)";
		document.test.tbook.options[9].value="textbook.php?fdgky1=0-5"
		document.test.tbook.options[10].text="Khel Yatra (Telugu)";
		document.test.tbook.options[10].value="textbook.php?ftlky1=0-5"
		document.test.tbook.options[11].text="Khel Yatra (Konkani)";
		document.test.tbook.options[11].value="textbook.php?fkoky1=0-5"
		document.test.tbook.options[12].text="Khel Yatra (Kannada)";
		document.test.tbook.options[12].value="textbook.php?fknky1=0-5"
		document.test.tbook.options[13].text="Khel Yatra (Malayalam)";
		document.test.tbook.options[13].value="textbook.php?fmlky1=0-5"
		document.test.tbook.options[14].text="Khel Yatra (Bodo)";
		document.test.tbook.options[14].value="textbook.php?fbdky1=0-5"
		document.test.tbook.options[15].text="Khel Yatra (Kashmiri)";
		document.test.tbook.options[15].value="textbook.php?fksky1=0-5"
		document.test.tbook.options[16].text="Khel Yatra (Manipuri)";
		document.test.tbook.options[16].value="textbook.php?fmnky1=0-5"
		document.test.tbook.options[17].text="Khel Yatra (Marathi)";
		document.test.tbook.options[17].value="textbook.php?fmrky1=0-5"
		document.test.tbook.options[18].text="Khel Yatra (Sanskrit)";
		document.test.tbook.options[18].value="textbook.php?fskky1=0-5"
		document.test.tbook.options[19].text="Khel Yatra (Santhali)";
		document.test.tbook.options[19].value="textbook.php?fsnky1=0-5"
		document.test.tbook.options[20].text="Khel Yatra (Sindhi)";
		document.test.tbook.options[20].value="textbook.php?fsiky1=0-5"
		document.test.tbook.options[21].text="Khel Yatra (Maithili)";
		document.test.tbook.options[21].value="textbook.php?fmtky1=0-5"
		document.test.tbook.options[22].text="Khel Yatra (Gujarati)";
		document.test.tbook.options[22].value="textbook.php?fgjky1=0-5"
		document.test.tbook.options[23].text="Jismani Taleem aur Tandurusti";
		document.test.tbook.options[23].value="textbook.php?fukl1=0-5"
		
		
		
						
	}



 else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Poorvi";
		document.test.tbook.options[1].value="textbook.php?fepr1=0-5"		
		//document.test.tbook.options[1].text="Honeysuckle";
		//document.test.tbook.options[1].value="textbook.php?fehl1=0-8"		
		//document.test.tbook.options[2].text="A Pact With The Sun";
		//document.test.tbook.options[2].value="textbook.php?fepw1=0-7"
						
	}
 else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Ganita Prakash";
		document.test.tbook.options[1].value="textbook.php?fegp1=0-10"	
		document.test.tbook.options[2].text="Ganita Prakash (Hindi)";
		document.test.tbook.options[2].value="textbook.php?fhgp1=0-10"
		document.test.tbook.options[3].text="Ganita Prakash (Odia)";
		document.test.tbook.options[3].value="textbook.php?forgp1=0-10"
document.test.tbook.options[4].text="Ganita Prakash (Bodo)";
		document.test.tbook.options[4].value="textbook.php?fbdgp1=0-10"		
		document.test.tbook.options[5].text="Ganita Prakash (Malayalam)";
		document.test.tbook.options[5].value="textbook.php?fmlgp1=0-10"	
		document.test.tbook.options[6].text="Ganita Prakash (Punjabi)";
		document.test.tbook.options[6].value="textbook.php?fpngp1=0-10"
document.test.tbook.options[7].text="Ganita Prakash (Sanskrit)";
		document.test.tbook.options[7].value="textbook.php?fskgp1=0-10"
	document.test.tbook.options[8].text="Ganita Prakash (Kannada)";
		document.test.tbook.options[8].value="textbook.php?fkngp1=0-10"
		document.test.tbook.options[9].text="Ganita Prakash (Tamil)";
		document.test.tbook.options[9].value="textbook.php?ftmgp1=0-10"
		document.test.tbook.options[10].text="Ganita Prakash (Marathi)";
		document.test.tbook.options[10].value="textbook.php?fmrgp1=0-10"
		document.test.tbook.options[11].text="Ganita Prakash (Bengali)";
		document.test.tbook.options[11].value="textbook.php?fbngp1=0-10"
		document.test.tbook.options[12].text="Ganita Prakash (Telugu)";
		document.test.tbook.options[12].value="textbook.php?ftlgp1=0-10"
		document.test.tbook.options[13].text="Ganita Prakash (Maithili)";
		document.test.tbook.options[13].value="textbook.php?fmtgp1=0-10"
		document.test.tbook.options[14].text="Ganita Prakash (Dogri)";
		document.test.tbook.options[14].value="textbook.php?fdggp1=0-10"
		document.test.tbook.options[15].text="Ganita Prakash (Nepali)";
		document.test.tbook.options[15].value="textbook.php?fnpgp1=0-10"
		document.test.tbook.options[16].text="Ganita Prakash (Urdu)";
		document.test.tbook.options[16].value="textbook.php?fugp1=0-10"
		document.test.tbook.options[17].text="Ganita Prakash (Assamese)";
		document.test.tbook.options[17].value="textbook.php?fasgp1=0-10"
		document.test.tbook.options[18].text="Ganita Prakash (Gujarati)";
		document.test.tbook.options[18].value="textbook.php?fgjgp1=0-10"
		document.test.tbook.options[19].text="Ganita Prakash (Manipuri)";
		document.test.tbook.options[19].value="textbook.php?fmngp1=0-10"
		document.test.tbook.options[20].text="Ganita Prakash (Konkani)";
		document.test.tbook.options[20].value="textbook.php?fkogp1=0-10"
		document.test.tbook.options[21].text="Ganita Prakash (Santhali)";
		document.test.tbook.options[21].value="textbook.php?fsngp1=0-10"
		document.test.tbook.options[22].text="Ganita Prakash (Sindhi)";
		document.test.tbook.options[22].value="textbook.php?fsigp1=0-10"
		document.test.tbook.options[23].text="Ganita Prakash (Kashmiri)";
		document.test.tbook.options[23].value="textbook.php?fksgp1=0-10"
		
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?feep1=0-9"
		//document.test.tbook.options[5].text="Exemplar Problem(Hindi)";
		//document.test.tbook.options[5].value="textbook.php?fhep1=0-9"
		
						
	}
 else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Social Science"))
	{
		//document.test.tbook.options[0].text="..Select Book Title..";
		//document.test.tbook.options[1].text="History - Our Past";
		//document.test.tbook.options[1].value="textbook.php?fess1=0-10"		
		//document.test.tbook.options[2].text="The Earth Our Habitat";
		//document.test.tbook.options[2].value="textbook.php?fess2=0-6"		
		//document.test.tbook.options[3].text="Hamare Ateet";
		//document.test.tbook.options[3].value="textbook.php?fhss1=0-10"
		//document.test.tbook.options[4].text="Social And Political Life";
		//document.test.tbook.options[4].value="textbook.php?fess3=0-8"
		//document.test.tbook.options[5].text="Samajik Evem Rajnitik Jeevan";
		//document.test.tbook.options[5].value="textbook.php?fhss3=0-8"						
		//document.test.tbook.options[6].text="Prithavi Hamara Avas (Bhugol)";
		//document.test.tbook.options[6].value="textbook.php?fhss2=0-6"
		//document.test.tbook.options[7].text="Hamare Mazi(Urdu)";
		//document.test.tbook.options[7].value="textbook.php?fuhm1=0-11"
		//document.test.tbook.options[8].text="Zameen Hamara Maskan(Urdu)";
		//document.test.tbook.options[8].value="textbook.php?fuzm1=0-8"
		//document.test.tbook.options[9].text="Samazi Aur Siyasi Zindagi(Urdu)";
		//document.test.tbook.options[9].value="textbook.php?fuss1=0-9"	
		document.test.tbook.options[1].text="Exploring Society India and Beyond";
		document.test.tbook.options[1].value="textbook.php?fees1=0-14"
		document.test.tbook.options[2].text="Samaj Ka Aadhyan: Bharat or uske aage";
		document.test.tbook.options[2].value="textbook.php?fhes1=0-14"
		document.test.tbook.options[3].text="Exploring Society India and Beyond (Kannada)";
		document.test.tbook.options[3].value="textbook.php?fknes1=0-14"
		document.test.tbook.options[4].text="Exploring Society India and Beyond (Kashmiri)";
		document.test.tbook.options[4].value="textbook.php?fkses1=0-14"
		document.test.tbook.options[5].text="Exploring Society India and Beyond (Odia)";
		document.test.tbook.options[5].value="textbook.php?fores1=0-14"
		document.test.tbook.options[6].text="Exploring Society India and Beyond (Manipuri)";
		document.test.tbook.options[6].value="textbook.php?fmnes1=0-14"
		document.test.tbook.options[7].text="Exploring Society India and Beyond (Marathi)";
		document.test.tbook.options[7].value="textbook.php?fmres1=0-14"
		document.test.tbook.options[8].text="Exploring Society India and Beyond (Punjabi)";
		document.test.tbook.options[8].value="textbook.php?fpnes1=0-14"
		document.test.tbook.options[9].text="Exploring Society India and Beyond (Dogri)";
		document.test.tbook.options[9].value="textbook.php?fdges1=0-14"
		document.test.tbook.options[10].text="Exploring Society India and Beyond (Gujrati)";
		document.test.tbook.options[10].value="textbook.php?fgjes1=0-14"
		document.test.tbook.options[11].text="Exploring Society India and Beyond (Malayalam)";
		document.test.tbook.options[11].value="textbook.php?fmles1=0-14"
		document.test.tbook.options[12].text="Exploring Society India and Beyond (Sanskrit)";
		document.test.tbook.options[12].value="textbook.php?fskes1=0-14"
		document.test.tbook.options[13].text="Exploring Society India and Beyond (Bengali)";
		document.test.tbook.options[13].value="textbook.php?fbnes1=0-14"
		document.test.tbook.options[14].text="Exploring Society India and Beyond (Bodo)";
		document.test.tbook.options[14].value="textbook.php?fbdes1=0-14"
		document.test.tbook.options[15].text="Exploring Society India and Beyond (Maithili)";
		document.test.tbook.options[15].value="textbook.php?fmtes1=0-14"
		document.test.tbook.options[16].text="Exploring Society India and Beyond (Nepali)";
		document.test.tbook.options[16].value="textbook.php?fnpes1=0-14"
		document.test.tbook.options[17].text="Exploring Society India and Beyond (Tamil)";
		document.test.tbook.options[17].value="textbook.php?ftmes1=0-14"
		document.test.tbook.options[18].text="Exploring Society India and Beyond (Telugu)";
		document.test.tbook.options[18].value="textbook.php?ftles1=0-14"
		document.test.tbook.options[19].text="Muashre Ki Daryaft Hindustan aur Us Se Aage (Urdu)";
		document.test.tbook.options[19].value="textbook.php?fues1=0-14"
			document.test.tbook.options[20].text="Exploring Society India and Beyond (Santhali)";
		document.test.tbook.options[20].value="textbook.php?fsnes1=0-14"
		document.test.tbook.options[21].text="Exploring Society India and Beyond (Assamese)";
		document.test.tbook.options[21].value="textbook.php?fases1=0-14"
		document.test.tbook.options[22].text="Exploring Society India and Beyond (Konkani)";
		document.test.tbook.options[22].value="textbook.php?fkoes1=0-14"
		document.test.tbook.options[23].text="Exploring Society India and Beyond (Sindhi)";
		document.test.tbook.options[23].value="textbook.php?fsies1=0-14"


		

		

	}
else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Sanskrit"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Deepakam";
		document.test.tbook.options[1].value="textbook.php?fsde1=0-16"
					
	}
	
	else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Curiosity";
		document.test.tbook.options[1].value="textbook.php?fecu1=0-12"
		document.test.tbook.options[2].text="Jigyasa";
		document.test.tbook.options[2].value="textbook.php?fhcu1=0-12"
		document.test.tbook.options[3].text="Tajassus";
		document.test.tbook.options[3].value="textbook.php?fucu1=0-12"
		document.test.tbook.options[4].text="Curiosity (Malayalam)";
		document.test.tbook.options[4].value="textbook.php?fmlcu1=0-12"	
		document.test.tbook.options[5].text="Curiosity (Tamil)";
		document.test.tbook.options[5].value="textbook.php?ftmcu1=0-12"
		document.test.tbook.options[6].text="Curiosity (Kannada)";
		document.test.tbook.options[6].value="textbook.php?fkncu1=0-12"
		document.test.tbook.options[7].text="Curiosity (Maithili)";
		document.test.tbook.options[7].value="textbook.php?fmtcu1=0-12"	
		document.test.tbook.options[8].text="Curiosity (Punjabi)";
		document.test.tbook.options[8].value="textbook.php?fpncu1=0-12"	
		document.test.tbook.options[9].text="Curiosity (Bengali)";
		document.test.tbook.options[9].value="textbook.php?fbncu1=0-12"	
		document.test.tbook.options[10].text="Curiosity (Odia)";
		document.test.tbook.options[10].value="textbook.php?forcu1=0-12"
		document.test.tbook.options[11].text="Curiosity (Konkani)";
		document.test.tbook.options[11].value="textbook.php?fkocu1=0-12"	
		document.test.tbook.options[12].text="Curiosity (Manipuri)";
		document.test.tbook.options[12].value="textbook.php?fmncu1=0-12"	
		document.test.tbook.options[13].text="Curiosity (Nepali)";
		document.test.tbook.options[13].value="textbook.php?fnpcu1=0-12"	
		document.test.tbook.options[14].text="Curiosity (Sanskrit)";
		document.test.tbook.options[14].value="textbook.php?fskcu1=0-12"	
		document.test.tbook.options[15].text="Curiosity (Telugu)";
		document.test.tbook.options[15].value="textbook.php?ftlcu1=0-12"
		document.test.tbook.options[16].text="Curiosity (Assamese)";
		document.test.tbook.options[16].value="textbook.php?fascu1=0-12"
		document.test.tbook.options[17].text="Curiosity (Marathi)";
		document.test.tbook.options[17].value="textbook.php?fmrcu1=0-12"
		document.test.tbook.options[18].text="Curiosity (Bodo)";
		document.test.tbook.options[18].value="textbook.php?fbdcu1=0-12"
	document.test.tbook.options[19].text="Curiosity (Dogri)";
		document.test.tbook.options[19].value="textbook.php?fdgcu1=0-12"
document.test.tbook.options[20].text="Curiosity (Gujarati)";
		document.test.tbook.options[20].value="textbook.php?fgjcu1=0-12"
		document.test.tbook.options[21].text="Curiosity (Santhali)";
		document.test.tbook.options[21].value="textbook.php?fsncu1=0-12"
		document.test.tbook.options[22].text="Curiosity (Kashmiri)";
		document.test.tbook.options[22].value="textbook.php?fkscu1=0-12"
		document.test.tbook.options[23].text="Curiosity (Sindhi)";
		document.test.tbook.options[23].value="textbook.php?fsicu1=0-12"
	
		
		//document.test.tbook.options[1].text="Vigyan";
		//document.test.tbook.options[1].value="textbook.php?fhsc1=0-11"		
		//document.test.tbook.options[2].text="Science";
		//document.test.tbook.options[2].value="textbook.php?fesc1=0-11"
		//document.test.tbook.options[3].text="science-VI(Urdu)";
		//document.test.tbook.options[3].value="textbook.php?fuse1=0-16"
		//document.test.tbook.options[4].text="Exemplar Problem";
		//document.test.tbook.options[4].value="textbook.php?feep2=0-16"
			
					
	}

	else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Arts"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Kriti-I";
		document.test.tbook.options[1].value="textbook.php?fekr1=0-22"
		document.test.tbook.options[2].text="Kriti-I (Hindi)";
		document.test.tbook.options[2].value="textbook.php?fhkr1=0-22";
		document.test.tbook.options[3].text="Kriti-I (Bengali)";
		document.test.tbook.options[3].value="textbook.php?fbnkr1=0-22"
		document.test.tbook.options[4].text="Kriti-I (Konkani)";
		document.test.tbook.options[4].value="textbook.php?fkokr1=0-22"
		document.test.tbook.options[5].text="Kriti-I (Bodo)";
		document.test.tbook.options[5].value="textbook.php?fbdkr1=0-22"
		document.test.tbook.options[6].text="Kriti-I (Maithili)";
		document.test.tbook.options[6].value="textbook.php?fmtkr1=0-22"
		document.test.tbook.options[7].text="Kriti-I (Manipuri)";
		document.test.tbook.options[7].value="textbook.php?fmnkr1=0-22"
		document.test.tbook.options[8].text="Kriti-I (Assamese)";
		document.test.tbook.options[8].value="textbook.php?faskr1=0-22"
		document.test.tbook.options[9].text="Kriti-I (Dogri)";
		document.test.tbook.options[9].value="textbook.php?fdgkr1=0-22"
		document.test.tbook.options[9].value="textbook.php?fdgkr1=0-22"
		document.test.tbook.options[10].text="Kriti-I (Odia)";
		document.test.tbook.options[10].value="textbook.php?forkr1=0-22"
		document.test.tbook.options[11].text="Kriti-I (Tamil)";
		document.test.tbook.options[11].value="textbook.php?ftmkr1=0-22"
		document.test.tbook.options[12].text="Kriti-I (Gujarati)";
		document.test.tbook.options[12].value="textbook.php?fgjkr1=0-22"
		document.test.tbook.options[13].text="Kriti-I (Kannada)";
		document.test.tbook.options[13].value="textbook.php?fknkr1=0-22"
		document.test.tbook.options[14].text="Kriti-I (Malayalam)";
		document.test.tbook.options[14].value="textbook.php?fmlkr1=0-22"
		document.test.tbook.options[15].text="Kriti-I (Marathi)";
		document.test.tbook.options[15].value="textbook.php?fmrkr1=0-22"
		document.test.tbook.options[16].text="Kriti-I (Sanskrit)";
		document.test.tbook.options[16].value="textbook.php?fskkr1=0-22"
		document.test.tbook.options[17].text="Kriti-I (Nepali)";
		document.test.tbook.options[17].value="textbook.php?fnpkr1=0-22"
		document.test.tbook.options[18].text="Kriti-I (Punjabi)";
		document.test.tbook.options[18].value="textbook.php?fpnkr1=0-22"
		document.test.tbook.options[19].text="Kriti-I (Telugu)";
		document.test.tbook.options[19].value="textbook.php?ftlkr1=0-22"
		document.test.tbook.options[20].text="Kriti-I (Kashmiri)";
		document.test.tbook.options[20].value="textbook.php?fkskr1=0-22"
		document.test.tbook.options[21].text="Kriti-I (Sindhi)";
		document.test.tbook.options[21].value="textbook.php?fsikr1=0-22"
			document.test.tbook.options[22].text="Kriti-I (Santhali)";
		document.test.tbook.options[22].value="textbook.php?fsnkr1=0-22"
			
					
	}

	else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Khayal";
		document.test.tbook.options[1].value="textbook.php?fuky1=0-14"	
		
		
		
		
		//document.test.tbook.options[1].text="Apni Zuban-VI";
		//document.test.tbook.options[1].value="textbook.php?fuaz1=0-20"	
		//document.test.tbook.options[2].text="Urdu Guldasta";
		//document.test.tbook.options[2].value="textbook.php?fuug1=0-10"
		//document.test.tbook.options[3].text="Jaan Pahechan ";
		//document.test.tbook.options[3].value="textbook.php?fujp1=0-32"	
		//document.test.tbook.options[2].text="Riyazi-VI";
		//document.test.tbook.options[2].value="textbook.php?furi1=0-14"
		//document.test.tbook.options[3].text="science-VI";
		//document.test.tbook.options[3].value="textbook.php?fuse1=0-16"
		//document.test.tbook.options[4].text="Hamare Mazi";
		//document.test.tbook.options[4].value="textbook.php?fuhm1=0-12"
		//document.test.tbook.options[5].text="Zameen Hamara Maskan";
		//document.test.tbook.options[5].value="textbook.php?fuzm1=0-8"
		//document.test.tbook.options[6].text="Samazi Aur Siyasi Zindagi";
		//document.test.tbook.options[6].value="textbook.php?fuss1=0-8"-->
		
					
	}

	/*else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Punjabi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Satluj";
		document.test.tbook.options[1].value="textbook.php?fpunjabi1=0-19"						
	}
	
	else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Santhali"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Sobornakha";
		document.test.tbook.options[1].value="textbook.php?fsanthali1=0-11"						
	}
	
	else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Tamil"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Tamil";
		document.test.tbook.options[1].value="textbook.php?ftami1=0-13"						
	}
	
	else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Malayalam"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Malayalam";
		document.test.tbook.options[1].value="textbook.php?fmaly1=0-10"						
	}
	
	else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Nepali"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Nepali";
		document.test.tbook.options[1].value="textbook.php?fnepa1=0-13"						
	}
	
	else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Kannada"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Kannada";
		document.test.tbook.options[1].value="textbook.php?fkannada1=0-11"						
	}
	
	else if((document.test.tclass.value==6) && (document.test.tsubject.options[sind].text=="Marathi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Marathi";
		document.test.tbook.options[1].value="textbook.php?fmargod1=0-10"						
	}*/


	

	// else if((document.test.tclass.value==7) && (document.test.tsubject.options[sind].text=="Class 7"))
	// {
	// 	document.test.tbook.options[0].text="..Select Book Title..";
	// 	document.test.tbook.options[1].text="Class 7";
	// 	document.test.tbook.options[1].value="textbook.php?class4=0-1"	
		
				
	// }
	else if((document.test.tclass.value==7) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Ganita Prakash";
		document.test.tbook.options[1].value="textbook.php?gegp1=0-8"
		document.test.tbook.options[2].text="Ganita Prakash-II";
		document.test.tbook.options[2].value="textbook.php?gegp2=0-7"
		document.test.tbook.options[3].text="Ganita Prakash(Hindi)";
		document.test.tbook.options[3].value="textbook.php?ghgp1=0-8"
		document.test.tbook.options[4].text="Ganita Prakash(Urdu)";
		document.test.tbook.options[4].value="textbook.php?gugp1=0-8"
		document.test.tbook.options[5].text="Ganita Prakash(Bengali)";
		document.test.tbook.options[5].value="textbook.php?gbngp1=0-8"
		document.test.tbook.options[6].text="Ganita Prakash(Gujarati)";
		document.test.tbook.options[6].value="textbook.php?ggjgp1=0-8"
		document.test.tbook.options[7].text="Ganita Prakash(Punjabi)";
		document.test.tbook.options[7].value="textbook.php?gpngp1=0-8"
		document.test.tbook.options[8].text="Ganita Prakash(Nepali)";
		document.test.tbook.options[8].value="textbook.php?gnpgp1=0-8"
		document.test.tbook.options[9].text="Ganita Prakash(Dogri)";
		document.test.tbook.options[9].value="textbook.php?gdggp1=0-8"
		document.test.tbook.options[10].text="Ganita Prakash(Tamil)";
		document.test.tbook.options[10].value="textbook.php?gtmgp1=0-8"
		document.test.tbook.options[11].text="Ganita Prakash(Telugu)";
		document.test.tbook.options[11].value="textbook.php?gtlgp1=0-8"
		document.test.tbook.options[12].text="Ganita Prakash(Marathi)";
		document.test.tbook.options[12].value="textbook.php?gmrgp1=0-8"
		document.test.tbook.options[13].text="Ganita Prakash(Kannada)";
		document.test.tbook.options[13].value="textbook.php?gkngp1=0-8"
		document.test.tbook.options[14].text="Ganita Prakash(Bodo)";
		document.test.tbook.options[14].value="textbook.php?gbdgp1=0-8"
		document.test.tbook.options[15].text="Ganita Prakash(Odia)";
		document.test.tbook.options[15].value="textbook.php?gorgp1=0-8"
		document.test.tbook.options[16].text="Ganita Prakash(Assamese)";
		document.test.tbook.options[16].value="textbook.php?gasgp1=0-8"
		document.test.tbook.options[17].text="Ganita Prakash(Konkani)";
		document.test.tbook.options[17].value="textbook.php?gkogp1=0-8"
		document.test.tbook.options[18].text="Ganita Prakash(Manipuri)";
		document.test.tbook.options[18].value="textbook.php?gmngp1=0-8"
		document.test.tbook.options[19].text="Ganita Prakash(Sanskrit)";
		document.test.tbook.options[19].value="textbook.php?gskgp1=0-8"
		document.test.tbook.options[20].text="Ganita Prakash(Sindhi)";
		document.test.tbook.options[20].value="textbook.php?gsigp1=0-8"
		document.test.tbook.options[21].text="Ganita Prakash(Kashmiri)";
		document.test.tbook.options[21].value="textbook.php?gksgp1=0-8"
		document.test.tbook.options[22].text="Ganita Prakash(Maithili)";
		document.test.tbook.options[22].value="textbook.php?gmtgp1=0-8"
		document.test.tbook.options[23].text="Ganita Prakash(Malayalam)";
		document.test.tbook.options[23].value="textbook.php?gmlgp1=0-8"
		document.test.tbook.options[24].text="Ganita Prakash(Santhali)";
		document.test.tbook.options[24].value="textbook.php?gsngp1=0-8"
		
		
		
		
		
		
		<!-------------------------------------!>
		document.test.tbook.options[25].text="Ganita Prakash-II (Gujarati)";
		document.test.tbook.options[25].value="textbook.php?ggjgp2=0-7"
		document.test.tbook.options[26].text="Ganita Prakash-II (Kannada)";
		document.test.tbook.options[26].value="textbook.php?gkngp2=0-7"
		document.test.tbook.options[27].text="Ganita Prakash-II (Marathi)";
		document.test.tbook.options[27].value="textbook.php?gmrgp2=0-7"
		document.test.tbook.options[28].text="Ganita Prakash-II (Odia)";
		document.test.tbook.options[28].value="textbook.php?gorgp2=0-7"
		document.test.tbook.options[29].text="Ganita Prakash-II (Punjabi)";
		document.test.tbook.options[29].value="textbook.php?gpngp2=0-7"
		document.test.tbook.options[30].text="Ganita Prakash-II (Assamese)";
		document.test.tbook.options[30].value="textbook.php?gasgp2=0-7"
		document.test.tbook.options[31].text="Ganita Prakash-II (Bengali)";
		document.test.tbook.options[31].value="textbook.php?gbngp2=0-7"
		document.test.tbook.options[32].text="Ganita Prakash-II (Tamil)";
		document.test.tbook.options[32].value="textbook.php?gtmgp2=0-7"
		document.test.tbook.options[33].text="Ganita Prakash-II (Malayalam)";
		document.test.tbook.options[33].value="textbook.php?gmlgp2=0-7"
			document.test.tbook.options[34].text="Ganita Prakash-II (Telugu)";
		document.test.tbook.options[34].value="textbook.php?gtlgp2=0-7"
		
		
		
		
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?gemp1=0-13"

		
					
	}

	else if((document.test.tclass.value==7) && (document.test.tsubject.options[sind].text=="Arts"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Kriti";
		document.test.tbook.options[1].value="textbook.php?gekr1=0-20"
		document.test.tbook.options[2].text="Kriti-I (Hindi)";
		document.test.tbook.options[2].value="textbook.php?ghkr1=0-20";
		document.test.tbook.options[3].text="Kriti-I (Bengali)";
		document.test.tbook.options[3].value="textbook.php?gbnkr1=0-20";
		document.test.tbook.options[4].text="Kriti-I (Punjabi)";
		document.test.tbook.options[4].value="textbook.php?gpnkr1=0-20";
		document.test.tbook.options[5].text="Kriti-I (Sanskrit)";
		document.test.tbook.options[5].value="textbook.php?gskkr1=0-20";
		document.test.tbook.options[6].text="Kriti-I (Kannada)";
		document.test.tbook.options[6].value="textbook.php?gknkr1=0-20";
		document.test.tbook.options[7].text="Kriti-I (Odia)";
		document.test.tbook.options[7].value="textbook.php?gorkr1=0-20";
		document.test.tbook.options[8].text="Kriti-I (Marathi)";
		document.test.tbook.options[8].value="textbook.php?gmrkr1=0-20";
		document.test.tbook.options[9].text="Kriti-I (Dogri)";
		document.test.tbook.options[9].value="textbook.php?gdgkr1=0-20";
		document.test.tbook.options[10].text="Kriti-I (Bodo)";
		document.test.tbook.options[10].value="textbook.php?gbdkr1=0-20";
		document.test.tbook.options[11].text="Kriti-I (Gujarati)";
		document.test.tbook.options[11].value="textbook.php?ggjkr1=0-20";
		document.test.tbook.options[12].text="Kriti-I (Konkani)";
		document.test.tbook.options[12].value="textbook.php?gkokr1=0-20";
		document.test.tbook.options[13].text="Kriti-I (Assamese)";
		document.test.tbook.options[13].value="textbook.php?gaskr1=0-20";
		document.test.tbook.options[14].text="Kriti-I (Maithili)";
		document.test.tbook.options[14].value="textbook.php?gmtkr1=0-20";
		document.test.tbook.options[15].text="Kriti-I (Santhali)";
		document.test.tbook.options[15].value="textbook.php?gsnkr1=0-20";
		document.test.tbook.options[16].text="Kriti-I (Tamil)";
		document.test.tbook.options[16].value="textbook.php?gtmkr1=0-20";
		document.test.tbook.options[17].text="Kriti-I (Nepali)";
		document.test.tbook.options[17].value="textbook.php?gnpkr1=0-20";
		document.test.tbook.options[18].text="Kriti-I (Sindhi)";
		document.test.tbook.options[18].value="textbook.php?gsikr1=0-20";
		document.test.tbook.options[19].text="Kriti-I (Telugu)";
		document.test.tbook.options[19].value="textbook.php?gsikr1=0-20";
		document.test.tbook.options[20].text="Kriti-I (Manipuri)";
		document.test.tbook.options[20].value="textbook.php?gmnkr1=0-20";
		document.test.tbook.options[21].text="Kriti-I (Malayalam)";
		document.test.tbook.options[21].value="textbook.php?gmlkr1=0-20";
		document.test.tbook.options[22].text="Kriti-I (Kashmiri)";
		document.test.tbook.options[22].value="textbook.php?gkskr1=0-20";
		
		
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?gemp1=0-13"

		
					
	}

	else if((document.test.tclass.value==7) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Malhar";
		document.test.tbook.options[1].value="textbook.php?ghml1=0-10"
		
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?gemp1=0-13"

		
					
	}

	else if((document.test.tclass.value==7) && (document.test.tsubject.options[sind].text=="Sanskrit"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Deepakam";
		document.test.tbook.options[1].value="textbook.php?gsde1=0-15"
		
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?gemp1=0-13"

		
					
	}

	else if((document.test.tclass.value==7) && (document.test.tsubject.options[sind].text=="Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Curiosity";
		document.test.tbook.options[1].value="textbook.php?gecu1=0-12"
		document.test.tbook.options[2].text="Jigyasa";
		document.test.tbook.options[2].value="textbook.php?ghcu1=0-12"
		document.test.tbook.options[3].text="Tajassus";
		document.test.tbook.options[3].value="textbook.php?gucu1=0-12"
		document.test.tbook.options[4].text="Curiosity (Marathi)";
		document.test.tbook.options[4].value="textbook.php?gmrcu1=0-12"
		document.test.tbook.options[5].text="Curiosity (Odia)";
		document.test.tbook.options[5].value="textbook.php?gorcu1=0-12"
		document.test.tbook.options[6].text="Curiosity (Bengali)";
		document.test.tbook.options[6].value="textbook.php?gbncu1=0-12"
		document.test.tbook.options[7].text="Curiosity (Punjabi)";
		document.test.tbook.options[7].value="textbook.php?gpncu1=0-12"
		document.test.tbook.options[8].text="Curiosity (Assamese)";
		document.test.tbook.options[8].value="textbook.php?gascu1=0-12"
		document.test.tbook.options[9].text="Curiosity (Tamil)";
		document.test.tbook.options[9].value="textbook.php?gtmcu1=0-12"
		document.test.tbook.options[10].text="Curiosity (Nepali)";
		document.test.tbook.options[10].value="textbook.php?gnpcu1=0-12"
		document.test.tbook.options[11].text="Curiosity (Manipuri)";
		document.test.tbook.options[11].value="textbook.php?gmncu1=0-12"
		document.test.tbook.options[12].text="Curiosity (Telugu)";
		document.test.tbook.options[12].value="textbook.php?gtlcu1=0-12"
		document.test.tbook.options[13].text="Curiosity (Bodo)";
		document.test.tbook.options[13].value="textbook.php?gbdcu1=0-12"
		document.test.tbook.options[14].text="Curiosity (Santhali)";
		document.test.tbook.options[14].value="textbook.php?gsncu1=0-12"
		document.test.tbook.options[15].text="Curiosity (Kannada)";
		document.test.tbook.options[15].value="textbook.php?gkncu1=0-12"
		document.test.tbook.options[16].text="Curiosity (Dogri)";
		document.test.tbook.options[16].value="textbook.php?gdgcu1=0-12"
		document.test.tbook.options[17].text="Curiosity (Konkani)";
		document.test.tbook.options[17].value="textbook.php?gkocu1=0-12"
		document.test.tbook.options[18].text="Curiosity (Kashmiri)";
		document.test.tbook.options[18].value="textbook.php?gkscu1=0-12"
		document.test.tbook.options[19].text="Curiosity (Malayalam)";
		document.test.tbook.options[19].value="textbook.php?gmlcu1=0-12"
		document.test.tbook.options[20].text="Curiosity (Maithili)";
		document.test.tbook.options[20].value="textbook.php?gmtcu1=0-12"
		document.test.tbook.options[21].text="Curiosity (Sanskrit)";
		document.test.tbook.options[21].value="textbook.php?gskcu1=0-12"
		document.test.tbook.options[22].text="Curiosity (Sindhi)";
		document.test.tbook.options[22].value="textbook.php?gsicu1=0-12"
		document.test.tbook.options[23].text="Curiosity (Gujarati)";
		document.test.tbook.options[23].value="textbook.php?ggjcu1=0-12"
	
		
		
		
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?gemp1=0-13"

		
					
	}



	else if((document.test.tclass.value==7) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Poorvi";
		document.test.tbook.options[1].value="textbook.php?gepr1=0-5"
		
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?gemp1=0-13"

		
					
	}

	else if((document.test.tclass.value==7) && (document.test.tsubject.options[sind].text=="Social Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Exploring Society India and Beyond Part-I";
		document.test.tbook.options[1].value="textbook.php?gees1=0-12"
		document.test.tbook.options[2].text="Samaj Ka Aadhyan: Bharat or uske aage Part-I";
		document.test.tbook.options[2].value="textbook.php?ghes1=0-12"
        document.test.tbook.options[3].text="Exploring Society India and Beyond Part-II";
		document.test.tbook.options[3].value="textbook.php?gees2=0-8"
		document.test.tbook.options[4].text="Samaj Ka Aadhyan: Bharat or uske aage Part-II";
		document.test.tbook.options[4].value="textbook.php?ghes2=0-8"
		document.test.tbook.options[5].text="Muashrey ki Daryaft - Hindustan aur Uske age Part-I";
		document.test.tbook.options[5].value="textbook.php?gues1=0-12" 
		document.test.tbook.options[6].text="Muashrey ki Daryaft - Hindustan aur Uske age Part-II";
		document.test.tbook.options[6].value="textbook.php?gues2=0-8"
		document.test.tbook.options[7].text="Exploring Society India and Beyond Part-I (Odia)";
		document.test.tbook.options[7].value="textbook.php?gores1=0-12"
		document.test.tbook.options[8].text="Exploring Society India and Beyond Part-I (Marathi)";
		document.test.tbook.options[8].value="textbook.php?gmres1=0-12"
		document.test.tbook.options[9].text="Exploring Society India and Beyond Part-I (Punjabi)";
		document.test.tbook.options[9].value="textbook.php?gpnes1=0-12"
		document.test.tbook.options[10].text="Exploring Society India and Beyond Part-I (Konkani)";
		document.test.tbook.options[10].value="textbook.php?gkoes1=0-12"
		document.test.tbook.options[11].text="Exploring Society India and Beyond Part-I (Malayalam)";
		document.test.tbook.options[11].value="textbook.php?gmles1=0-12"
		document.test.tbook.options[12].text="Exploring Society India and Beyond Part-I (Kannada)";
		document.test.tbook.options[12].value="textbook.php?gknes1=0-12"
		document.test.tbook.options[13].text="Exploring Society India and Beyond Part-I (Dogri)";
		document.test.tbook.options[13].value="textbook.php?gdges1=0-12"
		document.test.tbook.options[14].text="Exploring Society India and Beyond Part-I (Manipuri)";
		document.test.tbook.options[14].value="textbook.php?gmnes1=0-12"
		document.test.tbook.options[15].text="Exploring Society India and Beyond Part-I (Nepali)";
		document.test.tbook.options[15].value="textbook.php?gnpes1=0-12"
		document.test.tbook.options[16].text="Exploring Society India and Beyond Part-I (Sanskrit)";
		document.test.tbook.options[16].value="textbook.php?gskes1=0-12"
		document.test.tbook.options[17].text="Exploring Society India and Beyond Part-I (Maithili)";
		document.test.tbook.options[17].value="textbook.php?gmtes1=0-12"
		document.test.tbook.options[18].text="Exploring Society India and Beyond Part-I (Assamese)";
		document.test.tbook.options[18].value="textbook.php?gases1=0-12"
		document.test.tbook.options[19].text="Exploring Society India and Beyond Part-I (Bengali)";
		document.test.tbook.options[19].value="textbook.php?gbnes1=0-12"
		document.test.tbook.options[20].text="Exploring Society India and Beyond Part-I (Bodo)";
		document.test.tbook.options[20].value="textbook.php?gbdes1=0-12"
		document.test.tbook.options[21].text="Exploring Society India and Beyond Part-I (Gujarati)";
		document.test.tbook.options[21].value="textbook.php?ggjes1=0-12"
		document.test.tbook.options[22].text="Exploring Society India and Beyond Part-I (Tamil)";
		document.test.tbook.options[22].value="textbook.php?gtmes1=0-12"
		document.test.tbook.options[23].text="Exploring Society India and Beyond Part-I (Santhali)";
		document.test.tbook.options[23].value="textbook.php?gsnes1=0-12"
		document.test.tbook.options[24].text="Exploring Society India and Beyond Part-I (Sindhi)";
		document.test.tbook.options[24].value="textbook.php?gsies1=0-12"
		document.test.tbook.options[25].text="Exploring Society India and Beyond Part-I (Telugu)";
		document.test.tbook.options[25].value="textbook.php?gtles1=0-12"
		document.test.tbook.options[26].text="Exploring Society India and Beyond Part-I (Kashmiri)";
		document.test.tbook.options[26].value="textbook.php?gkses1=0-12"
		<!----------------------------!>
		document.test.tbook.options[27].text="Exploring Society India and Beyond Part-II (Gujarati)";
		document.test.tbook.options[27].value="textbook.php?ggjes2=0-8"
		document.test.tbook.options[28].text="Exploring Society India and Beyond Part-II (Kannada)";
		document.test.tbook.options[28].value="textbook.php?gknes2=0-8"
		document.test.tbook.options[29].text="Exploring Society India and Beyond Part-II (Odia)";
		document.test.tbook.options[29].value="textbook.php?gores2=0-8"
		document.test.tbook.options[30].text="Exploring Society India and Beyond Part-II (Punjabi)";
		document.test.tbook.options[30].value="textbook.php?gpnes2=0-8"
		document.test.tbook.options[31].text="Exploring Society India and Beyond Part-II (Bengali)";
		document.test.tbook.options[31].value="textbook.php?gbnes2=0-8"
		document.test.tbook.options[32].text="Exploring Society India and Beyond Part-II (Tamil)";
		document.test.tbook.options[32].value="textbook.php?gtmes2=0-8"
		document.test.tbook.options[33].text="Exploring Society India and Beyond Part-II (Malayalam)";
		document.test.tbook.options[33].value="textbook.php?gmles2=0-8"
		document.test.tbook.options[34].text="Exploring Society India and Beyond Part-II (Assamese)";
		document.test.tbook.options[34].value="textbook.php?gases2=0-8"
		document.test.tbook.options[35].text="Exploring Society India and Beyond Part-II (Marathi)";
		document.test.tbook.options[35].value="textbook.php?gmres2=0-8"
		document.test.tbook.options[36].text="Exploring Society India and Beyond Part-II (Telugu)";
		document.test.tbook.options[36].value="textbook.php?gmres2=0-8"
		
		
		
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?gemp1=0-13"

		
					
	}

	else if((document.test.tclass.value==7) && (document.test.tsubject.options[sind].text=="Physical Education and Well Being"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Khel Yatra";
		document.test.tbook.options[1].value="textbook.php?geky1=0-6"
		document.test.tbook.options[2].text="Khel Yatra (Urdu)";
		document.test.tbook.options[2].value="textbook.php?gukl1=0-6"
		document.test.tbook.options[3].text="Khel Yatra (Hindi)";
		document.test.tbook.options[3].value="textbook.php?ghky1=0-6"
		document.test.tbook.options[4].text="Khel Yatra (Punjabi)";
		document.test.tbook.options[4].value="textbook.php?gpnky1=0-6"
		document.test.tbook.options[5].text="Khel Yatra (Dogri)";
		document.test.tbook.options[5].value="textbook.php?gdgky1=0-6"
		document.test.tbook.options[6].text="Khel Yatra (Santhali)";
		document.test.tbook.options[6].value="textbook.php?gsnky1=0-6"
		document.test.tbook.options[7].text="Khel Yatra (Malayalam)";
		document.test.tbook.options[7].value="textbook.php?gmlky1=0-6"
		document.test.tbook.options[8].text="Khel Yatra (Gujarati)";
		document.test.tbook.options[8].value="textbook.php?ggjky1=0-6"
		document.test.tbook.options[9].text="Khel Yatra (Odia)";
		document.test.tbook.options[9].value="textbook.php?gorky1=0-6"
		document.test.tbook.options[10].text="Khel Yatra (Bengali)";
		document.test.tbook.options[10].value="textbook.php?gbnky1=0-6"
		document.test.tbook.options[11].text="Khel Yatra (Marathi)";
		document.test.tbook.options[11].value="textbook.php?gmrky1=0-6"
		document.test.tbook.options[12].text="Khel Yatra (Konkani)";
		document.test.tbook.options[12].value="textbook.php?gkoky1=0-6"
		document.test.tbook.options[13].text="Khel Yatra (Bodo)";
		document.test.tbook.options[13].value="textbook.php?gbdky1=0-6"
		document.test.tbook.options[14].text="Khel Yatra (Sanskrit)";
		document.test.tbook.options[14].value="textbook.php?gskky1=0-6"
		document.test.tbook.options[15].text="Khel Yatra (Kannada)";
		document.test.tbook.options[15].value="textbook.php?gknky1=0-6"
		document.test.tbook.options[16].text="Khel Yatra (Tamil)";
		document.test.tbook.options[16].value="textbook.php?gtmky1=0-6"
		document.test.tbook.options[17].text="Khel Yatra (Telugu)";
		document.test.tbook.options[17].value="textbook.php?gtlky1=0-6"
		document.test.tbook.options[18].text="Khel Yatra (Manipuri)";
		document.test.tbook.options[18].value="textbook.php?gmnky1=0-6"
		document.test.tbook.options[19].text="Khel Yatra (Nepali)";
		document.test.tbook.options[19].value="textbook.php?gnpky1=0-6"
		document.test.tbook.options[20].text="Khel Yatra (Assamese)";
		document.test.tbook.options[20].value="textbook.php?gnpky1=0-6"
		document.test.tbook.options[21].text="Khel Yatra (Kashmiri)";
		document.test.tbook.options[21].value="textbook.php?gksky1=0-6"
		document.test.tbook.options[22].text="Khel Yatra (Maithili)";
		document.test.tbook.options[22].value="textbook.php?gmtky1=0-6"
		document.test.tbook.options[23].text="Khel Yatra (Sindhi)";
		document.test.tbook.options[23].value="textbook.php?gsiky1=0-6"
		
		
		
		
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?gemp1=0-13"

		
					
	}

	else if((document.test.tclass.value==7) && (document.test.tsubject.options[sind].text=="Vocational Education"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Kaushal Bodh";
		document.test.tbook.options[1].value="textbook.php?gekb1=0-7"
		document.test.tbook.options[2].text="Kaushal Bodh(Hindi)";
		document.test.tbook.options[2].value="textbook.php?ghkb1=0-7"
		document.test.tbook.options[3].text="Kaushal Bodh(Telugu)";
		document.test.tbook.options[3].value="textbook.php?gtlkb1=0-7"
		document.test.tbook.options[4].text="Kaushal Bodh(Odia)";
		document.test.tbook.options[4].value="textbook.php?gorkb1=0-7"
		document.test.tbook.options[5].text="Kaushal Bodh(Punjabi)";
		document.test.tbook.options[5].value="textbook.php?gpnkb1=0-7"
		document.test.tbook.options[6].text="Kaushal Bodh(Gujarati)";
		document.test.tbook.options[6].value="textbook.php?ggjkb1=0-7"
		document.test.tbook.options[7].text="Kaushal Bodh(Tamil)";
		document.test.tbook.options[7].value="textbook.php?gtmkb1=0-7"
		document.test.tbook.options[8].text="Kaushal Bodh(Dogri)";
		document.test.tbook.options[8].value="textbook.php?gdgkb1=0-7"
		document.test.tbook.options[9].text="Kaushal Bodh(Kannada)";
		document.test.tbook.options[9].value="textbook.php?gknkb1=0-7"
		document.test.tbook.options[10].text="Kaushal Bodh(Nepali)";
		document.test.tbook.options[10].value="textbook.php?gnpkb1=0-7"
		document.test.tbook.options[11].text="Kaushal Bodh(Sanskrit)";
		document.test.tbook.options[11].value="textbook.php?gskkb1=0-7"
		document.test.tbook.options[12].text="Kaushal Bodh(Malayalam)";
		document.test.tbook.options[12].value="textbook.php?gmlkb1=0-7"
		document.test.tbook.options[13].text="Kaushal Bodh(Konkani)";
		document.test.tbook.options[13].value="textbook.php?gkokb1=0-7"
		document.test.tbook.options[14].text="Kaushal Bodh(Bengali)";
		document.test.tbook.options[14].value="textbook.php?gbnkb1=0-7"
		document.test.tbook.options[15].text="Kaushal Bodh(Bodo)";
		document.test.tbook.options[15].value="textbook.php?gbdkb1=0-7"
		document.test.tbook.options[16].text="Kaushal Bodh(Kashmiri)";
		document.test.tbook.options[16].value="textbook.php?gkskb1=0-7"
		document.test.tbook.options[17].text="Kaushal Bodh(Maithili)";
		document.test.tbook.options[17].value="textbook.php?gmtkb1=0-7"
		document.test.tbook.options[18].text="Kaushal Bodh(Marathi)";
		document.test.tbook.options[18].value="textbook.php?gmrkb1=0-7"
		document.test.tbook.options[19].text="Kaushal Bodh(Santhali)";
		document.test.tbook.options[19].value="textbook.php?gsnkb1=0-7"
		document.test.tbook.options[20].text="Kaushal Bodh(Assamese)";
		document.test.tbook.options[20].value="textbook.php?gaskb1=0-7"
		document.test.tbook.options[21].text="Kaushal Bodh(Manipuri)";
		document.test.tbook.options[21].value="textbook.php?gmnkb1=0-7"
		document.test.tbook.options[22].text="Kaushal Bodh(Sindhi)";
		document.test.tbook.options[22].value="textbook.php?gsikb1=0-7"
	
		
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?gemp1=0-13"

		
					
	}

	else if((document.test.tclass.value==7) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Khayal";
		document.test.tbook.options[1].value="textbook.php?guky1=0-14"
		
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?gemp1=0-13"

		
					
	}
	



else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Ganita Prakash Part-I";
		document.test.tbook.options[1].value="textbook.php?hegp1=0-7"
		document.test.tbook.options[2].text="Ganita Prakash Part-II";
		document.test.tbook.options[2].value="textbook.php?hegp2=0-7"
		document.test.tbook.options[3].text="Ganita Prakash Part-I (Hindi)";
		document.test.tbook.options[3].value="textbook.php?hhgp1=0-7"
		document.test.tbook.options[4].text="Ganita Prakash Part-I (Urdu)";
		document.test.tbook.options[4].value="textbook.php?hugp1=0-7"
		document.test.tbook.options[5].text="Ganita Prakash Part-I (Punjabi)";
		document.test.tbook.options[5].value="textbook.php?hpngp1=0-7"
		document.test.tbook.options[6].text="Ganita Prakash Part-I (Maithili)";
		document.test.tbook.options[6].value="textbook.php?hmtgp1=0-7"
		document.test.tbook.options[7].text="Ganita Prakash Part-I (Marathi)";
		document.test.tbook.options[7].value="textbook.php?hmrgp1=0-7"
		document.test.tbook.options[8].text="Ganita Prakash Part-I (Bengali)";
		document.test.tbook.options[8].value="textbook.php?hbngp1=0-7"
		document.test.tbook.options[9].text="Ganita Prakash Part-I (Bodo)";
		document.test.tbook.options[9].value="textbook.php?hbdgp1=0-7"
		document.test.tbook.options[10].text="Ganita Prakash Part-I (Nepali)";
		document.test.tbook.options[10].value="textbook.php?hnpgp1=0-7"
		document.test.tbook.options[11].text="Ganita Prakash Part-I (Odia)";
		document.test.tbook.options[11].value="textbook.php?horgp1=0-7"
		document.test.tbook.options[12].text="Ganita Prakash Part-I (Kannada)";
		document.test.tbook.options[12].value="textbook.php?hkngp1=0-7"
		document.test.tbook.options[13].text="Ganita Prakash Part-I (Telugu)";
		document.test.tbook.options[13].value="textbook.php?htlgp1=0-7"
		document.test.tbook.options[14].text="Ganita Prakash Part-I (Dogri)";
		document.test.tbook.options[14].value="textbook.php?hdggp1=0-7"
		document.test.tbook.options[15].text="Ganita Prakash Part-I (Konkani)";
		document.test.tbook.options[15].value="textbook.php?hkogp1=0-7"
		document.test.tbook.options[16].text="Ganita Prakash Part-I (Tamil)";
		document.test.tbook.options[16].value="textbook.php?htmgp1=0-7"
		document.test.tbook.options[17].text="Ganita Prakash Part-I (Kashmiri)";
		document.test.tbook.options[17].value="textbook.php?hksgp1=0-7"
		document.test.tbook.options[18].text="Ganita Prakash Part-I (Manipuri)";
		document.test.tbook.options[18].value="textbook.php?hmngp1=0-7"
		document.test.tbook.options[19].text="Ganita Prakash Part-I (Sanskrit)";
		document.test.tbook.options[19].value="textbook.php?hskgp1=0-7"
		document.test.tbook.options[20].text="Ganita Prakash Part-I (Santhali)";
		document.test.tbook.options[20].value="textbook.php?hsngp1=0-7"
		document.test.tbook.options[21].text="Ganita Prakash Part-I (Malayalam)";
		document.test.tbook.options[21].value="textbook.php?hmlgp1=0-7"
		document.test.tbook.options[22].text="Ganita Prakash Part-I (Sindhi)";
		document.test.tbook.options[22].value="textbook.php?hsigp1=0-7"
		document.test.tbook.options[23].text="Ganita Prakash Part-I (Assamese)";
		document.test.tbook.options[23].value="textbook.php?hasgp1=0-7"
		document.test.tbook.options[24].text="Ganita Prakash Part-I (Gujarati)";
		document.test.tbook.options[24].value="textbook.php?hgjgp1=0-7"
		
		
		
		
		
		<!------------------------------!>
		document.test.tbook.options[25].text="Ganita Prakash Part-II(Kannada)";
		document.test.tbook.options[25].value="textbook.php?hkngp2=0-7"
		document.test.tbook.options[26].text="Ganita Prakash Part-II(Odia)";
		document.test.tbook.options[26].value="textbook.php?horgp2=0-7"
		document.test.tbook.options[27].text="Ganita Prakash Part-II(Punjabi)";
		document.test.tbook.options[27].value="textbook.php?hpngp2=0-7"
		document.test.tbook.options[28].text="Ganita Prakash Part-II(Gujarati)";
		document.test.tbook.options[28].value="textbook.php?hgjgp2=0-7"
		document.test.tbook.options[29].text="Ganita Prakash Part-II(Tamil)";
		document.test.tbook.options[29].value="textbook.php?htmgp2=0-7"
		document.test.tbook.options[30].text="Ganita Prakash Part-II(Malayalam)";
		document.test.tbook.options[30].value="textbook.php?hmlgp2=0-7"
		document.test.tbook.options[31].text="Ganita Prakash Part-II(Assamese)";
		document.test.tbook.options[31].value="textbook.php?hasgp2=0-7"
		document.test.tbook.options[32].text="Ganita Prakash Part-II(Marathi)";
		document.test.tbook.options[32].value="textbook.php?hmrgp2=0-7"
		document.test.tbook.options[33].text="Ganita Prakash Part-II(Telugu)";
		document.test.tbook.options[33].value="textbook.php?htlgp2=0-7"
		document.test.tbook.options[34].text="Ganita Prakash Part-II(Bengali)";
		document.test.tbook.options[34].value="textbook.php?hbngp2=0-7"
	

		
					
	}

	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Arts"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Kriti";
		document.test.tbook.options[1].value="textbook.php?hekr1=0-19"
		document.test.tbook.options[2].text="Kriti (Hindi)";
		document.test.tbook.options[2].value="textbook.php?hhkr1=0-19"
		document.test.tbook.options[3].text="Kriti (Urdu)";
		document.test.tbook.options[3].value="textbook.php?hukr1=0-19"
		document.test.tbook.options[4].text="Kriti (Marathi)";
		document.test.tbook.options[4].value="textbook.php?hmrkr1=0-19"
		document.test.tbook.options[5].text="Kriti (Tamil)";
		document.test.tbook.options[5].value="textbook.php?htmkr1=0-19"
		document.test.tbook.options[6].text="Kriti (Punjabi)";
		document.test.tbook.options[6].value="textbook.php?hpnkr1=0-19"
		
		document.test.tbook.options[7].text="Kriti (Nepali)";
		document.test.tbook.options[7].value="textbook.php?hnpkr1=0-19"
		document.test.tbook.options[8].text="Kriti (Odia)";
		document.test.tbook.options[8].value="textbook.php?horkr1=0-19"
		document.test.tbook.options[9].text="Kriti (Dogri)";
		document.test.tbook.options[9].value="textbook.php?hdgkr1=0-19"
		document.test.tbook.options[10].text="Kriti (Kannada)";
		document.test.tbook.options[10].value="textbook.php?hknkr1=0-19"
		document.test.tbook.options[11].text="Kriti (Malayalam)";
		document.test.tbook.options[11].value="textbook.php?hmlkr1=0-19"
		document.test.tbook.options[12].text="Kriti (Bodo)";
		document.test.tbook.options[12].value="textbook.php?hbdkr1=0-19"
		document.test.tbook.options[13].text="Kriti (Bengali)";
		document.test.tbook.options[13].value="textbook.php?hbnkr1=0-19"
		document.test.tbook.options[14].text="Kriti (Telugu)";
		document.test.tbook.options[14].value="textbook.php?htlkr1=0-19"
		document.test.tbook.options[15].text="Kriti (Assamese)";
		document.test.tbook.options[15].value="textbook.php?haskr1=0-19"
		document.test.tbook.options[16].text="Kriti (Kashmiri)";
		document.test.tbook.options[16].value="textbook.php?hkskr1=0-19"
		document.test.tbook.options[17].text="Kriti (Sanskrit)";
		document.test.tbook.options[17].value="textbook.php?hskkr1=0-19"
		document.test.tbook.options[18].text="Kriti (Gujarati)";
		document.test.tbook.options[18].value="textbook.php?hgjkr1=0-19"
		document.test.tbook.options[19].text="Kriti (Konkani)";
		document.test.tbook.options[19].value="textbook.php?hkokr1=0-19"
		document.test.tbook.options[20].text="Kriti (Santhali)";
		document.test.tbook.options[20].value="textbook.php?hsnkr1=0-19"
		document.test.tbook.options[21].text="Kriti (Maithili)";
		document.test.tbook.options[21].value="textbook.php?hmtkr1=0-19"
		document.test.tbook.options[22].text="Kriti (Manipuri)";
		document.test.tbook.options[22].value="textbook.php?hmnkr1=0-19"
		document.test.tbook.options[23].text="Kriti (Sindhi)";
		document.test.tbook.options[23].value="textbook.php?hsikr1=0-19"
		document.test.tbook.options[24].text="Kriti (Maithili)";
		document.test.tbook.options[24].value="textbook.php?hmtkr1=0-19"
		
		
	
		
					
	}

	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Malhar";
		document.test.tbook.options[1].value="textbook.php?hhml1=0-10"
		
		

		
					
	}

	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Sanskrit"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Deepakam";
		document.test.tbook.options[1].value="textbook.php?hsde1=0-16"
		
		

		
					
	}

	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Curiosity";
		document.test.tbook.options[1].value="textbook.php?hecu1=0-13"
		document.test.tbook.options[2].text="Jigyasa";
		document.test.tbook.options[2].value="textbook.php?hhcu1=0-13"
		document.test.tbook.options[3].text="Tajassus";
		document.test.tbook.options[3].value="textbook.php?hucu1=0-13"
		document.test.tbook.options[4].text="Curiosity (Punjabi)";
		document.test.tbook.options[4].value="textbook.php?hpncu1=0-13"
		document.test.tbook.options[5].text="Curiosity (Tamil)";
		document.test.tbook.options[5].value="textbook.php?htmcu1=0-13"
		document.test.tbook.options[6].text="Curiosity (Odia)";
		document.test.tbook.options[6].value="textbook.php?horcu1=0-13"
		document.test.tbook.options[7].text="Curiosity (Assamese)";
		document.test.tbook.options[7].value="textbook.php?hascu1=0-13"
		document.test.tbook.options[8].text="Curiosity (Marathi)";
		document.test.tbook.options[8].value="textbook.php?hmrcu1=0-13"
		document.test.tbook.options[9].text="Curiosity (Bengali)";
		document.test.tbook.options[9].value="textbook.php?hbncu1=0-13"
		document.test.tbook.options[10].text="Curiosity (Dogri)";
		document.test.tbook.options[10].value="textbook.php?hdgcu1=0-13"
		document.test.tbook.options[11].text="Curiosity (Telugu)";
		document.test.tbook.options[11].value="textbook.php?htlcu1=0-13"
		document.test.tbook.options[12].text="Curiosity (Bodo)";
		document.test.tbook.options[12].value="textbook.php?hbdcu1=0-13"
		document.test.tbook.options[13].text="Curiosity (Gujarati)";
		document.test.tbook.options[13].value="textbook.php?hgjcu1=0-13"
		document.test.tbook.options[14].text="Curiosity (Manipuri)";
		document.test.tbook.options[14].value="textbook.php?hmncu1=0-13"
		document.test.tbook.options[15].text="Curiosity (Sanskrit)";
		document.test.tbook.options[15].value="textbook.php?hskcu1=0-13"
		document.test.tbook.options[16].text="Curiosity (Malayalam)";
		document.test.tbook.options[16].value="textbook.php?hmlcu1=0-13"
		document.test.tbook.options[17].text="Curiosity (Kannada)";
		document.test.tbook.options[17].value="textbook.php?hkncu1=0-13"
		document.test.tbook.options[18].text="Curiosity (Konkani)";
		document.test.tbook.options[18].value="textbook.php?hkocu1=0-13"
		document.test.tbook.options[19].text="Curiosity (Maithili)";
		document.test.tbook.options[19].value="textbook.php?hmtcu1=0-13"
		document.test.tbook.options[20].text="Curiosity (Nepali)";
		document.test.tbook.options[20].value="textbook.php?hnpcu1=0-13"
		document.test.tbook.options[21].text="Curiosity (Santhali)";
		document.test.tbook.options[21].value="textbook.php?hsncu1=0-13"
		document.test.tbook.options[22].text="Curiosity (Sindhi)";
		document.test.tbook.options[22].value="textbook.php?hsicu1=0-13"
		document.test.tbook.options[23].text="Curiosity (Kashmiri)";
		document.test.tbook.options[23].value="textbook.php?hkscu1=0-13"
		
		
		
		

		
					
	}



	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Poorvi";
		document.test.tbook.options[1].value="textbook.php?hepr1=0-5"
		
		

		
					
	}

	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Social Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Exploring Society India and Beyond Part-I";
		document.test.tbook.options[1].value="textbook.php?hees1=0-7"
		document.test.tbook.options[2].text="Samaj Ka Aadhyan: Bharat or uske aage Part-I";
		document.test.tbook.options[2].value="textbook.php?hhes1=0-7"				
		document.test.tbook.options[3].text="Muashrey ki Daryaft - Hindustan Aur Uske Age Part-I ";
		document.test.tbook.options[3].value="textbook.php?hues1=0-7"
		document.test.tbook.options[4].text="Exploring Society India and Beyond Part-II";
		document.test.tbook.options[4].value="textbook.php?hees2=0-8"
		document.test.tbook.options[5].text="Exploring Society India and Beyond Part-I (Odia) ";
		document.test.tbook.options[5].value="textbook.php?hores1=0-7"
		document.test.tbook.options[6].text="Exploring Society India and Beyond Part-I (Sanskrit) ";
		document.test.tbook.options[6].value="textbook.php?hskes1=0-7"
		document.test.tbook.options[7].text="Exploring Society India and Beyond Part-I (Malayalam) ";
		document.test.tbook.options[7].value="textbook.php?hmles1=0-7"
		document.test.tbook.options[8].text="Exploring Society India and Beyond Part-I (Punjabi) ";
		document.test.tbook.options[8].value="textbook.php?hpnes1=0-7"
		document.test.tbook.options[9].text="Exploring Society India and Beyond Part-I (Gujarati) ";
		document.test.tbook.options[9].value="textbook.php?hgjes1=0-7"
		document.test.tbook.options[10].text="Exploring Society India and Beyond Part-I (Bengali) ";
		document.test.tbook.options[10].value="textbook.php?hbnes1=0-7"
		document.test.tbook.options[11].text="Exploring Society India and Beyond Part-I (Tamil) ";
		document.test.tbook.options[11].value="textbook.php?htmes1=0-7"
		document.test.tbook.options[12].text="Exploring Society India and Beyond Part-I (Nepali) ";
		document.test.tbook.options[12].value="textbook.php?hnpes1=0-7"
		document.test.tbook.options[13].text="Exploring Society India and Beyond Part-I (Manipuri) ";
		document.test.tbook.options[13].value="textbook.php?hmnes1=0-7"
		document.test.tbook.options[14].text="Exploring Society India and Beyond Part-I (Kannada) ";
		document.test.tbook.options[14].value="textbook.php?hknes1=0-7"
		document.test.tbook.options[15].text="Exploring Society India and Beyond Part-I (Marathi) ";
		document.test.tbook.options[15].value="textbook.php?hmres1=0-7"
		document.test.tbook.options[16].text="Exploring Society India and Beyond Part-I (Dogri) ";
		document.test.tbook.options[16].value="textbook.php?hdges1=0-7"
		document.test.tbook.options[17].text="Exploring Society India and Beyond Part-I (Assamese) ";
		document.test.tbook.options[17].value="textbook.php?hases1=0-7"
		document.test.tbook.options[18].text="Exploring Society India and Beyond Part-I (Konkani) ";
		document.test.tbook.options[18].value="textbook.php?hkoes1=0-7"
		document.test.tbook.options[19].text="Exploring Society India and Beyond Part-I (Maithili) ";
		document.test.tbook.options[19].value="textbook.php?hmtes1=0-7"
		document.test.tbook.options[20].text="Exploring Society India and Beyond Part-I (Bodo) ";
		document.test.tbook.options[20].value="textbook.php?hbdes1=0-7"
		document.test.tbook.options[21].text="Exploring Society India and Beyond Part-I (Kashmiri) ";
		document.test.tbook.options[21].value="textbook.php?hkses1=0-7"
		document.test.tbook.options[22].text="Exploring Society India and Beyond Part-I (Santhali) ";
		document.test.tbook.options[22].value="textbook.php?hsnes1=0-7"
		document.test.tbook.options[23].text="Exploring Society India and Beyond Part-I (Telugu) ";
		document.test.tbook.options[23].value="textbook.php?htles1=0-7"
		document.test.tbook.options[24].text="Exploring Society India and Beyond Part-I (Sindhi) ";
		document.test.tbook.options[24].value="textbook.php?hsies1=0-7"
		
		
		
	

		
					
	}

	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Physical Education and Well Being"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Khel Yatra";
		document.test.tbook.options[1].value="textbook.php?heky1=0-6"
		document.test.tbook.options[2].text="Khel Yatra ( Hindi)";
		document.test.tbook.options[2].value="textbook.php?hhky1=0-6"
		document.test.tbook.options[3].text="Khel Yatra (Urdu)";
		document.test.tbook.options[3].value="textbook.php?huky1=0-6"
		document.test.tbook.options[4].text="Khel Yatra (Punjabi)";
		document.test.tbook.options[4].value="textbook.php?hpnky1=0-6"
		document.test.tbook.options[5].text="Khel Yatra (Marathi)";
		document.test.tbook.options[5].value="textbook.php?hmrky1=0-6"
		document.test.tbook.options[6].text="Khel Yatra (Odia)";
		document.test.tbook.options[6].value="textbook.php?horky1=0-6"
		document.test.tbook.options[7].text="Khel Yatra (Malayalam)";
		document.test.tbook.options[7].value="textbook.php?hmlky1=0-6"
		document.test.tbook.options[8].text="Khel Yatra (Gujarati)";
		document.test.tbook.options[8].value="textbook.php?hgjky1=0-6"
		document.test.tbook.options[9].text="Khel Yatra (Sanskrit)";
		document.test.tbook.options[9].value="textbook.php?hskky1=0-6"
		document.test.tbook.options[10].text="Khel Yatra (Nepali)";
		document.test.tbook.options[10].value="textbook.php?hnpky1=0-6"
		document.test.tbook.options[11].text="Khel Yatra (Tamil)";
		document.test.tbook.options[11].value="textbook.php?htmky1=0-6"
		document.test.tbook.options[12].text="Khel Yatra (Bengali)";
		document.test.tbook.options[12].value="textbook.php?hbnky1=0-6"
		document.test.tbook.options[13].text="Khel Yatra (Dogri)";
		document.test.tbook.options[13].value="textbook.php?hdgky1=0-6"
		document.test.tbook.options[14].text="Khel Yatra (Bodo)";
		document.test.tbook.options[14].value="textbook.php?hbdky1=0-6"
		document.test.tbook.options[15].text="Khel Yatra (Kannada)";
		document.test.tbook.options[15].value="textbook.php?hknky1=0-6"
		document.test.tbook.options[16].text="Khel Yatra (Telugu)";
		document.test.tbook.options[16].value="textbook.php?htlky1=0-6"
		document.test.tbook.options[17].text="Khel Yatra (Manipuri)";
		document.test.tbook.options[17].value="textbook.php?hmnky1=0-6"
		document.test.tbook.options[18].text="Khel Yatra (Maithili)";
		document.test.tbook.options[18].value="textbook.php?hmtky1=0-6"
		document.test.tbook.options[19].text="Khel Yatra (Assamese)";
		document.test.tbook.options[19].value="textbook.php?hasky1=0-6"
		document.test.tbook.options[20].text="Khel Yatra (Kashmiri)";
		document.test.tbook.options[20].value="textbook.php?hksky1=0-6"
		document.test.tbook.options[21].text="Khel Yatra (Konkani)";
		document.test.tbook.options[21].value="textbook.php?hkoky1=0-6"
		document.test.tbook.options[22].text="Khel Yatra (Sindhi)";
		document.test.tbook.options[22].value="textbook.php?hsiky1=0-6"
		document.test.tbook.options[23].text="Khel Yatra (Santhali)";
		document.test.tbook.options[23].value="textbook.php?hsnky1=0-6"
	
		
		

		
					
	}

	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Vocational Education"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Kaushal Bodh";
		document.test.tbook.options[1].value="textbook.php?hekb1=0-7"
		document.test.tbook.options[2].text="Kaushal Bodh (Hindi)";
		document.test.tbook.options[2].value="textbook.php?hhkb1=0-7"
		document.test.tbook.options[3].text="Kaushal Bodh(Gujarati)";
		document.test.tbook.options[3].value="textbook.php?hgjkb1=0-7"
		document.test.tbook.options[4].text="Kaushal Bodh(Bodo)";
		document.test.tbook.options[4].value="textbook.php?hbdkb1=0-7"
		document.test.tbook.options[5].text="Kaushal Bodh(Odia)";
		document.test.tbook.options[5].value="textbook.php?horkb1=0-7"
		document.test.tbook.options[6].text="Kaushal Bodh(Telugu)";
		document.test.tbook.options[6].value="textbook.php?htlkb1=0-7"
		document.test.tbook.options[7].text="Kaushal Bodh(Sanskrit)";
		document.test.tbook.options[7].value="textbook.php?hskkb1=0-7"
		document.test.tbook.options[8].text="Kaushal Bodh(Punjabi)";
		document.test.tbook.options[8].value="textbook.php?hpnkb1=0-7"
		document.test.tbook.options[9].text="Kaushal Bodh(Nepali)";
		document.test.tbook.options[9].value="textbook.php?hnpkb1=0-7"
		document.test.tbook.options[10].text="Kaushal Bodh(Marathi)";
		document.test.tbook.options[10].value="textbook.php?hmrkb1=0-7"
		document.test.tbook.options[11].text="Kaushal Bodh(Kannada)";
		document.test.tbook.options[11].value="textbook.php?hknkb1=0-7"
		document.test.tbook.options[12].text="Kaushal Bodh(Tamil)";
		document.test.tbook.options[12].value="textbook.php?htmkb1=0-7"
		document.test.tbook.options[13].text="Kaushal Bodh(Dogri)";
		document.test.tbook.options[13].value="textbook.php?hdgkb1=0-7"
		document.test.tbook.options[14].text="Kaushal Bodh(Konkani)";
		document.test.tbook.options[14].value="textbook.php?hkokb1=0-7"
		document.test.tbook.options[15].text="Kaushal Bodh(Maithili)";
		document.test.tbook.options[15].value="textbook.php?hmtkb1=0-7"
		document.test.tbook.options[16].text="Kaushal Bodh(Malayalam)";
		document.test.tbook.options[16].value="textbook.php?hmlkb1=0-7"
		document.test.tbook.options[17].text="Kaushal Bodh(Manipuri)";
		document.test.tbook.options[17].value="textbook.php?hmnkb1=0-7"
		document.test.tbook.options[18].text="Kaushal Bodh(Santhali)";
		document.test.tbook.options[18].value="textbook.php?hsnkb1=0-7"
		document.test.tbook.options[19].text="Kaushal Bodh(Bengali)";
		document.test.tbook.options[19].value="textbook.php?hbnkb1=0-7"
		document.test.tbook.options[20].text="Kaushal Bodh(Assamese)";
		document.test.tbook.options[20].value="textbook.php?hbnkb1=0-7"
		document.test.tbook.options[21].text="Kaushal Bodh(Sindhi)";
		document.test.tbook.options[21].value="textbook.php?hsikb1=0-7"
		document.test.tbook.options[22].text="Kaushal Bodh(Kashmiri)";
		document.test.tbook.options[22].value="textbook.php?hkskb1=0-7"
		
		

		
					
	}

	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Khayal";
		document.test.tbook.options[1].value="textbook.php?hukl1=0-21"
					
	}
	

	/*else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Class 8"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Class 8";
		document.test.tbook.options[1].value="textbook.php?class4=0-1"	
		
				
	}

	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Honeydew";
		document.test.tbook.options[1].value="textbook.php?hehd1=0-8"	
		document.test.tbook.options[2].text="It So Happend";
		document.test.tbook.options[2].value="textbook.php?heih1=0-8"	
		//document.test.tbook.options[3].text="";
		//document.test.tbook.options[3].value=""
						
	}
	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Mathematics";
		document.test.tbook.options[1].value="textbook.php?hemh1=0-13"		
		document.test.tbook.options[2].text="Ganit";
		document.test.tbook.options[2].value="textbook.php?hhmh1=0-13"	
		document.test.tbook.options[3].text="Riyazi(Urdu)";
		document.test.tbook.options[3].value="textbook.php?huhi1=0-16"	
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?heep2=0-13"
		//document.test.tbook.options[5].text="Exemplar Problem(Hindi)";
		//document.test.tbook.options[5].value="textbook.php?hhep2=0-13"
		//document.test.tbook.options[3].text="Hisab(Urdu)";
		//document.test.tbook.options[3].value="/book_publishing/Class 8/Urdu book/MATH-VIII/Maths VII.htm"
					
	}

	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Sanskrit"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Ruchira";
		document.test.tbook.options[1].value="textbook.php?hhsk1=0-14"
		//document.test.tbook.options[2].text="";
		//document.test.tbook.options[2].value=""
						
	}
	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Vasant";
		document.test.tbook.options[1].value="textbook.php?hhvs1=0-13"		
		document.test.tbook.options[2].text="Durva";
		document.test.tbook.options[2].value="textbook.php?hhdv1=0-19"		
		document.test.tbook.options[3].text="Bharat Ki Khoj";
		document.test.tbook.options[3].value="textbook.php?hhbk1=0-9"
		document.test.tbook.options[4].text="Sanshipt Budhcharit";
		document.test.tbook.options[4].value="textbook.php?hhsb1=0-5"
				
	}


else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Science";
		document.test.tbook.options[1].value="textbook.php?hesc1=0-13"		
		document.test.tbook.options[2].text="Vigyan";
		document.test.tbook.options[2].value="textbook.php?hhsc1=0-13"
		document.test.tbook.options[3].text="Science(Urdu)";
		document.test.tbook.options[3].value="textbook.php?huse1=0-18"		
		//document.test.tbook.options[4].text="Exemplar Problems";
		//document.test.tbook.options[4].value="textbook.php?heep1=0-18"
		//document.test.tbook.options[3].text="Science Aur Technology (Urdu)";
		//document.test.tbook.options[3].value="/book_publishing/Class 8/Urdu book/science & technology-VIII/science & technology.htm"
						
	}

else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Social Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Resource And Development(Geography)";
		document.test.tbook.options[1].value="textbook.php?hess4=0-5"		
		document.test.tbook.options[2].text="Sansadhan Avam Vikas(Bhugol)";
		document.test.tbook.options[2].value="textbook.php?hhss4=0-5"		
		document.test.tbook.options[3].text="Social And Political Life";
		document.test.tbook.options[3].value="textbook.php?hess3=0-8"
		document.test.tbook.options[4].text="Samajik Avam Rajnatik Jeevan";
		document.test.tbook.options[4].value="textbook.php?hhss3=0-8"
		document.test.tbook.options[5].text="Our-Pasts-III  ";
		document.test.tbook.options[5].value="textbook.php?hess2=0-8"
		//document.test.tbook.options[6].text="Hamare Atit-III (Itihas) ";
		//document.test.tbook.options[6].value="textbook.php?hhss1=0-8"
		//document.test.tbook.options[7].text="Our-Pasts-III (Part-II) ";
		//document.test.tbook.options[7].value="textbook.php?hess2=0-6"
		//document.test.tbook.options[8].text="Hamare Atit-III (Bhag-II) ";
		//document.test.tbook.options[8].value="textbook.php?hhss2=0-6"
		document.test.tbook.options[7].text="Wasayel aur Taraqqui(Urdu)";
		document.test.tbook.options[7].value="textbook.php?hugy1=0-6"
		document.test.tbook.options[8].text="Samaji Aur Siyasi Zindagi(Urdu)";
		document.test.tbook.options[8].value="textbook.php?huss1=0-10"
		document.test.tbook.options[9].text="Hamare Maazi-III (Urdu)";
		document.test.tbook.options[9].value="textbook.php?huhm1=0-8"
		//document.test.tbook.options[10].text="Hamare Maazi Part-II(Urdu)";
		//document.test.tbook.options[10].value="textbook.php?huhm2=0-6"
       

					
	}

else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Environmental Education"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Project Books";
		document.test.tbook.options[1].value="/book_publishing/envedu/8/8.htm"		
		document.test.tbook.options[2].text="";
		document.test.tbook.options[2].value=""
				
	}
	else if((document.test.tclass.value==8) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Apni Zaban";
		document.test.tbook.options[1].value="textbook.php?huaz1=0-22"
		document.test.tbook.options[2].text="Urdu Guldasta (Supl)";
		document.test.tbook.options[2].value="textbook.php?huug1=0-9"
		document.test.tbook.options[3].text="Door-Pass";
		document.test.tbook.options[3].value="textbook.php?hudp1=0-20"
		document.test.tbook.options[4].text="Jaan Pahechan";
		document.test.tbook.options[4].value="textbook.php?hujp1=0-20"	
		
				
	}*/
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Kaveri";
		document.test.tbook.options[1].value="textbook.php?iebe1=0-8"			
		//document.test.tbook.options[2].text="Moments Supplementary Reader";
		//document.test.tbook.options[2].value="textbook.php?iemo1=0-9"	
		//document.test.tbook.options[3].text="Words and Expressions  1";
		//document.test.tbook.options[3].value="textbook.php?iewe1=0-9"		
		
					
	}
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Ganga";
		document.test.tbook.options[1].value="textbook.php?ihga1=0-12"
		//document.test.tbook.options[2].text="Reva";
		//document.test.tbook.options[2].value="textbook.php?reva1=0-10"

		//document.test.tbook.options[2].text="Kshitij";
		//document.test.tbook.options[2].value="textbook.php?ihks1=0-13"		
		//document.test.tbook.options[3].text="Sprash";
		//document.test.tbook.options[3].value="textbook.php?ihsp1=0-10"		
		//document.test.tbook.options[4].text="Kritika";
		//document.test.tbook.options[4].value="textbook.php?ihkr1=0-3"	
		//document.test.tbook.options[5].text="Sanchayan";
		//document.test.tbook.options[5].value="textbook.php?ihsa1=0-4"	
		
					
	}
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="Sanskrit"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Sharada";
		document.test.tbook.options[1].value="textbook.php?ihsh1=0-16"
		document.test.tbook.options[2].text="Risikulya(R2)";
		document.test.tbook.options[2].value="textbook.php?isanskritr21=0-10"
		//document.test.tbook.options[2].text="Vyakaranavithi";
		//document.test.tbook.options[2].value="textbook.php?jhva1=0-12"	
		//document.test.tbook.options[3].text="Abhyaswaan Bhav";
		//document.test.tbook.options[3].value="textbook.php?isab1=0-12"			
				
	}
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Ganita Manjari";
		document.test.tbook.options[1].value="textbook.php?iemh1=0-8"	
		document.test.tbook.options[2].text="Ganita Manjari (Hindi)";
		document.test.tbook.options[2].value="textbook.php?ihmh1=0-8"			
		//document.test.tbook.options[2].text="Ganit";
		//document.test.tbook.options[2].value="textbook.php?ihmh1=0-12"	
		//document.test.tbook.options[3].text="Reyazi (Urdu)";
		//document.test.tbook.options[3].value="textbook.php?iumh1=0-15"
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?ieep2=0-16"
		//document.test.tbook.options[5].text="Exemplar Problem(Hindi)";
		//document.test.tbook.options[5].value="textbook.php?ihep2=0-16"
		//document.test.tbook.options[6].text="";
		//document.test.tbook.options[6].value=""
				
	}
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Exploration";
		document.test.tbook.options[1].value="textbook.php?iesc1=0-13"
		document.test.tbook.options[2].text="Anveshan";
		document.test.tbook.options[2].value="textbook.php?ihsc1=0-13"
		
		//document.test.tbook.options[2].text="Vigyan";
		//document.test.tbook.options[2].value="textbook.php?ihsc1=0-12"	
		//document.test.tbook.options[3].text="Science (Urdu)";
		//document.test.tbook.options[3].value="textbook.php?iusc1=0-15"
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?ieep1=0-17"
		//document.test.tbook.options[5].text="Exemplar Problem(Hindi)";
		//document.test.tbook.options[5].value="textbook.php?ihep1=0-17"
		//document.test.tbook.options[6].text="Lab Manual(English))";
		//document.test.tbook.options[6].value="textbook.php?ielm1=0-5"
		//document.test.tbook.options[7].text="Lab Manual(Hindi)";
		//document.test.tbook.options[7].value="textbook.php?ihlm1=0-5"
					
	}
	
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		
		document.test.tbook.options[1].text="Jamuna";
		document.test.tbook.options[1].value="textbook.php?iuju1=0-15"
		
		//document.test.tbook.options[2].text="Gulzare-e-urdu";
		//document.test.tbook.options[2].value="textbook.php?iugu1=0-19"
		//document.test.tbook.options[3].text="Nawa-e-urdu";
		//document.test.tbook.options[3].value="textbook.php?iuna1=0-23"	
		//document.test.tbook.options[4].text="Jaan Pahechan";
		//document.test.tbook.options[4].value="textbook.php?iujp1=0-22"
		//document.test.tbook.options[5].text="Door Pass";
		//document.test.tbook.options[5].value="textbook.php?iudp1=0-20"
		//document.test.tbook.options[6].text="Sab Rang";
		//document.test.tbook.options[6].value="textbook.php?iusr1=0-10"
		//document.test.tbook.options[7].text="Urdu ki Adabi Asnaf";
		//document.test.tbook.options[7].value="textbook.php?iuau1=0-40"
	} 
	
	
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="Social Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Understanding Society India and Beyond PART-I";
		document.test.tbook.options[1].value="textbook.php?iest1=0-9"
		//document.test.tbook.options[2].text="Loktantrik Rajniti-I";
		//document.test.tbook.options[2].value="textbook.php?ihss4=0-5"	
		//document.test.tbook.options[3].text="Contemporary India-I";
		//document.test.tbook.options[3].value="textbook.php?iess1=0-6"
		//document.test.tbook.options[4].text="Samkalin Bharat-I";
		//document.test.tbook.options[4].value="textbook.php?ihss1=0-6"
		//document.test.tbook.options[5].text="Arthashastra";
		//document.test.tbook.options[5].value="textbook.php?ihss2=0-4"
		//document.test.tbook.options[6].text="Economics";
		//document.test.tbook.options[6].value="textbook.php?iess2=0-4"			
		//document.test.tbook.options[7].text="India and the Contemporary World-I";
		//document.test.tbook.options[7].value="textbook.php?iess3=0-5"	
		//document.test.tbook.options[8].text="Bharat Aur Samkalin Vishwa-I";
		//document.test.tbook.options[8].value="textbook.php?ihss3=0-5"
		//document.test.tbook.options[9].text="Jamhuri Syasat(Urdu)-I";
		//document.test.tbook.options[9].value="textbook.php?iuss4=0-6"
		//document.test.tbook.options[10].text="Hindustan Aur Asri Dunia-I(Urdu)";
		//document.test.tbook.options[10].value="textbook.php?iuhi1=0-5"		
		//document.test.tbook.options[11].text="Aasri Hindustan (Urdu)-I";
		//document.test.tbook.options[11].value="textbook.php?iuss1=0-6"
		//document.test.tbook.options[12].text="Mashiyat (Urdu)";
		//document.test.tbook.options[12].value="textbook.php?iuss2=0-4"
		
		
	}
else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="Environmental Education"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Project Books";
		document.test.tbook.options[1].value="textbook.php?iepb1=pp-0"
		document.test.tbook.options[2].text="";
		document.test.tbook.options[2].value=""
				
	}
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="Physical Education and Well Being"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Khel Praveen";
		document.test.tbook.options[1].value="textbook.php?iehp1=0-6"
		document.test.tbook.options[2].text="";
		document.test.tbook.options[2].value=""
				
	}
	
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="Skill Education"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Kaushal Vikas";
		document.test.tbook.options[1].value="textbook.php?iekv1=0-12"
		document.test.tbook.options[2].text="";
		document.test.tbook.options[2].value=""
				
	}
	
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="Vocational"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Cashier";
	    document.test.tbook.options[1].value="textbook.php?ievc1=0-5"
		
		document.test.tbook.options[2].text="Store Operations Assistant";
		document.test.tbook.options[2].value="textbook.php?ieva1=0-4"
		
		document.test.tbook.options[3].text="Solanceous Crop Cultivator";
		document.test.tbook.options[3].value="textbook.php?ievs1=0-5"
		
		document.test.tbook.options[4].text="Assistant Beauty Therapist";
		document.test.tbook.options[4].value="textbook.php?ievt1=0-3"
		
		document.test.tbook.options[5].text="Animal Health Workers (Agriculture)";
		document.test.tbook.options[5].value="textbook.php?ievw1=0-4"
		
		document.test.tbook.options[6].text="Hand Embroiderer (Addawala)";
		document.test.tbook.options[6].value="textbook.php?ieve1=0-5"
		
		document.test.tbook.options[7].text="Hand Embroiderer";
		document.test.tbook.options[7].value="textbook.php?ievh1=0-5"
		
		document.test.tbook.options[8].text="Plumber General";
		document.test.tbook.options[8].value="textbook.php?iepg1=0-5"
		
		document.test.tbook.options[9].text="IT Domestic Data Entry Operator";
		document.test.tbook.options[9].value="textbook.php?ieeo1=0-5"
		
		document.test.tbook.options[10].text="Employability Skill";
		document.test.tbook.options[10].value="textbook.php?iees1=0-5"
				
	}
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="ICT"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		//document.test.tbook.options[1].text="Information and Communication Technology";
		document.test.tbook.options[1].text="Coming Soon";
		//document.test.tbook.options[1].value="textbook.php?iict1=0-8"
		
				
	}
	
	else if((document.test.tclass.value==9) && (document.test.tsubject.options[sind].text=="Arts"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Madhurima";
		document.test.tbook.options[1].value="textbook.php?iemr1=0-17";
		//document.test.tbook.options[1].value="textbook.php?iict1=0-8"
		
				
	}
	
	else if((document.test.tclass.value==10) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Mathematics";
		document.test.tbook.options[1].value="textbook.php?jemh1=0-14"	
		document.test.tbook.options[2].text="Ganit";
		document.test.tbook.options[2].value="textbook.php?jhmh1=0-14"
		document.test.tbook.options[3].text="Riyazi";
		document.test.tbook.options[3].value="textbook.php?jumh1=0-15"	
		//document.test.tbook.options[4].text="Exemplars Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?jeep2=0-14"
		//document.test.tbook.options[5].text="Exemplars Problem(Hindi)";
		//document.test.tbook.options[5].value="textbook.php?jhep2=0-14"
		
		
		
					
	}
	else if((document.test.tclass.value==10) && (document.test.tsubject.options[sind].text=="Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Science";
		document.test.tbook.options[1].value="textbook.php?jesc1=0-13"
		document.test.tbook.options[2].text="Vigyan";
		document.test.tbook.options[2].value="textbook.php?jhsc1=0-13"
		document.test.tbook.options[3].text="Science(Urdu)";
		document.test.tbook.options[3].value="textbook.php?jusc1=0-16"
		//document.test.tbook.options[4].text="Exemplar Problem(English)";
		//document.test.tbook.options[4].value="textbook.php?jeep1=0-18"
		//document.test.tbook.options[5].text="Exemplar Problem(Hindi)";
		//document.test.tbook.options[5].value="textbook.php?jhep1=0-18"
		//document.test.tbook.options[6].text="Lab Manual(English)";
		//document.test.tbook.options[6].value="textbook.php?jelm1=0-6"
		//document.test.tbook.options[7].text="Lab Manual(Hindi)";
		//document.test.tbook.options[7].value="textbook.php?jhlm1=0-6"
				
	}
	else if((document.test.tclass.value==10) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Kshitij-2";
		document.test.tbook.options[1].value="textbook.php?jhks1=0-12"
		document.test.tbook.options[2].text="Sparsh";
		document.test.tbook.options[2].value="textbook.php?jhsp1=0-14"
		document.test.tbook.options[3].text="Sanchayan Bhag-2";
		document.test.tbook.options[3].value="textbook.php?jhsy1=0-3"
		document.test.tbook.options[4].text="Kritika";
		document.test.tbook.options[4].value="textbook.php?jhkr1=0-3"
		//document.test.tbook.options[5].text="";
		//document.test.tbook.options[5].value=""
	}
	else if((document.test.tclass.value==10) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="First Flight";
		document.test.tbook.options[1].value="textbook.php?jeff1=0-9"
		document.test.tbook.options[2].text="Foot Prints Without feet Supp. Reader";
		document.test.tbook.options[2].value="textbook.php?jefp1=0-9"
		document.test.tbook.options[3].text="Words and Expressions  2";
		document.test.tbook.options[3].value="textbook.php?jewe2=0-9"	
		//document.test.tbook.options[3].text="";
		//document.test.tbook.options[3].value=""
					
	}
	else if((document.test.tclass.value==10) && (document.test.tsubject.options[sind].text=="Social Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Contemporary India ";
		document.test.tbook.options[1].value="textbook.php?jess1=0-7"
		document.test.tbook.options[2].text="Samkalin Bharat";
		document.test.tbook.options[2].value="textbook.php?jhss1=0-7"
		document.test.tbook.options[3].text="Aasri Hindustan-II";
		document.test.tbook.options[3].value="textbook.php?juss1=0-7"
		document.test.tbook.options[4].text="Understanding Economic Development";
		document.test.tbook.options[4].value="textbook.php?jess2=0-5"
		document.test.tbook.options[5].text="Arthik Vikas ki Samajh";
		document.test.tbook.options[5].value="textbook.php?jhss2=0-5"
		document.test.tbook.options[6].text="Maashi Taraqqui Ki Samajh";
		document.test.tbook.options[6].value="textbook.php?juss2=0-5"
		document.test.tbook.options[7].text="India and the Contemporary World-II ";
		document.test.tbook.options[7].value="textbook.php?jess3=0-5"
		document.test.tbook.options[8].text="Bharat Aur Samakalin Vishav-2";
		document.test.tbook.options[8].value="textbook.php?jhss3=0-5"
		document.test.tbook.options[9].text="Hindustan Aur Asri Duniya";
		document.test.tbook.options[9].value="textbook.php?juss3=0-5"
		document.test.tbook.options[10].text="Democratic Politics";
		document.test.tbook.options[10].value="textbook.php?jess4=0-5"		
		document.test.tbook.options[11].text="Loktantrik Rajniti";
		document.test.tbook.options[11].value="textbook.php?jhss4=0-5"
		document.test.tbook.options[12].text="Jamhuri Siyasat-II ";
		document.test.tbook.options[12].value="textbook.php?juss4=0-8"
		
	
	
	}
		
	else if((document.test.tclass.value==10) && (document.test.tsubject.options[sind].text=="Sanskrit"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Shemushi";
		document.test.tbook.options[1].value="textbook.php?jhsk1=0-10"	
		document.test.tbook.options[2].text="Vyakaranavithi";
		document.test.tbook.options[2].value="textbook.php?jhva1=0-12"
		document.test.tbook.options[3].text="Abhyaswaan Bhav-II";
		document.test.tbook.options[3].value="textbook.php?jsab1=0-14"	
			
						
	}
	
	else if((document.test.tclass.value==10) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Gulzar-e-Urdu";
		document.test.tbook.options[1].value="textbook.php?juge1=0-12"
		document.test.tbook.options[2].text="Nawa-e-Urdu";
		document.test.tbook.options[2].value="textbook.php?june1=0-14"
		document.test.tbook.options[3].text="Jaan Pahechan";
		document.test.tbook.options[3].value="textbook.php?jujp1=0-22"
		document.test.tbook.options[4].text="Door-Paas";
		document.test.tbook.options[4].value="textbook.php?judp1=0-19"
		document.test.tbook.options[5].text="Sab Rang";
		document.test.tbook.options[5].value="textbook.php?jusr1=0-9"

				
	}
else if((document.test.tclass.value==10) && (document.test.tsubject.options[sind].text=="Environmental Education"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Project Books";
		document.test.tbook.options[1].value=""	
		document.test.tbook.options[2].text="";
		document.test.tbook.options[2].value=""
				
	}
	else if((document.test.tclass.value==10) && (document.test.tsubject.options[sind].text=="Health and Physical Education"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Health and Physical Education";
		document.test.tbook.options[1].value="textbook.php?jehp1=0-13"		
							
	}
	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Sanskrit"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Bhaswati";
		document.test.tbook.options[1].value="textbook.php?khsk1=0-11"
		document.test.tbook.options[2].text="Shashwati";
		document.test.tbook.options[2].value="textbook.php?khsk2=0-11"
	
		
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Accountancy"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Financial Accounting-I";
		document.test.tbook.options[1].value="textbook.php?keac1=0-7"
		document.test.tbook.options[2].text="Lekhashastra-I";
		document.test.tbook.options[2].value="textbook.php?khac1=0-7"
		document.test.tbook.options[3].text="Accountancy-II";
		document.test.tbook.options[3].value="textbook.php?keac2=0-2"
		document.test.tbook.options[4].text="Lekhashastra-II";
		document.test.tbook.options[4].value="textbook.php?khac2=0-2"
		document.test.tbook.options[5].text="Khatadari-I(Urdu)";
		document.test.tbook.options[5].value="textbook.php?kuac1=0-8"
		document.test.tbook.options[6].text="Khatadari-II(Urdu)";
		document.test.tbook.options[6].value="textbook.php?kuac2=0-5"
		
		
	}
	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Business Studies"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Business Studies";
		document.test.tbook.options[1].value="textbook.php?kebs1=0-11"
		document.test.tbook.options[2].text="Vyavsay Adhyanan";
		document.test.tbook.options[2].value="textbook.php?khbs1=0-11"
		document.test.tbook.options[3].text="Karobari Mutalah I";
		document.test.tbook.options[3].value="textbook.php?kubs1=0-11"
		
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Chemistry"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Chemistry Part-I";
		document.test.tbook.options[1].value="textbook.php?kech1=0-6"
		document.test.tbook.options[2].text="Rasayan Vigyan bhag-I";
		document.test.tbook.options[2].value="textbook.php?khch1=0-6"
		document.test.tbook.options[3].text="Keemiya I";
		document.test.tbook.options[3].value="textbook.php?kuch1=0-7"
		document.test.tbook.options[4].text="Chemistry Part II";
		document.test.tbook.options[4].value="textbook.php?kech2=0-3"			
		document.test.tbook.options[5].text="Rasayan Vigyan bhag-II";
		document.test.tbook.options[5].value="textbook.php?khch2=0-3"
		document.test.tbook.options[6].text="Keemiya II";
		document.test.tbook.options[6].value="textbook.php?kuch2=0-7"
		//document.test.tbook.options[7].text="Online Chemistry book Part I";
		//document.test.tbook.options[7].value="http://www.ncert.nic.in/online_sub_books/chemistry/chem_I_ps.html"
		//document.test.tbook.options[8].text="Exemplar Problems(English)";
		//document.test.tbook.options[8].value="textbook.php?keep5=0-15"
		//document.test.tbook.options[9].text="Exemplar Problems(Hindi)";
		//document.test.tbook.options[9].value="textbook.php?khep5=0-15"
		//document.test.tbook.options[10].text="Lab Manual(English)";
		//document.test.tbook.options[10].value="textbook.php?kelm2=0-8"
		//document.test.tbook.options[11].text="Lab Manual(Hindi)";
		//document.test.tbook.options[11].value="textbook.php?khlm2=0-8"
		

		
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Mathematics";
		document.test.tbook.options[1].value="textbook.php?kemh1=0-14"
		document.test.tbook.options[2].text="Ganit";
		document.test.tbook.options[2].value="textbook.php?khmh1=0-14"
		document.test.tbook.options[3].text="Riyazi I";
		document.test.tbook.options[3].value="textbook.php?kumh1=0-16"
		//document.test.tbook.options[4].text="Exemplar Problems(English)";
		//document.test.tbook.options[4].value="textbook.php?keep2=0-18"
		//document.test.tbook.options[5].text="Exemplar Problems(Hindi)";
		//document.test.tbook.options[5].value="textbook.php?khep2=0-18"
						
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Vocational"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Floriculturist- Protected Cultivation";
		document.test.tbook.options[1].value="textbook.php?kepc1=0-5"
		document.test.tbook.options[2].text="Vision Technician";
		document.test.tbook.options[2].value="textbook.php?kevt1=0-7"
		document.test.tbook.options[3].text="Floriculturist";
		document.test.tbook.options[3].value="textbook.php?keoc1=0-6"
		document.test.tbook.options[4].text="General Duty Assistant";
		document.test.tbook.options[4].value="textbook.php?keda1=0-5"
		document.test.tbook.options[5].text="Dairy Farmer Enterpreneur";
		document.test.tbook.options[5].value="textbook.php?kedf1=0-4"
		document.test.tbook.options[6].text="Floriculturist";
		document.test.tbook.options[6].value="textbook.php?kefc1=0-6"
						
	}
	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Statistics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		
		//document.test.tbook.options[3].text="Shumariat bara-e-mushaiat";
		//document.test.tbook.options[3].value="/book_publishing/CLASS 11/Urdu Books/Statics for Economics-XI(Shumariat bara-e-mushaiat)/Statics.htm"				
		
		
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Biology"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Biology";
		document.test.tbook.options[1].value="textbook.php?kebo1=0-19"
		document.test.tbook.options[2].text="Jeev Vigyan";
		document.test.tbook.options[2].value="textbook.php?khbo1=0-19"
		document.test.tbook.options[3].text="Hayatiyaat";
		document.test.tbook.options[3].value="textbook.php?kubo1=0-22"
		//document.test.tbook.options[4].text="Hayatiyaat II";
		//document.test.tbook.options[4].value="textbook.php?kubo2=0-12"
		//document.test.tbook.options[5].text="Human Ecology and Family Sciences Part I ";
		//document.test.tbook.options[5].value="textbook.php?kehe1=0-2"
		//document.test.tbook.options[6].text="Human Ecology and Family Sciences Part II ";
		//document.test.tbook.options[6].value="textbook.php?kehe2=0-2"
		
		//document.test.tbook.options[5].text="Exemplar Problems(English)";
		////document.test.tbook.options[5].value="textbook.php?keep4=0-25"
		//document.test.tbook.options[6].text="Exemplar Problems(Hindi)";
		//document.test.tbook.options[6].value="textbook.php?khep4=0-25"
		//document.test.tbook.options[7].text="Lab Manual(English)";
		//document.test.tbook.options[7].value="textbook.php?kelm3=0-17"
		
				
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Home Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		
		document.test.tbook.options[1].text="Human Ecology and Family Sciences Part I ";
		document.test.tbook.options[1].value="textbook.php?kehe1=0-7"
		document.test.tbook.options[2].text="Human Ecology and Family Sciences Part II ";
		document.test.tbook.options[2].value="textbook.php?kehe2=0-4"
		
		document.test.tbook.options[3].text="Manav Paristhitiki evm pariwar vigyan Bhag-I ";
		document.test.tbook.options[3].value="textbook.php?khhe1=0-7"
		
		document.test.tbook.options[4].text="Manav Paristhitiki evm pariwar vigyan Bhag-II ";
		document.test.tbook.options[4].value="textbook.php?khhe2=0-5"
		document.test.tbook.options[5].text="Insani Mahauliyat aur Uloom e Khandandari-I ";
		document.test.tbook.options[5].value="textbook.php?kuim1=0-10"
		document.test.tbook.options[6].text="Insani Mahauliyat aur Uloom e Khandandari Part-II ";
		document.test.tbook.options[6].value="textbook.php?kuim2=0-9"
		
				
	}
	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Psychology"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Introduction to Psychology";
		document.test.tbook.options[1].value="textbook.php?kepy1=0-8"
		document.test.tbook.options[2].text="Manovigyan";
		document.test.tbook.options[2].value="textbook.php?khpy1=0-8"			
		document.test.tbook.options[3].text="Nafsiyaat ";
		document.test.tbook.options[3].value="textbook.php?kupy1=0-9"
		
	}
	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Economics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Indian Economic Development";
		document.test.tbook.options[1].value="textbook.php?keec1=0-8"
		document.test.tbook.options[2].text="Statistics for Economics";
		document.test.tbook.options[2].value="textbook.php?kest1=0-8"
		document.test.tbook.options[3].text="Sankhyiki";
		document.test.tbook.options[3].value="textbook.php?khst1=0-8"
		document.test.tbook.options[4].text="Bhartiya Airthryavstha Ka Vikas ";
		document.test.tbook.options[4].value="textbook.php?khec1=0-8"
		document.test.tbook.options[5].text="Hindustan Ki Moaashi Tarraqqi(Urdu)";
		document.test.tbook.options[5].value="textbook.php?kuec1=0-10"
		document.test.tbook.options[6].text="Shumariyaat Bar-e-Mushiyat(Urdu)";
		document.test.tbook.options[6].value="textbook.php?kusc1=0-9"
		
		
	}

	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Geography"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Fundamental of Physical Geography";
		document.test.tbook.options[1].value="textbook.php?kegy2=0-14"
		document.test.tbook.options[2].text="Bhautique Bhugol ke Mool Sidhant";
		document.test.tbook.options[2].value="textbook.php?khgy2=0-14"
		//document.test.tbook.options[3].text="Tabai Gugraphiya ke Mubadiyat";
		//document.test.tbook.options[3].value="textbook.php?kugy2=0-16"
		document.test.tbook.options[3].text="Hindustan Tabi'i Mahaul (Urdu)";
		document.test.tbook.options[3].value="textbook.php?kugy1=0-7"		
		//document.test.tbook.options[4].text="Geographia mein amli kaam (Urdu)";
	 // document.test.tbook.options[4].value="textbook.php?kugy1=0-8"
		document.test.tbook.options[4].text="Pratical Work in Geography";
		document.test.tbook.options[4].value="textbook.php?kegy3=0-6"
		document.test.tbook.options[5].text="Bhugol Main Prayogatmak Karya";
		document.test.tbook.options[5].value="textbook.php?khgy3=0-6"
		document.test.tbook.options[6].text="India Physical Environment";
		document.test.tbook.options[6].value="textbook.php?kegy1=0-6"
		document.test.tbook.options[7].text="Bhart Bhautik Paryabaran";
		document.test.tbook.options[7].value="textbook.php?khgy1=0-6"
		document.test.tbook.options[8].text="Jughrafia Mein Aamli Kam (Urdu)";
		document.test.tbook.options[8].value="textbook.php?kugy3=0-8"
		document.test.tbook.options[9].text="Tabi'i Jughraiya Ka Mubadiyat (Urdu)";
		document.test.tbook.options[9].value="textbook.php?kugm1=0-16"
		
		
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Physics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Physics Part-I";
		document.test.tbook.options[1].value="textbook.php?keph1=0-7"
		document.test.tbook.options[2].text="Bhautiki-I";
		document.test.tbook.options[2].value="textbook.php?khph1=0-7"
		document.test.tbook.options[3].text="Tabiyaat-I";
		document.test.tbook.options[3].value="textbook.php?kuph1=0-8"
		document.test.tbook.options[4].text="Physics Part-II";
		document.test.tbook.options[4].value="textbook.php?keph2=0-7"
		document.test.tbook.options[5].text="Bhautiki-II";
		document.test.tbook.options[5].value="textbook.php?khph2=0-7"
		document.test.tbook.options[6].text="Tabiyaat-II";
		document.test.tbook.options[6].value="textbook.php?kuph2=0-7"
		//document.test.tbook.options[7].text="Exemplar Problems(English)";
		//document.test.tbook.options[7].value="textbook.php?keep3=0-17"
		//document.test.tbook.options[8].text="Exemplar Problems(Hindi)";
		//document.test.tbook.options[8].value="textbook.php?khep3=0-17"
		//document.test.tbook.options[9].text="Lab Manual(English)";
		//document.test.tbook.options[9].value="textbook.php?kelm1=0-14"
		
		
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Antra";
		document.test.tbook.options[1].value="textbook.php?khat1=0-16"
		document.test.tbook.options[2].text="Aroh";
		document.test.tbook.options[2].value="textbook.php?khar1=0-16"
		//document.test.tbook.options[3].text="Vyavaharik Hindi";
		//document.test.tbook.options[3].value="/book_publishing/CLASS 11/Viyabharik Hindi11/ch11_vyawaharik_hindi.htm"				
		document.test.tbook.options[3].text="Vitan";
		document.test.tbook.options[3].value="textbook.php?khvt1=0-5"
		document.test.tbook.options[4].text="Antral";
		document.test.tbook.options[4].value="textbook.php?khan1=0-2"
		//document.test.tbook.options[6].text="Abhivyakti Aur Madhyam";
		//document.test.tbook.options[6].value="textbook.php?lham1=0-18"
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Sociology"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Introducing Sociology";
		document.test.tbook.options[1].value="textbook.php?kesy1=0-5"
		document.test.tbook.options[2].text="Samaj Shastra Parichay-I";
		document.test.tbook.options[2].value="textbook.php?khsy1=0-5"
		document.test.tbook.options[3].text="Samajiyaat Ka Tarf";
		document.test.tbook.options[3].value="textbook.php?kusy1=0-5"
		document.test.tbook.options[4].text="Understanding Society";
		document.test.tbook.options[4].value="textbook.php?kesy2=0-5"
		document.test.tbook.options[5].text="Samaj ka Bodh";
		document.test.tbook.options[5].value="textbook.php?khsy2=0-5"
		document.test.tbook.options[6].text="Mutala-e-Muashira";
		document.test.tbook.options[6].value="textbook.php?kusy2=0-5"
		
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Woven Words";
		document.test.tbook.options[1].value="textbook.php?keww1=0-27"
		document.test.tbook.options[2].text="Hornbill";
		document.test.tbook.options[2].value="textbook.php?kehb1=0-14"
		document.test.tbook.options[3].text="Snapshots Suppl.Reader English";
		document.test.tbook.options[3].value="textbook.php?kesp1=0-5"			
		
		
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Political Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Political Theory";
		document.test.tbook.options[1].value="textbook.php?keps1=0-8"
		document.test.tbook.options[2].text="Raajneeti Sidhant";
		document.test.tbook.options[2].value="textbook.php?khps1=0-8"
		document.test.tbook.options[3].text="Hindustani Aain aur Kaam";
		document.test.tbook.options[3].value="textbook.php?kups1=0-10"
	//document.test.tbook.options[4].text="Indian Economic Development(Urdu)";
	//document.test.tbook.options[4].value="textbook.php?kuec1=0-10"
		document.test.tbook.options[4].text="India Constitution at Work";
		document.test.tbook.options[4].value="textbook.php?keps2=0-10"
		document.test.tbook.options[5].text="Bharat ka Samvidhan Sidhant aur Vyavhar";
		document.test.tbook.options[5].value="textbook.php?khps2=0-10"
		document.test.tbook.options[6].text="Siyasi Nazaria";
		document.test.tbook.options[6].value="textbook.php?kups2=0-10"
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="History"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Themes in World History";
		document.test.tbook.options[1].value="textbook.php?kehs1=0-7"
		document.test.tbook.options[2].text="Vishwa Itihas Ke Kuch Vishay";
		document.test.tbook.options[2].value="textbook.php?khhs1=0-7"				
		document.test.tbook.options[3].text="Tareekh-e-Alam per Mabni Mauzuaat Part I";
		document.test.tbook.options[3].value="textbook.php?kuta1=0-11"
	
		
	}
	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Heritage Crafts"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Living Craft Traditions of India";
		document.test.tbook.options[1].value="textbook.php?kehc1=0-10"
		document.test.tbook.options[2].text="Hindustan me Dastkari Ki Riwayat";
		document.test.tbook.options[2].value="textbook.php?kuhc1=0-10"
		//document.test.tbook.options[3].text="Dastkari";
		//document.test.tbook.options[3].value="textbook.php?kuhc2=0-10"
		
	}
	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Graphics design"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="The story of graphic design";
		document.test.tbook.options[1].value="textbook.php?kegd1=0-8"		
		document.test.tbook.options[2].text="graphic design ek kahani";
		document.test.tbook.options[2].value="textbook.php?khgd1=0-8"
						
	}
		
		else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Computers and Communication Technology"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="CCT Part-I";
		document.test.tbook.options[1].value="textbook.php?kect1=0-8"		
		document.test.tbook.options[2].text="CCT Part-II";
		document.test.tbook.options[2].value="textbook.php?kect2=0-6"
		document.test.tbook.options[3].text="Computer aur Sanchar Prodhogiki Part-I";
		document.test.tbook.options[3].value="textbook.php?khct1=0-8"		
		document.test.tbook.options[4].text="Computer aur Sanchar Prodhogiki Part-II";
		document.test.tbook.options[4].value="textbook.php?khct2=0-6"
	    document.test.tbook.options[5].text="Computer Aur Muwaslati Technology I";
		document.test.tbook.options[5].value="textbook.php?kuct1=0-8"		
		document.test.tbook.options[6].text="Computer Aur Muwaslati Technology II";
		document.test.tbook.options[6].value="textbook.php?kuct2=0-6"				
	}
	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Fine Art"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="An Introduction to Indian Art Part-I";
		document.test.tbook.options[1].value="textbook.php?kefa1=0-8"	
document.test.tbook.options[2].text="Bhartiya Kala ka parichay";
		document.test.tbook.options[2].value="textbook.php?khfa1=0-8"		
								
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Nai Awaz";
		document.test.tbook.options[1].value="textbook.php?kuna1=0-20"		
		document.test.tbook.options[2].text="Dhanak";
		document.test.tbook.options[2].value="textbook.php?kudh1=0-27"
document.test.tbook.options[3].text="Gulistan e Adab";
		document.test.tbook.options[3].value="textbook.php?kuga1=0-22"
document.test.tbook.options[4].text="Khyabane Urdu";
		document.test.tbook.options[4].value="textbook.php?kuku1=0-15"		
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Creative Writing and Translation"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Srijan";
		document.test.tbook.options[1].value="textbook.php?khsr1=0-4"		
		
		document.test.tbook.options[2].text="Takhleequi Jauhar";
		document.test.tbook.options[2].value="textbook.php?kucw1=0-4"		
							
	}
	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Informatics Practices"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Informatics Practices";
		document.test.tbook.options[1].value="textbook.php?keip1=0-8"		
		
						
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Biotechnology"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Biotechnology";
		document.test.tbook.options[1].value="textbook.php?kebt1=0-12"		
		
						
	}
	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Computer Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Computer Science";
		document.test.tbook.options[1].value="textbook.php?kecs1=0-11"	
		
		document.test.tbook.options[2].text="Computer Science - Urdu";
		document.test.tbook.options[2].value="textbook.php?kucs1=0-11"		
		
						
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Health and Physical Education"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Health and Physical Education";
		document.test.tbook.options[1].value="textbook.php?kehp1=0-11"		
							
	}
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Knowledge Traditions Practices of India"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Knowledge Traditions Practices of India";
		document.test.tbook.options[1].value="textbook.php?keks1=0-9"		
							
	}
	
	else if((document.test.tclass.value==11) && (document.test.tsubject.options[sind].text=="Sangeet"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Tabla evam Pakhawaj";
		document.test.tbook.options[1].value="textbook.php?khtp1=0-8"
		document.test.tbook.options[2].text="Hindustani Sangeet Gayan Evam Vadan";
		document.test.tbook.options[2].value="textbook.php?khgv1=0-10"	
							
	}
	
		
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Accountancy"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Accountancy-I";
		document.test.tbook.options[1].value="textbook.php?leac1=0-4"		
		document.test.tbook.options[2].text="Accountancy Part-II";
		document.test.tbook.options[2].value="textbook.php?leac2=0-6"
		document.test.tbook.options[3].text="Lekhashastra Part-I";
		document.test.tbook.options[3].value="textbook.php?lhac1=0-4"
		document.test.tbook.options[4].text="Lekhashastra Part-II";
		document.test.tbook.options[4].value="textbook.php?lhac2=0-5"
		document.test.tbook.options[5].text="Computerised Accounting System";
		document.test.tbook.options[5].value="textbook.php?leca1=0-4"
		document.test.tbook.options[6].text="Khatadari-I(Urdu)";
		document.test.tbook.options[6].value="textbook.php?luac1=0-5"
		document.test.tbook.options[7].text="Khatadari-II(Urdu)";
		document.test.tbook.options[7].value="textbook.php?luac2=0-6"			
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Mathematics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Mathematics Part-I";
		document.test.tbook.options[1].value="textbook.php?lemh1=0-6"
		document.test.tbook.options[2].text="Mathematics Part-II";
		document.test.tbook.options[2].value="textbook.php?lemh2=0-7"
		document.test.tbook.options[3].text="Ganit-I";
		document.test.tbook.options[3].value="textbook.php?lhmh1=0-6"		
		document.test.tbook.options[4].text="Ganit-II";
		document.test.tbook.options[4].value="textbook.php?lhmh2=0-7"
		document.test.tbook.options[5].text="Riyazi-I";
		document.test.tbook.options[5].value="textbook.php?lumh1=0-6"
		document.test.tbook.options[6].text="Riyazi-II";
		document.test.tbook.options[6].value="textbook.php?lumh2=0-7"
		
		//document.test.tbook.options[7].text="Exemplar Problems(English)";
		//document.test.tbook.options[7].value="textbook.php?leep2=0-16"
		//document.test.tbook.options[8].text="Exemplar Problems(Hindi)";
		//document.test.tbook.options[8].value="textbook.php?lhep2=0-15"
		
		
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Physics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Physics Part-I";
		document.test.tbook.options[1].value="textbook.php?leph1=0-8"
		document.test.tbook.options[2].text="Physics Part-II";
		document.test.tbook.options[2].value="textbook.php?leph2=0-6"
		document.test.tbook.options[3].text="Bhautiki-I";
		document.test.tbook.options[3].value="textbook.php?lhph1=0-8"
		document.test.tbook.options[4].text="Bhautiki-II";
		document.test.tbook.options[4].value="textbook.php?lhph2=0-6"
		document.test.tbook.options[5].text="Tabiyaat-I";
		document.test.tbook.options[5].value="textbook.php?luph1=0-8"
		document.test.tbook.options[6].text="Tabiyaat-II";
		document.test.tbook.options[6].value="textbook.php?luph2=0-6"
		//document.test.tbook.options[7].text="Examplar Prolems(English)";
	//	document.test.tbook.options[7].value="textbook.php?leep6=0-17"	
		//document.test.tbook.options[8].text="Examplar Problems(Hindi)";
		//document.test.tbook.options[8].value="textbook.php?lhep6=0-17"
		//document.test.tbook.options[9].text="Lab Manual(English)";
		//document.test.tbook.options[9].value="textbook.php?lelm3=0-7"
		//document.test.tbook.options[10].text="Lab Manual(Hindi)";
		//document.test.tbook.options[10].value="textbook.php?lhlm3=0-16"
				
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Antra";
		document.test.tbook.options[1].value="textbook.php?lhat1=0-21"
		document.test.tbook.options[2].text="Aroh";
		document.test.tbook.options[2].value="textbook.php?lhar1=0-15"
		document.test.tbook.options[3].text="Vitan";
		document.test.tbook.options[3].value="textbook.php?lhvt1=0-3"
		//document.test.tbook.options[4].text="Abhivyakti Aur Madhyam";
		//document.test.tbook.options[4].value="textbook.php?lham1=0-18"
		document.test.tbook.options[4].text="Antral Bhag 2";
		document.test.tbook.options[4].value="textbook.php?lhan1=0-3"
		
				
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="English"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Kaliedoscope";
		document.test.tbook.options[1].value="textbook.php?lekl1=0-21"
		document.test.tbook.options[2].text="Flamingo";
		document.test.tbook.options[2].value="textbook.php?lefl1=0-13"
		document.test.tbook.options[3].text="Vistas";
		document.test.tbook.options[3].value="textbook.php?levt1=0-6"
	
		
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Biotechnology"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Biotechnology";
		document.test.tbook.options[1].value="textbook.php?lebt1=0-13"
		
		
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Biology"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Biology";
		document.test.tbook.options[1].value="textbook.php?lebo1=0-13"
		document.test.tbook.options[2].text="Jeev Vigyan";
		document.test.tbook.options[2].value="textbook.php?lhbo1=0-13"
		document.test.tbook.options[3].text="Hayatiyaat";
		document.test.tbook.options[3].value="textbook.php?lubo1=0-16"
		//document.test.tbook.options[3].text="Human Ecology and Family Sciences Part I ";
		//document.test.tbook.options[3].value="textbook.php?lehe1=0-10"		
		//document.test.tbook.options[4].text="Exemplar Problems";
		//document.test.tbook.options[4].value="textbook.php?leep4=0-19"
		//document.test.tbook.options[5].text="Lab Manual(English)";
		//document.test.tbook.options[5].value="textbook.php?lelm2=0-16"
							
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="History"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Themes in Indian History-I";
		document.test.tbook.options[1].value="textbook.php?lehs1=0-4"
		document.test.tbook.options[2].text="Bharatiya Itihas ke kuchh Vishay-I";
		document.test.tbook.options[2].value="textbook.php?lhhs1=0-4"
		document.test.tbook.options[3].text="Themes in Indian History-II";
		document.test.tbook.options[3].value="textbook.php?lehs2=0-4"
		document.test.tbook.options[4].text="Bharatiya Itihas ke kuchh Vishay-II ";
		document.test.tbook.options[4].value="textbook.php?lhhs2=0-4"
        document.test.tbook.options[5].text="Themes in Indian History-III";
		document.test.tbook.options[5].value="textbook.php?lehs3=0-4"
		document.test.tbook.options[6].text="Bharatiya Itihas ke kuchh Vishay-III";
		document.test.tbook.options[6].value="textbook.php?lhhs3=0-4"
		document.test.tbook.options[7].text="Tareekh-e-Hind ke Mauzuaat-I(Urdu)";
		document.test.tbook.options[7].value="textbook.php?luth1=0-4"
		document.test.tbook.options[8].text="Tareekh-e-Hind ke Mauzuaat-II(Urdu)";
		document.test.tbook.options[8].value="textbook.php?luth2=0-4"
		document.test.tbook.options[9].text="Tareekh-e-Hind ke Mauzuaat-III(Urdu)";
		document.test.tbook.options[9].value="textbook.php?luth3=0-4"
							
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Geography"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Fundamentals of Human Geography";
		document.test.tbook.options[1].value="textbook.php?legy1=0-8"
		document.test.tbook.options[2].text="Practical Work in Geography Part II";
		document.test.tbook.options[2].value="textbook.php?legy3=0-4"
		document.test.tbook.options[3].text="Manav Bhugol Ke Mool Sidhant";
		document.test.tbook.options[3].value="textbook.php?lhgy1=0-8"
		document.test.tbook.options[4].text="Bhugol main peryojnatmak pryogatmak karye";
		document.test.tbook.options[4].value="textbook.php?lhgy3=0-4"
		document.test.tbook.options[5].text="India -People And Economy";
		document.test.tbook.options[5].value="textbook.php?legy2=0-9"
		document.test.tbook.options[6].text="Bharat log aur arthvyasastha(Bhugol)";
		document.test.tbook.options[6].value="textbook.php?lhgy2=0-9"	
		document.test.tbook.options[7].text="Insani Jughrafia Ke Buniyadi Usool(Urdu)";
		document.test.tbook.options[7].value="textbook.php?lufh1=0-10"
		document.test.tbook.options[8].text=" Hindustan Awam Aur Maishat(Urdu)";
		document.test.tbook.options[8].value="textbook.php?lugy1=0-12"
		document.test.tbook.options[9].text=" Jughrafia Mein Aamli Kam(Urdu)";
		document.test.tbook.options[9].value="textbook.php?lugy3=0-6"
		
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Psychology"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Psychology";
		document.test.tbook.options[1].value="textbook.php?lepy1=0-7"
	document.test.tbook.options[2].text="Manovigyan";
		document.test.tbook.options[2].value="textbook.php?lhpy1=0-7"
		document.test.tbook.options[3].text="Nafsiat(Urdu)";
		document.test.tbook.options[3].value="textbook.php?lupy1=0-9"

							
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Sociology"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Indian Society";
		document.test.tbook.options[1].value="textbook.php?lesy1=0-7"
		document.test.tbook.options[2].text="Bhartiya Samaj";
		document.test.tbook.options[2].value="textbook.php?lhsy1=0-7"
		document.test.tbook.options[3].text="Social Change and Development in India";
		document.test.tbook.options[3].value="textbook.php?lesy2=0-8"
		document.test.tbook.options[4].text="Bharat main Samajik Parivartan aur Vikas";
		document.test.tbook.options[4].value="textbook.php?lhsy2=0-8"
		document.test.tbook.options[5].text="Hindustani Samaj(Urdu)";
		document.test.tbook.options[5].value="textbook.php?luis1=0-7"
		document.test.tbook.options[6].text="Hindustan Mein Samaji Tabdili Aur Taraqqi(Urdu)";
		document.test.tbook.options[6].value="textbook.php?lusy2=0-8"
		
		
						
	}
	
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Chemistry"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Chemistry-I";
		document.test.tbook.options[1].value="textbook.php?lech1=0-5"
		document.test.tbook.options[2].text="Chemistry-II";
		document.test.tbook.options[2].value="textbook.php?lech2=0-5"
		document.test.tbook.options[3].text="Rasayan vigyan bhag I";
		document.test.tbook.options[3].value="textbook.php?lhch1=0-5"
		document.test.tbook.options[4].text="Rasayan vigyan bhag II";
		document.test.tbook.options[4].value="textbook.php?lhch2=0-5"
		//document.test.tbook.options[5].text="Exemplar Problems";
		//document.test.tbook.options[5].value="textbook.php?leep5=0-18"
		//document.test.tbook.options[6].text="Exemplar Problems(Hindi)";
		//document.test.tbook.options[6].value="textbook.php?lhep4=0-17"
		//document.test.tbook.options[7].text="Lab Manual(English)";
		//document.test.tbook.options[7].value="textbook.php?lelm1=0-11"
		//document.test.tbook.options[8].text="Lab Manual(Hindi)";
		//document.test.tbook.options[8].value="textbook.php?lhlm1=0-11"
		document.test.tbook.options[5].text="Keemiya-I";
		document.test.tbook.options[5].value="textbook.php?luch1=0-9"
		document.test.tbook.options[6].text="Keemiya-II";
		document.test.tbook.options[6].value="textbook.php?luch2=0-7"			
		
						
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Sanskrit"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Bhaswati";
		document.test.tbook.options[1].value="textbook.php?lhsk1=0-10"
		document.test.tbook.options[2].text="Shaswati";
		document.test.tbook.options[2].value="textbook.php?lhsk2=0-11"
		document.test.tbook.options[3].text="";
		document.test.tbook.options[3].value=""
							
	}
	
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Political Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Contemporary World Politics";
		document.test.tbook.options[1].value="textbook.php?leps1=0-7"
		document.test.tbook.options[2].text="Samkalin Vishwa Rajniti";
		document.test.tbook.options[2].value="textbook.php?lhps1=0-7"
		document.test.tbook.options[3].text="Politics in India Since Independence";
		document.test.tbook.options[3].value="textbook.php?leps2=0-8"
		document.test.tbook.options[4].text="Swatantra Bharat Mein Rajniti-II";
		document.test.tbook.options[4].value="textbook.php?lhps2=0-8"
		document.test.tbook.options[5].text="Aasri Alami Siyasat(Urdu)";
		document.test.tbook.options[5].value="textbook.php?lups1=0-9"
		document.test.tbook.options[6].text="Azadi Ke Baad Hindustan Ki Siyasat(Urdu)";
		document.test.tbook.options[6].value="textbook.php?luab1=0-9"					
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Home Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		
		document.test.tbook.options[1].text="Human Ecology and Family Sciences Part I ";
		document.test.tbook.options[1].value="textbook.php?lehe1=0-7"
		document.test.tbook.options[2].text="Human Ecology and Family Sciences Part II ";
		document.test.tbook.options[2].value="textbook.php?lehe2=0-7"
		
		document.test.tbook.options[3].text="Manav Paristhitik avam Parivar Vigyan Bhag 1 ";
		document.test.tbook.options[3].value="textbook.php?lehh1=0-7"
		document.test.tbook.options[4].text="Manav Paristhitiki avam Parivar Vigyan Bhag 2";
		document.test.tbook.options[4].value="textbook.php?lehh2=0-7"
		
	
		
		
				
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Economics"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Introductory Microeconomics";
		document.test.tbook.options[1].value="textbook.php?leec2=0-5"
		document.test.tbook.options[2].text="Introductory Macroeconomics";
		document.test.tbook.options[2].value="textbook.php?leec1=0-6"
		document.test.tbook.options[3].text="Vyashthi Arthshasrta";
		document.test.tbook.options[3].value="textbook.php?lhec2=0-5"
		document.test.tbook.options[4].text="Samashty Arthshastra Ek Parichay";
		document.test.tbook.options[4].value="textbook.php?lhec1=0-6"
		document.test.tbook.options[5].text="Juzvi Maashiyat ka Taruf(Urdu)";
		document.test.tbook.options[5].value="textbook.php?lume1=0-6"
		document.test.tbook.options[6].text="Kulli Maashiyat Ka Taruf(Urdu)";
		document.test.tbook.options[6].value="textbook.php?lume2=0-6"
						
	}
	
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Business Studies"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Business Studies-I";
		document.test.tbook.options[1].value="textbook.php?lebs1=0-8"
		document.test.tbook.options[2].text="Vyavasai Adhyan-I";
		document.test.tbook.options[2].value="textbook.php?lhbs1=0-8"
		document.test.tbook.options[3].text="Business Studies-II";
		document.test.tbook.options[3].value="textbook.php?lebs2=0-3"
		document.test.tbook.options[4].text="Vyavasai Adhyan-II";
		document.test.tbook.options[4].value="textbook.php?lhbs2=0-3"
		document.test.tbook.options[5].text="Karobari Uloom I(Urdu)";
		document.test.tbook.options[5].value="textbook.php?lubs1=0-8"
		document.test.tbook.options[6].text="Karobari Uloom II(Urdu)";
		document.test.tbook.options[6].value="textbook.php?lubs2=0-4"						
	}

	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Gulistan-e- Adab";
		document.test.tbook.options[1].value="textbook.php?luga1=0-12"
		document.test.tbook.options[2].text="Khayaban-e-Urdu";
		document.test.tbook.options[2].value="textbook.php?luku1=0-6"
		document.test.tbook.options[3].text="Nai Awaz";
		document.test.tbook.options[3].value="textbook.php?luna1=0-16"
		document.test.tbook.options[4].text="Dhanak";
		document.test.tbook.options[4].value="textbook.php?ludh1=0-12"
		
							
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Heritage Crafts"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		//document.test.tbook.options[1].text="Craft Tradition Of India";
		//document.test.tbook.options[1].value="textbook.php?lehc1=0-9"
		document.test.tbook.options[1].text="Hindustan me Dastkari Ki Riwayat";
		document.test.tbook.options[1].value="textbook.php?luhc1=0-9"
		document.test.tbook.options[2].text="Craft Tradition of India";
		document.test.tbook.options[2].value="textbook.php?lehc1=0-9"
		document.test.tbook.options[3].text="Bharatiya Hastkla Ki Paramparayen";
		document.test.tbook.options[3].value="textbook.php?lhhc1=0-9"
		
							
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="New Age Graphics Design"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="New Age Graphics Design";
		document.test.tbook.options[1].value="textbook.php?legd1=0-12"
		
							
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Creative Writing & Translation"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[2].text="Srijan-II";
		document.test.tbook.options[2].value="textbook.php?khsr2=0-4"
		document.test.tbook.options[1].text="Takhleequi Jauhar";
		document.test.tbook.options[1].value="textbook.php?lucw1=0-11"
		
							
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Fine Art"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="An Introduction to Indian Art Part-II";
		document.test.tbook.options[1].value="textbook.php?lefa1=0-8"
		document.test.tbook.options[2].text="Bhartiya Kala ka Itihaas Bhag 2";
		document.test.tbook.options[2].value="textbook.php?lhfa1=0-8"
		
							
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Computer Science"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Computer Science";
		document.test.tbook.options[1].value="textbook.php?lecs1=0-13"
		
							
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Informatics Practices"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Informatics Practices";
		document.test.tbook.options[1].value="textbook.php?leip1=0-7"
		
							
	}
	else if((document.test.tclass.value==12) && (document.test.tsubject.options[sind].text=="Sangeet"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Tabla evam Pakhawaj";
		document.test.tbook.options[1].value="textbook.php?lstp1=0-7"
		document.test.tbook.options[2].text="Hindustani Sangeet Gayan Evam Vaadan";
		document.test.tbook.options[2].value="textbook.php?lsgv1=0-9"	
							
	}
	
	else if((document.test.tclass.value==13) && (document.test.tsubject.options[sind].text=="Hindi"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Abhivyakti Aur Madhyam";
		document.test.tbook.options[1].value="textbook.php?kham1=0-16"
		
							
	}
	else if((document.test.tclass.value==13) && (document.test.tsubject.options[sind].text=="Sanskrit"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Sanskrit Sahitya parichay";
		document.test.tbook.options[1].value="textbook.php?klss1=0-12"
		
							
	}
	   else if((document.test.tclass.value==13) && (document.test.tsubject.options[sind].text=="Heritage Crafts"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Exploring Craft Tradition of India";
		document.test.tbook.options[1].value="textbook.php?mehc1=0-10"
		document.test.tbook.options[2].text="Bhartiya Hastkala Parmparaon ki Khoj";
		document.test.tbook.options[2].value="textbook.php?khhc1=0-10"
		
							
	}
	else if((document.test.tclass.value==13) && (document.test.tsubject.options[sind].text=="Urdu"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Zuban-O-Adab ki Tareekh";
		document.test.tbook.options[1].value="textbook.php?kuza1=0-23"
		document.test.tbook.options[2].text="Urdu Qwaid aur Insha";
		document.test.tbook.options[2].value="textbook.php?juuq1=0-24"
		document.test.tbook.options[3].text="Izhar Aur Zara-e-Izhar";
		document.test.tbook.options[3].value="textbook.php?kuiz1=0-4"		
		
							
	}
	else if((document.test.tclass.value==14) && (document.test.tsubject.options[sind].text=="Vocational"))
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="Organic Farming";
		document.test.tbook.options[1].value="textbook.php?geof1=0-5"
		
							
	}
	
	
	else if(document.test.tsubject.options[sind].text=="..Select Subject..")
	{
		document.test.tbook.options[0].text="..Select Book Title..";
		document.test.tbook.options[1].text="";
	}
}
}