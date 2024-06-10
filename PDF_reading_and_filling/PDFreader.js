const fieldsText = `
Field name: Mitglied ab_af_date (type: PDFTextField)
Field name: BIGVersichertennummer meines Werbers (type: PDFTextField)
--------------------------------------------------
Field name: männlich (type: PDFCheckBox)                                   
Field name: weiblich (type: PDFCheckBox)                                   
Field name: unbestimmt (type: PDFCheckBox)                                 
Field name: divers (type: PDFCheckBox)                                     

Field name: Name (type: PDFTextField)                                      
Field name: Vorname (type: PDFTextField)
Field name: Geburtsname (type: PDFTextField)
Field name: Geburtsdatum_af_date (type: PDFTextField)
Field name: Geburtsort (type: PDFTextField)
Field name: Geburtsland (type: PDFTextField)                               

Field name: Vorwahl (type: PDFTextField)                                   
Field name: Festnetz (type: PDFTextField)                                  
                                   
Field name: Vorwahl_2 (type: PDFTextField)                                 
Field name: Mobil (type: PDFTextField)                                     

                               
Field name: EMail (type: PDFTextField)                                     
                                
Field name: Straße (type: PDFTextField)                                    
Field name: Hausnummer (type: PDFTextField)                                
Field name: PLZ (type: PDFTextField)                                       
Field name: Ort (type: PDFTextField)                                       
Field name: Adresszusatz (type: PDFTextField)                              

Field name: RentenSozialversicherungsnummer (type: PDFTextField)           
Field name: SteuerIdentifikationsnummer sofern bekannt (type: PDFTextField)
Field name: Versichertennummer (type: PDFTextField)                        

Field name: ledig (type: PDFCheckBox)                                      
Field name: verheiratet (type: PDFCheckBox)                                
Field name: verwitwet (type: PDFCheckBox)
Field name: LPartG (type: PDFCheckBox)
Field name: getrennt lebend (type: PDFCheckBox)
Field name: geschieden (type: PDFCheckBox)
Field name: Familienstand seit: (type: PDFTextField)

Field name: ja  Bitte fügen Sie die Geburtsurkunden Ihrer Kinder bei (type: PDFCheckBox)
Field name: nein (type: PDFCheckBox)

Field name: Familienangehörige sollen mitversichert werden (type: PDFCheckBox)

Field name: gesetzlich (type: PDFCheckBox)
Field name: privat (type: PDFCheckBox)
-------------------------------------------------------
Field name: KrankenkasseKrankenversicherung (type: PDFTextField)

Field name: selbst versichert (type: PDFCheckBox)
Field name: familienversichert (type: PDFCheckBox)
Field name: privat versichert (type: PDFCheckBox)
Field name: im Ausland versichert (type: PDFCheckBox)

Field name: Straße_2 (type: PDFTextField)
Field name: Hausnummer_2 (type: PDFTextField)
Field name: PLZ_2 (type: PDFTextField)
Field name: Ort_2 (type: PDFTextField)
Field name: Ich habe seitab dem (type: PDFCheckBox)
Field name: Datum der Änderung im Versicherungsverhältnis_af_date (type: PDFTextField)

---------------------------------------------------------
Field name: Arbeitnehmerin (type: PDFCheckBox)
Field name: Mein Einkommen liegt über der Jahresarbeitsentgeltgrenze (type: PDFCheckBox)
Field name: Arbeitgeber (type: PDFTextField)
Field name: Straße_3 (type: PDFTextField)
Field name: Hausnummer_3 (type: PDFTextField)
Field name: PLZ_3 (type: PDFTextField)
Field name: Ort_3 (type: PDFTextField)
Field name: zusätzlich selbstständig tätig (type: PDFCheckBox)

Field name: Sozialgeldbezieherin Bitte Leistungsbescheid beifügen (type: PDFCheckBox)
Field name: Leistungsbezieherin Agentur für ArbeitARGEJobcenter Bitte Leistungsbescheid beifügen (type: PDFCheckBox)    
Field name: Kundennummer (type: PDFTextField)


Field name: selbstständig tätig seit (type: PDFCheckBox)
Field name: selbsständig seit_af_date (type: PDFTextField)
Field name: wöchentliche Arbeitszeit (type: PDFTextField)
Field name: ja (type: PDFCheckBox)
Field name: nein_2 (type: PDFCheckBox)
Field name: ohne Anspruch auf Krankengeld (type: PDFCheckBox)
Field name: mit Anspruch auf gesetzliches Krankengeld (type: PDFCheckBox)
Field name: übersteigt die Beitragsbemessungsgrenze (type: PDFCheckBox)
Field name: Alle Einkünfte gehen aus dem beiliegenden Einkommenssteuerbescheid hervor (type: PDFCheckBox)
Field name: BeamtinBeamter oder Beihilfeberechtigter Bitte Bezügemitteilung beifügen (type: PDFCheckBox)
Field name: Studierender oder Schülerin Bitte StudienSchulbescheinigung beifügen (type: PDFCheckBox)
Field name: Rentnerin oder Rentenantragstellerin Bitte Rentenbescheid beifügen (type: PDFCheckBox)
Field name: nicht erwerbstätig (type: PDFCheckBox)
-----------------------------------
Field name: überweise ich selbst (type: PDFCheckBox)
Field name: werden von meinem Arbeitgeber überwiesen (type: PDFCheckBox)
Field name: sollen bis auf Widerruf per SEPABasislastschriftMandat abgebucht werden Bitte SEPABasislastschriftMandat ausfüllen (type: PDFCheckBox)
-----------------------------------
Field name: an mich (type: PDFCheckBox)
Field name: an meinen Vermittler (type: PDFCheckBox)

Field name: Ich möchte den Newsletter Kundenumfragen und Leistungsinformationen per EMail von der BIG erhalten (type: PD
FCheckBox)
Field name: Hiermit willige ich ein dass meine Kontaktdaten gespeichert und verarbeitet werden Mir ist bekannt dass ich 
die Einwilligung jederzeit widerrufen kann (type: PDFCheckBox)
------------------------------------------------
Field name: Ort_4 (type: PDFTextField)
Field name: Datum6_af_date (type: PDFTextField)
Field name: Vermittlernummer (type: PDFTextField)



?Field name: Datum3_af_date (type: PDFTextField)
???

???
`;








const fieldLines = fieldsText.split('\n'); // Разделяем строку по переносам строк
console.log('Number of fields:', fieldLines.length); // Выводим количество полей