import React from 'react';
import { Settings, FileText, FlaskConical } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { FeatureTile } from '@/components/tiles/FeatureTile';
import '@/scss/main.scss';

const Home = () => {
  return (
    <div className="app-container">
      <AppHeader />
      
      <main className="page-container">
        <div className="page-header">
          <h1 className="page-header__title">Welcome to Stutsman Blending</h1>
          <p className="page-header__subtitle">
            Manage your fertilizer formulations, blends, and default settings
          </p>
        </div>

        <div className="grid grid--cols-3">
          <FeatureTile
            title="Default Settings"
            description="Configure batch settings, locations, and system defaults"
            icon={Settings}
            route="/default-settings"
            feature="default-settings.view"
          />

          <FeatureTile
            title="Formulations"
            description="View, create, and manage fertilizer formulations"
            icon={FlaskConical}
            route="/formulations"
            feature="formulas.view"
          />

          <FeatureTile
            title="Manage Blends"
            description="Create and track fertilizer blend tickets"
            icon={FileText}
            route="/blends"
            feature="blend-tickets.view-own"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
