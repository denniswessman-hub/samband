export type AlphabetEntry = { character: string; word: string };

export const callsignParts = [
  { value: "1", label: "Myndighet / användarorganisation", explanation: "Prefixet visar myndighet eller användarorganisation." },
  { value: "6", label: "Rakelregion", explanation: "Regionsiffran visar vilken Rakelregion anropssignalen hör till." },
  { value: "5", label: "Polisområde / handterminal", explanation: "Positionen används för polisområde eller för att ange handterminal enligt nummerplanen." },
  { value: "1", label: "Lokalpolisområde / funktion", explanation: "Den första siffran efter bindestrecket pekar ut lokalpolisområde eller funktion." },
  { value: "1", label: "Typ av fordon / funktion", explanation: "Nästa siffra beskriver typ av fordon eller funktion." },
  { value: "10", label: "Löpnummer / lokal variation", explanation: "De avslutande siffrorna skiljer enheten från andra eller används för lokal variation." },
] as const;

export const nationalAlphabet: AlphabetEntry[] = [
  { character: "A", word: "Adam" }, { character: "B", word: "Bertil" }, { character: "C", word: "Cesar" },
  { character: "D", word: "David" }, { character: "E", word: "Erik" }, { character: "F", word: "Filip" },
  { character: "G", word: "Gustav" }, { character: "H", word: "Helge" }, { character: "I", word: "Ivar" },
  { character: "J", word: "Johan" }, { character: "K", word: "Kalle" }, { character: "L", word: "Ludvig" },
  { character: "M", word: "Martin" }, { character: "N", word: "Niklas" }, { character: "O", word: "Olof" },
  { character: "P", word: "Petter" }, { character: "Q", word: "Qvintus" }, { character: "R", word: "Rudolf" },
  { character: "S", word: "Sigurd" }, { character: "T", word: "Tore" }, { character: "U", word: "Urban" },
  { character: "V", word: "Viktor" }, { character: "W", word: "Wilhelm" }, { character: "X", word: "Xerxes" },
  { character: "Y", word: "Yngve" }, { character: "Z", word: "Zäta" }, { character: "Å", word: "Åke" },
  { character: "Ä", word: "Ärlig" }, { character: "Ö", word: "Östen" },
];

export const internationalAlphabet: AlphabetEntry[] = [
  { character: "A", word: "Alpha" }, { character: "B", word: "Bravo" }, { character: "C", word: "Charlie" },
  { character: "D", word: "Delta" }, { character: "E", word: "Echo" }, { character: "F", word: "Foxtrot" },
  { character: "G", word: "Golf" }, { character: "H", word: "Hotel" }, { character: "I", word: "India" },
  { character: "J", word: "Juliet" }, { character: "K", word: "Kilo" }, { character: "L", word: "Lima" },
  { character: "M", word: "Mike" }, { character: "N", word: "November" }, { character: "O", word: "Oscar" },
  { character: "P", word: "Papa" }, { character: "Q", word: "Quebec" }, { character: "R", word: "Romeo" },
  { character: "S", word: "Sierra" }, { character: "T", word: "Tango" }, { character: "U", word: "Uniform" },
  { character: "V", word: "Victor" }, { character: "W", word: "Whiskey" }, { character: "X", word: "X-ray" },
  { character: "Y", word: "Yankee" }, { character: "Z", word: "Zulu" }, { character: "Å", word: "Alpha Alpha" },
  { character: "Ä", word: "Alpha Echo" }, { character: "Ö", word: "Oscar Echo" },
];

export const nationalDigits: AlphabetEntry[] = [
  { character: "0", word: "Nolla" }, { character: "1", word: "Ett" }, { character: "2", word: "Tvåa" },
  { character: "3", word: "Trea" }, { character: "4", word: "Fyra" }, { character: "5", word: "Femma" },
  { character: "6", word: "Sexa" }, { character: "7", word: "Sju" }, { character: "8", word: "Åtta" },
  { character: "9", word: "Nia" },
];

export const internationalDigits: AlphabetEntry[] = [
  { character: "0", word: "Zero" }, { character: "1", word: "One" }, { character: "2", word: "Two" },
  { character: "3", word: "Three" }, { character: "4", word: "Four" }, { character: "5", word: "Five" },
  { character: "6", word: "Six" }, { character: "7", word: "Seven" }, { character: "8", word: "Eight" },
  { character: "9", word: "Nine" },
];

export const spellingRules = [
  "Välj nationellt eller internationellt bokstaveringsalfabet och håll dig till samma alfabet. Siffror sägs alltid på svenska i svensk radiotrafik.",
  "Registreringsnummer bokstaveras alltid. Ange även fabrikat och färg när du känner till dem.",
  "När en person har svenskt personnummer och de fyra sista siffrorna kan lämnas behöver namnet inte bokstaveras. Säg personnumret och namnet muntligt.",
  "Namn på utländska medborgare bokstaveras alltid. Börja med födelsetid och bokstavera sedan för- och efternamn var för sig.",
] as const;

export const reportChecklist = [
  "Besvara RLC:s anrop med anropssignal och plats eller ärende.",
  "Beskriv händelseförloppet och eventuell brottsrubricering.",
  "Lämna ID på inblandade eller säg tydligt att ID saknas.",
  "Lämna registreringsnummer och relevanta fordonsuppgifter.",
  "Redovisa använda tvångsmedel.",
  "Redovisa skador på person eller annat.",
  "Säg vad som kommer att avrapporteras: anmälan, förhör, PM eller annat.",
  "Beskriv nästa steg, exempelvis station, sjukhus, förhör, film eller transport.",
  "För in information som delats i chatten i händelserapporten när den behövs för fortsatt utredning.",
] as const;

export const indexExercises = [
  {
    prompt: "Vilket index har Insats 21 i Region Väst?",
    options: ["521", "251", "421"],
    answer: 0,
    explanation: "5 = Region Väst, följt av Insats 21.",
  },
  {
    prompt: "Vilket index har Insats 34 i Region Nord?",
    options: ["341", "134", "734"],
    answer: 1,
    explanation: "1 = Region Nord, följt av Insats 34.",
  },
  {
    prompt: "Vilket index har Insats 2 i Region Stockholm?",
    options: ["302", "320", "203"],
    answer: 0,
    explanation: "3 = Region Stockholm och den ensiffriga insatsgruppen skrivs 02.",
  },
  {
    prompt: "Vad betyder index 442?",
    options: ["Insats 42 i Region Öst", "Insats 44 i Region Mitt", "Insats 42 i Region Syd"],
    answer: 0,
    explanation: "4 = Region Öst. 42 är Insats 42, polisområde 4 i regionen.",
  },
  {
    prompt: "Vad betyder index 231?",
    options: ["Insats 31 i Region Mitt", "Insats 23 i Region Nord", "Insats 31 i Region Väst"],
    answer: 0,
    explanation: "2 = Region Mitt. 31 är Insats 31, polisområde 3 i regionen.",
  },
  {
    prompt: "Vad betyder index 601?",
    options: ["Insats 01 i Region Syd", "Insats 60 i Region Nord", "Insats 01 i Region Väst"],
    answer: 0,
    explanation: "6 = Region Syd. 01 är en regional insatstalgrupp i regionen.",
  },
] as const;

export const communicationToolSources = [
  "Anropssignaler, nummerplan.pdf",
  "Avrapportering kort.pdf",
  "Bokstavering.pdf",
  "Indexering 22.pdf",
  "Byta talgrupp.pdf",
] as const;
