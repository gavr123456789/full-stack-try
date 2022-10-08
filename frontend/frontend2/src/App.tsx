import * as React from 'react';
import { Link, useRoutes } from 'react-router-dom';
import Main from './Main';
import { routes } from './routes';

export default function App() {
  const content = useRoutes(routes);

  return (
    <>
      {content}
    </>
    // <>  
    //   <div>
    //     <ul>
    //       <li><Link to='/'>Home</Link></li>
    //       <li><Link to='/topics'>Topics</Link></li>
    //       <li><Link to='/settings'>Settings</Link></li>
    //       <li><Link to='/Page'>Page</Link></li>
    //     </ul>
    //     <hr />
    //     <Main />       
    //   </div>   
    // </>
  )
}