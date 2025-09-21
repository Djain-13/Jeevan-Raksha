import React, { useState, useRef } from 'react';
import './drill.css';

// --- FULL SCENARIO DATA (STORY MODE) ---
const scenarios = {
    earthquake: {

        title: "Earthquake: The Library",
        keyTakeaways: [
            "Always DROP, COVER, and HOLD ON during an earthquake.",
            "After the shaking, assess your surroundings for hazards before moving.",
            "Evacuate calmly using stairs, never elevators, and help others if it's safe.",
            "In an open area, stay away from buildings, trees, and power lines.",
            "After a disaster, rely on official sources for information, not rumors."
        ],
        story: [
            {
                image: 'images/firsteq.png',
                narrative: "You and your friend Sam are on the third floor of the college library, cramming for a history final. 'I can't memorize another date,' Sam groans. Suddenly, the floor lurches violently. The sound is deafening—a roar mixed with the groaning of steel and the shattering of glass. Sam freezes, his eyes wide with panic. What's your immediate instruction to him?",
                narrative_hi: "आप और आपका दोस्त सैम कॉलेज की लाइब्रेरी की तीसरी मंजिल पर इतिहास की फाइनल परीक्षा के लिए रट्टा मार रहे हैं। 'मैं एक और तारीख याद नहीं कर सकता,' सैम कराहता है। अचानक, फर्श हिंसक रूप से हिलता है। आवाज़ बहरी कर देने वाली है—एक दहाड़ जो स्टील के कराहने और कांच के टूटने की आवाज़ के साथ मिली हुई है। सैम घबराहट से अपनी चौड़ी आँखों से जम जाता है। उसके लिए आपका तत्काल निर्देश क्या है?",
                choices: [
                    { text: "'Sam, get under the table! Now!'", text_hi: "'सैम, मेज के नीचे जाओ! अभी!'", consequence: "Your sharp command cuts through his panic. You both dive under the heavy oak table. Books and ceiling tiles rain down, but the table holds strong. This was the correct, life-saving action.", consequence_hi: "आपकी तेज आज्ञा उसकी घबराहट को दूर कर देती है। आप दोनों भारी ओक की मेज के नीचे कूद जाते हैं। किताबें और छत की टाइलें नीचे गिरती हैं, लेकिन मेज मजबूत बनी रहती है। यह सही, जीवन रक्षक कार्रवाई थी।", isCorrect: true },
                    { text: "'Let's get out of here! Run!'", text_hi: "'चलो यहाँ से निकलें! भागो!'", consequence: "You try to pull a terrified Sam towards the exit, but the floor is moving too violently. A massive bookshelf topples over, blocking your path. Trying to run during a quake is a recipe for disaster.", consequence_hi: "आप एक डरे हुए सैम को बाहर निकलने की ओर खींचने की कोशिश करते हैं, लेकिन फर्श बहुत हिंसक रूप से हिल रहा है। एक विशाल बुकशेल्फ गिरकर आपका रास्ता रोक देता है। भूकंप के दौरान भागने की कोशिश करना एक आपदा के लिए एक नुस्खा है।", isCorrect: false }
                ]
            },
            {
                image: 'images/secondeq.png',
                narrative: "The main shaking subsides, leaving a ringing silence broken by the blare of a fire alarm. As you're about to crawl out, a short, sharp aftershock hits. A tall metal bookshelf, already leaning precariously, wobbles. You see another student frozen in fear, partially pinned under a fallen chair right in the bookshelf's path.",
                narrative_hi: "मुख्य कंपन कम हो जाता है, जिससे एक गूंजती हुई खामोशी छा जाती है जो फायर अलार्म की तेज आवाज से टूटती है। जैसे ही आप बाहर निकलने वाले होते हैं, एक छोटा, तेज आफ्टरशॉक आता है। एक लंबा धातु का बुकशेल्फ़, जो पहले से ही खतरनाक तरीके से झुका हुआ है, डगमगाता है। आप एक दूसरे छात्र को डर से जमे हुए देखते हैं, जो बुकशेल्फ़ के रास्ते में गिरी हुई कुर्सी के नीचे आंशिक रूप से फंसा हुआ है।",
                choices: [
                    { text: "Yell at the student to crawl away while you try to brace the shelf.", text_hi: "छात्र को दूर रेंगने के लिए चिल्लाएं जबकि आप शेल्फ को संभालने की कोशिश करते हैं।", consequence: "You push against the wobbling shelf with all your might. 'Get out of there!' you scream. The student snaps out of it and scrambles to safety just as the shelf crashes down where they were moments before. Your quick thinking and decisive action saved them from serious injury.", consequence_hi: "आप अपनी पूरी ताकत से डगमगाते शेल्फ के खिलाफ धक्का देते हैं। 'वहाँ से निकलो!' आप चिल्लाते हैं। छात्र होश में आता है और सुरक्षा के लिए भागता है, ठीक उसी समय जब शेल्फ वहीं गिर जाती है जहाँ वे कुछ क्षण पहले थे। आपकी त्वरित सोच और निर्णायक कार्रवाई ने उन्हें गंभीर चोट से बचा लिया।", isCorrect: true },
                    { text: "Pull Sam further under the table to make sure he is safe.", text_hi: "सैम को यह सुनिश्चित करने के लिए मेज के नीचे और खींचें कि वह सुरक्षित है।", consequence: "Prioritizing only your own safety, you ignore the other student. The bookshelf topples with a deafening crash. While you and Sam are unharmed, your inaction meant the other student couldn't get away in time and is now crying out in pain. In emergencies, awareness of others is critical.", consequence_hi: "केवल अपनी सुरक्षा को प्राथमिकता देते हुए, आप दूसरे छात्र को अनदेखा करते हैं। बुकशेल्फ एक बहरे कर देने वाले धमाके के साथ गिर जाती है। जबकि आप और सैम सुरक्षित हैं, आपकी निष्क्रियता का मतलब था कि दूसरा छात्र समय पर दूर नहीं हो सका और अब दर्द से चिल्ला रहा है। आपात स्थिति में, दूसरों के प्रति जागरूकता महत्वपूर्ण है।", isCorrect: false }
                ]
            },
            {
                image: 'images/thirdeq.png',
                narrative: "The building is groaning, and dust fills the air. It's time to evacuate. The main emergency staircase is visible, but the path is partially blocked by a heavy, overturned cabinet. The back stairwell, usually for staff, should be clear, but it's further away and less familiar.",
                narrative_hi: "इमारत कराह रही है, और हवा में धूल भर गई है। यह खाली करने का समय है। मुख्य आपातकालीन सीढ़ी दिखाई दे रही है, लेकिन रास्ता एक भारी, उल्टे कैबिनेट द्वारा आंशिक रूप से अवरुद्ध है। पीछे की सीढ़ी, जो आमतौर पर कर्मचारियों के लिए होती है, साफ होनी चाहिए, लेकिन यह और दूर और कम परिचित है।",
                choices: [
                    { text: "Organize a group to move the cabinet and clear the main stairs.", text_hi: "कैबिनेट को स्थानांतरित करने और मुख्य सीढ़ियों को साफ करने के लिए एक समूह व्यवस्थित करें।", consequence: "You and a few other students work together, managing to shove the heavy cabinet aside. This clears the primary, safest exit for everyone on the floor to evacuate in an orderly manner. Teamwork was the key.", consequence_hi: "आप और कुछ अन्य छात्र एक साथ काम करते हैं, भारी कैबिनेट को एक तरफ धकेलने में कामयाब होते हैं। यह मंजिल पर सभी के लिए व्यवस्थित तरीके से खाली करने के लिए प्राथमिक, सबसे सुरक्षित निकास को साफ करता है। टीम वर्क महत्वपूर्ण था।", isCorrect: true },
                    { text: "Take Sam and head for the unfamiliar back stairs.", text_hi: "सैम को लें और अपरिचित पिछली सीढ़ियों की ओर बढ़ें।", consequence: "You find the back stairs, but the door is jammed shut from the building shifting. You've wasted precious minutes and now have to backtrack through the unstable library to the main exit anyway. Sticking to the designated, known escape route is usually the best plan.", consequence_hi: "आपको पिछली सीढ़ियाँ मिल जाती हैं, लेकिन इमारत के खिसकने से दरवाजा जाम हो गया है। आपने कीमती मिनट बर्बाद कर दिए हैं और अब आपको अस्थिर पुस्तकालय के माध्यम से मुख्य निकास तक वापस जाना होगा। निर्दिष्ट, ज्ञात बच निकलने के मार्ग पर टिके रहना आमतौर पर सबसे अच्छी योजना है।", isCorrect: false }
                ]
            },
            {
                image: 'images/fourtheq.png',
                narrative: "You make it outside to the designated assembly point on the lawn. Hundreds of students are gathered, shaken but mostly safe. You see your professor, Dr. Evans, trying to organize everyone. Just then, you notice another student nearby clutching their leg, a dark stain of blood spreading on their jeans.",
                narrative_hi: "आप बाहर लॉन पर निर्दिष्ट सभा स्थल पर पहुँचते हैं। सैकड़ों छात्र एकत्र हुए हैं, हिले हुए हैं लेकिन ज्यादातर सुरक्षित हैं। आप अपने प्रोफेसर, डॉ. इवांस को देखते हैं, जो सभी को व्यवस्थित करने की कोशिश कर रहे हैं। तभी, आप पास के एक अन्य छात्र को अपने पैर को पकड़े हुए देखते हैं, उसकी जींस पर खून का एक गहरा धब्बा फैल रहा है।",
                choices: [
                    { text: "Help the injured student and send someone to get Dr. Evans.", text_hi: "घायल छात्र की मदद करें और किसी को डॉ. इवांस को लाने के लिए भेजें।", consequence: "You rush to the student, applying pressure to the wound with your sweatshirt. 'Sam, go get Dr. Evans, tell her we have a serious injury here!' you command. Your quick thinking provides immediate aid while also alerting professional help. This is excellent emergency triage.", consequence_hi: "आप छात्र के पास दौड़ते हैं, अपनी स्वेटशर्ट से घाव पर दबाव डालते हैं। 'सैम, जाकर डॉ. इवांस को बुलाओ, उन्हें बताओ कि यहाँ एक गंभीर चोट लगी है!' आप आदेश देते हैं। आपकी त्वरित सोच तत्काल सहायता प्रदान करती है और पेशेवर मदद को भी सचेत करती है। यह उत्कृष्ट आपातकालीन ट्राइएज है।", isCorrect: true },
                    { text: "Find Sam and make sure he's okay first.", text_hi: "सैम को ढूंढें और सुनिश्चित करें कि वह पहले ठीक है।", consequence: "You find Sam, who just has a few scratches. By the time you both look back, a crowd has formed around the injured student. While checking on your friend is natural, ignoring a more serious injury in an emergency can have dire consequences.", consequence_hi: "आपको सैम मिल जाता है, जिसे बस कुछ खरोंचें हैं। जब तक आप दोनों वापस देखते हैं, घायल छात्र के चारों ओर एक भीड़ जमा हो चुकी होती है। जबकि अपने दोस्त की जाँच करना स्वाभाविक है, आपात स्थिति में एक अधिक गंभीर चोट को अनदेखा करने के गंभीर परिणाम हो सकते हैं।", isCorrect: false }
                ]
            },
            {
                image: 'images/fiftheq.png',
                narrative: "Cell service is down and the internet is gone. Rumors are spreading like wildfire through the crowd. One student swears his police officer cousin texted him that the nearby dam has cracked and a flood is coming. Panic begins to set in.",
                narrative_hi: "सेल सेवा बंद है और इंटरनेट चला गया है। भीड़ में अफवाहें जंगल की आग की तरह फैल रही हैं। एक छात्र कसम खाता है कि उसके पुलिस अधिकारी चचेरे भाई ने उसे टेक्स्ट किया है कि पास का बांध टूट गया है और बाढ़ आ रही है। घबराहट फैलने लगती है।",
                choices: [
                    { text: "Find someone with a battery-powered radio to listen for official news.", text_hi: "आधिकारिक समाचार सुनने के लिए बैटरी से चलने वाले रेडियो वाले किसी व्यक्ति को खोजें।", consequence: "You dismiss the rumor and help Dr. Evans find a custodian with a hand-crank radio. An official broadcast soon confirms the dam is secure, quelling the panic. Relying on verified information is crucial to prevent dangerous mass hysteria.", consequence_hi: "आप अफवाह को खारिज करते हैं और डॉ. इवांस को एक हाथ से क्रैंक रेडियो वाले एक संरक्षक को खोजने में मदद करते हैं। एक आधिकारिक प्रसारण जल्द ही पुष्टि करता है कि बांध सुरक्षित है, जिससे घबराहट शांत होती है। सत्यापित जानकारी पर भरोसा करना खतरनाक सामूहिक उन्माद को रोकने के लिए महत्वपूर्ण है।", isCorrect: true },
                    { text: "Believe the rumor and start urging people to run for higher ground.", text_hi: "अफवाह पर विश्वास करें और लोगों को ऊँची जमीन पर भागने का आग्रह करना शुरू करें।", consequence: "Your panic adds to the chaos. A stampede of students starts running towards the hills, causing more injuries from trips and falls. The rumor turns out to be false. You've learned that acting on unverified information can be as dangerous as the disaster itself.", consequence_hi: "आपकी घबराहट अराजकता को बढ़ाती है। छात्रों की एक भगदड़ पहाड़ियों की ओर भागने लगती है, जिससे यात्राओं और गिरने से और अधिक चोटें आती हैं। अफवाह झूठी निकलती है। आपने सीखा है कि असत्यापित जानकारी पर कार्रवाई करना उतना ही खतरनाक हो सकता है जितना कि आपदा स्वयं।", isCorrect: false }
                ]
            }
        ]
    },
    flood: {
        title: "Flood: The Rising River",
        keyTakeaways: [
            "Heed official warnings immediately; don't wait for visible danger.",
            "Always evacuate to higher ground, getting as high as possible.",
            "Never walk or drive through floodwaters; they are treacherous.",
            "In a prolonged situation, ration resources and work as a team.",
            "Use clear, visible signals to attract rescuers."
        ],
        story: [
            {
                image: 'images/firstfl.png',
                narrative: "Your dorm is next to the campus river. After three days of non-stop rain, your phone blares with an alert: 'RIVER HAS BREACHED ITS BANKS. FLOODING IMMINENT. EVACUATE LOW-LYING AREAS.' Water is already seeping under your ground-floor door. Your friend Sam is frantically trying to unplug his new gaming PC. 'I have to save it!' he yells.",
                narrative_hi: "आपका छात्रावास कैंपस नदी के बगल में है। तीन दिनों की लगातार बारिश के बाद, आपका फोन एक अलर्ट के साथ बजता है: 'नदी ने अपने किनारे तोड़ दिए हैं। बाढ़ का खतरा। निचले इलाकों को खाली करें।' पानी पहले से ही आपके भूतल के दरवाजे के नीचे से रिस रहा है। आपका दोस्त सैम अपने नए गेमिंग पीसी को अनप्लग करने की उन्मत्त कोशिश कर रहा है। 'मुझे इसे बचाना है!' वह चिल्लाता है।",
                choices: [
                    { text: "'Leave it, Sam! We need to get to the top floor right now!'", text_hi: "'उसे छोड़ो, सैम! हमें अभी सबसे ऊपरी मंजिल पर जाना है!'", consequence: "You grab Sam's arm. 'Things can be replaced, we can't be!' Your urgency convinces him. You both splash through the ankle-deep water and head up the stairs, reaching safety just as the water level surges. You made the right call.", consequence_hi: "आप सैम का हाथ पकड़ते हैं। 'चीजें बदली जा सकती हैं, हम नहीं!' आपकी तत्परता उसे मना लेती है। आप दोनों टखने तक गहरे पानी से होकर सीढ़ियों से ऊपर चले जाते हैं, जैसे ही जल स्तर बढ़ता है, आप सुरक्षा तक पहुँच जाते हैं। आपने सही निर्णय लिया।", isCorrect: true },
                    { text: "Help him save his PC first.", text_hi: "पहले उसकी पीसी बचाने में मदद करें।", consequence: "You struggle with the cables as the water rises to your knees. By the time you're done, the current in the hallway is strong and dangerous. You've lost your window for a safe evacuation. Valuables should never come before your life.", consequence_hi: "आप केबलों के साथ संघर्ष करते हैं क्योंकि पानी आपके घुटनों तक बढ़ जाता है। जब तक आप काम पूरा करते हैं, हॉलवे में धारा तेज और खतरनाक होती है। आपने सुरक्षित निकासी का मौका खो दिया है। कीमती सामान कभी भी आपके जीवन से पहले नहीं आना चाहिए।", isCorrect: false }
                ]
            },
            {
                image: 'images/secondfl.png',
                narrative: "You've reached the fourth floor with about a dozen other students. The power is out. The only supplies are from a vending machine you managed to break open. There are a few bags of chips and about ten bottles of water. A junior student immediately grabs two water bottles for himself.",
                narrative_hi: "आप लगभग एक दर्जन अन्य छात्रों के साथ चौथी मंजिल पर पहुँच गए हैं। बिजली चली गई है। एकमात्र आपूर्ति एक वेंडिंग मशीन से है जिसे आप तोड़ने में कामयाब रहे। चिप्स के कुछ बैग और पानी की लगभग दस बोतलें हैं। एक जूनियर छात्र तुरंत अपने लिए दो पानी की बोतलें पकड़ लेता है।",
                choices: [
                    { text: "Establish a clear rationing system for everyone.", text_hi: "सभी के लिए एक स्पष्ट राशनिंग प्रणाली स्थापित करें।", consequence: "You step forward and say, 'We need to make this last. Let's pool everything and give everyone half a bottle for now.' People recognize the wisdom in your suggestion and agree. By managing resources, you ensure everyone stays hydrated.", consequence_hi: "आप आगे बढ़ते हैं और कहते हैं, 'हमें इसे आखिरी तक चलाना है। चलो सब कुछ इकट्ठा करें और अभी के लिए सभी को आधी बोतल दें।' लोग आपके सुझाव में बुद्धिमत्ता को पहचानते हैं और सहमत होते हैं। संसाधनों का प्रबंधन करके, आप यह सुनिश्चित करते हैं कि हर कोई हाइड्रेटेड रहे।", isCorrect: true },
                    { text: "Let everyone take what they want.", text_hi: "सभी को वह लेने दें जो वे चाहते हैं।", consequence: "It becomes a free-for-all. The most aggressive students grab the most water, leaving others with nothing. Within hours, anxiety and arguments break out. Without a plan, your group's morale and safety are compromised.", consequence_hi: "यह एक खुली लूट बन जाती है। सबसे आक्रामक छात्र सबसे अधिक पानी पकड़ते हैं, जिससे दूसरों के पास कुछ भी नहीं बचता है। कुछ ही घंटों में, चिंता और बहसें शुरू हो जाती हैं। बिना योजना के, आपके समूह का मनोबल और सुरक्षा खतरे में पड़ जाती है।", isCorrect: false }
                ]
            },
            {
                image: 'images/thirdfl.png',
                narrative: "Night falls, and the campus is a dark, swirling lake. A panicked first-year student starts crying. 'I'm going to try and swim to the science building,' he says, 'my car is over there, on higher ground. I have to try.'",
                narrative_hi: "रात हो जाती है, और परिसर एक अंधेरी, घूमती हुई झील है। एक घबराया हुआ प्रथम वर्ष का छात्र रोने लगता है। 'मैं विज्ञान भवन तक तैरने की कोशिश करने जा रहा हूँ,' वह कहता है, 'मेरी कार वहाँ है, ऊँची जमीन पर। मुझे कोशिश करनी होगी।'",
                choices: [
                    { text: "'Don't! The water is a death trap. We're safe here if we stay together.'", text_hi: "'मत करो! पानी एक मौत का जाल है। अगर हम एक साथ रहें तो हम यहाँ सुरक्षित हैं।'", consequence: "You speak with authority. 'You can't see what's under that water—debris, strong currents. The safest thing is to stay on high ground and wait for rescue.' Your confident reasoning calms him down and he agrees to stay. You've prevented a tragedy.", consequence_hi: "आप अधिकार के साथ बोलते हैं। 'आप उस पानी के नीचे क्या है नहीं देख सकते—मलबा, तेज धाराएं। सबसे सुरक्षित बात यह है कि ऊँची जमीन पर रहें और बचाव की प्रतीक्षा करें।' आपका आत्मविश्वासपूर्ण तर्क उसे शांत करता है और वह रुकने के लिए सहमत हो जाता है। आपने एक त्रासदी को रोका है।", isCorrect: true },
                    { text: "'Okay, but be extremely careful.'", text_hi: "'ठीक है, लेकिन बेहद सावधान रहना।'", consequence: "Not wanting to cause a scene, you let him go. You watch from the window as he is immediately swept away by a current you couldn't even see. You feel a pit in your stomach, realizing you should have been more forceful in stopping him.", consequence_hi: "एक दृश्य बनाने की इच्छा न रखते हुए, आप उसे जाने देते हैं। आप खिड़की से देखते हैं कि वह तुरंत एक धारा से बह जाता है जिसे आप देख भी नहीं सकते थे। आपके पेट में एक गड्ढा महसूस होता है, यह महसूस करते हुए कि आपको उसे रोकने में और अधिक बलशाली होना चाहिए था।", isCorrect: false }
                ]
            },
            {
                image: 'images/fourthfl.png',
                narrative: "In the morning, the rain has stopped. You see a rescue boat in the distance, but it seems to be moving away. You need to get their attention, but your phone is dead.",
                narrative_hi: "सुबह, बारिश रुक गई है। आप दूर एक बचाव नाव देखते हैं, लेकिन ऐसा लगता है कि यह दूर जा रही है। आपको उनका ध्यान आकर्षित करने की आवश्यकता है, लेकिन आपका फोन मृत है।",
                choices: [
                    { text: "Use a mirror or phone screen to flash sunlight at the boat.", text_hi: "नाव पर सूरज की रोशनी चमकाने के लिए एक दर्पण या फोन स्क्रीन का उपयोग करें।", consequence: "Remembering a survival tip, you grab a small mirror. You angle it to catch the sun, flashing it repeatedly towards the boat. Within a minute, you see the boat change course and head directly for you. Your resourcefulness has saved the day!", consequence_hi: "एक उत्तरजीविता युक्ति याद करते हुए, आप एक छोटा दर्पण पकड़ते हैं। आप इसे सूरज को पकड़ने के लिए कोण देते हैं, इसे बार-बार नाव की ओर चमकाते हैं। एक मिनट के भीतर, आप देखते हैं कि नाव पाठ्यक्रम बदलती है और सीधे आपकी ओर बढ़ती है। आपकी संसाधनशीलता ने दिन बचा लिया है!", isCorrect: true },
                    { text: "Shout as loud as you can.", text_hi: "जितना जोर से चिल्ला सकते हो चिल्लाओ।", consequence: "You and the others start yelling, but your voices are lost in the vast, watery landscape. They don't hear you and continue on their way. You realize you need a more effective, visual way to signal for help.", consequence_hi: "आप और अन्य लोग चिल्लाना शुरू करते हैं, लेकिन आपकी आवाजें विशाल, जलीय परिदृश्य में खो जाती हैं। वे आपको नहीं सुनते हैं और अपने रास्ते पर चलते रहते हैं। आपको एहसास होता है कि आपको मदद के लिए संकेत देने के लिए एक अधिक प्रभावी, दृश्य तरीके की आवश्यकता है।", isCorrect: false }
                ]
            },
            {
                image: 'images/fifthfl.png',
                narrative: "The rescue boat is approaching but can't get close to the building due to submerged cars and debris. A rescuer shouts, 'We're going to throw you a line! We need someone to secure it to that sturdy pillar over there!' It looks like a difficult task.",
                narrative_hi: "बचाव नाव आ रही है लेकिन डूबी हुई कारों और मलबे के कारण इमारत के करीब नहीं आ सकती है। एक बचावकर्ता चिल्लाता है, 'हम तुम्हें एक रस्सी फेंकने जा रहे हैं! हमें किसी को इसे वहाँ उस मजबूत स्तंभ से सुरक्षित करने की आवश्यकता है!' यह एक कठिन कार्य लगता है।",
                choices: [
                    { text: "Organize a human chain to safely get the rope to the pillar.", text_hi: "रस्सी को सुरक्षित रूप से स्तंभ तक पहुँचाने के लिए एक मानव श्रृंखला बनाएँ।", consequence: "You get everyone to link hands, creating a stable chain from the doorway to the pillar. The last person is able to safely secure the rope without anyone risking falling into the deep water. Teamwork made the dangerous task manageable.", consequence_hi: "आप सभी को हाथ मिलाने के लिए कहते हैं, दरवाजे से स्तंभ तक एक स्थिर श्रृंखला बनाते हैं। अंतिम व्यक्ति गहरे पानी में गिरने के जोखिम के बिना रस्सी को सुरक्षित रूप से सुरक्षित करने में सक्षम है। टीम वर्क ने खतरनाक कार्य को प्रबंधनीय बना दिया।", isCorrect: true },
                    { text: "Let the strongest-looking person try to do it alone.", text_hi: "सबसे मजबूत दिखने वाले व्यक्ति को इसे अकेले करने की कोशिश करने दें।", consequence: "A student who is a known gym enthusiast volunteers. He makes it halfway before slipping on the slick floor. The human chain would have supported him, but alone, he falls into the treacherous water, forcing a much more dangerous rescue.", consequence_hi: "एक छात्र जो एक ज्ञात जिम उत्साही है, स्वयंसेवक है। वह आधा रास्ता तय करता है इससे पहले कि वह चिकनी मंजिल पर फिसल जाए। मानव श्रृंखला ने उसका समर्थन किया होता, लेकिन अकेले, वह विश्वासघाती पानी में गिर जाता है, जिससे एक बहुत अधिक खतरनाक बचाव के लिए मजबूर होना पड़ता है।", isCorrect: false }
                ]
            }
        ]
    },
    heatwave: {
        title: "Heatwave: Campus Blackout",
        keyTakeaways: [
            "Avoid strenuous activity during the hottest parts of the day.",
            "When a blackout occurs in the heat, creating ventilation is a top priority.",
            "Recognize the signs of heat exhaustion and heat stroke.",
            "Check on vulnerable people, like the elderly or those with medical conditions.",
            "For heat stroke, immediate cooling measures are more critical than just hydration."
        ],
        story: [
            {
                image: 'images/firsthw.png',
                narrative: "It's the fourth day of a brutal heatwave, with temperatures hitting 40°C. Your friend Sam wants to organize a frisbee game on the main lawn. 'Come on, it'll be fun! We'll just drink lots of water,' he says.",
                narrative_hi: "यह एक क्रूर गर्मी की लहर का चौथा दिन है, तापमान 40°C तक पहुंच गया है। आपका दोस्त सैम मुख्य लॉन पर एक फ्रिसबी खेल आयोजित करना चाहता है। 'चलो, यह मजेदार होगा! हम बस खूब पानी पिएंगे,' वह कहता है।",
                choices: [
                    { text: "'Bad idea, Sam. It's dangerously hot. Let's go to the air-conditioned library.'", text_hi: "'बुरा विचार, सैम। यह खतरनाक रूप से गर्म है। चलो वातानुकूलित पुस्तकालय में चलते हैं।'", consequence: "You convince him that the risk of heatstroke is too high. In the cool library, you see a news report about several people being hospitalized from the heat. You made a smart, safe choice.", consequence_hi: "आप उसे समझाते हैं कि हीटस्ट्रोक का खतरा बहुत अधिक है। ठंडे पुस्तकालय में, आप गर्मी से कई लोगों के अस्पताल में भर्ती होने की खबर देखते हैं। आपने एक स्मार्ट, सुरक्षित विकल्प चुना।", isCorrect: true },
                    { text: "'Alright, but just for a little while.'", text_hi: "'ठीक है, लेकिन बस थोड़ी देर के लिए।'", consequence: "After just 20 minutes, you both feel dizzy and nauseous. You have to help Sam stumble back to the dorms, realizing you've both developed heat exhaustion. It was a risky decision.", consequence_hi: "सिर्फ 20 मिनट के बाद, आप दोनों को चक्कर और मतली महसूस होती है। आपको सैम को छात्रावास में वापस लड़खड़ाते हुए मदद करनी पड़ती है, यह महसूस करते हुए कि आप दोनों को गर्मी की थकावट हो गई है। यह एक जोखिम भरा निर्णय था।", isCorrect: false }
                ]
            },
            {
                image: 'images/secondhw.png',
                narrative: "You're in the library when the worst happens: the power grid overloads and the entire campus goes dark. The AC shuts off. A stifling heat begins to build. The large, automatic glass doors at the entrance are now locked shut. People start to panic in the growing heat.",
                narrative_hi: "आप पुस्तकालय में हैं जब सबसे बुरा होता है: पावर ग्रिड ओवरलोड हो जाता है और पूरा परिसर अंधेरा हो जाता है। एसी बंद हो जाता है। एक घुटन भरी गर्मी बनने लगती है। प्रवेश द्वार पर बड़े, स्वचालित कांच के दरवाजे अब बंद हैं। बढ़ती गर्मी में लोग घबराने लगते हैं।",
                choices: [
                    { text: "Find the emergency release lever for the automatic doors.", text_hi: "स्वचालित दरवाजों के लिए आपातकालीन रिलीज लीवर खोजें।", consequence: "You remember seeing a small red lever near the door frame during an orientation tour. You find it and pull. With a hiss, the doors slide open, allowing fresh air in and creating an escape route. Knowing your surroundings paid off.", consequence_hi: "आपको एक ओरिएंटेशन टूर के दौरान दरवाजे के फ्रेम के पास एक छोटा लाल लीवर देखना याद है। आप इसे ढूंढते हैं और खींचते हैं। एक फुफकार के साथ, दरवाजे खुल जाते हैं, जिससे ताजी हवा अंदर आती है और एक बच निकलने का रास्ता बनता है। अपने परिवेश को जानना काम आया।", isCorrect: true },
                    { text: "Smash a large window with a fire extinguisher.", text_hi: "एक आग बुझाने वाले यंत्र से एक बड़ी खिड़की तोड़ दें।", consequence: "In a panic, you shatter a huge pane of glass. While this lets air in, it also sends dangerous shards flying, and a few people get minor cuts. There was a safer, non-destructive way to open the doors that you overlooked in the panic.", consequence_hi: "घबराहट में, आप कांच का एक विशाल फलक तोड़ देते हैं। जबकि यह हवा को अंदर आने देता है, यह खतरनाक टुकड़े भी उड़ाता है, और कुछ लोगों को मामूली कट लग जाते हैं। दरवाजों को खोलने का एक सुरक्षित, गैर-विनाशकारी तरीका था जिसे आपने घबराहट में अनदेखा कर दिया।", isCorrect: false }
                ]
            },
            {
                image: 'images/thirdhw.png',
                narrative: "With the doors open, there's some relief, but it's still dangerously hot. You notice your elderly history professor, Dr. Evans, at a nearby table. She looks flushed and seems confused, fumbling with her papers.",
                narrative_hi: "दरवाजे खुले होने से कुछ राहत मिलती है, लेकिन यह अभी भी खतरनाक रूप से गर्म है। आप पास की एक मेज पर अपने बुजुर्ग इतिहास के प्रोफेसर, डॉ. इवांस को देखते हैं। वह लाल दिखती है और भ्रमित लगती है, अपने कागजात के साथ टटोल रही है।",
                choices: [
                    { text: "Approach her and ask if she needs help.", text_hi: "उसके पास जाएँ और पूछें कि क्या उसे मदद की ज़रूरत है।", consequence: "You walk over. 'Dr. Evans, are you feeling alright?' She seems disoriented. Recognizing the signs of heat stress, you guide her towards the entryway for more air and give her your water bottle. Your awareness may have prevented a serious medical emergency.", consequence_hi: "आप चलते हैं। 'डॉ. इवांस, क्या आप ठीक महसूस कर रही हैं?' वह भटकी हुई लगती है। गर्मी के तनाव के संकेतों को पहचानते हुए, आप उसे अधिक हवा के लिए प्रवेश द्वार की ओर मार्गदर्शन करते हैं और उसे अपनी पानी की बोतल देते हैं। आपकी जागरूकता ने एक गंभीर चिकित्सा आपातकाल को रोका हो सकता है।", isCorrect: true },
                    { text: "Assume she's fine and focus on yourself.", text_hi: "मान लें कि वह ठीक है और अपने आप पर ध्यान केंद्रित करें।", consequence: "You fan yourself with a book. A few minutes later, you hear a thud. Dr. Evans has collapsed. Other students rush to help. You feel a pang of guilt, knowing you saw the warning signs but did nothing.", consequence_hi: "आप एक किताब से खुद को पंखा करते हैं। कुछ मिनट बाद, आप एक धमाका सुनते हैं। डॉ. इवांस गिर गई हैं। अन्य छात्र मदद के लिए दौड़ते हैं। आपको अपराध बोध का एक दर्द महसूस होता है, यह जानते हुए कि आपने चेतावनी के संकेत देखे लेकिन कुछ नहीं किया।", isCorrect: false }
                ]
            },
            {
                image: 'images/fourthhw.png',
                narrative: "Dr. Evans is conscious but very weak. Her skin is hot and dry, and she's not sweating. These are classic signs of heat stroke, a medical emergency. The campus emergency line is jammed.",
                narrative_hi: "डॉ. इवांस होश में हैं लेकिन बहुत कमजोर हैं। उनकी त्वचा गर्म और सूखी है, और उन्हें पसीना नहीं आ रहा है। ये हीट स्ट्रोक के क्लासिक संकेत हैं, एक चिकित्सा आपातकाल। परिसर की आपातकालीन लाइन जाम है।",
                choices: [
                    { text: "Move her to a cooler spot and apply cool cloths while someone runs for help.", text_hi: "उसे एक ठंडी जगह पर ले जाएँ और ठंडे कपड़े लगाएँ जबकि कोई मदद के लिए दौड़ता है।", consequence: "You help Dr. Evans to the shaded entryway. You soak paper towels in cool water and place them on her forehead and neck while Sam runs to the campus health center. Your quick, correct actions are critical in treating heat stroke.", consequence_hi: "आप डॉ. इवांस को छायादार प्रवेश द्वार तक मदद करते हैं। आप ठंडे पानी में कागज के तौलिये भिगोते हैं और उन्हें उसके माथे और गर्दन पर रखते हैं जबकि सैम परिसर के स्वास्थ्य केंद्र में दौड़ता है। आपकी त्वरित, सही क्रियाएं हीट स्ट्रोक के इलाज में महत्वपूर्ण हैं।", isCorrect:true },
                    { text: "Just try to give her more water to drink.", text_hi: "बस उसे और पानी पिलाने की कोशिश करें।", consequence: "You try to get her to drink, but she's too confused and weak to swallow properly. You realize that for someone in her condition, simply giving water isn't enough—and can even be dangerous. Immediate cooling is needed.", consequence_hi: "आप उसे पीने के लिए मजबूर करने की कोशिश करते हैं, लेकिन वह ठीक से निगलने के लिए बहुत भ्रमित और कमजोर है। आपको एहसास होता है कि उसकी स्थिति में किसी के लिए, बस पानी देना पर्याप्त नहीं है—और खतरनाक भी हो सकता है। तत्काल शीतलन की आवश्यकता है।", isCorrect: false }
                ]
            },
            {
                image: 'images/fifthhw.png',
                narrative: "Sam returns, breathless. The health center is locked. You're on your own. Dr. Evans is still not improving. You need a way to cool her down faster. You see a decorative fountain in the courtyard outside.",
                narrative_hi: "सैम हांफता हुआ लौटता है। स्वास्थ्य केंद्र बंद है। आप अकेले हैं। डॉ. इवांस अभी भी सुधार नहीं कर रही हैं। आपको उसे तेजी से ठंडा करने का एक तरीका चाहिए। आप बाहर आंगन में एक सजावटी फव्वारा देखते हैं।",
                choices: [
                    { text: "Use water from the fountain to continue soaking cloths.", text_hi: "कपड़े भिगोना जारी रखने के लिए फव्वारे से पानी का उपयोग करें।", consequence: "The fountain water is cooler than the tap water inside. You organize a relay of students to bring wet cloths, drastically increasing your ability to cool her down. This sustained, efficient cooling effort stabilizes her condition until paramedics can arrive.", consequence_hi: "फव्वारे का पानी अंदर के नल के पानी से ठंडा है। आप गीले कपड़े लाने के लिए छात्रों की एक रिले आयोजित करते हैं, जिससे उसे ठंडा करने की आपकी क्षमता में भारी वृद्धि होती है। यह निरंतर, कुशल शीतलन प्रयास पैरामेडिक्स के आने तक उसकी स्थिति को स्थिर करता है।", isCorrect: true },
                    { text: "Try to move her into the fountain itself.", text_hi: "उसे फव्वारे में ही ले जाने की कोशिश करें।", consequence: "Moving her is difficult and clumsy. You manage to get her to the fountain, but the stress of the move seems to make her condition worse, and it's an undignified and uncontrolled way to cool someone. Applying targeted cool compresses is a better first aid technique.", consequence_hi: "उसे हिलाना मुश्किल और अनाड़ी है। आप उसे फव्वारे तक पहुँचाने में कामयाब होते हैं, लेकिन इस कदम के तनाव से उसकी हालत और खराब हो जाती है, और यह किसी को ठंडा करने का एक अशोभनीय और अनियंत्रित तरीका है। लक्षित ठंडे सेक लगाना एक बेहतर प्राथमिक चिकित्सा तकनीक है।", isCorrect: false }
                ]
            }
        ]
    },
    cyclone: {
        title: "Cyclone: Eye of the Storm",
        keyTakeaways: [
            "Heed evacuation orders; if you can't, prepare your shelter.",
            "Shelter in an interior room away from all windows.",
            "Address new hazards (like water leaks) calmly and methodically.",
            "The 'eye' of the storm is a deceptive calm; stay sheltered.",
            "After the storm, check supplies and never enter damaged buildings."
        ],
        story: [
            {
                image: 'images/firstcy.png',
                narrative: "Your coastal college is in the path of a massive cyclone. Evacuation orders are issued, but you and Sam missed the last bus. You must shelter in your dorm. Sam seems to think it's a big adventure. 'Let's have a hurricane party!' he suggests.",
                narrative_hi: "आपका तटीय कॉलेज एक बड़े चक्रवात के रास्ते में है। निकासी के आदेश जारी किए गए हैं, लेकिन आप और सैम आखिरी बस चूक गए। आपको अपने छात्रावास में शरण लेनी होगी। सैम को लगता है कि यह एक बड़ा रोमांच है। 'चलो एक तूफान पार्टी करते हैं!' वह सुझाव देता है।",
                choices: [
                    { text: "'No party. We need to fill the bathtub with water and move mattresses into the hallway.'", text_hi: "'कोई पार्टी नहीं। हमें बाथटब को पानी से भरना है और गद्दों को हॉलवे में ले जाना है।'", consequence: "You get Sam to focus. You fill the tub for an emergency water supply and drag your mattresses into the windowless central hallway. When the storm hits, you hear your dorm room window shattering, but you're safe. Your preparation was crucial.", consequence_hi: "आप सैम को ध्यान केंद्रित करने के लिए कहते हैं। आप आपातकालीन जल आपूर्ति के लिए टब भरते हैं और अपने गद्दों को बिना खिड़की वाले केंद्रीय हॉलवे में खींचते हैं। जब तूफान आता है, तो आप अपने छात्रावास के कमरे की खिड़की टूटने की आवाज सुनते हैं, लेकिन आप सुरक्षित हैं। आपकी तैयारी महत्वपूर्ण थी।", isCorrect: true },
                    { text: "'Okay, but we should at least tape the windows first.'", text_hi: "'ठीक है, लेकिन हमें पहले कम से कम खिड़कियों पर टेप लगाना चाहिए।'", consequence: "You put tape on the windows, a common myth. When the cyclone's full force arrives, the entire window explodes inward, sending large, taped shards of glass flying across the room. You're lucky to escape unhurt, realizing taping windows is ineffective.", consequence_hi: "आप खिड़कियों पर टेप लगाते हैं, जो एक आम मिथक है। जब चक्रवात की पूरी ताकत आती है, तो पूरी खिड़की अंदर की ओर फट जाती है, जिससे कमरे में टेप लगे कांच के बड़े टुकड़े उड़ जाते हैं। आप भाग्यशाली हैं कि आप बिना किसी चोट के बच गए, यह महसूस करते हुए कि खिड़कियों पर टेप लगाना अप्रभावी है।", isCorrect: false }
                ]
            },
            {
                image: 'images/secondcy.png',
                narrative: "You're huddled in the hallway. A terrifying roar fills the air. Suddenly, water begins dripping, then pouring, from a ceiling light fixture near the only working electrical outlet, where someone is charging a portable radio.",
                narrative_hi: "आप हॉलवे में दुबके हुए हैं। एक भयानक दहाड़ हवा में भर जाती है। अचानक, एकमात्र काम कर रहे बिजली के आउटलेट के पास एक छत के प्रकाश स्थिरता से पानी टपकना शुरू हो जाता है, फिर बहता है, जहाँ कोई एक पोर्टेबल रेडियो चार्ज कर रहा है।",
                choices: [
                    { text: "Find the floor's circuit breaker and shut off all power.", text_hi: "मंजिल का सर्किट ब्रेकर ढूंढें और सारी बिजली बंद कर दें।", consequence: "You quickly locate the breaker panel in the hall and flip the main switch, plunging the hall into darkness but eliminating the risk of electrocution. Safety from a primary hazard (electricity) is more important than the convenience of light. You use your phone's flashlight instead.", consequence_hi: "आप जल्दी से हॉल में ब्रेकर पैनल का पता लगाते हैं और मुख्य स्विच को पलटते हैं, हॉल को अंधेरे में डुबो देते हैं लेकिन बिजली के झटके के जोखिम को खत्म कर देते हैं। एक प्राथमिक खतरे (बिजली) से सुरक्षा प्रकाश की सुविधा से अधिक महत्वपूर्ण है। आप इसके बजाय अपने फोन की टॉर्च का उपयोग करते हैं।", isCorrect: true },
                    { text: "Move everyone into the large communal bathroom.", text_hi: "सभी को बड़े सांप्रदायिक बाथरूम में ले जाएँ।", consequence: "You rush everyone into the bathroom, but it's more cramped. Worse, a moment later you hear a crack as a pipe bursts in the bathroom wall from the building's stress, creating a new and more immediate flooding hazard. You chose a more complex risk over a simple solution.", consequence_hi: "आप सभी को बाथरूम में दौड़ाते हैं, लेकिन यह अधिक तंग है। इससे भी बदतर, एक क्षण बाद आप एक दरार सुनते हैं क्योंकि इमारत के तनाव से बाथरूम की दीवार में एक पाइप फट जाता है, जिससे एक नया और अधिक तत्काल बाढ़ का खतरा पैदा होता है। आपने एक सरल समाधान पर एक अधिक जटिल जोखिम चुना।", isCorrect: false }
                ]
            },
            {
                image: 'images/thirdcy.png',
                narrative: "After hours of chaos, everything goes completely silent. The wind stops. A weird, dim sunlight filters through the dust. 'It's over!' Sam yells, relieved. 'Let's go outside and see the damage!'",
                narrative_hi: "घंटों की अराजकता के बाद, सब कुछ पूरी तरह से शांत हो जाता है। हवा रुक जाती है। एक अजीब, मंद सूरज की रोशनी धूल के माध्यम से छनती है। 'यह खत्म हो गया है!' सैम चिल्लाता है, राहत महसूस करता है। 'चलो बाहर जाकर नुकसान देखते हैं!'",
                choices: [
                    { text: "'No! That's the eye of the storm. The other side is coming. Stay here!'", text_hi: "'नहीं! यह तूफान की आंख है। दूसरी तरफ आ रहा है। यहीं रहो!'", consequence: "You hold Sam back, explaining that this is a temporary, deceptive calm. Sure enough, 20 minutes later, the wind slams into the building from the opposite direction. You stayed safe because you understood the true nature of a cyclone.", consequence_hi: "आप सैम को वापस पकड़ते हैं, यह समझाते हुए कि यह एक अस्थायी, भ्रामक शांति है। निश्चित रूप से, 20 मिनट बाद, हवा विपरीत दिशा से इमारत से टकराती है। आप सुरक्षित रहे क्योंकि आप एक चक्रवात की वास्तविक प्रकृति को समझते थे।", isCorrect: true },
                    { text: "'Just for a quick look. Don't go far.'", text_hi: "'बस एक त्वरित नज़र के लिए। दूर मत जाओ।'", consequence: "You both step into the debris-filled courtyard. But before you can even react, the back wall of the cyclone hits. A violent blast of wind knocks you both off your feet. You have to crawl back inside, battered and bruised.", consequence_hi: "आप दोनों मलबे से भरे आंगन में कदम रखते हैं। लेकिन इससे पहले कि आप प्रतिक्रिया भी कर सकें, चक्रवात की पिछली दीवार टकराती है। हवा का एक हिंसक झोंका आप दोनों को आपके पैरों से गिरा देता है। आपको चोटिल और चोटिल होकर अंदर वापस रेंगना पड़ता है।", isCorrect: false }
                ]
            },
            {
                image: 'images/fourthcy.png',
                narrative: "The storm has finally passed, leaving behind a scene of devastation. Your building is one of the few still standing. The power is out and phones are dead. Before doing anything else, you need to assess your own supplies.",
                narrative_hi: "तूफान आखिरकार गुजर गया है, अपने पीछे तबाही का एक दृश्य छोड़ गया है। आपकी इमारत अभी भी खड़ी कुछ में से एक है। बिजली चली गई है और फोन मृत हैं। कुछ और करने से पहले, आपको अपनी आपूर्ति का आकलन करने की आवश्यकता है।",
                choices: [
                    { text: "Check your emergency kit and filter the bathtub water before drinking.", text_hi: "अपनी आपातकालीन किट की जाँच करें और पीने से पहले बाथटब के पानी को फ़िल्टर करें।", consequence: "You find your food kit is safe. You know that even clean-looking water can be contaminated after a storm, so you use a t-shirt to filter the tub water into a bottle. It's a basic but important step to prevent sickness.", consequence_hi: "आपको पता चलता है कि आपकी खाद्य किट सुरक्षित है। आप जानते हैं कि तूफान के बाद साफ दिखने वाला पानी भी दूषित हो सकता है, इसलिए आप टब के पानी को एक बोतल में फ़िल्टर करने के लिए एक टी-शर्ट का उपयोग करते हैं। यह बीमारी को रोकने के लिए एक बुनियादी लेकिन महत्वपूर्ण कदम है।", isCorrect: true },
                    { text: "Assume the tap water is fine and start drinking it.", text_hi: "मान लें कि नल का पानी ठीक है और इसे पीना शुरू कर दें।", consequence: "You're thirsty and drink directly from the tap. A day later, you start feeling sick. The local water treatment plant was damaged in the storm, and the water supply was contaminated. You should have assumed all water was unsafe.", consequence_hi: "आप प्यासे हैं और सीधे नल से पीते हैं। एक दिन बाद, आप बीमार महसूस करने लगते हैं। तूफान में स्थानीय जल उपचार संयंत्र क्षतिग्रस्त हो गया था, और पानी की आपूर्ति दूषित हो गई थी। आपको यह मान लेना चाहिए था कि सारा पानी असुरक्षित था।", isCorrect: false }
                ]
            },
            {
                image: 'images/fifthcy.png',
                narrative: "You can hear faint cries for help coming from a partially collapsed wooden building nearby. It's the arts building, known for its unstable structure even before the storm.",
                narrative_hi: "आप पास की एक आंशिक रूप से ढह गई लकड़ी की इमारत से मदद के लिए हल्की चीखें सुन सकते हैं। यह कला भवन है, जो तूफान से पहले भी अपनी अस्थिर संरचना के लिए जाना जाता है।",
                choices: [
                    { text: "Stay put. Shout back that you've heard them and that help will come.", text_hi: "वहीं रहो। वापस चिल्लाओ कि तुमने उन्हें सुना है और मदद आएगी।", consequence: "You know that entering a damaged structure is extremely dangerous. Shouting back lets them know they aren't alone, which is good for morale, but you wait for professional rescuers, preventing you from becoming another victim.", consequence_hi: "आप जानते हैं कि एक क्षतिग्रस्त संरचना में प्रवेश करना बेहद खतरनाक है। वापस चिल्लाना उन्हें बताता है कि वे अकेले नहीं हैं, जो मनोबल के लिए अच्छा है, लेकिन आप पेशेवर बचावकर्ताओं की प्रतीक्षा करते हैं, जिससे आप एक और शिकार बनने से बचते हैं।", isCorrect: true },
                    { text: "Try to go and help them yourselves.", text_hi: "खुद जाकर उनकी मदद करने की कोशिश करें।", consequence: "You and Sam start climbing over the wreckage. A loose beam shifts, and you barely manage to jump back before a section of the roof caves in. You realize that without training and equipment, you're more likely to get hurt than to help.", consequence_hi: "आप और सैम मलबे पर चढ़ना शुरू करते हैं। एक ढीला बीम हिलता है, और आप छत का एक हिस्सा ढहने से पहले मुश्किल से वापस कूद पाते हैं। आपको एहसास होता है कि प्रशिक्षण और उपकरण के बिना, आप मदद करने से ज्यादा चोटिल होने की संभावना रखते हैं।", isCorrect: false }
                ]
            }
        ]
    }
};


function DrillGame({onBack}) {
    // --- STATE MANAGEMENT ---
    const [view, setView] = useState('start'); // 'start', 'scenario', 'drill', 'end'
    const [currentScenario, setCurrentScenario] = useState(null);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [isTranslated, setIsTranslated] = useState(false);
    const [feedback, setFeedback] = useState(null); // To show consequence text
    const [animationClass, setAnimationClass] = useState('');

    const sounds = useRef(null);

    // --- SOUND INITIALIZATION ---
    const initSounds = async () => {
        if (!sounds.current && window.Tone) {
            await window.Tone.start();
            sounds.current = {
                success: new window.Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 } }).toDestination(),
                failure: new window.Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.4, sustain: 0.1, release: 1 } }).toDestination(),
                click: new window.Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.001, decay: 0.1, sustain: 0.01, release: 0.1 } }).toDestination(),
            };
        }
    };

    // --- HANDLER FUNCTIONS ---
    const handleStart = () => {
        initSounds();
        sounds.current?.click.triggerAttackRelease("C5", "8n");
        setView('scenario');
    };
    
    const handleGoHome = () => {
        sounds.current?.click.triggerAttackRelease("C5", "8n");
        setAnimationClass('slide-out');
        setTimeout(() => {
            setView('scenario');
            setCurrentScenario(null);
            setCurrentChapterIndex(0);
            setFeedback(null);
            setIsTranslated(false);
            setAnimationClass('slide-in');
            setTimeout(() => setAnimationClass(''), 700);
        }, 500);
    };

    const handleSelectScenario = (scenarioKey) => {
        sounds.current?.click.triggerAttackRelease("C5", "8n");
        setAnimationClass('slide-out');
        setTimeout(() => {
            setCurrentScenario(scenarios[scenarioKey]);
            setCurrentChapterIndex(0);
            setFeedback(null);
            setIsTranslated(false);
            setView('drill');
            setAnimationClass('slide-in');
            setTimeout(() => setAnimationClass(''), 700);
        }, 500);
    };
    
    const handleChoice = (choice) => {
        if (choice.isCorrect) {
            sounds.current?.success.triggerAttackRelease("C5", "8n");
        } else {
            sounds.current?.failure.triggerAttackRelease("C3", "8n");
        }
        setFeedback(choice);
    };

    const handleNextChapter = () => {
        sounds.current?.click.triggerAttackRelease("C5", "8n");
        if (currentChapterIndex < currentScenario.story.length - 1) {
            setCurrentChapterIndex(currentChapterIndex + 1);
            setFeedback(null);
        } else {
            setView('end');
        }
    };
    
    const handleTranslate = () => {
        sounds.current?.click.triggerAttackRelease("C4", "8n");
        setIsTranslated(!isTranslated);
    };

    // --- RENDER LOGIC ---
    const renderContent = () => {
        switch (view) {
            case 'start':
                return (
                    <div id="start-screen" className="text-center">
                        <div className="mb-6">
                            <svg className="w-24 h-24 mx-auto text-[#a8d1ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9V7a4 4 0 018 0v2"></path></svg>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">Disaster Ready</h1>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#a8d1ff] mb-6">The Hero's Drill</h2>
                        <p className="max-w-2xl mx-auto text-slate-600 mb-10 text-lg">Welcome! In this virtual drill, you'll face realistic scenarios to learn how to stay safe during natural disasters. Your choices matter. Are you ready to become a preparedness hero?</p>
                        <button onClick={handleStart} id="start-btn" className="bg-[#a8d1ff] text-white font-bold py-4 px-10 rounded-full text-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#cce4ff]">
                            Start Your Mission
                        </button>
                    </div>
                );

            case 'scenario':
                return (
                    <div id="scenario-screen">
                        <h2 className="text-3xl font-bold text-center mb-2">Choose Your Challenge</h2>
                        <p className="text-center text-slate-500 mb-10">Select a scenario to begin your training drill.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Cards are generated dynamically */}
                            {Object.entries(scenarios).map(([key, { title }]) => (
                                <div key={key} onClick={() => handleSelectScenario(key)} className="scenario-card cursor-pointer bg-[#a8d1ff] text-white p-6 rounded-xl shadow-md transition-all duration-300">
                                    <h3 className="text-xl font-bold">{title}</h3>
                                    <p className="opacity-80">
                                        {key === 'earthquake' && 'The ground is shaking. What do you do?'}
                                        {key === 'flood' && 'Water levels are rising fast. Act now!'}
                                        {key === 'heatwave' && 'Temperatures are soaring. Stay cool, stay safe.'}
                                        {key === 'cyclone' && 'A powerful storm is approaching. Prepare!'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            
            case 'drill':
                const chapter = currentScenario.story[currentChapterIndex];
                const narrative = isTranslated ? chapter.narrative_hi : chapter.narrative;

                return (
                    <div id="drill-screen">
                         <div className="flex justify-between items-center mb-4">
                            <h2 id="scenario-title" className="text-2xl font-bold text-[#a8d1ff]">{currentScenario.title}</h2>
                            <div className="flex items-center gap-4">
                               <button onClick={handleTranslate} className="text-sm font-medium text-slate-600 hover:text-[#a8d1ff]">{isTranslated ? 'Translate to English' : 'Translate to Hindi'}</button>
                               <button onClick={handleGoHome} className="text-sm font-medium text-slate-600 hover:text-[#a8d1ff]">← Change Scenario</button>
                            </div>
                        </div>

                        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
                            <div id="progress-bar" className="bg-[#a8d1ff] h-2.5 rounded-full transition-all duration-500" style={{ width: `${(currentChapterIndex / currentScenario.story.length) * 100}%` }}></div>
                        </div>

                        {chapter.image && (
                            <div id="image-container" className="mb-6 rounded-lg overflow-hidden aspect-video bg-slate-200 shadow-inner">
                                <img id="scenario-image" src={chapter.image} alt="Scenario" className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="bg-[#a8d1ff] p-6 rounded-lg mb-6 min-h-[100px]">
                            <p id="narrative-text" className="text-white text-lg narrative-text">{feedback ? (isTranslated ? feedback.consequence_hi : feedback.consequence) : narrative}</p>
                        </div>
                        
                        <div id="options-container" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {feedback ? (
                                <button onClick={handleNextChapter} className="option-btn w-full p-4 rounded-lg bg-[#a8d1ff] text-white hover:opacity-90 transition duration-300 font-bold md:col-span-2 text-center">
                                    {isTranslated ? 'अगला →' : 'Next →'}
                                </button>
                            ) : (
                                chapter.choices.map((choice, index) => (
                                    <button key={index} onClick={() => handleChoice(choice)} className="option-btn w-full text-left p-4 rounded-lg bg-white text-slate-800 border border-slate-200 hover:bg-slate-100 transition duration-300 font-medium">
                                        {isTranslated ? choice.text_hi : choice.text}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                );
            
            case 'end':
                return (
                     <div id="end-screen" className="text-center">
                        <h2 className="text-4xl font-bold text-slate-900 mb-2">Drill Complete!</h2>
                        <div className="mb-4">
                            <svg className="w-20 h-20 mx-auto text-[#a8d1ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <p className="text-slate-600 text-lg mb-8">Fantastic job! You've successfully navigated the scenario and learned key survival skills. You are now better prepared.</p>

                        <div className="bg-[#a8d1ff] p-6 rounded-lg text-left mb-8">
                            <h3 className="text-xl font-bold text-white mb-4">Key Takeaways:</h3>
                            <ul className="list-disc list-inside space-y-2 text-white">
                                {currentScenario.keyTakeaways.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button onClick={() => handleSelectScenario(Object.keys(scenarios).find(key => scenarios[key].title === currentScenario.title))} className="bg-[#a8d1ff] text-white font-bold py-3 px-8 rounded-full text-lg hover:opacity-90 transition duration-300">Replay This Scenario</button>
                            <button onClick={handleGoHome} className="bg-white text-[#a8d1ff] border border-[#a8d1ff] font-bold py-3 px-8 rounded-full text-lg hover:bg-slate-100 transition duration-300">Choose New Scenario</button>
                        </div>
                    </div>
                );

            default:
                return <div>Loading...</div>;
        }
    };
    
    return (
        <div className="bg-[#a8d1ff] text-slate-800 flex items-center justify-center min-h-screen p-4">
            <div id="game-container" className={`w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 overflow-hidden ${animationClass}`}>
                {renderContent()}
            </div>
        </div>
    );
}

export default DrillGame;