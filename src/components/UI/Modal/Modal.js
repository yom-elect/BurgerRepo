import React, { Component } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css'



export default class Modal extends Component {

    shouldComponentUpdate (nextProps, nextState){
            return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
  

    render() {
        let {children,show, modalClosed} = this.props
        return (
            <div>
                <Backdrop show = {show} clicked={modalClosed}/>
                <div className="Modal" style={{
                    transform: show? 'translateY(0)' : 'translateY(-100vh)',
                    opacity:    show ? '1' : '0'                              
                    }}>
                {children}
                </div>
            </div>
            
        )
    }
}

