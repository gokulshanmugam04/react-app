import * as ActionTypes from './ActionTypes'
import { baseUrl } from "../shared/baseUrl"
import { actions } from "react-redux-form"

/*
 * DISHES
 */
export const fetchDishes = () => async dispatch => {
    try {
        dispatch( dishesLoading( true ) )
        const response = await fetch( `${ baseUrl }dishes` )
        const dishes = await response.json()
        //Error from the API
        return response.ok ?
            dispatch( addDishes( dishes ) ) :
            dispatch( dishesFailed( `Error ${ response.status }: ${ response.statusText }` ) )
    } catch ( err ) {
        console.error( err )
        // Error from the server
        return dispatch( dishesFailed( err.message ) )
    }
}

export const dishesLoading = isLoading => ({
    type: ActionTypes.DISHES_LOADING,
    payload: { isLoading }
})

export const dishesFailed = err => ({
    type: ActionTypes.DISHES_FAILED,
    payload: err
})

export const addDishes = dishes => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
})

/*
COMMENTS
 */
export const fetchComments = () => async dispatch => {
    try {
        const response = await fetch( `${ baseUrl }comments` )
        const comments = await response.json()
        return response.ok ?
            dispatch( addComments( comments ) ) :
            dispatch( commentsFailed( `Error ${ response.status }: ${ response.statusText }` ) )
    } catch ( err ) {
        return dispatch( commentsFailed( err.message ) )
    }
}

export const addComment = ( comment ) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment,
})

export const postComment = ( dishId, rating, author, comment ) => async dispatch => {
    try {
        const newComment = { dishId, rating, author, comment, date: new Date().toISOString() }

        const response = await fetch( `${ baseUrl }comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( newComment ),
            credentials: 'same-origin',
        } )

        if ( !response.ok )
            alert( `POST Failed: ${ response.status }: ${ response.statusText }` )

        /*
        We are taking the assumption that the response will return the state
         */
        return dispatch( addComment( await response.json() ) )

    } catch ( err ) {
        console.error( err )
        alert( 'POST Failed' )
    }
}

export const commentsFailed = err => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: err,
})

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
})


/*
 * PROMOTIONS
 */
export const fetchPromotions = () => async dispatch => {
    dispatch( promotionsLoading( true ) )
    try {
        const response = await fetch( `${ baseUrl }promotions` )
        const promotions = await response.json()
        return response.ok ?
            dispatch( addPromotions( promotions ) ) :
            dispatch( promotionsFailed( `Error ${ response.status }: ${ response.statusText }` ) )
    } catch ( err ) {
        return dispatch( promotionsFailed( err.message ) )
    }
}

export const promotionsLoading = isLoading => ({
    type: ActionTypes.PROMOS_LOADING,
    payload: { isLoading }
})

export const promotionsFailed = err => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: err
})

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions,
})


/*
 * LEADERS
 */

export const fetchLeaders = () => async dispatch => {
    try {
        const response = await fetch( `${ baseUrl }leaders` )
        const leaders = await response.json()
        return response.ok ?
            dispatch( addLeaders( leaders ) ) :
            dispatch( leadersFailed( `Error ${ response.status }: ${ response.statusText }` ) )
    } catch ( e ) {
        return dispatch( leadersFailed( e.message ) )
    }
}

export const addLeaders = leaders => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders,
})

export const leadersFailed = err => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: err,
})


/**
 FEEDBACK
 */
export const postFeedback = feedbackForm => async dispatch => {
    try {
        const response = await fetch( `${ baseUrl }feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( feedbackForm )
        } )
        if ( response.ok ) {
            const feedback = await response.json()
            alert( JSON.stringify( feedback ) )
            return dispatch( actions.reset( 'feedback' ) )
        } else alert( `Error ${ response.status }: ${ response.statusText }` )
    } catch ( e ) {
        alert( e.message )
    }
}