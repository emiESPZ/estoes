import { uuidv4 } from '@firebase/util';
import { createContext, useState } from 'react';

const ProjectsContext = createContext({});

export const ProjectsProvider = ({ children }) => {
  return (
    <ProjectsContext.Provider value={{}}>{children}</ProjectsContext.Provider>
  );
};

export default ProjectsContext;
