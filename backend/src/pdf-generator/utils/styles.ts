// Margin: [left, top, right, bottom]

import { StyleDictionary } from 'pdfmake/interfaces';

export const styles: StyleDictionary = {
    tableHeader: {
        bold: true,
        fontSize: 8,
        fillColor: '#eee',
        margin: [2, 5, 2, 5],
    },
    tableCell: {
        fontSize: 8,
        margin: [2, 5, 2, 5],
    },
    invoicePrice: {
        fontSize: 8,
    }
};
