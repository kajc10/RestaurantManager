import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { Schema, Types } from 'mongoose';

// https://typegoose.github.io/typegoose/docs/guides/integration-examples/using-with-class-transformer
export function TransformObjectIdToString() {
    return applyDecorators(
        Transform(
            (value: any) => {
                if (
                    'value' in value &&
                    typeof value.value !== 'undefined' &&
                    value.value !== null
                ) {
                    return value.value instanceof Schema.Types.ObjectId
                        ? value.value.toHexString()
                        : value.value.toString();
                }
                return null;
            },
            { toPlainOnly: true },
        ),
        Transform(
            (value: any) => {
                if ('value' in value && typeof value.value !== 'undefined') {
                    return typeof value.value === 'string'
                        ? new Types.ObjectId(value.value)
                        : value.value;
                }
            },
            { toClassOnly: true },
        ),
    );
}
