import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';
import shop from '../../pages/shop/shop';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionForPreview = createSelector(
  [selectCollections],
  collections => collections ? Object.keys(collections).map( key => collections[key] ) : []
)

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    collections => collections ? collections[collectionUrlParam] : null
  )
);

export const selectCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
)

export const selectIsCollectionLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
) 
