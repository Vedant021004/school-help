
		 document.write("<table width='100%' style=\"font-size:16px\"><tr>");
		  var querystring1 = document.location.href; 
		  var gg=querystring1.substring(querystring1.lastIndexOf('/') + 1);
		    	//	  alert(gg);

  //var gg = querystring1.split("/");

  if(gg=="textbook.php")
  {
  
  document.write("<table width='100%'><tr><td width='100%' valign='top' align='center' ><table width='750px'>");
document.write("<tr><td width='100%' align='left' style='font-size:14px;font-family:Verdana, Arial, Helvetica, sans-serif;'>");								   document.write(" <p align='center' style=\"line-height:20px;\"><b>Welcome to the Online Textbooks Section </b></p><p align='justify' style=\"line-height:20px;font-size:12px\">");                             
     document.write("This online service offers easy access to the NCERT textbooks. The service covers textbooks of all subjects published by NCERT for classes I to XII in Hindi, English and Urdu. The Entire book or individual chapters can be downloaded provided the terms of use as mentioned in the Copyright Notice is adhered to.");
	 
document.write("</p><p align='justify'></p><p align='left' style=\"line-height:20px\">");

document.write("Catalogue of Textbooks (Grades I–VIII) and Indian Language Primers ( <a href=\"pdf/Textbooks_Primer_Brochure/Textbooks_Primer_Brochure.pdf\" target=\"_blank\"><b><i>Pdf</i></b></a> || <a href=\"flipbook/Textbooks_Primer_Brochure/index.html\" target=\"_blank\"><b><i>Flipbook</i></b></a> ).");


	 document.write("</p><p align='justify'></p><p align='left' style=\"line-height:20px\">");
document.write("<b><i>Copyright of NCERT Textbooks and terms of use</i></b>");
document.write("</p><p align='justify'></p><p align='left' style=\"line-height:20px;font-size:12px\">");
document.write("Please note that the NCERT textbooks are copyrighted.");
document.write("</p><p align='justify'></p><p align='justify' style=\"line-height:20px;font-size:12px\">");
document.write("While copies of these textbooks may be downloaded and used as textbooks or for reference, republication of NCERT textbooks by any other individual or agency is strictly prohibited. No agency or individual may make electronic or print copies of these books and redistribute them in any form whatsoever. Use of these online books as a part of digital content packages or software is also strictly prohibited. No website or online service is permitted to host these online textbooks.");
document.write("</p><p align='justify'></p><p align='justify' style=\"line-height:20px;font-size:12px\">");
document.write("Links may however be provided with written permission from the NCERT. ");
document.write("</p><p align='justify'></p><p align='left' style=\"line-height:20px\">");
document.write("<b>Discouraging Piracy</b>");
document.write("</p><p align='justify'></p><p align='justify' style=\"line-height:20px;font-size:12px\">");
document.write("In order to discourage piracy, the online textbooks carry a watermark on all pages declaring the copyright of NCERT. DO NOT BUY OR SELL electronic or printed books with watermarked pages.");
document.write("</p><p align='justify'></p><p align='justify' style=\"line-height:20px;font-size:12px\">");
document.write("Please bring to our notice any infringement or violation of copyright and commercial exploitation of these textbooks. ");
 document.write("</p><p align='justify'></p><p align='justify' style=\"line-height:20px;font-size:12px\">");
document.write("Join us in the Education for All mission . Help us reach these textbooks to children, teachers and schools. ");
document.write("</p><p align='justify'></p><p align='justify' style=\"line-height:20px;font-size:12px\">");
document.write("Help us improve our services. Send your comments, suggestions or queries to <u>dceta.ncert@nic.in</u>");
document.write("</p><p align='justify'></p><p align='left' style=\"line-height:20px\">");
/*document.write("<b>Rationalised Textbooks</b>");
document.write("</p><p align='justify'></p><p align='justify' style=\"line-height:20px;font-size:12px\">");
document.write("In view of the COVID-19 pandemic, it was felt imperative to reduce content load on students. The National Education Policy 2020 also emphasises reducing the content load and providing opportunities for experiential learning with creative mindset. In this background, the NCERT had undertaken the exercise to rationalise the textbooks across all classes and all subjects. Learning Outcomes already developed by the NCERT across classes had been taken into consideration in this exercise. Contents of the textbooks had been rationalised in view of the following: ");
document.write("</p><p align='justify'></p><p align='justify' style=\"line-height:20px;font-size:12px\"><ul align='justify' style=\"line-height:20px;font-size:12px\">");
document.write("<li>Content based on genres of literature in the textbooks and supplementary readers at different stages of school education </li> ");
document.write("<li>Content that is meant for achieving Learning Outcomes for developing language proficiency and is accessible at different stages </li> ");
document.write("<li>For reducing the curriculum load and examination stress in view of the prevailing condition of the Pandemic </li> ");
document.write("<li>Content, which is easily accessible to students without much interventions from teachers and can be learned by children through self-learning or peer-learning  </li> ");
document.write("<li>Content, which is irrelevant in the present context. The present edition, is a reformatted version after carrying out the changes given above.</li> ");
document.write("</ul></p><p align='justify'></p><p align='justify' style=\"line-height:20px;font-size:12px\">");
document.write("<strong>The present textbooks uploaded in pdf form are rationalised textbooks. These were rationalised for the session 2022-23 and will continue in 2024-25.</strong> ");*/





document.write("</p></td></tr></table></td>	</tr></table>");								
									
									
									
											 
									
									
									
									
									
						 			
									 

  }
  else
  {

    querystring1 = querystring1.split("?");

	
	
		 document.write("<td class='sidebar-menu' width='' valign='top' ><div><table width='100%' >");							 
									  var name = new String();  
    var value = new String();  
   
	  
    querystring1 = querystring1[1].split("&");  
	 
    for(q=0;q<querystring1.length;q++){  
        var pair = querystring1[q].split("=");  
        name = pair[0].toLowerCase();  
        value = pair[1].toLowerCase(); 
		 
       
	//	this.open("../1.pdf", "Title", "width:300;height:;"); 
    } 
	var sss;
	sss = name.split("%20");
	
	var df=pair[1];
	
	var co=df.split("-");
	var cou=co[0];
	var cha=co[1];
	var pm=sss[0];	
	
var i;
	
	
	//	var url = "<a href='textbook.php? " + pm + " =1'>Prelims </a>";

		// alert("url" +url);
		
		
		
		// For Urdu Text books
		if(pm=="geof1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Organic Farming</strong></br></td></tr>");	
			
		}
		if(pm=="ieeo1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>IT Domestic Data Entry Operator</strong></br></td></tr>");	
			
		}
		if(pm=="iict1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Information and Communication Technology</strong></br></td></tr>");	
			
		}
		
	if(pm=="iees1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Employability Skill </strong></br></td></tr>");	
			
		}
		if(pm=="kedf1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Dair Farmer Enterpreneur</strong></br></td></tr>");	
			
		}
		if(pm=="kefc1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Floriculturist</strong></br></td></tr>");	
			
		}
		if(pm=="khhc1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Bhartiya Hastkala Parmparaon ki Khoj</strong></br></td></tr>");	
			
		}
		 if(pm=="mehc1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Exploring Craft Tradition of India</strong></br></td></tr>");	
			
		}
	  if(pm=="kehc1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Living Craft Tradition of India</strong></br></td></tr>");	
			
		}
		if(pm=="khct1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Computer Aur Sanchaar Prodhogiki -I</strong></br></td></tr>");	
			
		}
		if(pm=="khct2")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Computer Aur Sanchaar Prodhogiki -II</strong></br></td></tr>");	
			
		}
	  if(pm=="klss1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Sanskrit Sahitya parichay</strong></br></td></tr>");	
			
		}
		if(pm=="kham1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Abhivyakti Aur Madhyam</strong></br></td></tr>");	
			
		}	
	if(pm=="kegd1")
		{
		document.write("<tr valign='top' font-style='color:white'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>The Story of Graphic Design</strong></br></td></tr>");	
			
		}	
	if(pm=="khgd1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white'  height='25' width='100%'><strong>Graphics Design ek Kahani</strong></br></td></tr>");	
			
		}
		if(pm=="leep2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problems(English)</strong></br></td></tr>");	
			
		}
		if(pm=="lhep2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problems(Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="leep5")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problems</strong></br></td></tr>");	
			
		}
		if(pm=="lhep4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problems(Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="leep4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problems</strong></br></td></tr>");
		}
			
		if(pm=="leep6")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problems(English)</strong></br></td></tr>");
			}
			if(pm=="lhep6")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problems(Hindi)</strong></br></td></tr>");
			}
			
		if(pm=="legd1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>New Age Graphics Design</strong></br></td></tr>");	
			
		}
		if(pm=="aulb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ibtedai Urdu-I</strong></br></td></tr>");	
			
		}
	    if(pm=="auri1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi</strong></br></td></tr>");
		}
		if(pm=="buib1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ibtedai Urdu-II</strong></br></td></tr>");	
			
		}
	    if(pm=="buri1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi ka Jadu</strong></br></td></tr>");	
		}
		if(pm=="culb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ibtedai Urdu</strong></br></td></tr>");	
			
		}
	    if(pm=="curi1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi-III</strong></br></td></tr>");	
			
		}
	    if(pm=="cuap1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Aas Pass (Urdu)</strong></br></td></tr>");	
			
		}
	   /* if(pm=="dulb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ibtedai Urdu-IV</strong></br></td></tr>");	
			
		}*/
		if(pm=="dust1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sitaar</strong></br></td></tr>");	
			
		}
			if(pm=="eust1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sitaar</strong></br></td></tr>");	
			
		}
		if(pm=="eemm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela</strong></br></td></tr>");	
			
		}
		if(pm=="emtmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Maithili)</strong></br></td></tr>");	
			
		}
		if(pm=="eskmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Sanskrit)</strong></br></td></tr>");	
			
		}
		if(pm=="esnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Santhali)</strong></br></td></tr>");	
			
		}
		if(pm=="egjmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Gujarati)</strong></br></td></tr>");	
			
		}
		if(pm=="eksmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Kashmiri)</strong></br></td></tr>");	
			
		}
		if(pm=="esimm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Sindhi)</strong></br></td></tr>");	
			
		}
		
		if(pm=="etlmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Telugu)</strong></br></td></tr>");	
			
		}
		if(pm=="emlmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Malayalam)</strong></br></td></tr>");	
			
		}
		if(pm=="edgmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Dogri)</strong></br></td></tr>");	
			
		}
			if(pm=="ebnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Bengali)</strong></br></td></tr>");	
			
		}
		if(pm=="ekomm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Konkani)</strong></br></td></tr>");	
			
		}
		if(pm=="easmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Assamese)</strong></br></td></tr>");	
			
		}
		if(pm=="ebdmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Bodo)</strong></br></td></tr>");	
			
		}
		if(pm=="enpmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Nepali)</strong></br></td></tr>");	
			
		}
		if(pm=="eknmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Kannada)</strong></br></td></tr>");	
			
		}
		if(pm=="emnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Manipuri)</strong></br></td></tr>");	
			
		}
		if(pm=="epnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Punjabi)</strong></br></td></tr>");	
			
		}
		
		
		if(pm=="eormm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Odia)</strong></br></td></tr>");	
			
		}
		if(pm=="emrmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela(Marathi)</strong></br></td></tr>");	
			
		}
		if(pm=="etmmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math Mela (Tamil)</strong></br></td></tr>");	
			
		}
		if(pm=="ehmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit Mela</strong></br></td></tr>");	
			
		}
		if(pm=="eumm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi Mela</strong></br></td></tr>");	
			
		}
		
	    if(pm=="duri1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi Ka Jadu</strong></br></td></tr>");	
			
		} if(pm=="duap1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Aas-Paas Urdu</strong></br></td></tr>");	
			
		}if(pm=="eulb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ibtedai Urdu Class-V</strong></br></td></tr>");	
			
		}if(pm=="euma1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>math-magic-V</strong></br></td></tr>");	
			
		}if(pm=="euev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>EVS-V (Urdu)</strong></br></td></tr>");	
			
		}if(pm=="fuaz1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Apni Zuban-VI</strong></br></td></tr>");	
			
		}if(pm=="furi1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi-VI</strong></br></td></tr>");	
			
		}if(pm=="fuse1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>science-VI</strong></br></td></tr>");	
			
		}if(pm=="fuhm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamare Mazi</strong></br></td></tr>");	
			
		}if(pm=="fuzm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Zameen Hamara Maskan</strong></br></td></tr>");	
			
		}if(pm=="fuss1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samazi Aur Siyasi Zindagi</strong></br></td></tr>");	
			
		}if(pm=="fuug1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Urdu Guldasta</strong></br></td></tr>");	
			
		}if(pm=="fujp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jaan Pahechan</strong></br></td></tr>");	
			
		}
		if(pm=="guaz1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Apni Zaban</strong></br></td></tr>");	
			
		}if(pm=="guma1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math (Urdu)</strong></br></td></tr>");	
			
		}if(pm=="gemp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problems (English)</strong></br></td></tr>");	
			
		}
		if(pm=="guse1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>SCIENCE (Urdu)</strong></br></td></tr>");	
			
		}if(pm=="guhm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamare Mazi (History)</strong></br></td></tr>");	
			
		}if(pm=="guha1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamare Mahol (Geography)</strong></br></td></tr>");	
			
		}if(pm=="gugu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Urdu Guldasta-Suppl</strong></br></td></tr>");	
			
		}if(pm=="gudp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Door-Pass</strong></br></td></tr>");	
			
		}if(pm=="guhs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>HISTORY-VIII PART-I (Urdu)</strong></br></td></tr>");	
			
		}if(pm=="guhs2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>HISTORY-VIII PART-II (Urdu)</strong></br></td></tr>");	
			
		}if(pm=="huaz1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Apni Zaban</strong></br></td></tr>");	
			
		}if(pm=="huug1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Urdu Guldasta (Supl)</strong></br></td></tr>");	
			
		}if(pm=="hudp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Door Pass</strong></br></td></tr>");	
			
		}if(pm=="hujp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jaan Pahechan</strong></br></td></tr>");	
			
		}if(pm=="huse1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Science</strong></br></td></tr>");	
			
		}if(pm=="huhi1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi</strong></br></td></tr>");	
			
		}if(pm=="hugy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Wasayel aur Taraqqui(Urdu)</strong></br></td></tr>");	
			
		}if(pm=="huss1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samaji Aur Siyasi Zindagi</strong></br></td></tr>");	
			
		}
		if(pm=="lecs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Computer Science</strong></br></td></tr>");	
			
		}
		if(pm=="leip1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Informatics Practices</strong></br></td></tr>");	
			
		}
		
		if(pm=="hores1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I (Odia)</strong></br></td></tr>");	
			
		}		
		
		if(pm=="huhm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamare Mazi-III</strong></br></td></tr>");	
			
		}if(pm=="june1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Nawa-e-Urdu</strong></br></td></tr>");	
			
		}if(pm=="juge1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Gulzar-e-Urdu</strong></br></td></tr>");	
			
		}if(pm=="juuq1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Urdu Qwaid aur Insha</strong></br></td></tr>");	
			
		}if(pm=="jujp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jaan Pahechan</strong></br></td></tr>");	
			
		}if(pm=="judp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Door-Paas</strong></br></td></tr>");	
			
		}if(pm=="jusr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sab Rang</strong></br></td></tr>");	
			
		}if(pm=="kubo1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hayatiyaat</strong></br></td></tr>");	
			
		}if(pm=="kugy3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jughrafia Mein Aamli Kam (Urdu)</strong></br></td></tr>");	
			
		}if(pm=="kugy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hindustan Tabi'i Mahaul (Urdu)</strong></br></td></tr>");	
			
		}
		if(pm=="kusc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Shumariyaat bar-e-Mushiyat</strong></br></td></tr>");	
			
		}if(pm=="kuec1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hindustan ki Masshi Tarraqiu</strong></br></td></tr>");	
			
		}if(pm=="kuic1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Indian Constitution at Work</strong></br></td></tr>");	
			
		}if(pm=="kuhc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hindustan me Dastkari Ki Riwayat</strong></br></td></tr>");	
			
		}if(pm=="kuhc2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Dastakari</strong></br></td></tr>");	
			
		}
		
		if(pm=="kugm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tabi'i Jughraiya Ka Mubadiyat (Urdu)</strong></br></td></tr>");	
			
		}
		
		
		if(pm=="kugy3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>India Physical Env(Geog)</strong></br></td></tr>");	
			
		}if(pm=="luga1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Gulistan-e- Adab</strong></br></td></tr>");	
			
		}if(pm=="luku1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khayaban-e-Urdu</strong></br></td></tr>");	
			
		}if(pm=="luna1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Nai Awaz</strong></br></td></tr>");	
			
		}if(pm=="ludh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Dhanak</strong></br></td></tr>");	
			
		}if(pm=="jhva1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vyakaranavithi</strong></br></td></tr>");	
			
		}
		
		if(pm=="isab1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Abhyaswaan Bhav</strong></br></td></tr>");	
			
		}
		if(pm=="luth1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tareekh-e-Hind ke Mauzuaat-I</strong></br></td></tr>");	
			
		}
		if(pm=="luth3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tareekh-e-Hind ke Mauzuaat-III</strong></br></td></tr>");	
			
		}
		if(pm=="lufh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Insani Geographia ke Mubadiyaat </strong></br></td></tr>");	
			
		}if(pm=="lugy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hindustan Awam Aur Maishat </strong></br></td></tr>");	
			
		}
		if(pm=="lugy3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jughrafia Mein Aamli Kam</strong></br></td></tr>");	
			
		}
		if(pm=="lume1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Juzvi Maashiyat Ka Taruf</strong></br></td></tr>");	
			
		}if(pm=="lume2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kulli Maashiyat Ka Taruf </strong></br></td></tr>");	
			
		}if(pm=="luis1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hindustani Samaj</strong></br></td></tr>");	
			
		}
		if(pm=="luac1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khatadari-I</strong></br></td></tr>");	
			
		}
		if(pm=="luac2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khatadari-II</strong></br></td></tr>");	
			
		}
		
		
		if(pm=="aemr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Mridang</strong></br></td></tr>");	
			
		}
		
		if(pm=="aejm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (English)</strong></br></td></tr>");	
			
		}

		if(pm=="aush1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Shahnai</strong></br></td></tr>");	
			
		}
		
		if(pm=="bush1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Shahnai</strong></br></td></tr>");	
			
		}



		
		if(pm=="ahjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Hindi)</strong></br></td></tr>");	
			
		}
		
		if(pm=="amrjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Marathi)</strong></br></td></tr>");	
			
		}
		if(pm=="asijm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Sindhi)</strong></br></td></tr>");	
			
		}
		
		if(pm=="apjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Punjabi)</strong></br></td></tr>");	
			
		}
		if(pm=="agjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Gujarati)</strong></br></td></tr>");	
			
		}
		
		if(pm=="ayjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Malayalam)</strong></br></td></tr>");	
			
		}
		
		if(pm=="akjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Konkani)</strong></br></td></tr>");	
			
		}
		if(pm=="aajm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Assamese)</strong></br></td></tr>");	
			
		}
		if(pm=="aijm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Maithili)</strong></br></td></tr>");	
			
		}
		if(pm=="aojm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Bodo)</strong></br></td></tr>");	
			
		}
		if(pm=="askjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Sanskrit)</strong></br></td></tr>");	
			
		}
		if(pm=="aorjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Oriya)</strong></br></td></tr>");	
			
		}
		if(pm=="abnjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Bengali)</strong></br></td></tr>");	
			
		}
		if(pm=="asnjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Santhali)</strong></br></td></tr>");	
			
		}
		if(pm=="amnjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Manipuri)</strong></br></td></tr>");	
			
		}
		if(pm=="aujm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Urdu)</strong></br></td></tr>");	
			
		}
		if(pm=="atmjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Tamil)</strong></br></td></tr>");	
			
		}
		if(pm=="adgjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Dogri)</strong></br></td></tr>");	
			
		}
		
		if(pm=="aksjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Kashmiri)</strong></br></td></tr>");	
			
		}
		
		if(pm=="aknjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Kannada)</strong></br></td></tr>");	
			
		}
		
		if(pm=="anpjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Nepali)</strong></br></td></tr>");	
			
		}
		
		if(pm=="atljm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Telugu)</strong></br></td></tr>");	
			
		}
		
		if(pm=="ahsr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sarangi</strong></br></td></tr>");	
			
		}
		if(pm=="bhsr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sarangi</strong></br></td></tr>");	
			
		}
		
		if(pm=="bejm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (English)</strong></br></td></tr>");	
			
		}
		if(pm=="basjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Assamese)</strong></br></td></tr>");	
			
		}
		if(pm=="bgjjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Gujarati)</strong></br></td></tr>");	
			
		}
		
		if(pm=="bmljm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Malayalam)</strong></br></td></tr>");	
			
		}
		if(pm=="bmtjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Maithli)</strong></br></td></tr>");	
			
		}
		
		if(pm=="bbdjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Bodo)</strong></br></td></tr>");	
			
		}
		if(pm=="bsijm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Sindhi)</strong></br></td></tr>");	
			
		}
		if(pm=="bmrjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Marathi)</strong></br></td></tr>");	
			
		}
		if(pm=="bbnjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Bengali)</strong></br></td></tr>");	
			
		}
		if(pm=="bskjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Sanskrit)</strong></br></td></tr>");	
			
		}
		if(pm=="bnpjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Nepali)</strong></br></td></tr>");	
			
		}
		if(pm=="borjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Oriya)</strong></br></td></tr>");	
			
		}
		if(pm=="bmnjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Manipuri)</strong></br></td></tr>");	
			
		}
		if(pm=="bujm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Urdu)</strong></br></td></tr>");	
			
		}
		if(pm=="bsnjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Santhali)</strong></br></td></tr>");	
			
		}
		if(pm=="bkojm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Konkani)</strong></br></td></tr>");	
			
		}
		if(pm=="bknjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Kannada)</strong></br></td></tr>");	
			
		}
		if(pm=="btmjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Tamil)</strong></br></td></tr>");	
			
		}
		if(pm=="btljm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Telugu)</strong></br></td></tr>");	
			
		}
		if(pm=="bksjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Kashmiri)</strong></br></td></tr>");	
			
		}
		if(pm=="bpnjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Punjabi)</strong></br></td></tr>");	
			
		}
		if(pm=="bhjm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Joyful-Mathematics (Hindi)</strong></br></td></tr>");	
			
		}
		
		if(pm=="bemr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Mridang</strong></br></td></tr>");	
			
		}
		if(pm=="cemm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela</strong></br></td></tr>");	
			
		}
		if(pm=="cksmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Kashmiri)</strong></br></td></tr>");	
			
		}

		if(pm=="chmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit Mela</strong></br></td></tr>");	
			
		}
		if(pm=="casmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Assamese)</strong></br></td></tr>");	
			
		}
		if(pm=="cbnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Bengali)</strong></br></td></tr>");	
			
		}
		if(pm=="cbdmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Bodo)</strong></br></td></tr>");	
			
		}
		if(pm=="cdgmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Dogri)</strong></br></td></tr>");	
			
		}
		if(pm=="cgjmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Gujarati)</strong></br></td></tr>");	
			
		}
		if(pm=="cknmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Kannada)</strong></br></td></tr>");	
			
		}
		if(pm=="cmtmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Maithili)</strong></br></td></tr>");	
			
		}
		if(pm=="cmlmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Malayalam)</strong></br></td></tr>");	
			
		}
		if(pm=="cmnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Manipuri)</strong></br></td></tr>");	
			
		}
		if(pm=="cnpmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Nepali)</strong></br></td></tr>");	
			
		}
		if(pm=="cormm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Odia)</strong></br></td></tr>");	
			
		}
		if(pm=="cpnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Punjabi)</strong></br></td></tr>");	
			
		}
		if(pm=="csnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Santhali)</strong></br></td></tr>");	
			
		}
		if(pm=="ctmmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Tamil)</strong></br></td></tr>");	
			
		}
		if(pm=="ctlmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Telugu)</strong></br></td></tr>");	
			
		}
		if(pm=="cskmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Sanskrit)</strong></br></td></tr>");	
			
		}
		if(pm=="cmrmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Marathi)</strong></br></td></tr>");	
			
		}

		if(pm=="ckomm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Konkani)</strong></br></td></tr>");	
			
		}
		if(pm=="csimm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maths Mela (Sindhi)</strong></br></td></tr>");	
			
		}


		if(pm=="chve1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Veena</strong></br></td></tr>");	
			
		}
		if(pm=="ehve1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Veena</strong></br></td></tr>");	
			
		}
		if(pm=="cesa1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Santoor</strong></br></td></tr>");	
			
		}
		if(pm=="cuev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairat Angez Duniya</strong></br></td></tr>");	
			
		}
		
		
		
		
		if(pm=="chev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamara Adhbhut Sansar</strong></br></td></tr>");	
			
		}
		if(pm=="dhev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamara Adhbhut Sansar</strong></br></td></tr>");	
			
		}

		

		if(pm=="cbnev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Bengali)</strong></br></td></tr>");	
			
		}

		if(pm=="corev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Odia)</strong></br></td></tr>");	
			
		}
		if(pm=="cmrev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Marathi)</strong></br></td></tr>");	
			
		}
		if(pm=="cnpev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Nepali)</strong></br></td></tr>");	
			
		}
		if(pm=="ctlev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Telugu)</strong></br></td></tr>");	
			
		}

		if(pm=="cgjev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Gujrati)</strong></br></td></tr>");	
			
		}

		if(pm=="cskev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Sanskrit)</strong></br></td></tr>");	
			
		}
		if(pm=="cmnev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Manipuri)</strong></br></td></tr>");	
			
		}
		if(pm=="casev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Assamese)</strong></br></td></tr>");	
			
		}

if(pm=="cbdev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Bodo)</strong></br></td></tr>");	
			
		}
		if(pm=="cpnev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Punjabi)</strong></br></td></tr>");	
			
		}
		if(pm=="cmlev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Malayalam)</strong></br></td></tr>");	
			
		}
		if(pm=="cmtev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Maithili)</strong></br></td></tr>");	
			
		}
		if(pm=="cdgev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Dogri)</strong></br></td></tr>");	
			
		}
		if(pm=="ctmev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Tamil)</strong></br></td></tr>");	
			
		}
		if(pm=="csiev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Sindhi)</strong></br></td></tr>");	
			
		}
		if(pm=="cksev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Kashmiri)</strong></br></td></tr>");	
			
		}
		if(pm=="csnev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Santhali)</strong></br></td></tr>");	
			
		}
		if(pm=="cknev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Kannada)</strong></br></td></tr>");	
			
		}
		
		if(pm=="ceev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World</strong></br></td></tr>");	
			
		}
if(pm=="ckoev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Konkani)</strong></br></td></tr>");	
			
		}
		if(pm=="cebu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I</strong></br></td></tr>");	
			
		}




		if(pm=="cbnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Bengali)</strong></br></td></tr>");	
			
		}
		if(pm=="cmtbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Maithili)</strong></br></td></tr>");	
			
		}
		if(pm=="cmnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Manipuri)</strong></br></td></tr>");	
			
		}
		if(pm=="cmrbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Marathi)</strong></br></td></tr>");	
			
		}
		if(pm=="cnpbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Nepali)</strong></br></td></tr>");	
			
		}
		if(pm=="cpnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Punjabi)</strong></br></td></tr>");	
			
		}
		if(pm=="cbdbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Bodo)</strong></br></td></tr>");	
			
		}
		if(pm=="cgjbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Gujarati)</strong></br></td></tr>");	
			
		}

		if(pm=="cdgbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Dogri)</strong></br></td></tr>");	
			
		}
		if(pm=="ckobu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Konkani)</strong></br></td></tr>");	
			
		}
		
		if(pm=="csnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Santhali)</strong></br></td></tr>");	
			
		}
		if(pm=="ctmbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Tamil)</strong></br></td></tr>");	
			
		}
		if(pm=="ctlbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Telugu)</strong></br></td></tr>");	
			
		}
		if(pm=="casbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Assamese)</strong></br></td></tr>");	
			
		}
		if(pm=="cknbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Kannada)</strong></br></td></tr>");	
			
		}
	if(pm=="cskbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Sanskrit)</strong></br></td></tr>");	
			
		}

		if(pm=="cmlbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Malayalam)</strong></br></td></tr>");	
			
		}

		if(pm=="corbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Odia)</strong></br></td></tr>");	
			
		}
	if(pm=="csibu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Sindhi)</strong></br></td></tr>");	
			
		}
		if(pm=="cksbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Kashmiri)</strong></br></td></tr>");	
			
		}

		if(pm=="chbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri - I (Hindi)</strong></br></td></tr>");	
			
		}




		if(pm=="ceky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga</strong></br></td></tr>");	
			
		}
		if(pm=="cuky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Urdu)</strong></br></td></tr>");	
			
		}
		if(pm=="chky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="cmlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Malayalam)</strong></br></td></tr>");	
			
		}
		if(pm=="cbnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Bengali)</strong></br></td></tr>");	
			
		}
		if(pm=="cgjky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Gujarati)</strong></br></td></tr>");	
			
		}
		if(pm=="cknky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Kannada)</strong></br></td></tr>");	
			
		}
		if(pm=="ckoky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Konkani)</strong></br></td></tr>");	
			
		}
		if(pm=="cmnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Manipuri)</strong></br></td></tr>");	
			
		}
		if(pm=="cnpky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Nepali)</strong></br></td></tr>");	
			
		}

		if(pm=="corky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Odia)</strong></br></td></tr>");	
			
		}


		if(pm=="cpnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Punjabi)</strong></br></td></tr>");	
			
		}
		if(pm=="casky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Assemese)</strong></br></td></tr>");	
			
		}
		if(pm=="cdgky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Dogri)</strong></br></td></tr>");	
			
		}
		if(pm=="ctmky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Tamil)</strong></br></td></tr>");	
			
		}
		if(pm=="cmrky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Marathi)</strong></br></td></tr>");	
			
		}
		if(pm=="cbdky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Bodo)</strong></br></td></tr>");	
			
		}
		if(pm=="cmtky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Maithili)</strong></br></td></tr>");	
			
		}
		if(pm=="csiky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Sindhi)</strong></br></td></tr>");	
			
		}
		if(pm=="cksky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Kashmiri)</strong></br></td></tr>");	
			
		}
		if(pm=="ctlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Telugu)</strong></br></td></tr>");	
			
		}
		if(pm=="cskky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Sanskrit)</strong></br></td></tr>");	
			
		}
		if(pm=="csnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Santhali)</strong></br></td></tr>");	
			
		}

		
		if(pm=="cust1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sitar</strong></br></td></tr>");	
			
		}
		if(pm=="cumm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi Mela</strong></br></td></tr>");	
			
		}
		
		
		if(pm=="lupy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Nafsiat(Psychology)</strong></br></td></tr>");	
			
		}if(pm=="luth2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tareekh-e-Hind ke Mauzuaat-II</strong></br></td></tr>");	
			
		}if(pm=="lubs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Karobari Uloom I</strong></br></td></tr>");	
			
		}if(pm=="lubs2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Karobari Uloom II</strong></br></td></tr>");	
			
		}
		
		if(pm=="aeen1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' background='' height='25' width='100%'><strong>Marigold</strong></br></td></tr>");	
	
	
		}
		
		
		
		if(pm=="kepy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' background='' height='25' width='100%'><strong>Psychology</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="luhc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hindustan me Dastkari Ki Riwayat</strong></br></td></tr>");	
	
	
		}if(pm=="lehc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Craft Tradition of India</strong></br></td></tr>");	
	
	
		}if(pm=="lhhc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bharatiya Hastkla Ki Paramparayen</strong></br></td></tr>");	
	
	
		}if(pm=="ahhn1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Rimjhim</strong></br></td></tr>");	
	
	
		}
		if(pm=="aemh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Magic</strong></br></td></tr>");	
	
	
		}
		if(pm=="ahmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit ka Jadu</strong></br></td></tr>");	
	
	
		}
		if(pm=="been1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Marigold</strong></br></td></tr>");	
	
	
		}
		if(pm=="bhhn1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Rimjhim</strong></br></td></tr>");	
	
	
		}
		if(pm=="bhmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit ka Jadu</strong></br></td></tr>");	
	
	
		}
		if(pm=="bemh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Magic</strong></br></td></tr>");	
	
	
		}
		if(pm=="chhn1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Rimjhim</strong></br></td></tr>");	
	
	
		}
		if(pm=="ceen1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Marigold</strong></br></td></tr>");	
	
	
		}
		if(pm=="chmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit ka Jadu</strong></br></td></tr>");	
	
	
		}
		if(pm=="cemh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Magic</strong></br></td></tr>");	
	
	
		}
		if(pm=="ceap1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Looking Arround</strong></br></td></tr>");	
	
	
		}
		if(pm=="chap1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ass-Pass</strong></br></td></tr>");	
	
	
		}
		if(pm=="dhap1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ass-Pass</strong></br></td></tr>");	
	
	
		}
		if(pm=="deap1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Looking Arround</strong></br></td></tr>");	
	
	
		}
		if(pm=="deev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World</strong></br></td></tr>");	
	
	
		}
		if(pm=="dmtev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dtlev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dsiev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dsnev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dksev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dtmev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dmnev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ddgev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dasev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dnpev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dbdev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World (Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dmlev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World (Malayalam)</strong></br></td></tr>");	
	
	
		}
		
		
		
		
		
		if(pm=="dasky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World (Assamae)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dmrev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World (Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dorev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dbnev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dkoev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Konkani)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dgjev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dknev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dskev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World(Sanskrit)</strong></br></td></tr>");	
	
	
		}
			if(pm=="duev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairatangez Duniya</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dpev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wonderous World (Punjabi) </strong></br></td></tr>");	
	
	    }
	
		if(pm=="euev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairatangez Duniya</strong></br></td></tr>");	
		}
	
		if(pm=="eeev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World</strong></br></td></tr>");	
		
	 
		}
		if(pm=="esiev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Sindhi)</strong></br></td></tr>");	
		
	 
		}
		if(pm=="ekoev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Konkani)</strong></br></td></tr>");	
		
	 
		}
		if(pm=="easev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Assamese)</strong></br></td></tr>");	
		
	 
		}
		if(pm=="ebdev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Bodo)</strong></br></td></tr>");	
		
	 
		}
		if(pm=="emtev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Maithili)</strong></br></td></tr>");	
		
	 
		}
		if(pm=="eksev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Kashmiri)</strong></br></td></tr>");	
		
	 
		}
		
		if(pm=="etlev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Telugu)</strong></br></td></tr>");	
		
	 
		}
		if(pm=="emrev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Marathi)</strong></br></td></tr>");	
		
	 
		}
		if(pm=="emnev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Manipuri)</strong></br></td></tr>");	
		
	 
		}
		
	
		
		
		if(pm=="etmev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Tamil)</strong></br></td></tr>");	
		
	   // }
	
		//if(pm=="euev1")
		//{
		//document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairatangez Duniya</strong></br></td></tr>");
	
		}
		
		if(pm=="epnev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Punjabi)</strong></br></td></tr>");	
		
	   // }
	
		//if(pm=="euev1")
		//{
		//document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairatangez Duniya</strong></br></td></tr>");
	
		}
		
		if(pm=="eknev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Kannada)</strong></br></td></tr>");	
		
	   // }
	
		//if(pm=="euev1")
		//{
		//document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairatangez Duniya</strong></br></td></tr>");
	
		}
		
		if(pm=="enpev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Nepali)</strong></br></td></tr>");	
		
	   // }
	
		//if(pm=="euev1")
		//{
		//document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairatangez Duniya</strong></br></td></tr>");
	
		}
		if(pm=="ebnev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Bengali)</strong></br></td></tr>");	
		
	   // }
	
		//if(pm=="euev1")
		//{
		//document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairatangez Duniya</strong></br></td></tr>");
	
		}
		
		
		if(pm=="eskev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Sanskrit)</strong></br></td></tr>");	
		
	   // }
	
		//if(pm=="euev1")
		//{
		//document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairatangez Duniya</strong></br></td></tr>");
	
		}
		if(pm=="emlev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Malayalam)</strong></br></td></tr>");	
		
	   // }
	
		//if(pm=="euev1")
		//{
		//document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairatangez Duniya</strong></br></td></tr>");
	
		}
		if(pm=="edgev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World (Dogri)</strong></br></td></tr>");	
		
	   // }
	
		//if(pm=="euev1")
		//{
		//document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairatangez Duniya</strong></br></td></tr>");
	
		}
		if(pm=="egjev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Gujarati)</strong></br></td></tr>");
		}
		
		if(pm=="ebnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Bengali)</strong></br></td></tr>");
		}
		
		
		
		
		if(pm=="eorev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Odia)</strong></br></td></tr>");
		}
		
		if(pm=="esnev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Wondrous World(Santhali)</strong></br></td></tr>");
		}
		
		if(pm=="ehev1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamara Adbhut Sansar</strong></br></td></tr>");	
	   // }
	
		//if(pm=="euev1")
		//{
		//document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamari Hairatangez Duniya</strong></br></td></tr>");
	
		}
		if(pm=="dhhn1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Rimjhim</strong></br></td></tr>");	
	
	
		}
		if(pm=="dhve1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Veena</strong></br></td></tr>");	
	
	
		}
		if(pm=="dhmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit Ka Jadu</strong></br></td></tr>");	
	
	
		}
		if(pm=="deen1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Marigold</strong></br></td></tr>");	
	
	
		}
		if(pm=="desa1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Santoor</strong></br></td></tr>");	
	
	
		}
		if(pm=="eesa1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Santoor</strong></br></td></tr>");	
	
	
		}
		if(pm=="debu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri</strong></br></td></tr>");	
	
	
		}
		if(pm=="dknbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dmtbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dsnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dtlbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dmrbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dksbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dmlbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Malayalam)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dskbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dmnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ddgbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Dogri)</strong></br></td></tr>");	
	
	
		}
		
		
		if(pm=="dbnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dasbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Assamese)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dkobu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri (Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dnpbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dbdbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri (Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dtmbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dgjbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dpnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dsibu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dorbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri (Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dubu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri (Urdu) </strong></br></td></tr>");	
	
	
		}
		if(pm=="dhbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri (Hindi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="eebu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri</strong></br></td></tr>");	
		}
		if(pm=="ekobu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Konkani)</strong></br></td></tr>");	
		}
		if(pm=="esnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Santhali)</strong></br></td></tr>");	
		}
		if(pm=="ebdbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Bodo)</strong></br></td></tr>");	
		}
		
		if(pm=="esibu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Sindhi)</strong></br></td></tr>");	
		}
		if(pm=="etlbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Telugu)</strong></br></td></tr>");	
		}
		if(pm=="emnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Manipuri)</strong></br></td></tr>");	
		}
		if(pm=="emlbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Malayalam)</strong></br></td></tr>");	
		}
		if(pm=="emrbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Marathi)</strong></br></td></tr>");	
		}
		if(pm=="eskbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Sanskrit)</strong></br></td></tr>");	
		}
		if(pm=="easbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Assamese)</strong></br></td></tr>");	
		}
		if(pm=="enpbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Nepali)</strong></br></td></tr>");	
		}
		
		if(pm=="eksbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Kashmiri)</strong></br></td></tr>");	
		}
		if(pm=="etmbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Tamil)</strong></br></td></tr>");	
		}
		if(pm=="edgbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Dogri)</strong></br></td></tr>");	
		}
		if(pm=="ebnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Bengali)</strong></br></td></tr>");	
		}
		if(pm=="eknbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Kannada)</strong></br></td></tr>");	
		}
		if(pm=="epnbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri (Punjabi)</strong></br></td></tr>");	
		}
		if(pm=="eorbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri(Odia)</strong></br></td></tr>");	
		}
		
		if(pm=="emtbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri (Maithili)</strong></br></td></tr>");	
		}
		
		if(pm=="egjbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri (Gujarati)</strong></br></td></tr>");	
		}
		
		
		if(pm=="ehbu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri (Hindi)</strong></br></td></tr>");	
		}
		if(pm=="eubu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bansuri (Urdu)</strong></br></td></tr>");	
		}
		
		
		
		
		
		
		
		
		
		if(pm=="deky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga</strong></br></td></tr>");	
	
	
		}
		if(pm=="dsnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga</strong></br></td></tr>");	
	
	
		}
		if(pm=="dsiky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dkoky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Konkani)</strong></br></td></tr>");	
	
	
		}
			if(pm=="dbdky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dmtky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Maithili)</strong></br></td></tr>");	
	
	
		}
		
		
		
		if(pm=="dmnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Manipuri)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dmlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Malayalam)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="ddgky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dskky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dnpky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dknky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dksky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dknky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dtlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga</strong></br></td></tr>");	
	
	
		}
		if(pm=="dmrky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dpnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dtmky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dbnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Bengali)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dgjky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dorky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Odia)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dhky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Hindi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="eeky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga</strong></br></td></tr>");	
	
	
		}
		if(pm=="emlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="esnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="esiky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Sindhi)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="ebdky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="emrky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="eksky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ebdky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Bodo)</strong></br></td></tr>");	
	
	
		}
		
		
		if(pm=="easky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="eskky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ekoky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Konkani)</strong></br></td></tr>");	
	
	
		}
			if(pm=="egjky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="etlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="emnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="emtky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Maithili)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="enpky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="etmky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="edgky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="eknky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga (Kannada)</strong></br></td></tr>");	
	
	
		}
		
		
		
		if(pm=="epnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="eorky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yoga(Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="demh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Magic</strong></br></td></tr>");	
	
	
		}
		if(pm=="demm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela</strong></br></td></tr>");	
	
	
		}
		if(pm=="dksmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dtmmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dsnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dtlmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dkomm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dknmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dmlmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dskmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dmrmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Marathi)</strong></br></td></tr>");	
	
	
		}
		
		
		
			if(pm=="dbnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Bengali)</strong></br></td></tr>");	
	
	
		}
				if(pm=="dasmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dbdmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dormm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Odia)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dsimm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Sindhi)</strong></br></td></tr>");	
	
	
		}
		

		if(pm=="dmnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dnpmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ddgmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dgjmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dpnmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela (Punjabi)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="dmtmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Mela (Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="dumm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi Mela</strong></br></td></tr>");	
	
	
		}
		if(pm=="dhmm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit-Mela</strong></br></td></tr>");	
	
	
		}
		if(pm=="ehap1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ass-Pass</strong></br></td></tr>");	
	
	
		}
		if(pm=="eeap1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Looking Arround</strong></br></td></tr>");	
	
	
		}
		if(pm=="ehmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit</strong></br></td></tr>");	
	
	
		}
		if(pm=="eemh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Math-Magic</strong></br></td></tr>");	
	
	
		}
		if(pm=="eeen1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Marigold</strong></br></td></tr>");	
	
	
		}
		if(pm=="ehhn1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Rimjhim</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhvs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vasant</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhml1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Malhar</strong></br></td></tr>");	
	
	
		}
		if(pm=="fekb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh</strong></br></td></tr>");	
	
	
		}

		if(pm=="fhkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Hindi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fbnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fbdkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fdgkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fkokb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="forkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fpnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmlkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Malayalam)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fknkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Kannada)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fmnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Manipuri)</strong></br></td></tr>");	
	
	
		}

		if(pm=="ftmkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Tamil)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fgjkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Gujarati)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fmtkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="faskb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fnpkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fskkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fsnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Santhali)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="ftlkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fkskb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmrkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Marathi)</strong></br></td></tr>");	
	
	
		}


		if(pm=="feky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra</strong></br></td></tr>");	
	
	
		}
		if(pm=="fukl1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jismani Taleem aur Tandurusti</strong></br></td></tr>");	
	
	
		}
		if(pm=="fgjky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmtky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="forky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fdgky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fkoky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fknky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Malayalam)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fbdky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fskky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fsnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmrky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fksky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Kashmiri)</strong></br></td></tr>");	
	
	
		}



		if(pm=="ftlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Hindi)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fbnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Bengali)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fpnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Punjabi)</strong></br></td></tr>");	
	
	
		}
if(pm=="fasky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fsiky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ftmky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fnpky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Nepali)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fepr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Poorvi</strong></br></td></tr>");	
	
	
		}
		if(pm=="fegp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash</strong></br></td></tr>");	
	
	
		}
		if(pm=="fugp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Urdu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fasgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fgjgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fkogp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Konkani)</strong></br></td></tr>");	
		}
		if(pm=="fsigp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Sindhi)</strong></br></td></tr>");	
		}
		if(pm=="fksgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Kashmiri)</strong></br></td></tr>");	
		}
		if(pm=="fsngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Santhali)</strong></br></td></tr>");	
		}
			if(pm=="fmngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Manipuri)</strong></br></td></tr>");	
		}

		if(pm=="fhgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Hindi)</strong></br></td></tr>");	
	
	
		}

		if(pm=="forgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fbdgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmlgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fpngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Punjabi)</strong></br></td></tr>");	
	
	
		}
if(pm=="fskgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fbngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Bengali)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="fmrgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ftmgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fkngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ftlgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmtgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fnpgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fdggp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fuky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khayal</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhdv1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Durva</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhbr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bal Ram Katha</strong></br></td></tr>");	
	
	
		}
		if(pm=="fehl1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Honeysuckle</strong></br></td></tr>");	
	
	
		}
		if(pm=="fepw1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>A Pact with the Sun</strong></br></td></tr>");	
	
	
		}
		if(pm=="femh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Mathematics</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit</strong></br></td></tr>");	
	
	
		}
		if(pm=="fess1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>History-Our Past I</strong></br></td></tr>");	
	
	
		}
		if(pm=="fees1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond</strong></br></td></tr>");	
	
	
		}
		if(pm=="fsies1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fases1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fkoes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Konkani)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fmnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmres1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Marathi)</strong></br></td></tr>");	
	
	
		}

		

		if(pm=="fskes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmles1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Malayalam)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fbnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fbdes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmtes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fnpes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ftmes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ftles1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fues1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Muashre Ki Daryaft Hindustan Aur Us Se Aage</strong></br></td></tr>");	
	
	
		}
		if(pm=="fsnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Santhali)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fgjes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Gujrati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fdges1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Dogri)</strong></br></td></tr>");	
	
	
		}


		if(pm=="fpnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fores1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Odia)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fkses1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fknes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samaj ka Aadhyan: Bharat or uske aage</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samaj ka Aadhyan: Bharat or uske aage</strong></br></td></tr>");	
	
	
		}
		if(pm=="gues1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Muashrey ki Daryaft - Hindustan aur Uske age</strong></br></td></tr>");	
	
	
		}
		if(pm=="gues2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Muashrey ki Daryaft - Hindustan aur Uske age Part-II</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhss1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Itihas-Hamare Atit I</strong></br></td></tr>");	
	
	
		}
		if(pm=="fess2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>The Earth: Our Habitat</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhss2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Prithvi: Hamara Avas</strong></br></td></tr>");	
	
	
		}
		if(pm=="fsde1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Deepakam</strong></br></td></tr>");	
	
	
		}
		if(pm=="fecu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity</strong></br></td></tr>");	
	
	
		}
		if(pm=="fsicu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="fkscu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fsncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jigyasa</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jigyasa</strong></br></td></tr>");	
	
	
		}
		if(pm=="gucu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tazassus</strong></br></td></tr>");	
	
	
		}
		if(pm=="fucu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tajassus</strong></br></td></tr>");	
	
	
		}
		if(pm=="ftmcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmlcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fkncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmtcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fpncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fbncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Bengali)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fnpcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Nepali)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fkocu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Konkani)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fmncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="forcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fskcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fascu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmrcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Marathi)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fbdcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fgjcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fdgcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Dogri)</strong></br></td></tr>");	
	
	
		}


		if(pm=="ftlcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Telugu)</strong></br></td></tr>");	
	
	
		}
		

		if(pm=="fekr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Hindi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Hindi)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fbnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Bengali)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fkokr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Konkani)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fbdkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Bodo)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fmtkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Maithili)</strong></br></td></tr>");	
	
	
		}

		if(pm=="fmnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="faskr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Assemese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fdgkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ftmkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmrkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fgjkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fskkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fnpkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fpnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ftlkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fkskr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fsikr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fsnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fmlkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="fknkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="forkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti-I (Odia)</strong></br></td></tr>");	
	
	
		}


		if(pm=="fess3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Social and Political Life-I</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhss3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samajik Evam Rajnitik Jeevan</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhsk1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ruchira</strong></br></td></tr>");	
	
	
		}
		if(pm=="fhsc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vigyan</strong></br></td></tr>");	
	
	
		}
		if(pm=="fesc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Science</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit</strong></br></td></tr>");	
	
	
		}
		//if(pm=="gemh1")
		//{
		//document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Mathematics</strong></br></td></tr>");	
	
	
		//}
		if(pm=="gesc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Science</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghsc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vigyan</strong></br></td></tr>");	
	
	
		}
		if(pm=="gehc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Honeycomb</strong></br></td></tr>");	
	
	
		}

		if(pm=="gegp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash</strong></br></td></tr>");	
	
	
		}
		if(pm=="gksgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmtgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmlgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gsngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Santhali)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="gasgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gkogp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gskgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gsigp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gbdgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gorgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gkngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gpngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gnpgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gdggp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gtmgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gtlgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmrgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Marathi)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="ggjgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gbngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gegp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmlgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II (Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gtlgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II (Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gasgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II (Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gbngp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II (Bengali)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="gtmgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II (Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ggjgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gkngp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmrgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II(Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gorgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II(Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gpngp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II(Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gugp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Urdu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Hindi)</strong></br></td></tr>");	
		}
		
		if(pm=="hegp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash</strong></br></td></tr>");	
	
	
		}
		if(pm=="hasgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hgjgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hsigp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hsngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmlgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hskgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hksgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hkogp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="htmgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hdggp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Dogri)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hmrgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hbngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hbdgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hnpgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="horgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hkngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="htlgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Telugu)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hmtgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hpngp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash(Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhgp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Hindi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hugp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash (Urdu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hegp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II</strong></br></td></tr>");	
	
	
		}
		if(pm=="hbngp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II(Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="htlgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II (Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hasgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II (Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmrgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II (Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmrgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II (Marathi)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hmlgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II (Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hgjgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="htmgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hkngp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hodgp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II(Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hpngp2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Prakash II(Punjabi)</strong></br></td></tr>");	
	
	
		}
		
		

		if(pm=="ghml1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Malhar</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhml1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Malhar</strong></br></td></tr>");	
	
	
		}

		if(pm=="gekr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmlkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti (Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gkskr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti (Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti (Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gnpkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gsikr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gtlkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gaskr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmtkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gsnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gtmkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gbdkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ggjkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gkokr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmrkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gdgkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Dogri)</strong></br></td></tr>");	
	    }
		if(pm=="gorkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti</strong></br></td></tr>");	
	
	
		}
		if(pm=="gknkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gskkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti (Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gbnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gpnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Punjabi)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hekr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti</strong></br></td></tr>");	
	    }
		if(pm=="hsikr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Sindhi)</strong></br></td></tr>");	
	    }
		if(pm=="hmtkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Maithili)</strong></br></td></tr>");	
	    }
		if(pm=="hmnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Manipuri)</strong></br></td></tr>");	
	    }
		
		if(pm=="hsnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Santhali)</strong></br></td></tr>");	
	    }
		if(pm=="hhkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti (Hindi)</strong></br></td></tr>");	
	    }
		if(pm=="hkokr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Konkani)</strong></br></td></tr>");	
	    }
		if(pm=="hgjkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Gujarati)</strong></br></td></tr>");	
	    }
		if(pm=="hkskr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Kashmiri)</strong></br></td></tr>");	
	    }
		if(pm=="hskkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Sanskrit)</strong></br></td></tr>");	
	    }
		if(pm=="haskr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Assamese)</strong></br></td></tr>");	
	    }
		if(pm=="hbdkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Krit(Bodo)</strong></br></td></tr>");	
	    }
		if(pm=="hbnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Krit(Bengali)</strong></br></td></tr>");	
	    }
		if(pm=="htlkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Krit(Telugu)</strong></br></td></tr>");	
	    }
		if(pm=="hnpkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Krit(Nepali)</strong></br></td></tr>");	
	    }
		
		if(pm=="horkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Odia)</strong></br></td></tr>");	
	    }
		if(pm=="hdgkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Dogri)</strong></br></td></tr>");	
	    }
		if(pm=="hknkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Kannada)</strong></br></td></tr>");	
	    }
		if(pm=="hmlkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Malayalam)</strong></br></td></tr>");	
	    }
		if(pm=="hpnkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti(Punjabi)</strong></br></td></tr>");	
	    }
		
		
		if(pm=="hukr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti (Urdu)</strong></br></td></tr>");
	
		}
		if(pm=="hpnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Punjabi)</strong></br></td></tr>");
	
		}
		
		if(pm=="hmrkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti (Marathi)</strong></br></td></tr>");
	
		}
		
		if(pm=="htmkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kriti (Tamil)</strong></br></td></tr>");
	
		}
		
		

		if(pm=="gsde1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Deepakam</strong></br></td></tr>");	
	
	
		}
		if(pm=="hsde1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Deepakam</strong></br></td></tr>");	
	
	
		}

		
		 if(pm=="gees1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond</strong></br></td></tr>");	
	     }
		  if(pm=="gkses1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Kashmiri)</strong></br></td></tr>");	
	     }
		 
		 if(pm=="gtles1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Telugu)</strong></br></td></tr>");	
	     }
		  if(pm=="gsies1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Sindhi)</strong></br></td></tr>");	
	     }
		 
		 if(pm=="gsnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Santhali)</strong></br></td></tr>");	
	     }
		  if(pm=="gases1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Assamese)</strong></br></td></tr>");	
	     }
		   if(pm=="gbnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Bengali)</strong></br></td></tr>");	
	     }
		  if(pm=="gbdes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Bodo)</strong></br></td></tr>");	
	     }
		 if(pm=="ggjes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Gujarati)</strong></br></td></tr>");	
	     }
		  if(pm=="gtmes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Tamil)</strong></br></td></tr>");	
	     }
		 if(pm=="gmles1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Malayalam)</strong></br></td></tr>");	
	     }
		 if(pm=="gknes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Kannada)</strong></br></td></tr>");	
	     }
		 if(pm=="gdges1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Dogri)</strong></br></td></tr>");	
	     }
		 if(pm=="gmnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Manipuri)</strong></br></td></tr>");	
	     }
		 if(pm=="gnpes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Nepali)</strong></br></td></tr>");	
	     }
		 if(pm=="gskes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Sanskrit)</strong></br></td></tr>");	
	     }
		 if(pm=="gmtes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond (Maithili)</strong></br></td></tr>");	
	     }
		 
		  if(pm=="gkoes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Konkani)</strong></br></td></tr>");	
	     }
		 
		  if(pm=="gpnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Punjabi)</strong></br></td></tr>");	
	     }
		 
		  if(pm=="gmres1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Marathi)</strong></br></td></tr>");	
	     }
		 
		 
		 
		  if(pm=="gores1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond(Odia)</strong></br></td></tr>");	
	     }

		if(pm=="gees2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part 2</strong></br></td></tr>");
	
		}
		if(pm=="gases2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part 2(Assamese)</strong></br></td></tr>");
	
		}
		if(pm=="gmres2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part 2(Marathi)</strong></br></td></tr>");
	
		}
		if(pm=="gtles2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part 2(Telugu)</strong></br></td></tr>");
	
		}
		
		if(pm=="gmles2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part 2 (Malayalam)</strong></br></td></tr>");
	
		}
		if(pm=="gbnes2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part 2(Bengali)</strong></br></td></tr>");
	
		}
		if(pm=="gtmes2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part 2(Tamil)</strong></br></td></tr>");
	
		}
			if(pm=="ggjes2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part 2 (Gujarati)</strong></br></td></tr>");
	
		}
		if(pm=="gknes2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part 2 (Kannada)</strong></br></td></tr>");
	
		}
		if(pm=="gores2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part 2 (Odia)</strong></br></td></tr>");
	
		}
		if(pm=="gpnes2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part 2 (Punjabi)</strong></br></td></tr>");
	
		}
		if(pm=="ghes2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samaj Ka Aadhyan: Bharat or uske aage Part-II</strong></br></td></tr>");
	
		}
		if(pm=="hees1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hbdes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hkses1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hsnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="htles1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hees2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-II</strong></br></td></tr>");	
	
	
		}
		if(pm=="hases1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hkoes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmtes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hsies1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hdges1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Dogri)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hmres1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hnpes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hknes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Kannada)</strong></br></td></tr>");	
	
	
		}
		
		
		if(pm=="htmes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hbnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hgjes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Gujrati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hpnes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmles1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I(Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hskes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploring Society India and Beyond Part-I (Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hues1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Muashrey ki Daryaft - Hindustan Aur Uske Age Part-I</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hhes1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samaj Ka Aadhyan: Bharat or uske aage Part-I</strong></br></td></tr>");	
	
	
		}


		if(pm=="gekb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh</strong></br></td></tr>");	
	
	
		}
		if(pm=="gsikb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gaskb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Assamese)</strong></br></td></tr>");	
	
	
		}
		
		
		if(pm=="gbdkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gkskb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmrkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gsnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmtkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gtlkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gnpkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Nepali)</strong></br></td></tr>");	
	
	
		}

		if(pm=="gmlkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gkokb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gbnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Bengali)</strong></br></td></tr>");	
	
	
		}

		if(pm=="gskkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Sanskrit)</strong></br></td></tr>");	
	
	
		}



		if(pm=="gknkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Kannada)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="gdgkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gtmkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="ggjkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh</strong></br></td></tr>");	
	
	
		}
		
		
		if(pm=="gpnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gorkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Odia)</strong></br></td></tr>");	
	
	
		}
		
		
		if(pm=="ggjkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Gujarati)</strong></br></td></tr>");	
	
	
		}

		if(pm=="ghkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Hindi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hekb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh</strong></br></td></tr>");	
	
	
		}
		if(pm=="hsikb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hkskb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="haskb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hbnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hsnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmlkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hkokb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmtkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Hindi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hdgkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="htmkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hpnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hnpkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmrkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hknkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="htlkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh</strong></br></td></tr>");	
	
	
		}
		if(pm=="hskkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="htlkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Telgu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="horkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh (Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hgjkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Gujarati)</strong></br></td></tr>");	
	
	
		}
			if(pm=="hbdkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Bodo)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hmnkb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaushal Bodh(Manipuri)</strong></br></td></tr>");	
	
	
		}


		if(pm=="geky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra</strong></br></td></tr>");	
	}
	if(pm=="gsiky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Sindhi)</strong></br></td></tr>");	
	}
	
	if(pm=="gasky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Assamese)</strong></br></td></tr>");	
	}
	if(pm=="gksky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Kashmiri)</strong></br></td></tr>");	
	}
	if(pm=="gmtky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Maithili)</strong></br></td></tr>");	
	}
	if(pm=="gnpky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Nepali)</strong></br></td></tr>");	
	}
	if(pm=="gmnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Manipuri)</strong></br></td></tr>");	
	}
	if(pm=="gmrky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Marathi)</strong></br></td></tr>");	
	}
	if(pm=="gkoky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Konkani)</strong></br></td></tr>");	
	}
	if(pm=="gbdky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Bodo)</strong></br></td></tr>");	
	}
	if(pm=="gskky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Sanskrit)</strong></br></td></tr>");	
	}
	if(pm=="gknky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Kannada)</strong></br></td></tr>");	
	}
	if(pm=="gtmky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Tamil)</strong></br></td></tr>");	
	}
	if(pm=="gtlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Telugu)</strong></br></td></tr>");	
	}
	if(pm=="gbnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Bengali)</strong></br></td></tr>");	
	}
	
	if(pm=="gorky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Odia)</strong></br></td></tr>");	
	}
	
	if(pm=="ggjky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Gujarati)</strong></br></td></tr>");	
	}
	if(pm=="gmlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Malayalam)</strong></br></td></tr>");	
	}
	
	if(pm=="gsnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Santhali)</strong></br></td></tr>");	
	}
	if(pm=="gdgky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Dogri)</strong></br></td></tr>");	
	}
	
		if(pm=="gpnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Punjabi)</strong></br></td></tr>");	
	}



		if(pm=="ghky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Hindi)</strong></br></td></tr>");
	
		}

		if(pm=="gukl1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Urdu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Hindi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="huky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Urdu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="heky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra</strong></br></td></tr>");	
	
	
		}
		if(pm=="hsnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hsiky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hasky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hksky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hkoky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmrky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Marathi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmtky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hasky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Assamese)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hnpky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="htmky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hbnky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hdgky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hbdky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hknky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="htlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hskky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hgjky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hmlky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="horky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra(Odia)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hmrky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Yatra (Marathi)</strong></br></td></tr>");	
	
	
		}


		if(pm=="guky1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khayal</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hukl1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khayal</strong></br></td></tr>");	
	
	
		}


		if(pm=="gecu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity</strong></br></td></tr>");	
	
		}
		if(pm=="ggjcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Gujarati)</strong></br></td></tr>");	
	
		}
		
		if(pm=="gsicu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Sindhi)</strong></br></td></tr>");	
	
		}
		if(pm=="gskcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Sanskrit)</strong></br></td></tr>");	
	
		}
		if(pm=="gmtcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Maithili)</strong></br></td></tr>");	
	
		}
		if(pm=="gsncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Santhali)</strong></br></td></tr>");	
	
		}
		
		if(pm=="gkocu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Konkani)</strong></br></td></tr>");	
	
		}
		if(pm=="gdgcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Dogri)</strong></br></td></tr>");	
	
		}
		
		if(pm=="gascu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Assamese)</strong></br></td></tr>");	
	
		}
		if(pm=="gnpcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Nepali)</strong></br></td></tr>");	
	
		}
		if(pm=="gmncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Manipuri)</strong></br></td></tr>");	
	
		}
		if(pm=="gtlcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Telugu)</strong></br></td></tr>");	
	
		}
		if(pm=="gbdcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Bodo)</strong></br></td></tr>");	
	
		}
		if(pm=="gtmcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Tamil)</strong></br></td></tr>");	
	
		}
		


		if(pm=="gbncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Bengali)</strong></br></td></tr>");	
	
	
		}		
		
		if(pm=="gorcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gkncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gkscu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmlcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gpncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="gmrcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Marathi)</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hecu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity</strong></br></td></tr>");	
	
	
		}
		if(pm=="hsicu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Sindhi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hkscu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity (Kashmiri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hsncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Santhali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hkncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Kannada)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hkocu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Konkani)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmtcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Maithili)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hnpcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Nepali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="horcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Odia)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmlcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Malayalam)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hgjcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Gujarati)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Manipuri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hskcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Sanskrit)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hbdcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Bodo)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hbncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Bengali)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hdgcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Dogri)</strong></br></td></tr>");	
	
	
		}
		if(pm=="htlcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Telugu)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hmrcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Marathi)</strong></br></td></tr>");	
	
	
		}
			if(pm=="hascu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Assamese)</strong></br></td></tr>");	
	
	
		}
		
		
		
		if(pm=="htmcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Tamil)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hpncu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Curiosity(Punjabi)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hucu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tajassus</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhcu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jigyasa</strong></br></td></tr>");	
	
	
		}

		if(pm=="gepr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Poorvi</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="fpunjabi1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Satluj</strong></br></td></tr>");	
		}
		
		
		if(pm=="ftami1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tamil Bhavani</strong></br></td></tr>");	
		}
		if(pm=="fnepa1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Nepali Teesta</strong></br></td></tr>");	
		}
		if(pm=="fmaly1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Malayalam Nila</strong></br></td></tr>");	
		}
		if(pm=="fkannada1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kannada Krishna</strong></br></td></tr>");	
		}
		if(pm=="fmargod11")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Marathi Godavari</strong></br></td></tr>");	
		}
			
		if(pm=="fsanthali1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sobornakha</strong></br></td></tr>");	
		
		}
		
		
		
		if(pm=="hepr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Poorvi</strong></br></td></tr>");	
	
	
		}


		if(pm=="geah1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>The Alien Hand Supplementry</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghvs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vasant</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghdv1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Durva Bhag-2</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghmb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bal Mahabharat Katha</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghsk1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ruchira</strong></br></td></tr>");	
	
	
		}
		if(pm=="gess1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>History-Our Pasts II</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghss1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Itihas-Hamare Atit II</strong></br></td></tr>");	
	
	
		}
		if(pm=="gess2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Geography-Our Environment</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghss2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhugol-Hamare Paryavaran</strong></br></td></tr>");	
	
	
		}
		if(pm=="gess3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Social and Political Life-2</strong></br></td></tr>");	
	
	
		}
		if(pm=="ghss3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samkalin aur Rajniti Jeevan-2</strong></br></td></tr>");	
	
	
		}if(pm=="guss3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samajik Aur Siyasi Zindagi</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhsk1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ruchira</strong></br></td></tr>");	
	
	
		}
		if(pm=="heih1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>It So Happened</strong></br></td></tr>");	
	
	
		}
		if(pm=="hehd1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Honeydew</strong></br></td></tr>");	
	
	
		}
		if(pm=="hemh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Mathematics</strong></br></td></tr>");	
	
	
		}
if(pm=="heep2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problems</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhep2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problems</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="hhmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhbk1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bharat ki Khoj</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhsb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sanshipt Budhcharit</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhdv1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Durva</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhvs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vasant</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhsc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vigyan</strong></br></td></tr>");	
	
	
		}
		if(pm=="hesc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Science</strong></br></td></tr>");	
	
	
		}
		if(pm=="hess4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Resourse and Developement (Geography)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hhss4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sansadhan aur Vikas (Bhugol)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hess3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Social and Political Life</strong></br></td></tr>");	
	    }
		if(pm=="hhss3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samajik avam Rajnitik Jeevan</strong></br></td></tr>");	
		}
		if(pm=="hhss1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamare Atit III (Itihas)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hess1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Past III (Part I)</strong></br></td></tr>");	
	
	
		}
		if(pm=="hess2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Our Past III </strong></br></td></tr>");	
		
	}
	if(pm=="hhss2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hamare Atit III (Bhag-II)</strong></br></td></tr>");
	
		}
		if(pm=="leac1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Accountancy Part I </strong></br></td></tr>");	
	
	
		}
		if(pm=="keoc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Floriculturist</strong></br></td></tr>");	
		}
		if(pm=="keda1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>General Duty Assistant</strong></br></td></tr>");	
	
	
		}
		
		if(pm=="leca1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Computerised Accounting System</strong></br></td></tr>");	
	
	
		}
		if(pm=="leac2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Accountancy Part II </strong></br></td></tr>");	
		}
		if(pm=="lhac1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lekhashastra Part I</strong></br></td></tr>");	
		}
		if(pm=="lhac2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lekhashastra Part II </strong></br></td></tr>");	
		}
		if(pm=="lebo1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Biology</strong></br></td></tr>");	
		}
		if(pm=="lhbo1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jeev Vigyan </strong></br></td></tr>");	
		}if(pm=="lubo1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hayatiyaat</strong></br></td></tr>");	
		}
		if(pm=="lebs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Business Studies I </strong></br></td></tr>");	
		}
		if(pm=="lebs2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Business Studies II</strong></br></td></tr>");	
		}
		if(pm=="lhbs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vyavasai Adhyan I </strong></br></td></tr>");	
		}
		if(pm=="lhbs2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vyavasai Adhyan II </strong></br></td></tr>");	
		}
		if(pm=="lech1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>chemistry I </strong></br></td></tr>");	
		}
		if(pm=="lech2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>chemistry II</strong></br></td></tr>");	
		}
		if(pm=="lhch1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Rasayan Vigyan I </strong></br></td></tr>");	
		}
		if(pm=="lhch2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Rasayan Vigyan II </strong></br></td></tr>");	
		}
		if(pm=="luch1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Keemiya I </strong></br></td></tr>");	
		}
		if(pm=="luch2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Keemiya II </strong></br></td></tr>");	
		}
		if(pm=="jhmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit </strong></br></td></tr>");	
		}
		if(pm=="jemh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Mathematics </strong></br></td></tr>");	
		}if(pm=="jumh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi </strong></br></td></tr>");	
		}
		if(pm=="jesc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Science </strong></br></td></tr>");	
		}
		if(pm=="jhsc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vigyan </strong></br></td></tr>");	
		}
		if(pm=="jusc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Science (Urdu)</strong></br></td></tr>");	
		}
		if(pm=="jess1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Contemporary India </strong></br></td></tr>");	
		}
		if(pm=="jess2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Understanding Economic Development </strong></br></td></tr>");	
		}
		if(pm=="jess3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>India and the Contemporary World-II </strong></br></td></tr>");	
		}
		if(pm=="jess4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Democratic Politics</strong></br></td></tr>");	
		}
		if(pm=="jhss1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samkalin Bharat</strong></br></td></tr>");	
		}
		if(pm=="jhss2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Arthik Vikas ki Samajh</strong></br></td></tr>");	
		}
		if(pm=="jhss3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bharat Aur Samakalin Vishav-2 </strong></br></td></tr>");	
		}if(pm=="jhss4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Loktantrik Rajniti </strong></br></td></tr>");	
		}
		if(pm=="juss1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Aasri Hindustan-II</strong></br></td></tr>");	
		}
		if(pm=="juss2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Maashi Taraqqui Ki Samajh</strong></br></td></tr>");	
		}
		if(pm=="juss3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hindustan Aur Asri Duniya</strong></br></td></tr>");	
		}if(pm=="juss4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jamhuri Siyasat-II</strong></br></td></tr>");	
		}

		if(pm=="jeff1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>First Flight</strong></br></td></tr>");	
		}
		if(pm=="jefp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Footprints without Feet </strong></br></td></tr>");	
		}
		if(pm=="jhsk1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Shemushi </strong></br></td></tr>");	
		}
		
		if(pm=="jhks1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kshitij-2 </strong></br></td></tr>");	
		}if(pm=="jhkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kritika </strong></br></td></tr>");	
		}if(pm=="jhsy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sanchayan Bhag-2 </strong></br></td></tr>");	
		}if(pm=="jhsp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sparsh </strong></br></td></tr>");	
		}
		if(pm=="kect1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Computers and Communication Technology </strong></br></td></tr>");	
		
		}
		if(pm=="kect2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Computers and Communication Technology </strong></br></td></tr>");	
		
		}if(pm=="kuct1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Computer Aur Muwaslati Technology I</strong></br></td></tr>");	
		
		}
		if(pm=="kuct2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Computer Aur Muwaslati Technology II </strong></br></td></tr>");	
		
		}
		if(pm=="syit1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Information Technology in Schools</strong></br></td></tr>");	
		
		}
		
		if(pm=="kebo1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Biology </strong></br></td></tr>");	
		
		}
		if(pm=="kehe1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Human Ecology and Family Sciences Part I  </strong></br></td></tr>");	
		
		}
		if(pm=="lehe1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Human Ecology and Family Sciences Part I  </strong></br></td></tr>");	
		
		}
		if(pm=="lehe2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Human Ecology and Family Sciences Part II  </strong></br></td></tr>");	
		
		}
		if(pm=="kehe2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Human Ecology and Family Sciences Part II  </strong></br></td></tr>");	
		
		}
		if(pm=="khbo1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jeev Vigyan </strong></br></td></tr>");	
			
		}
		if(pm=="kebs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Business Studies </strong></br></td></tr>");	
		
		}
		if(pm=="khbs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vyavsay Adhyanan </strong></br></td></tr>");	
		
		}if(pm=="kubs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Karobari Mutalah I </strong></br></td></tr>");	
		
		}
		if(pm=="kegy2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Fundamental of Physical Geography </strong></br></td></tr>");	
			
		}if(pm=="khgy2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhutiq Bhugol ke Mul Sidhant </strong></br></td></tr>");	
		
		}if(pm=="kugy2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tabai Gugraphiya ke Mubadiyat </strong></br></td></tr>");	
		
		}if(pm=="kegy3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Pratical Work in Geography </strong></br></td></tr>");	
		
		}if(pm=="khgy3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhugol Main Prayogatmak Karya </strong></br></td></tr>");	
			
		}if(pm=="kegy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>India Physical Environment </strong></br></td></tr>");	
		
		}if(pm=="khgy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhart Bhautik Paryabaran </strong></br></td></tr>");	
			
		}
		if(pm=="kemh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Mathematics </strong></br></td></tr>");	
		
		}if(pm=="khmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit </strong></br></td></tr>");	
			
		}if(pm=="kumh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi I </strong></br></td></tr>");	
			
		}
		if(pm=="kcpy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Introduction to Psychology </strong></br></td></tr>");	
			
		}
		if(pm=="khpy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Manovigyan </strong></br></td></tr>");	
			
		}if(pm=="kupy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Nafsiyaat </strong></br></td></tr>");	
			
		}
		if(pm=="khsk1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhaswati</strong></br></td></tr>");	
			
		}
		if(pm=="khsk2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Shashwati </strong></br></td></tr>");	
			
		}
		if(pm=="keac1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Financial Accounting-I </strong></br></td></tr>");	
			
		}if(pm=="khac1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lekhashastra-I </strong></br></td></tr>");	
			
		}if(pm=="keac2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Accountancy-II</strong></br></td></tr>");	
			
		}if(pm=="kuac1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khatadari-I </strong></br></td></tr>");	
			
		}if(pm=="khac2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lekhashastra-II </strong></br></td></tr>");	
			
		}if(pm=="kuac2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khatadari-II </strong></br></td></tr>");	
			
		}if(pm=="kefa1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>An Introduction to Indian Art Part-I</strong></br></td></tr>");	
			
		}
		if(pm=="khfa1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhartiya kala ek parichay</strong></br></td></tr>");	
			
		}if(pm=="kuna1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Nai Awaz </strong></br></td></tr>");	
			
		}
		if(pm=="kuga1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Gulzar-e-Adab</strong></br></td></tr>");	
			
		}
		if(pm=="kuku1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khyabane Urdu</strong></br></td></tr>");	
			
		}if(pm=="kudh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Dhanak</strong></br></td></tr>");	
			
		}
		
		if(pm=="kucw1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Takhleequi Jauhar</strong></br></td></tr>");	
			
		}

		if(pm=="keip1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Informatics Practices</strong></br></td></tr>");	
			
		}

		if(pm=="kebt1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Biotechnology</strong></br></td></tr>");	
			
		}
		
		
		if(pm=="khsr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Srijan</strong></br></td></tr>");	
			
		}
		if(pm=="lefa1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>An Introduction to Indian Art Part-II</strong></br></td></tr>");	
			
		}
		if(pm=="lhfa1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhartiya Kala ka Itihaas Bhag 2</strong></br></td></tr>");	
			
		}
		if(pm=="keks1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Knowledge Traditions and Practices of India</strong></br></td></tr>");	
			
		}
		
		if(pm=="iebe1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaveri</strong></br></td></tr>");	
			
		}
		if(pm=="iest1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Understanding Society India and Beyond PART-I</strong></br></td></tr>");	
			
		}
		
		if(pm=="iemr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Madhurima</strong></br></td></tr>");	
			
		}
		if(pm=="iemo1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Moments Supplementary Reader </strong></br></td></tr>");	
			
		}
		
		if(pm=="jewe2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Words and Expressions -II</strong></br></td></tr>");	
			
		}
		
		if(pm=="iewe1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Words and Expressions</strong></br></td></tr>");	
			
		}
		if(pm=="ihga1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganga </strong></br></td></tr>");	
		
		}
if(pm=="reva1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Reva </strong></br></td></tr>");	
		
		}

		if(pm=="ihks1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kshitij </strong></br></td></tr>");	
			
		}if(pm=="ihsp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sprash </strong></br></td></tr>");	
			
		}if(pm=="ihkr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kritika</strong></br></td></tr>");	
			
		}
		if(pm=="ihsa1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sanchayan</strong></br></td></tr>");	
			
		}if(pm=="ihsh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sharada</strong></br></td></tr>");	
			
		}
		if(pm=="isanskritr21")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Risikulya(R2)</strong></br></td></tr>");	
			
		}
		if(pm=="iemh1")
		{
		
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Manjari</strong></br></td></tr>");	
				
		}if(pm=="ihmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganita Manjari (Hindi)</strong></br></td></tr>");	
			
		}if(pm=="iesc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exploration</strong></br></td></tr>");	
			
		}
		if(pm=="ihsc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Anveshan</strong></br></td></tr>");	
			
		}
		if(pm=="iess4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Democratic Politics</strong></br></td></tr>");	
			
		}if(pm=="ihss4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Loktantrik Rajniti</strong></br></td></tr>");	
			
		}if(pm=="iess1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Contemporary India</strong></br></td></tr>");	
			
		}if(pm=="ihss1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samkalin Bharat</strong></br></td></tr>");	
			
		}
		if(pm=="ihss2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Arthashastra</strong></br></td></tr>");	
			
		}if(pm=="iuss1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Aasri Hindustan (Urdu)</strong></br></td></tr>");	
			
		}if(pm=="iuss2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Mashiyat (Urdu)</strong></br></td></tr>");	
			
		}
		if(pm=="iehp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Khel Praveen</strong></br></td></tr>");	
			
		}
		
		if(pm=="khtp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tabla evam Pakhawaj</strong></br></td></tr>");	
			
		}
		if(pm=="khgv1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hindustani Sangeet Gayan Evam Vadan</strong></br></td></tr>");	
			
		}
		if(pm=="jehp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Health and Physical Education</strong></br></td></tr>");	
			
		}
		if(pm=="kehp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Health and Physical Education</strong></br></td></tr>");	
			
		}
		if(pm=="ievc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Cashier</strong></br></td></tr>");	
			
		}
		if(pm=="ieva1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Store Operations Assistant</strong></br></td></tr>");	
			
		}
		if(pm=="ievs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Solanceous Crop Cultivator</strong></br></td></tr>");	
			
		}
		if(pm=="ievt1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Assistant Beauty Therapist</strong></br></td></tr>");	
			
		}
		if(pm=="ievw1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Animal Health Worker (Agriculture)</strong></br></td></tr>");	
			
		}
		
		if(pm=="ieve1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Health Embroiderer (Addawala)</strong></br></td></tr>");	
			
		}
		if(pm=="ievh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Health Embroiderer </strong></br></td></tr>");	
			
		}
		if(pm=="iepg1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Plumber General</strong></br></td></tr>");	
			
		}
		
		
		if(pm=="iess2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Economics</strong></br></td></tr>");	
			
		}
		if(pm=="iess3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>India and the Contemporary World-I</strong></br></td></tr>");	
			
		}
		if(pm=="ihss3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bharat Aur Samkalin Vishwa-I</strong></br></td></tr>");	
			
		}
		if(pm=="kech1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Chemistry Part-I</br></td></tr>");	
			
		}
		if(pm=="khch1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Rasayan Vigyan bhag-I</strong></br></td></tr>");	
			
		}if(pm=="kuch1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Keemiya I</br></td></tr>");	
			
		}
		if(pm=="kech2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Chemistry Part II</strong></br></td></tr>");	
			
		}if(pm=="khch2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Rasayan Vigyan bhag-II</strong></br></td></tr>");	
			
		}if(pm=="kuch2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Keemiya II</strong></br></td></tr>");	
			
		}if(pm=="kuta1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tareekh-e-Alam per Mabni Mauzuaat Part I</strong></br></td></tr>");	
			
		}
		if(pm=="keec1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Indian Economic Development</strong></br></td></tr>");	
			
		}if(pm=="khec1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhartiya Airthvavstha Ka Vikash  </strong></br></td></tr>");	
			
		}
		if(pm=="khar1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Aroh</strong></br></td></tr>");	
			
		}if(pm=="khat1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Antra</strong></br></td></tr>");	
			
		}if(pm=="khan1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Antral</strong></br></td></tr>");	
			
		}if(pm=="khvt1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vitan</strong></br></td></tr>");	
			
		}
		if(pm=="keps1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Political Theory</strong></br></td></tr>");	
			
		}if(pm=="khps1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Raajneeti Sidhant</strong></br></td></tr>");	
			
		}if(pm=="kups1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hindustan Aain Aur Kam</strong></br></td></tr>");	
			
		}if(pm=="keps2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>India Constitution at Work</strong></br></td></tr>");	
			
		}if(pm=="khps2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bharat ka Samvidhan Sidhant aur Vavhar</strong></br></td></tr>");	
			
		}if(pm=="kups2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Siyasi Nazaria</strong></br></td></tr>");	
			
		}if(pm=="lhar1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Aroh</strong></br></td></tr>");	
			
		}if(pm=="lhat1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Antra</strong></br></td></tr>");	
			
		}if(pm=="lhvt1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vitan</strong></br></td></tr>");	
			
		}if(pm=="lham1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Abhivyakti Aur Madhyam</strong></br></td></tr>");	
			
		}if(pm=="lhan1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Antral Bhag 2</strong></br></td></tr>");	
			
		}
		if(pm=="lhsk1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhaswati</strong></br></td></tr>");	
			
		}
		if(pm=="lhsk2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Shaswati</strong></br></td></tr>");	
			
		}
		if(pm=="leph1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Physics Part-I</strong></br></td></tr>");	
			
		}
		if(pm=="leph2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Physics Part-II</strong></br></td></tr>");	
			
		}
		if(pm=="lhph1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhautiki-I</strong></br></td></tr>");	
			
		}
		if(pm=="lhph2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhautiki-II</strong></br></td></tr>");	
			
		}
if(pm=="luph1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tabiyaat-I</strong></br></td></tr>");	
			
		}
		if(pm=="luph2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tabiyaat-II</strong></br></td></tr>");	
			
		}
		if(pm=="lepy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Psychology</strong></br></td></tr>");	
			
		}
		if(pm=="lhpy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Manovigyan</strong></br></td></tr>");	
			
		}
		if(pm=="leps1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Contemporary World Politics</strong></br></td></tr>");	
			
		}
		if(pm=="leps2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Politics in India Since Independence</strong></br></td></tr>");	
			
		}
		if(pm=="lhps1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samkalin Vishwa Rajniti</strong></br></td></tr>");	
			
		}
				if(pm=="lehh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Manav Paristhitiki avam Parivar Vigyan Bhag - I</strong></br></td></tr>");	
			
		}
		if(pm=="lehh2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Manav Paristhitiki avam Parivar Vigyan Bhag - II</strong></br></td></tr>");	
			
		}
		if(pm=="lhps2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Swatantra Bharat Mein Rajniti-II</strong></br></td></tr>");	
			
		}if(pm=="lups1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Aasri Alami Siyasat</strong></br></td></tr>");	
			
		}if(pm=="luab1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Azadi Ke Baad Hindustan Ki Siyasat</strong></br></td></tr>");	
			
		}
		if(pm=="lesy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Indian Society</strong></br></td></tr>");	
			
		}
		if(pm=="lesy2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Social Change and Development in India</strong></br></td></tr>");	
			
		}if(pm=="lhsy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhartiya Samaj</strong></br></td></tr>");	
			
		}if(pm=="lhsy2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bharat main Samajik Parivartan aur Vikas</strong></br></td></tr>");	
			
		}if(pm=="lusy2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hindustan Mein Samaji Tabdili Aur Taraqqi </strong></br></td></tr>");	
			
		}if(pm=="lehs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Themes in Indian History-I</strong></br></td></tr>");	
			
		}
		if(pm=="lhhs1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bharatiya Itihas ke kuchh Vishay-I</strong></br></td></tr>");	
			
		}if(pm=="lehs2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Themes in Indian History-II</strong></br></td></tr>");	
			
		}
		if(pm=="lhhs2")
		{ 
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bharatiya Itihas ke kuchh Vishay-II</strong></br></td></tr>");	
			
		}
		if(pm=="lehs3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Themes in Indian History-III</strong></br></td></tr>");	
			
		}
		if(pm=="lhhs3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bharatiya Itihas ke kuchh Vishay-III</strong></br></td></tr>");	
			
		}
		if(pm=="leec1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Introductory Macroeconomics</strong></br></td></tr>");	
			
		}
		if(pm=="leec2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Introductory Microeconomics</strong></br></td></tr>");	
			
		}if(pm=="lhec1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samashty Arthshastra Ek Parichay</strong></br></td></tr>");	
			
		}if(pm=="lhec2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vyashthi Arthashastra- Ek Parichay </strong></br></td></tr>");	
			
		}
		if(pm=="iumh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Reyazi (Urdu)</strong></br></td></tr>");	
			
		}if(pm=="iusc1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Science (Urdu)</strong></br></td></tr>");	
		
		}
		if(pm=="iuju1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jamuna</strong></br></td></tr>");	
			
		
		}
		if(pm=="iugu1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Gulzare-e-urdu</strong></br></td></tr>");	
			
		}
		if(pm=="iuna1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Nawa-e-urdu</strong></br></td></tr>");	
			
		}if(pm=="iujp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jaan Pahechan</strong></br></td></tr>");	
			
		}if(pm=="iudp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Door Pass</strong></br></td></tr>");	
			
		}if(pm=="iusr1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sab Rang</strong></br></td></tr>");	
			
		}if(pm=="iuau1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Urdu ki Adabi Asnaf</strong></br></td></tr>");	
			
		}
		if(pm=="legy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Fundamentals of Human Geography</strong></br></td></tr>");	
			
		}
		if(pm=="legy2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>India -People And Economy</strong></br></td></tr>");	
			
		}if(pm=="legy3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Practical Work in Geography Part II</strong></br></td></tr>");	
			
		}if(pm=="lhgy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Manav Bhugol Ke Mool Sidhant</strong></br></td></tr>");	
			
		}if(pm=="lhgy2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bharat log aur arthvyasastha(Bhugol)</strong></br></td></tr>");	
			
		}
		if(pm=="lhgy3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhugol main pryogatmak karye</strong></br></td></tr>");	
			
		}
		if(pm=="iuss4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Jamhuri Syasat(Urdu)</strong></br></td></tr>");	
			
		}
		if(pm=="iuhi1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hindustan Aur Asri Dunia-I(Urdu)</strong></br></td></tr>");	
			
		}
		if(pm=="lekl1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Kaliedoscope</strong></br></td></tr>");	
			
		}
		if(pm=="lefl1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Flamingo</strong></br></td></tr>");	
			
		}
		if(pm=="levt1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Vistas</strong></br></td></tr>");	
			
		}
		if(pm=="kesy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Introducing Sociology</strong></br></td></tr>");	
			
		}
		if(pm=="khsy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samaj Shastra Parichay-I</strong></br></td></tr>");	
			
		}if(pm=="kusy1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samajiyaat Ka Tarf</strong></br></td></tr>");	
			
		}
		if(pm=="kesy2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Understanding Society</strong></br></td></tr>");	
			
		}
		if(pm=="khsy2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Samaj ka Bodh</strong></br></td></tr>");	
			
		}if(pm=="kusy2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Mutala-e-Muashira</strong></br></td></tr>");	
			
		}
		if(pm=="keww1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Woven Words</strong></br></td></tr>");	
			
		}
		if(pm=="kehb1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Hornbill</strong></br></td></tr>");	
			
		}
		if(pm=="kesp1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Snapshots Suppl.Reader English</strong></br></td></tr>");	
			
		}
		if(pm=="keph1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Physics Part-I</strong></br></td></tr>");	
			
		}if(pm=="keph2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Physics Part-II</strong></br></td></tr>");	
			
		}
		if(pm=="khph1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhautiki-I</strong></br></td></tr>");	
			
		}if(pm=="khph2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Bhautiki-II</strong></br></td></tr>");	
			
		}
if(pm=="kuph1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tabiyaat-I</strong></br></td></tr>");	
			
		}if(pm=="kuph2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Tabiyaat-II</strong></br></td></tr>");	
			
		}
		if(pm=="lemh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Mathematics Part-I</strong></br></td></tr>");	
			
		}if(pm=="lemh2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Mathematics Part-II</strong></br></td></tr>");	
			
		}if(pm=="lhmh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit-I</strong></br></td></tr>");	
			
		}if(pm=="lhmh2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Ganit-II</strong></br></td></tr>");	
			
		}
		if(pm=="lumh1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi-I</strong></br></td></tr>");	
			
		}if(pm=="lumh2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Riyazi-II</strong></br></td></tr>");	
			
		}
		if(pm=="kest1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Statistics for Economics</strong></br></td></tr>");	
			
		}
		if(pm=="keep5")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(English)</strong></br></td></tr>");	
			
		}
		if(pm=="feep2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem</strong></br></td></tr>");	
			
		}
		
		
		
		
		if(pm=="kelm2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(English)</strong></br></td></tr>");	
			
		}
		
		
		if(pm=="khlm2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(Hindi)</strong></br></td></tr>");	
			
		}
		
		if(pm=="kelm3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(English)</strong></br></td></tr>");	
			
		}
		if(pm=="kelm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(English)</strong></br></td></tr>");	
			
		}
		
		
		if(pm=="lelm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(English)</strong></br></td></tr>");	
			
		}
		if(pm=="lhlm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(Hindi)</strong></br></td></tr>");	
			
		}
		
		if(pm=="lelm2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(English)</strong></br></td></tr>");	
			
		}
		if(pm=="lelm3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(English)</strong></br></td></tr>");	
			
		}
		if(pm=="lhlm3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="ielm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(English)</strong></br></td></tr>");	
			
		}
		if(pm=="ihlm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="jelm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(English)</strong></br></td></tr>");	
			
		}
		
		
		if(pm=="jhlm1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Lab Manual(Hindi)</strong></br></td></tr>");	
			
		}
		
		
		
		
		if(pm=="feep1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(English)</strong></br></td></tr>");	
			
		}
		
		if(pm=="fhep1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="khep5")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="khst1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Sankhyiki</strong></br></td></tr>");	
			
		}
		if(pm=="jeep2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(English)</strong></br></td></tr>");	
			
		}
		if(pm=="jhep2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(Hindi)</strong></br></td></tr>");	
			
		}
		
		if(pm=="jeep1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(English)</strong></br></td></tr>");	
			
		}
		if(pm=="jhep1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="keep4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(English)</strong></br></td></tr>");	
			
		}
		if(pm=="khep4")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="keep2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(English)</strong></br></td></tr>");	
			
		}
		if(pm=="khep2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="keep3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(English)</strong></br></td></tr>");	
			
		}
		if(pm=="khep3")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(Hindi)</strong></br></td></tr>");	
			
		}
		
		if(pm=="ieep2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(English)</strong></br></td></tr>");	
			
		}
		if(pm=="ihep2")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="ieep1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Exemplar Problem(English)</strong></br></td></tr>");	
			
		}
		
		if(pm=="jsab1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Abhyaswaan Bhav II </strong></br></td></tr>");	
		
		}
		
		if(pm=="ihep1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' style='color:white' height='25' width='100%'><strong>Exemplar Problem(Hindi)</strong></br></td></tr>");	
			
		}
		if(pm=="kuiz1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' style='color:white' height='25' width='100%'><strong>Izhar Aur Zara-e-Izhar</strong></br></td></tr>");	
			
		}
		if(pm=="iuge1")
		{
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Geographia(Urdu)</strong></br></td></tr>");	
			
		}
		
		
		
				
		if(pm=="")
		{
			
		document.write("<tr><td bgcolor='#981F4D' style='color:white' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Persist</span></td><td align='right'><a href='textbook.php?" + pm + "=pr-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		}
		
		if(pm=="syit1")
		{
			document.write("<tr><td bgcolor='#981F4D' style='color:white' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Errata</span></td><td align='right'><a href='textbook.php?" + pm + "=er-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
			}
		
		
			<!--document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Rationalised Content</span><img src=\"images/new.gif\"></td><td align='right'><a href='textbook.php?" + pm + "=rc-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
		-->
	
	if(  pm!="ebnky1" && pm!="esnev1" && pm!="aemr1" && pm!="aejm1" && pm!="iekv1" && pm!="ihsh1" && pm!="isanskritr21" && pm!="iemh1" && pm!="ihmh1" && pm!="iebe1" && pm!="iest1" && pm!="hores1"  && pm!="iemr1" && pm!="iesc1" && pm!="ihsc1" && pm!="iuju1" && pm!="ihga1" && pm!="reva1" && pm!="iehp1" && pm!="fnepa1" && pm!="fkannada1" && pm!="fmargod1" && pm!="ftami1" && pm!="fmaly1" && pm!="fpunjabi1" && pm!="fsanthali1" && pm!="ahjm1" && pm!="amrjm1" && pm!="asijm1" && pm!="apjm1" && pm!="ahsr1" && pm!="bejm1" && pm!="hpnky1" && pm!="bhjm1" && pm!="bhsr1" && pm!="cust1" && pm!="cumm1" && pm!="cuev1" && pm!="cbnev1" && pm!="duev1" && pm!="esnev1" && pm!="ebnky1" && pm!="corev1" && pm!="cmrev1" && pm!="cnpev1" && pm!="ctlev1" && pm!="cgjev1" && pm!="cskev1" && pm!="heky1" && pm!="hsnky1" && pm!="hsiky1" && pm!="hasky1" && pm!="hkoky1" && pm!="hksky1" && pm!="hmrky1" && pm!="hmtky1" && pm!="hhky1" && pm!="huky1" && pm!="hmnky1" && pm!="hnpky1" && pm!="htmky1" && pm!="hbnky1" && pm!="hdgky1" && pm!="hbdky1" && pm!="hknky1" && pm!="htlky1" && pm!="hasky1" && pm!="hskky1" && pm!="hgjky1" && pm!="hmlky1" && pm!="hekr1" && pm!="hmtkr1" && pm!="hsikr1" && pm!="hmnkr1" && pm!="hmtkr1" && pm!="hsnkr1" && pm!="hhkr1" && pm!="hgjkr1" && pm!="hkokr1" && pm!="hskkr1" && pm!="haskr1" && pm!="hbdkr1" && pm!="htlkr1" && pm!="hbnkr1" && pm!="hnpkr1" && pm!="horkr1" && pm!="hdgkr1" && pm!="hknkr1" && pm!="hmlkr1" && pm!="gekr1" && pm!="gmlkr1" && pm!="gkskr1" && pm!="gmnkr1" && pm!="gtlkr1" && pm!="gnpkr1" && pm!="gsikr1" && pm!="gaskr1" && pm!="gmtkr1"  && pm!="gsnkr1" && pm!="gtmkr1" && pm!="gbdkr1" && pm!="ggjkr1" && pm!="gkskr1" && pm!="gmtkr1" && pm!="gkokr1" && pm!="gmrkr1" && pm!="gdgkr1" && pm!="gorkr1" && pm!="gknkr1" && pm!="horkr1" && pm!="hpnkr1" && pm!="horky1"  && pm!="hmrky1" && pm!="hekb1" && pm!="hsikb1" && pm!="hkskb1" && pm!="haskb1" && pm!="hbnkb1" && pm!="hsnkb1" && pm!="hmtkb1" && pm!="hmlkb1" && pm!="hkokb1"  && pm!="hhkb1" && pm!="hdgkb1" && pm!="htmkb1" && pm!="hpnkb1" && pm!="hnpkb1" && pm!="hmrkb1" && pm!="hknkb1" && pm!="htlkb1" && pm!="hskkb1" && pm!="htlkb1" && pm!="horkb1" && pm!="hbdkb1" && pm!="hmnkb1" && pm!="hgjkb1" && pm!="hees1" && pm!="hsies1" && pm!="htles1" && pm!="hsnes1" && pm!="hkses1" && pm!="hbdes1" && pm!="hees2" && pm!="hases1" && pm!="hkoes1" && pm!="hmtes1" && pm!="hsies1" && pm!="hdges1" && pm!="hnpes1" && pm!="hmnes1" && pm!="hknes1"  && pm!="hmres1" && pm!="htmes1" && pm!="hbnes1" && pm!="hgjes1" && pm!="hpnes1" && pm!="hmles1" && pm!="hskes1" && pm!="hues1"  && pm!="hhes1"  && pm!="hpnkr1" && pm!="hukr1" && pm!="hmrkr1" && pm!="htmkr1" && pm!="hecu1" && pm!="hsicu1" && pm!="hkscu1"  && pm!="hsncu1" && pm!="hkncu1" && pm!="hkocu1" && pm!="hmtcu1" && pm!="hnpcu1" && pm!="horcu1" && pm!="hmlcu1"  && pm!="hbdcu1" && pm!="hgjcu1" && pm!="hmncu1" && pm!="hskcu1" && pm!="hbncu1" && pm!="hdgcu1" && pm!="htlcu1" && pm!="hmrcu1" && pm!="hascu1"  && pm!="htmcu1" && pm!="hpncu1" && pm!="hucu1" && pm!="hhcu1" && pm!="hegp1" && pm!="hasgp1" && pm!="hgjgp1" && pm!="hsigp1" && pm!="hsngp1" && pm!="hmlgp1" && pm!="hskgp1" && pm!="hmngp1" && pm!="hksgp1" && pm!="hkogp1" && pm!="htmgp1" && pm!="hdggp1" && pm!="hmrgp1" && pm!="hbngp1" && pm!="hbdgp1" && pm!="hnpgp1" && pm!="horgp1" && pm!="hkngp1" && pm!="htlgp1" && pm!="hmtgp1" && pm!="hpngp1" && pm!="hhgp1" && pm!="hugp1"  && pm!="hegp2" && pm!="hbngp2" && pm!="hasgp2" && pm!="hmrgp2" && pm!="htlgp2" && pm!="hmlgp2" && pm!="hgjgp2" && pm!="htmgp2" && pm!="hkngp2" && pm!="horgp2" && pm!="hpngp2" && pm!="hepr1" && pm!="hsde1" && pm!="hhml1" && pm!="cmnev1" && pm!="casev1" && pm!="cbdev1" && pm!="cmlev1" && pm!="cpnev1" && pm!="cmtev1" && pm!="cknev1" && pm!="csnev1" && pm!="ctmev1"  & pm!="csiev1" & pm!="cksev1"  && pm!="cdgev1" && pm!="cesa1"&& pm!="ckoev1" && pm!="ceev1" && pm!="chev1" && pm!="dhev1" && pm!="cebu1" && pm!="chbu1" && pm!="dhbu1" && pm!="cnpbu1" && pm!="cpnbu1" && pm!="cbdbu1" && pm!="cgjbu1" && pm!="cdgbu1" && pm!="csnbu1" && pm!="ctlbu1" && pm!="cskbu1" && pm!="cmlbu1" && pm!="corbu1" && pm!="cksbu1" && pm!="csibu1" && pm!="cknbu1" && pm!="casbu1"&& pm!="cdgbu1" && pm!="ctmbu1" && pm!="ckobu1" && pm!="cbnbu1" && pm!="cmtbu1" && pm!="cmnbu1" && pm!="cmrbu1"  && pm!="chve1" && pm!="cemm1" && pm!="cksmm1" && pm!="chmm1" && pm!="casmm1" && pm!="cbnmm1" && pm!="cbdmm1" && pm!="cdgmm1" && pm!="cgjmm1" && pm!="cknmm1" && pm!="cmtmm1" && pm!="cmlmm1" && pm!="cmnmm1" && pm!="cnpmm1" && pm!="cormm1" && pm!="cpnmm1" && pm!="csnmm1" && pm!="ctmmm1" && pm!="ctlmm1" && pm!="cmrmm1" && pm!="ckomm1" && pm!="csimm1" && pm!="cskmm1" && pm!="bemr1" && pm!="aush1" && pm!="bush1" && pm!="agjm1"  && pm!="ayjm1" && pm!="akjm1" && pm!="aajm1" && pm!="abnjm1" && pm!="asnjm1"  && pm!="amnjm1"  && pm!="atljm1" && pm!="anpjm1" && pm!="atmjm1"  && pm!="adgjm1"  && pm!="aksjm1" && pm!="aknjm1"  && pm!="aujm1"  && pm!="bujm1"   && pm!="bsnjm1" && pm!="bkojm1" && pm!="bknjm1" && pm!="btljm1" && pm!="bdgjm1" && pm!="bksjm1" && pm!="btmjm1" && pm!="bmnjm1"  && pm!="aorjm1" && pm!="askjm1" && pm!="bbnjm1" && pm!="bskjm1" && pm!="bnpjm1" && pm!="borjm1" && pm!="bmrjm1" && pm!="bsijm1" && pm!="aojm1" && pm!="aijm1" && pm!="basjm1" && pm!="bpnjm1" && pm!="bgjjm1" && pm!="bbdjm1" && pm!="bmtjm1"  && pm!="bmljm1" && pm!="fepr1" && pm!="fegp1" && pm!="fugp1"  && pm!="fasgp1" && pm!="fmngp1" && pm!="fsigp1"  && pm!="fksgp1"  && pm!="fkogp1" && pm!="fsngp1" && pm!="fgjgp1" && pm!="fhgp1" && pm!="forgp1" && pm!="fbdgp1" && pm!="fmlgp1" && pm!="fpngp1" && pm!="fskgp1" && pm!="fkngp1" && pm!="fdggp1" && pm!="fmtgp1" && pm!="fnpgp1" && pm!="fupgp1" && pm!="ftmgp1" && pm!="ftlgp1"&& pm!="fbngp1" && pm!="fmrgp1" && pm!="ftlgp1" && pm!="fhml1" && pm!="fekb1" && pm!="fhkb1" && pm!="fbnkb1" && pm!="fdgkb1" && pm!="fpnkb1" && pm!="fmlkb1" && pm!="fmnkb1" && pm!="ftmkb1" && pm!="fgjkb1" && pm!="fmtkb1" && pm!="faskb1" && pm!="fnpkb1" && pm!="fskkb1" && pm!="fsnkb1"  && pm!="fsikb1" && pm!="fmrkb1" && pm!="ftlkb1" && pm!="fkskb1" && pm!="fknkb1" && pm!="forkb1" && pm!="fkokb1" && pm!="fbdkb1" && pm!="feky1" && pm!="fuky1" && pm!="fmtky1" && pm!="fgjky1" && pm!="forky1" && pm!="fdgky1" && pm!="fkoky1" && pm!="fknky1" && pm!="fmlky1" && pm!="fmnky1" && pm!="fmrky1" && pm!="fsnky1" && pm!="fskky1" && pm!="fbdky1" && pm!="fksky1" && pm!="ftlky1"  && pm!="fbnky1" && pm!="fpnky1" && pm!="fasky1" && pm!="fsiky1" && pm!="ftmky1" && pm!="fnpky1" && pm!="fhky1" && pm!="fukl1" && pm!="fsde1" && pm!="fecu1" && pm!="fsicu1" && pm!="fkscu1" && pm!="fsncu1" && pm!="ckoev1" && pm!="fkoes1" && pm!="fases1" && pm!="fhcu1" && pm!="fucu1" && pm!="ghcu1" && pm!="gucu1" && pm!="fucu1" && pm!="ftmcu1" && pm!="fmlcu1" && pm!="fkncu1" && pm!="fmtcu1" && pm!="fpncu1" && pm!="fbncu1" && pm!="forcu1" && pm!="ftlcu1" && pm!="fskcu1" && pm!="fascu1" && pm!="fmrcu1" && pm!="fbdcu1" && pm!="fgjcu1"  && pm!="fdgcu1" && pm!="fnpcu1" && pm!="fmncu1" && pm!="fkocu1"  && pm!="fekr1" && pm!="fhkr1" && pm!="ghkr1" && pm!="fbnkr1" && pm!="fkokr1" && pm!="fmnkr1" && pm!="fdgkr1" && pm!="faskr1" && pm!="ftlkr1" && pm!="fkskr1" && pm!="fsikr1" && pm!="fsnkr1" && pm!="fgjkr1" && pm!="fknkr1" && pm!="fmlkr1" && pm!="fskkr1" && pm!="fnpkr1" && pm!="fpnkr1" && pm!="ftmkr1" && pm!="fmrkr1" && pm!="forkr1" && pm!="fmtkr1" && pm!="fbdkr1" && pm!="ceky1" && pm!="cuky1" && pm!="chky1" && pm!="cmlky1" && pm!="cbnky1" && pm!="cgjky1" && pm!="cknky1" && pm!="ckoky1" && pm!="cmnky1" && pm!="cnpky1" && pm!="corky1" && pm!="cdgky1" && pm!="csnky1" && pm!="cskky1" && pm!="casky1" && pm!="ctmky1" && pm!="cmrky1" && pm!="cbdky1" && pm!="ctlky1" && pm!="cmtky1" && pm!="cksky1" && pm!="csiky1" && pm!="cpnky1" && pm!="fees1" && pm!="fsies1" && pm!="fases1" && pm!="fkoes1" && pm!="fhes1" && pm!="ghes1" && pm!="gues1" && pm!="gues2" && pm!="fkses1" && pm!="fknes1" && pm!="fores1" && pm!="fmnes1" && pm!="fmres1" && pm!="fpnes1" && pm!="fskes1" && pm!="fdges1" && pm!="fmles1"  && pm!="fbdes1" && pm!="fbnes1" && pm!="ftmes1" && pm!="ftles1" && pm!="fues1" && pm!="fsnes1" && pm!="fmtes1" && pm!="fnpes1" && pm!="fgjes1" && pm!="dust1" && pm!="eust1" && pm!="dsiky1" && pm!="deky1" && pm!="dsnky1" && pm!="dkoky1" && pm!="dbdky1" && pm!="dmtky1" && pm!="dmnky1" && pm!="dmlky1" && pm!="dksky1" && pm!="dskky1" && pm!="dnpky1" && pm!="dknky1" && pm!="ddgky1" && pm!="dknky1" && pm!="dtlky1" && pm!="dpnky1" && pm!="dmrky1" && pm!="dtmky1" && pm!="dbnky1" && pm!="dgjky1" && pm!="dorky1" && pm!="dhky1" && pm!="debu1" && pm!="dknbu1" && pm!="dksbu1" && pm!="dmtbu1" && pm!="dmrbu1" && pm!="dsnbu1" && pm!="dsibu1" && pm!="dtlbu1" && pm!="dmlbu1" && pm!="dskbu1" && pm!="dmnbu1" && pm!="ddgbu1" && pm!="dbnbu1" && pm!="dasbu1" && pm!="dkobu1" && pm!="dnpbu1" && pm!="dbdbu1" && pm!="dtmbu1" && pm!="dsibu1" && pm!="dgjbu1" && pm!="dpnbu1" && pm!="dubu1" && pm!="dorbu1" && pm!="eemm1" && pm!="eskmm1" && pm!="emtmm1" && pm!="esnmm1" && pm!="egjmm1" && pm!="eksmm1" && pm!="esimm1" && pm!="edgmm1" && pm!="etlmm1" && pm!="emlmm1" && pm!="ebnmm1" && pm!="ekomm1" && pm!="easmm1" && pm!="ebdmm1" && pm!="enpmm1" && pm!="eknmm1" && pm!="emnmm1" && pm!="epnmm1" && pm!="eormm1" && pm!="emrmm1" && pm!="etmmm1" && pm!="ehmm1" && pm!="eumm1" && pm!="ehve1" && pm!="eesa1" && pm!="eeev1" && pm!="esiev1" && pm!="ekoev1" && pm!="easev1" && pm!="ebdev1" && pm!="eksev1" && pm!="emtev1" && pm!="emnev1" & pm!="emrev1" & pm!="etlev1" && pm!="etmev1" && pm!="epnev1" && pm!="eknev1" && pm!="enpev1" && pm!="ebnev1" && pm!="eskev1" && pm!="emlev1" && pm!="edgev1" && pm!="egjev1" && pm!="eorev1" && pm!="dknev1" && pm!="dskev1"  && pm!="ehev1" && pm!="euev1" && pm!="eebu1" && pm!="ekobu1" && pm!="esnbu1" && pm!="ebdbu1" && pm!="esibu1" && pm!="etlbu1" && pm!="emnbu1" && pm!="emlbu1" && pm!="emrbu1" && pm!="eskbu1" && pm!="easbu1" && pm!="enpbu1" && pm!="eksbu1" && pm!="etmbu1" && pm!="edgbu1" && pm!="ebnbu1" && pm!="eknbu1" && pm!="epnbu1" && pm!="eorbu1" && pm!="emtbu1" && pm!="egjbu1"  && pm!="ehbu1" && pm!="eubu1" && pm!="eeky1" && pm!="emlky1" && pm!="esiky1" && pm!="esnky1" && pm!="ebdky1" && pm!="emrky1"  && pm!="eksky1" && pm!="ebdky1" && pm!="easky1" && pm!="ekoky1" && pm!="eskky1" && pm!="egjky1" && pm!="etlky1" && pm!="emnky1" && pm!="emtky1" && pm!="enpky1" && pm!="etmky1" && pm!="edgky1" && pm!="eknky1" && pm!="epnky1" && pm!="eorky1" && pm!="deev1" && pm!="dmtev1" && pm!="dtlev1" && pm!="dsiev1" && pm!="dsnev1" && pm!="dksev1" && pm!="dtmev1" && pm!="dmnev1" && pm!="ddgev1" && pm!="dasev1" && pm!="dnpev1" && pm!="dbdev1" && pm!="dmlev1"   && pm!="dmrev1" && pm!="dasky1" && pm!="dorev1" && pm!="dbnev1" && pm!="dkoev1" && pm!="dgjev1" && pm!="dpev1" && pm!="demm1" && pm!="dksmm1" && pm!="dtmmm1" && pm!="dsnmm1" && pm!="dtlmm1" && pm!="dkomm1" && pm!="dknmm1" && pm!="dmlmm1" && pm!="dskmm1" && pm!="dasmm1" && pm!="dbnmm1" && pm!="dmrmm1" && pm!="dbdmm1" && pm!="dormm1" && pm!="dsimm1"  && pm!="dmnmm1" && pm!="dnpmm1" && pm!="ddgmm1" && pm!="dgjmm1" && pm!="dpnmm1" && pm!="dmtmm1" && pm!="dumm1" && pm!="dhmm1"  && pm!="desa1" && pm!="dhve1" && pm!="class4" && pm!="gegp1" && pm!="gksgp1"  && pm!="gmtgp1" && pm!="gmlgp1" && pm!="gsngp1" && pm!="gmlgp2" && pm!="gtlgp2"  && pm!="gasgp1" && pm!="gkogp1" && pm!="gmngp1" && pm!="gskgp1" && pm!="gsigp1" && pm!="gbdgp1" && pm!="gorgp1" && pm!="gkngp1" && pm!="gpngp1" && pm!="gnpgp1" && pm!="gdggp1" && pm!="gtmgp1" && pm!="gtlgp1" && pm!="gmrgp1" && pm!="ggjgp1" && pm!="gbngp1" && pm!="gegp2" && pm!="gasgp2" && pm!="gbngp2" && pm!="gtmgp2" && pm!="ggjgp2" && pm!="gkngp2" && pm!="gmrgp2"  && pm!="gorgp2" && pm!="gpngp2" && pm!="ghgp1" && pm!="gugp1" && pm!="ghml1" && pm!="gskkr1" && pm!="gbnkr1" && pm!="gpnkr1" && pm!="gsde1" && pm!="gees1" && pm!="gkses1" && pm!="gsnes1" && pm!="gsies1" && pm!="gtles1" && pm!="gases1" && pm!="gtmes1" && pm!="gbnes1" && pm!="gbdes1" && pm!="ggjes1" && pm!="gmtes1" && pm!="gmles1" && pm!="gknes1" && pm!="gdges1" && pm!="gmnes1" && pm!="gnpes1" && pm!="gskes1" && pm!="gkoes1" && pm!="gpnes1" && pm!="gmres1" && pm!="gores1" && pm!="gees2" && pm!="gtles2" && pm!="gases2" && pm!="gmres2" && pm!="gmles2" && pm!="gbnes2" && pm!="gtmes2" && pm!="ggjes2" && pm!="gknes2" && pm!="gores2" && pm!="gpnes2" && pm!="ghes2" && pm!="gekb1" && pm!="gsikb1" && pm!="gaskb1" && pm!="gmnkb1" && pm!="gbdkb1" && pm!="gkskb1" && pm!="gmtkb1" && pm!="gmrkb1" && pm!="gnpkb1" && pm!="gsnkb1" && pm!="gskkb1" && pm!="gmlkb1" && pm!="gkokb1" && pm!="gknkb1" && pm!="gdgkb1" && pm!="gtmkb1" && pm!="gpnkb1" && pm!="gpnkb1" && pm!="gorkb1" && pm!="gtlkb1" && pm!="gbnkb1" && pm!="ggjkb1" && pm!="ghkb1" && pm!="geky1" && pm!="gsiky1" && pm!="gksky1" && pm!="gasky1" && pm!="gmtky1" && pm!="gnpky1" && pm!="gmnky1" && pm!="gmrky1" && pm!="gbdky1" && pm!="gskky1" && pm!="gknky1" && pm!="gtmky1" && pm!="gtlky1" && pm!="gkoky1" && pm!="gbnky1" && pm!="gorky1" && pm!="ggjky1" && pm!="gmlky1" & pm!="gsnky1" && pm!="gdgky1" && pm!="gpnky1" && pm!="ghky1" && pm!="gukl1" && pm!="guky1" && pm!="hukl1" && pm!="gecu1" && pm!="ggjcu1"  && pm!="gsicu1" && pm!="gmtcu1" && pm!="gskcu1" && pm!="gsncu1" && pm!="gnpcu1" && pm!="gmncu1" && pm!="gtlcu1" && pm!="gbdcu1" && pm!="gkocu1" && pm!="gdgcu1" && pm!="gascu1" && pm!="gnpcu1" && pm!="gtmcu1" && pm!="gpncu1" && pm!="gbncu1" && pm!="gorcu1" && pm!="gkncu1" && pm!="gkscu1" && pm!="gmlcu1" && pm!="gpncu1" && pm!="gmrcu1" && pm!="gepr1" )  
	{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Rationalised Content</span><img src=\"images/new.gif\"></td><td align='right'><a href='../textbook/pdf/Rationalised.pdf' target='myFrame'>(Open)</a></td></tr></table></td></tr>");
	}
		

	
		
		
		if(pm=="leps2" || pm=="lhps2" || pm=="lups2")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Corrigendum</span><img src=\"images/new.gif\"></td><td align='right'><a href='../textbook/pdf/corrigendum_PolScience.pdf' target='myFrame'>(Open)</a></td></tr></table></td></tr>");	
			
		}	
		if(pm!="syit1" )
		{
				
				
			document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Prelims</span></td><td align='right'><a href='textbook.php?" + pm + "=ps-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
			
			}
			
		
		
			
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Guide for using QR Code</span></td><td align='right'><a href='../textbook/pdf/instruction.pdf' target='myFrame'>(Open)</a></td></tr></table></td></tr>");
		
		if(pm=="deky1" ||pm=="dsnky1" ||pm=="dgjky1" ||pm=="dsiky1" ||pm=="dkoky1" ||pm=="dbdky1" ||pm=="dmtky1" ||pm=="dmnky1" ||pm=="dmlky1" ||pm=="ddgky1" ||pm=="dksky1"  ||pm=="dskky1" ||pm=="dnpky1" ||pm=="dknky1" ||pm=="ddjky1"  ||pm=="dknky1" ||pm=="dtlky1" ||pm=="dpnky1" ||pm=="dmrky1" ||pm=="dtmky1" ||pm=="dbnky1" ||pm=="geky1" ||pm=="gasky1" ||pm=="gsiky1" ||pm=="gksky1"  ||pm=="gmtky1" ||pm=="gnpky1" ||pm=="gmnky1" ||pm=="gbnky1" ||pm=="gmrky1" ||pm=="gbdky1" ||pm=="gskky1" ||pm=="gknky1" ||pm=="gtmky1" ||pm=="gtlky1" ||pm=="gkoky1" ||pm=="gorky1" ||pm=="ggjky1" ||pm=="gdgky1" ||pm=="gmlky1" ||pm=="gsnky1" ||pm=="gpnky1" ||pm=="dorky1" ||pm=="dasky1" ||pm=="ebnky1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Warm-up And Cool-down</span></td><td align='right'><a href='textbook.php?" + pm + "=wc-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		
		}
		
		
		if(pm=="heky1" || pm=="hsiky1" || pm=="hsnky1"  || pm=="hasky1"  || pm=="hkoky1" || pm=="hksky1" || pm=="hmtky1" || pm=="hmrky1" || pm=="huky1" || pm=="hmrky1" || pm=="hmnky1" || pm=="hasky1" || pm=="hnpky1" || pm=="htmky1" || pm=="hdgky1" || pm=="hbdky1" || pm=="hknky1" || pm=="htlky1" || pm=="hbnky1" || pm=="hbnky1" || pm=="hbnky1" || pm=="hskky1" || pm=="hgjky1"  || pm=="hmlky1" || pm=="horky1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Warm-up And Cool-down</span></td><td align='right'><a href='textbook.php?" + pm + "=wc-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		}
		
		if(pm=="gukl1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Warm-up And Cool-down</span></td><td align='right'><a href='textbook.php?" + pm + "=wc-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		}
		if(pm=="ghky1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Warm-up And Cool-down</span></td><td align='right'><a href='textbook.php?" + pm + "=wc-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	

		}

		if(pm=="dhky1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Warm-up And Cool-down</span></td><td align='right'><a href='textbook.php?" + pm + "=wc-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		
		}
		
			
			if(pm==""||pm=="")	
			{
			
			var dfg=parseInt(cha)+ 9;
			 
			
			for(i=9;i<=dfg;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#981F4D' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter "+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
			
			}else if(pm=="jhsp1")
			{
			for(i=1;i<=7;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Kavita "+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
		for(i=8;i<=14;i++)
	{								 
	
			
	 
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter "+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
			}
			else if(pm=="lekl1")
			{
			document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Short Stories</strong></br></td></tr>");
			for(i=1;i<=5;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter "+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Poerty</strong></br></td></tr>");
		for(i=1;i<=8;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter"+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + 1+i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Non Fiction</strong></br></td></tr>");
		for(i=1;i<=6;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter"+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + 2+i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Drama</strong></br></td></tr>");
		for(i=1;i<=2;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter"+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + 3+i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
			}
			else if(pm=="keww1")
			{
			document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Short Stories</strong></br></td></tr>");
			for(i=1;i<=8;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter "+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Poerty</strong></br></td></tr>");
		for(i=1;i<=9;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter"+ i +"</span></td><td align='right'><a href='textbook.php?" + pm + "=" + 1+i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
		var lk=10;
		for(i=20;i<=22;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter"+ lk +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	lk=lk+1;
											
		
		}
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Essay</strong></br></td></tr>");
		for(i=1;i<=7;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter"+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + 3+i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
		
			}
			else if(pm=="lefl1")
			{
			document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Prose</strong></br></td></tr>");
			for(i=1;i<=8;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter "+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Poetry</strong></br></td></tr>");
		for(i=1;i<=5;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter"+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + 1+i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
		
			}
			else if(pm=="lhat1")
			{
			for(i=1;i<=9;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Kavita "+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
		for(i=10;i<=17;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Story "+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
			}
			else if(pm=="kehb1")
			{
			document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Reading Skills</strong></br></td></tr>");
			for(i=1;i<=6;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter"+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
		document.write("<tr valign='top'><td class='st1' bgcolor='#981F4D' style='color:white' height='25' width='100%'><strong>Writing Skills</strong></br></td></tr>");
		for(i=1;i<=6;i++)
	{								 
	
			
	
	document.write("<tr><td bgcolor='#EBEBEB' style='color:white' height='25' width='50%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Chapter "+ i +"</span> </td><td align='right'><a href='textbook.php?" + pm + "=" + 1+i + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");
	
											
		
		}
			}
			else
			{	
	
var div1;
var td1;		 
	for(i=1;i<=cha;i++)
	{								 
	
			
	
	div1='div'+i;

								 
	
document.write("<tr><td bgcolor='#EBEBEB'  height='25' width='50%'><table width='100%'><tr><td id="+ i +" align='left' ><b><span class=\"sty1\" >Chapter "+ i +"</span> <\/td><td align='right'><a href='textbook.php?" + pm + "=" + i + "-" + cha + "'>(Open)</a><\/td><\/tr><\/table><\/td><\/tr>");	



//document.write("<div id="+ div1 +"  class='off'>");
		

//document.write("<\/div>");
	
											
		
		}
		}
		
		
		
		
		
		
		if(pm=="hhbk1"||pm=="hhvs1"||pm=="fhvs1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Shabd Kosh</span></td><td align='right'><a href='textbook.php?" + pm + "=sk-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		
		}
		if(pm=="lhpy1"||pm=="khpy1"||pm=="khgy2"||pm=="kegy2"||pm=="khec1"||pm=="keec1"||pm=="ievc1"||pm=="ieva1"||pm=="ievt1" ||pm=="hmres1"||pm=="ievh1"||pm=="kepc1" || pm=="lhgy1" || pm=="lhec2" || pm=="leec2" || pm=="legy1" ||pm=="keoc1"||pm=="kefc1" ||pm=="legd1" ||pm=="kepy1"||pm=="lepy1"||pm=="fees1" ||pm=="fsies1" ||pm=="fases1" ||pm=="fkoes1"||pm=="fhes1"||pm=="fores1"||pm=="fpnes1"||pm=="fmnes1"||pm=="fmres1"||pm=="fkses1"||pm=="fknes1" ||pm=="gees1" ||pm=="gsnes1" ||pm=="gkses1" ||pm=="gsies1" ||pm=="gtles1" ||pm=="gases1" ||pm=="gbnes1" ||pm=="gbdes1" ||pm=="ggjes1" ||pm=="gtmes1"  ||pm=="ghes1" ||pm=="gmles1" ||pm=="gknes1" ||pm=="gdges1" ||pm=="gmnes1" ||pm=="gnpes1" ||pm=="gskes1" ||pm=="gmtes1" ||pm=="gkoes1" ||pm=="gees2" ||pm=="gmres2" ||pm=="gtles2" ||pm=="gases2" ||pm=="gmles2" ||pm=="gbnes2" ||pm=="gtmes2" ||pm=="ggjes2" ||pm=="gknes2" ||pm=="gores2" ||pm=="gpnes2" ||pm=="ghes2" ||pm=="hees2" ||pm=="gues2" ||pm=="fgjes1"||pm=="fdges1"||pm=="fmles1"||pm=="fbdes1"||pm=="fbnes1"||pm=="ftmes1"||pm=="ftles1" ||pm=="fues1" ||pm=="fsnes1"||pm=="fnpes1"||pm=="fmtes1"||pm=="fsnes1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Glossary</span></td><td align='right'><a href='textbook.php?" + pm + "=gl-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		
		}

		if(pm=="eeky1" || pm=="edgky1" || pm=="emlky1"  || pm=="esnky1" || pm=="esiky1" || pm=="ebdky1" || pm=="emrky1" || pm=="ebdky1" || pm=="eksky1" || pm=="easky1" || pm=="ekoky1" || pm=="eskky1" || pm=="egjky1"  || pm=="etlky1" || pm=="emnky1" || pm=="emtky1"  || pm=="enpky1" || pm=="etmky1" || pm=="eorky1" || pm=="epnky1" || pm=="eknky1" || pm=="ebnky1" )
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Warm-up And Cool-down</span></td><td align='right'><a href='textbook.php?" + pm + "=wc-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		
		}
		
		

		if(pm=="fhbr1"||pm=="hhbk1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Exercise</span></td><td align='right'><a href='textbook.php?" + pm + "=ex-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		
		}
		if(pm=="lhch2"||pm=="keph1"||pm=="kemh1"||pm=="khmh1"||pm=="kumh1"||pm=="kech1"||pm=="kech2"||pm=="khch2"||pm=="kuch2" ||pm=="keph2" ||pm=="khph1" ||pm=="ihsc1"||pm=="kuph1"||pm=="kuph2"||pm=="kuta1"||pm=="leph1"||pm=="lhph1"||pm=="lhph2"||pm=="luph1"||pm=="luph2"||pm=="hhmh1"||pm=="hemh1"||pm=="heep2"||pm=="hhep2"||pm=="feep1"||pm=="heep1"||pm=="ieep2"||pm=="ihep2"||pm=="ieep1"||pm=="ihep1"||pm=="fhep1"||pm=="feep2"||pm=="gemp1"||pm=="geep1"||pm=="ghmh1"||pm=="femh1"||pm=="fhmh1"||pm=="luch1"||pm=="luch2"||pm=="lumh1"||pm=="lumh2"||pm=="kubo1"||pm=="kedf1"||pm=="kubs1"||pm=="lech1"||pm=="lhch1"||pm=="ievc1"||pm=="ieva1"||pm=="ieve1"||pm=="kevt1" ||pm=="keoc1" ||pm=="keda1" ||pm=="khph2" ||pm=="lemh2" ||pm=="lhmh1" ||pm=="lemh1" ||pm=="lhmh2" ||pm=="jhmh1" ||pm=="jesc1" ||pm=="lech2"||pm=="iumh1"||pm=="iusc1"||pm=="guma1"||pm=="jemh1"||pm=="jhmh1"||pm=="jhsc1" )
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Answers</span </td><td align='right'><a href='textbook.php?" + pm + "=an-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		
		}
		if(pm=="fess3"||pm=="fhss3")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >References</span </td><td align='right'><a href='textbook.php?" + pm + "=rf-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		
		}
		if(pm=="femh1"||pm=="fhmh1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Brain Teasers</span </td><td align='right'><a href='textbook.php?" + pm + "=bt-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		
		}
		if(pm=="ghmb1")
		{
		document.write("<tr><td bgcolor='#EBEBEB'  height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Prashn Abhyas</span> </td><td align='right'><a href='textbook.php?" + pm + "=qa-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		
		}
		if(pm=="huse1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Index</span </td><td align='right'><a href='textbook.php?" + pm + "=in-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
				}
				if(pm=="jhkr1"||pm=="jhsy1"||pm=="ihkr1"||pm=="ihsa1"||pm=="lhvt1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Lekhak Parichay</span </td><td align='right'><a href='textbook.php?" + pm + "=lp-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
				}
		if(pm=="fhsk1"||pm=="ghsk1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Perisist</span </td><td align='right'><a href='textbook.php?" + pm + "=pr-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
				}
		var ge=19;
		if(pm=="luch1"||pm=="luch2"||pm=="luch2")
		{
		document.write("<tr><td bgcolor='#EBEBEB'  height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Index</span></td><td align='right'><a href='textbook.php?" + pm + "=" + ge + "-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		
		}
		
		if(pm=="jess1"||pm=="jsab1"||pm=="jhss1"||pm=="kech1"||pm=="khch1"||pm=="legy1"||pm=="legy2"||pm=="lhgy1"||pm=="lhgy2"||pm=="keph1"||pm=="khph1"||pm=="luch1"||pm=="kugy1" ||pm=="lhlm3" ||pm=="lech1"||pm=="lhch1" || pm=="jsab1" || pm=="khtp1" ||pm=="iebe1")
		{
		
		document.write("<tr><td bgcolor='#EBEBEB'  height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Appendix</span></td><td align='right'><a href='textbook.php?" + pm + "=a1-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		}	
		if(pm=="kemh1"||pm=="jumh1"||pm=="khmh1"||pm=="kumh1"||pm=="ieep1" ||pm=="lumh1"||pm=="lhmh1" ||pm=="lemh1" ||pm=="iumh1" ||pm=="jemh1" ||pm=="jhmh1" ||pm=="fess2" ||pm=="fhss2" ||pm=="jhva1" )
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Appendix I</span> </td><td align='right'><a href='textbook.php?" + pm + "=a1-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		document.write("<tr><td bgcolor='#EBEBEB'  height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Appendix II</span> </td><td align='right'><a href='textbook.php?" + pm + "=a2-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		}
		
		



/*test1*/                                                                                                                                                                                                                                                                                  
if(pm=="ahmh1"||pm=="aemh1")

{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Teacher Notes</span></td><td align='right'><a href='textbook.php?" + pm + "=tn-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		}

if(pm=="kemh1"||pm=="khmh1")

{
		document.write("<tr><td bgcolor='#EBEBEB'  height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Supplementary Material</span></td><td align='right'><a href='textbook.php?" + pm + "=sm-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		}
		
		
		if(pm=="jegy3"||pm=="jhgy3"|| pm=="fekb1"|| pm=="iemr1"|| pm=="fhkb1"|| pm=="fbnkb1" || pm=="fbdkb1" || pm=="hekb1" || pm=="hsikb1" || pm=="hkskb1" || pm=="haskb1" || pm=="hsnkb1" || pm=="hbnkb1" || pm=="hkokb1"  || pm=="hmtkb1" || pm=="hmlkb1" || pm=="hhkb1" || pm=="hdgkb1" || pm=="htmkb1"  || pm=="hgjkb1"  || pm=="hbdkb1" || pm=="hmnkb1"  || pm=="horkb1"  || pm=="htlkb1"  || pm=="hskkb1"  || pm=="hpnkb1"  || pm=="hnpkb1" || pm=="hmrkb1"  || pm=="hknkb1"   || pm=="fdgkb1"  || pm=="fkokb1" || pm=="forkb1" || pm=="fpnkb1" || pm=="fhkb1" || pm=="fmlkb1" || pm=="fknkb1" || pm=="fmnkb1" || pm=="ftmkb1" || pm=="fgjkb1" || pm=="fmtkb1" || pm=="faskb1" || pm=="fnpkb1" || pm=="fskkb1" || pm=="fsnkb1" || pm=="ftlkb1" || pm=="fmrkb1" || pm=="fkskb1" || pm=="fsikb1")
		{
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><table width='100%'><tr><td align='left'><b><span class=\"sty1\" >Annexure</span></td><td align='right'><a href='textbook.php?" + pm + "=ax-" + cha + "'>(Open)</a></td></tr></table></td></tr>");	
		}
/*		
document.write("<tr><tdbgcolor='#981F4D' style='color:white' height='25' width='100%'><b>Will be uploaded soon </a></td></tr>");	
*/
		document.write("<tr><td bgcolor='#EBEBEB' height='25' width='100%'><a href='../textbook/pdf/" + pm + "dd.zip'><b>Download complete book </a></td></tr>");	
	
		
		
		
		
		document.write("</table></div></td><td class='books-content' width='' valign='top' align='center'><div>");
		document.write("<div id='Layer2'><iframe id='myFrame' name='myFrame' width='100%' height='1000' scrolling='no' marginwidth='0' marginheight='0' style='overflow:auto; border:0;'>");	
		
		
		document.write(" </iframe></div></td>");
									
     function queryStringValue(){  
    var name = new String();  
    var value = new String();  
    var querystring = document.location.href; 
	 
   
    querystring = querystring.split("?");
	  
    querystring = querystring[1].split("&");  
	 
    for(q=0;q<querystring.length;q++){  
        var pair = querystring[q].split("=");  
        name = pair[0].toLowerCase();  
        value = pair[1].toLowerCase(); 
		
		 
       
	//	this.open("../1.pdf", "Title", "width:300;height:;"); 
    } 
	var df=pair[1];
	var cm=df.split("-");
	var ss=cm[0];
	
	
	//<a href='"+link+"'>"+item[which][2]+"</a>
	
//document.write("<embed  style="background-attachment:scroll; elevation:lower;display:list-item" src="../1.pdf" width="100%" height="800" autostart="false" > </embed>");




var omyFrame = document.getElementById("myFrame");
     omyFrame.style.display="block";
	if(ss==0)
	{
	
	omyFrame.src = "../textbook/pdf/" + name+ "cc.jpg";
	omyFrame.style.height = 420; //100px or 100% 
	omyFrame.style.width = 294; //100px or 100% 
	//omyFrame.style.align = "center";
	// Add border and border-radius
omyFrame.style.border = "7px solid #981F4D";
omyFrame.style.borderRadius = "8px"
		
		
	
	}
	if(ss==1)
	{
	omyFrame.src = "../textbook/pdf/" + name+ "01.pdf";
	
	}
	if(ss==2)
	{
	omyFrame.src = "../textbook/pdf/" + name + "02.pdf";
	
	}
	if(ss==3)
	{
	omyFrame.src = "../textbook/pdf/" + name + "03.pdf";
	
	}
	if(ss==4)
	{
	omyFrame.src = "../textbook/pdf/" + name + "04.pdf";
	
	}
	if(ss==5)
	{
	omyFrame.src = "../textbook/pdf/" + name + "05.pdf";
	
	}
	if(ss==6)
	{
	omyFrame.src = "../textbook/pdf/" + name + "06.pdf";
	
	}
	
	if(ss==7)
	{
	omyFrame.src = "../textbook/pdf/" + name + "07.pdf";
	}
	if(ss==8)
	{
	omyFrame.src = "../textbook/pdf/" + name + "08.pdf";
	}
	if(ss==9)
	{
	omyFrame.src = "../textbook/pdf/" + name + "09.pdf";
	}
	if(ss==10)
	{
	omyFrame.src = "../textbook/pdf/" + name + "10.pdf";
	}
	if(ss==11)
	{
	omyFrame.src = "../textbook/pdf/" + name + "11.pdf";
	}
	if(ss==12)
	{
	omyFrame.src = "../textbook/pdf/" + name + "12.pdf";
	}if(ss==13)
	{
	omyFrame.src = "../textbook/pdf/" + name + "13.pdf";
	}
	if(ss==14)
	{
	omyFrame.src = "../textbook/pdf/" + name + "14.pdf";
	}
	if(ss==15)
	{
	omyFrame.src = "../textbook/pdf/" + name + "15.pdf";
	}
	if(ss==16)
	{
	omyFrame.src = "../textbook/pdf/" + name + "16.pdf";
	}
	if(ss==17)
	{
	omyFrame.src = "../textbook/pdf/" + name + "17.pdf";
	}if(ss==18)
	{
	omyFrame.src = "../textbook/pdf/" + name + "18.pdf";
	}if(ss==19)
	{
	omyFrame.src = "../textbook/pdf/" + name + "19.pdf";
	}if(ss==20)
	{
	omyFrame.src = "../textbook/pdf/" + name + "20.pdf";
	}if(ss==21)
	{
	omyFrame.src = "../textbook/pdf/" + name + "21.pdf";
	}if(ss==22)
	{
	omyFrame.src = "../textbook/pdf/" + name + "22.pdf";
	}if(ss==23)
	{
	omyFrame.src = "../textbook/pdf/" + name + "23.pdf";
	}if(ss==24)
	{
	omyFrame.src = "../textbook/pdf/" + name + "24.pdf";
	}if(ss==25)
	{
	omyFrame.src = "../textbook/pdf/" + name + "25.pdf";
	}if(ss==26)
	{
	omyFrame.src = "../textbook/pdf/" + name + "26.pdf";
	}
	if(ss==27)
	{
	omyFrame.src = "../textbook/pdf/" + name + "27.pdf";
	}if(ss==28)
	{
	omyFrame.src = "../textbook/pdf/" + name + "28.pdf";
	}if(ss==29)
	{
	omyFrame.src = "../textbook/pdf/" + name + "29.pdf";
	}if(ss==30)
	{
	omyFrame.src = "../textbook/pdf/" + name + "30.pdf";
	}if(ss==31)
	{
	omyFrame.src = "../textbook/pdf/" + name + "31.pdf";
	}if(ss==32)
	{
	omyFrame.src = "../textbook/pdf/" + name + "32.pdf";
	}if(ss==33)
	{
	omyFrame.src = "../textbook/pdf/" + name + "33.pdf";
	}if(ss==34)
	{
	omyFrame.src = "../textbook/pdf/" + name + "34.pdf";
	}if(ss==35)
	{
	omyFrame.src = "../textbook/pdf/" + name + "35.pdf";
	}if(ss==36)
	{
	omyFrame.src = "../textbook/pdf/" + name + "36.pdf";
	}if(ss==37)
	{
	omyFrame.src = "../textbook/pdf/" + name + "37.pdf";
	}if(ss==38)
	{
	omyFrame.src = "../textbook/pdf/" + name + "38.pdf";
	}if(ss==39)
	{
	omyFrame.src = "../textbook/pdf/" + name + "39.pdf";
	}if(ss==40)
	{
	omyFrame.src = "../textbook/pdf/" + name + "40.pdf";
	}
	if(ss=="ps")
	{
	omyFrame.src = "../textbook/pdf/" + name + "ps.pdf";
	}
	if(ss=="rc")
	{
	omyFrame.src = "../textbook/pdf/" + name + "rc.pdf";
	}
	if(ss=="c1")
	{
	omyFrame.src = "../textbook/pdf/" + name + "c1.PNG";
	}
	if(ss=="c2")
	{
	omyFrame.src = "../textbook/pdf/" + name + "c2.PNG";
	}
	if(ss=="pr")
	{
	omyFrame.src = "../textbook/pdf/" + name + "pr.pdf";
	}
	if(ss=="ex")
	{
	omyFrame.src = "../textbook/pdf/" + name + "ex.pdf";
	}
	if(ss=="bt")
	{
	omyFrame.src = "../textbook/pdf/" + name + "bt.pdf";
	}
	if(ss=="rf")
	{
	omyFrame.src = "../textbook/pdf/" + name + "rf.pdf";
	}
	if(ss=="lp")
	{
	omyFrame.src = "../textbook/pdf/" + name + "lp.pdf";
	}
	if(ss=="er")
	{
	omyFrame.src = "../textbook/pdf/" + name + "er.pdf";
	}
	if(ss=="in")
	{
	omyFrame.src = "../textbook/pdf/" + name + "in.pdf";
	}
	if(ss=="sk")
	{
	omyFrame.src = "../textbook/pdf/" + name + "sk.pdf";
	}
	if(ss=="qa")
	{
	omyFrame.src = "../textbook/pdf/" + name + "qa.pdf";
	}
	
	if(ss=="pp")
	{
	omyFrame.src = "../textbook/pdf/" + name + "pp.pdf";
	}
	if(ss=="a1")
	{
	omyFrame.src = "../textbook/pdf/" + name + "a1.pdf";
	}
	if(ss=="a2")
	{
	omyFrame.src = "../textbook/pdf/" + name + "a2.pdf";
	}
	if(ss=="an")
	{
	omyFrame.src = "../textbook/pdf/" + name + "an.pdf";
	}
	if(ss=="ax")
	{
	omyFrame.src = "../textbook/pdf/" + name + "ax.pdf";
	}
	if(ss=="mg")
	{
	omyFrame.src = "../textbook/pdf/" + name + "mg.pdf";
	}
	if(ss=="lp")
	{
	omyFrame.src = "../textbook/pdf/" + name + "lp.pdf";
	}
	if(ss=="wc")
	{
	omyFrame.src = "../textbook/pdf/" + name + "wc.pdf";
	}
//test
if(ss=="tn")
	{
	omyFrame.src = "../textbook/pdf/" + name + "tn.pdf";
	}


if(ss=="sm")
	{
	omyFrame.src = "../textbook/pdf/" + name + "sm.pdf";
	}

if(ss=="gl")
	{
	omyFrame.src = "../textbook/pdf/" + name + "gl.pdf";
	}
	if(ss=="dd")
	{
	omyFrame.src = "../textbook/pdf/" + name + "dd.zip";
	document.write("<a href='../textbook/pdf/" + name + "dd.zip'></a>");
	}
	if(ss=="null")
	{
	omyFrame.src = "../textbook/pdf/le/leac/leacn/leacnps.pdf";
	
	}
	
return " "; 
	
	
	
}  
document.write(queryStringValue());  
document.write("");
 }    
  
