export type ImageHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  explanation: string;
};

export type ImageFrame = {
  id: string;
  image: string;
  alt: string;
  caption: string;
  hotspots: ImageHotspot[];
};

export type ImageQuestion = {
  prompt: string;
  frameId: string;
  answerHotspot: string;
  correct: string;
  retry: string;
};

export type ImageSupportUnit = {
  id: string;
  tab: string;
  number: string;
  title: string;
  intro: string;
  source: string;
  frames: ImageFrame[];
  questions: ImageQuestion[];
};

export const imageSupportUnits: ImageSupportUnit[] = [
  {
    id: "sc21-controls",
    tab: "SC21",
    number: "01",
    title: "Hitta rätt på SC21",
    intro: "Börja med helheten. Klicka på markeringarna för att koppla terminalens reglage till deras praktiska funktion.",
    source: "knappologi och display-1.pdf · s. 4, 12, 14 och 16",
    frames: [
      {
        id: "sc21-overview",
        image: "source-images/sc21-overview.jpg",
        alt: "Sepura SC21 sedd framifrån mot vit bakgrund",
        caption: "Översiktsbild ur originalmaterialet. Markeringarna och förklaringarna är tillagda i lärplattformen.",
        hotspots: [
          { id: "knob", label: "Vred", x: 25, y: 25, explanation: "Navigeringsratt och volymvred. I talgruppsmappar används vredet för att bläddra mellan talgrupper." },
          { id: "priority", label: "Förtur", x: 51, y: 28, explanation: "Förtursknappen används för att begära prioritet enligt gällande rutin." },
          { id: "display", label: "Display", x: 51, y: 48, explanation: "Displayen visar bland annat talgrupp, index, hemmamapp eller skanningslista samt nät- och batteristatus." },
          { id: "ptt", label: "PTT", x: 19, y: 46, explanation: "PTT betyder Push To Talk. Tryck, invänta talton och tala; släpp för att lyssna." },
          { id: "softkeys", label: "Valknappar", x: 50, y: 68, explanation: "Vänster, mitt- och höger valknapp får sin aktuella funktion av texten längst ned i displayen." },
          { id: "arrows", label: "Navigeringspilar", x: 50, y: 74, explanation: "Pilarna används i menyer och för att flytta mellan mappar och mappnivåer." },
        ],
      },
    ],
    questions: [
      { prompt: "Klicka på kontrollen som du använder för att flytta mellan mappar och mappnivåer.", frameId: "sc21-overview", answerHotspot: "arrows", correct: "Rätt. Pilarna flyttar mellan mappar; vredet byter talgrupp inne i en mapp.", retry: "Inte den här gången. Leta efter gruppen med fyra riktningspilar under valknapparna." },
      { prompt: "Var sitter PTT-knappen?", frameId: "sc21-overview", answerHotspot: "ptt", correct: "Rätt. PTT sitter på terminalens sida och hålls inne under sändning.", retry: "Försök igen. PTT är en sidoknapp, inte en av knapparna på framsidan." },
    ],
  },
  {
    id: "sc21-display",
    tab: "Display",
    number: "02",
    title: "Läs displayen uppifrån och ned",
    intro: "Displayen ger en snabb lägesbild. Kontrollera rätt talgrupp och mapp innan du sänder, och använd symbolraden för driftstatus.",
    source: "knappologi och display-1.pdf · s. 5–6",
    frames: [
      {
        id: "display-overview",
        image: "source-images/sc21-display.png",
        alt: "Närbild av SC21-display med Rakel-status, talgrupp och mapp",
        caption: "Displayutsnitt ur originalmaterialet. Talgrupps- och indexnamn är utbildningsexempel.",
        hotspots: [
          { id: "scan", label: "Skanning", x: 8, y: 4, explanation: "Symbolen visar om skanning är på eller av." },
          { id: "battery", label: "Batteri", x: 74, y: 4, explanation: "Batterisymbolen visar återstående batterinivå." },
          { id: "network", label: "Nätstatus", x: 86, y: 4, explanation: "Nätstatus visar terminalens anslutning till Rakelnätet." },
          { id: "signal", label: "Signal", x: 96, y: 4, explanation: "Staplarna visar signalstyrkan." },
          { id: "talkgroup", label: "Talgrupp", x: 45, y: 47, explanation: "Den fetstilta raden är den talgrupp som för närvarande är displaylagd." },
          { id: "index", label: "Index", x: 45, y: 53, explanation: "Indexnumret är talgruppens numeriska identifierare och kan användas som genväg när funktionen är tillgänglig." },
          { id: "folder", label: "Hemmamapp / lista", x: 47, y: 62, explanation: "Mappikonen och namnet visar talgruppens hemmamapp eller den aktiva skanningslistan." },
        ],
      },
    ],
    questions: [
      { prompt: "Klicka på raden som visar vilken talgrupp som är displaylagd.", frameId: "display-overview", answerHotspot: "talkgroup", correct: "Rätt. Den fetstilta talgruppsraden är den första kontrollen före sändning.", retry: "Inte riktigt. Talgruppen står med fet stil ovanför indexnumret." },
      { prompt: "Var ser du talgruppens numeriska identifierare?", frameId: "display-overview", answerHotspot: "index", correct: "Rätt. Indexnumret står direkt under den displaylagda talgruppen.", retry: "Leta på raden direkt under talgruppens namn." },
    ],
  },
  {
    id: "polman",
    tab: "Polman",
    number: "03",
    title: "Polman – fysisk kontroll och Rakelvy",
    intro: "Polman kombinerar sju fysiska knappar med touchknappar. De fysiska knapparna kan användas även om skärmen skulle bli svart.",
    source: "Polman.pdf · s. 4–6 och 10",
    frames: [
      {
        id: "polman-overview",
        image: "source-images/polman-rakel.jpg",
        alt: "Polman-panel med fysiska knappar, touchknappar och öppen Rakelvy",
        caption: "Rakelvyn ur originalmaterialet. Utsnitt med telefon- och terminalnummer har inte använts.",
        hotspots: [
          { id: "physical", label: "Fysiska knappar", x: 46, y: 8, explanation: "Den övre raden innehåller sju fysiska knappar. De fungerar även om skärmen är svart." },
          { id: "priority", label: "Förtursanrop", x: 92, y: 8, explanation: "Den orange knappen längst upp till höger används för förtursanrop." },
          { id: "rakel-window", label: "Rakelvy", x: 36, y: 49, explanation: "Här visas Rakelinformationen: talgrupp, mapp, index och statusfält." },
          { id: "ptt", label: "PTT", x: 18, y: 50, explanation: "Touchknappen PTT används för att sända från Polman-panelen." },
          { id: "navigation", label: "Navigering", x: 39, y: 70, explanation: "Pilfältet används för att navigera i den speglade Rakelvyn." },
          { id: "touch", label: "Touchknappar", x: 68, y: 54, explanation: "De blå knapparna i skärmen är touchknappar. En vald funktion markeras med belyst utseende och ljusblå ram." },
          { id: "rakel-button", label: "Öppna Rakel", x: 92, y: 29, explanation: "Touchknappen öppnar Rakelfönstret på Polman-panelen." },
        ],
      },
    ],
    questions: [
      { prompt: "Vilken markerad knapp används för förtursanrop?", frameId: "polman-overview", answerHotspot: "priority", correct: "Rätt. Förtursknappen är den orange fysiska knappen längst upp till höger.", retry: "Inte riktigt. Leta bland de fysiska knapparna högst upp och välj den orange knappen." },
      { prompt: "Var ser du den speglade Rakelinformationen?", frameId: "polman-overview", answerHotspot: "rakel-window", correct: "Rätt. Rakelvyn ligger i den vänstra delen av touchskärmen.", retry: "Leta efter den ljusa terminaldisplayen med talgrupp, mapp och index." },
      { prompt: "Var navigerar du i den öppna Rakelvyn?", frameId: "polman-overview", answerHotspot: "navigation", correct: "Rätt. Pilfältet under Rakelvyn används för navigering.", retry: "Leta efter de fyra grå riktningspilarna under Rakeldisplayen." },
    ],
  },
  {
    id: "navigation",
    tab: "Navigering",
    number: "04",
    title: "Följ vägen genom mapparna",
    intro: "Pilarna flyttar mellan mappar och nivåer. När vredsymbolen visas använder du vredet för att bläddra mellan talgrupper i den valda mappen.",
    source: "Navigering talgrupper.pdf · s. 2–4",
    frames: [
      {
        id: "nav-root",
        image: "source-images/navigation-root.jpg",
        alt: "SC21-display i dialogen Välj talgrupp med huvudmappen SKAN",
        caption: "Steg 1 · Läs nivåindikatorn och mappens namn.",
        hotspots: [
          { id: "level", label: "Nivåpil", x: 8, y: 61, explanation: "Pil upp eller ned i den lilla rutan visar att det finns en över- eller undermapp." },
          { id: "folder", label: "Mappnamn", x: 67, y: 61, explanation: "Här står den mapp som är vald på den aktuella nivån." },
          { id: "sibling", label: "Samma nivå", x: 94, y: 61, explanation: "Höger- och vänsterpil visar att det finns fler mappar på samma nivå." },
        ],
      },
      {
        id: "nav-child",
        image: "source-images/navigation-child.png",
        alt: "SC21-display med undermappen SKAN IGV PO1 MPU vald",
        caption: "Steg 2 · Pil ned går till undermapp; vänster och höger bläddrar på samma nivå.",
        hotspots: [
          { id: "depth", label: "Nivå 2", x: 8, y: 62, explanation: "Siffran visar att du befinner dig på den andra nivån i mappträdet." },
          { id: "selected-folder", label: "Undermapp", x: 59, y: 62, explanation: "Den valda undermappen visas i mappfältet längst ned." },
          { id: "next-folder", label: "Nästa mapp", x: 94, y: 62, explanation: "Högerpil bläddrar till nästa mapp på samma nivå." },
        ],
      },
      {
        id: "nav-talkgroup",
        image: "source-images/navigation-talkgroup.jpg",
        alt: "SC21-display med talgruppen MPU PO1 i vald mapp",
        caption: "Steg 3 · Vredsymbolen visar att du kan bläddra mellan talgrupperna.",
        hotspots: [
          { id: "knob-symbol", label: "Vredsymbol", x: 8, y: 60, explanation: "När vredsymbolen visas kan du använda vredet för att bläddra mellan talgrupper i mappen." },
          { id: "current-group", label: "Talgrupp", x: 43, y: 48, explanation: "Den aktuella talgruppen visas i listans mittrad." },
          { id: "current-folder", label: "Aktuell mapp", x: 57, y: 60, explanation: "Mappfältet längst ned visar var i trädet talgruppen ligger." },
        ],
      },
    ],
    questions: [
      { prompt: "Du ska ned till en undermapp. Klicka på tecknet som visar att en lägre nivå finns.", frameId: "nav-root", answerHotspot: "level", correct: "Rätt. Nivåpilen visar att du kan gå upp eller ned i mappträdet.", retry: "Försök igen. Titta i den lilla rutan längst ned till vänster." },
      { prompt: "Du är i rätt mapp och ska byta talgrupp. Klicka på symbolen som visar vilket reglage du ska använda.", frameId: "nav-talkgroup", answerHotspot: "knob-symbol", correct: "Rätt. Vredsymbolen betyder att vredet bläddrar mellan talgrupperna i mappen.", retry: "Leta längst ned till vänster efter den lilla vredsymbolen." },
    ],
  },
];
