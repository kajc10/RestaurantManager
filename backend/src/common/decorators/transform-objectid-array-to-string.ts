import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

// https://typegoose.github.io/typegoose/docs/guides/integration-examples/using-with-class-transformer
export function TransformObjectIdArrayToString() {
    return applyDecorators(
        Transform(
            (value: any) => {
                if (
                    'value' in value &&
                    typeof value.value !== 'undefined' &&
                    value.value != null
                ) {
                    return value.value.map((value) => value.toString());
                }
                return null;
            },
            { toPlainOnly: true },
        ),
        Transform(
            (value: any) => {
                if (
                    'value' in value &&
                    typeof value.value !== 'undefined' &&
                    value.value != null
                ) {
                    return value.value.map((value) =>
                        typeof value === 'string'
                            ? new Types.ObjectId(value)
                            : value,
                    );
                }
            },
            { toClassOnly: true },
        ),
    );
}
