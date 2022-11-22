import { Injectable } from "@nestjs/common";
import PdfPrinter from "pdfmake";
import { Content, ContentTable, TableCell, TDocumentDefinitions } from "pdfmake/interfaces";
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
        const price = order.orderItems.reduce((a, b) => a + b.price, 0);
        const discount = order?.discount > 0 ? order.orderItems.reduce((a, b) => a + b.price, 0) * (order.discount / 100) : 0;
        const paid = price - discount;
        const docDefinition: TDocumentDefinitions = {
            pageSize: 'A6',
            content: [
                {text: 'Lorem epsum restaurant'},
                {
                    table: {
                            widths: ['*'],
                            body: [[" "], [" "]]
                    },
                    layout: {
                        hLineWidth: function(i, node) {
                            return (i === 0 || i === node.table.body.length) ? 0 : 2;
                        },
                        vLineWidth: function(i, node) {
                            return 0;
                        },
                    }
                },
                table,
                {
                    table: {
                            widths: ['*'],
                            body: [[" "], [" "]]
                    },
                    layout: {
                        hLineWidth: function(i, node) {
                            return (i === 0 || i === node.table.body.length) ? 0 : 2;
                        },
                        vLineWidth: function(i, node) {
                            return 0;
                        },
                    }
                },
                {text: `Összesen: ${price}`, style: styles.invoicePrice},
                {text: `Kedvezmény: ${discount}`, style: styles.invoicePrice},
                {text: `Fizetendő: ${paid}`, style: styles.invoicePrice}
            ],

        };

        const options = {};
        const pdfDoc = this.printer.createPdfKitDocument(docDefinition, options);
        return pdfDoc;
    }


    private generateOrderItemsTable(orderItems: Food[]): Content {
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

        return result;
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