

function CheckBox ({isChecked}) {
   
    if(isChecked) {
        return (
            <div className="content-checkbox-checked">
                
            </div>
        )
    }else {
        return (
            <div className="content-checkbox">
                
            </div>
        )
    }
    
}


export default CheckBox