const path = require('path');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

module.exports = function (router) {
    // Путь к форме
    router.get('/form', (req, res) => {
        res.sendFile(path.join(__dirname, 'form.html'));
    });

    // Обработка данных из формы
    router.post('/submit-form', async (req, res) => {
        let {
            gender, name, surname, birthSurname, birthdate, birthCity, birthCountry, //1
            address, house_number, postalCode, city, //2
            rentenNum, steuerId, email, vorwahl, mobil, //3
            familyStatus, Datum3_af_date, versichertenNummer, children, //4
            familyInsured, insuranceType, insuranceCompany, //5
            yourinsuranceCompany, versicherungsart, addressOfOldInsurance, address2, house_number2, postalCode2, city2, //6
            ichBin, incomeLimit, arbeitgeber, address3, house_number3, postalCode3, city3, self_employed, //7
            busnesStartDate, arbeitszeit, grundungszuschuss, krankengeld, jahresGehalt, DuBist, //7
            kundennummerSozialgeldbezieherin, //7
            kundennummerLeistungsbezieherin, //7
            beitrage, sepa, //8
            fragen_beantworten, email_werbungen, bearbeitungsberechtigung, city4 //9
        } = req.body;

        try {
            const existingPdfBytes = fs.readFileSync(path.join(__dirname, 'src', 'BIG_Mitgliedsantrag.pdf'));
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const form = pdfDoc.getForm();
            console.log("Received data:", req.body);

            // Заполнение формы PDF
            //----------Карточка 1-----------------
            if (gender === 'männlich') {
                form.getCheckBox('männlich').check();
            } else if (gender === 'weiblich') {
                form.getCheckBox('weiblich').check();
            } else if (gender === 'divers') {
                form.getCheckBox('divers').check();
            }
            form.getTextField('Name').setText(surname || "");
            form.getTextField('Vorname').setText(name || "");
            form.getTextField('Geburtsname').setText(birthSurname || "");
            form.getTextField('Geburtsdatum_af_date').setText(birthdate || "");
            form.getTextField('Geburtsort').setText(birthCity || "");
            form.getTextField('Geburtsland').setText(birthCountry || "");

            // ... остальные карточки

            //----------Карточка 2-----------------
            form.getTextField('Hausnummer').setText(house_number || "");
            form.getTextField('Straße').setText(address || "");
            form.getTextField('PLZ').setText(postalCode || "");
            form.getTextField('Ort').setText(city || "");

            //----------Карточка 3-----------------
            form.getTextField('RentenSozialversicherungsnummer').setText(rentenNum || "");
            form.getTextField('SteuerIdentifikationsnummer sofern bekannt').setText(steuerId || "");
            form.getTextField('Vorwahl_2').setText("+49");
            if (mobil.startsWith('0')) {
                mobil = mobil.substring(1);
            }
            form.getTextField('Mobil').setText(mobil || "");
            form.getTextField('EMail').setText(email || "");


            //----------Карточка 4-----------------
            if (familyStatus === 'married') {
                form.getCheckBox('verheiratet').check();
            } else if (familyStatus === 'single') {
                form.getCheckBox('ledig').check();
            } else if (familyStatus === 'divorced') {
                form.getCheckBox('geschieden').check();
            } else if (familyStatus === 'widowed') {
                form.getCheckBox('verwitwet').check();
            }
            form.getTextField('Datum3_af_date').setText(Datum3_af_date); //Там где Familienstand seit:
            form.getTextField('Versichertennummer').setText(versichertenNummer || "");


            //----------Карточка 5-----------------
            if (children === 'ja') {
                form.getCheckBox('ja  Bitte fügen Sie die Geburtsurkunden Ihrer Kinder bei').check();  // Предполагается, что у вас есть такой чекбокс
            } else {
                form.getCheckBox('nein').check();
            }

            if (familyInsured === 'yes') {
                form.getCheckBox('Familienangehörige sollen mitversichert werden').check();
            }

            // Установка значения поля в зависимости от выбранного типа страховки
            if (insuranceType === 'privat') {
                form.getCheckBox('privat').check();
                form.getTextField('Familienstand seit:').setText(insuranceCompany || ""); //Там где krankenversichert bei
            } else if (insuranceType === 'gesetzlich') {
                form.getCheckBox('gesetzlich').check();
                form.getTextField('Familienstand seit:').setText(insuranceCompany || ""); //Там где krankenversichert bei
            }

            //----------Карточка 6-----------------
            form.getTextField('KrankenkasseKrankenversicherung').setText(yourinsuranceCompany); //Там где krankenversichert bei
            //versicherungsart
            if (versicherungsart === 'selbst_versichert') {
                form.getCheckBox('selbst versichert').check();
            } else if (versicherungsart === 'familien_versichert') {
                form.getCheckBox('familienversichert').check();
            } else if (versicherungsart === 'privat_versichert') {
                form.getCheckBox('privat versichert').check();
            } else if (versicherungsart === 'Ausland_versichert') {
                form.getCheckBox('im Ausland versichert').check();
            }

            if (addressOfOldInsurance === 'yes') {
                form.getTextField('Hausnummer_2').setText(house_number || "");
                form.getTextField('Straße_2').setText(address || "");
                form.getTextField('PLZ_2').setText(postalCode || "");
                form.getTextField('Ort_2').setText(city || "");
            } else {
                form.getTextField('Hausnummer_2').setText(house_number2 || "");
                form.getTextField('Straße_2').setText(address2 || "");
                form.getTextField('PLZ_2').setText(postalCode2 || "");
                form.getTextField('Ort_2').setText(city2 || "");
            }

            //----------Карточка 7-----------------
            if (ichBin === 'Arbeitnehmer') {
                form.getCheckBox('Arbeitnehmerin').check();
            } else if (ichBin === 'selbständig') {
                form.getCheckBox('Selbstständig').check();
                form.getTextField('Selbstständig seit_af_date').setText(busnesStartDate || ""); //Там где Selbstständig seit_af_date
            } else if (ichBin === 'freiberuflich') {
                form.getCheckBox('freiberuflich').check();
                form.getTextField('Selbstständig seit_af_date').setText(busnesStartDate || ""); //Там где Selbstständig seit_af_date
            } else if (ichBin === 'Arbeitslos') {
                form.getCheckBox('Arbeitslos').check();
            } else if (ichBin === 'Student/in') {
                form.getCheckBox('Studentin').check();
            } else if (ichBin === 'Auszubildende/r') {
                form.getCheckBox('Auszubildende').check();
            } else if (ichBin === 'Rentner/in') {
                form.getCheckBox('Rentnerin').check();
            } else if (ichBin === 'Hausfrau/mann') {
                form.getCheckBox('Hausfrau').check();
            } else if (ichBin === 'Landwirt/in') {
                form.getCheckBox('Landwirtin').check();
            } else if (ichBin === 'Schüler/in') {
                form.getCheckBox('Schülerin').check();
            } else if (ichBin === 'Sozialgeld') {
                form.getCheckBox('Sozialgeldbezieherin').check();
                form.getTextField('Kundennummer1').setText(kundennummerSozialgeldbezieherin || "");
            } else if (ichBin === 'Leistungen nach dem AsylbLG') {
                form.getCheckBox('Leistungsbezieherin nach dem AsylbLG').check();
                form.getTextField('Kundennummer2').setText(kundennummerLeistungsbezieherin || "");
            }

            // Für die Status "Arbeitnehmerin", "Selbstständig", "freiberuflich", "Studentin" und "Auszubildende"
            if (ichBin === 'Arbeitnehmer' || ichBin === 'selbständig' || ichBin === 'freiberuflich' || ichBin === 'Student/in' || ichBin === 'Auszubildende/r') {
                if (incomeLimit === 'yes') {
                    form.getCheckBox('Überschreiten der Jahresarbeitsentgeltgrenze').check();
                } else {
                    form.getCheckBox('Überschreiten der Jahresarbeitsentgeltgrenze').uncheck();
                }

                form.getTextField('Arbeitgeber').setText(arbeitgeber || "");
                form.getTextField('Hausnummer_3').setText(house_number3 || "");
                form.getTextField('Straße_3').setText(address3 || "");
                form.getTextField('PLZ_3').setText(postalCode3 || "");
                form.getTextField('Ort_3').setText(city3 || "");

                if (self_employed === 'yes') {
                    form.getCheckBox('nein  Ich bin selbstständig').check();
                }

                form.getTextField('Arbeitszeit').setText(arbeitszeit || ""); // Там где Arbeitszeit in Wochenstunden
                form.getTextField('Gründungszuschuss').setText(grundungszuschuss || ""); // Там где Gründungszuschuss
                form.getTextField('Krankengeld').setText(krankengeld || ""); // Там где Krankengeld beantragt
                form.getTextField('Jahresgehalt').setText(jahresGehalt || ""); // Там где Jahresgehalt
            }

            if (ichBin === 'Student/in' || ichBin === 'Auszubildende/r') {
                if (DuBist === 'Pflichtpraktikum') {
                    form.getCheckBox('Pflichtpraktikum').check();
                } else if (DuBist === 'Praktikum') {
                    form.getCheckBox('Praktikum').check();
                } else if (DuBist === 'Absolvent') {
                    form.getCheckBox('Absolventin').check();
                } else if (DuBist === 'Master') {
                    form.getCheckBox('Master').check();
                } else if (DuBist === 'Bachelor') {
                    form.getCheckBox('Bachelor').check();
                } else if (DuBist === 'Staatsexamen') {
                    form.getCheckBox('Staatsexamen').check();
                }
            }

            //----------Карточка 8-----------------
            //selbst, arbetsgeber, SEPA
            if (beitrage === 'selbst') {
                form.getCheckBox('überweise ich selbst').check()
            } else if (beitrage === 'arbetsgeber') {
                form.getCheckBox('werden von meinem Arbeitgeber überwiesen').check()
            } else if (beitrage === 'SEPA') {
                form.getCheckBox('sollen bis auf Widerruf per SEPABasislastschriftMandat abgebucht werden Bitte SEPABasislastschriftMandat ausfüllen').check()
            }

            //----------Карточка 9-----------------
            //fragen_beantworten(selbst,vermittler), email_werbungen(yes), bearbeitungsberechtigung(yes)
            if (fragen_beantworten === 'selbst') {
                form.getCheckBox('an mich').check();
            } else if (fragen_beantworten === 'vermittler') {
                form.getCheckBox('an meinen Vermittler').check();
            }
            if (email_werbungen === 'yes') {
                form.getCheckBox('Ich möchte den Newsletter Kundenumfragen und Leistungsinformationen per EMail von der BIG erhalten').check();
            }
            if (bearbeitungsberechtigung === 'yes') {
                form.getCheckBox('Hiermit willige ich ein dass meine Kontaktdaten gespeichert und verarbeitet werden Mir ist bekannt dass ich die Einwilligung jederzeit widerrufen kann').check();
            }
            form.getTextField('Ort_4').setText(city4 || "");
            const today = new Date();
            const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
            form.getTextField('Datum6_af_date').setText(formattedDate);

            form.flatten(); // Делаем поля формы неизменяемыми

            const pdfBytes = await pdfDoc.save();
            const filledPdfPath = path.join(__dirname, 'uploads', 'Filled_BIG_Mitgliedsantrag.pdf');
            fs.writeFileSync(filledPdfPath, pdfBytes);

            res.send(`
        <html>
            <head>
                <title>Submitting...</title>
                <script>
                    setTimeout(function() {
                        window.location.href = '/admin';
                    }, 5000);
                </script>
            </head>
            <body>
                <h1>Submitting...</h1>
                <p>Loading, please wait...</p>
            </body>
        </html>
    `);

        } catch (error) {
            console.error('Ошибка при обработке PDF:', error);
            res.status(500).send("Ошибка при обработке PDF: " + error.message);
        }
    });
}