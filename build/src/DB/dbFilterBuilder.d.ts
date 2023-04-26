/**
 * Db filtering utility functions
 * @module DBFilterUtils
 * @category DB
 */
export {};
/**
 * Builds a mongoDB query for a given array of filters. See {@link FiltersInterfaces.IFilters}
 *
 * The mocked param puts a "_" in front of the mongoDB keywords to avoid errors when saving the filters to DB
 * @param filters
 * @param mocked Defaults to true
 * @returns
 */
