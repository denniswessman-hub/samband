export type Lesson = {
  title: string;
  intro: string;
  points: string[];
  memory?: string;
  caution?: string;
};

export type QuizItem = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type LearningModule = {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  duration: string;
  outcome: string;
  accent: "teal" | "orange" | "lime" | "blue";
  lessons: Lesson[];
  quiz: QuizItem[];
  sources: string[];
};

export const modules: LearningModule[] = [
  {
    id: "rakel-grund",
    number: "01",
    title: "Rakel i praktiken",
    short: "Rakel & ansvar",
    description: "Förstå nätet, terminalerna och ansvaret som följer med utrustningen.",
    duration: "12 min",
    outcome: "Du kan förklara Rakel, skilja nätläge från direktläge och hantera terminalen säkert.",
    accent: "teal",
    lessons: [
      {
        title: "Ett gemensamt nät för samhällsviktiga aktörer",
        intro: "Rakel är statens rikstäckande digitala radiosystem för säker och robust samverkan. MSB driver nätet och användarorganisationerna abonnerar på tjänsten.",
        points: [
          "RAKEL står för Radiokommunikation för effektiv ledning.",
          "TETRA är den internationella nätstandard som Rakel bygger på.",
          "I nätläge går trafiken via basnätet. Talet är trunkerat och krypterat.",
          "Talgrupper gör att behöriga användare kan lyssna; bara en sänder åt gången.",
        ],
        memory: "Rakel är systemet. TETRA är standarden. Talgruppen är mötesplatsen.",
      },
      {
        title: "Terminalfamiljen",
        intro: "Utbildningsmaterialet beskriver flera terminaler. Funktionerna är i stort desamma, men knappar och menyer kan ligga på olika platser.",
        points: [
          "SC21 är en vanlig handterminal i utbildningen.",
          "STP9000 och HBC-varianter förekommer i andra miljöer och fordon.",
          "Fordonsterminalen har högre sändareffekt och kan användas som gateway eller repeater.",
          "TITAN och POLMAN visar eller styr vissa Rakelfunktioner via fordonets gränssnitt.",
        ],
        caution: "Följ alltid aktuell terminalversion, lokal utbildning och sambandstablå. Knappnamn kan skilja sig.",
      },
      {
        title: "Säkert handhavande",
        intro: "En terminal ger tillgång till skyddad kommunikation och ska därför behandlas som säkerhetskänslig utrustning.",
        points: [
          "Ha handterminalen under uppsikt eller förvara den i låst och larmat utrymme.",
          "Använd och lyssna endast när du är i tjänst, om inget särskilt beslut säger annat.",
          "Ta ur batteriet när du inte är i tjänst enligt materialets grundregel.",
          "Vid förlust: spärra terminalen via servicedesk, upprätta anmälan och underrätta sambandsansvarig.",
        ],
        memory: "Uppsikt – låst – spärrad vid förlust.",
      },
    ],
    quiz: [
      {
        question: "Vad beskriver TETRA i relation till Rakel?",
        options: ["En talgrupp", "Nätstandarden", "En terminalmodell", "En status"],
        answer: 1,
        explanation: "TETRA är nätstandarden. Rakel är Sveriges radiosystem som använder den.",
      },
      {
        question: "Vilken åtgärd hör till rutinen när en handterminal försvinner?",
        options: ["Vänta till nästa pass", "Bara meddela kollegan", "Spärra, anmäl och underrätta SA", "Byt talgrupp"],
        answer: 2,
        explanation: "Terminalen ska spärras, förlusten eller stölden anmälas och sambandsansvarig underrättas.",
      },
      {
        question: "Vad gäller i ett gruppsamtal?",
        options: ["Alla kan sända samtidigt", "Bara RLC kan sända", "En terminal sänder åt gången", "Det kräver ett telefonnummer"],
        answer: 2,
        explanation: "Flera kan lyssna i talgruppen men bara en terminal kan sända åt gången.",
      },
    ],
    sources: ["Rakel ABC.pdf", "RAKEL och Tetra.pdf", "Regler hantering av terminaler.pdf", "Terminaler STP9000 och HBC.pdf"],
  },
  {
    id: "terminalen",
    number: "02",
    title: "Läs terminalen",
    short: "Display & direktval",
    description: "Gör display, knappar, profiler och direktval till ett tryggt arbetsspråk.",
    duration: "16 min",
    outcome: "Du kan läsa grunddisplayen och förklara de viktigaste direktvalen på SC21.",
    accent: "orange",
    lessons: [
      {
        title: "Displayen svarar på fyra frågor",
        intro: "Börja alltid med att läsa displayen innan du felsöker eller sänder.",
        points: [
          "Är skanningen aktiv? Leta efter skanningssymbolen.",
          "Har terminalen nätkontakt och hur stark är signalen?",
          "Vilken talgrupp är aktiv och vilket index har den?",
          "Kommer talgruppen från en skanninglista eller en vanlig mapp?",
        ],
        memory: "Skanning – nät – talgrupp – mapp.",
      },
      {
        title: "Knapparna du använder ofta",
        intro: "På SC21 ger samma knapp olika resultat beroende på kort eller långt tryck.",
        points: [
          "PTT hålls inne under hela sändningen. Vänta in kopplingstonen före tal.",
          "Grön lur öppnar anropshistorik med kort tryck och bekräftar duplexsamtal.",
          "Röd lur startar eller stänger terminalen med långt tryck och backar i menyer.",
          "Knapp A skickar anropsbegäran; B väljer normal ljudprofil; C väljer nattprofil – alla med långt tryck.",
          "Långt tryck på höger eller vänster pil skickar statusen Påbörjat uppdrag.",
        ],
      },
      {
        title: "Direktval 1–#",
        intro: "Direktval aktiveras med långt tryck på det numeriska tangentbordet.",
        points: [
          "1 normalpassning · 2 anropsbegäran · 3 regional insatsgrupp.",
          "4–5 polisområdets första respektive andra insatsgrupp.",
          "6 växlar mellan de två senast använda talgrupperna.",
          "7 SAMV Pol eller programmerad funktion · 8 byter driftsätt · 9 RAPS.",
          "* knapplås · 0 ljudväg · # smartmeny.",
        ],
        caution: "Direktval 1, 7 och 9 kan programmeras. Kontrollera alltid den aktuella infomenyn och lokala anvisningar.",
      },
      {
        title: "Profiler och ljudväg",
        intro: "Profiler kombinerar ljud, ljus och vibration. Fel profil eller ljudväg kan se ut som ett terminalfel.",
        points: [
          "Normal, Normal tyst, Natt, Span och Tyst är förprogrammerade profiler.",
          "Mörk display kan bero på nattprofil. På SC21 väljer långt B normal ljudprofil.",
          "Svagt ljud från bordet trots hög volym kan bero på att ljudet ligger i den inre högtalaren.",
          "Långt direktval 0 växlar ljudväg.",
        ],
      },
    ],
    quiz: [
      {
        question: "Vad hör indexnumret i grunddisplayen alltid till?",
        options: ["Skanninglistan", "Talgruppen", "Profilen", "Batteriet"],
        answer: 1,
        explanation: "Indexnumret hör alltid till den talgrupp som ligger i displayen.",
      },
      {
        question: "Vilket direktval öppnar smartmenyn?",
        options: ["0", "*", "#", "6"],
        answer: 2,
        explanation: "Långt tryck på # öppnar smartmenyn.",
      },
      {
        question: "Displayen är oväntat mörk. Vilken enkel förklaring ska du pröva först?",
        options: ["Fel RLC", "Nattprofil är vald", "Förtursläge", "SDS-kö"],
        answer: 1,
        explanation: "Nattprofilen sänker belysningen. På SC21 återgår du enkelt med långt tryck på B.",
      },
    ],
    sources: ["knappologi och display.pdf", "Direktval.pdf", "Displaybilder Driftsätt.pdf", "Menyn.pdf", "Symboler.pdf"],
  },
  {
    id: "driftsatt",
    number: "03",
    title: "Driftsätt & täckning",
    short: "TMO, DMO & gateway",
    description: "Välj rätt driftsätt när nätet fungerar – och när det inte gör det.",
    duration: "14 min",
    outcome: "Du kan välja TMO eller DMO och beskriva hur en gateway upprättas och avslutas.",
    accent: "blue",
    lessons: [
      {
        title: "Nätläge och direktläge",
        intro: "Driftsättet avgör hur terminalerna når varandra.",
        points: [
          "TMO/nätläge använder Rakels basnät och kan nå behöriga användare oavsett avstånd inom nätets täckning.",
          "DMO/direktläge går terminal till terminal inom antennräckvidd och utan basnät.",
          "Direktläge är inte samma sak som att nätet förstärks; räckvidden är lokal.",
          "Om inget annat sägs anger materialet Pol 1 DMO som standardtalgrupp i direktläge.",
        ],
      },
      {
        title: "Gateway binder ihop två världar",
        intro: "En fordonsterminal med nätkontakt kan koppla samman en talgrupp i TMO med en talgrupp i DMO.",
        points: [
          "Informera RLC och få en insatstalgrupp tilldelad innan gateway upprättas.",
          "Displaylägg insatstalgruppen i fordonsterminalen och välj Gateway via långt direktval 8.",
          "Välj DMO-talgrupp och se till att alla terminaler på den nätlösa platsen använder samma DMO-talgrupp.",
          "Gör förbindelseprov. När behovet upphör: meddela RLC, stäng gateway och återgå till nätläge och normalpassning.",
        ],
        caution: "En förtursbegäran når inte RLC i ren DMO. I en fungerande gateway kan den förmedlas via fordonsterminalen.",
      },
      {
        title: "Repeater och systematisk felsökning",
        intro: "En repeater förstärker och vidarebefordrar radiosignalen i direktläge. Den ska inte blandas ihop med gateway.",
        points: [
          "Gateway kopplar DMO till en TMO-talgrupp.",
          "Repeater förlänger räckvidden mellan terminaler i DMO.",
          "Betong, stål, berg och tunnlar kan blockera signaler.",
          "Vid återkommande täckningsfel: dokumentera tid, plats, koordinater och tekniska värden enligt lokal felanmälningsrutin.",
        ],
        memory: "Gateway byter system. Repeater förlänger DMO.",
      },
    ],
    quiz: [
      {
        question: "Vilken funktion kopplar en DMO-talgrupp till en talgrupp i Rakelnätet?",
        options: ["Skanning", "Gateway", "Profil", "Sändarspärr"],
        answer: 1,
        explanation: "Gateway kopplar ihop en talgrupp i direktläge med en talgrupp i nätläge.",
      },
      {
        question: "Vad gör du först innan en polisiär gateway upprättas?",
        options: ["Stänger skanningen", "Informerar RLC och får talgrupp", "Skickar SDS till alla", "Byter PIN"],
        answer: 1,
        explanation: "RLC ska informeras och tilldela en insatstalgrupp.",
      },
      {
        question: "Vad kännetecknar DMO?",
        options: ["Trafik via basnätet", "Bara individsamtal", "Terminal till terminal inom antennräckvidd", "Automatisk RLC-kontakt"],
        answer: 2,
        explanation: "I DMO kommunicerar terminalerna direkt med varandra inom räckvidd.",
      },
    ],
    sources: ["Driftsätt.pdf", "Gateway.pdf", "Gateway KORT.pdf", "Förbindelseprov.pdf", "Inför aspiranten.pdf"],
  },
  {
    id: "talgrupper",
    number: "04",
    title: "Hitta rätt talgrupp",
    short: "Mappar & index",
    description: "Navigera i mappträdet och förstå vad olika talgrupper är till för.",
    duration: "18 min",
    outcome: "Du kan välja talgrupp via direktval, index eller mappträd och anmäla dig korrekt.",
    accent: "lime",
    lessons: [
      {
        title: "Talgruppens uppgift styr valet",
        intro: "Talgrupper fungerar tekniskt likadant men används för olika operativa syften.",
        points: [
          "Ordertalgrupp används när RLC beordrar eller informerar patruller.",
          "Insatstalgrupp tilldelas av RLC för en inte i förväg planerad händelse där flera resurser samverkar.",
          "Interntalgrupp används inom en arbetsgrupp och ersätter inte en operativ insatstalgrupp.",
          "Samverkanstalgrupper som RAPS används mellan organisationer.",
          "Priotalgrupper bakgrundsskannas och används restriktivt av RLC.",
        ],
      },
      {
        title: "Tre vägar till rätt talgrupp",
        intro: "Välj den metod som är snabbast och säkrast i situationen.",
        points: [
          "Direktval för förutbestämda eller programmerade val.",
          "Mittvalsknapp eller navigationsratt följt av indexnummer.",
          "Mittvalsknapp eller navigationsratt, sedan pilar mellan mappar och vred mellan talgrupper.",
          "Du måste vara i rätt mapp innan vredet kan hitta rätt talgrupp.",
        ],
        memory: "Pilar väljer mapp. Vred väljer talgrupp.",
      },
      {
        title: "Index ger en genväg",
        intro: "Alla talgrupper har index. Vissa är nationellt strukturerade, andra regionala.",
        points: [
          "Insatstalgrupper har tre siffror: region, polisområde och löpnummer.",
          "Insats 53 i Region Syd blir exempelvis 653.",
          "RLC-talgrupper har index som följer RLC:s anropssignal, till exempel 60 för Region Syd.",
          "Regionala index kan variera och ska kontrolleras i terminalen eller aktuell dokumentation.",
        ],
      },
      {
        title: "När du byter talgrupp",
        intro: "Själva bytet är inte klart förrän rätt personer vet att du är med.",
        points: [
          "Lyssna klart på RLC-anropet innan du byter.",
          "Anmäl hela anropssignalen på den nya insatstalgruppen.",
          "På en samverkanstalgrupp ska du även säga vilken organisation du representerar.",
          "Mappen EGEN är en samlingsplats för favorittalgrupper, inte en skanninglista.",
        ],
      },
    ],
    quiz: [
      {
        question: "Vilket index har Insats 53 i Region Syd enligt den nationella strukturen?",
        options: ["563", "653", "635", "503"],
        answer: 1,
        explanation: "6 = Region Syd, 5 = polisområde, 3 = löpnummer.",
      },
      {
        question: "Vilken kontroll gör du när du navigerar manuellt?",
        options: ["Pilar för talgrupp, vred för mapp", "Vred för allt", "Pilar för mapp, vred för talgrupp", "Endast siffertangenter"],
        answer: 2,
        explanation: "Pilarna förflyttar dig i mappstrukturen och vredet bland talgrupperna i vald mapp.",
      },
      {
        question: "Vem tilldelar normalt en insatstalgrupp?",
        options: ["Varje patrull själv", "RLC", "Terminalen automatiskt", "SOS vid alla händelser"],
        answer: 1,
        explanation: "RLC styr om och vilken insatstalgrupp som används vid polisiär insats.",
      },
    ],
    sources: ["Talgrupper.pdf", "Navigering talgrupper.pdf", "Byta talgrupp.pdf", "Indexnummer och indexering.pdf", "Mappen Egen.pdf"],
  },
  {
    id: "skanning",
    number: "05",
    title: "Skanning & normalpassning",
    short: "Hör rätt trafik",
    description: "Se till att rätt anrop når fram – utan att drunkna i radiotrafik.",
    duration: "15 min",
    outcome: "Du kan kontrollera normalpassning, läsa prioritet och felsöka uteblivna orderanrop.",
    accent: "teal",
    lessons: [
      {
        title: "Normalpassning är två saker",
        intro: "Normalpassning är grundläget för ordinarie tjänst.",
        points: [
          "Din ordinarie skanninglista på direktval 1 är displaylagd.",
          "Skanningen är aktiv och skanningssymbolen syns.",
          "Den interna talgruppen visas när ingen högre prioriterad talgrupp är aktiv.",
          "Om RLC sänder på en högprioriterad ordertalgrupp öppnar terminalen den automatiskt.",
        ],
        memory: "DV1 + aktiv skanning = normalpassning.",
      },
      {
        title: "Skanninglistan är ett paket",
        intro: "En skanninglista samlar de talgrupper du behöver för en viss tjänst eller plats.",
        points: [
          "Materialet anger minst två och högst tio talgrupper per lista.",
          "Interntalgruppen är normalt lågprioriterad och synlig i displayen.",
          "Ordertalgrupper ska vara högprioriterade och kan bryta intern trafik.",
          "Efter avslutad sändning finns sex sekunders nedkopplingstid innan terminalen återgår.",
        ],
      },
      {
        title: "Bakgrundsskanning kan inte väljas bort",
        intro: "Priotalgrupper skannas i bakgrunden även när den vanliga skanningen är av.",
        points: [
          "RLC kan nå terminaler med akut information via prio.",
          "Priotrafik bryter annan talgruppstrafik men inte ett aktivt individsamtal.",
          "Användaren kan inte ta bort priotalgruppen ur bakgrundsskanningen.",
        ],
      },
      {
        title: "Felsök uteblivna orderanrop",
        intro: "Det är ofta ett visnings- eller valproblem, inte ett terminalfel.",
        points: [
          "Kontrollera att mappnamnet visar SKAN – inte talgruppens ursprungsmapp.",
          "Kontrollera skanningssymbolen.",
          "Kontrollera att rätt skanninglista för tjänst och geografiskt område är vald.",
          "En enskild insatstalgrupp ger inte automatiskt ordertrafik från skanninglistan.",
        ],
      },
    ],
    quiz: [
      {
        question: "Vad ingår i normalpassning?",
        options: ["Insatsgrupp + DMO", "DV1-skanninglista + aktiv skanning", "RAPS + individsamtal", "Bara interntalgruppen"],
        answer: 1,
        explanation: "Normalpassning betyder ordinarie skanninglista på DV1 och aktiv skanning.",
      },
      {
        question: "Varför kan samma talgrupp ge olika räckvidd av information i displayen?",
        options: ["Indexet ändras", "Den kan ligga ensam eller ingå i en skanninglista", "Batteriet bestämmer", "RLC byter anropssignal"],
        answer: 1,
        explanation: "Talgruppen kan vara ensam eller vara den synliga talgruppen i en skanninglista som också skannar andra grupper.",
      },
      {
        question: "Kan du ta bort en priotalgrupp från bakgrundsskanningen?",
        options: ["Ja, via DV#", "Ja, om skanningen är av", "Nej", "Bara i DMO"],
        answer: 2,
        explanation: "Priotalgrupper är bakgrundsskannade och kan inte påverkas av användaren.",
      },
    ],
    sources: ["Skanning.pdf", "Skanninglistor.pdf", "Mappar och talgruppsträd HT2025.pdf", "Övningar Display Felsökning.pdf"],
  },
  {
    id: "anrop-status",
    number: "06",
    title: "Anrop, status & SDS",
    short: "Nå rätt mottagare",
    description: "Välj samtalstyp, nummertyp och meddelandeform utan onödiga omtag.",
    duration: "18 min",
    outcome: "Du kan välja grupp- eller individsamtal, rätt nummerikon och rätt väg till RLC.",
    accent: "orange",
    lessons: [
      {
        title: "Grupp eller individ?",
        intro: "Gruppsamtal är öppet för alla behöriga i talgruppen. Individsamtal binder två specifika terminaler.",
        points: [
          "Semiduplex startas och besvaras med PTT; bara en part sänder åt gången.",
          "Duplex startas och besvaras med grön lur och fungerar som ett telefonsamtal.",
          "Materialet rekommenderar semiduplex när det är lämpligt eftersom det belastar nätet mindre.",
          "Tala förbi terminalen eller håll den cirka 15 cm från munnen för att undvika överstyrning.",
        ],
      },
      {
        title: "MSISDN, ISSI och symbolerna",
        intro: "Nummer och symbol måste passa ihop, annars avvisas anropet eller meddelandet.",
        points: [
          "MSISDN är sju siffror: för polisen 1 + den sexsiffriga anropssignalen. Välj liggande radioikon.",
          "ISSI är terminalens unika individnummer, sex eller i vissa fall sju siffror. Välj stående radioikon.",
          "ISSI kan användas för individsamtal i direktläge.",
          "ITSI används vid internationellt individanrop och kräver särskild korrekt uppbyggnad.",
        ],
        memory: "Liggande = MSISDN. Stående = ISSI.",
      },
      {
        title: "Två sätt att kalla på RLC",
        intro: "Anropsbegäran och förtursbegäran har olika prioritet och geografisk logik.",
        points: [
          "Långt A eller direktval 2 skickar anropsbegäran till ditt hemma-RLC.",
          "Långt på förtursknappen skickar en prioriterad begäran till geografiskt närmaste RLC.",
          "Förtursbegäran besvaras med individsamtal.",
          "Vid feltryck ska du följa rutinen och snabbt identifiera terminalen och uppge att det var feltryck.",
        ],
        caution: "När du befinner dig i annan region når vanlig anropsbegäran fortfarande hemma-RLC. Använd aktuell regions RLC-talgrupp och långt grön lur för att nå det RLC:t.",
      },
      {
        title: "Status och SDS",
        intro: "Status är ett fördefinierat datameddelande. SDS är ett textmeddelande.",
        points: [
          "Skicka status när mottagaren inte behöver ställa följdfrågor. Annars: anropsbegäran.",
          "Vanliga statusar är Klar ledig, Påbörjat uppdrag, Hämta HR och HR avslutad.",
          "Påbörjat uppdrag ska registreras när arbetet börjar eller patrullen är framme.",
          "SDS kräver rätt nummer och rätt nummerikon. Textläge växlas med * på terminalen.",
        ],
      },
    ],
    quiz: [
      {
        question: "Vilken kombination är korrekt för ett MSISDN?",
        options: ["6 siffror + stående radio", "7 siffror + liggande radio", "7 siffror + jordglob", "3 siffror + grön lur"],
        answer: 1,
        explanation: "Polisens MSISDN är 1 + anropssignalen, totalt sju siffror, och använder liggande radioikon.",
      },
      {
        question: "Var hamnar anropsbegäran via långt A eller DV2?",
        options: ["Närmaste RLC", "Hemmaregionens RLC", "NLC direkt", "SOS"],
        answer: 1,
        explanation: "Den går till hemma-RLC oavsett geografisk plats.",
      },
      {
        question: "När är status bäst?",
        options: ["När RLC behöver följdfrågor", "När en kort fördefinierad åtgärd räcker", "Bara i DMO", "Alltid i stället för tal"],
        answer: 1,
        explanation: "Status passar när informationen är entydig och inte kräver följdfrågor.",
      },
    ],
    sources: ["Samtalstyper.pdf", "Individsamtal.pdf", "Status.pdf", "Meddelande SDS.pdf", "Förtursbegäran.pdf"],
  },
  {
    id: "radiodisciplin",
    number: "07",
    title: "Tala tydligt",
    short: "Radiodisciplin",
    description: "Gör varje sändning kort, entydig och lätt att dokumentera.",
    duration: "17 min",
    outcome: "Du kan välja rätt trafikuttryck, bygga ett tydligt anrop och bokstavera utan att blanda alfabet.",
    accent: "lime",
    lessons: [
      {
        title: "Tänk – tryck – tala",
        intro: "Bra radiotrafik börjar innan PTT trycks in.",
        points: [
          "Tänk igenom budskapet och lyssna så talgruppen är ledig.",
          "Tryck PTT, vänta på kopplingstonen och tala sedan tydligt.",
          "Håll PTT inne tills du sagt ditt avslutande trafikuttryck.",
          "En sändning kan bara höras i ungefär en minut enligt materialet; släpp och tryck igen vid behov.",
        ],
      },
      {
        title: "Nio trafikuttryck",
        intro: "Minnesordet SMURFF KKV samlar uttrycken.",
        points: [
          "Slut kom · Mittåt/fel · Uppfattat · Repetera · Förtur · Från.",
          "Klart slut · Kom · Vänta.",
          "Kom betyder att du väntar dig svar eller fortsättning.",
          "Repetera kan preciseras: be bara om adressen eller numret du missade.",
        ],
        memory: "SMURFF KKV.",
      },
      {
        title: "Vem äger samtalet?",
        intro: "Rätt slututtryck beror på vem som initierade samtalet och vem du talar med.",
        points: [
          "När RLC initierat samtalet svarar patrullen med KOM. RLC avslutar med KLART SLUT.",
          "När patrullen initierat samtalet med RLC och inte har mer att säga avslutar patrullen med SLUT KOM.",
          "Mellan patruller avslutar den som initierade hela samtalet med KLART SLUT.",
          "Anmälan på en tilldelad insatstalgrupp avslutas med KOM eftersom RLC initierat bytet.",
        ],
      },
      {
        title: "Anropssignal och bokstavering",
        intro: "Hela anropssignalen och tydlig bokstavering minskar risken för fel i händelserapporten.",
        points: [
          "Använd hela den sexsiffriga anropssignalen i radiotrafik.",
          "Bokstavera registreringsnummer och ange om möjligt färg och fabrikat.",
          "Välj nationellt eller internationellt alfabet – blanda inte i samma bokstavering.",
          "Dela upp för- och efternamn och ta ett ID eller registreringsnummer i taget.",
        ],
      },
    ],
    quiz: [
      {
        question: "RLC har initierat ett orderanrop. Vad avslutar patrullen sin sändning med?",
        options: ["Klart slut", "Slut kom", "Kom", "Vänta"],
        answer: 2,
        explanation: "När operatören initierat samtalet svarar patrullen med KOM.",
      },
      {
        question: "Du initierade ett samtal med RLC och har inget mer att tillföra. Vad säger du?",
        options: ["Slut kom", "Klart slut", "Förtur", "Uppfattat"],
        answer: 0,
        explanation: "Patrullen signalerar att den är färdig med SLUT KOM; RLC avslutar med KLART SLUT.",
      },
      {
        question: "Vad gäller för bokstaveringsalfabet?",
        options: ["Blanda fritt", "Använd bara internationellt", "Välj ett alfabet och blanda inte", "Bokstavera aldrig registreringsnummer"],
        answer: 2,
        explanation: "Nationellt eller internationellt går bra enligt materialet, men alfabeten ska inte blandas.",
      },
    ],
    sources: ["Trafikuttryck.pdf", "Trafikuttryck - SMURFF KKV.pdf", "Bokstavering.pdf", "Tips vid radiosamtal.pdf", "Avslutande trafikuttryck och övning.pdf"],
  },
  {
    id: "rlc-flode",
    number: "08",
    title: "RLC & händelseflödet",
    short: "Från order till avslut",
    description: "Förstå varför status, lägesbild och avrapportering måste komma i rätt ordning.",
    duration: "16 min",
    outcome: "Du kan beskriva informationsflödet mellan patrull, RLC, STORM och händelserapport.",
    accent: "blue",
    lessons: [
      {
        title: "RLC leder och stödjer",
        intro: "RLC prioriterar händelser, beordrar resurser och dokumenterar den händelsestyrda verksamheten.",
        points: [
          "Operatörer tar emot information, skapar HR och håller den uppdaterad.",
          "STORM visar resurser, patrullstatus och händelserapporter.",
          "Prioriteten styr RLC:s tid för resurssättning – inte hur fort patrullen får köra.",
          "Korrekt status gör att RLC kan leda utan onödig radiotrafik.",
        ],
      },
      {
        title: "Från ordertalgrupp till insatstalgrupp",
        intro: "Ordertalgruppen används för att beordra. En insatstalgrupp samlar kommunikationen i själva händelsen.",
        points: [
          "Lyssna klart på ordern och kvittera med hela anropssignalen.",
          "Byt till tilldelad insatstalgrupp och anmäl dig med KOM.",
          "Skicka eller säg Påbörjat uppdrag när arbetet faktiskt börjar.",
          "Håll RLC informerat om förändringar i risk, resurser och läge.",
        ],
      },
      {
        title: "Vindruterapporten",
        intro: "Första enheten ger en snabb lägesbild av det som syns vid ankomst.",
        points: [
          "Plats, omfattning och typ av händelse.",
          "Risker och hot samt lämplig körväg in.",
          "Antal skadade och behov av extra resurser.",
          "Nödvändig kompletterande information – kort och prioriterad.",
        ],
        memory: "Plats – händelse – risk – väg in – skadade – resurser.",
      },
      {
        title: "Avrapportera så HR blir användbar",
        intro: "RLC behöver både vad som hänt och vad som händer härnäst.",
        points: [
          "Händelseförlopp, möjlig brottsrubricering och identifierade personer eller avsaknad av ID.",
          "Fordon, registreringsnummer, tvångsmedel och eventuella skador.",
          "Vilka handlingar som upprättas och om information delats i annan kanal.",
          "Nästa steg: station, sjukhus, förhör, film, transport eller annat.",
        ],
      },
    ],
    quiz: [
      {
        question: "Vad styr en HR-prioritet enligt materialet?",
        options: ["Patrullens tillåtna hastighet", "RLC:s tid för resurssättning", "Vilken terminal som används", "Om SDS får skickas"],
        answer: 1,
        explanation: "Prioriteten hjälper RLC att prioritera resurssättning; föraren ansvarar alltid för hastigheten.",
      },
      {
        question: "När ska Påbörjat uppdrag registreras?",
        options: ["När passet börjar", "När arbetet på ärendet börjar eller patrullen anländer", "Efter avrapportering", "Bara vid RAPS"],
        answer: 1,
        explanation: "Statusen tidsstämplar när patrullen påbörjar arbetet eller är framme.",
      },
      {
        question: "Vilken uppgift hör hemma i en vindruterapport?",
        options: ["Fullständig förundersökning", "Risker och behov av resurser", "PIN-kod", "Personlig arbetsplan"],
        answer: 1,
        explanation: "Vindruterapporten ger en snabb lägesbild med risker, skadade, körväg och resursbehov.",
      },
    ],
    sources: ["RLC Canvas.pdf", "Påbörjat uppdrag.pdf", "Vindruterapport.pdf", "Avrapportering kort.pdf", "Status.pdf"],
  },
  {
    id: "geografi",
    number: "09",
    title: "Geografi & samverkan",
    short: "Rätt samband på rätt plats",
    description: "Behåll rätt RLC, skanninglista och samverkansyta när du förflyttar dig.",
    duration: "15 min",
    outcome: "Du kan anpassa samband vid arbete i annat område eller annan region och använda RAPS korrekt.",
    accent: "teal",
    lessons: [
      {
        title: "Regionerna ger en gemensam struktur",
        intro: "Polisen har sju geografiska regioner. NOA verkar nationellt och utbildningsmiljön har egna övningsanrop.",
        points: [
          "RLC:s anropssignal följer regionnumret: Nord 1-0, Mitt 2-0, Stockholm 3-0, Öst 4-0, Väst 5-0, Syd 6-0 och Bergslagen 7-0.",
          "NLC har anropssignal 8-0.",
          "Rakelregioner och polisregioner överlappar inte helt; Mitt och Bergslagen ligger i samma Rakelregion.",
          "Utbildningens anropssignaler och kartor är övningsstruktur och ska inte blandas med skarp geografi.",
        ],
      },
      {
        title: "Tillfälligt arbete i annat område",
        intro: "Din normala skanninglista är byggd för hemområdet och behöver bytas när uppdraget flyttar.",
        points: [
          "Välj skanninglistan för det PO, RO eller LPO där du faktiskt arbetar.",
          "Då får du rätt intern- och ordertalgrupper för området.",
          "När du återvänder byter du tillbaka till ordinarie normalpassning.",
        ],
      },
      {
        title: "Arbete i annan region",
        intro: "Anropsbegäran via A eller DV2 fortsätter gå till hemma-RLC.",
        points: [
          "Displaylägg den aktuella regionens RLC-talgrupp och gör långt tryck på grön lur för anropsbegäran dit.",
          "RLC-talgruppernas nationella index följer RLC:s anropssignal.",
          "Meddela när du lämnar regionen och välj rätt skanninglista när du kör in i nästa område.",
          "Förtursbegäran går geografiskt till närmaste RLC.",
        ],
      },
      {
        title: "RAPS och organisationstillhörighet",
        intro: "RAPS används av räddningstjänst, ambulans, polis och SOS Alarm.",
        points: [
          "SOS tilldelar och leder RAPS-talgruppen.",
          "Presentera organisation före anropssignal när du går in på samverkanstalgruppen.",
          "Skicka ändå Påbörjat uppdrag till RLC när du kommer till händelsen; RLC lyssnar inte automatiskt på RAPS.",
          "Behov av polisiär intern ledning kan kräva en separat insatstalgrupp.",
        ],
      },
    ],
    quiz: [
      {
        question: "Du arbetar tillfälligt i ett annat polisområde inom regionen. Vad är huvudåtgärden?",
        options: ["Behåll alltid hemområdets DV1", "Välj områdets skanninglista", "Gå till DMO", "Stäng skanningen"],
        answer: 1,
        explanation: "Rätt områdesskanninglista ger dig aktuella intern- och ordertalgrupper.",
      },
      {
        question: "Hur skickar du anropsbegäran till ett annat RLC än hemma-RLC?",
        options: ["DV2", "Långt A", "Displaylägg RLC-talgruppen och håll grön lur", "Skicka status 16"],
        answer: 2,
        explanation: "Vanlig A/DV2 går hem. Aktuell RLC-talgrupp + långt grön lur riktar begäran till den regionen.",
      },
      {
        question: "Vem tilldelar normalt en RAPS-talgrupp?",
        options: ["Patrullen", "RLC", "SOS Alarm", "MSB:s tekniker"],
        answer: 2,
        explanation: "SOS Alarm tilldelar och leder RAPS.",
      },
    ],
    sources: ["Geografisk förflyttning.pdf", "Polisregionerna.pdf", "Regioner och anrop till RLC.pdf", "Rakelzoner och polisens regioner.pdf", "Samband PU - Sverige.pdf"],
  },
  {
    id: "scenario",
    number: "10",
    title: "Scenario & felsökning",
    short: "Omsätt allt i handling",
    description: "Träna hela sambandskedjan och lös vanliga terminalproblem metodiskt.",
    duration: "20 min",
    outcome: "Du kan prioritera samband vid en trafikolycka och lösa vanliga fel utan chansning.",
    accent: "orange",
    lessons: [
      {
        title: "På väg till trafikolyckan",
        intro: "Förbered samband och lägesbild innan du kommer fram.",
        points: [
          "Ta in RLC:s information: vad har hänt, vilka finns på plats och vilken väg är lämplig?",
          "Kontrollera tilldelad RAPS och om polisiär insatstalgrupp behövs.",
          "Lyssna på samverkansinformationen och bygg en mental plan.",
        ],
      },
      {
        title: "På plats",
        intro: "Gör det viktigaste i rätt ordning och håll två informationsflöden isär.",
        points: [
          "Skicka Påbörjat uppdrag till RLC.",
          "Lämna vindruterapport: trafikläge, skadeläge, risker, körväg in och resursbehov.",
          "Håll RLC fortlöpande informerat även när samverkan sker på RAPS.",
          "Knyt personer till fordon och dokumentera bärgning, skador och vart avförda personer förs.",
        ],
      },
      {
        title: "Avsluta utan informationsluckor",
        intro: "Sambandet är klart först när mottagaren vet både nuläge och nästa steg.",
        points: [
          "Meddela att ni lämnar platsen och i vilket skick den lämnas.",
          "Ange fordon och personer, skador, sjukhus, bärgning och skador på annans egendom.",
          "Beskriv vad som ska avrapporteras och var fortsatt arbete sker.",
        ],
      },
      {
        title: "Felsök från displayen utåt",
        intro: "De flesta övningsfel kan lösas genom att läsa symbol, mapp, profil, nummer och driftsätt.",
        points: [
          "Inget orderanrop: kontrollera SKAN-mapp, rätt lista och aktiv skanning.",
          "Nästan inget ljud: kontrollera ljudväg och profil.",
          "SDS eller individsamtal avvisas: kontrollera antal siffror och nummerikon.",
          "Nyprogrammerad terminal visar tomt: displaylägg talgrupp i nätläge och kontrollera även direktläge.",
          "Skanninglista kan inte tömmas: displaylägg något annat innan den aktiva listan redigeras.",
        ],
        memory: "Display – mapp – profil – nummer – driftsätt.",
      },
    ],
    quiz: [
      {
        question: "Du hör inte orderanrop men kollegan gör det. Vad kontrollerar du först?",
        options: ["PIN-koden", "SKAN-mapp och skanningssymbol", "Bokstaveringsalfabet", "NFO-prefix"],
        answer: 1,
        explanation: "En ensam talgrupp eller avstängd skanning är en vanlig orsak till uteblivna orderanrop.",
      },
      {
        question: "Vad ska ske på RLC-sidan när du anländer till trafikolyckan?",
        options: ["Inget om RAPS används", "Påbörjat uppdrag ska registreras", "DV0 ska aktiveras", "Alla går till DMO"],
        answer: 1,
        explanation: "Påbörjat uppdrag ska nå RLC även om samverkan pågår på RAPS.",
      },
      {
        question: "Ett SDS till ett sexsiffrigt ISSI avvisas. Vad är en sannolik orsak?",
        options: ["Liggande radioikon är vald", "Skanningen är aktiv", "Batteriet är fullt", "Talgruppen har index"],
        answer: 0,
        explanation: "ISSI ska kombineras med stående radioikon. Liggande ikon hör till MSISDN.",
      },
    ],
    sources: ["Trafikolycka sammanfattning.pdf", "Övningar Display Felsökning.pdf", "Övningar display och funktion.pdf", "Vindruterapport.pdf", "Avrapportering kort.pdf"],
  },
];

export const radioScenarios = [
  {
    prompt: "RLC öppnar ordertalgruppen och beordrar din patrull. Du kvitterar och väntar på fortsättning.",
    options: ["KOM", "SLUT KOM", "KLART SLUT"],
    answer: 0,
    note: "RLC initierade samtalet. Patrullen avslutar sin sändning med KOM.",
  },
  {
    prompt: "Du initierade ett individsamtal med RLC, har avrapporterat och har inget mer att tillägga.",
    options: ["KOM", "SLUT KOM", "KLART SLUT"],
    answer: 1,
    note: "Du signalerar att du är färdig med SLUT KOM. RLC avslutar hela samtalet.",
  },
  {
    prompt: "Du ropade upp en annan patrull, fick svaret du behövde och vill avsluta hela samtalet.",
    options: ["KOM", "SLUT KOM", "KLART SLUT"],
    answer: 2,
    note: "Mellan patruller är det den initierande parten som avslutar med KLART SLUT.",
  },
  {
    prompt: "Du uppfattade inte gatunumret och vill bara höra just det igen.",
    options: ["VÄNTA", "REPETERA", "MITTÅT/FEL"],
    answer: 1,
    note: "Säg REPETERA och precisera den uppgift du behöver höra igen.",
  },
  {
    prompt: "Du säger fel husnummer och korrigerar dig direkt.",
    options: ["UPPFATTAT", "FÖRTUR", "MITTÅT/FEL"],
    answer: 2,
    note: "MITTÅT/FEL används när du korrigerar din egen felsägning.",
  },
];

export const sourceDocuments = [
  "Anropssignaler, nummerplan.pdf", "Att skriva text på terminalerna.pdf", "Avrapportering kort.pdf", "Bokstavering.pdf",
  "Bokstavering Nationella.pdf", "Bokstavering Internationell.pdf", "Byta talgrupp.pdf", "Driftsätt.pdf",
  "Displaybilder Driftsätt.pdf", "Direktval programmering.pdf", "Direktval.pdf", "Fordonsterminal Kort.pdf",
  "Fordonsterminal lång.pdf", "Förbindelseprov.pdf", "Förtursbegäran.pdf", "Geografisk förflyttning.pdf",
  "Gateway.pdf", "Gateway KORT.pdf", "Indexnummer och indexering.pdf", "Individsamtal.pdf", "Inför aspiranten.pdf",
  "ISSI.pdf", "Knappologi.pdf", "knappologi och display.pdf", "Kontakter.pdf", "Kunskapsbanken SC21.pptx",
  "Kunskapsbanken STP9000.pptx", "Mappar och talgruppsträd HT2025.pdf", "Mappen Egen.pdf", "Meddelande SDS.pdf",
  "Menyn.pdf", "Navigering talgrupper.pdf", "NFO NY.pdf", "Polisregionerna.pdf", "Polman.pdf", "Påbörjat uppdrag.pdf",
  "Rakel ABC.pdf", "RAKEL och Tetra.pdf", "Rakelzoner och polisens regioner.pdf", "Regioner och anrop till RLC.pdf",
  "Regler hantering av terminaler.pdf", "RLC Canvas.pdf", "Samband PU - Sverige.pdf", "Samband PU och reg MPU.pdf",
  "Samtalstyper.pdf", "Skanning.pdf", "Skanninglistor.pdf", "Smartmeny.pdf", "Status.pdf", "Symboler.pdf",
  "Talgrupper.pdf", "Talgrupper, navigera bland mappar och talgrupper.pdf", "Talgruppsträd 2024.pdf",
  "Terminaler STP9000 och HBC.pdf", "Tips vid radiosamtal.pdf", "TITAN.pdf", "Trafikolycka sammanfattning.pdf",
  "Trafikuttryck.pdf", "Trafikuttryck - SMURFF KKV.pdf", "Trafikuttryck, avslutande trafikuttryck och övning.pdf",
  "Vindruterapport.pdf", "Övningar Display Felsökning.pdf", "Övningar display och funktion.pdf",
];

export const quickCards = [
  ["TMO", "Nätläge via Rakels basnät"],
  ["DMO", "Direktläge terminal till terminal"],
  ["RAPS", "Räddning · Ambulans · Polis · SOS"],
  ["ISSI", "Terminalens unika individnummer"],
  ["MSISDN", "1 + polisens anropssignal, sju siffror"],
  ["DV1", "Ordinarie skanninglista / normalpassning"],
  ["DV2", "Anropsbegäran till hemma-RLC"],
  ["DV8", "Byt driftsätt"],
  ["DV#", "Smartmeny"],
  ["PTT", "Push to talk – håll inne när du sänder"],
  ["SDS", "Textmeddelande i Rakel"],
  ["HR", "Händelserapport"],
];
