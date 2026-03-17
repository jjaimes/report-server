import type {
    Content,
    StyleDictionary,
    TDocumentDefinitions
} from "pdfmake/interfaces";

import { DateFormatter } from "src/helpers";
import { text } from "stream/consumers";
import { footerSection } from "./sections/footer.section";

const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin: [10, 30],
};

const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        margin: [0,35,0,0],
    },
    subHeader: {
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 0],
    }
};

export const orderByIdReport = (): TDocumentDefinitions => {

    return {
        pageSize: {
            width: 500,
            height: 350,
        },
        styles,
        header: logo,
        pageMargins: [40, 30, 40, 60],
        footer: footerSection,
        content: [
            {
                columns: [
                    {
                        text: 'Tucan Code',
                        style: 'header',
                        margin: [0,35,0,0],
                    }, 
                    {
                        text: `Recibo No. 191121927\n`, 
                        bold: true, 
                        fontSize: 18,
                        margin: [0,35,0,0],
                    }
                ]

            },
            {
                columns: [
                    {
                        text: '15 Montgomery Str, Suite 100. \nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps:devtalles.com',
                    },
                    {
                        text: [
                            // { 
                            //     text: `Recibo No. 191121927\n`, 
                            //     bold: true, 
                            //     fontSize: 18,
                            // },
                            {
                                text: `Fecha del Recibo: `,
                                bold: true, 
                            },
                            {
                                text: `${ DateFormatter.getDDMMMMYYYY(new Date())}\nPagar antes de: ${ DateFormatter.getDDMMMMYYYY(new Date())}\n`,
                            }
                        ],
                        alignment: 'right',
                    }
                ],
            },

            { qr: 'http://devdetalles.com', fit: 75, alignment: 'right'},

            //DIRECCIÓN DEL CLIENTE
            {
                text: [
                    {
                        text: `Cobrar a:\n\n`,
                        style: 'subHeader',
                    },
                     
                    `Razón Social: José JAIMES ALVIÁREZ.
                    CHILE.`
                ],
            }
        ],
    };
};