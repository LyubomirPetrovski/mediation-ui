import { SelectItem } from 'primeng/components/common/selectitem';

export class ObjectUtils {
    public static strEnumToSelectItem(enumObj: any, defaultValue: string = null) {
        return <SelectItem[]>(defaultValue ? [{ label: 'Не е избрано', value: null }] : [])
            .concat(
                Object.keys(enumObj)
                    .map(key => ({
                        value: key,
                        label: enumObj[key]
                    })));
    }
}
