import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Eye } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/auth/AuthContext';
import { defaultSettingsService } from '@/services/defaultSettingsService';
import { DefaultSettings } from '@/interfaces/entities';
import { toast } from 'sonner';
import '@/scss/main.scss';

const DefaultSettingsList = () => {
  const navigate = useNavigate();
  const { canAccess } = useAuth();
  const [settings, setSettings] = useState<DefaultSettings[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const canMaintain = canAccess('default-settings.maintain');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const response = await defaultSettingsService.getAll({
        $expand: 'to_DefaultBatchSettings',
        $orderby: 'modifiedAt desc',
      });
      setSettings(response.value);
    } catch (error) {
      toast.error('Failed to load default settings');
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <AppHeader />
      
      <main className="page-container">
        <div className="page-header">
          <h1 className="page-header__title">Default Settings</h1>
          <p className="page-header__subtitle">
            Configure system defaults and batch settings
          </p>
          
          {canMaintain && (
            <div className="page-header__actions">
              <Button onClick={() => navigate('/default-settings/new')}>
                <Plus className="mr-2 h-4 w-4" />
                Create Setting
              </Button>
            </div>
          )}
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Description</TableHead>
                <TableHead>Class Internal ID</TableHead>
                <TableHead>Batch Settings</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : settings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No settings found
                  </TableCell>
                </TableRow>
              ) : (
                settings.map((setting) => (
                  <TableRow key={setting.defaultSettingID}>
                    <TableCell className="font-medium">
                      {setting.classDescription}
                    </TableCell>
                    <TableCell>{setting.classInternalID || '-'}</TableCell>
                    <TableCell>
                      {setting.to_DefaultBatchSettings?.length || 0} batch setting(s)
                    </TableCell>
                    <TableCell>
                      {setting.modifiedAt
                        ? new Date(setting.modifiedAt).toLocaleDateString()
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(`/default-settings/${setting.defaultSettingID}`)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {canMaintain && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigate(`/default-settings/${setting.defaultSettingID}/edit`)
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
};

export default DefaultSettingsList;
