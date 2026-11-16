# Prüfung vom 16. November 2026

## Umfang und Ergebnis

Geprüft wurde der statische Selbstlernkurs aus GitHub, Ausgangscommit `0b54561f97a6f63dd7f493e1a63917a469c97c09`, einschließlich Anmeldung, sechs Lernspielen, Test, Regelbestätigungen und PDF-Erstellung. Keine echten Schülerdaten verwendet. Kein Angriff auf fremde Systeme, keine Prüfung des Vercel-Kontos oder der ursprünglichen nicht mehr verwendeten Sites-Datenbank.

## Konkrete Befunde und Änderungen

| Befund | Auswirkung und Nachweis | Korrektur |
| --- | --- | --- |
| Gespeicherte Zertifikatsdaten wurden nicht an Name/Klasse/Testergebnis gebunden | Ein Zertifikat mit anderem Namen und ungültigem Punktwert überlebte `restore()`, obwohl `canCertify()` wahr war. | Strikte Datenprüfung, erlaubte Felder ausdrücklich übernehmen, Ergebnis neu berechnen, Identität und Ergebnis vergleichen. |
| Punktwerte aus gespeicherten Zertifikaten wurden als HTML eingesetzt | Manipulierte lokale Daten konnten HTML in die Zertifikatsvorschau einschleusen. Das ist ein lokaler Vertrauensfehler; ein entfernter Angriffsweg wurde nicht nachgewiesen. | Strikte Zahlen-/Kennungs-/Datumsprüfung und sichere HTML-Darstellung dynamischer Werte. |
| Ein fehlender Formularwert wurde mit `Number(null)` zu 0 | Die Auswertung verließ sich teilweise auf native Formularvalidierung; eine fehlende Antwort war nicht eindeutig von Option 0 getrennt. | Gemeinsame Auswertung mit strikter Typ-, Mengen- und Bereichsprüfung; fehlende Werte bestehen nicht. |
| Auswertung prüfte die Themenabdeckung nicht erneut | Manipulierte Fragezusammenstellungen konnten die geforderten zwei Fragen je Thema unterschreiten. | Jede Auswertung prüft 15 unterschiedliche Fragen und alle sechs Themen erneut. |
| Lange Namen konnten das alte PDF-Layout überfüllen | Ein gültiger langer Name konnte erst am Ende am Layoutfehler scheitern. | Feste geschützte Layoutbereiche, automatische Schriftanpassung und Umbruch; Test mit 80 breiten Zeichen und 30 Zeichen Klasse. |
| Fehlende Schriftzeichen wurden erst sehr spät sichtbar | Nicht unterstützte Zeichen konnten die PDF-Ausgabe beschädigen. | Zeichensatzprüfung von Name und Klasse vor Beginn und vor PDF-Ausgabe, verständliche Meldung. Erweiterte Schriftunterstützung bleibt eine mögliche Verbesserung. |
| Ein Downloadversuch hatte keine sichtbare Alternative | Bei blockiertem automatischem Download fehlte ein einfach erreichbarer zweiter Weg. | Dauerhafter Speichern-Link und Öffnen-/Drucken-Link, Hinweise für iOS, aufräumbare Blob-URLs; keine falsche Meldung über garantiertes Speichern. |
| Keine eigene Namensbestätigung oder Unterschriftsfelder | Die elektronische Erklärung war nicht mit einer erneuten Namenseingabe verbunden. | Name selbst erneut eingeben; falscher Name wird abgewiesen. Im PDF leere Felder für Handschrift und optionale Lehrkraftsichtung. Keine fingierte Schulunterschrift. |
| Schulgesetzquelle verlinkte eine abgelaufene Fassung | Die Quelle galt nur bis 31. Juli 2026. | Aktuelle Fassung ab 1. August 2026 verlinkt; Inhalts- und Regelfassung aktualisiert. |
| Abgabe- und Profilregeln waren zu pauschal | Schulische Vorgaben konnten wie allgemeine gesetzliche Verbote wirken; ein starres Verbot fremder Fantasiefiguren berücksichtigte zulässige Nutzungsrechte nicht. | Schulregel und Gesetz getrennt, Abgabe an rechtmäßig eingeführte Regelung gebunden; Profilbild nach Rechten und zulässigen Schulregeln. |
| Einzelne Formulierungen waren unnötig einschüchternd | Schwerpunkt lag teils auf Sanktionen statt Hilfe und gemeinsamer Klärung. | Ruhiger Modultitel, Rechte und faire Klärung ergänzt, keine automatische Elternhaftung, kein Schuldanerkenntnis; ungewollter Empfang intimer Bilder differenziert. |
| Unbenutzte Backendpfade waren noch im Frontend vorhanden | Für den gewählten unabhängigen Kurs unnötige Komplexität und irreführende Fehlermeldungen. | Frontendzweige und veralteter Netzwerkclient entfernt; statische Auslieferung ohne API oder Geheimnisse. Sicherheitsheader ergänzt. |

## Prüfbelege

- 18 automatisierte Tests bestanden: Lernlogik, alle Regeln/Erklärungen, Wiederherstellung, manipulierte Zertifikatsdaten, Fragenabdeckung, elektronische Namensbestätigung und PDF-Erstellung.
- PDF-Tests verwenden die tatsächlich ausgelieferten pdf-lib-/fontkit-Bibliotheken. Normale Namen, Umlaute, lange Namen, maximal breite Namen und lange Klassen erzeugen eine gültige A4-Seite; nicht unterstützte Zeichen werden erkannt.
- Muster-PDF gerendert und visuell geprüft: Logo, Textbereiche, Unterschriftslinien und Fußtext ohne Überlappung. Fehlende Häkchenglyphen durch gezeichnete Häkchen ersetzt.
- Online-Browserdurchlauf: Anmeldung „Léa Özdemir-Müller“, Klasse IT26B; Abschlussseite zunächst gesperrt; falsche Lernspielantwort schaltet keinen Abschluss frei; alle sechs Module einschließlich Sortier- und Mehrfachauswahl abgeschlossen; Neuladen erhält den Stand; 15/15 im Test; alle 17 Kästchen zunächst ungeprüft; falsche Namensbestätigung abgewiesen; korrekter Name erzeugt Zertifikat.
- Browser-PDF-Erzeugung beendet sich ohne Konsolenfehler und erzeugt die sichtbaren Speichern-/Öffnen-Links. Die Browser-Automation blockiert Blob-PDF-Navigation; das Download-Ereignis lieferte keinen verlässlichen Dateipfad. Ein vollständiger Nachweis „Datei im Betriebssystem gespeichert“ ist damit nicht erbracht. Diese Einschränkung ist kein nachgewiesener Seitenfehler, muss aber mit realen Schulgeräten gegengeprüft werden.
- Safari/iPad, Android-Dateiablage und Ausdruck auf einem realen Schuldrucker wurden nicht mit echten Endgeräten geprüft.

## Architekturgrenzen

Der Kurs und seine Antworten werden vollständig an den Browser ausgeliefert. Wer Entwicklerwerkzeuge oder den lokalen Speicher gezielt manipuliert, kann einen rein clientseitigen Ablauf nachbauen. Die Prüfungen verhindern Bedienfehler und inkonsistente Daten, aber keine absichtliche vollständige Neufälschung durch den Gerätebenutzer. Eine Nachweis-ID ist keine Echtheitsprüfung. Für die gewünschte Variante „Zertifikat vorzeigen“ bleibt dies transparent als Selbstlern-Nachweis gekennzeichnet. Eine kryptografische Signatur oder zentrale Echtheitsprüfung würde einen gesonderten Ausstellungsprozess erfordern.

Die eigene Namenseingabe dokumentiert eine elektronische Bestätigung, jedoch keine geprüfte Identität. Leere handschriftliche Unterschriftsfelder ermöglichen eine spätere persönliche Unterzeichnung; die Anwendung unterschreibt nicht für Lehrkraft oder Schüler. Die rechtliche Beweiskraft ist damit nicht garantiert.

## Rechtliche Quellen und redaktionelle Leitlinien

Die Änderungen orientieren sich an diesen amtlichen Quellen, geprüft am 16. November 2026:

- [SchulG NRW, Fassung ab 1. August 2026](https://recht.nrw.de/lrgv/gesetz/01082026-schulgesetz-nrw-schulg/), insbesondere §§ 42, 53, 65: rechtmäßige Schulregeln, individuelle Zurechnung, angemessene Maßnahmen und gesetzlich vorgesehene Beteiligung.
- [MSB NRW: Handlungsempfehlungen zur Handynutzung](https://www.schulministerium.nrw/system/files/media/document/file/handlungsempfehlung-handynutzung_250325.pdf): schulbezogene Regelungen und Beteiligungsverfahren statt einer in dieser Schulung erfundenen allgemeinen Abgabepflicht.
- [§ 602 BGB](https://www.gesetze-im-internet.de/bgb/__602.html), [§ 828 BGB](https://www.gesetze-im-internet.de/bgb/__828.html), [§ 832 BGB](https://www.gesetze-im-internet.de/bgb/__832.html): Gebrauchsspuren, Minderjährigenverantwortlichkeit und gesonderte Aufsichtspflichtfragen.
- [§ 201 StGB](https://www.gesetze-im-internet.de/stgb/__201.html), [§ 201a StGB](https://www.gesetze-im-internet.de/stgb/__201a.html), [§§ 22](https://www.gesetze-im-internet.de/kunsturhg/__22.html), [23 KunstUrhG](https://www.gesetze-im-internet.de/kunsturhg/__23.html): Aufnahme und Weitergabe differenziert betrachten, keine automatische Strafbarkeit jedes Fotos.
- [§ 184b StGB](https://www.gesetze-im-internet.de/stgb/__184b.html), [§ 184c StGB](https://www.gesetze-im-internet.de/stgb/__184c.html): bestimmte gesetzlich definierte Inhalte; keine pauschale Gleichsetzung jedes intimen Bildes mit Pornografie.
- [§ 3 JGG](https://www.gesetze-im-internet.de/jgg/__3.html), [§ 105 JGG](https://www.gesetze-im-internet.de/jgg/__105.html): alters- und reifebezogene Differenzierung.

Dies ist eine technische und redaktionelle Prüfung, keine verbindliche schulrechtliche Freigabe. Die tatsächlich beschlossene Geräteordnung, Leihvereinbarungen sowie Betreiber- und Datenschutzangaben müssen durch die zuständige Schule abgeglichen werden. Es gibt keine Zusage, dass niemand rechtliche Einwände erheben kann.

## Kurze Abnahme auf Schulgeräten

1. Einen vollständigen Durchlauf auf einem Schul-iPad und einem Desktop durchführen.
2. PDF herunterladen, in Dateien/Downloads wiederfinden, schließen und aus der Dateiablage erneut öffnen; Namen, Klasse, Punkte und Datum vergleichen.
3. Ersatzlink, Wiederholungsdownload, Ausdruck und freiwillige handschriftliche Unterschrift prüfen.
4. Mit einem zweiten Namen nach „Sitzung zurücksetzen“ starten; keine Daten des vorigen Durchlaufs dürfen erscheinen.
5. Tatsächliche Schulordnung und zuständige Kontakte gegen die Lerntexte abgleichen.

Weitere Entwicklungsaufträge sind in [MEGAPROMPT.md](MEGAPROMPT.md) konkretisiert.

