import React, { PureComponent, Fragment } from 'react';
import { DatePicker,Form  } from 'antd';


class Edit extends PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Fragment>
                <Form>
                    <DatePicker onChange={this.onChange} />
                </Form>
            </Fragment>
        )
    }
    onChange = (date, dateString)=>{
        console.log(dateString);
    }
}

export default Edit;