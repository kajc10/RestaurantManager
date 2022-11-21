import { Injectable } from "@nestjs/common";
import PdfPrinter from "pdfmake";
import { ContentTable, TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
import { Food } from "src/models/food/schema/food.schema";
import { OrderDocument } from "src/models/order/schema/order.schema";
import { fonts } from "./utils/fonts";
import { styles } from "./utils/styles";

@Injectable()
export class PdfGeneratorService {
    private printer: PdfPrinter;

    constructor() {
        this.printer = new PdfPrinter(fonts);
    }

    generateInvoice(order: OrderDocument): PDFKit.PDFDocument {
        const table = this.generateOrderItemsTable(order.orderItems);
        const docDefinition: TDocumentDefinitions = {
            content: [
                {text: 'Számla'},
                {text: 'Számla'},
            ],

        };

        console.log(docDefinition);

        const options = {};
        const pdfDoc = this.printer.createPdfKitDocument(docDefinition, options);
        return pdfDoc;
    }


    private generateOrderItemsTable(orderItems: Food[]) {
        const result: ContentTable = {
            table: {
                body: [],
            },
        };

        const headerRow = [
            'Étel',
            'Ár',
        ];

        const rows = orderItems.map((orderItem) => {
            return [
                orderItem.name,
                `${orderItem.price} FT`,
            ];
        });

        result.table = {
            headerRows: 1,
            dontBreakRows: true,
            keepWithHeaderRows: 1,
            widths: ['*', '*'],
            body: this.generateTableBody(headerRow, rows),
        }
    }

    private generateTableBody(
        headerRow: string[],
        rows: string[][],
    ): TableCell[][] {
        return [
            headerRow.map((header) => {
                return {
                    text: header,
                    style: styles.tableHeader,
                };
            }),
        ].concat(
            rows.map((row) => {
                return row.map((column) => {
                    return {
                        text: column,
                        style: styles.tableCell,
                    };
                });
            }),
        );
    }
}