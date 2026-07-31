import React, { useState, useEffect } from 'react';
import HomeView from './pages/Home';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';
import ServicesView from './pages/Services';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isRootAccess, setIsRootAccess] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  if (currentPath === '/' || currentPath === '') {
    return (
      <HomeView 
        navigate={navigate} 
        isRootAccess={isRootAccess} 
        setIsRootAccess={setIsRootAccess} 
      />
    );
  } else if (currentPath === '/project') {
    return (
      <AllProjects 
        navigate={navigate} 
        isRootAccess={isRootAccess} 
      />
    );
  } else if (currentPath.startsWith('/project/')) {
    const projectId = currentPath.split('/project/')[1];
    return (
      <ProjectDetail 
        projectId={projectId} 
        navigate={navigate} 
        isRootAccess={isRootAccess} 
      />
    );
  } else if (currentPath === '/service' || currentPath === '/services') {
    return (
      <ServicesView 
        navigate={navigate} 
        isRootAccess={isRootAccess} 
      />
    );
  }

  return (
    <HomeView 
      navigate={navigate} 
      isRootAccess={isRootAccess} 
      setIsRootAccess={setIsRootAccess} 
    />
  );
}

export default App;
