# Sambandslabbet

En lokal, interaktiv lärplattform i sambandstjänst. Innehållet är sammanställt
från samtliga 63 dokument på kurssidan **Sambandstjänst: Dokument**.

Den offentliga webbversionen finns på
[denniswessman-hub.github.io/samband](https://denniswessman-hub.github.io/samband/).

## Starta

Dubbelklicka på `Starta Sambandslabbet.cmd`. Plattformen öppnas automatiskt i
webbläsaren. Låt startfönstret vara öppet medan du använder plattformen och
stäng det när du är klar.

## Innehåll

- 10 lärmoduler och 30 frågor med förklaringar
- interaktiv terminalträning för SC21
- scenarioträning i tydlig radiokommunikation
- snabbkort för repetition
- sökbart källregister
- lokal resultat- och progresslagring i webbläsaren

Originalfilerna ligger oförändrade i mappen `källmaterial`. Plattformen är ett
träningsstöd; aktuell sambandstablå, lokala beslut och terminalens programmering
gäller alltid i praktiken.

## Om startfilen inte fungerar

Projektet kräver Node.js 22.13 eller senare. Från projektmappen kan plattformen
även startas med `pnpm run start` efter en genomförd `pnpm run build`.
