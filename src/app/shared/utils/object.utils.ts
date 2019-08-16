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

    /*
        Checks whether a property exists in object
        Use:
        ObjectUtils.propExists(obj, 'game.league') - checks whether 'obj' has property 'game.league'
    */
    public static propExists(obj, key: string): boolean {
        return key.split('.').every(function (x) {
        if (typeof obj !== 'object' || obj === null || !(x in obj)) {
            return false;
        }
        obj = obj[x];
        return true;
        });
    }
}
