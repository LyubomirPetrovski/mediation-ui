import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enumPipe' })
export class EnumPipe implements PipeTransform {

    transform(enumType): any {
        const entries = [];

        const keys = Object.keys(enumType);
        for (const key of keys.slice(0, (keys.length / 2) - 1)) {
            entries.push({ key: key, value: enumType[key] });
        }

        return entries;
    }
}
