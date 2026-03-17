import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { countries as Country } from "@prisma/client";
import { footerSection } from "./sections/footer.section";
import { styleText } from "util";

interface ReportOptions {
    title?: string;             //Opt
    subTitle?: string;          //Opt
    countries: Country[];       //Obligatory
}


//export const getCountryReport = (): TDocumentDefinitions => {
export const getCountryReport = (options: ReportOptions): TDocumentDefinitions => {
    const {title, subTitle, countries} = options;

    return {
        pageOrientation: 'landscape',

        header: headerSection({
            showLogo: true, 
            showDate: true,
            title: title ?? 'Countries Report',
            subTitle: subTitle ?? 'List of Countries',
        }),

        footer: footerSection, 

        pageMargins:[40,110,40,60],

        content: [
            {
            layout: 'customLayout01',//'lightHorizontalLines', // optional
            table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 1,
                widths: [ 50, 50, 50, '*', '*', '' ],

                body: [
                    [
                        {text: 'ID',        style: { color: 'white', alignment: 'center'}}, 
                        {text: 'ISO2',      style: { color: 'white', alignment: 'center'}},
                        {text: 'ISO3',      style: { color: 'white', alignment: 'center'}},
                        {text: 'Name',      style: { color: 'white', alignment: 'center'}},
                        {text: 'Continent', style: { color: 'white', alignment: 'center'}},
                        {text: 'Local Name',style: { color: 'white', alignment: 'center'}},
                    ], ...
                    countries.map((country) => [
                        { text: country.id.toString(), style: {alignment: 'center'} as const},
                        { text: country.iso2         , style: {alignment: 'center'} as const},
                        { text: country.iso3         , style: {alignment: 'right' } as const},
                        {   text: country.name,
                            bold: true,
                        },
                        country.continent,
                        country.local_name,
                    ]),

                    ['', '', '', '', '', ``],
                    [
                        '', 
                        '', 
                        '', 
                        '', 
                        'Total', 
                        {
                            text: `${countries.length} países`,
                            bold: true,
                        }
                    ]
                    //[ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                    // [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ],
                    
                ],
            },
            },

            // Tabla de todales
            {
                text: 'Totales',
                style: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 40, 0, 0],
                }
            }, 

            {
                layout: 'noBorders',
                table: {
                    headerRows: 1,
                    widths: [ 50, 50, 70, '*', 'auto', '*' ],
                    body: [
                        [
                            {
                                text: 'Total países',
                                colSpan: 2,
                                bold: true,
                            },
                            {},
                            {
                                text: countries.length.toString() + ' países',
                                bold: true,
                            },
                            {},
                            {},
                            {},
                        ]
                    ]
                }
            },
        ],

        // defaultStyle: {
        //     color: 'white',

        // }
    };
;}