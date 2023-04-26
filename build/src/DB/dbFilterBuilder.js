"use strict";
/**
 * Db filtering utility functions
 * @module DBFilterUtils
 * @category DB
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lullo_common_types_1 = require("lullo-common-types");
const genNumericQuery = ({ key, value, field, }) => {
    const mongoKeys = Object.keys(lullo_common_types_1.MongoNumericFilterMap);
    if (mongoKeys.includes(key)) {
        return {
            [field]: {
                [lullo_common_types_1.MongoNumericFilterMap[key]]: value,
            },
        };
    }
    return {
        [field]: value,
    };
};
const genTextQuery = ({ key, value, field, }, filterMap) => {
    if (key === 'contains') {
        if (field in filterMap.textIndex) {
            return {
                [field]: {
                    _$text: {
                        _$search: value,
                    },
                },
            };
        }
        return {
            [field]: {
                _$regex: `/${value}/`,
                options: 'i',
            },
        };
    }
    return { [field]: value };
};
const genBooleanQuery = ({ value, field, }) => ({ [field]: value });
// const getFilterMap = (collection: filterCollections): FilterMapCombo | null => {
//   switch (collection) {
//     case 'products':
//       return {
//         textIndex: productTextFilterIndexFields,
//         text: productTextFilterFields,
//         number: productNumericFilterFields,
//         date: productDateFilterFields,
//         id: productIdFilterFields,
//         bool: productBooleanFilterFields,
//         enum: productEnumFilterFields,
//       };
//     default:
//       return null;
//   }
// };
/**
 * Builds a mongoDB query for a given array of filters. See {@link FiltersInterfaces.IFilters}
 *
 * The mocked param puts a "_" in front of the mongoDB keywords to avoid errors when saving the filters to DB
 * @param filters
 * @param mocked Defaults to true
 * @returns
 */
// const buildFilterQuery = <T extends mongoose.Document>(
//   filters: IFilters[],
//   collection: filterCollections,
//   mocked = true,
// ): mongoose.FilterQuery<T> | undefined => {
//   const filterArray: mongoose.FilterQuery<T>[] = [];
//   const textKeys = Object.keys(TextFilterRuleKeys);
//   // const filterMap = getFilterMap(collection);
//   if (!filterMap) return undefined;
//   const numKeys = Object.keys(NumericFilterRuleKeys);
//   const lng = filters.length;
//   for (let i = 0; i < lng; i += 1) {
//     const filter = filters[i];
//     if (filter.key) {
//       if (textKeys.includes(filter.key)) {
//         const textFilter = filter as TextFilter;
//         filterArray.push(genTextQuery(textFilter, filterMap));
//       }
//       if (numKeys.includes(filter.key)) {
//         const numFilter = filter as NumericFilter;
//         filterArray.push(genNumericQuery(numFilter));
//       }
//     } else {
//       const boolFilter = filter as BooleanFilter;
//       filterArray.push(genBooleanQuery(boolFilter));
//     }
//   }
//   if (mocked) return { _$and: filterArray } as unknown as mongoose.FilterQuery<T>;
//   return JSON.parse(JSON.stringify({ _$and: filterArray }).replace(/_/g, ''));
// };
// export default buildFilterQuery;
//# sourceMappingURL=dbFilterBuilder.js.map