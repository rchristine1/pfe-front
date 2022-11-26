import React from 'react';
function Error(props) {
  let titleH6Style = { backgroundColor: '#f4cccc',height:'48px',border:'red' }
  let display = props.display
  let title=props.title
  
  return (
      <div className="container pt-4" >
      <div className="row align-items-center justify-content-center pb-4 bg-gradient-danger " >
        {display === false ? null :
          <div className='col-8 align-middle'>
            <h6 className="text-danger text-center pt-2 border border-danger rounded" style={titleH6Style}>{title}</h6>
          </div>}
      </div>
    </div>
  
  )
    
}
export default Error;