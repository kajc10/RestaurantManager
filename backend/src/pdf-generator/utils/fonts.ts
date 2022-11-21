import path from 'path';
import { TFontDictionary } from 'pdfmake/interfaces';

export const fonts: TFontDictionary = {
    Roboto: {
        normal: path.resolve(
            'src',
            'res',
            'pdfmake',
            'fonts',
            'Roboto-Regular.ttf',
        ),
        bold: path.resolve(
            'src',
            'res',
            'pdfmake',
            'fonts',
            'Roboto-Medium.ttf',
        ),
        italics: path.resolve(
            'src',
            'res',
            'pdfmake',
            'fonts',
            'Roboto-Italic.ttf',
        ),
        bolditalics: path.resolve(
            'src',
            'res',
            'pdfmake',
            'fonts',
            'Roboto-MediumItalic.ttf',
        ),
    },
};
