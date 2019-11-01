import React, { Component } from 'react'
import Modal from '../components/UI/Modal/Modal'

const  withErrorHandler = (WrappedComponent, axios)=> {
    return class extends Component {
        state ={
            error: null
        }
        
        UNSAFE_componentWillMount() {
            this.reqInerceptor = axios.interceptors.request.use(req=>{
                this.setState({error: null})
                return req
            })
            this.resInterceptor =axios.interceptors.response.use(res=>res, error=>{
                this.setState({error:error})
            })
        }
        
        componentWillUnmount () {
               axios.interceptors.request.eject(this.reqInerceptor) 
               axios.interceptors.response.eject(this.resInerceptor) 

            }
        errorConfirmedHandler = ()=>{
            this.setState({error:null})
        }
        render() {
            const {error} = this.state
            return (
                <div>
                    <Modal show= {error}
                    modalClosed={this.errorConfirmedHandler}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}

export default withErrorHandler
