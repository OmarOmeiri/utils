/**
 * Db filtering utility functions
 * @module DBFilterUtils
 * @category DB
 */

import type mongoose from 'mongoose';
import {
  NumericFilter,
  TextFilter,
  BooleanFilter,
  // IFilters,
  MongoNumericFilterMap,
  // TextFilterRuleKeys,
  // NumericFilterRuleKeys,
  // filterCollections,
  FilterMapCombo,
} from 'lullo-common-types';

const genNumericQuery = <T extends mongoose.Document>({
  key,
  value,
  field,
}: NumericFilter): mongoose.FilterQuery<T> => {
  const mongoKeys = Object.keys(MongoNumericFilterMap);
  if (mongoKeys.includes(key)) {
    return {
      [field]: {
        [MongoNumericFilterMap[key as keyof typeof MongoNumericFilterMap]]: value,
      },
    } as mongoose.FilterQuery<T>;
  }

  return {
    [field]: value,
  } as mongoose.FilterQuery<T>;
};

const genTextQuery = <T extends mongoose.Document>({
  key,
  value,
  field,
}: TextFilter,
  filterMap: FilterMapCombo,
): mongoose.FilterQuery<T> => {
  if (key === 'contains') {
    if (field in filterMap.textIndex) {
      return {
        [field]: {
          _$text: {
            _$search: value,
          },
        },
      } as mongoose.FilterQuery<T>;
    }
    return {
      [field]: {
        _$regex: `/${value}/`,
        options: 'i',
      },
    } as mongoose.FilterQuery<T>;
  }
  return { [field]: value } as mongoose.FilterQuery<T>;
};

const genBooleanQuery = <T extends mongoose.Document>({
  value,
  field,
}: BooleanFilter,
): mongoose.FilterQuery<T> => ({ [field]: value } as mongoose.FilterQuery<T>);

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
