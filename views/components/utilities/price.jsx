import React from 'react';

/**
 * This is used to display Stripe amount values,
 * Since Stripe takes amount in cents, we want to convert it and display dollar value.
 */
let Price = function(props){
    return(
        <span>${props.value}</span>
    );
};

let getPrice = (myService, serviceType = null)=>{
    let serType = myService.type || serviceType;
    if (serType == "subscription"){
        return (
            <span>
                <Price value={myService.amount}/>
                {myService.interval_count == 1 ? ' /' : ' / ' + myService.interval_count} {' '+myService.interval}
            </span>
        );
    }else if (serType == "one_time"){
        return (<span><Price value={myService.amount}/></span>);
    }else if (serType == "custom"){
        return false;
    }else{
        return (<span><Price value={myService.amount}/></span>)
    }
};
/**
 * To be deprecated after refactoring all code
 * @param myService - a service template record row
 * @returns {*}
 */
let getBillingType = (myService)=>{
    let serType = myService.type;

    if (serType == "subscription"){
        return ("Subscription");
    }else if (serType == "one_time"){
        return ("One Time Charge");
    }else if (serType == "custom"){
        return ("Custom Service");
    }else{
        return ("Other")
    }
};

/**
 * Takes a service template and returns the text from row.type after formatting
 * @param row - a service template record row
 * @returns {string}
 */
let serviceTypeFormatter = (row)=>{
    let type = row.type;

    let text = type.replace(/_/g, " ");
    return ( text.charAt(0).toUpperCase() + text.slice(1) );
};


export {Price, getPrice, getBillingType, serviceTypeFormatter};
