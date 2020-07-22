import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import CollectionPage from '../collection/collection';

import WithSpinner from '../../components/with-spinner/with-spinner';

import { selectCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selector';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import collectionsOverview from '../../components/collections-overview/collections-overview.js';

const CollectionOverviewWithSpinner = WithSpinner(collectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    componentDidMount(){
        const { fetchCollectionsStartAsync } = this.props;

        fetchCollectionsStartAsync();
    }

    render(){

        const { match, isCollectionFetching, isCollectionLoaded } = this.props;

        return (
            <div className ='shop-page'>
                <Route exact path = {`${match.path}`} render = {(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} /> } />
                <Route path={`${match.path}/:collectionId`} render = {(props) => <CollectionPageWithSpinner isLoading = {!isCollectionLoaded} {...props} /> } />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching : selectCollectionFetching,
    isCollectionLoaded   : selectIsCollectionLoaded
})

const mapDispatchToProps = dispatch =>({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
