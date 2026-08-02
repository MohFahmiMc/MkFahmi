import React, { useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async'; // Wajib di-import agar Helmet berfungsi
import HomeView from './pages/Home';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';
import ServicesView from './pages/ServicesView';

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

  // Kita buat fungsi render terpisah agar mudah dibungkus HelmetProvider
  const renderContent = () => {
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

    // Fallback jika route tidak ditemukan (kembali ke Home)
    return (
      <HomeView 
        navigate={navigate} 
        isRootAccess={isRootAccess} 
        setIsRootAccess={setIsRootAccess} 
      />
    );
  };

  return (
    // Bungkus seluruh aplikasi dengan HelmetProvider di sini
    <HelmetProvider>
      {renderContent()}
    </HelmetProvider>
  );
}

export default App;
