import { Fragment } from 'react';
import './App.css';
import MealForm from './components/MealForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Fragment>
      <MealForm />
      <ToastContainer />
    </Fragment>
  );
}

export default App;
