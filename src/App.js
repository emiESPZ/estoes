import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectList from './pages/ProjectList';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import { ProjectsProvider } from './contexts/ProjectContext';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {
  return (
    <ProjectsProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<ProjectList />} />
          <Route path='/create' element={<AddProject />} />
          <Route path='/edit/:id' element={<EditProject />} />
        </Routes>
      </BrowserRouter>
    </ProjectsProvider>
  );
};

export default App;
