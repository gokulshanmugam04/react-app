import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Home from './HomeComponent'
import Menu from './MenuComponent'
import Contact from './ContactComponent'
import DishDetail from './DishdetailComponent'
import About from './AboutComponent'
import {
    fetchComments,
    fetchDishes,
    fetchLeaders,
    fetchPromotions,
    postComment,
    postFeedback
} from '../redux/ActionCreators'
import { actions } from 'react-redux-form'
import { CSSTransition, TransitionGroup } from "react-transition-group";


class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes()
        this.props.fetchComments()
        this.props.fetchPromotions()
        this.props.fetchLeaders()
    }


    render() {
        return (
            <div>
                <Header/>
                <div className='container page'>
                    <TransitionGroup>
                        {/* Every Route receives three arguments - match, location and history */ }
                        <CSSTransition key={ this.props.location.key }
                                       classNames="page"
                                       timeout={ 300 }>
                            <Switch>
                                <Route exact={ true } path='/menu'
                                       render={ props => <Menu dishes={ this.props.dishes }/> }
                              
                                />
                                <Route path='/menu/:dishId'
                                       render={
                                           ( { match: { params: { dishId } } } ) =>
                                               (<DishDetail
                                                   dish={ this.props.dishes.dishes.find( d => d.id === parseInt( dishId ) ) }
                                                   isLoading={ this.props.dishes.isLoading }
                                                   errMess={ this.props.dishes.err }

                                                   comments={ this.props.comments.comments.filter( c => c.dishId === parseInt( dishId ) ) }
                                                   commentsErrMess={ this.props.comments.err }
                                                   postComment={ this.props.postComment }/>)
                                       }/>

                                <Route path='/home'
                                       render={ props => (
                                           //TODO: Change what dish get to send the hole dish object in one prop, instead
                                           //   of in different props. Merge dish, isLoading, errMess
                                           <Home
                                               dish={ this.props.dishes.dishes.find( e => e.featured ) }
                                               dishesLoading={ this.props.dishes.isLoading }
                                               dishesErrMess={ this.props.dishes.err }

                                               promotion={ this.props.promotions.promotions.find( e => e.featured ) }
                                               promosLoading={ this.props.promotions.isLoading }
                                               promosErrMess={ this.props.promotions.err }

                                               leader={ this.props.leaders.leaders.find( e => e.featured ) }
                                               leaderLoading={ this.props.leaders.isLoading }
                                               leaderErrMess={ this.props.leaders.err }
                                           />
                                       ) }/>

                                <Route exact={ true }
                                       path='/contactus'
                                       render={ () =>
                                           <Contact resetFeedbackForm={ this.props.resetFeedbackForm }
                                                    postFeedback={ this.props.postFeedback }/>
                                       }/>

                                <Route exact={ true } path='/aboutus'
                                       render={ () => <About leaders={ this.props.leaders }/> }/>

                                <Redirect to='/home'/>
                                <Route/>
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                <Footer/>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
})


const mapDispatchToProps = dispatch => ({
    postComment: ( dishId, rating, author, comment ) =>
        dispatch( postComment( dishId, rating, author, comment ) ),
    fetchDishes: () => dispatch( fetchDishes() ),
    fetchComments: () => dispatch( fetchComments() ),
    fetchPromotions: () => dispatch( fetchPromotions() ),
    fetchLeaders: () => dispatch( fetchLeaders() ),
    resetFeedbackForm: () => dispatch( actions.reset( 'feedback' ) ),
    postFeedback: ( form ) => dispatch( postFeedback( form ) ),
})


export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Main ) )